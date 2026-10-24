import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Basic hardening for browser-facing responses and request parsing.
app.disable('x-powered-by');
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self'",
  ].join('; '));
  next();
});
app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Supabase-backed content and administration API. Service-role credentials stay server-side.
const SUPABASE_URL = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_SERVICE_ROLE_KEY);
const CONTENT_TYPES = new Set(['project', 'tool', 'python_script', 'open_source_project', 'article']);
const CONTENT_FIELDS = ['content_type', 'title', 'slug', 'summary', 'body', 'cover_image_url', 'source_url', 'github_url', 'download_url', 'license', 'language', 'requirements', 'tags', 'is_published'];
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const contactAttempts = new Map<string, { count: number; resetAt: number }>();
const reviewAttempts = new Map<string, { count: number; resetAt: number }>();

function pruneRateLimitMap(store: Map<string, { count: number; resetAt: number }>, now = Date.now()) {
  for (const [key, value] of store) if (value.resetAt <= now) store.delete(key);
}

app.get('/api/health', async (_req, res) => {
  if (!supabaseConfigured) {
    return res.status(503).json({ status: 'degraded', database: 'not_configured' });
  }
  try {
    await supabaseRequest('/rest/v1/profiles?select=id&limit=1', { useServiceRole: true });
    return res.json({ status: 'ok', database: 'connected' });
  } catch {
    return res.status(503).json({ status: 'degraded', database: 'unreachable_or_schema_missing' });
  }
});

function requireSupabase(res: express.Response): boolean {
  if (supabaseConfigured) return true;
  res.status(503).json({ error: 'قاعدة البيانات غير مهيأة. أضف متغيرات Supabase إلى بيئة الخادم.' });
  return false;
}

async function supabaseRequest(endpoint: string, options: { method?: string; token?: string; body?: unknown; useServiceRole?: boolean } = {}) {
  const key = options.useServiceRole ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY;
  const headers: Record<string, string> = { apikey: key, Authorization: `Bearer ${options.token || key}` };
  if (options.body !== undefined) headers['Content-Type'] = 'application/json';
  if (options.method === 'POST' || options.method === 'PATCH' || options.method === 'DELETE') headers['Prefer'] = 'return=representation';
  const response = await fetch(`${SUPABASE_URL}${endpoint}`, {
    method: options.method || 'GET', headers,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  });
  const raw = await response.text();
  let data: any = null;
  try { data = raw ? JSON.parse(raw) : null; } catch { data = null; }
  if (!response.ok) {
    const err = new Error(data?.msg || data?.message || data?.error_description || data?.error || `Supabase request failed (${response.status})`);
    (err as any).status = response.status;
    throw err;
  }
  return data;
}

function getBearerToken(req: express.Request): string | null {
  const value = req.header('authorization') || '';
  const match = value.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

async function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!requireSupabase(res)) return;
  const token = getBearerToken(req);
  if (!token) return res.status(401).json({ error: 'يلزم تسجيل الدخول.' });
  try {
    const user = await supabaseRequest('/auth/v1/user', { token });
    if (!user?.id || !user?.email) return res.status(401).json({ error: 'جلسة غير صالحة.' });
    const profiles = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(user.id)}&select=id,display_name,role&limit=1`, { useServiceRole: true });
    if (!Array.isArray(profiles) || profiles[0]?.role !== 'admin') return res.status(403).json({ error: 'هذا الحساب لا يملك صلاحية الإدارة.' });
    (req as any).adminUser = { id: user.id, email: user.email, display_name: profiles[0].display_name || 'OFOQ Admin' };
    (req as any).adminToken = token;
    next();
  } catch (error: any) {
    const status = error?.status === 401 ? 401 : 503;
    return res.status(status).json({ error: status === 401 ? 'انتهت الجلسة أو أن بيانات الدخول غير صالحة.' : 'تعذر التحقق من صلاحيات الإدارة.' });
  }
}

function cleanContentInput(input: any, partial = false) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('بيانات المحتوى غير صالحة.');
  const result: Record<string, any> = {};
  for (const key of CONTENT_FIELDS) if (Object.prototype.hasOwnProperty.call(input, key)) result[key] = input[key];
  if (!partial || 'title' in result) {
    if (typeof result.title !== 'string' || result.title.trim().length < 2 || result.title.trim().length > 180) throw new Error('العنوان مطلوب (من 2 إلى 180 حرفًا).');
    result.title = result.title.trim();
  }
  if (!partial || 'content_type' in result) {
    if (!CONTENT_TYPES.has(result.content_type)) throw new Error('نوع المحتوى غير صالح.');
  }
  if (!partial || 'slug' in result) {
    if (typeof result.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result.slug)) throw new Error('الرابط المختصر يجب أن يتكون من أحرف إنجليزية صغيرة وأرقام وشرطات.');
  }
  for (const key of ['summary', 'body', 'license', 'language', 'requirements']) {
    if (key in result && (typeof result[key] !== 'string' || result[key].length > (key === 'body' ? 30000 : 6000))) throw new Error(`قيمة ${key} غير صالحة أو طويلة جدًا.`);
  }
  for (const key of ['cover_image_url', 'source_url', 'github_url', 'download_url']) {
    if (key in result && result[key] !== null && result[key] !== '') {
      try { const url = new URL(result[key]); if (!['https:', 'http:'].includes(url.protocol)) throw new Error(); }
      catch { throw new Error(`الرابط ${key} غير صالح.`); }
    } else if (key in result && result[key] === '') result[key] = null;
  }
  if ('tags' in result && (!Array.isArray(result.tags) || result.tags.length > 20 || result.tags.some((t: unknown) => typeof t !== 'string' || t.length > 40))) throw new Error('الوسوم غير صالحة.');
  if ('is_published' in result && typeof result.is_published !== 'boolean') throw new Error('حالة النشر غير صالحة.');
  return result;
}

app.post('/api/admin/login', async (req, res) => {
  if (!requireSupabase(res)) return;
  const now = Date.now(); pruneRateLimitMap(loginAttempts, now);
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const attempt = loginAttempts.get(ip);
  if (attempt && attempt.resetAt > now && attempt.count >= 8) return res.status(429).json({ error: 'محاولات كثيرة. حاول مرة أخرى بعد 15 دقيقة.' });
  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8 || password.length > 256) return res.status(400).json({ error: 'أدخل بريدًا إلكترونيًا وكلمة مرور صالحين.' });
  try {
    const result = await supabaseRequest('/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } });
    // Only return an access token if the user is an admin; don't create or elevate accounts here.
    const profile = await supabaseRequest(`/rest/v1/profiles?id=eq.${encodeURIComponent(result.user.id)}&select=role&limit=1`, { useServiceRole: true });
    if (!Array.isArray(profile) || profile[0]?.role !== 'admin') return res.status(403).json({ error: 'الحساب غير مخوّل لدخول لوحة الإدارة.' });
    loginAttempts.delete(ip);
    res.setHeader('Cache-Control', 'no-store');
    return res.json({ access_token: result.access_token, expires_in: result.expires_in, user: { id: result.user.id, email: result.user.email } });
  } catch (error: any) {
    const next = attempt && attempt.resetAt > now ? { count: attempt.count + 1, resetAt: attempt.resetAt } : { count: 1, resetAt: now + 15 * 60 * 1000 };
    loginAttempts.set(ip, next);
    return res.status(error?.status === 429 ? 429 : 401).json({ error: 'تعذر تسجيل الدخول. تحقق من البيانات وحالة حساب المدير.' });
  }
});

app.get('/api/admin/me', requireAdmin, (req, res) => res.setHeader('Cache-Control', 'no-store').json((req as any).adminUser));

app.get('/api/content', async (req, res) => {
  if (!requireSupabase(res)) return;
  const type = typeof req.query.type === 'string' ? req.query.type : '';
  if (type && !CONTENT_TYPES.has(type)) return res.status(400).json({ error: 'نوع المحتوى غير صالح.' });
  try {
    const filters = ['select=id,content_type,title,slug,summary,body,cover_image_url,source_url,github_url,download_url,license,language,requirements,tags,is_published,created_at,updated_at', 'is_published=eq.true', 'order=created_at.desc', 'limit=100'];
    if (type) filters.push(`content_type=eq.${encodeURIComponent(type)}`);
    const items = await supabaseRequest(`/rest/v1/content_items?${filters.join('&')}`, { useServiceRole: true });
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json({ items });
  } catch (error) { console.error('Public content query failed:', error); return res.status(503).json({ error: 'تعذر تحميل المحتوى حاليًا.' }); }
});

// Public reviews are submitted as pending and become visible only after moderation.
app.get('/api/reviews', async (_req, res) => {
  if (!requireSupabase(res)) return;
  try {
    const items = await supabaseRequest('/rest/v1/reviews?select=id,display_name,company,rating,review_text,created_at&is_approved=eq.true&order=created_at.desc&limit=100');
    res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    return res.json({ items });
  } catch (error) { console.error('Public reviews query failed:', error); return res.status(503).json({ error: 'تعذر تحميل التقييمات حاليًا.' }); }
});

app.post('/api/reviews', async (req, res) => {
  if (!requireSupabase(res)) return;
  const now = Date.now(); pruneRateLimitMap(reviewAttempts, now);
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const attempt = reviewAttempts.get(ip);
  if (attempt && attempt.resetAt > now && attempt.count >= 5) return res.status(429).json({ error: 'تم تجاوز عدد التقييمات المسموح به مؤقتًا. حاول لاحقًا.' });
  const { display_name, company = '', rating, review_text } = req.body || {};
  if (typeof display_name !== 'string' || display_name.trim().length < 2 || display_name.trim().length > 100 || typeof company !== 'string' || company.length > 180 || !Number.isInteger(rating) || rating < 1 || rating > 5 || typeof review_text !== 'string' || review_text.trim().length < 5 || review_text.length > 2000) return res.status(400).json({ error: 'بيانات التقييم غير صالحة.' });
  try {
    const result = await supabaseRequest('/rest/v1/reviews', { method: 'POST', useServiceRole: true, body: { display_name: display_name.trim(), company: company.trim() || null, rating, review_text: review_text.trim(), is_approved: false } });
    reviewAttempts.set(ip, attempt && attempt.resetAt > now ? { count: attempt.count + 1, resetAt: attempt.resetAt } : { count: 1, resetAt: now + 15 * 60 * 1000 });
    return res.status(201).json({ ok: true, review: Array.isArray(result) ? result[0] : result });
  } catch (error) { console.error('Review submission failed:', error); return res.status(503).json({ error: 'تعذر إرسال التقييم الآن.' }); }
});

app.post('/api/contact', async (req, res) => {
  if (!requireSupabase(res)) return;
  const { name, email, company = '', phone = '', serviceId = '', priority = 'routine', subject = '', message, website = '' } = req.body || {};
  // Honeypot: silently accept bot submissions without storing them.
  if (typeof website === 'string' && website.trim()) return res.status(202).json({ ok: true });
  const now = Date.now(); pruneRateLimitMap(contactAttempts, now); const ip = req.ip || req.socket.remoteAddress || 'unknown'; const attempt = contactAttempts.get(ip);
  if (attempt && attempt.resetAt > now && attempt.count >= 5) return res.status(429).json({ error: 'تم تجاوز عدد الرسائل المسموح به مؤقتًا. حاول لاحقًا.' });
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof company !== 'string' || company.length > 180 || typeof phone !== 'string' || phone.length > 40 || typeof serviceId !== 'string' || serviceId.length > 120 || !['routine','elevated','critical_soc'].includes(priority) || typeof subject !== 'string' || subject.length > 180 || typeof message !== 'string' || message.trim().length < 5 || message.length > 6000) return res.status(400).json({ error: 'يرجى إدخال بيانات تواصل صحيحة.' });
  try {
    await supabaseRequest('/rest/v1/contact_messages', { method: 'POST', useServiceRole: true, body: { name: name.trim(), email: email.trim().toLowerCase(), company: company.trim(), phone: phone.trim(), service_id: serviceId, priority, subject: subject.trim(), message: message.trim() } });
    contactAttempts.set(ip, attempt && attempt.resetAt > now ? { count: attempt.count + 1, resetAt: attempt.resetAt } : { count: 1, resetAt: now + 15 * 60 * 1000 });
    return res.status(201).json({ ok: true });
  } catch (error) { console.error('Contact submission failed:', error); return res.status(503).json({ error: 'تعذر إرسال الرسالة الآن. حاول لاحقًا.' }); }
});

app.get('/api/admin/content', requireAdmin, async (req, res) => {
  const type = typeof req.query.type === 'string' ? req.query.type : '';
  if (!CONTENT_TYPES.has(type)) return res.status(400).json({ error: 'نوع المحتوى غير صالح.' });
  try { const items = await supabaseRequest(`/rest/v1/content_items?select=*&content_type=eq.${encodeURIComponent(type)}&order=created_at.desc&limit=200`, { useServiceRole: true }); return res.setHeader('Cache-Control', 'no-store').json({ items }); }
  catch (error) { console.error('Admin content query failed:', error); return res.status(503).json({ error: 'تعذر تحميل المحتوى.' }); }
});

app.post('/api/admin/content', requireAdmin, async (req, res) => {
  try {
    const item = cleanContentInput(req.body);
    item.created_by = (req as any).adminUser.id;
    const result = await supabaseRequest('/rest/v1/content_items', { method: 'POST', useServiceRole: true, body: item });
    return res.status(201).json({ item: Array.isArray(result) ? result[0] : result });
  } catch (error: any) { return res.status(error?.status === 409 ? 409 : 400).json({ error: error?.message || 'تعذر حفظ المحتوى.' }); }
});

app.patch('/api/admin/content/:id', requireAdmin, async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.id)) return res.status(400).json({ error: 'معرّف المحتوى غير صالح.' });
  try {
    const item = cleanContentInput(req.body, true);
    if (!Object.keys(item).length) return res.status(400).json({ error: 'لا توجد حقول لتحديثها.' });
    item.updated_at = new Date().toISOString();
    const result = await supabaseRequest(`/rest/v1/content_items?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'PATCH', useServiceRole: true, body: item });
    if (!Array.isArray(result) || !result.length) return res.status(404).json({ error: 'المحتوى غير موجود.' });
    return res.json({ item: result[0] });
  } catch (error: any) { return res.status(error?.status === 409 ? 409 : 400).json({ error: error?.message || 'تعذر تحديث المحتوى.' }); }
});

app.delete('/api/admin/content/:id', requireAdmin, async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.id)) return res.status(400).json({ error: 'معرّف المحتوى غير صالح.' });
  try { await supabaseRequest(`/rest/v1/content_items?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'DELETE', useServiceRole: true }); return res.json({ ok: true }); }
  catch (error) { console.error('Delete content failed:', error); return res.status(503).json({ error: 'تعذر حذف المحتوى.' }); }
});

app.get('/api/admin/messages', requireAdmin, async (_req, res) => {
  try { const items = await supabaseRequest('/rest/v1/contact_messages?select=*&order=created_at.desc&limit=300', { useServiceRole: true }); return res.setHeader('Cache-Control', 'no-store').json({ items }); }
  catch (error) { console.error('Messages query failed:', error); return res.status(503).json({ error: 'تعذر تحميل الرسائل.' }); }
});

app.patch('/api/admin/messages/:id', requireAdmin, async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.id)) return res.status(400).json({ error: 'معرّف الرسالة غير صالح.' });
  const allowed = new Set(['new', 'in_progress', 'resolved', 'spam']);
  if (!allowed.has(req.body?.status)) return res.status(400).json({ error: 'حالة الرسالة غير صالحة.' });
  try { const result = await supabaseRequest(`/rest/v1/contact_messages?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'PATCH', useServiceRole: true, body: { status: req.body.status } }); if (!Array.isArray(result) || !result.length) return res.status(404).json({ error: 'الرسالة غير موجودة.' }); return res.json({ item: result[0] }); }
  catch (error) { console.error('Update message failed:', error); return res.status(503).json({ error: 'تعذر تحديث الرسالة.' }); }
});

app.get('/api/admin/reviews', requireAdmin, async (_req, res) => {
  try { const items = await supabaseRequest('/rest/v1/reviews?select=*&order=created_at.desc&limit=300', { useServiceRole: true }); return res.setHeader('Cache-Control', 'no-store').json({ items }); }
  catch (error) { console.error('Admin reviews query failed:', error); return res.status(503).json({ error: 'تعذر تحميل التقييمات.' }); }
});

app.patch('/api/admin/reviews/:id', requireAdmin, async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.id) || typeof req.body?.is_approved !== 'boolean') return res.status(400).json({ error: 'بيانات مراجعة التقييم غير صالحة.' });
  try { const result = await supabaseRequest(`/rest/v1/reviews?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'PATCH', useServiceRole: true, body: { is_approved: req.body.is_approved } }); if (!Array.isArray(result) || !result.length) return res.status(404).json({ error: 'التقييم غير موجود.' }); return res.json({ item: result[0] }); }
  catch (error) { console.error('Review moderation failed:', error); return res.status(503).json({ error: 'تعذر تحديث التقييم.' }); }
});

app.delete('/api/admin/reviews/:id', requireAdmin, async (req, res) => {
  if (!/^[0-9a-f-]{36}$/i.test(req.params.id)) return res.status(400).json({ error: 'معرّف التقييم غير صالح.' });
  try { const result = await supabaseRequest(`/rest/v1/reviews?id=eq.${encodeURIComponent(req.params.id)}`, { method: 'DELETE', useServiceRole: true }); return res.json({ ok: true, items: result }); }
  catch (error) { console.error('Review deletion failed:', error); return res.status(503).json({ error: 'تعذر حذف التقييم.' }); }
});


// Direct download endpoint for full source code zip
app.get('/api/download-zip', (_req, res) => {
  const zipFile = path.resolve(__dirname, 'public/ofoq-project.zip');
  if (!existsSync(zipFile)) return res.status(404).json({ error: 'The source archive is not available for download.' });
  return res.download(zipFile, 'ofoq-software-platform.zip');
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OFOQ Server listening on port ${PORT}`);
  });
}

startServer();
