import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-[#042C53] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
          <p className="text-gray-600 mb-6">
            We'll review within 3-5 days and email you when your organization is live.
          </p>
          <Link to="/">
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#042C53",
                "&:hover": { bgcolor: "#031d35" },
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-block">
            <div className="text-2xl font-bold text-[#042C53]">Diaspora</div>
            <div className="text-xs text-gray-500 mt-0.5">by Techqueria NYC</div>
          </Link>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#042C53] mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Org</h1>
          <p className="text-gray-600 mb-8">
            Get your organization featured on Diaspora's directory and logo wall.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Organization Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
                    }
                  }}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-600
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-[#042C53] file:text-white
                      hover:file:bg-[#031d35]
                      file:cursor-pointer cursor-pointer"
                  />
                  {logo && (
                    <p className="text-sm text-gray-600 mt-2">Selected: {logo.name}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">This will appear in the logo wall</p>
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
                    }
                  }}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          bgcolor: selectedCommunities.includes(community) ? "#042C53" : "white",
                          color: selectedCommunities.includes(community) ? "white" : "#042C53",
                          border: "1px solid #042C53",
                          "&:hover": {
                            bgcolor: selectedCommunities.includes(community) ? "#031d35" : "#f0f4f8"
                          }
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Select at least one</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                          bgcolor: selectedFocusAreas.includes(area) ? "#042C53" : "white",
                          color: selectedFocusAreas.includes(area) ? "white" : "#042C53",
                          border: "1px solid #042C53",
                          "&:hover": {
                            bgcolor: selectedFocusAreas.includes(area) ? "#031d35" : "#f0f4f8"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
                    }
                  }}
                />
              </div>
            </div>

            {/* Your Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                        color: "#042C53",
                        "&.Mui-checked": { color: "#042C53" }
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
                disabled={!isFormValid()}
                sx={{
                  bgcolor: "#042C53",
                  "&:hover": { bgcolor: "#031d35" },
                  "&.Mui-disabled": {
                    bgcolor: "#e5e7eb",
                    color: "#9ca3af"
                  },
                  textTransform: "none",
                  py: 1.5,
                  fontSize: "1rem"
                }}
              >
                Add Org
              </Button>
              {!isFormValid() && (
                <p className="text-sm text-gray-500 mt-2 text-center">
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
