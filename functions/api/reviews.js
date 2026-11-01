function json(body, status = 200, cache = 'no-store') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': cache,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function onRequestGet({ env }) {
  const supabaseUrl = (env.SUPABASE_URL || '').replace(/\/$/, '');
  const anonKey = env.SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !anonKey) {
    return json({ error: 'database_not_configured' }, 503);
  }

  const query = new URLSearchParams({
    select: 'id,display_name,company,rating,review_text,created_at',
    is_approved: 'eq.true',
    order: 'created_at.desc',
    limit: '100',
  });

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/reviews?${query.toString()}`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Public reviews query failed with status:', response.status);
      return json({ error: 'reviews_unavailable' }, 503);
    }

    const items = await response.json();
    return json(
      { items: Array.isArray(items) ? items : [] },
      200,
      'public, max-age=60, stale-while-revalidate=300'
    );
  } catch (error) {
    console.error('Public reviews request failed:', error);
    return json({ error: 'reviews_unavailable' }, 503);
  }
}
