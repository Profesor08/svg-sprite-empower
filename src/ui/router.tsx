import { AboutPage } from "ui/pages/AboutPage";
import { HelpPage } from "ui/pages/HelpPage";
import { SelectionPage } from "ui/pages/SelectionPage";
import { TemplatesPage } from "ui/pages/TemplatesPage";

export const routes = [
  {
    path: "/",
    title: "Selection",
    element: <SelectionPage />,
  },
  {
    path: "/templates",
    title: "Templates",
    element: <TemplatesPage />,
  },
  {
    path: "/help",
    title: "Help",
    element: <HelpPage />,
  },
  {
    path: "/about",
    title: "About",
    element: <AboutPage />,
  },
];
