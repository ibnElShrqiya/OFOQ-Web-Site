import { json, methodNotAllowed, supabase } from '../_lib/api.js';

// GET /api/health: confirms the Supabase variables are set and the schema is reachable.
export async function onRequestGet({ env }) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY || !env.SUPABASE_SERVICE_ROLE_KEY) {
    return json({ status: 'degraded', database: 'not_configured' }, 503);
  }
  try {
    await supabase(env, '/rest/v1/profiles?select=id&limit=1', { service: true });
    return json({ status: 'ok', database: 'connected' });
  } catch {
    return json({ status: 'degraded', database: 'unreachable_or_schema_missing' }, 503);
  }
}

export const onRequest = methodNotAllowed('GET');
