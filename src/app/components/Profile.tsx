import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { events } from "../data/events";
import { Lock, Linkedin, Calendar, FileText, Star } from "lucide-react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import MobileBottomNav from "./MobileBottomNav";
import Navbar from "./Navbar";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Please sign in to view your profile</p>
          <Link to="/login">
            <Button variant="contained" sx={{ bgcolor: "#042C53", "&:hover": { bgcolor: "#031d35" } }}>
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  const attendedEvents = events.filter(e => user.events_attended.includes(e.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <Navbar />
      </header>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
        <div className="flex justify-end mb-4">
          <Button
            variant="text"
            onClick={logout}
            sx={{ color: "#042C53", textTransform: "none" }}
          >
            Sign out
          </Button>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-6 pb-6 border-b border-gray-200">
            <div className="w-20 h-20 rounded-full bg-[#042C53] flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                getInitials(user.name)
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h1>
              {user.industry && (
                <p className="text-gray-600 mb-2">{user.industry}</p>
              )}

              <div className="flex flex-col gap-2 mb-3">
                {user.linkedin_url && (
                  <a
                    href={user.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#042C53] hover:underline text-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}

                <div className="inline-flex items-center gap-1 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  {user.email} · Account only
                </div>
              </div>

              <Link to="/profile/edit">
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "#042C53",
                    color: "#042C53",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#031d35",
                      bgcolor: "#f0f4f8"
                    }
                  }}
                >
                  Edit profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Identity Block */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Part of</h3>
              <div className="flex flex-wrap gap-2">
                {user.communities_part_of.length > 0 ? (
                  user.communities_part_of.map(community => (
                    <Chip
                      key={community}
                      label={community}
                      sx={{
                        bgcolor: "#042C53",
                        color: "white",
                        fontWeight: 500
                      }}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No communities selected</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Ally to</h3>
              <div className="flex flex-wrap gap-2">
                {user.communities_ally.length > 0 ? (
                  user.communities_ally.map(community => (
                    <Chip
                      key={community}
                      label={community}
                      variant="outlined"
                      sx={{
                        borderColor: "#042C53",
                        color: "#042C53",
                        fontWeight: 500
                      }}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No communities selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-[#042C53]" />
                <span className="text-2xl font-bold text-gray-900">{user.events_attended.length}</span>
              </div>
              <p className="text-sm text-gray-600">Events attended</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-[#042C53]" />
                <span className="text-2xl font-bold text-gray-900">{user.reviews.length}</span>
              </div>
              <p className="text-sm text-gray-600">Reviews written</p>
            </div>
          </div>
        </div>

        {/* Events Attended */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Events attended</h2>
            {attendedEvents.length > 3 && (
              <button className="text-sm text-[#042C53] hover:underline">See all</button>
            )}
          </div>

          {attendedEvents.length > 0 ? (
            <div className="space-y-3">
              {attendedEvents.slice(0, 3).map(event => (
                <Link
                  key={event.id}
                  to={`/event/${event.id}`}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="w-5 h-5 text-[#042C53] mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {event.org}
                    </p>
                  </div>
                  <Chip
                    label={event.community[0]}
                    size="small"
                    sx={{
                      bgcolor: "#042C53",
                      color: "white",
                      fontSize: "0.75rem"
                    }}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              You haven't marked any events as attended yet.
            </p>
          )}
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews</h2>

          {user.reviews.length > 0 ? (
            <div className="space-y-4">
              {user.reviews.map((review, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{review.eventTitle}</h3>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-[#B45309] text-[#B45309]" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              You haven't written any reviews yet.
            </p>
          )}
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
