"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warning";
  className?: string;
  interactive?: boolean;
}

export function Badge({ children, tone = "neutral", className, interactive = true }: BadgeProps) {
  if (!interactive) {
    return (
      <span
        suppressHydrationWarning
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 select-none",
          tone === "neutral" && "border-border-strong bg-background/80 text-muted backdrop-blur",
          tone === "accent" && "border-accent-text/30 bg-accent-soft text-accent-text",
          tone === "warning" && "border-dashed border-border-strong bg-background/85 text-subtle backdrop-blur",
          className
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <m.span
      whileHover={{ scale: 1.06, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 22 }}
      suppressHydrationWarning
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 select-none transition-colors duration-200 cursor-default",
        tone === "neutral" && "border-border-strong bg-background/80 text-muted backdrop-blur hover:border-accent-text hover:text-accent-text hover:shadow-sm",
        tone === "accent" && "border-accent-text/30 bg-accent-soft text-accent-text hover:border-accent-text hover:bg-accent-soft/80",
        tone === "warning" && "border-dashed border-border-strong bg-background/85 text-subtle backdrop-blur hover:border-accent-text hover:text-foreground",
        className
      )}
    >
      {children}
    </m.span>
  );
}
