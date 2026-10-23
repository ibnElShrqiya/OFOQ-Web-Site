-- OFOQ database foundation (run in Supabase SQL Editor)
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'OFOQ Admin',
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, display_name, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', 'OFOQ User'), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create table if not exists public.content_items (
  id uuid primary key default gen_random_uuid(),
  content_type text not null check (content_type in ('project','tool','python_script','open_source_project','article')),
  title text not null check (char_length(title) between 2 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  summary text not null default '',
  body text not null default '',
  cover_image_url text,
  source_url text,
  github_url text,
  download_url text,
  license text,
  language text,
  requirements text,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists content_items_type_published_idx on public.content_items(content_type, is_published, created_at desc);
create index if not exists content_items_tags_idx on public.content_items using gin(tags);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (char_length(email) <= 254),
  company text not null default '' check (char_length(company) <= 180),
  phone text not null default '' check (char_length(phone) <= 40),
  service_id text not null default '' check (char_length(service_id) <= 120),
  priority text not null default 'routine' check (priority in ('routine','elevated','critical_soc')),
  subject text not null default '' check (char_length(subject) <= 180),
  message text not null check (char_length(message) between 5 and 6000),
  status text not null default 'new' check (status in ('new','in_progress','resolved','spam')),
  created_at timestamptz not null default now()
);
create index if not exists contact_messages_status_created_idx on public.contact_messages(status, created_at desc);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (char_length(display_name) between 2 and 100),
  company text,
  rating integer not null check (rating between 1 and 5),
  review_text text not null check (char_length(review_text) between 5 and 2000),
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.content_items enable row level security;
alter table public.contact_messages enable row level security;
alter table public.reviews enable row level security;

-- Browser clients can read only published content and approved reviews.
drop policy if exists "Public reads published content" on public.content_items;
create policy "Public reads published content" on public.content_items for select to anon, authenticated using (is_published = true);
drop policy if exists "Public reads approved reviews" on public.reviews;
create policy "Public reads approved reviews" on public.reviews for select to anon, authenticated using (is_approved = true);

-- Match the admin policies used by this project. The Express API also checks the
-- role on every admin request; these policies protect direct authenticated access.
create or replace function public.ofoq_is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

drop policy if exists "OFOQ admins manage profiles" on public.profiles;
create policy "OFOQ admins manage profiles" on public.profiles for all to authenticated using (public.ofoq_is_admin()) with check (public.ofoq_is_admin());
drop policy if exists "OFOQ admins manage content" on public.content_items;
create policy "OFOQ admins manage content" on public.content_items for all to authenticated using (public.ofoq_is_admin()) with check (public.ofoq_is_admin());
drop policy if exists "OFOQ admins manage messages" on public.contact_messages;
create policy "OFOQ admins manage messages" on public.contact_messages for all to authenticated using (public.ofoq_is_admin()) with check (public.ofoq_is_admin());
drop policy if exists "OFOQ admins manage reviews" on public.reviews;
create policy "OFOQ admins manage reviews" on public.reviews for all to authenticated using (public.ofoq_is_admin()) with check (public.ofoq_is_admin());

-- RLS policies need SQL privileges as well. Anonymous users receive read-only
-- access to the two public datasets; private tables have no anon grants.
grant select on public.content_items, public.reviews to anon, authenticated;
grant all on public.profiles, public.content_items, public.contact_messages, public.reviews to authenticated;
revoke all on public.profiles, public.contact_messages from anon;
revoke insert, update, delete on public.content_items, public.reviews from anon;
-- Never expose SUPABASE_SERVICE_ROLE_KEY to the browser.
