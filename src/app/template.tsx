import type { ReactNode } from "react";

/**
 * Instant page transition wrapper without blocking curtains or blur delay,
 * ensuring immediate 0ms page rendering across all routes.
 */
export default function Template({ children }: { children: ReactNode }) {
  return children;
}
