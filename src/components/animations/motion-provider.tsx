"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Loads Framer Motion's feature bundle lazily (smaller initial JS) and honours
 * the visitor's `prefers-reduced-motion` setting for transform animations.
 * Components use the lightweight `m.*` elements instead of `motion.*`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
