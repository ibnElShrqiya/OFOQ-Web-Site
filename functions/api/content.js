const CONTENT_TYPES = new Set([
  'project',
  'tool',
  'python_script',
  'open_source_project',
  'article',
]);

const FIELDS = [
  'id',
  'content_type',
  'title',
  'slug',
  'summary',
  'body',
  'cover_image_url',
  'source_url',
  'github_url',
  'download_url',
  'license',
  'language',
  'requirements',
  'tags',
  'is_published',
  'created_at',
  'updated_at',
].join(',');

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

export async function onRequestGet({ request, env }) {
  const supabaseUrl = (env.SUPABASE_URL || '').replace(/\/$/, '');
  const anonKey = env.SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !anonKey) {
    return json({ error: 'database_not_configured' }, 503);
  }

  const type = new URL(request.url).searchParams.get('type') || '';
  if (type && !CONTENT_TYPES.has(type)) {
    return json({ error: 'invalid_content_type' }, 400);
  }

  const query = new URLSearchParams({
    select: FIELDS,
    is_published: 'eq.true',
    order: 'created_at.desc',
    limit: '100',
  });
  if (type) query.set('content_type', `eq.${type}`);

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/content_items?${query.toString()}`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Public content query failed with status:', response.status);
      return json({ error: 'content_unavailable' }, 503);
    }

    const items = await response.json();
    return json(
      { items: Array.isArray(items) ? items : [] },
      200,
      'public, max-age=60, stale-while-revalidate=300'
    );
  } catch (error) {
    console.error('Public content request failed:', error);
    return json({ error: 'content_unavailable' }, 503);
  }
}
