import { supabase } from "./supabase";
import type { Event } from "../app/data/events";

export type EventStatus = "pending" | "published" | "rejected";

export interface EventRow extends Event {
  status: EventStatus;
  author_id: string | null;
  created_at: string;
}

export interface SubmitEventInput {
  title: string;
  community: string[];
  type: string;
  org: string;
  date?: string | null;
  time?: string | null;
  location?: string | null;
  neighborhood?: string | null;
  price?: string | null;
  register_url?: string | null;
  image_url?: string | null;
  description?: string | null;
  industries?: string[];
  capacity?: string | null;
  food?: string | null;
  drinks?: string | null;
  goal?: string | null;
  who_for?: string | null;
  org_mission?: string | null;
  itinerary?: string | null;
}

const EVENT_COLUMNS =
  "id, title, community, type, org, date, time, location, neighborhood, price, register_url, image_keyword, image_url, description, industries, capacity, food, drinks, goal, who_for, org_mission, itinerary";

export async function listPublishedEvents(): Promise<Event[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("status", "published")
    .order("date", { ascending: true });
  if (error) {
    console.error("listPublishedEvents:", error.message);
    return [];
  }
  return (data ?? []) as unknown as Event[];
}

export async function getEventById(id: string): Promise<Event | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("events")
    .select(EVENT_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getEventById:", error.message);
    return null;
  }
  return (data as unknown as Event) ?? null;
}

export async function submitEvent(
  input: SubmitEventInput,
  authorId: string
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase.from("events").insert({
    ...input,
    industries: input.industries ?? [],
    author_id: authorId,
    status: "pending",
  });
  return { error: error ? error.message : null };
}

// --- admin -----------------------------------------------------------------

export async function listEventsByStatus(status: EventStatus): Promise<EventRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listEventsByStatus:", error.message);
    return [];
  }
  return (data ?? []) as unknown as EventRow[];
}

export async function setEventStatus(
  id: string,
  status: EventStatus
): Promise<{ error: string | null }> {
  if (!supabase) return { error: "Not configured." };
  const { error } = await supabase.from("events").update({ status }).eq("id", id);
  return { error: error ? error.message : null };
}
