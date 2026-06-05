import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FBF6EE]">
      <header className="bg-white border-b border-gray-200">
        <Navbar />
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-[#8A7866] hover:text-[#9A6B3C] mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-[#322318] mb-6">About Diaspora</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-[#4A3422] leading-relaxed mb-4">
              Diaspora is a curated directory of professional development events for diaspora
              communities in New York City. We help professionals find networking, career growth,
              and skill-building opportunities across Black, Latino, Asian, South Asian, Caribbean,
              African, MENA, and Indigenous communities.
            </p>

            <h2 className="text-xl font-semibold text-[#322318] mt-8 mb-4">Add Your Event or Organization</h2>
            <p className="text-[#4A3422] leading-relaxed mb-4">
              Use our submission forms to add your event or organization to Diaspora. We review all submissions and typically respond within 2-3 business days.
            </p>
            <div className="flex gap-4">
              <Link to="/submit">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#3A2A1E",
                    "&:hover": { bgcolor: "#2A1C12" },
                    textTransform: "none"
                  }}
                >
                  Add Event
                </Button>
              </Link>
              <Link to="/submit-org">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: "#9A6B3C",
                    color: "#9A6B3C",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#2A1C12",
                      bgcolor: "#EFE0C8"
                    }
                  }}
                >
                  Add Org
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
