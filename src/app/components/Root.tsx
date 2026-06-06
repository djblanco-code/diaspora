import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

// Pages where a signed-in but not-yet-onboarded user is allowed to stay.
const ONBOARDING_EXEMPT = ["/profile/edit", "/login", "/signup"];

export default function Root() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Required onboarding: any signed-in user who hasn't completed their profile
  // is funneled to /profile/edit, regardless of how they signed in (incl. OAuth).
  useEffect(() => {
    if (loading || !user) return;
    if (!user.onboarding_complete && !ONBOARDING_EXEMPT.includes(location.pathname)) {
      navigate("/profile/edit", { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#FBF6EE]">
      <Outlet />
    </div>
  );
}
