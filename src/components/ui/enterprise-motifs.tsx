import { cn } from "@/lib/utils";

/**
 * Enterprise Engineering Motifs & Visual Instruments
 * Designed for a high-tier corporate technology identity.
 */

export function StatusBeacon({
  status = "ONLINE",
  className,
}: {
  status?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="beacon-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span>{status}</span>
    </div>
  );
}

export function TechnicalGridBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10 technical-grid opacity-60", className)}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 15%, rgb(37 99 235 / 0.07), transparent 75%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--background), transparent)",
        }}
      />
    </div>
  );
}

export function BlueprintCross({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={cn("h-3.5 w-3.5 text-muted/40 select-none", className)}
    >
      <path d="M8 0V16M0 8H16" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

