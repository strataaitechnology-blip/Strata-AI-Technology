import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TechPillProps {
  children: ReactNode;
  className?: string;
}

/**
 * Small tag/label for a technology name.
 * Uses a subtle teal background tint to stay on-brand.
 */
export function TechPill({ children, className }: TechPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-accent/25 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-text",
        className
      )}
    >
      {children}
    </span>
  );
}
