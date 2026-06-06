import { AuthError } from "@supabase/supabase-js";
import { supabase } from "./supabase";

export interface Review {
  eventId: string;
  eventTitle: string;
  rating: number;
  text: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  industry?: string;
  linkedin_url?: string;
  communities_part_of: string[];
  communities_ally: string[];
  events_attended: string[];
  reviews: Review[];
  avatar?: string;
  onboarding_complete: boolean;
}

export function getAuthErrorMessage(error: AuthError): string {
  const message = error.message.toLowerCase();

  if (
    message.includes("already registered") ||
    message.includes("already been registered") ||
    message.includes("already associated")
  ) {
    return "Email is already associated with an account";
  }
  if (message.includes("password")) {
    return "Password must be at least 6 characters.";
  }
  if (message.includes("valid email")) {
    return "Please enter a valid email address.";
  }

  return error.message;
}

export function isDuplicateSignup(user: { identities?: { id: string }[] } | null): boolean {
  return Boolean(user && user.identities?.length === 0);
}

export type SignupResult = "signed_in" | "confirm_email";

export async function fetchUserProfile(userId: string): Promise<User | null> {
  if (!supabase) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, name, email, industry, linkedin_url, avatar_url, onboarding_complete")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    console.error("fetchUserProfile: could not load profile row:", profileError.message);
  }

  // If the profile row isn't available (not created yet, RLS, or a schema
  // mismatch), fall back to the auth session so the user stays signed in and
  // is routed through onboarding instead of appearing logged out.
  if (!profile) {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (!authUser) return null;

    const meta = (authUser.user_metadata ?? {}) as Record<string, unknown>;
    return {
      id: authUser.id,
      name: (meta.name as string) || (meta.full_name as string) || "",
      email: authUser.email ?? "",
      avatar: (meta.avatar_url as string) || (meta.picture as string) || undefined,
      communities_part_of: [],
      communities_ally: [],
      events_attended: [],
      reviews: [],
      onboarding_complete: false,
    };
  }

  const { data: tags } = await supabase
    .from("profile_communities")
    .select("relationship, communities(name)")
    .eq("profile_id", userId);

  const communities_part_of: string[] = [];
  const communities_ally: string[] = [];

  for (const tag of tags ?? []) {
    const relation = tag.communities as unknown as
      | { name: string }
      | { name: string }[]
      | null;
    const community = Array.isArray(relation) ? relation[0] : relation;
    if (!community?.name) continue;

    if (tag.relationship === "part_of") {
      communities_part_of.push(community.name);
    } else if (tag.relationship === "ally") {
      communities_ally.push(community.name);
    }
  }

  return {
    id: profile.id,
    name: profile.name,
    email: profile.email,
    industry: profile.industry ?? undefined,
    linkedin_url: profile.linkedin_url ?? undefined,
    avatar: profile.avatar_url ?? undefined,
    communities_part_of,
    communities_ally,
    events_attended: [],
    reviews: [],
    onboarding_complete: Boolean(profile.onboarding_complete),
  };
}

export interface ProfileUpdate {
  name: string;
  industry?: string;
  linkedin_url?: string;
  avatar?: string;
  communities_part_of: string[];
  communities_ally: string[];
  onboarding_complete?: boolean;
}

// Persists profile fields and rewrites the user's community tags, then
// returns the freshly loaded profile.
export async function saveProfile(userId: string, updates: ProfileUpdate): Promise<User | null> {
  if (!supabase) return null;

  const profilePatch: Record<string, unknown> = {
    name: updates.name,
    industry: updates.industry || null,
    linkedin_url: updates.linkedin_url || null,
  };
  if (updates.avatar !== undefined) profilePatch.avatar_url = updates.avatar || null;
  if (updates.onboarding_complete !== undefined) {
    profilePatch.onboarding_complete = updates.onboarding_complete;
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update(profilePatch)
    .eq("id", userId);
  if (updateError) throw new Error(updateError.message);

  const { data: allCommunities } = await supabase.from("communities").select("id, name");
  const nameToId = new Map<string, string>(
    (allCommunities ?? []).map((c) => [c.name as string, c.id as string])
  );

  const { error: deleteError } = await supabase
    .from("profile_communities")
    .delete()
    .eq("profile_id", userId);
  if (deleteError) throw new Error(deleteError.message);

  // A (profile_id, community_id) pair is unique, so a community can only carry
  // one relationship. part_of wins over ally when both are selected.
  const usedIds = new Set<string>();
  const rows: { profile_id: string; community_id: string; relationship: string }[] = [];

  const addRows = (names: string[], relationship: "part_of" | "ally") => {
    for (const name of names) {
      const id = nameToId.get(name);
      if (!id || usedIds.has(id)) continue;
      usedIds.add(id);
      rows.push({ profile_id: userId, community_id: id, relationship });
    }
  };

  addRows(updates.communities_part_of, "part_of");
  addRows(updates.communities_ally, "ally");

  if (rows.length > 0) {
    const { error: insertError } = await supabase.from("profile_communities").insert(rows);
    if (insertError) throw new Error(insertError.message);
  }

  return fetchUserProfile(userId);
}
