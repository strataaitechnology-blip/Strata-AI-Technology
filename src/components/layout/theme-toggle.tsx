"use client";

import { useRef, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "system", label: "System theme", icon: Monitor },
  { value: "dark", label: "Dark theme", icon: Moon },
] as const;

const subscribeNoop = () => () => {};

interface ThemeToggleProps {
  size?: "md" | "lg";
  className?: string;
}

/**
 * Three-way theme control (Light / System / Dark) built as an accessible radio
 * group. The selected state is only rendered after mount, because the stored
 * preference is unknown on the server.
 */
export function ThemeToggle({ size = "md", className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const groupRef = useRef<HTMLDivElement>(null);

  function choose(value: string) {
    const root = document.documentElement;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Enables a one-off smooth cross-fade of colors (see globals.css).
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 400);
    }
    setTheme(value);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = options.length - 1;
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    choose(options[next].value);
    groupRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus();
  }

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label="Color theme"
      className={cn("inline-flex items-center rounded-full border border-border-strong bg-background/70 p-0.5", className)}
    >
      {options.map(({ value, label, icon: Icon }, index) => {
        const checked = mounted && theme === value;
        return (
          <m.button
            key={value}
            type="button"
            role="radio"
            aria-checked={checked}
            aria-label={label}
            title={label}
            tabIndex={!mounted || checked ? 0 : -1}
            onClick={() => choose(value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className={cn(
              "relative flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer select-none",
              size === "lg" ? "h-10 w-10" : "h-8 w-8",
              checked
                ? "bg-accent text-accent-foreground shadow-sm"
                : "text-muted hover:bg-surface-strong hover:text-foreground"
            )}
          >
            <Icon className={size === "lg" ? "h-[1.1rem] w-[1.1rem]" : "h-4 w-4"} strokeWidth={1.9} aria-hidden="true" />
          </m.button>
        );
      })}
    </div>
  );
}
