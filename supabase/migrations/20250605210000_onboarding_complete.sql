-- Phase 1b: track whether a user has finished the required profile onboarding
alter table public.profiles
  add column if not exists onboarding_complete boolean not null default false;
