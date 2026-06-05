import { Link, useLocation } from "react-router";
import { Search, Users, Info } from "lucide-react";

export default function MobileBottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/browse") return location.pathname === "/browse";
    if (path === "/about") return location.pathname === "/about";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-3 h-16">
        <Link
          to="/browse"
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/browse") ? "text-[#042C53]" : "text-gray-500"
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="text-xs">Browse</span>
        </Link>

        <Link
          to="/community/black"
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/community") ? "text-[#042C53]" : "text-gray-500"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-xs">Communities</span>
        </Link>

        <Link
          to="/about"
          className={`flex flex-col items-center justify-center gap-1 ${
            isActive("/about") ? "text-[#042C53]" : "text-gray-500"
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-xs">About</span>
        </Link>
      </div>
    </nav>
  );
}
