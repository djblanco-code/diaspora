import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { communities } from "../data/events";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [industry, setIndustry] = useState(user?.industry || "");
  const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedin_url || "");
  const [partOf, setPartOf] = useState<string[]>(user?.communities_part_of || []);
  const [allyTo, setAllyTo] = useState<string[]>(user?.communities_ally || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOnboarding = Boolean(user) && !user?.onboarding_complete;
  const canSubmit = name.trim().length > 0 && (!isOnboarding || partOf.length > 0);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Please sign in to edit your profile</p>
          <Link to="/login">
            <Button variant="contained" sx={{ bgcolor: "#042C53", "&:hover": { bgcolor: "#031d35" } }}>
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    setError(null);
    try {
      await updateProfile({
        name,
        industry,
        linkedin_url: linkedinUrl,
        communities_part_of: partOf,
        communities_ally: allyTo,
        onboarding_complete: true,
      });
      navigate(isOnboarding ? "/browse" : "/profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isOnboarding && (
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#042C53] mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Profile
          </Link>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isOnboarding ? "Complete your profile" : "Edit Profile"}
          </h1>
          {isOnboarding && (
            <p className="text-gray-600 mb-6">
              Add your name and at least one community you're part of to continue.
            </p>
          )}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-6">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic info</h2>
              <div className="space-y-4">
                <TextField
                  label="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  label="Industry & role"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  fullWidth
                  placeholder="e.g., Product Manager · Fintech"
                  helperText="Format: Role · Industry"
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
                  label="LinkedIn URL"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  fullWidth
                  placeholder="https://linkedin.com/in/yourname"
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

            {/* Identity */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Identity</h2>
              <div className="space-y-4">
                <FormControl fullWidth required={isOnboarding}>
                  <InputLabel>{isOnboarding ? "Part of *" : "Part of"}</InputLabel>
                  <Select
                    multiple
                    value={partOf}
                    onChange={(e) => setPartOf(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    input={<OutlinedInput label={isOnboarding ? "Part of *" : "Part of"} />}
                    renderValue={(selected) => selected.join(", ")}
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#042C53"
                      }
                    }}
                  >
                    {communities.map((community) => (
                      <MenuItem key={community.id} value={community.name}>
                        <Checkbox checked={partOf.includes(community.name)} sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />
                        <ListItemText primary={community.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Ally to</InputLabel>
                  <Select
                    multiple
                    value={allyTo}
                    onChange={(e) => setAllyTo(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    input={<OutlinedInput label="Ally to" />}
                    renderValue={(selected) => selected.join(", ")}
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#042C53"
                      }
                    }}
                  >
                    {communities.map((community) => (
                      <MenuItem key={community.id} value={community.name}>
                        <Checkbox checked={allyTo.includes(community.name)} sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />
                        <ListItemText primary={community.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={!canSubmit || saving}
                sx={{
                  bgcolor: "#042C53",
                  "&:hover": { bgcolor: "#031d35" },
                  textTransform: "none",
                  py: 1.5
                }}
              >
                {saving ? "Saving…" : isOnboarding ? "Continue to Browse" : "Save changes"}
              </Button>
              {!isOnboarding && (
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate("/profile")}
                  sx={{
                    borderColor: "#042C53",
                    color: "#042C53",
                    textTransform: "none",
                    py: 1.5,
                    minWidth: "100px"
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
