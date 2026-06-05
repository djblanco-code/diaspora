import { useParams, Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { events, communities } from "../data/events";
import EventCard from "./EventCard";
import MobileBottomNav from "./MobileBottomNav";
import Button from "@mui/material/Button";

export default function CommunityPage() {
  const { communityId } = useParams();

  const community = communities.find(c => c.id === communityId);
  const communityEvents = events
    .filter(e => e.community.some(c => c === community?.name))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#8A7866] text-lg mb-4">Community not found</p>
          <Link to="/browse">
            <Button variant="contained" sx={{ bgcolor: "#3A2A1E", "&:hover": { bgcolor: "#2A1C12" } }}>
              Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-block">
            <div className="text-2xl font-bold text-[#9A6B3C]">Diaspora</div>
            <div className="text-xs text-[#8A7866] mt-0.5">by Techqueria NYC</div>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#9A6B3C] to-[#063d6b] text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{community.name}</h1>
          <p className="text-lg text-white/90 max-w-2xl">{community.description}</p>
        </div>
      </div>

      {/* Events */}
      <div className="flex-1 bg-[#FBF6EE]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mb-6">
            <p className="text-[#8A7866]">
              {communityEvents.length} event{communityEvents.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20 lg:pb-6">
            {communityEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {communityEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#8A7866] text-lg">No upcoming events for this community.</p>
            </div>
          )}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
