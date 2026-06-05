import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";

const DUPLICATE_EMAIL_MESSAGE = "Email is already associated with an account";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmEmail, setConfirmEmail] = useState<string | null>(null);
  const { signup, loginWithGoogle } = useAuth();
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
    setConfirmEmail(null);
    try {
      const result = await signup(name, email, password);
      if (result === "confirm_email") {
        setConfirmEmail(email);
        return;
      }
      navigate("/profile/edit");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmEmail) {
    return (
      <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-[#C79A6A] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#322318] mb-2">Check your email</h2>
          <p className="text-[#8A7866] mb-2">
            We sent a confirmation link to
          </p>
          <p className="font-medium text-[#322318] mb-4">{confirmEmail}</p>
          <p className="text-sm text-[#8A7866] mb-6">
            Open the link in that email to activate your account, then come back and sign in.
          </p>
          <Link to="/login">
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#3A2A1E",
                "&:hover": { bgcolor: "#2A1C12" },
                textTransform: "none",
                py: 1.5,
              }}
            >
              Go to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold text-[#9A6B3C]">Diaspora</div>
            <div className="text-xs text-[#8A7866] mt-1">by Techqueria NYC</div>
          </Link>
          <p className="text-[#8A7866] mt-2">Create your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-10">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                <p>{error}</p>
                {error === DUPLICATE_EMAIL_MESSAGE && (
                  <p className="mt-2">
                    <Link to="/login" className="font-medium text-[#9A6B3C] hover:underline">
                      Sign in instead
                    </Link>
                  </p>
                )}
              </div>
            )}

            <TextField
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              inputProps={{ minLength: 8 }}
              helperText="At least 8 characters"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9A6B3C"
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#9A6B3C"
                }
              }}
            />

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
              {loading ? "Creating account..." : "Sign up"}
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
            Already have an account?{" "}
            <Link to="/login" className="text-[#9A6B3C] font-medium hover:underline">
              Sign in
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
