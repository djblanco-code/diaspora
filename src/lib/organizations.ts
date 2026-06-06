import { supabase } from "./supabase";
import type { Organization } from "../app/data/organizations";

export type OrgStatus = "pending" | "published" | "rejected";

export interface OrganizationRow extends Organization {
  status: OrgStatus;
  author_id: string | null;
  created_at: string;
}

export interface SubmitOrgInput {
  name: string;
  community: string[];
  focus?: string[];
  description?: string | null;
  website?: string | null;
  image_url?: string | null;
  neighborhood?: string | null;
  type?: string | null;
  industries?: string[];
}

const ORG_COLUMNS =
  "id, name, community, focus, description, website, logo_keyword, image_url, neighborhood, type, industries";

export async function listPublishedOrganizations(): Promise<Organization[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("organizations")
    .select(ORG_COLUMNS)
    .eq("status", "published")
    .order("name", { ascending: true });
  if (error) {
    console.error("listPublishedOrganizations:", error.message);
    return [];
  }
  return (data ?? []) as unknown as Organization[];
}

export async function getOrganizationById(id: string): Promise<Organization | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("organizations")
    .select(ORG_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getOrganizationById:", error.message);
    return null;
  }
  return (data as unknown as Organization) ?? null;
}

export async function submitOrganization(
  input: SubmitOrgInput,
  authorId: string
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase.from("organizations").insert({
    ...input,
    focus: input.focus ?? [],
    industries: input.industries ?? [],
    author_id: authorId,
    status: "pending",
  });
  return { error: error ? error.message : null };
}

// --- admin -----------------------------------------------------------------

export async function listOrganizationsByStatus(
  status: OrgStatus
): Promise<OrganizationRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listOrganizationsByStatus:", error.message);
    return [];
  }
  return (data ?? []) as unknown as OrganizationRow[];
}

export async function setOrganizationStatus(
  id: string,
  status: OrgStatus
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase
    .from("organizations")
    .update({ status })
    .eq("id", id);
  return { error: error ? error.message : null };
}
