// navStatusLinks.tsx
import { CircleHelpIcon, CircleIcon, CircleCheckIcon } from "lucide-react";

const iconsContent = {
  title: "With Icon",
  items: [
    { title: "Backlog", href: "#", icon: <CircleHelpIcon /> },
    { title: "To Do", href: "#", icon: <CircleIcon /> },
    { title: "Done", href: "#", icon: <CircleCheckIcon /> },
  ],
};

export default iconsContent;
