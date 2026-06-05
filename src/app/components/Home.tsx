import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { events } from "../data/events";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export default function Home() {
  // Get 3 upcoming events for the "Happening Soon" section
  const upcomingEvents = events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* NAVY HERO */}
      <section className="bg-[#042C53] text-white">
        {/* Top Nav */}
        <nav className="max-w-[1200px] mx-auto px-6 lg:px-20 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="inline-block shrink-0">
              <div className="text-2xl font-bold text-white">Diaspora</div>
              <div className="text-xs text-white/70 mt-0.5">by Techqueria NYC</div>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/browse" className="hidden sm:inline text-white/90 hover:text-white transition-colors">
                Browse
              </Link>
              <Link to="/browse" className="hidden sm:inline text-white/90 hover:text-white transition-colors">
                Communities
              </Link>
              <Link to="/about" className="hidden sm:inline text-white/90 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/submit">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)"
                    }
                  }}
                >
                  Add Event
                </Button>
              </Link>
              <Link to="/submit-org">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255, 255, 255, 0.1)"
                    }
                  }}
                >
                  Add Org
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20 py-16 sm:py-24 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Grow your career among your people.
            </h1>
            <p className="text-xl sm:text-2xl text-white/90 mb-10 leading-relaxed">
              One home for the professional events NYC's diaspora communities are already building. By and for Black, Latino, Asian, and beyond.
            </p>
            <div className="mb-12">
              <Link to="/browse">
                <Button
                  variant="contained"
                  endIcon={<ArrowRight className="w-5 h-5" />}
                  sx={{
                    bgcolor: "white",
                    color: "#042C53",
                    "&:hover": { bgcolor: "#f9fafb" },
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
            </div>
            <p className="text-white/70 text-sm">
              142 events · 8 communities · 60+ host orgs
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-6">Our mission</p>
          <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 leading-relaxed">
            Every week, NYC's diaspora communities host panels, mixers, and workshops that can change a career. They're just scattered across a dozen platforms and group chats, easy to miss. Diaspora brings them into one place, so finding your people and growing your career become the same move.
          </p>
        </div>
      </section>

      {/* POWERED BY THE ORGS */}
      <section className="bg-gray-50 py-16 sm:py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="px-6 lg:px-20 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powered by the orgs doing the work
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Events from the organizations already building the rooms.
            </p>
          </div>

          {/* Logo Carousel */}
          <div className="relative">
            <div className="flex animate-scroll pl-6 lg:pl-20">
              {/* First set of logos */}
              {[
                { name: "/dev/color", domain: "devcolor.org" },
                { name: "ColorStack", domain: "colorstack.org" },
                { name: "NSBE", domain: "nsbe.org" },
                { name: "NABA", domain: "nabainc.org" },
                { name: "AfroTech", domain: "afrotech.com" },
                { name: "MLT", domain: "mlt.org" },
                { name: "Techqueria", domain: "techqueria.org" },
                { name: "ALPFA", domain: "alpfa.org" },
                { name: "SHPE", domain: "shpe.org" },
                { name: "Prospanica", domain: "prospanica.org" },
                { name: "Latinas in Tech", domain: "latinasintech.org" },
                { name: "Ascend", domain: "ascendleadership.org" },
                { name: "Gold House", domain: "goldhouse.org" },
                { name: "NAAAP", domain: "naaap.org" },
                { name: "SASE", domain: "saseconnect.org" },
                { name: "Neythri", domain: "neythri.org" },
                { name: "NetIP", domain: "netip.org" },
                { name: "SABANY", domain: "sabany.org" },
                { name: "CCCADI", domain: "cccadi.org" },
                { name: "APNET", domain: "apnetny.org" },
                { name: "African Diaspora Network", domain: "adnconnect.org" },
                { name: "Network of Arab-American Professionals", domain: "naapusa.org" },
                { name: "AISES", domain: "aises.org" },
                { name: "NEPN", domain: "nepn.org" },
              ].map((org) => (
                <div
                  key={org.domain}
                  className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-lg h-24 w-48 mx-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={`https://logo.clearbit.com/${org.domain}`}
                    alt={org.name}
                    className="max-w-full max-h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const text = document.createElement('div');
                        text.className = 'fallback-text text-sm font-semibold text-gray-700 text-center';
                        text.textContent = org.name;
                        parent.appendChild(text);
                      }
                    }}
                  />
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {[
                { name: "/dev/color", domain: "devcolor.org" },
                { name: "ColorStack", domain: "colorstack.org" },
                { name: "NSBE", domain: "nsbe.org" },
                { name: "NABA", domain: "nabainc.org" },
                { name: "AfroTech", domain: "afrotech.com" },
                { name: "MLT", domain: "mlt.org" },
                { name: "Techqueria", domain: "techqueria.org" },
                { name: "ALPFA", domain: "alpfa.org" },
                { name: "SHPE", domain: "shpe.org" },
                { name: "Prospanica", domain: "prospanica.org" },
                { name: "Latinas in Tech", domain: "latinasintech.org" },
                { name: "Ascend", domain: "ascendleadership.org" },
                { name: "Gold House", domain: "goldhouse.org" },
                { name: "NAAAP", domain: "naaap.org" },
                { name: "SASE", domain: "saseconnect.org" },
                { name: "Neythri", domain: "neythri.org" },
                { name: "NetIP", domain: "netip.org" },
                { name: "SABANY", domain: "sabany.org" },
                { name: "CCCADI", domain: "cccadi.org" },
                { name: "APNET", domain: "apnetny.org" },
                { name: "African Diaspora Network", domain: "adnconnect.org" },
                { name: "Network of Arab-American Professionals", domain: "naapusa.org" },
                { name: "AISES", domain: "aises.org" },
                { name: "NEPN", domain: "nepn.org" },
              ].map((org, idx) => (
                <div
                  key={`${org.domain}-duplicate-${idx}`}
                  className="flex-shrink-0 flex items-center justify-center p-4 bg-white rounded-lg h-24 w-48 mx-4 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={`https://logo.clearbit.com/${org.domain}`}
                    alt={org.name}
                    className="max-w-full max-h-16 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.fallback-text')) {
                        const text = document.createElement('div');
                        text.className = 'fallback-text text-sm font-semibold text-gray-700 text-center';
                        text.textContent = org.name;
                        parent.appendChild(text);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HAPPENING SOON */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Happening soon
            </h2>
            <Link to="/browse" className="text-[#042C53] hover:underline font-medium">
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
                <div className="aspect-[16/9] bg-gray-200 overflow-hidden relative">
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
                        bgcolor: "#042C53",
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
                        borderColor: "#042C53",
                        color: "#042C53",
                        fontSize: "0.75rem"
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">
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
            <p className="text-gray-600 font-medium">Diaspora · NYC</p>
            <div className="flex items-center gap-6">
              <Link to="/browse" className="text-gray-600 hover:text-[#042C53] transition-colors">
                Browse
              </Link>
              <Link to="/browse" className="text-gray-600 hover:text-[#042C53] transition-colors">
                Communities
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-[#042C53] transition-colors">
                About
              </Link>
              <Link to="/submit" className="text-gray-600 hover:text-[#042C53] transition-colors">
                Add Event
              </Link>
              <Link to="/submit-org" className="text-gray-600 hover:text-[#042C53] transition-colors">
                Add Org
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
