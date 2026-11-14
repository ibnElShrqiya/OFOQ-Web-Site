import { ApiError, cleanContentInput, contentWriteError, isUuid, json, methodNotAllowed, readJson, requireAdmin, route, supabase } from '../../../_lib/api.js';

function contentId(params) {
  if (!isUuid(params.id)) throw new ApiError(400, 'معرّف المحتوى غير صالح.');
  return encodeURIComponent(params.id);
}

// PATCH /api/admin/content/:id: partial update.
export const onRequestPatch = route(async ({ request, env, params }) => {
  await requireAdmin(request, env);
  const id = contentId(params);
  const item = cleanContentInput(await readJson(request), true);
  if (!Object.keys(item).length) throw new ApiError(400, 'لا توجد حقول لتحديثها.');
  item.updated_at = new Date().toISOString();

  let result;
  try {
    result = await supabase(env, `/rest/v1/content_items?id=eq.${id}`, { method: 'PATCH', service: true, prefer: 'return=representation', body: item });
  } catch (error) {
    throw contentWriteError(error, 'تعذر تحديث المحتوى.');
  }
  if (!Array.isArray(result) || !result.length) throw new ApiError(404, 'المحتوى غير موجود.');
  return json({ item: result[0] });
});

// DELETE /api/admin/content/:id
export const onRequestDelete = route(async ({ request, env, params }) => {
  await requireAdmin(request, env);
  const id = contentId(params);
  try {
    await supabase(env, `/rest/v1/content_items?id=eq.${id}`, { method: 'DELETE', service: true, prefer: 'return=minimal' });
  } catch (error) {
    throw contentWriteError(error, 'تعذر حذف المحتوى.');
  }
  return json({ ok: true });
});

export const onRequest = methodNotAllowed('PATCH', 'DELETE');
