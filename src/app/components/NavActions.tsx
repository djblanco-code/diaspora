import { Link } from "react-router";
import Button from "@mui/material/Button";
import { useAuth } from "../context/AuthContext";

type Variant = "light" | "navy";

export default function NavActions({ variant = "light" }: { variant?: Variant }) {
  const { user } = useAuth();
  const isNavy = variant === "navy";

  const outlinedSx = isNavy
    ? {
        borderColor: "white",
        color: "white",
        textTransform: "none",
        "&:hover": { borderColor: "white", bgcolor: "rgba(255, 255, 255, 0.1)" },
      }
    : {
        borderColor: "#9A6B3C",
        color: "#9A6B3C",
        textTransform: "none",
        "&:hover": { borderColor: "#2A1C12", bgcolor: "#EFE0C8" },
      };

  const containedSx = isNavy
    ? {
        bgcolor: "white",
        color: "#9A6B3C",
        textTransform: "none",
        "&:hover": { bgcolor: "#F1E7D6" },
      }
    : {
        bgcolor: "#3A2A1E",
        color: "white",
        textTransform: "none",
        "&:hover": { bgcolor: "#2A1C12" },
      };

  if (!user) {
    return (
      <Link to="/login">
        <Button variant="contained" sx={containedSx}>
          Log In
        </Button>
      </Link>
    );
  }

  return (
    <>
      <Link to="/submit">
        <Button variant="outlined" sx={outlinedSx}>
          Add Event
        </Button>
      </Link>
      <Link to="/submit-org">
        <Button variant="outlined" sx={outlinedSx}>
          Add Org
        </Button>
      </Link>
      {user.is_admin && (
        <Link to="/admin">
          <Button variant="outlined" sx={outlinedSx}>
            Review
          </Button>
        </Link>
      )}
      <Link to="/profile">
        <Button variant="contained" sx={containedSx}>
          Profile
        </Button>
      </Link>
    </>
  );
}
