import { ApiError, isUuid, json, methodNotAllowed, readJson, requireAdmin, route, supabase } from '../../../_lib/api.js';

// PATCH /api/admin/reviews/:id with { is_approved: boolean }
export const onRequestPatch = route(async ({ request, env, params }) => {
  await requireAdmin(request, env);
  const { is_approved } = await readJson(request);
  if (!isUuid(params.id) || typeof is_approved !== 'boolean') throw new ApiError(400, 'بيانات مراجعة التقييم غير صالحة.');

  let result;
  try {
    result = await supabase(env, `/rest/v1/reviews?id=eq.${encodeURIComponent(params.id)}`, { method: 'PATCH', service: true, prefer: 'return=representation', body: { is_approved } });
  } catch (error) {
    console.error('Review moderation failed:', error);
    throw new ApiError(503, 'تعذر تحديث التقييم.');
  }
  if (!Array.isArray(result) || !result.length) throw new ApiError(404, 'التقييم غير موجود.');
  return json({ item: result[0] });
});

// DELETE /api/admin/reviews/:id
export const onRequestDelete = route(async ({ request, env, params }) => {
  await requireAdmin(request, env);
  if (!isUuid(params.id)) throw new ApiError(400, 'معرّف التقييم غير صالح.');
  try {
    await supabase(env, `/rest/v1/reviews?id=eq.${encodeURIComponent(params.id)}`, { method: 'DELETE', service: true, prefer: 'return=minimal' });
  } catch (error) {
    console.error('Review deletion failed:', error);
    throw new ApiError(503, 'تعذر حذف التقييم.');
  }
  return json({ ok: true });
});

export const onRequest = methodNotAllowed('PATCH', 'DELETE');
