OFOQ website updates

These are complete replacement files prepared for:
https://github.com/ibnElShrqiya/OFOQ-Web-Site

Copy each file to the matching repository path. Remove src/components/SourceCodeExportModal.tsx; its navigation links and server download endpoint are removed in the replacement files.

The public contact email is harammasr54@gmail.com and appears in the footer, contact page, company data, and structured site metadata.

The changes improve narrow-screen wrapping and spacing, remove the project source download flow, replace unsupported company claims and performance promises with neutral language, and identify the AI assessment as a self-check.

Direct GitHub updates could not be saved because the connected GitHub integration returned HTTP 403 (Resource not accessible by integration). No repository files were changed remotely.

The AI assistant has been removed from the UI, navigation, homepage, API server, and package dependencies. Remove src/pages/ChatPage.tsx from the repository.

## Cloudflare Pages deployment

The Vite source entry in index.html is intended for the Vite build; it must not be published directly. Run `npm run build` and configure Cloudflare Pages with the repository root as the project root, `npm run pages:build` as the build command, and `dist` as the build output directory. The Wrangler Pages setting in wrangler.toml also declares `./dist`.

This repository's Express application in server.ts is not run by a static Pages deployment. Keep Express and its Supabase-backed API on the existing Node.js host, and configure any required API routing/origin there. Do not put Supabase service-role credentials in Vite variables or browser code; keep them only in the Express host's server-side environment.


## Cloudflare Pages database reads

This Pages project serves the public content and approved reviews through Pages Functions at `/api/content` and `/api/reviews`. In **Workers & Pages → ofoq-web-site → Settings → Variables and Secrets**, configure `SUPABASE_URL` and `SUPABASE_ANON_KEY` for both Production and Preview. Use the Supabase project URL and its publishable/anon key. The key is public by design and is restricted by the database's row-level security policies. Never add `SUPABASE_SERVICE_ROLE_KEY` to Pages or browser code.

Pages Functions handle public reads. The Express server remains in the repository for server-side writes and administration and must run on a Node.js host if those API features are used.


## Site page routes

Each public section has a direct URL: `/`, `/services`, `/projects`, `/library`, `/about`, `/reviews`, `/assessment`, `/contact`, `/privacy`, and `/terms`. Navigation updates browser history, so refresh, back, and forward keep the selected page. Cloudflare Pages serves the SPA entry point for these paths when no top-level `404.html` is present.
