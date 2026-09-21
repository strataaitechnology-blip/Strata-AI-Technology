"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Keep it small — this is a supporting effect. */
  y?: number;
}

/** Fades content in once, when it scrolls into view. */
export function Reveal({ children, className, delay = 0, y = 12 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.55, delay, ease: easeOut }}
    >
      {children}
    </m.div>
  );
}

interface EnterProps extends RevealProps {
  scale?: number;
}

/** Plays immediately on mount. Used for the hero's one orchestrated entrance. */
export function Enter({ children, className, delay = 0, y = 18, scale = 1 }: EnterProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: easeOut }}
    >
      {children}
    </m.div>
  );
}
