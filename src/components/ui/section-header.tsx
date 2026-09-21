import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** id for the heading element (used by aria-labelledby on the section). */
  id: string;
  badge?: string;
  title: string;
  description?: string;
  /** Use "h1" only for a page's primary heading. */
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}

export function SectionHeader({
  id,
  badge,
  title,
  description,
  as: Heading = "h2",
  align = "left",
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {badge ? (
        <div className="mb-3">
          <Badge tone="accent">{badge}</Badge>
        </div>
      ) : null}
      <Heading
        id={id}
        className="text-[clamp(1.95rem,4.2vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-foreground"
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
