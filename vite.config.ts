import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// During `npm run dev` the /api routes are not served by Vite. To test them locally run
// `npm run build && npx wrangler pages dev dist` with the variables from .dev.vars.example.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', emptyOutDir: true },
});
