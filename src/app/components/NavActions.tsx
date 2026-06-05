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
        borderColor: "#042C53",
        color: "#042C53",
        textTransform: "none",
        "&:hover": { borderColor: "#031d35", bgcolor: "#f0f4f8" },
      };

  const containedSx = isNavy
    ? {
        bgcolor: "white",
        color: "#042C53",
        textTransform: "none",
        "&:hover": { bgcolor: "#f9fafb" },
      }
    : {
        bgcolor: "#042C53",
        color: "white",
        textTransform: "none",
        "&:hover": { bgcolor: "#031d35" },
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
      <Link to="/profile">
        <Button variant="contained" sx={containedSx}>
          Profile
        </Button>
      </Link>
    </>
  );
}
