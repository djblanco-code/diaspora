import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { events, communities, eventTypes, industries } from "../data/events";
import { organizations, organizationTypes } from "../data/organizations";
import EventCard from "./EventCard";
import OrganizationCard from "./OrganizationCard";
import MobileBottomNav from "./MobileBottomNav";
import FilterBottomSheet from "./FilterBottomSheet";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

type DateFilter = "any" | "week" | "weekend" | "month";
type ViewMode = "events" | "organizations";

export default function Browse() {
  const [viewMode, setViewMode] = useState<ViewMode>("events");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [dateFilter, setDateFilter] = useState<DateFilter>("any");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCommunity = (community: string) => {
    setSelectedCommunities(prev =>
      prev.includes(community)
        ? prev.filter(c => c !== community)
        : [...prev, community]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prev =>
      prev.includes(industry)
        ? prev.filter(i => i !== industry)
        : [...prev, industry]
    );
  };

  const clearFilters = () => {
    setSelectedCommunities([]);
    setSelectedTypes([]);
    setSelectedIndustries([]);
    setDateFilter("any");
  };

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        e =>
          e.title.toLowerCase().includes(query) ||
          e.org.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query)
      );
    }

    if (selectedCommunities.length > 0) {
      filtered = filtered.filter(e =>
        e.community.some(c => selectedCommunities.includes(c))
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(e => selectedTypes.includes(e.type));
    }

    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(e =>
        e.industries.some(i => selectedIndustries.includes(i))
      );
    }

    if (dateFilter !== "any") {
      const now = new Date("2026-06-05");
      filtered = filtered.filter(e => {
        const eventDate = new Date(e.date);
        const diffDays = Math.ceil((eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (dateFilter === "week") return diffDays <= 7;
        if (dateFilter === "weekend") {
          const day = eventDate.getDay();
          return diffDays <= 7 && (day === 0 || day === 6);
        }
        if (dateFilter === "month") return diffDays <= 30;
        return true;
      });
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchQuery, selectedCommunities, selectedTypes, selectedIndustries, dateFilter]);

  const filteredOrganizations = useMemo(() => {
    let filtered = organizations;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        o =>
          o.name.toLowerCase().includes(query) ||
          o.description.toLowerCase().includes(query) ||
          o.focus.some(f => f.toLowerCase().includes(query))
      );
    }

    if (selectedCommunities.length > 0) {
      filtered = filtered.filter(o =>
        o.community.some(c => selectedCommunities.includes(c))
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(o =>
        o.focus.some(f => selectedTypes.includes(f))
      );
    }

    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(o =>
        o.industries.some(i => selectedIndustries.includes(i))
      );
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery, selectedCommunities, selectedTypes, selectedIndustries]);

  const activeFilterCount =
    selectedCommunities.length + selectedTypes.length + selectedIndustries.length + (viewMode === "events" && dateFilter !== "any" ? 1 : 0);

  const currentItems = viewMode === "events" ? filteredEvents : filteredOrganizations;
  const currentTypes = viewMode === "events" ? eventTypes : organizationTypes;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link to="/" className="inline-block shrink-0">
            <div className="text-2xl font-bold text-[#042C53]">Diaspora</div>
            <div className="text-xs text-gray-500 mt-0.5">by Techqueria NYC</div>
          </Link>

          <div className="flex-1 max-w-xl relative lg:ml-[232px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search events, orgs, topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042C53] focus:border-transparent"
            />
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Link to="/submit">
              <Button
                variant="outlined"
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
                Add Event
              </Button>
            </Link>
            <Link to="/submit-org">
              <Button
                variant="outlined"
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
                Add Org
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#042C53",
                  "&:hover": { bgcolor: "#031d35" },
                  textTransform: "none"
                }}
              >
                Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile community chips */}
        <div className="lg:hidden px-4 pb-3 flex items-center gap-2 overflow-x-auto">
          {communities.slice(0, 4).map(community => (
            <Chip
              key={community.id}
              label={community.name}
              onClick={() => toggleCommunity(community.name)}
              sx={{
                bgcolor: selectedCommunities.includes(community.name) ? "#042C53" : "white",
                color: selectedCommunities.includes(community.name) ? "white" : "#042C53",
                border: "1px solid #042C53",
                "&:hover": {
                  bgcolor: selectedCommunities.includes(community.name) ? "#031d35" : "#f0f4f8"
                }
              }}
            />
          ))}
          <Button
            variant="outlined"
            startIcon={<SlidersHorizontal className="w-4 h-4" />}
            onClick={() => setMobileFiltersOpen(true)}
            sx={{
              color: "#042C53",
              borderColor: "#042C53",
              textTransform: "none",
              whiteSpace: "nowrap"
            }}
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </div>
      </header>

      <div className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-24 bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Fixed Header */}
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Filters</h2>
                  {activeFilterCount > 0 && (
                    <span className="text-xs bg-[#042C53] text-white px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Scrollable Filter Content */}
              <div className="overflow-y-auto max-h-[calc(100vh-200px)] px-4 py-4">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Diasporas</h3>
                    {communities.map(community => (
                      <FormControlLabel
                        key={community.id}
                        control={
                          <Checkbox
                            checked={selectedCommunities.includes(community.name)}
                            onChange={() => toggleCommunity(community.name)}
                            size="small"
                            sx={{
                              color: "#042C53",
                              "&.Mui-checked": { color: "#042C53" },
                              py: 0.25
                            }}
                          />
                        }
                        label={community.name}
                        sx={{
                          display: "block",
                          mb: 0.25,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem"
                          }
                        }}
                      />
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">{viewMode === "events" ? "Event type" : "Focus areas"}</h3>
                    {currentTypes.map(type => (
                      <FormControlLabel
                        key={type}
                        control={
                          <Checkbox
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleType(type)}
                            size="small"
                            sx={{
                              color: "#042C53",
                              "&.Mui-checked": { color: "#042C53" },
                              py: 0.25
                            }}
                          />
                        }
                        label={type}
                        sx={{
                          display: "block",
                          mb: 0.25,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem"
                          }
                        }}
                      />
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Industry</h3>
                    {industries.map(industry => (
                      <FormControlLabel
                        key={industry}
                        control={
                          <Checkbox
                            checked={selectedIndustries.includes(industry)}
                            onChange={() => toggleIndustry(industry)}
                            size="small"
                            sx={{
                              color: "#042C53",
                              "&.Mui-checked": { color: "#042C53" },
                              py: 0.25
                            }}
                          />
                        }
                        label={industry}
                        sx={{
                          display: "block",
                          mb: 0.25,
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem"
                          }
                        }}
                      />
                    ))}
                  </div>

                  {viewMode === "events" && (
                    <div>
                      <h3 className="text-sm font-semibold mb-2">Date</h3>
                      <RadioGroup value={dateFilter} onChange={e => setDateFilter(e.target.value as DateFilter)}>
                        <FormControlLabel
                          value="week"
                          control={<Radio size="small" sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" }, py: 0.25 }} />}
                          label="This week"
                          sx={{
                            mb: 0.25,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "0.875rem"
                            }
                          }}
                        />
                        <FormControlLabel
                          value="weekend"
                          control={<Radio size="small" sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" }, py: 0.25 }} />}
                          label="This weekend"
                          sx={{
                            mb: 0.25,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "0.875rem"
                            }
                          }}
                        />
                        <FormControlLabel
                          value="month"
                          control={<Radio size="small" sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" }, py: 0.25 }} />}
                          label="This month"
                          sx={{
                            mb: 0.25,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "0.875rem"
                            }
                          }}
                        />
                        <FormControlLabel
                          value="any"
                          control={<Radio size="small" sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" }, py: 0.25 }} />}
                          label="Any"
                          sx={{
                            mb: 0.25,
                            "& .MuiFormControlLabel-label": {
                              fontSize: "0.875rem"
                            }
                          }}
                        />
                      </RadioGroup>
                    </div>
                  )}
                </div>
              </div>

              {/* Fixed Footer */}
              {activeFilterCount > 0 && (
                <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                  <Button
                    variant="text"
                    onClick={clearFilters}
                    size="small"
                    fullWidth
                    sx={{ color: "#042C53", textTransform: "none", fontSize: "0.875rem" }}
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <Tabs
                value={viewMode}
                onChange={(_, newValue) => {
                  setViewMode(newValue);
                  setSelectedTypes([]);
                  setSelectedIndustries([]);
                  if (newValue === "organizations") {
                    setDateFilter("any");
                  }
                }}
                sx={{
                  "& .MuiTab-root": {
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#6b7280",
                    "&.Mui-selected": {
                      color: "#042C53"
                    }
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#042C53"
                  }
                }}
              >
                <Tab label="Events" value="events" />
                <Tab label="Communities" value="organizations" />
              </Tabs>
            </div>

            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600">
                  {currentItems.length} {viewMode === "events" ? "event" : "organization"}{currentItems.length !== 1 ? "s" : ""}
                </p>
                {viewMode === "events" && <p className="text-sm text-gray-500">Sorted by date</p>}
                {viewMode === "organizations" && <p className="text-sm text-gray-500">Sorted by name</p>}
              </div>

              {/* Active Filter Chips */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedCommunities.map(community => (
                    <Chip
                      key={community}
                      label={community}
                      onDelete={() => toggleCommunity(community)}
                      deleteIcon={<X className="w-4 h-4" />}
                      sx={{ bgcolor: "#042C53", color: "white" }}
                    />
                  ))}
                  {selectedTypes.map(type => (
                    <Chip
                      key={type}
                      label={type}
                      onDelete={() => toggleType(type)}
                      deleteIcon={<X className="w-4 h-4" />}
                      sx={{ bgcolor: "white", border: "1px solid #042C53", color: "#042C53" }}
                    />
                  ))}
                  {selectedIndustries.map(industry => (
                    <Chip
                      key={industry}
                      label={industry}
                      onDelete={() => toggleIndustry(industry)}
                      deleteIcon={<X className="w-4 h-4" />}
                      sx={{ bgcolor: "white", border: "1px solid #6b7280" }}
                    />
                  ))}
                  {viewMode === "events" && dateFilter !== "any" && (
                    <Chip
                      label={`Date: ${dateFilter === "week" ? "This week" : dateFilter === "weekend" ? "This weekend" : "This month"}`}
                      onDelete={() => setDateFilter("any")}
                      deleteIcon={<X className="w-4 h-4" />}
                      sx={{ bgcolor: "white", border: "1px solid #6b7280" }}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-20 lg:pb-6">
              {viewMode === "events" && filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
              {viewMode === "organizations" && filteredOrganizations.map(org => (
                <OrganizationCard key={org.id} organization={org} />
              ))}
            </div>

            {currentItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No {viewMode === "events" ? "events" : "organizations"} found matching your filters.
                </p>
                <Button
                  variant="text"
                  onClick={clearFilters}
                  sx={{ mt: 2, color: "#042C53", textTransform: "none" }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />

      {/* Mobile Filter Bottom Sheet */}
      <FilterBottomSheet
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        selectedCommunities={selectedCommunities}
        selectedTypes={selectedTypes}
        selectedIndustries={selectedIndustries}
        dateFilter={dateFilter}
        onToggleCommunity={toggleCommunity}
        onToggleType={toggleType}
        onToggleIndustry={toggleIndustry}
        onDateFilterChange={setDateFilter}
        onClearAll={clearFilters}
        viewMode={viewMode}
      />
    </div>
  );
}
