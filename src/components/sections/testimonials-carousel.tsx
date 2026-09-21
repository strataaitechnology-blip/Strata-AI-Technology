"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TiltCard } from "@/components/animations/tilt-card";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const go = (next: number) => setIndex((next + total) % total);
  const controlClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-foreground transition-colors hover:border-accent-text hover:text-accent-text cursor-pointer";

  return (
    <TiltCard className="p-8 sm:p-12 lg:p-16 shadow-panel" maxDegree={7}>
      <Quote className="absolute right-8 top-8 h-16 w-16 text-accent-text/10 sm:h-24 sm:w-24 pointer-events-none" strokeWidth={1.25} aria-hidden="true" />

      <div aria-live="polite" className="relative min-h-[15rem]">
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={current.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {current.isPlaceholder ? <Badge tone="warning">Placeholder testimonial</Badge> : null}
            <blockquote className="mt-5 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              {current.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-border-strong bg-surface text-sm font-semibold text-subtle">
                {current.author.charAt(0)}
              </span>
              <span>
                <span className="block font-medium text-foreground">{current.author}</span>
                <span className="block text-sm text-muted">
                  {current.role}, {current.company}
                </span>
              </span>
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="group" aria-label="Choose testimonial">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${total}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="flex h-6 items-center justify-center px-1 cursor-pointer"
            >
              <span className={cn("block h-1.5 rounded-full transition-all duration-300", i === index ? "w-8 bg-accent" : "w-3 bg-border-strong hover:bg-accent-text")} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Previous testimonial" onClick={() => go(index - 1)} className={controlClass}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" aria-label="Next testimonial" onClick={() => go(index + 1)} className={controlClass}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </TiltCard>
  );
}
