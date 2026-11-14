import { ApiError, json, methodNotAllowed, requireAdmin, route, supabase } from '../../../_lib/api.js';

// GET /api/admin/reviews: every review, approved or pending.
export const onRequestGet = route(async ({ request, env }) => {
  await requireAdmin(request, env);
  try {
    const items = await supabase(env, '/rest/v1/reviews?select=*&order=created_at.desc&limit=300', { service: true });
    return json({ items });
  } catch (error) {
    console.error('Admin reviews query failed:', error);
    throw new ApiError(503, 'تعذر تحميل التقييمات.');
  }
});

export const onRequest = methodNotAllowed('GET');
