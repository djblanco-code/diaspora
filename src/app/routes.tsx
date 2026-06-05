import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Home from "./components/Home";
import Browse from "./components/Browse";
import CommunityPage from "./components/CommunityPage";
import EventDetail from "./components/EventDetail";
import OrganizationDetail from "./components/OrganizationDetail";
import About from "./components/About";
import SubmitEvent from "./components/SubmitEvent";
import SubmitOrg from "./components/SubmitOrg";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import { RequireAuth, RequireOnboarded } from "./components/RouteGuards";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "browse", Component: Browse },
      { path: "community/:communityId", Component: CommunityPage },
      { path: "event/:eventId", Component: EventDetail },
      { path: "organization/:organizationId", Component: OrganizationDetail },
      { path: "about", Component: About },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      // Signed-in users (onboarding allowed to be incomplete here)
      {
        Component: RequireAuth,
        children: [
          { path: "profile", Component: Profile },
          { path: "profile/edit", Component: EditProfile },
        ],
      },
      // Signed-in AND onboarded users only
      {
        Component: RequireOnboarded,
        children: [
          { path: "submit", Component: SubmitEvent },
          { path: "submit-org", Component: SubmitOrg },
        ],
      },
    ],
  },
]);
