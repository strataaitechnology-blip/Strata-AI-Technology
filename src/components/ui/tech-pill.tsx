"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechPillProps {
  children: ReactNode;
  className?: string;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Interactive Tech Pill / Badge Button.
 * Spring hover scaling, elevation, and glowing border highlights.
 */
export function TechPill({ children, className, active = false, onClick }: TechPillProps) {
  return (
    <m.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ type: "spring", stiffness: 450, damping: 22 }}
      suppressHydrationWarning
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer select-none",
        active
          ? "border-accent bg-accent text-accent-foreground shadow-[0_0_20px_var(--accent-soft)]"
          : "border-border-strong bg-background/90 text-foreground hover:border-accent-text hover:bg-accent-soft/30 hover:text-accent-text hover:shadow-[0_0_16px_var(--accent-soft)]",
        className
      )}
    >
      {children}
    </m.button>
  );
}
