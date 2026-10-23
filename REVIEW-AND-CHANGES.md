# OFOQ — Change & Security Review

## Visual refinements
- Preserved the existing navy/cyan identity, page structure, content, and interactions.
- Softened the strongest cyan glow/shadow utilities so CTAs and cards feel more restrained.
- Reduced the homepage section spacing slightly to make the page feel less oversized.
- Added a `prefers-reduced-motion` rule and visible keyboard focus styling.

## Security hardening applied
- Added baseline response headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy`; disabled Express's `X-Powered-By` header.
- Limited JSON request bodies to 32 KB.
- Added per-IP in-memory throttling to `/api/chat` (15 requests/minute per process).
- Validated chat message count, roles, and content lengths before sending prompts to the AI provider.

## Important remaining items before production
1. **Use a shared rate-limit store** (e.g. Redis) and configure trusted proxy behavior correctly for multi-instance deployments. The current in-memory limiter is a baseline, not distributed protection.
2. **Add a Content Security Policy** after confirming all required script/style/font sources; a strict policy needs testing with the current Vite and Google Fonts setup.
3. Structured business contact details have been updated to the supplied Egyptian mobile number. Confirm the final deployed domain and metadata before launch.
4. **Verify `/api/download-zip`.** It expects `public/ofoq-project.zip`, but that file is not present in the supplied archive; the endpoint will fail until the intended downloadable archive is placed there or the route is removed.
5. **Reviews and contact submissions are browser-local only** (`src/data/storage.ts`). They are not a shared database and visitors' submissions are not delivered to the business. Do not present them as production lead management without a backend, validation, abuse controls, and privacy disclosures.
6. **Check the Gemini model ID and API quota in deployment.** Confirm the configured model is available to the target API key, and set provider-side usage limits/alerts. Keep `GEMINI_API_KEY` server-side only.
7. **Build/test on the target Node version** and run dependency/security audits before deployment. No dependencies were installed and the project was not executed as part of this file review.

## Scope note
This review is based on static inspection of the provided source. It is not a penetration test or a guarantee that the application is secure.

## Database and admin foundation added

- Added `supabase-schema.sql` for profiles/roles, published content, contact messages, reviews, RLS policies, indexes, and an auth profile trigger.
- Added Express endpoints for Supabase password login, per-request JWT/admin role verification, content CRUD, public published-content reads, contact submissions, and message status updates.
- Added `/admin` dark-themed admin UI with content categories, draft/publish controls, search, and contact inbox.
- Added a public Tech Library page wired to the published-content API for Linux tools, Python scripts, and open-source projects.
- Contact form now posts to the server/database; its old local history is retained only for compatibility.
- Added `SUPABASE-SETUP.md` with setup, initial admin promotion, environment variables, and verification steps.

### Not completed remotely

No live Supabase connection has been verified from this archive. Run the SQL and configure server environment variables before the admin/database features can work. A production build could not be run in this environment because npm dependency installation timed out; TypeScript/TSX syntax transpilation passed, but full type-check/build remains to be performed after dependencies are installed.


## Production-readiness pass (2026-10-24)

- Removed fabricated testimonials, unverifiable case-study metrics, and unconfirmed leadership identities from public display. The portfolio and team sections remain hidden/empty until real approved entries are supplied.
- Public reviews now come only from the Supabase-backed API; no static fake reviews are appended. Empty review states are shown instead of a fabricated five-star score.
- Replaced the incorrect Saudi phone in structured data with the supplied Egyptian number and removed the unverified website URL from structured data. Updated the phone field placeholder to an Egyptian international format.
- Rewrote privacy statements to avoid unsupported blanket claims of PDPL/GDPR compliance and absolute confidentiality. Have local counsel review the final privacy/terms text before launch.
- Added `/api/health` to check whether server-side Supabase credentials work and the `profiles` table is reachable. The endpoint does not expose credentials.
- Fixed `/api/download-zip` to return a clear 404 when the optional archive is absent instead of attempting to download a nonexistent file.
- Set the default Gemini model to `gemini-2.5-flash`, overridable with `GEMINI_MODEL`; actual model availability and quota still need validation with the deployed API key.

### Launch status

**Not yet verified as production-ready.** The Supabase project cannot be confirmed from this source archive alone: no production secrets were supplied and the schema has not been proven applied to the live project. Apply `supabase-schema.sql`, set server environment variables, create/promote the real admin user, and verify `/api/health`, contact submissions, review moderation, and admin access on the deployed server. Run `npm install`, `npm run lint`, and `npm run build` before publishing.

- Installation/build validation attempt: `npm install --ignore-scripts --no-audit --no-fund` timed out in this environment. TypeScript parser scan found no syntax diagnostics, but full type checking and Vite production build remain blocked by unavailable dependencies.
