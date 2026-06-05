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
    .single();

  if (profileError || !profile) return null;

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
