"use client";

import Link from "next/link";
import { m, type HTMLMotionProps } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 cursor-pointer select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_28px_-12px_var(--accent)] hover:bg-accent-hover hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_16px_34px_-12px_var(--accent)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/2 before:w-1/2 before:-skew-x-12 before:bg-white/20 before:opacity-0 before:transition-[transform,opacity] before:duration-700 hover:before:translate-x-[320%] hover:before:opacity-100",
  secondary:
    "border border-border-strong bg-background text-foreground hover:border-accent-text hover:text-accent-text hover:shadow-sm",
  ghost: "text-foreground hover:bg-surface-strong",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

interface StyleOptions {
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function buttonStyles({ variant = "primary", size = "md", className }: StyleOptions = {}) {
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

/** A Next.js <Link> that looks like a button with smooth spring animations. */
export function ButtonLink({ variant, size, className, children, ...props }: ButtonLinkProps) {
  return (
    <MotionLink
      className={buttonStyles({ variant, size, className })}
      whileHover={{ scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      {...props}
    >
      {children}
    </MotionLink>
  );
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size">, StyleOptions {}

/** A real <button> with smooth spring animations on hover and tap. */
export function Button({ variant, size, className, type = "button", children, ...props }: ButtonProps) {
  return (
    <m.button
      type={type}
      className={buttonStyles({ variant, size, className })}
      whileHover={{ scale: 1.025, y: -1 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      suppressHydrationWarning
      {...props}
    >
      {children}
    </m.button>
  );
}
