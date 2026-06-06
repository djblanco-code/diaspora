-- Phase 2: user-submitted events & organizations with admin moderation.

-- ---------------------------------------------------------------------------
-- admin flag + helper
-- ---------------------------------------------------------------------------
alter table public.profiles
  add column if not exists is_admin boolean not null default false;

-- SECURITY DEFINER so RLS policies can check admin status without recursing
-- into the profiles policies.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and is_admin
  );
$$;

-- ---------------------------------------------------------------------------
-- events
-- ---------------------------------------------------------------------------
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  community text[] not null default '{}',
  type text not null default '',
  org text not null default '',
  date date,
  time text,
  location text,
  neighborhood text,
  price text,
  register_url text,
  image_keyword text,
  image_url text,
  description text,
  industries text[] not null default '{}',
  capacity text,
  food text,
  drinks text,
  goal text,
  who_for text,
  org_mission text,
  itinerary text,
  author_id uuid references public.profiles (id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

create index events_status_idx on public.events (status);
create index events_date_idx on public.events (date);

-- ---------------------------------------------------------------------------
-- organizations
-- ---------------------------------------------------------------------------
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  community text[] not null default '{}',
  focus text[] not null default '{}',
  description text,
  website text,
  logo_keyword text,
  image_url text,
  neighborhood text,
  type text,
  industries text[] not null default '{}',
  author_id uuid references public.profiles (id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now()
);

create index organizations_status_idx on public.organizations (status);

-- ---------------------------------------------------------------------------
-- row level security
-- ---------------------------------------------------------------------------
alter table public.events enable row level security;
alter table public.organizations enable row level security;

-- Readable when published, or by the author, or by an admin.
create policy "events are readable when published or own/admin"
  on public.events for select
  to anon, authenticated
  using (status = 'published' or auth.uid() = author_id or public.is_admin());

-- Authenticated users may submit, but only as themselves and only as pending.
create policy "users can submit events"
  on public.events for insert
  to authenticated
  with check (auth.uid() = author_id and status = 'pending');

-- Only admins can moderate (publish/reject/edit) or delete.
create policy "admins can update events"
  on public.events for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins can delete events"
  on public.events for delete
  to authenticated
  using (public.is_admin());

create policy "orgs are readable when published or own/admin"
  on public.organizations for select
  to anon, authenticated
  using (status = 'published' or auth.uid() = author_id or public.is_admin());

create policy "users can submit orgs"
  on public.organizations for insert
  to authenticated
  with check (auth.uid() = author_id and status = 'pending');

create policy "admins can update orgs"
  on public.organizations for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "admins can delete orgs"
  on public.organizations for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- grants (RLS still applies on top of these)
-- ---------------------------------------------------------------------------
grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;
grant select on public.organizations to anon, authenticated;
grant insert, update, delete on public.organizations to authenticated;
