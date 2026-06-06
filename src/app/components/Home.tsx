import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { listPublishedEvents } from "../../lib/events";
import { listPublishedOrganizations } from "../../lib/organizations";
import type { Event } from "../data/events";
import type { Organization } from "../data/organizations";
import { carouselOrgs } from "../data/carouselOrgs";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Navbar from "./Navbar";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    Promise.all([listPublishedEvents(), listPublishedOrganizations()]).then(
      ([publishedEvents, publishedOrgs]) => {
        setEvents(publishedEvents);
        setOrganizations(publishedOrgs);
      }
    );
  }, []);

  const stats = useMemo(() => {
    const communities = new Set<string>();
    for (const event of events) event.community.forEach(c => communities.add(c));
    for (const org of organizations) org.community.forEach(c => communities.add(c));
    return {
      events: events.length,
      communities: communities.size,
      orgs: organizations.length,
    };
  }, [events, organizations]);

  // Get 3 upcoming events for the "Happening Soon" section
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* NAVY HERO */}
      <section className="bg-[#3A2A1E] text-white">
        {/* Top Nav */}
        <Navbar variant="navy" />

        {/* Hero Content */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Grow your career among your people.
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-relaxed">
              One home for the professional events NYC's diaspora communities are already building. By and for Black, Latino, Asian, and beyond.
            </p>
            <div className="mb-12 flex flex-col sm:flex-row gap-4">
              <Link to="/browse">
                <Button
                  variant="contained"
                  endIcon={<ArrowRight className="w-5 h-5" />}
                  sx={{
                    bgcolor: "white",
                    color: "#9A6B3C",
                    "&:hover": { bgcolor: "#F1E7D6" },
                    textTransform: "none",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.125rem",
                    fontWeight: 600
                  }}
                >
                  Browse events
                </Button>
              </Link>
              <Link to="/browse?view=communities">
                <Button
                  variant="outlined"
                  endIcon={<ArrowRight className="w-5 h-5" />}
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": { borderColor: "white", bgcolor: "rgba(255, 255, 255, 0.1)" },
                    textTransform: "none",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.125rem",
                    fontWeight: 600
                  }}
                >
                  Explore communities
                </Button>
              </Link>
            </div>
            <p className="text-white/70 text-sm">
              {stats.events} event{stats.events !== 1 ? "s" : ""} ·{" "}
              {stats.communities} communit{stats.communities !== 1 ? "ies" : "y"} ·{" "}
              {stats.orgs} host org{stats.orgs !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <p className="text-xs uppercase tracking-wide text-[#8A7866] mb-6">Our mission</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-[#322318] leading-relaxed">
            Every week, NYC's diaspora communities host panels, mixers, and workshops that can change a career. They're just scattered across a dozen platforms and group chats, easy to miss. Diaspora brings them into one place, so finding your people and growing your career become the same move.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#322318] mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Browse",
                description: "Filter by heritage, event type, and when you're free.",
              },
              {
                step: 2,
                title: "Know what to expect",
                description: "Every listing shows cost, capacity, food, and the full run of show.",
              },
              {
                step: 3,
                title: "Show up",
                description: "Register in a tap and keep track of everything you attend.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-lg border border-[#EFE0C8] p-6"
              >
                <div className="w-10 h-10 rounded-full bg-[#3A2A1E] text-[#FBF6EE] flex items-center justify-center font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-[#322318] mb-2">{item.title}</h3>
                <p className="text-[#8A7866] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POWERED BY THE ORGS */}
      <section className="bg-[#FBF6EE] py-16 sm:py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="px-6 lg:px-20 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#322318] mb-4">
              Powered by the orgs doing the work
            </h2>
            <p className="text-xl text-[#8A7866] mb-4">
              Events from the organizations already building the rooms.
            </p>
          </div>

          {/* Logo Carousel — local assets (no Clearbit / ad-blocker issues) */}
          <div className="relative">
            <div className="flex animate-scroll pl-6 lg:pl-20">
              {[...carouselOrgs, ...carouselOrgs].map((org, idx) => (
                <a
                  key={`${org.domain}-${idx}`}
                  href={org.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={org.name}
                  className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-lg h-24 w-48 mx-4 transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="max-w-full max-h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(".fallback-text")) {
                        const text = document.createElement("div");
                        text.className =
                          "fallback-text text-sm font-semibold text-[#4A3422] text-center px-2";
                        text.textContent = org.name;
                        parent.appendChild(text);
                      }
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HAPPENING SOON */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#322318]">
              Happening soon
            </h2>
            <Link to="/browse" className="text-[#9A6B3C] hover:underline font-medium">
              See all events →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <Link
                key={event.id}
                to={`/event/${event.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/9] bg-[#EFE0C8] overflow-hidden relative">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    <Chip
                      label={event.community[0]}
                      size="small"
                      sx={{
                        bgcolor: "#3A2A1E",
                        color: "white",
                        fontSize: "0.75rem"
                      }}
                    />
                    <Chip
                      label={event.type}
                      size="small"
                      variant="outlined"
                      sx={{
                        bgcolor: "white",
                        borderColor: "#9A6B3C",
                        color: "#9A6B3C",
                        fontSize: "0.75rem"
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#322318] mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#8A7866]">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {event.org}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#8A7866] font-medium">Diaspora · NYC</p>
            <div className="flex items-center gap-6">
              <Link to="/browse" className="text-[#8A7866] hover:text-[#9A6B3C] transition-colors">
                Browse
              </Link>
              <Link to="/browse" className="text-[#8A7866] hover:text-[#9A6B3C] transition-colors">
                Communities
              </Link>
              <Link to="/about" className="text-[#8A7866] hover:text-[#9A6B3C] transition-colors">
                About
              </Link>
              <Link to="/submit" className="text-[#8A7866] hover:text-[#9A6B3C] transition-colors">
                Add Event
              </Link>
              <Link to="/submit-org" className="text-[#8A7866] hover:text-[#9A6B3C] transition-colors">
                Add Org
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
