import { Link } from "react-router";
import { MapPin, ExternalLink } from "lucide-react";
import { Organization } from "../data/organizations";
import Chip from "@mui/material/Chip";

interface OrganizationCardProps {
  organization: Organization;
}

export default function OrganizationCard({ organization }: OrganizationCardProps) {
  return (
    <Link to={`/organization/${organization.id}`} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="aspect-[16/9] bg-[#EFE0C8] relative overflow-hidden">
          <img
            src={organization.image_url}
            alt={organization.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {organization.community.slice(0, 2).map(community => (
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
              label={organization.type}
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

          {/* Name */}
          <h3 className="font-semibold text-[#322318] mb-2 group-hover:text-[#9A6B3C] transition-colors line-clamp-2">
            {organization.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-[#8A7866] mb-3 line-clamp-2">
            {organization.description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-2 text-sm text-[#8A7866] mb-3">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{organization.neighborhood}</span>
          </div>

          {/* Focus Areas */}
          <div className="flex flex-wrap gap-1 mb-3">
            {organization.focus.slice(0, 3).map(focus => (
              <span
                key={focus}
                className="text-xs px-2 py-1 bg-gray-100 text-[#4A3422] rounded"
              >
                {focus}
              </span>
            ))}
          </div>

          {/* Link */}
          <div className="pt-3 border-t border-gray-100">
            <span className="text-[#9A6B3C] font-medium text-sm group-hover:underline inline-flex items-center gap-1">
              View organization →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
