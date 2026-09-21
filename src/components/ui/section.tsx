"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  /** Anchor id, e.g. "services" (enables /#services deep links). */
  id?: string;
  /** id of the section's heading, for aria-labelledby. */
  labelledBy?: string;
  /** "muted" = cool mist surface, "dark" = always-navy band in both themes. */
  tone?: "default" | "muted" | "dark";
  className?: string;
  disableAnimation?: boolean;
  showDivider?: boolean;
}

const easeOutCubic = [0.22, 1, 0.36, 1] as const;

export function Section({
  children,
  id,
  labelledBy,
  tone = "default",
  className,
  disableAnimation = false,
  showDivider = true,
}: SectionProps) {
  if (disableAnimation) {
    return (
      <section
        id={id}
        aria-labelledby={labelledBy}
        className={cn(
          "relative py-14 sm:py-18 lg:py-22 transition-colors duration-300",
          tone === "muted" && "bg-surface border-y border-border/40",
          tone === "dark" && "force-dark bg-navy-900 border-y border-navy-800",
          className
        )}
      >
        {showDivider ? (
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/35 to-transparent opacity-80" />
        ) : null}
        {children}
      </section>
    );
  }

  return (
    <m.section
      id={id}
      aria-labelledby={labelledBy}
      initial={{ opacity: 0, y: 36, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.65, ease: easeOutCubic }}
      className={cn(
        "relative py-14 sm:py-18 lg:py-22 transition-colors duration-300",
        tone === "muted" && "bg-surface border-y border-border/40",
        tone === "dark" && "force-dark bg-navy-900 border-y border-navy-800",
        className
      )}
    >
      {showDivider ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-80" />
      ) : null}
      {children}
    </m.section>
  );
}
