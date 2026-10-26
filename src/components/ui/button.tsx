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
  /** Deep Navy — principal CTA, nav CTAs */
  primary:
    "rounded-md bg-primary text-primary-foreground hover:bg-primary-hover active:scale-[0.98]",
  /** Teal — high-priority action where visual distinction matters */
  accent:
    "rounded-md bg-accent text-accent-foreground hover:bg-accent-hover active:scale-[0.98]",
  /** Outlined — secondary actions */
  secondary:
    "rounded-md border border-border-strong bg-transparent text-foreground hover:border-primary hover:text-primary active:scale-[0.98]",
  /** Ghost — minimal tertiary actions */
  ghost:
    "rounded-md text-foreground hover:bg-surface-strong active:scale-[0.98]",
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
  ...props
}: ButtonLinkProps) {
  return (
    <MotionLink
      className={buttonStyles({ variant, size, className })}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
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
