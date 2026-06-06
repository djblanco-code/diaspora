import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { submitEvent } from "../../lib/events";
import { uploadImage } from "../../lib/storage";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import FormHelperText from "@mui/material/FormHelperText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { communities } from "../data/events";

interface ItineraryStep {
  time: string;
  label: string;
}

export default function SubmitEvent() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [eventType, setEventType] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venueName, setVenueName] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [address, setAddress] = useState("");
  const [costType, setCostType] = useState<"free" | "paid">("free");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [noLimit, setNoLimit] = useState(false);
  const [food, setFood] = useState("");
  const [drinks, setDrinks] = useState("");
  const [drinkTickets, setDrinkTickets] = useState("");
  const [itinerary, setItinerary] = useState<ItineraryStep[]>([{ time: "", label: "" }]);
  const [whoItsFor, setWhoItsFor] = useState("");
  const [description, setDescription] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgMission, setOrgMission] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const eventTypes = ["Networking", "Panels & talks", "Workshops", "Career fairs", "Fellowships", "Conferences", "Hiring"];
  const foodOptions = ["None", "Snacks", "Light bites", "Full meal"];
  const drinkOptions = ["None", "Cash bar", "Drink tickets", "Open bar"];

  const addItineraryStep = () => {
    setItinerary([...itinerary, { time: "", label: "" }]);
  };

  const removeItineraryStep = (index: number) => {
    setItinerary(itinerary.filter((_, i) => i !== index));
  };

  const updateItineraryStep = (index: number, field: keyof ItineraryStep, value: string) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      selectedCommunities.length > 0 &&
      eventType !== "" &&
      goal.trim() !== "" &&
      goal.length <= 120 &&
      date !== "" &&
      startTime !== "" &&
      endTime !== "" &&
      venueName.trim() !== "" &&
      neighborhood.trim() !== "" &&
      address.trim() !== "" &&
      (costType === "free" || (costType === "paid" && price.trim() !== "")) &&
      (noLimit || capacity.trim() !== "") &&
      food !== "" &&
      drinks !== "" &&
      (drinks !== "Drink tickets" || drinkTickets.trim() !== "") &&
      whoItsFor.trim() !== "" &&
      description.trim() !== "" &&
      description.length <= 280 &&
      orgName.trim() !== "" &&
      orgMission.trim() !== "" &&
      orgMission.length <= 160 &&
      registrationLink.trim() !== "" &&
      coverImage !== null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid() || !user) return;

    setSubmitting(true);
    setSubmitError(null);

    const { url: imageUrl, error: uploadError } = await uploadImage(
      "event-images",
      coverImage!,
      user.id
    );
    if (uploadError || !imageUrl) {
      setSubmitting(false);
      setSubmitError(uploadError ?? "Image upload failed.");
      return;
    }

    const itineraryString = itinerary
      .filter(step => step.time.trim() !== "" || step.label.trim() !== "")
      .map(step => `${step.time} - ${step.label}`)
      .join("; ");

    const { error } = await submitEvent(
      {
        title: title.trim(),
        community: selectedCommunities,
        type: eventType,
        org: orgName.trim(),
        date,
        time: `${startTime} - ${endTime}`,
        location: address.trim() ? `${venueName.trim()}, ${address.trim()}` : venueName.trim(),
        neighborhood: neighborhood.trim(),
        price: costType === "free" ? "Free" : price.trim(),
        register_url: registrationLink.trim(),
        image_url: imageUrl,
        description: description.trim(),
        capacity: noLimit ? "Unlimited" : capacity.trim(),
        food,
        drinks: drinks === "Drink tickets" && drinkTickets.trim() ? `${drinks} (${drinkTickets.trim()})` : drinks,
        goal: goal.trim(),
        who_for: whoItsFor.trim(),
        org_mission: orgMission.trim(),
        itinerary: itineraryString,
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
            We'll review your event and publish it within 48 hours. We'll reach out if we need any additional details.
          </p>
          <Link to="/browse">
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
              Back to Browse
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
          <h1 className="text-3xl font-bold text-[#322318] mb-2">Add Event</h1>
          <p className="text-[#8A7866] mb-8">
            Share a professional development event with NYC's diaspora communities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASICS */}
            <div>
              <h2 className="text-xl font-semibold text-[#322318] mb-4 pb-2 border-b border-gray-200">
                Basics
              </h2>
              <div className="space-y-4">
                <TextField
                  label="Event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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

                <FormControl fullWidth required>
                  <InputLabel>Community</InputLabel>
                  <Select
                    multiple
                    value={selectedCommunities}
                    onChange={(e) => setSelectedCommunities(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
                    input={<OutlinedInput label="Community" />}
                    renderValue={(selected) => selected.join(", ")}
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9A6B3C"
                      }
                    }}
                  >
                    {communities.map((community) => (
                      <MenuItem key={community.id} value={community.name}>
                        <Checkbox checked={selectedCommunities.includes(community.name)} sx={{ color: "#9A6B3C", "&.Mui-checked": { color: "#9A6B3C" } }} />
                        <ListItemText primary={community.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Select at least one community</FormHelperText>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Event type</InputLabel>
                  <Select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    label="Event type"
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9A6B3C"
                      }
                    }}
                  >
                    {eventTypes.map((type) => (
                      <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Goal"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  fullWidth
                  required
                  inputProps={{ maxLength: 120 }}
                  helperText={`One sentence — what will someone walk away with? (${goal.length}/120)`}
                  error={goal.length > 120}
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

            {/* WHEN & WHERE */}
            <div>
              <h2 className="text-xl font-semibold text-[#322318] mb-4 pb-2 border-b border-gray-200">
                When & Where
              </h2>
              <div className="space-y-4">
                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#9A6B3C"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#9A6B3C"
                    }
                  }}
                />

                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Start time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
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
                    label="End time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
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

                <TextField
                  label="Venue name"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
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
                  label="Neighborhood"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
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
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
              </div>
            </div>

            {/* THE DETAILS */}
            <div>
              <h2 className="text-xl font-semibold text-[#322318] mb-4 pb-2 border-b border-gray-200">
                The Details
              </h2>
              <div className="space-y-4">
                <FormControl component="fieldset" required>
                  <FormLabel component="legend" sx={{ "&.Mui-focused": { color: "#9A6B3C" } }}>Cost</FormLabel>
                  <RadioGroup
                    row
                    value={costType}
                    onChange={(e) => setCostType(e.target.value as "free" | "paid")}
                  >
                    <FormControlLabel value="free" control={<Radio sx={{ color: "#9A6B3C", "&.Mui-checked": { color: "#9A6B3C" } }} />} label="Free" />
                    <FormControlLabel value="paid" control={<Radio sx={{ color: "#9A6B3C", "&.Mui-checked": { color: "#9A6B3C" } }} />} label="Paid" />
                  </RadioGroup>
                </FormControl>

                {costType === "paid" && (
                  <TextField
                    label="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    fullWidth
                    required
                    placeholder="e.g., $25 or $20-$50"
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9A6B3C"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9A6B3C"
                      }
                    }}
                  />
                )}

                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={noLimit}
                        onChange={(e) => {
                          setNoLimit(e.target.checked);
                          if (e.target.checked) setCapacity("");
                        }}
                        sx={{ color: "#9A6B3C", "&.Mui-checked": { color: "#9A6B3C" } }}
                      />
                    }
                    label="No capacity limit"
                  />
                  {!noLimit && (
                    <TextField
                      label="Capacity"
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      fullWidth
                      required
                      inputProps={{ min: 1 }}
                      sx={{
                        mt: 2,
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#9A6B3C"
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#9A6B3C"
                        }
                      }}
                    />
                  )}
                </div>

                <FormControl fullWidth required>
                  <InputLabel>Food</InputLabel>
                  <Select
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    label="Food"
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9A6B3C"
                      }
                    }}
                  >
                    {foodOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Drinks</InputLabel>
                  <Select
                    value={drinks}
                    onChange={(e) => setDrinks(e.target.value)}
                    label="Drinks"
                    sx={{
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9A6B3C"
                      }
                    }}
                  >
                    {drinkOptions.map((option) => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {drinks === "Drink tickets" && (
                  <TextField
                    label="Number of drink tickets"
                    type="number"
                    value={drinkTickets}
                    onChange={(e) => setDrinkTickets(e.target.value)}
                    fullWidth
                    required
                    inputProps={{ min: 1 }}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#9A6B3C"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#9A6B3C"
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* RUN OF SHOW */}
            <div>
              <h2 className="text-xl font-semibold text-[#322318] mb-4 pb-2 border-b border-gray-200">
                Run of Show
              </h2>
              <div className="space-y-3">
                <FormLabel sx={{ display: "block", mb: 1 }}>Itinerary</FormLabel>
                {itinerary.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <TextField
                      label="Time"
                      type="time"
                      value={step.time}
                      onChange={(e) => updateItineraryStep(index, "time", e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: "150px",
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#9A6B3C"
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#9A6B3C"
                        }
                      }}
                    />
                    <TextField
                      label="Activity"
                      value={step.label}
                      onChange={(e) => updateItineraryStep(index, "label", e.target.value)}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#9A6B3C"
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#9A6B3C"
                        }
                      }}
                    />
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItineraryStep(index)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<Plus className="w-4 h-4" />}
                  onClick={addItineraryStep}
                  sx={{
                    color: "#9A6B3C",
                    borderColor: "#9A6B3C",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#2A1C12",
                      bgcolor: "#EFE0C8"
                    }
                  }}
                >
                  Add step
                </Button>
              </div>
            </div>

            {/* CONTEXT */}
            <div>
              <h2 className="text-xl font-semibold text-[#322318] mb-4 pb-2 border-b border-gray-200">
                Context
              </h2>
              <div className="space-y-4">
                <TextField
                  label="Who it's for"
                  value={whoItsFor}
                  onChange={(e) => setWhoItsFor(e.target.value)}
                  fullWidth
                  required
                  helperText="Community + roles, e.g. 'Latina women in tech'"
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
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  inputProps={{ maxLength: 280 }}
                  helperText={`${description.length}/280 characters`}
                  error={description.length > 280}
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
                  <TextField
                    label="Hosting organization name"
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
                  <p className="text-xs text-[#8A7866] mt-1">
                    Hosting under an org?{" "}
                    <Link to="/submit-org" className="text-[#9A6B3C] hover:underline">
                      Add it first
                    </Link>
                  </p>
                </div>

                <TextField
                  label="Organization mission"
                  value={orgMission}
                  onChange={(e) => setOrgMission(e.target.value)}
                  fullWidth
                  required
                  multiline
                  rows={3}
                  inputProps={{ maxLength: 160 }}
                  helperText={`1-2 sentences on what your org does (${orgMission.length}/160)`}
                  error={orgMission.length > 160}
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
                  label="Registration link"
                  type="url"
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
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

                <div>
                  <FormLabel required sx={{ display: "block", mb: 2 }}>Cover image</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-[#8A7866]
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-[#C79A6A] file:text-white
                      hover:file:bg-[#2A1C12]
                      file:cursor-pointer cursor-pointer"
                  />
                  {coverImage && (
                    <p className="text-sm text-[#8A7866] mt-2">Selected: {coverImage.name}</p>
                  )}
                </div>
              </div>
            </div>

            {/* SUBMIT */}
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
                {submitting ? "Submitting…" : "Add Event"}
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
