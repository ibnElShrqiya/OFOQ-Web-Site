import { ApiError, json, methodNotAllowed, requireAdmin, route, supabase } from '../../../_lib/api.js';

// GET /api/admin/messages: contact inbox, newest first.
export const onRequestGet = route(async ({ request, env }) => {
  await requireAdmin(request, env);
  try {
    const items = await supabase(env, '/rest/v1/contact_messages?select=*&order=created_at.desc&limit=300', { service: true });
    return json({ items });
  } catch (error) {
    console.error('Messages query failed:', error);
    throw new ApiError(503, 'تعذر تحميل الرسائل.');
  }
});

export const onRequest = methodNotAllowed('GET');
