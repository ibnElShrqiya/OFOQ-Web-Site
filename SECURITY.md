# Security

## Secret handling

- Keep `SUPABASE_SERVICE_ROLE_KEY` and any `GEMINI_API_KEY` in the server environment only.
- Never use a `VITE_` prefix for server secrets.
- Do not commit `.env` files, access tokens, or production credentials. `.env.example` contains placeholders for secret values.
- Rotate a credential immediately if it was exposed.

## Deployment checks

- Serve the production build over HTTPS.
- Configure the server environment variables through the hosting provider's secret store.
- Keep Supabase Row Level Security enabled and review policies before changing database permissions.
- The admin API verifies the Supabase user and checks the user's `profiles.role` before allowing administrative operations.
- Login, contact, and review submissions have process-local rate limits. These counters reset on restart and are not shared between multiple server instances; use a shared rate-limit store at scale.
- Admin API responses are marked `no-store`. Administrative access tokens are currently held in browser `sessionStorage`; this limits persistence to a browser session but remains accessible to scripts running on the same origin.

## Reporting

Do not publish active credentials, personal data, or details that would expose a live system. Contact the repository maintainers privately with a concise report and reproduction steps.
