import Link from "next/link";
import { cn } from "@/lib/utils";

/** The STRATA mark: three stacked layers. Colors come from theme tokens. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("h-8 w-8 shrink-0", className)}>
      <path d="M16 3.5 29 10.5 16 17.5 3 10.5 16 3.5Z" fill="var(--accent)" />
      <path
        d="M3 16 16 23 29 16"
        stroke="var(--accent-text)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M3 21.5 16 28.5 29 21.5"
        stroke="var(--accent-text)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Hide the "Technologies" part of the wordmark on the smallest screens. */
  compact?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function Logo({ className, compact = true, onClick }: LogoProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(e);
      return;
    }
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const hero = document.getElementById("hero");
      if (hero) {
        hero.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      window.history.pushState(null, "", "/");
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label="STRATA Technologies — home"
      className={cn("group inline-flex items-center gap-2.5 rounded-md", className)}
    >
      <LogoMark className="transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="font-display text-[1.05rem] leading-none tracking-tight text-foreground">
        <span className="font-semibold tracking-[0.04em]">STRATA</span>
        <span className={cn("ml-1.5 font-normal text-muted", compact && "hidden sm:inline")}>Technologies</span>
      </span>
    </Link>
  );
}
