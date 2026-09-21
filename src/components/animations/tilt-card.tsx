"use client";

import { useRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type HTMLDivClean = Omit<
  HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
>;

interface TiltCardProps extends HTMLDivClean {
  children: ReactNode;
  className?: string;
  maxDegree?: number;
  perspective?: number;
  showSpotlight?: boolean;
}

/**
 * 3D Cursor-Tracking Card.
 * Tilts dynamically based on cursor movement (up, down, left, right) with
 * smooth spring physics and optional cursor spotlight glow.
 */
export function TiltCard({
  children,
  className,
  maxDegree = 10,
  perspective = 1000,
  showSpotlight = true,
  id,
  role,
  tabIndex,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Mouse offset ratios from -0.5 to +0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D rotation
  const rotateXSpring = useSpring(useTransform(y, [-0.5, 0.5], [maxDegree, -maxDegree]), {
    stiffness: 350,
    damping: 25,
  });
  const rotateYSpring = useSpring(useTransform(x, [-0.5, 0.5], [-maxDegree, maxDegree]), {
    stiffness: 350,
    damping: 25,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Ratios from -0.5 to +0.5
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);

    setSpotlightPos({
      x: Math.round((mouseX / rect.width) * 100),
      y: Math.round((mouseY / rect.height) * 100),
    });
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="w-full"
      suppressHydrationWarning
    >
      <m.div
        ref={cardRef}
        id={id}
        role={role}
        tabIndex={tabIndex}
        aria-labelledby={ariaLabelledBy}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border-strong bg-card transition-colors duration-300",
          className
        )}
        {...props}
      >
        {showSpotlight && isHovered && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(450px circle at ${spotlightPos.x}% ${spotlightPos.y}%, var(--accent-soft), transparent 75%)`,
            }}
          />
        )}
        <div className="relative z-0 h-full w-full">{children}</div>
      </m.div>
    </div>
  );
}
