import { Link } from "react-router";
import NavActions from "./NavActions";

type Variant = "light" | "navy";

export default function Navbar({ variant = "light" }: { variant?: Variant }) {
  const isNavy = variant === "navy";

  const linkClass = isNavy
    ? "hidden sm:inline text-white/90 hover:text-white transition-colors"
    : "hidden sm:inline text-[#8A7866] hover:text-[#9A6B3C] transition-colors";

  return (
    <nav className="max-w-[1200px] mx-auto px-6 lg:px-20 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="inline-block shrink-0">
          <div className={`text-2xl font-bold ${isNavy ? "text-white" : "text-[#9A6B3C]"}`}>
            Diaspora
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/browse" className={linkClass}>
            Browse
          </Link>
          <Link to="/browse" className={linkClass}>
            Communities
          </Link>
          <NavActions variant={variant} />
        </div>
      </div>
    </nav>
  );
}
