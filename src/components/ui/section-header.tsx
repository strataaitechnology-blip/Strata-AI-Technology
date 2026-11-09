import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  id: string;
  /** Short uppercase eyebrow label above the heading. */
  eyebrow?: string;
  /** Legacy prop alias — maps to eyebrow. */
  badge?: string;
  title: ReactNode;
  description?: string;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  id,
  eyebrow,
  badge,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  className,
  children,
}: SectionHeaderProps) {
  const label = eyebrow ?? badge;

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label ? (
        <p
          className={cn(
            "mb-4 text-xs font-semibold tracking-[0.14em] uppercase text-accent-text",
            align === "center" && "text-center"
          )}
        >
          {label}
        </p>
      ) : null}
      <Heading
        id={id}
        className="text-[clamp(1.85rem,4vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-primary"
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-[1.05rem]">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
