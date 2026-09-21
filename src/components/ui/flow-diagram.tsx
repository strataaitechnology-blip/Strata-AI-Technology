import { Fragment } from "react";
import type { CSSProperties } from "react";
import type { FlowStep } from "@/types";
import { cn } from "@/lib/utils";

interface FlowDiagramProps {
  steps: FlowStep[];
  /** "compact" = icon + label (used in previews). "large" = with descriptions. */
  variant?: "compact" | "large";
  /** Fill the first node (the AI Agent) to make it the focal point. */
  emphasizeFirst?: boolean;
  label: string;
  className?: string;
}

/**
 * A conceptual, animated flow such as
 *   AI Agent → Tools → Data → Actions → Results.
 * "large" stacks vertically below the md breakpoint.
 */
export function FlowDiagram({ steps, variant = "large", emphasizeFirst = false, label, className }: FlowDiagramProps) {
  const large = variant === "large";

  return (
    <ol aria-label={label} className={cn("flex", large ? "flow-stack flex-col md:flex-row md:items-start" : "items-start", className)}>
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === steps.length - 1;
        const focal = emphasizeFirst && index === 0;
        const style = { "--flow-delay": `${index * 0.55}s` } as CSSProperties;

        return (
          <Fragment key={step.label}>
            <li
              className={cn(
                large
                  ? "flex flex-col md:flex-row md:items-start md:flex-1 md:last:flex-none"
                  : "flex flex-1 items-start last:flex-none"
              )}
            >
              <div
                className={cn(
                  "flex",
                  large
                    ? "items-start gap-4 md:w-[6.25rem] md:flex-col md:items-center md:gap-3 md:text-center"
                    : "w-14 shrink-0 flex-col items-center gap-2 text-center"
                )}
              >
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-full border transition-colors",
                    large ? "h-11 w-11" : "h-10 w-10",
                    focal
                      ? "border-accent bg-accent text-accent-foreground shadow-[0_0_28px_var(--glow)]"
                      : "border-border-strong bg-card text-accent-text"
                  )}
                >
                  <Icon className={large ? "h-5 w-5" : "h-[1.05rem] w-[1.05rem]"} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block font-medium leading-tight text-foreground",
                      large ? "text-[0.95rem]" : "text-[11px]"
                    )}
                  >
                    {step.label}
                  </span>
                  {large ? (
                    <span className="mt-1 block text-[0.8rem] leading-snug text-muted">{step.description}</span>
                  ) : null}
                </span>
              </div>

              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn("flow-line", large ? "md:-mx-5 md:mt-[1.375rem]" : "mt-5")}
                  style={style}
                />
              ) : null}
            </li>
          </Fragment>
        );
      })}
    </ol>
  );
}
