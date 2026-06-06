import { supabase } from "./supabase";

export type ImageBucket = "event-images" | "org-logos";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function extensionFor(file: File): string {
  const fromName = file.name.split(".").pop()?.toLowerCase();
  if (fromName && ["jpg", "jpeg", "png", "webp", "gif"].includes(fromName)) {
    return fromName === "jpeg" ? "jpg" : fromName;
  }
  const fromType = file.type.split("/")[1]?.toLowerCase();
  if (fromType === "jpeg") return "jpg";
  if (fromType && ["jpg", "png", "webp", "gif"].includes(fromType)) return fromType;
  return "jpg";
}

export async function uploadImage(
  bucket: ImageBucket,
  file: File,
  userId: string
): Promise<{ url: string | null; error: string | null }> {
  if (!supabase) return { url: null, error: "Not configured." };

  if (!ALLOWED_TYPES.has(file.type.toLowerCase())) {
    return { url: null, error: "Please upload a JPEG, PNG, WebP, or GIF image." };
  }
  if (file.size > MAX_BYTES) {
    return { url: null, error: "Image must be 5 MB or smaller." };
  }

  const path = `${userId}/${crypto.randomUUID()}.${extensionFor(file)}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) return { url: null, error: error.message };

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { url: data.publicUrl, error: null };
}
