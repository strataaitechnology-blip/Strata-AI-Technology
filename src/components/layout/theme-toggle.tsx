"use client";

import { useRef, useSyncExternalStore } from "react";
import type { KeyboardEvent } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", label: "Light mode", icon: Sun },
  { value: "dark", label: "Dark mode", icon: Moon },
] as const;

const subscribeNoop = () => () => {};

interface ThemeToggleProps {
  size?: "md" | "lg";
  className?: string;
}

/**
 * Clean two-way theme control (Light / Dark) with smooth spring transitions.
 */
export function ThemeToggle({ size = "md", className }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const groupRef = useRef<HTMLDivElement>(null);

  const currentTheme = mounted ? (theme === "system" ? resolvedTheme : theme) : "light";

  function choose(value: string) {
    const root = document.documentElement;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 350);
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
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface/80 p-0.5 shadow-xs backdrop-blur-sm",
        className
      )}
    >
      {options.map(({ value, label, icon: Icon }, index) => {
        const checked = currentTheme === value;
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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className={cn(
              "relative flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer select-none",
              size === "lg" ? "h-9 w-9" : "h-7.5 w-7.5",
              checked
                ? "bg-accent text-white shadow-sm ring-1 ring-accent/30"
                : "text-muted hover:text-primary hover:bg-surface-strong/60"
            )}
          >
            <Icon
              className={size === "lg" ? "h-4.5 w-4.5" : "h-3.5 w-3.5"}
              strokeWidth={2}
              aria-hidden="true"
            />
          </m.button>
        );
      })}
    </div>
  );
}
