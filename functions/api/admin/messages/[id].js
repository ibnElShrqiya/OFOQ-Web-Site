import { ApiError, isUuid, json, methodNotAllowed, readJson, requireAdmin, route, supabase } from '../../../_lib/api.js';

const STATUSES = ['new', 'in_progress', 'resolved', 'spam'];

// PATCH /api/admin/messages/:id with { status }
export const onRequestPatch = route(async ({ request, env, params }) => {
  await requireAdmin(request, env);
  if (!isUuid(params.id)) throw new ApiError(400, 'معرّف الرسالة غير صالح.');
  const { status } = await readJson(request);
  if (!STATUSES.includes(status)) throw new ApiError(400, 'حالة الرسالة غير صالحة.');

  let result;
  try {
    result = await supabase(env, `/rest/v1/contact_messages?id=eq.${encodeURIComponent(params.id)}`, { method: 'PATCH', service: true, prefer: 'return=representation', body: { status } });
  } catch (error) {
    console.error('Update message failed:', error);
    throw new ApiError(503, 'تعذر تحديث الرسالة.');
  }
  if (!Array.isArray(result) || !result.length) throw new ApiError(404, 'الرسالة غير موجودة.');
  return json({ item: result[0] });
});

export const onRequest = methodNotAllowed('PATCH');
