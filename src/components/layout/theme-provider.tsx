"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * next-themes injects a tiny blocking script that sets the theme class on
 * <html> before first paint, so there is no flash of the wrong theme.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="strata-theme"
      disableTransitionOnChange={false}
      scriptProps={{ id: "next-themes-script" }}
    >
      {children}
    </NextThemesProvider>
  );
}
