import { Link, useLocation } from "react-router";
import { Search, Users, Info, User, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    if (path === "/browse") return location.pathname === "/browse";
    if (path === "/about") return location.pathname === "/about";
    return location.pathname.startsWith(path);
  };

  const linkClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 ${
      active ? "text-[#9A6B3C]" : "text-[#8A7866]"
    }`;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 h-16">
        <Link to="/browse" className={linkClass(isActive("/browse"))}>
          <Search className="w-5 h-5" />
          <span className="text-xs">Browse</span>
        </Link>

        <Link to="/community/black" className={linkClass(isActive("/community"))}>
          <Users className="w-5 h-5" />
          <span className="text-xs">Communities</span>
        </Link>

        <Link to="/about" className={linkClass(isActive("/about"))}>
          <Info className="w-5 h-5" />
          <span className="text-xs">About</span>
        </Link>

        {user ? (
          <Link to="/profile" className={linkClass(isActive("/profile"))}>
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        ) : (
          <Link to="/login" className={linkClass(isActive("/login"))}>
            <LogIn className="w-5 h-5" />
            <span className="text-xs">Log In</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
