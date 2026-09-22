"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

/**
 * Next.js Template for the premium page transition system:
 * 1. Brand-Colored Curtain Reveal (sweeps out smoothly on route mount)
 * 2. Smooth Fade + 16px Slide + Blur-to-Focus for incoming page content
 * 3. Respects reduced motion preferences automatically via MotionConfig
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Brand-Colored Curtain Reveal Panel */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[999] bg-[#050b19] border-b border-accent/40 shadow-[0_8px_32px_rgba(29,92,240,0.25)]"
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Page Content: Smooth Fade + Slide + Blur-to-Focus */}
      <m.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      >
        {children}
      </m.div>
    </>
  );
}
