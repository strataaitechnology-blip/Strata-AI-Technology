"use client";

import { m } from "framer-motion";
import { cn } from "@/lib/utils";

interface BackgroundStickersProps {
  className?: string;
}

/**
 * Animated background design stickers inspired by modern agency & reference visual aesthetics.
 * Floats gently in the background with continuous micro-animations.
 * Fixed with pointer-events-none so it never intercepts user interactions.
 */
export function BackgroundStickers({ className }: BackgroundStickersProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none",
        className
      )}
    >
      {/* ────────────────────────────────────────────────────────────
          1. TOP-RIGHT: Rotating Diagonal Striped Circle
          (Directly inspired by the reference site hero)
          ──────────────────────────────────────────────────────────── */}
      <m.div
        className="absolute -right-8 top-20 h-40 w-40 sm:right-6 sm:top-24 sm:h-52 sm:w-52"
        animate={{
          rotate: [0, 360],
          y: [0, -10, 0],
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 32, ease: "linear" },
          y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        }}
      >
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full opacity-35 dark:opacity-20"
        >
          <defs>
            <pattern
              id="diagonal-stripes"
              patternUnits="userSpaceOnUse"
              width="14"
              height="14"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="14"
                className="stroke-accent"
                strokeWidth="4"
              />
            </pattern>
            <mask id="circle-mask">
              <circle cx="100" cy="100" r="90" fill="white" />
            </mask>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="url(#diagonal-stripes)"
            mask="url(#circle-mask)"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            className="stroke-accent/40"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </m.div>

      {/* ────────────────────────────────────────────────────────────
          2. TOP-LEFT / UPPER: Floating Wavy Zig-Zag Lines
          (Sways gently up & down)
          ──────────────────────────────────────────────────────────── */}
      <m.div
        className="absolute -left-6 top-36 h-28 w-44 sm:left-10 sm:top-48 sm:h-32 sm:w-56"
        animate={{
          y: [0, 14, 0],
          x: [0, 6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 220 100"
          fill="none"
          className="h-full w-full opacity-35 dark:opacity-20 stroke-accent"
        >
          <path
            d="M10 25 Q 35 5, 60 25 T 110 25 T 160 25 T 210 25"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M10 50 Q 35 30, 60 50 T 110 50 T 160 50 T 210 50"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M10 75 Q 35 55, 60 75 T 110 75 T 160 75 T 210 75"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </m.div>

      {/* ────────────────────────────────────────────────────────────
          3. MID-RIGHT: Concentric Signal Arc Sticker
          (Radar/ripple pulsing softly)
          ──────────────────────────────────────────────────────────── */}
      <m.div
        className="absolute -right-12 top-1/2 h-56 w-56 -translate-y-1/2 sm:right-8 sm:h-72 sm:w-72"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 260 260"
          fill="none"
          className="h-full w-full stroke-accent dark:opacity-25"
        >
          <circle cx="130" cy="130" r="120" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="130" cy="130" r="95" strokeWidth="2.5" />
          <circle cx="130" cy="130" r="70" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="130" cy="130" r="45" strokeWidth="3" />
          <circle cx="130" cy="130" r="18" className="fill-accent/20 stroke-accent" strokeWidth="2.5" />
        </svg>
      </m.div>

      {/* ────────────────────────────────────────────────────────────
          4. MID-LEFT / LOWER: Floating Dot Grid Matrix
          (4x5 dots with breathing pulse)
          ──────────────────────────────────────────────────────────── */}
      <m.div
        className="absolute left-6 top-2/3 h-28 w-28 sm:left-14 sm:h-36 sm:w-36"
        animate={{
          y: [0, -12, 0],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
      >
        <svg
          viewBox="0 0 120 150"
          className="h-full w-full fill-accent opacity-30 dark:opacity-20"
        >
          {[0, 30, 60, 90].map((x) =>
            [0, 30, 60, 90, 120].map((y) => (
              <circle key={`${x}-${y}`} cx={x + 10} cy={y + 10} r="3.5" />
            ))
          )}
        </svg>
      </m.div>

      {/* ────────────────────────────────────────────────────────────
          5. FLOATING SPARKLE / CROSS STICKERS
          ──────────────────────────────────────────────────────────── */}
      {/* Sparkle cross near top center */}
      <m.div
        className="absolute left-1/3 top-28 h-6 w-6 text-accent/50 sm:h-8 sm:w-8"
        animate={{
          rotate: [0, 180, 360],
          scale: [0.85, 1.15, 0.85],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </m.div>

      {/* Bold tech plus sticker near bottom right */}
      <m.div
        className="absolute bottom-28 right-16 h-8 w-8 text-accent/40 sm:bottom-36 sm:right-28 sm:h-10 sm:w-10"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          y: [0, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 32 32" fill="currentColor" className="h-full w-full">
          <rect x="12" y="2" width="8" height="28" rx="4" />
          <rect x="2" y="12" width="28" height="8" rx="4" />
        </svg>
      </m.div>

      {/* Modern floating badge pill sticker near bottom center-left */}
      <m.div
        className="absolute bottom-16 left-1/4 hidden rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-accent/60 backdrop-blur-xs sm:inline-block"
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: "easeInOut",
        }}
      >
        ✦ STRATA ENGINEERING
      </m.div>
    </div>
  );
}

