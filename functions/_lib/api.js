// Shared helpers for Cloudflare Pages Functions.
// Files in functions/ that export no onRequest* handler are not routes, so this is safe to import.

export const CONTENT_TYPES = ['project', 'tool', 'python_script', 'open_source_project', 'article'];

const CONTENT_FIELDS = [
  'content_type', 'title', 'slug', 'summary', 'body', 'cover_image_url', 'source_url',
  'github_url', 'download_url', 'license', 'language', 'requirements', 'tags', 'is_published',
];

export const PUBLIC_CONTENT_SELECT =
  'id,content_type,title,slug,summary,body,cover_image_url,source_url,github_url,download_url,license,language,requirements,tags,is_published,created_at,updated_at';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_BODY_BYTES = 32 * 1024;

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function json(body, status = 200, cache = 'no-store', extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache,
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });
}

// Wraps a handler so thrown ApiErrors become JSON responses and anything else becomes a 500.
export const route = (handler) => async (context) => {
  try {
    return await handler(context);
  } catch (error) {
    if (error instanceof ApiError) return json({ error: error.message }, error.status);
    console.error('Unhandled API error:', error);
    return json({ error: 'حدث خطأ غير متوقع في الخادم.' }, 500);
  }
};

// Fallback for methods a route does not support (otherwise Pages answers with a bare 405).
export const methodNotAllowed = (...allowed) => () =>
  json({ error: 'الطريقة غير مسموح بها.' }, 405, 'no-store', { Allow: allowed.join(', ') });

export const isUuid = (value) => typeof value === 'string' && UUID_RE.test(value);
export const isEmail = (value) => typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value);

export async function readJson(request) {
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) throw new ApiError(413, 'حجم الطلب كبير جدًا.');
  try {
    const data = text ? JSON.parse(text) : {};
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error();
    return data;
  } catch {
    throw new ApiError(400, 'بيانات الطلب غير صالحة.');
  }
}

// ---- Supabase ----

function settings(env) {
  return {
    url: (env.SUPABASE_URL || '').replace(/\/$/, ''),
    anonKey: env.SUPABASE_ANON_KEY || '',
    serviceKey: env.SUPABASE_SERVICE_ROLE_KEY || '',
  };
}

// New-style keys (sb_publishable_/sb_secret_) are not JWTs and must only be sent in `apikey`.
const authHeader = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

export function assertConfigured(env, { service = false } = {}) {
  const { url, anonKey, serviceKey } = settings(env);
  if (!url || !anonKey || (service && !serviceKey)) {
    throw new ApiError(503, 'قاعدة البيانات غير مهيأة. أضف متغيرات Supabase في إعدادات Cloudflare Pages.');
  }
}

// options: { method, body, token (user JWT), service (use the service-role key), prefer }
export async function supabase(env, endpoint, options = {}) {
  const { url, anonKey, serviceKey } = settings(env);
  const key = options.service ? serviceKey : anonKey;
  const token = options.token || (key.startsWith('eyJ') ? key : '');
  const headers = { apikey: key, Accept: 'application/json', ...authHeader(token) };
  if (options.body !== undefined) headers['Content-Type'] = 'application/json';
  if (options.prefer) headers.Prefer = options.prefer;

  const response = await fetch(`${url}${endpoint}`, {
    method: options.method || 'GET',
    headers,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  });

  const raw = await response.text();
  let data = null;
  try { data = raw ? JSON.parse(raw) : null; } catch { data = null; }

  if (!response.ok) {
    const error = new Error(data?.msg || data?.message || data?.error_description || data?.error || `Supabase request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return data;
}

// ---- Admin auth ----

export async function getAdminProfile(env, userId) {
  const rows = await supabase(env, `/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=id,display_name,role&limit=1`, { service: true });
  return Array.isArray(rows) && rows[0]?.role === 'admin' ? rows[0] : null;
}

export async function requireAdmin(request, env) {
  assertConfigured(env, { service: true });
  const token = (request.headers.get('Authorization') || '').match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) throw new ApiError(401, 'يلزم تسجيل الدخول.');

  let user;
  try {
    user = await supabase(env, '/auth/v1/user', { token });
  } catch (error) {
    if (error.status === 401 || error.status === 403) throw new ApiError(401, 'انتهت الجلسة. سجّل الدخول من جديد.');
    throw new ApiError(503, 'تعذر التحقق من صلاحيات الإدارة.');
  }
  if (!user?.id || !user?.email) throw new ApiError(401, 'جلسة غير صالحة.');

  let profile;
  try {
    profile = await getAdminProfile(env, user.id);
  } catch {
    throw new ApiError(503, 'تعذر التحقق من صلاحيات الإدارة.');
  }
  if (!profile) throw new ApiError(403, 'هذا الحساب لا يملك صلاحية الإدارة.');
  return { id: user.id, email: user.email, display_name: profile.display_name || 'OFOQ Admin' };
}

// ---- Rate limiting ----
// Best effort only: counters live in the memory of one Worker isolate, so they slow bursts
// but are not a hard guarantee. Supabase Auth applies its own limits to password logins.

export const clientIp = (request) => request.headers.get('CF-Connecting-IP') || 'unknown';

export function createLimiter(max, windowMs) {
  const store = new Map();
  const prune = (now) => { for (const [key, value] of store) if (value.resetAt <= now) store.delete(key); };
  return {
    isBlocked(key) {
      const now = Date.now(); prune(now);
      const entry = store.get(key);
      return Boolean(entry && entry.count >= max);
    },
    hit(key) {
      const now = Date.now();
      const entry = store.get(key);
      store.set(key, entry && entry.resetAt > now ? { count: entry.count + 1, resetAt: entry.resetAt } : { count: 1, resetAt: now + windowMs });
    },
    reset(key) { store.delete(key); },
  };
}

// ---- Content validation ----

export function cleanContentInput(input, partial = false) {
  const result = {};
  for (const key of CONTENT_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(input, key)) result[key] = input[key];
  }

  if (!partial || 'title' in result) {
    if (typeof result.title !== 'string' || result.title.trim().length < 2 || result.title.trim().length > 180) {
      throw new ApiError(400, 'العنوان مطلوب (من 2 إلى 180 حرفًا).');
    }
    result.title = result.title.trim();
  }
  if ((!partial || 'content_type' in result) && !CONTENT_TYPES.includes(result.content_type)) {
    throw new ApiError(400, 'نوع المحتوى غير صالح.');
  }
  if ((!partial || 'slug' in result) && (typeof result.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result.slug))) {
    throw new ApiError(400, 'الرابط المختصر يجب أن يتكون من أحرف إنجليزية صغيرة وأرقام وشرطات.');
  }
  for (const key of ['summary', 'body', 'license', 'language', 'requirements']) {
    if (key in result && (typeof result[key] !== 'string' || result[key].length > (key === 'body' ? 30000 : 6000))) {
      throw new ApiError(400, `قيمة ${key} غير صالحة أو طويلة جدًا.`);
    }
  }
  for (const key of ['cover_image_url', 'source_url', 'github_url', 'download_url']) {
    if (!(key in result)) continue;
    if (result[key] === '' || result[key] === null) { result[key] = null; continue; }
    try {
      if (!['https:', 'http:'].includes(new URL(result[key]).protocol)) throw new Error();
    } catch {
      throw new ApiError(400, `الرابط ${key} غير صالح.`);
    }
  }
  if ('tags' in result && (!Array.isArray(result.tags) || result.tags.length > 20 || result.tags.some((t) => typeof t !== 'string' || t.length > 40))) {
    throw new ApiError(400, 'الوسوم غير صالحة.');
  }
  if ('is_published' in result && typeof result.is_published !== 'boolean') {
    throw new ApiError(400, 'حالة النشر غير صالحة.');
  }
  return result;
}

// Turns a Supabase write failure into a user-facing error (duplicate slug is the common one).
export function contentWriteError(error, fallback) {
  if (error?.status === 409) return new ApiError(409, 'الرابط المختصر مستخدم مسبقًا. اختر رابطًا مختلفًا.');
  console.error(fallback, error);
  return new ApiError(503, fallback);
}
