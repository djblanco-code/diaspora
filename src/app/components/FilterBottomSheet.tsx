import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { X } from "lucide-react";
import { communities, eventTypes, industries } from "../data/events";
import { organizationTypes } from "../data/organizations";

type DateFilter = "any" | "week" | "weekend" | "month";
type ViewMode = "events" | "organizations";

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  selectedCommunities: string[];
  selectedTypes: string[];
  selectedIndustries: string[];
  dateFilter: DateFilter;
  onToggleCommunity: (community: string) => void;
  onToggleType: (type: string) => void;
  onToggleIndustry: (industry: string) => void;
  onDateFilterChange: (filter: DateFilter) => void;
  onClearAll: () => void;
  viewMode: ViewMode;
}

export default function FilterBottomSheet({
  open,
  onClose,
  selectedCommunities,
  selectedTypes,
  selectedIndustries,
  dateFilter,
  onToggleCommunity,
  onToggleType,
  onToggleIndustry,
  onDateFilterChange,
  onClearAll,
  viewMode
}: FilterBottomSheetProps) {
  const currentTypes = viewMode === "events" ? eventTypes : organizationTypes;
  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: "85vh"
        }
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button onClick={onClose} className="p-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-6 mb-6 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="font-semibold mb-3">Diasporas</h3>
            {communities.map(community => (
              <FormControlLabel
                key={community.id}
                control={
                  <Checkbox
                    checked={selectedCommunities.includes(community.name)}
                    onChange={() => onToggleCommunity(community.name)}
                    sx={{
                      color: "#042C53",
                      "&.Mui-checked": { color: "#042C53" }
                    }}
                  />
                }
                label={community.name}
                sx={{ display: "block", mb: 0.5 }}
              />
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3">{viewMode === "events" ? "Event type" : "Focus areas"}</h3>
            {currentTypes.map(type => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selectedTypes.includes(type)}
                    onChange={() => onToggleType(type)}
                    sx={{
                      color: "#042C53",
                      "&.Mui-checked": { color: "#042C53" }
                    }}
                  />
                }
                label={type}
                sx={{ display: "block", mb: 0.5 }}
              />
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Industry</h3>
            {industries.map(industry => (
              <FormControlLabel
                key={industry}
                control={
                  <Checkbox
                    checked={selectedIndustries.includes(industry)}
                    onChange={() => onToggleIndustry(industry)}
                    sx={{
                      color: "#042C53",
                      "&.Mui-checked": { color: "#042C53" }
                    }}
                  />
                }
                label={industry}
                sx={{ display: "block", mb: 0.5 }}
              />
            ))}
          </div>

          {viewMode === "events" && (
            <div>
              <h3 className="font-semibold mb-3">Date</h3>
              <RadioGroup value={dateFilter} onChange={e => onDateFilterChange(e.target.value as DateFilter)}>
                <FormControlLabel
                  value="week"
                  control={<Radio sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />}
                  label="This week"
                />
                <FormControlLabel
                  value="weekend"
                  control={<Radio sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />}
                  label="This weekend"
                />
                <FormControlLabel
                  value="month"
                  control={<Radio sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />}
                  label="This month"
                />
                <FormControlLabel
                  value="any"
                  control={<Radio sx={{ color: "#042C53", "&.Mui-checked": { color: "#042C53" } }} />}
                  label="Any"
                />
              </RadioGroup>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-gray-200 pt-4">
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              onClearAll();
              onClose();
            }}
            sx={{
              borderColor: "#042C53",
              color: "#042C53",
              textTransform: "none",
              py: 1.5
            }}
          >
            Clear all
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={onClose}
            sx={{
              bgcolor: "#042C53",
              "&:hover": { bgcolor: "#031d35" },
              textTransform: "none",
              py: 1.5
            }}
          >
            Apply filters
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
