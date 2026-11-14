import { ApiError, assertConfigured, clientIp, createLimiter, isEmail, json, methodNotAllowed, readJson, route, supabase } from '../_lib/api.js';

const limiter = createLimiter(5, 15 * 60 * 1000);
const PRIORITIES = ['routine', 'elevated', 'critical_soc'];

// POST /api/contact: saves a contact message for the admin inbox.
export const onRequestPost = route(async ({ request, env }) => {
  assertConfigured(env, { service: true });

  const ip = clientIp(request);
  if (limiter.isBlocked(ip)) throw new ApiError(429, 'تم تجاوز عدد الرسائل المسموح به مؤقتًا. حاول لاحقًا.');

  const { name, email, company = '', phone = '', serviceId = '', priority = 'routine', subject = '', message } = await readJson(request);
  if (
    typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 120 ||
    !isEmail(email) ||
    typeof company !== 'string' || company.length > 180 ||
    typeof phone !== 'string' || phone.length > 40 ||
    typeof serviceId !== 'string' || serviceId.length > 120 ||
    !PRIORITIES.includes(priority) ||
    typeof subject !== 'string' || subject.length > 180 ||
    typeof message !== 'string' || message.trim().length < 5 || message.length > 6000
  ) {
    throw new ApiError(400, 'يرجى إدخال بيانات تواصل صحيحة.');
  }

  try {
    await supabase(env, '/rest/v1/contact_messages', {
      method: 'POST',
      service: true,
      prefer: 'return=minimal',
      body: {
        name: name.trim(), email: email.trim().toLowerCase(), company: company.trim(), phone: phone.trim(),
        service_id: serviceId, priority, subject: subject.trim(), message: message.trim(),
      },
    });
  } catch (error) {
    console.error('Contact submission failed:', error);
    throw new ApiError(503, 'تعذر إرسال الرسالة الآن. حاول لاحقًا.');
  }
  limiter.hit(ip);
  return json({ ok: true }, 201);
});

export const onRequest = methodNotAllowed('POST');
