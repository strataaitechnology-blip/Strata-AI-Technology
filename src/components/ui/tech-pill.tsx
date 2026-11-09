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
        "inline-flex items-center rounded-md border border-accent/20 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent-text shadow-[0_1px_2px_rgba(37,99,235,0.04)] transition-colors hover:border-accent/40 hover:bg-accent-soft/80",
        className
      )}
    >
      {children}
    </span>
  );
}
