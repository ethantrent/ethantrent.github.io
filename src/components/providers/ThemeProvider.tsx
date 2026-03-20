"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Wraps the app so `next-themes` can toggle `class="dark"` on `<html>`.
 * Default is dark per portfolio spec; users can switch to light.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
