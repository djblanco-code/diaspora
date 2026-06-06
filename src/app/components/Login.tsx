import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const fieldSx = {
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9A6B3C",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#9A6B3C",
  },
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign in failed. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const loggedIn = await login(email, password);
      navigate(loggedIn && !loggedIn.onboarding_complete ? "/profile/edit" : "/browse");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold text-[#9A6B3C]">Diaspora</div>
          </Link>
          <p className="text-[#8A7866] mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit}>
            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-6">
                {error}
              </p>
            )}

            <Stack spacing={3} sx={{ mb: 3 }}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                sx={fieldSx}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                sx={fieldSx}
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: "#3A2A1E",
                "&:hover": { bgcolor: "#2A1C12" },
                textTransform: "none",
                py: 1.5,
                fontSize: "1rem"
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Divider sx={{ my: 3 }}>OR</Divider>

          <Button
            variant="outlined"
            fullWidth
            onClick={handleGoogle}
            sx={{
              borderColor: "#9A6B3C",
              color: "#9A6B3C",
              textTransform: "none",
              py: 1.5,
              "&:hover": {
                borderColor: "#2A1C12",
                bgcolor: "#EFE0C8"
              }
            }}
          >
            Continue with Google
          </Button>

          <p className="text-center mt-6 text-sm text-[#8A7866]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#9A6B3C] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-center mt-4 text-sm text-[#8A7866]">
          <Link to="/browse" className="hover:text-[#9A6B3C]">
            Continue browsing without an account
          </Link>
        </p>
      </div>
    </div>
  );
}
