"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  /**
   * "default"  = white (#FFFFFF)
   * "muted"    = alt surface (#F5F7FA)
   * "dark"     = always-navy band (force-dark class)
   */
  tone?: "default" | "muted" | "dark";
  className?: string;
  disableAnimation?: boolean;
}

const easeOutCubic = [0.22, 1, 0.36, 1] as const;

export function Section({
  children,
  id,
  labelledBy,
  tone = "default",
  className,
  disableAnimation = false,
}: SectionProps) {
  const base = cn(
    "relative py-16 sm:py-20 lg:py-24 transition-colors duration-300",
    tone === "muted" && "bg-surface",
    tone === "dark" && "force-dark",
    className
  );

  if (disableAnimation) {
    return (
      <section id={id} aria-labelledby={labelledBy} className={base}>
        {children}
      </section>
    );
  }

  return (
    <m.section
      id={id}
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.07 }}
      transition={{ duration: 0.5, ease: easeOutCubic }}
      className={base}
    >
      {children}
    </m.section>
  );
}
