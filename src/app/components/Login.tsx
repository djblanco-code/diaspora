import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const fieldSx = {
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#042C53",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#042C53",
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold text-[#042C53]">Diaspora</div>
            <div className="text-xs text-gray-500 mt-1">by Techqueria NYC</div>
          </Link>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
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
                bgcolor: "#042C53",
                "&:hover": { bgcolor: "#031d35" },
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
            Continue with Google
          </Button>

          <p className="text-center mt-6 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#042C53] font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-center mt-4 text-sm text-gray-500">
          <Link to="/browse" className="hover:text-[#042C53]">
            Continue browsing without an account
          </Link>
        </p>
      </div>
    </div>
  );
}
