import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Plus, X } from "lucide-react";
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
  const [submitted, setSubmitted] = useState(false);

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
            We'll review your event and publish it within 48 hours. We'll reach out if we need any additional details.
          </p>
          <Link to="/browse">
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
              Back to Browse
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Event</h1>
          <p className="text-gray-600 mb-8">
            Share a professional development event with NYC's diaspora communities.
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* BASICS */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                        borderColor: "#042C53"
                      }
                    }}
                  >
                    {communities.map((community) => (
                      <MenuItem key={community.id} value={community.name}>
                        <Checkbox checked={selectedCommunities.includes(community.name)} sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />
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
                        borderColor: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
                    }
                  }}
                />
              </div>
            </div>

            {/* WHEN & WHERE */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                        borderColor: "#042C53"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#042C53"
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
                        borderColor: "#042C53"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
                    }
                  }}
                />
              </div>
            </div>

            {/* THE DETAILS */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                The Details
              </h2>
              <div className="space-y-4">
                <FormControl component="fieldset" required>
                  <FormLabel component="legend" sx={{ "&.Mui-focused": { color: "#042C53" } }}>Cost</FormLabel>
                  <RadioGroup
                    row
                    value={costType}
                    onChange={(e) => setCostType(e.target.value as "free" | "paid")}
                  >
                    <FormControlLabel value="free" control={<Radio sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />} label="Free" />
                    <FormControlLabel value="paid" control={<Radio sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />} label="Paid" />
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
                        borderColor: "#042C53"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#042C53"
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
                        sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }}
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
                          borderColor: "#042C53"
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#042C53"
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
                        borderColor: "#042C53"
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
                        borderColor: "#042C53"
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
                        borderColor: "#042C53"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#042C53"
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* RUN OF SHOW */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
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
                          borderColor: "#042C53"
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#042C53"
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
                          borderColor: "#042C53"
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#042C53"
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
                    color: "#042C53",
                    borderColor: "#042C53",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#031d35",
                      bgcolor: "#f0f4f8"
                    }
                  }}
                >
                  Add step
                </Button>
              </div>
            </div>

            {/* CONTEXT */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                        borderColor: "#042C53"
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#042C53"
                      }
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Hosting under an org?{" "}
                    <Link to="/submit-org" className="text-[#042C53] hover:underline">
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
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
                      borderColor: "#042C53"
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "#042C53"
                    }
                  }}
                />

                <div>
                  <FormLabel required sx={{ display: "block", mb: 2 }}>Cover image</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-600
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-medium
                      file:bg-[#042C53] file:text-white
                      hover:file:bg-[#031d35]
                      file:cursor-pointer cursor-pointer"
                  />
                  {coverImage && (
                    <p className="text-sm text-gray-600 mt-2">Selected: {coverImage.name}</p>
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
                Add Event
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
