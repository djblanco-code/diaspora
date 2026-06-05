import { Link } from "react-router";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "../data/events";
import Chip from "@mui/material/Chip";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <Link to={`/event/${event.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="aspect-[16/9] bg-[#EFE0C8] relative overflow-hidden">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {event.community.slice(0, 2).map(community => (
              <Chip
                key={community}
                label={community}
                size="small"
                sx={{
                  bgcolor: "#3A2A1E",
                  color: "white",
                  fontSize: "0.75rem",
                  height: "24px"
                }}
              />
            ))}
            <Chip
              label={event.type}
              size="small"
              variant="outlined"
              sx={{
                borderColor: "#6b7280",
                color: "#6b7280",
                fontSize: "0.75rem",
                height: "24px"
              }}
            />
          </div>

          {/* Title */}
          <h3 className="font-semibold text-[#322318] mb-2 group-hover:text-[#9A6B3C] transition-colors line-clamp-2">
            {event.title}
          </h3>

          {/* Meta */}
          <div className="space-y-1 text-sm text-[#8A7866]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>
                {event.org} • {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{event.neighborhood}</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-4 pt-3 border-t border-gray-100">
            <span className="text-[#9A6B3C] font-medium text-sm group-hover:underline">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
