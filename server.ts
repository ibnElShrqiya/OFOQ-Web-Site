import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

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

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Comprehensive technical domain checks
function isTechnicalQuery(query: string): boolean {
  const q = query.trim().toLowerCase();

  // If empty or too short
  if (q.length < 2) return false;

  // Strict non-technical blacklisted topics
  const nonTechTriggers = [
    'طبخ', 'طريقة عمل', 'اكلات', 'وجبة', 'طعام', 'وصفة', 'حلويات', 'بيتزا', 'شاورما',
    'طقس', 'الجو اليوم', 'حرارة الجو', 'مطر',
    'رياضة', 'مباراة', 'كرة قدم', 'ميسي', 'رونالدو', 'دوري', 'كأس العالم', 'ريال مدريد', 'برشلونة',
    'سياسة', 'حرب', 'انتخابات', 'رئيس', 'وزير', 'برلمان',
    'شعر غزل', 'قصيدة', 'نكتة', 'مزحة', 'اغنية', 'فيلم', 'مسلسل', 'ممثل', 'قصة حب', 'ابراج', 'حظك اليوم',
    'مرض', 'دواء علاج', 'صيدلية', 'طبيب', 'سياحة سفر', 'فندق حجز',
    'recipe', 'cook', 'food', 'weather', 'forecast', 'football', 'soccer', 'nba', 'champions league',
    'politics', 'election', 'president', 'joke', 'movie', 'actor', 'song', 'lyrics', 'horoscope', 'hotel booking'
  ];

  for (const trigger of nonTechTriggers) {
    if (q.includes(trigger)) {
      return false;
    }
  }

  // Pure generic greetings without technical substance
  const pureGreetings = ['مرحبا', 'مرحباً', 'السلام عليكم', 'سلام', 'صباح الخير', 'مساء الخير', 'أهلاً', 'أهلا', 'الو', 'hello', 'hi', 'hey', 'good morning', 'good evening'];
  if (pureGreetings.includes(q)) {
    return true; // We accept greeting and respond with technical welcome
  }

  // Technical keywords whitelist
  const techKeywords = [
    'برمج', 'كود', 'تطوير', 'موقع', 'ويب', 'تطبيق', 'جوال', 'موبايل', 'سيرفر', 'خادم', 'سحاب', 'قاعدة بيانات',
    'معمار', 'تصميم واجه', 'فرونت', 'باك', 'واجهة', 'نظم', 'api', 'أداء', 'حماية', 'أمن برمجي', 'أتمتة', 'ذكاء',
    'react', 'next', 'vue', 'angular', 'flutter', 'react native', 'swift', 'kotlin', 'dart', 'typescript', 'javascript',
    'python', 'go', 'golang', 'rust', 'c#', 'java', 'sql', 'postgres', 'mongo', 'redis', 'docker', 'kubernetes',
    'cloud', 'aws', 'gcp', 'azure', 'devops', 'ci/cd', 'git', 'rest', 'graphql', 'grpc', 'microservice', 'monolith',
    'tailwind', 'css', 'html', 'node', 'express', 'fastapi', 'architecture', 'database', 'frontend', 'backend', 'fullstack',
    'ofoq', 'أفق', 'تقني', 'تقنية', 'tech', 'software', 'app', 'code'
  ];

  for (const kw of techKeywords) {
    if (q.includes(kw)) {
      return true;
    }
  }

  // Default: if it's an inquiry with technical depth or code-like patterns
  if (q.includes('?') || q.includes('؟') || q.includes('how') || q.includes('what') || q.includes('كيف') || q.includes('ما هو') || q.includes('أفضل') || q.includes('best') || q.includes('vs')) {
    return true;
  }

  return false;
}

// Ultra-fast dedicated technical advisory generator (sub-10ms response)
function getTechnicalAdvisoryReply(query: string, lang: 'ar' | 'en'): string {
  const q = query.toLowerCase();

  if (lang === 'ar') {
    // Pure greetings
    if (q === 'مرحبا' || q === 'مرحباً' || q === 'السلام عليكم' || q === 'سلام' || q === 'أهلاً' || q === 'أهلا') {
      return `مرحباً بك! أنا **المستشار التقني السريع لفريق "أُفُق"** ⚡
أنا مخصص حصرياً لتقديم استشارات معمارية وبرمجية فورية في:
• هندسة الويب وتطبيقات الجوال (React 19, Next.js 15, Flutter, Swift, Kotlin).
• تصميم الأنظمة وقواعد البيانات (PostgreSQL, Redis, Microservices).
• البنية السحابية وأتمتة النشر (Docker, Kubernetes, CI/CD, Cloud Run).
• تكامل الذكاء الاصطناعي وواجهات البرمجة (REST, GraphQL, Gemini API).

كيف يمكنني مساعدتك برمجياً أو معمارياً اليوم؟`;
    }

    // Flutter vs React Native / Mobile
    if (q.includes('flutter') || q.includes('react native') || q.includes('موبايل') || q.includes('جوال') || q.includes('تطبيق')) {
      return `**مقارنة وتوصية أفق لمعمارية تطبيقات الجوال:**

1. **Flutter (الخيار المفضل في أفق)**:
   - **الأداء**: أداء رسومي فائق بتردد 60/120 إطار في الثانية بفضل محرك Impeller المكتوب بلغة C++.
   - **مشاركة الشيفرة**: تتجاوز 95% بين iOS و Android، مع توحيد واجهات المستخدم بالكامل.
   - **الاستخدام المثالي**: منتجات الشركات الناشئة، التطبيقات التجارية، والواجهات الغنية بالحركات والتفاعلات المخصصة.

2. **React Native**:
   - **الميزة**: استثمار خبرات فرق الويب المتقنة لـ React & TypeScript، واستخدام المكونات الأصلية للمنصة.
   - **التحدي**: تكلفة صيانة الـ Bridges وتوافق المكتبات المجتمعية عند التحديثات الكبرى.

3. **Native (SwiftUI / Jetpack Compose)**:
   - **الحاجة**: حصراً عند التفاعل العميق مع عتاد الجهاز (AR/VR، معالجة فيديو فورية، تقنيات البلوتوث المتقدمة).

⚡ **توصية أفق**: ابدأ بـ Flutter إذا كنت تبني تطبيقاً متعدد المنصات يسعى لأسرع وقت طرح بالأسواق (Time-to-Market).`;
    }

    // Web & Frontend (Next.js, React, Tailwind)
    if (q.includes('next') || q.includes('react') || q.includes('ويب') || q.includes('frontend') || q.includes('فرونت')) {
      return `**معيار أفق لتطبيقات الويب الحديثة (Web Architecture Baseline):**

• **Next.js 15 (App Router) + React 19**:
  - استخدام مكونات الخادم (Server Components) لتقليل حزم JavaScript إلى الصفر في أجزاء العرض الثابتة.
  - حدد أهداف الأداء ثم قسها على أجهزة وظروف استخدام واقعية.
• **Tailwind CSS v4**:
  - محرك تجميع فائق السرعة عبر Rust مع غياب كامل لأي Runtime Overhead.
• **إدارة الحالة غير المتزامنة**:
  - اعتماد **TanStack Query** لتخزين واسترجاع بيانات الـ API مع دعم Stale-While-Revalidate.
  - استخدام **Zustand** لإدارة الحالة المحلية الخفيفة بدلاً من تعقيدات Redux.
• **أمان الأنواع البرمجية**:
  - TypeScript مع إعدادات \`"strict": true\` و Zod للتحقق من سلامة البيانات في وقت التشغيل.`;
    }

    // Databases & Storage (Postgres, Mongo, Redis)
    if (q.includes('قاعدة بيانات') || q.includes('database') || q.includes('postgres') || q.includes('mongo') || q.includes('redis') || q.includes('sql')) {
      return `**استراتيجية هندسة البيانات وقواعد البيانات في أفق:**

• **PostgreSQL (نواة البيانات الأساسية)**:
  - محرك البيانات الأول لأي نظام تجاري؛ يدعم سلامة المعاملات (ACID الكاملة).
  - دعم أصلي لبيانات JSONB والفهارس المتقدمة (GIN/GiST) والبحث النصي الكامل.
  - امتداد **pgvector** للبحث الدلالي في تطبيقات الذكاء الاصطناعي بدون الحاجة لمحركات متفرقة.
• **Redis (طبقة التخزين المؤقت فائقة السرعة)**:
  - استجابة في أجزاء من الميلي ثانية (latency measured for the selected setup).
  - استخدامه لإدارة الجلسات (Session Store)، وتحديد معدل الطلبات (Rate Limiting)، والـ Pub/Sub.
• **MongoDB / NoSQL**:
  - يفضل استخدامه لسجلات الأحداث (Audit Logs) والكتالوجات ذات الحقول الديناميكية متغيرة البنية.

⚡ **ملاحظة عامة**: ابدأ دائماً بـ PostgreSQL مهيأة جيداً مع فهارس مدروسة، واستخدم Redis كطبقة Cache أمام الاستعلامات الثقيلة.`;
    }

    // Backend, APIs & Architecture (Go, Node, Microservices vs Monolith)
    if (q.includes('باك') || q.includes('backend') || q.includes('سيرفر') || q.includes('go') || q.includes('node') || q.includes('api') || q.includes('معمار') || q.includes('microservice') || q.includes('monolith')) {
      return `**تصميم البنى التحتية والأنظمة الخلفية (Backend & System Architecture):**

1. **النمط المعماري الموصى به**:
   - **Modular Monolith أولاً**: نوصي بالبدء بنظام موحد منظم ضمن وحدات مستقلة (Clean Architecture)، وتجنب الانتقال إلى Microservices إلا بعد تجاوز الاحتياجات المستخدمين المتوقعة أو عندما تتطلب فرق عمل مستقلة نشر خدماتها بشكل منفصل.
2. **اختيار لغة الخلفية**:
   - **Go (Golang)**: للخدمات عالية الحمل الحسابي، ومحركات المعالجة الفورية ذات استهلاك الذاكرة المنخفض وزمن الاستجابة وفق عبء العمل ومتطلبات المشروع.
   - **Node.js (TypeScript) / Bun**: للتطبيقات التي تشترك في منطق الأنواع مع الـ Frontend مع إنتاجية تطوير متسارعة.
3. **طبقة الـ APIs**:
   - **REST + OpenAPI 3.0**: لمعظم واجهات العملاء مع توثيق تلقائي.
   - **gRPC (Protocol Buffers)**: للاتصال الداخلي بين الخدمات متناهية السرعة.`;
    }

    // DevOps, Cloud & CI/CD
    if (q.includes('docker') || q.includes('سحاب') || q.includes('cloud') || q.includes('devops') || q.includes('نشر') || q.includes('ci/cd') || q.includes('kubernetes')) {
      return `**دليل أفق للبنية السحابية وأتمتة النشر (DevOps & Cloud):**

• **الحاويات (Containerization)**:
  - ملفات Docker متعددة المراحل (Multi-stage builds) لإنتاج صور خفيفة (Distroless / Alpine) بحجم لا يتجاوز 50MB.
• **أتمتة CI/CD (GitHub Actions)**:
  - خط أنابيب آلي: تدقيق الشيفرة (Lint) -> الاختبارات الوحدوية (Unit Tests) -> فحص الأمان والثغرات (Snyk/Trivy) -> البناء والنشر الآلي.
• **المنصات السحابية**:
  - **Google Cloud Run / AWS ECS Fargate**: بيئات Serverless حاويات مثالية تتدرج من وإلى الصفر لتقليل التكاليف التشغيلية.
  - **Kubernetes (GKE / EKS)**: يتم اعتماده عند إدارة خدمات معقدة متعددة الحاويات ذات تنسيق شبكي معقد (Service Mesh).`;
    }

    // AI & Gemini integration
    if (q.includes('ذكاء') || q.includes('ai') || q.includes('gemini') || q.includes('rag') || q.includes('llm') || q.includes('نموذج')) {
      return `**معمارية تكامل الذكاء الاصطناعي (AI & LLM Architecture):**

• **اختيار النموذج**:
  - استخدام **a current Gemini Flash model selected for the project** للمهام المباشرة وسرعة الاستجابة الحسب إعدادات الخدمة والاتصال وتوفير التكلفة.
  - استخدام **a model suited to complex reasoning, if available** للتفكير المنطقي المعقد وتحليل الشيفرات البرمجية الدقيقة.
• **نمط RAG (Retrieval-Augmented Generation)**:
  - تخزين التضمينات المتجهية (Embeddings) في **PostgreSQL + pgvector** لربط الذكاء ببيانات الشركة الحية.
  - تطبيق تقنيات Hybrid Search (مزيج البحث الدلالي مع البحث النصي Full-Text) لاختبار جودة الاسترجاع على بيانات المشروع.
• **أمان الـ AI**:
  - حظر حقن الأوامر (Prompt Injection Defense) وتطبيق Sanitization للمدخلات قبل معالجتها.`;
    }

    // Default fast technical answer
    return `**استشارة تقنية فورية من فريق أفق (OFOQ Technical Advisory):**

من الاعتبارات العامة في المشاريع البرمجية:
1. **أمان الأنواع (Strict Typing)**: تطبيق TypeScript أو Go لمنع أخطاء زمن التشغيل في الإنتاج مع إمكانية تقليل بعض فئات أخطاء وقت التشغيل
2. **فصل الاهتمامات (Separation of Concerns)**: عزل طبقة واجهات المستخدم، ومنطق الأعمال (Domain Services)، ومستودعات البيانات (Repository Pattern).
3. **استراتيجية التخزين المؤقت المتعدد (Multi-tier Caching)**: CDN للملفات الثابتة، Redis للبيانات النشطة، وفهارس متقدمة على مستوى قاعدة البيانات.
4. **المراقبة والاستجابة الفورية**: تسجيل السجلات المنظمة (Structured Logging) ومتابعة مقاييس الأداء (APM).

اطرح أي تفاصيل محددة ترغب في برمجتها أو بنائها (الويب، الجوال، قواعد البيانات، أو البنية السحابية) وسأقدم لك الحل المعماري الأنسب فوراً!`;
  } else {
    // Pure greetings
    if (q === 'hello' || q === 'hi' || q === 'hey' || q === 'good morning' || q === 'good evening') {
      return `Hello! I am the **OFOQ Technical Assistant** ⚡
I am strictly dedicated to providing immediate engineering and software advisory on:
• Modern Web & Mobile Systems (React 19, Next.js 15, Flutter, Swift, Kotlin).
• High-performance Backend & Databases (Go, Node.js, PostgreSQL, Redis).
• Cloud Infrastructure & DevOps (Docker, Kubernetes, Cloud Run, CI/CD).
• Production AI Integrations (Gemini API, RAG, pgvector).

How can I assist your engineering project today?`;
    }

    // Mobile
    if (q.includes('flutter') || q.includes('react native') || q.includes('mobile') || q.includes('app')) {
      return `**OFOQ Mobile Architecture Comparison & Recommendation:**

1. **Flutter (OFOQ Standard)**:
   - **Performance**: High-fidelity 60/120 FPS powered by the C++ Impeller graphics engine.
   - **Code Reuse**: ~95% shared codebase across iOS & Android with unified design systems.
   - **Best For**: Rapid MVP delivery, feature-rich consumer apps, and cross-platform enterprise products.

2. **React Native**:
   - **Advantage**: Leverages existing React & TypeScript engineering talent.
   - **Trade-off**: Maintenance overhead across native bridges and upgrade cycles.

3. **Pure Native (SwiftUI / Jetpack Compose)**:
   - **Requirement**: Heavy background compute, custom audio processing, or low-level Bluetooth/AR hardware integration.

⚡ **OFOQ Verdict**: Choose Flutter for fastest velocity, unmatched UI consistency, and optimal ROI.`;
    }

    // Web & Frontend
    if (q.includes('next') || q.includes('react') || q.includes('frontend') || q.includes('web')) {
      return `**OFOQ Production Web Architecture Baseline:**

• **Next.js 15 (App Router) + React 19**:
  - React Server Components (RSC) to achieve zero client-side JavaScript for static data trees.
  - Set performance targets and measure them under realistic conditions.
• **Tailwind CSS v4**:
  - Rust-based high-performance compiler with zero runtime CSS footprint.
• **Data & State Management**:
  - **TanStack Query** for robust asynchronous server cache with optimistic UI mutation.
  - **Zustand** for lean, boilerplate-free client state.
• **Strict Type Safety**:
  - TypeScript strict mode and runtime schema validation with **Zod**.`;
    }

    // Databases
    if (q.includes('database') || q.includes('postgres') || q.includes('mongo') || q.includes('redis') || q.includes('sql')) {
      return `**OFOQ Data Engineering Strategy:**

• **PostgreSQL (Primary Source of Truth)**:
  - ACID-compliant transactional guarantees with advanced JSONB indexing.
  - Native **pgvector** support for semantic AI embeddings without running disparate vector databases.
• **Redis (Ultra-fast In-Memory Layer)**:
  - Sub-millisecond response latency.
  - Ideal for session state, distributed rate limiting, and pub/sub message brokers.
• **MongoDB / NoSQL**:
  - Reserved for unstructured event streams, audit logging, and dynamic polymorphic schemas.

⚡ **OFOQ Standard**: Start with a well-indexed PostgreSQL instance and front high-frequency reads with Redis cache.`;
    }

    // Backend & Microservices
    if (q.includes('backend') || q.includes('server') || q.includes('go') || q.includes('node') || q.includes('api') || q.includes('microservice') || q.includes('monolith')) {
      return `**General backend architecture considerations:**

1. **Architecture Pattern**:
   - **Modular Monolith First**: Keep services in a structured, decoupled monolith (Clean Architecture / Hexagonal) until domain boundaries and traffic genuinely warrant distributed microservices.
2. **Language Runtime**:
   - **Go (Golang)**: For high-throughput concurrency, microservices, and latency requirements measured against project workloads.
   - **Node.js / TypeScript**: For rapid API delivery and shared TypeScript contracts with frontend clients.
3. **Protocols**:
   - **REST + OpenAPI 3**: Standard client-facing contract.
   - **gRPC (HTTP/2 + Protocol Buffers)**: High-speed internal service-to-service communication.`;
    }

    // DevOps & Cloud
    if (q.includes('docker') || q.includes('cloud') || q.includes('devops') || q.includes('kubernetes') || q.includes('ci/cd')) {
      return `**Common cloud and DevOps options:**

• **Containerization**:
  - Multi-stage Docker builds yielding minimal (a size appropriate to the deployment) distroless container images.
• **CI/CD Automation (GitHub Actions)**:
  - Automated pipeline: Lint -> Unit Tests -> Vulnerability Scan -> Container Build -> Immutable Deployment.
• **Cloud Targets**:
  - **Cloud Run / AWS ECS Fargate**: Serverless container execution scaling down to zero for cost efficiency.
  - **Kubernetes (GKE/EKS)**: Applied for multi-cluster enterprise deployments with complex service meshes.`;
    }

    // AI & LLM
    if (q.includes('ai') || q.includes('gemini') || q.includes('rag') || q.includes('llm')) {
      return `**Common AI integration considerations:**

• **Model Hierarchy**:
  - **a current Gemini Flash model selected for the project**: Low-latency, cost-effective inference for real-time user assistance.
  - **a model suited to complex reasoning, if available**: High-reasoning tasks, algorithmic verification, and complex code analysis.
• **Enterprise RAG**:
  - Hybrid search combining PostgreSQL \`pgvector\` cosine similarity with full-text search.
  - Prompt injection sanitization and output validation before delivering responses to the client.`;
    }

    // Default fast technical answer
    return `**OFOQ Technical Advisory:**

General software projects often consider:
1. **Strict Type Safety**: Reducing some classes of runtime errors through strict TypeScript or Go schemas.
2. **Domain-Driven Clean Architecture**: Decoupling UI presentation, domain business rules, and infrastructure data adapters.
3. **Multi-tier Caching**: CDN edge caching, Redis data caching, and database read replica optimization.
4. **Resilience & Observability**: Structured JSON logging, health checks, and automated CI/CD deployment pipelines.

Tell me about your specific technology stack, platform, or project requirements for an exact architectural blueprint!`;
  }
}

// Lightweight in-memory throttling for the public AI endpoint.
// For multi-instance deployments, use a shared store (e.g. Redis) instead.
const chatRate = new Map<string, { count: number; resetAt: number }>();
const CHAT_WINDOW_MS = 60_000;
const CHAT_MAX_REQUESTS = 15;

// Multi-turn Gemini Chat Endpoint (Fast & Strictly Technical)
app.post('/api/chat', async (req, res) => {
  const now = Date.now();
  const clientKey = req.ip || req.socket.remoteAddress || 'unknown';
  const bucket = chatRate.get(clientKey);
  if (!bucket || bucket.resetAt <= now) {
    chatRate.set(clientKey, { count: 1, resetAt: now + CHAT_WINDOW_MS });
  } else if (bucket.count >= CHAT_MAX_REQUESTS) {
    res.setHeader('Retry-After', String(Math.ceil((bucket.resetAt - now) / 1000)));
    return res.status(429).json({ error: 'Too many requests. Please try again shortly.' });
  } else {
    bucket.count += 1;
  }
  // Prune expired entries so the map does not grow indefinitely.
  for (const [key, value] of chatRate) {
    if (value.resetAt <= now) chatRate.delete(key);
  }
  try {
    const { messages, lang = 'en' } = req.body;

    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
      return res.status(400).json({ error: 'Provide between 1 and 20 messages.' });
    }
    const validMessages = messages.every((message: unknown) => {
      if (!message || typeof message !== 'object') return false;
      const item = message as { role?: unknown; content?: unknown };
      return (item.role === 'user' || item.role === 'assistant') &&
        typeof item.content === 'string' && item.content.length <= 4000;
    });
    if (!validMessages) {
      return res.status(400).json({ error: 'Each message must have a valid role and text under 4000 characters.' });
    }

    const lastMessage = messages[messages.length - 1].content.trim();
    if (lastMessage.length < 2) {
      return res.status(400).json({ error: 'Message is too short.' });
    }
    const safeLang: 'ar' | 'en' = lang === 'ar' ? 'ar' : 'en';

    // Fast reject non-technical requests (< 5ms)
    if (!isTechnicalQuery(lastMessage)) {
      const declineMsg = safeLang === 'ar'
        ? 'عذراً، أنا مستشار تقني متخصص في هندسة البرمجيات والحلول الرقمية لفريق "أُفُق" فقط.\nأنا مخصص للإجابة عن الأسئلة البرمجية والتقنية حصراً (مثل: تطوير الويب والجوال، قواعد البيانات، معمارية النظم، البنية السحابية، أو اختيار التقنيات). يرجى توجيه استفسار تقني وسأجيبك فوراً.'
        : 'Apologies, I am strictly a technical and software engineering advisor for the OFOQ team.\nI exclusively respond to software, programming, and architecture inquiries (such as web/mobile frameworks, databases, cloud infrastructure, API design, or tech stack selection). Please share a technical question and I will be happy to assist.';
      return res.json({ reply: declineMsg });
    }

    // Try Gemini API with a strict 2.5-second timeout race
    if (ai) {
      try {
        const systemInstruction = safeLang === 'ar'
          ? `أنت مساعد يجيب عن أسئلة تقنية عامة لصالح موقع أفق. قدّم إرشادات عامة وموجزة عن البرمجيات والتقنيات.
لا تخترع معلومات عن أفق، مثل العملاء أو المشاريع أو خبرات الفريق أو الأسعار أو أوقات الرد أو التوافر أو الضمانات. إذا سُئلت عن هذه المعلومات ولم تكن موجودة في السياق، فقل إنك لا تعرف ووجّه المستخدم إلى التواصل مع الفريق.
لا تَعِد بنتائج أو أداء أو أمان محدد. وضّح أن التوصيات تعتمد على متطلبات المشروع، واطلب التحقق من المعلومات المتغيرة مثل الإصدارات والأسعار والتوافر.
لا تدّع أنك موظف أو مهندس لدى أفق. أجب بإيجاز، واستخدم أمثلة عملية عند الحاجة.`
          : `You are a technical assistant for the OFOQ website. Give concise, general software and technology guidance.
Do not invent facts about OFOQ, including clients, projects, team experience, prices, response times, availability, or guarantees. If asked for company details that are not present in context, say you do not know and direct the user to contact the team.
Do not promise specific performance, security, or outcomes. Explain that recommendations depend on project requirements, and advise checking changeable details such as versions, prices, and availability.
Do not claim to be an OFOQ employee or engineer. Answer concisely and use practical examples when useful.`;

        const contents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        }));

        // 1500ms timeout race for ultra-snappy response
        const geminiPromise = ai.models.generateContent({
          model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.2,
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('AI_TIMEOUT')), 1500)
        );

        const response: any = await Promise.race([geminiPromise, timeoutPromise]);
        if (response && response.text) {
          return res.json({ reply: response.text });
        }
      } catch (geminiError: any) {
        // Log brief error and immediately proceed to fast fallback
        console.warn('Gemini API fast-path fallback:', geminiError?.message || geminiError);
      }
    }

    // Instant technical advisory fallback (< 10ms)
    const instantReply = getTechnicalAdvisoryReply(lastMessage, safeLang);
    return res.json({ reply: instantReply });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    const safeLang: 'ar' | 'en' = req.body?.lang === 'ar' ? 'ar' : 'en';
    const instantReply = getTechnicalAdvisoryReply(req.body?.messages?.slice(-1)[0]?.content || '', safeLang);
    return res.json({ reply: instantReply });
  }
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
