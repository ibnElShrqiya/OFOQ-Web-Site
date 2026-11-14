import { ApiError, CONTENT_TYPES, cleanContentInput, contentWriteError, json, methodNotAllowed, readJson, requireAdmin, route, supabase } from '../../../_lib/api.js';

// GET /api/admin/content?type=...: all items of a type, including drafts.
export const onRequestGet = route(async ({ request, env }) => {
  await requireAdmin(request, env);
  const type = new URL(request.url).searchParams.get('type') || '';
  if (!CONTENT_TYPES.includes(type)) throw new ApiError(400, 'نوع المحتوى غير صالح.');

  try {
    const items = await supabase(env, `/rest/v1/content_items?select=*&content_type=eq.${encodeURIComponent(type)}&order=created_at.desc&limit=200`, { service: true });
    return json({ items });
  } catch (error) {
    throw contentWriteError(error, 'تعذر تحميل المحتوى.');
  }
});

// POST /api/admin/content: create an item.
export const onRequestPost = route(async ({ request, env }) => {
  const admin = await requireAdmin(request, env);
  const item = cleanContentInput(await readJson(request));
  item.created_by = admin.id;

  try {
    const result = await supabase(env, '/rest/v1/content_items', { method: 'POST', service: true, prefer: 'return=representation', body: item });
    return json({ item: Array.isArray(result) ? result[0] : result }, 201);
  } catch (error) {
    throw contentWriteError(error, 'تعذر حفظ المحتوى.');
  }
});

export const onRequest = methodNotAllowed('GET', 'POST');
