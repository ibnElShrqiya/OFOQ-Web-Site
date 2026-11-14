import { json, methodNotAllowed, requireAdmin, route } from '../../_lib/api.js';

// GET /api/admin/me: the signed-in admin's identity.
export const onRequestGet = route(async ({ request, env }) => json(await requireAdmin(request, env)));

export const onRequest = methodNotAllowed('GET');
