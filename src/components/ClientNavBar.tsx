"use client";

import dynamic from "next/dynamic";

// Dynamically import NavBar with no SSR to prevent hydration issues
const NavBar = dynamic(() => import("./NavBar"), {
  ssr: false,
});

export default function ClientNavBar() {
  return <NavBar />;
}
