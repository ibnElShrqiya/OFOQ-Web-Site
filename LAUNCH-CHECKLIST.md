# OFOQ — Final launch checklist

## What is already prepared in the source

- Supabase schema and row-level security policies are included in `supabase-schema.sql`.
- Express API endpoints are present for public content, contact submissions, reviews, admin authentication, and admin management.
- A server-side `/api/health` endpoint checks Supabase connectivity without exposing keys.
- Public testimonials, portfolio case studies, and named team profiles that could not be verified have been removed from public display. Add real, approved material before publishing those sections.
- Contact links use local `01101774594`, international `+201101774594`, and WhatsApp `https://wa.me/201101774594`. No official email address is published.

## Required before launch — not completed by this archive review

1. In the intended Supabase project, run `supabase-schema.sql` in SQL Editor. Check that `profiles`, `content_items`, `contact_messages`, and `reviews` exist and RLS is enabled.
2. Create the real admin user in Supabase Auth and promote only that user to `admin` using the documented SQL in `SUPABASE-SETUP.md`.
3. Configure `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` as server-side environment secrets on the chosen Node.js host. Never put the service-role/secret key in frontend variables or Git.
4. Configure `GEMINI_API_KEY` only if the AI consultant is to be enabled; verify model availability and set usage limits.
5. Install dependencies and run `npm run lint` and `npm run build`. These could not be completed in this environment because dependency installation timed out.
6. After deployment, open `/api/health`; it must return HTTP 200 with `status: ok` and `database: connected`. A 503 means the database is not ready.
7. Submit a contact form, confirm the message appears in `/admin`, submit a review and confirm it remains pending, approve it, then verify it appears publicly. Test that a non-admin cannot open admin APIs.
8. Confirm the actual production domain, HTTPS, redirects, backup policy, error monitoring, and privacy/terms text. Have the final legal text reviewed for the jurisdictions where OFOQ operates.

**Important:** This source package cannot prove that a remote Supabase database has been created or that its schema has been applied. Do not consider the deployment launch-ready until the checks above pass against the live environment.
