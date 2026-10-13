import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "./pages/Home";
import OurApp from "./pages/OurApp";
import About from "./pages/About";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Root,
      children: [
        { index: true, Component: Home },
        { path: "app", Component: OurApp },
        { path: "about", Component: About },
        { path: "support", Component: Support },
        { path: "contact", Component: Contact },
        { path: "feedback", Component: Contact },
        { path: "terms", Component: Terms },
        { path: "privacy", Component: Privacy },
        { path: "*", Component: NotFound },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
