import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, MapPin, ExternalLink, Utensils, Wine, Calendar, Clock, DollarSign, Users, Star } from "lucide-react";
import { events } from "../data/events";
import { useAuth } from "../context/AuthContext";
import MobileBottomNav from "./MobileBottomNav";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function EventDetail() {
  const { eventId } = useParams();
  const { user, hasAttended, markAttended, addReview, getReview } = useAuth();
  const navigate = useNavigate();
  const event = events.find(e => e.id === eventId);

  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const attended = eventId ? hasAttended(eventId) : false;
  const existingReview = eventId ? getReview(eventId) : undefined;

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Event not found</p>
          <Link to="/browse">
            <Button variant="contained" sx={{ bgcolor: "#042C53", "&:hover": { bgcolor: "#031d35" } }}>
              Back to Browse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Parse itinerary
  const parseItinerary = (itinerary?: string) => {
    if (!itinerary) return [];
    return itinerary.split(";").map(item => {
      const [time, label] = item.trim().split(" - ");
      return { time: time?.trim(), label: label?.trim() };
    });
  };

  const itinerarySteps = parseItinerary(event.itinerary);

  // Get org initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const handleMarkAttended = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (eventId) {
      markAttended(eventId);
    }
  };

  const handleOpenReview = () => {
    if (existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.text);
    }
    setReviewDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (!user || !eventId) return;
    addReview(eventId, event.title, rating, reviewText);
    setReviewDialogOpen(false);
    setRating(0);
    setReviewText("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="inline-block">
            <div className="text-2xl font-bold text-[#042C53]">Diaspora</div>
            <div className="text-xs text-gray-500 mt-0.5">by Techqueria NYC</div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative aspect-[21/9] bg-gray-200 overflow-hidden">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />

            {/* Back Button */}
            <Link
              to="/browse"
              className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-900" />
            </Link>

            {/* Tags Overlay */}
            <div className="absolute bottom-4 left-4 flex gap-2">
              {event.community.map(community => (
                <Chip
                  key={community}
                  label={community}
                  sx={{
                    bgcolor: "#042C53",
                    color: "white",
                    fontWeight: 500
                  }}
                />
              ))}
              <Chip
                label={event.type}
                variant="outlined"
                sx={{
                  bgcolor: "white",
                  borderColor: "#042C53",
                  color: "#042C53",
                  fontWeight: 500
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {event.title}
            </h1>

            {/* Goal */}
            {event.goal && (
              <div className="border-l-4 border-[#042C53] pl-4 mb-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {event.goal}
                </p>
              </div>
            )}

            {/* Know Before You Go */}
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
                Know before you go
              </h2>

              {/* Location */}
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-[#042C53] mt-0.5 shrink-0" />
                <p className="text-gray-900">
                  {event.location} · {event.neighborhood}
                </p>
              </div>

              {/* Fact Tiles Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-[#042C53]" />
                    <span className="text-xs uppercase text-gray-500">Date</span>
                  </div>
                  <p className="text-gray-900 font-medium">{formattedDate}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-[#042C53]" />
                    <span className="text-xs uppercase text-gray-500">Time</span>
                  </div>
                  <p className="text-gray-900 font-medium">{event.time}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-[#042C53]" />
                    <span className="text-xs uppercase text-gray-500">Cost</span>
                  </div>
                  <p className="text-gray-900 font-medium">{event.price}</p>
                </div>

                {event.capacity && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-[#042C53]" />
                      <span className="text-xs uppercase text-gray-500">Capacity</span>
                    </div>
                    <p className="text-gray-900 font-medium">{event.capacity}</p>
                  </div>
                )}
              </div>
            </div>

            {/* What's Included */}
            {(event.food || event.drinks) && (
              <div className="mb-8">
                <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
                  What's included
                </h2>
                <div className="space-y-3">
                  {event.food && (
                    <div className="flex items-center gap-3">
                      <Utensils className="w-5 h-5 text-[#042C53] shrink-0" />
                      <p className="text-gray-900">{event.food}</p>
                    </div>
                  )}
                  {event.drinks && (
                    <div className="flex items-center gap-3">
                      <Wine className="w-5 h-5 text-[#042C53] shrink-0" />
                      <p className="text-gray-900">{event.drinks}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Run of Show */}
            {itinerarySteps.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-4">
                  Run of show
                </h2>
                <div className="space-y-2">
                  {itinerarySteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <span className="text-[#042C53] font-semibold whitespace-nowrap">
                        {step.time}
                      </span>
                      <span className="text-gray-700">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Who It's For */}
            {event.who_for && (
              <div className="mb-8">
                <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                  Who it's for
                </h2>
                <p className="text-gray-900">{event.who_for}</p>
              </div>
            )}

            {/* Hosted By */}
            <div className="mb-8">
              <h2 className="text-xs uppercase tracking-wide text-gray-500 mb-3">
                Hosted by
              </h2>
              <div className="bg-gray-50 rounded-lg p-5 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#042C53] flex items-center justify-center text-white font-bold shrink-0">
                  {getInitials(event.org)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{event.org}</h3>
                  {event.org_mission && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {event.org_mission}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={event.register_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="contained"
                  fullWidth
                  endIcon={<ExternalLink className="w-4 h-4" />}
                  sx={{
                    bgcolor: "#042C53",
                    "&:hover": { bgcolor: "#031d35" },
                    textTransform: "none",
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: 600
                  }}
                >
                  Register
                </Button>
              </a>

              {user && (
                <>
                  {!attended ? (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleMarkAttended}
                      sx={{
                        borderColor: "#042C53",
                        color: "#042C53",
                        textTransform: "none",
                        py: 1.5,
                        "&:hover": {
                          borderColor: "#031d35",
                          bgcolor: "#f0f4f8"
                        }
                      }}
                    >
                      Mark as attended
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleOpenReview}
                      startIcon={<Star className="w-4 h-4" />}
                      sx={{
                        borderColor: "#B45309",
                        color: "#B45309",
                        textTransform: "none",
                        py: 1.5,
                        "&:hover": {
                          borderColor: "#92400e",
                          bgcolor: "#fef3c7"
                        }
                      }}
                    >
                      {existingReview ? "Edit review" : "Leave a review"}
                    </Button>
                  )}
                </>
              )}

              {!user && (
                <p className="text-sm text-gray-500 text-center">
                  <Link to="/login" className="text-[#042C53] hover:underline">
                    Sign in
                  </Link>{" "}
                  to mark as attended and leave a review
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <MobileBottomNav />

      {/* Review Dialog */}
      <Dialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Leave a review</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-2">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? "fill-[#B45309] text-[#B45309]"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <TextField
              label="Your review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              fullWidth
              multiline
              rows={4}
              placeholder="Share your experience at this event..."
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
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setReviewDialogOpen(false)}
            sx={{ color: "#6b7280", textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmitReview}
            variant="contained"
            disabled={rating === 0 || reviewText.trim() === ""}
            sx={{
              bgcolor: "#042C53",
              "&:hover": { bgcolor: "#031d35" },
              textTransform: "none"
            }}
          >
            Submit review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
