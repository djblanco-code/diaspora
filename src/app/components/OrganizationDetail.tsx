import { useParams, Link } from "react-router";
import { ArrowLeft, MapPin, Share2, ExternalLink } from "lucide-react";
import { organizations } from "../data/organizations";
import MobileBottomNav from "./MobileBottomNav";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

export default function OrganizationDetail() {
  const { organizationId } = useParams();
  const organization = organizations.find(o => o.id === organizationId);

  if (!organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Organization not found</p>
          <Link to="/browse">
            <Button variant="contained" sx={{ bgcolor: "#042C53", "&:hover": { bgcolor: "#031d35" } }}>
              Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: organization.name,
        text: organization.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-block">
            <div className="text-2xl font-bold text-[#042C53]">Diaspora</div>
            <div className="text-xs text-gray-500 mt-0.5">by Techqueria NYC</div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 pb-20 lg:pb-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#042C53] mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Browse
          </Link>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Hero Image */}
            <div className="aspect-[21/9] bg-gray-200 relative overflow-hidden">
              <img
                src={organization.image_url}
                alt={organization.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 lg:p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {organization.community.map(community => (
                  <Chip
                    key={community}
                    label={community}
                    sx={{
                      bgcolor: "#042C53",
                      color: "white",
                      fontSize: "0.875rem"
                    }}
                  />
                ))}
                <Chip
                  label={organization.type}
                  variant="outlined"
                  sx={{
                    borderColor: "#6b7280",
                    color: "#6b7280",
                    fontSize: "0.875rem"
                  }}
                />
              </div>

              {/* Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {organization.name}
              </h1>

              {/* Meta */}
              <div className="flex items-start gap-3 mb-6 pb-6 border-b border-gray-200">
                <MapPin className="w-5 h-5 text-[#042C53] mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">{organization.neighborhood}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed">{organization.description}</p>
              </div>

              {/* Focus Areas */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Focus Areas</h2>
                <div className="flex flex-wrap gap-2">
                  {organization.focus.map(focus => (
                    <Chip
                      key={focus}
                      label={focus}
                      size="small"
                      sx={{
                        bgcolor: "#f3f4f6",
                        color: "#374151",
                        fontSize: "0.75rem"
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={organization.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<ExternalLink className="w-4 h-4" />}
                    sx={{
                      bgcolor: "#042C53",
                      "&:hover": { bgcolor: "#031d35" },
                      textTransform: "none",
                      py: 1.5,
                      fontSize: "1rem"
                    }}
                  >
                    Visit website
                  </Button>
                </a>

                <Button
                  variant="outlined"
                  startIcon={<Share2 className="w-4 h-4" />}
                  onClick={handleShare}
                  sx={{
                    borderColor: "#042C53",
                    color: "#042C53",
                    "&:hover": { borderColor: "#031d35", bgcolor: "#f0f4f8" },
                    textTransform: "none",
                    py: 1.5,
                    minWidth: { xs: "100%", sm: "auto" }
                  }}
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
