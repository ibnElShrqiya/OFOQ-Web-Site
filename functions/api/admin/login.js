import { ApiError, assertConfigured, clientIp, createLimiter, getAdminProfile, isEmail, json, methodNotAllowed, readJson, route, supabase } from '../../_lib/api.js';

const limiter = createLimiter(8, 15 * 60 * 1000);

// POST /api/admin/login: password sign-in through Supabase Auth, allowed for admin profiles only.
export const onRequestPost = route(async ({ request, env }) => {
  assertConfigured(env, { service: true });

  const ip = clientIp(request);
  if (limiter.isBlocked(ip)) throw new ApiError(429, 'محاولات كثيرة. حاول مرة أخرى بعد 15 دقيقة.');

  const body = await readJson(request);
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  if (!isEmail(email) || password.length < 8 || password.length > 256) {
    throw new ApiError(400, 'أدخل بريدًا إلكترونيًا وكلمة مرور صالحين.');
  }

  let session;
  try {
    session = await supabase(env, '/auth/v1/token?grant_type=password', { method: 'POST', body: { email, password } });
  } catch (error) {
    limiter.hit(ip);
    if (error.status === 429) throw new ApiError(429, 'محاولات كثيرة. حاول مرة أخرى لاحقًا.');
    if (error.status >= 500) throw new ApiError(503, 'تعذر الاتصال بخدمة المصادقة. حاول لاحقًا.');
    throw new ApiError(401, 'تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.');
  }

  let profile;
  try {
    profile = await getAdminProfile(env, session.user.id);
  } catch (error) {
    console.error('Admin profile lookup failed:', error);
    throw new ApiError(503, 'تعذر التحقق من صلاحيات الإدارة. تأكد من تطبيق supabase-schema.sql.');
  }
  if (!profile) {
    limiter.hit(ip);
    throw new ApiError(403, 'الحساب غير مخوّل لدخول لوحة الإدارة.');
  }

  limiter.reset(ip);
  return json({
    access_token: session.access_token,
    expires_in: session.expires_in,
    user: { id: session.user.id, email: session.user.email },
  });
});

export const onRequest = methodNotAllowed('POST');
