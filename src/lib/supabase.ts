import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

function createSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    // Throws if the URL is malformed (e.g. the key was pasted into the URL
    // field). Never let a bad env var blank the entire app.
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.error(
      "Supabase client could not be initialized. Check VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.",
      error
    );
    return null;
  }
}

export const supabase: SupabaseClient | null = createSupabaseClient();

export const isSupabaseConfigured = supabase !== null;
