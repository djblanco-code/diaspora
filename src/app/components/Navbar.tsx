import { Link } from "react-router";
import NavActions from "./NavActions";

type Variant = "light" | "navy";

export default function Navbar({ variant = "light" }: { variant?: Variant }) {
  const isNavy = variant === "navy";

  const linkClass = isNavy
    ? "hidden sm:inline text-white/90 hover:text-white transition-colors"
    : "hidden sm:inline text-gray-600 hover:text-[#042C53] transition-colors";

  return (
    <nav className="max-w-[1200px] mx-auto px-6 lg:px-20 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-block shrink-0">
          <div className={`text-2xl font-bold ${isNavy ? "text-white" : "text-[#042C53]"}`}>
            Diaspora
          </div>
          <div className={`text-xs mt-0.5 ${isNavy ? "text-white/70" : "text-gray-500"}`}>
            by Techqueria NYC
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/browse" className={linkClass}>
            Browse
          </Link>
          <Link to="/browse" className={linkClass}>
            Communities
          </Link>
          <Link to="/about" className={linkClass}>
            About
          </Link>
          <NavActions variant={variant} />
        </div>
      </div>
    </nav>
  );
}
