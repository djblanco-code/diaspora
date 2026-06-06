-- Phase 3: public storage for event cover images and org logos.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'event-images',
    'event-images',
    true,
    5242880,
    array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  ),
  (
    'org-logos',
    'org-logos',
    true,
    5242880,
    array['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  )
on conflict (id) do nothing;

-- Uploads go to {user_id}/{filename}; public buckets serve via getPublicUrl.
create policy "users can upload event images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'event-images'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "anyone can view event images"
  on storage.objects for select
  to public
  using (bucket_id = 'event-images');

create policy "users can upload org logos"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'org-logos'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "anyone can view org logos"
  on storage.objects for select
  to public
  using (bucket_id = 'org-logos');
