import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";
import Navbar from "./Navbar";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <Navbar />
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#042C53] mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>

        <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Diaspora</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Diaspora is a curated directory of professional development events for diaspora
              communities in New York City. We help professionals find networking, career growth,
              and skill-building opportunities across Black, Latino, Asian, South Asian, Caribbean,
              African, MENA, and Indigenous communities.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Add Your Event or Organization</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Use our submission forms to add your event or organization to Diaspora. We review all submissions and typically respond within 2-3 business days.
            </p>
            <div className="flex gap-4">
              <Link to="/submit">
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#042C53",
                    "&:hover": { bgcolor: "#031d35" },
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
                    borderColor: "#042C53",
                    color: "#042C53",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#031d35",
                      bgcolor: "#f0f4f8"
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
