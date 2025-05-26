"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white">
        {children}
      </div>
    </ThemeProvider>
  );
}
