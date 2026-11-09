import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  /** "neutral" is the default label style (navy/teal palette) */
  tone?: "neutral" | "accent" | "warning" | "danger" | "success";
  interactive?: boolean;
  className?: string;
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border border-border-strong bg-surface text-muted",
  accent:  "border border-accent/30 bg-accent-soft text-accent-text",
  warning: "border border-amber-300/60 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  danger:  "border border-red-200 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  success: "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
};

export function Badge({
  children,
  tone = "neutral",
  interactive = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-md px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide uppercase leading-none",
        toneClasses[tone],
        interactive && "transition-colors hover:border-accent hover:text-accent-text",
        className
      )}
    >
      {children}
    </span>
  );
}
