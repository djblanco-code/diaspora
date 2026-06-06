import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { submitOrganization } from "../../lib/organizations";
import { uploadImage } from "../../lib/storage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";

const communities = [
  "Black", "Latino", "Asian", "South Asian", "Caribbean", "African", "MENA", "Indigenous"
];

const focusAreas = [
  "Tech", "Finance", "Law", "Healthcare", "Entrepreneurship", "General"
];

export default function SubmitOrg() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form state
  const [orgName, setOrgName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [mission, setMission] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [website, setWebsite] = useState("");
  const [city, setCity] = useState("New York City");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [yourName, setYourName] = useState("");
  const [yourRole, setYourRole] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [isRepresentative, setIsRepresentative] = useState(false);

  const isFormValid = () => {
    return (
      orgName.trim() !== "" &&
      logo !== null &&
      mission.trim() !== "" &&
      mission.length <= 160 &&
      selectedCommunities.length > 0 &&
      website.trim() !== "" &&
      city.trim() !== "" &&
      yourName.trim() !== "" &&
      yourRole.trim() !== "" &&
      yourEmail.trim() !== "" &&
      isRepresentative
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || !user) return;

    setSubmitting(true);
    setSubmitError(null);

    const { url: imageUrl, error: uploadError } = await uploadImage(
      "org-logos",
      logo!,
      user.id
    );
    if (uploadError || !imageUrl) {
      setSubmitting(false);
      setSubmitError(uploadError ?? "Image upload failed.");
      return;
    }

    const { error } = await submitOrganization(
      {
        name: orgName.trim(),
        community: selectedCommunities,
        focus: selectedFocusAreas,
        description: mission.trim(),
        website: website.trim(),
        image_url: imageUrl,
        neighborhood: city.trim(),
      },
      user.id
    );

    setSubmitting(false);

    if (error) {
      setSubmitError(error);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-[#C79A6A] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#322318] mb-2">Thank you!</h2>
          <p className="text-[#8A7866] mb-6">
            We'll review within 3-5 days and email you when your organization is live.
          </p>
          <Link to="/">
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#3A2A1E",
                "&:hover": { bgcolor: "#2A1C12" },
                textTransform: "none",
                py: 1.5
              }}
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-block">
            <div className="text-2xl font-bold text-[#9A6B3C]">Diaspora</div>
            <div className="text-xs text-[#8A7866] mt-0.5">by Techqueria NYC</div>
          </Link>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-[#8A7866] hover:text-[#9A6B3C] mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-[#322318] mb-2">Add Org</h1>
          <p className="text-[#8A7866] mb-8">
            Get your organization featured on Diaspora's directory and logo wall.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Details */}
            <div>
              <h2 className="text-xl font-semibold text-[#322318] mb-4 pb-2 border-b border-gray-200">
                Organization details
              </h2>
              <div className="space-y-4">
                <TextField
                  label="Organization name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <div>
                  <label className="block text-sm font-medium text-[#4A3422] mb-2">
                    Logo <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-[#8A7866]
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-[#C79A6A] file:text-white
                      hover:file:bg-[#2A1C12]
                      file:cursor-pointer cursor-pointer"
                  />
                  {logo && (
                    <p className="text-sm text-[#8A7866] mt-2">Selected: {logo.name}</p>
                  )}
                  <p className="text-xs text-[#8A7866] mt-1">This will appear in the logo wall</p>
                </div>

                <TextField
                  label="Tagline / Mission"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  fullWidth
                  required
                  multiline
                  rows={3}
                  inputProps={{ maxLength: 160 }}
                  helperText={`${mission.length}/160 characters`}
                  error={mission.length > 160}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <div>
                  <label className="block text-sm font-medium text-[#4A3422] mb-2">
                    Communities served <span className="text-red-600">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {communities.map((community) => (
                      <Chip
                        key={community}
                        label={community}
                        onClick={() => {
                          setSelectedCommunities(prev =>
                            prev.includes(community)
                              ? prev.filter(c => c !== community)
                              : [...prev, community]
                          );
                        }}
                        sx={{
                          bgcolor: selectedCommunities.includes(community) ? "#9A6B3C" : "white",
                          color: selectedCommunities.includes(community) ? "white" : "#9A6B3C",
                          border: "1px solid #9A6B3C",
                          "&:hover": {
                            bgcolor: selectedCommunities.includes(community) ? "#2A1C12" : "#EFE0C8"
                          }
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#8A7866] mt-2">Select at least one</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A3422] mb-2">
                    Focus areas (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {focusAreas.map((area) => (
                      <Chip
                        key={area}
                        label={area}
                        onClick={() => {
                          setSelectedFocusAreas(prev =>
                            prev.includes(area)
                              ? prev.filter(a => a !== area)
                              : [...prev, area]
                          );
                        }}
                        sx={{
                          bgcolor: selectedFocusAreas.includes(area) ? "#9A6B3C" : "white",
                          color: selectedFocusAreas.includes(area) ? "white" : "#9A6B3C",
                          border: "1px solid #9A6B3C",
                          "&:hover": {
                            bgcolor: selectedFocusAreas.includes(area) ? "#2A1C12" : "#EFE0C8"
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                <TextField
                  label="Website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  fullWidth
                  required
                  placeholder="https://"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <TextField
                  label="City / where you operate"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <TextField
                  label="LinkedIn URL (optional)"
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  fullWidth
                  placeholder="https://linkedin.com/company/..."
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <TextField
                  label="Instagram URL (optional)"
                  type="url"
                  value={instagramUrl}
                  onChange={(e) => setInstagramUrl(e.target.value)}
                  fullWidth
                  placeholder="https://instagram.com/..."
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />
              </div>
            </div>

            {/* Your Information */}
            <div>
              <h2 className="text-xl font-semibold text-[#322318] mb-4 pb-2 border-b border-gray-200">
                Your information
              </h2>
              <div className="space-y-4">
                <TextField
                  label="Your name"
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <TextField
                  label="Your role at the org"
                  value={yourRole}
                  onChange={(e) => setYourRole(e.target.value)}
                  fullWidth
                  required
                  placeholder="e.g., Executive Director, Communications Lead"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <TextField
                  label="Your email"
                  type="email"
                  value={yourEmail}
                  onChange={(e) => setYourEmail(e.target.value)}
                  fullWidth
                  required
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isRepresentative}
                      onChange={(e) => setIsRepresentative(e.target.checked)}
                      required
                      sx={{
                        color: "#9A6B3C",
                        "&.Mui-checked": { color: "#9A6B3C" }
                      }}
                    />
                  }
                  label="I'm an official representative of this organization"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!isFormValid() || submitting}
                sx={{
                  bgcolor: "#3A2A1E",
                  "&:hover": { bgcolor: "#2A1C12" },
                  "&.Mui-disabled": {
                    bgcolor: "#e5e7eb",
                    color: "#9ca3af"
                  },
                  textTransform: "none",
                  py: 1.5,
                  fontSize: "1rem"
                }}
              >
                {submitting ? "Submitting…" : "Add Org"}
              </Button>
              {submitError && (
                <p className="text-sm text-red-600 mt-2 text-center">
                  {submitError}
                </p>
              )}
              {!isFormValid() && (
                <p className="text-sm text-[#8A7866] mt-2 text-center">
                  Please fill in all required fields
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
