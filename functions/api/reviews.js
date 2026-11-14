import { ApiError, assertConfigured, clientIp, createLimiter, json, methodNotAllowed, readJson, route, supabase } from '../_lib/api.js';

const limiter = createLimiter(5, 15 * 60 * 1000);

// GET /api/reviews: approved reviews only.
export const onRequestGet = route(async ({ env }) => {
  assertConfigured(env);

  const query = new URLSearchParams({
    select: 'id,display_name,company,rating,review_text,created_at',
    is_approved: 'eq.true',
    order: 'created_at.desc',
    limit: '100',
  });

  let items;
  try {
    items = await supabase(env, `/rest/v1/reviews?${query}`);
  } catch (error) {
    console.error('Public reviews query failed:', error);
    throw new ApiError(503, 'تعذر تحميل التقييمات حاليًا.');
  }
  return json({ items: Array.isArray(items) ? items : [] }, 200, 'public, max-age=60, stale-while-revalidate=300');
});

// POST /api/reviews: stored as pending until an admin approves it.
export const onRequestPost = route(async ({ request, env }) => {
  assertConfigured(env, { service: true });

  const ip = clientIp(request);
  if (limiter.isBlocked(ip)) throw new ApiError(429, 'تم تجاوز عدد التقييمات المسموح به مؤقتًا. حاول لاحقًا.');

  const { display_name, company = '', rating, review_text } = await readJson(request);
  if (
    typeof display_name !== 'string' || display_name.trim().length < 2 || display_name.trim().length > 100 ||
    typeof company !== 'string' || company.length > 180 ||
    !Number.isInteger(rating) || rating < 1 || rating > 5 ||
    typeof review_text !== 'string' || review_text.trim().length < 5 || review_text.length > 2000
  ) {
    throw new ApiError(400, 'بيانات التقييم غير صالحة.');
  }

  try {
    await supabase(env, '/rest/v1/reviews', {
      method: 'POST',
      service: true,
      prefer: 'return=minimal',
      body: { display_name: display_name.trim(), company: company.trim() || null, rating, review_text: review_text.trim(), is_approved: false },
    });
  } catch (error) {
    console.error('Review submission failed:', error);
    throw new ApiError(503, 'تعذر إرسال التقييم الآن.');
  }
  limiter.hit(ip);
  return json({ ok: true }, 201);
});

export const onRequest = methodNotAllowed('GET', 'POST');
