# OFOQ Web Site

موقع أفق: واجهة React (Vite) مع واجهات API تعمل كـ Cloudflare Pages Functions وقاعدة بيانات Supabase، ولوحة إدارة على `/admin`.

## البنية

- `src/` واجهة الموقع ولوحة الإدارة (`/admin`).
- `functions/api/` واجهات API (تعمل على Cloudflare Pages بدون خادم منفصل):
  - عامة: `GET /api/content`، `GET/POST /api/reviews`، `POST /api/contact`، `GET /api/health`
  - الإدارة (تتطلب حساب admin): `/api/admin/login`، `/api/admin/me`، `/api/admin/content`، `/api/admin/messages`، `/api/admin/reviews`
- `functions/_lib/api.js` الدوال المشتركة (Supabase والتحقق والمصادقة).
- `public/_headers` ترويسات الأمان.
- `supabase-schema.sql` الجداول وسياسات RLS.

## الإعداد

1. **Supabase:** شغّل `supabase-schema.sql` في SQL Editor، ثم أنشئ المدير من Authentication → Users، وامنحه الدور:

   ```sql
   update public.profiles p
   set role = 'admin', updated_at = now()
   from auth.users u
   where p.id = u.id and lower(u.email) = lower('admin@example.com');
   ```

   يجب أن يتحدّث صف واحد فقط. لا يوجد تسجيل عام للوحة الإدارة.

2. **Cloudflare Pages:** Build command: `npm run pages:build`، Output directory: `dist`. ثم في Settings → Variables and Secrets أضف للبيئتين Production و Preview:

   | المتغير | النوع |
   | --- | --- |
   | `SUPABASE_URL` | Text |
   | `SUPABASE_ANON_KEY` | Text (المفتاح العام) |
   | `SUPABASE_SERVICE_ROLE_KEY` | **Secret** (المفتاح السري، لا تضعه في Git ولا في متغير يبدأ بـ `VITE_`) |

   بعد إضافة المتغيرات أعد النشر (Retry deployment) لتُطبَّق.

3. **التحقق بعد النشر:** افتح `/api/health`؛ يجب أن يعيد `{"status":"ok","database":"connected"}`. إذا أعاد 503 فالمتغيرات ناقصة أو لم يُطبَّق المخطط.

## التطوير المحلي

```bash
npm install
npm run lint
npm run build
cp .dev.vars.example .dev.vars   # ثم املأ القيم
npx wrangler pages dev dist      # الموقع مع واجهات API
```

`npm run dev` يشغّل واجهة Vite فقط بدون واجهات `/api`.

## ملاحظات

- تحديد معدل الطلبات (rate limiting) داخل الـ Functions جزئي لأن العدّاد يعيش في ذاكرة instance واحدة. لحماية أقوى فعّل Cloudflare Rate Limiting Rules على `/api/admin/login` و`/api/contact` و`/api/reviews`.
- المعرض والتقييمات تبدأ فارغة عمدًا: أضف فقط مشاريع حقيقية مسموح بنشرها وتقييمات معتمدة من لوحة الإدارة.
