-- Phase 1: auth profiles + communities
-- Supports sign up, sign in, profile read/edit (PRs 2–5)

-- ---------------------------------------------------------------------------
-- communities (reference data)
-- ---------------------------------------------------------------------------
create table public.communities (
  id text primary key,
  name text not null unique,
  description text
);

insert into public.communities (id, name, description) values
  ('black',       'Black',       'Professional development events for the Black community in NYC'),
  ('latino',      'Latino',      'Career growth opportunities for Latino professionals'),
  ('asian',       'Asian',       'Networking and skill-building for Asian American professionals'),
  ('south-asian', 'South Asian', 'Events supporting South Asian career advancement'),
  ('caribbean',   'Caribbean',   'Professional events for the Caribbean diaspora'),
  ('african',     'African',     'Career development for African diaspora professionals'),
  ('mena',        'MENA',        'Middle Eastern and North African professional community events'),
  ('indigenous',  'Indigenous',  'Professional development for Indigenous communities');

-- ---------------------------------------------------------------------------
-- profiles (1:1 with auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null,
  industry text,
  linkedin_url text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles (email);

-- ---------------------------------------------------------------------------
-- profile_communities (junction: part_of | ally)
-- ---------------------------------------------------------------------------
create table public.profile_communities (
  profile_id uuid not null references public.profiles (id) on delete cascade,
  community_id text not null references public.communities (id) on delete cascade,
  relationship text not null check (relationship in ('part_of', 'ally')),
  primary key (profile_id, community_id)
);

create index profile_communities_profile_id_idx on public.profile_communities (profile_id);

-- ---------------------------------------------------------------------------
-- triggers
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-create profile row when a user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.email, '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- row level security
-- ---------------------------------------------------------------------------
alter table public.communities enable row level security;
alter table public.profiles enable row level security;
alter table public.profile_communities enable row level security;

-- communities: public read
create policy "communities are publicly readable"
  on public.communities
  for select
  to anon, authenticated
  using (true);

-- profiles: users manage own row
create policy "users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- profile_communities: users manage own rows
create policy "users can read own community tags"
  on public.profile_communities
  for select
  to authenticated
  using (auth.uid() = profile_id);

create policy "users can insert own community tags"
  on public.profile_communities
  for insert
  to authenticated
  with check (auth.uid() = profile_id);

create policy "users can delete own community tags"
  on public.profile_communities
  for delete
  to authenticated
  using (auth.uid() = profile_id);

-- ---------------------------------------------------------------------------
-- grants (Data API access for authenticated role)
-- ---------------------------------------------------------------------------
grant usage on schema public to anon, authenticated;

grant select on public.communities to anon, authenticated;
grant select, update on public.profiles to authenticated;
grant select, insert, delete on public.profile_communities to authenticated;
