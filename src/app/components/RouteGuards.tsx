import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

function LoadingSplash() {
  return (
    <div className="min-h-screen bg-[#FBF6EE] flex items-center justify-center">
      <p className="text-[#8A7866]">Loading…</p>
    </div>
  );
}

// Requires an authenticated user; otherwise sends them to login.
export function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSplash />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return <Outlet />;
}

// Requires a user who has finished onboarding; otherwise sends them to
// complete their profile first.
export function RequireOnboarded() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSplash />;
  if (!user) return <Navigate to="/login" replace />;
  if (!user.onboarding_complete) return <Navigate to="/profile/edit" replace />;

  return <Outlet />;
}
