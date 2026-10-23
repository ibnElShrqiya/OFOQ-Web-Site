# OFOQ Software Engineering & Digital Products

React + TypeScript + Vite frontend with an Express API, Supabase PostgreSQL content store, and a protected admin panel at `/admin`. The admin panel manages content, private contact messages, and review moderation.

## Quick start

1. Copy `.env.example` to `.env` and configure Supabase server-side keys.
2. Run `supabase-schema.sql` in the Supabase SQL Editor.
3. Follow `SUPABASE-SETUP.md` to create and promote the initial admin account.
4. Install dependencies, then run the Express/Vite development server with `npm run dev`.

The Supabase service-role key must remain server-side and must never be committed or exposed to the browser.

New visitor reviews are saved as pending and only appear publicly after admin approval. See `SUPABASE-SETUP.md` for the database, admin account, and environment setup.


## إعداد قاعدة بيانات OFOQ

رابط Supabase مضبوط في `.env.example`: `https://gmdcappxvfghnqmbrbio.supabase.co`. اتبع `SUPABASE-SETUP.md` لتشغيل `supabase-schema.sql` وإنشاء حساب المدير. لا تضع المفتاح السري في الواجهة أو في Git.
