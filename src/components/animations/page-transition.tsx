"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Reusable PageTransition wrapper for components and dynamic routes.
 * Combines smooth fade, 16px vertical slide, and subtle blur-to-focus transition.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}