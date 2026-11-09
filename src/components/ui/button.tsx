"use client";

import Link from "next/link";
import { m, type HTMLMotionProps } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "accent" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  /** Primary CTA — Vibrant tech blue, crisp corporate look */
  primary:
    "rounded-lg bg-accent text-accent-foreground font-semibold shadow-sm hover:bg-accent-hover hover:shadow-md active:scale-[0.98]",
  /** Accent — High-visibility primary action */
  accent:
    "rounded-lg bg-accent text-accent-foreground font-semibold shadow-sm hover:bg-accent-hover hover:shadow-md active:scale-[0.98]",
  /** Outlined — secondary actions with refined hover border and subtle tint */
  secondary:
    "rounded-lg border border-border-strong bg-background/80 text-foreground font-medium hover:border-accent hover:text-accent-text hover:bg-accent-soft/40 active:scale-[0.98]",
  /** Ghost — minimal tertiary actions */
  ghost:
    "rounded-lg text-foreground font-medium hover:bg-surface-strong active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-11 px-6 text-[0.9rem] tracking-wide",
};

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: StyleOptions = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

const MotionLink = m.create(Link);

type LinkPropsClean = Omit<
  ComponentProps<typeof Link>,
  "className" | "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
>;

interface ButtonLinkProps extends LinkPropsClean, StyleOptions {
  children: ReactNode;
}

/** A Next.js <Link> that looks like a button with restrained hover transition. */
export function ButtonLink({
  variant,
  size,
  className,
  children,
  onClick,
  ...props
}: ButtonLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) return;
    }

    const href = typeof props.href === "string" ? props.href : "";
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/" &&
      (href.startsWith("/#") || href.startsWith("#"))
    ) {
      e.preventDefault();
      const id = href.replace(/^\/?#/, "");
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
      } else {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", `#${id}`);
        }
      }
    }
  }

  return (
    <MotionLink
      className={buttonStyles({ variant, size, className })}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onClick={handleClick}
      {...props}
    >
      {children}
    </MotionLink>
  );
}

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "variant" | "size">,
    StyleOptions {}

/** A real <button> with restrained spring feedback. */
export function Button({
  variant,
  size,
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <m.button
      type={type}
      className={buttonStyles({ variant, size, className })}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </m.button>
  );
}
