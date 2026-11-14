import { CONTENT_TYPES, PUBLIC_CONTENT_SELECT, assertConfigured, json, methodNotAllowed, route, supabase, ApiError } from '../_lib/api.js';

// GET /api/content?type=project|tool|python_script|open_source_project|article
// Published items only; row-level security enforces the same rule in the database.
export const onRequestGet = route(async ({ request, env }) => {
  assertConfigured(env);

  const type = new URL(request.url).searchParams.get('type') || '';
  if (type && !CONTENT_TYPES.includes(type)) throw new ApiError(400, 'نوع المحتوى غير صالح.');

  const query = new URLSearchParams({
    select: PUBLIC_CONTENT_SELECT,
    is_published: 'eq.true',
    order: 'created_at.desc',
    limit: '100',
  });
  if (type) query.set('content_type', `eq.${type}`);

  let items;
  try {
    items = await supabase(env, `/rest/v1/content_items?${query}`);
  } catch (error) {
    console.error('Public content query failed:', error);
    throw new ApiError(503, 'تعذر تحميل المحتوى حاليًا.');
  }
  return json({ items: Array.isArray(items) ? items : [] }, 200, 'public, max-age=60, stale-while-revalidate=300');
});

export const onRequest = methodNotAllowed('GET');
