import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {
  listEventsByStatus,
  setEventStatus,
  type EventRow,
} from "../../lib/events";
import {
  listOrganizationsByStatus,
  setOrganizationStatus,
  type OrganizationRow,
} from "../../lib/organizations";

export default function Admin() {
  const [events, setEvents] = useState<EventRow[]>([]);
  const [orgs, setOrgs] = useState<OrganizationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [pendingEvents, pendingOrgs] = await Promise.all([
      listEventsByStatus("pending"),
      listOrganizationsByStatus("pending"),
    ]);
    setEvents(pendingEvents);
    setOrgs(pendingOrgs);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const moderateEvent = async (id: string, status: "published" | "rejected") => {
    setBusyId(id);
    await setEventStatus(id, status);
    setEvents(prev => prev.filter(e => e.id !== id));
    setBusyId(null);
  };

  const moderateOrg = async (id: string, status: "published" | "rejected") => {
    setBusyId(id);
    await setOrganizationStatus(id, status);
    setOrgs(prev => prev.filter(o => o.id !== id));
    setBusyId(null);
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE]">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-block">
            <div className="text-2xl font-bold text-[#9A6B3C]">Diaspora</div>
            <div className="text-xs text-[#8A7866] mt-0.5">Admin review</div>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-[#8A7866] hover:text-[#9A6B3C] mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <h1 className="text-3xl font-bold text-[#322318] mb-8">Pending submissions</h1>

        {loading ? (
          <p className="text-[#8A7866]">Loading…</p>
        ) : (
          <div className="space-y-12">
            {/* EVENTS */}
            <section>
              <h2 className="text-xl font-semibold text-[#322318] mb-4">
                Events ({events.length})
              </h2>
              {events.length === 0 ? (
                <p className="text-[#8A7866]">No events waiting for review.</p>
              ) : (
                <div className="space-y-4">
                  {events.map(event => (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg border border-[#EFE0C8] p-5"
                    >
                      <div className="flex flex-wrap gap-2 mb-2">
                        {event.community.map(c => (
                          <Chip
                            key={c}
                            label={c}
                            size="small"
                            sx={{ bgcolor: "#3A2A1E", color: "white" }}
                          />
                        ))}
                        <Chip
                          label={event.type}
                          size="small"
                          variant="outlined"
                          sx={{ borderColor: "#9A6B3C", color: "#9A6B3C" }}
                        />
                      </div>
                      <h3 className="text-lg font-bold text-[#322318]">{event.title}</h3>
                      <p className="text-sm text-[#8A7866] mb-2">
                        {event.org} · {event.date} · {event.time} · {event.neighborhood} · {event.price}
                      </p>
                      <p className="text-[#4A3422] mb-4">{event.description}</p>
                      <div className="flex gap-3">
                        <Button
                          variant="contained"
                          disabled={busyId === event.id}
                          onClick={() => moderateEvent(event.id, "published")}
                          sx={{
                            bgcolor: "#3A2A1E",
                            "&:hover": { bgcolor: "#2A1C12" },
                            textTransform: "none",
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          disabled={busyId === event.id}
                          onClick={() => moderateEvent(event.id, "rejected")}
                          sx={{
                            borderColor: "#b91c1c",
                            color: "#b91c1c",
                            textTransform: "none",
                            "&:hover": { borderColor: "#991b1b", bgcolor: "#fef2f2" },
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* ORGANIZATIONS */}
            <section>
              <h2 className="text-xl font-semibold text-[#322318] mb-4">
                Organizations ({orgs.length})
              </h2>
              {orgs.length === 0 ? (
                <p className="text-[#8A7866]">No organizations waiting for review.</p>
              ) : (
                <div className="space-y-4">
                  {orgs.map(org => (
                    <div
                      key={org.id}
                      className="bg-white rounded-lg border border-[#EFE0C8] p-5"
                    >
                      <div className="flex flex-wrap gap-2 mb-2">
                        {org.community.map(c => (
                          <Chip
                            key={c}
                            label={c}
                            size="small"
                            sx={{ bgcolor: "#3A2A1E", color: "white" }}
                          />
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-[#322318]">{org.name}</h3>
                      <p className="text-sm text-[#8A7866] mb-2">
                        {org.neighborhood} · {org.website}
                      </p>
                      <p className="text-[#4A3422] mb-4">{org.description}</p>
                      <div className="flex gap-3">
                        <Button
                          variant="contained"
                          disabled={busyId === org.id}
                          onClick={() => moderateOrg(org.id, "published")}
                          sx={{
                            bgcolor: "#3A2A1E",
                            "&:hover": { bgcolor: "#2A1C12" },
                            textTransform: "none",
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outlined"
                          disabled={busyId === org.id}
                          onClick={() => moderateOrg(org.id, "rejected")}
                          sx={{
                            borderColor: "#b91c1c",
                            color: "#b91c1c",
                            textTransform: "none",
                            "&:hover": { borderColor: "#991b1b", bgcolor: "#fef2f2" },
                          }}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
