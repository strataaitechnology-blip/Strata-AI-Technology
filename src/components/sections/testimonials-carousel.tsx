"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <div className="relative rounded-3xl border border-border bg-card p-8 shadow-panel sm:p-12">
      {/* Star rating icons */}
      <div className="flex items-center gap-1 text-amber-500 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
        ))}
      </div>

      <div aria-live="polite" className="relative min-h-[7.5rem]">
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={current.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {current.isPlaceholder ? (
              <Badge tone="warning" interactive={false} className="mb-4">
                Client Review Preview
              </Badge>
            ) : null}
            <blockquote className="max-w-2xl font-display text-lg font-medium leading-relaxed tracking-tight text-primary sm:text-xl">
              &ldquo;{current.quote}&rdquo;
            </blockquote>
          </m.figure>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border/80 pt-6">
        {/* Step indicator pills */}
        <div
          className="flex items-center gap-2"
          role="group"
          aria-label="Choose testimonial"
        >
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show testimonial ${i + 1} of ${total}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              className="flex h-6 items-center justify-center px-1 cursor-pointer"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === index
                    ? "w-8 bg-accent"
                    : "w-3 bg-border-strong hover:bg-accent-text"
                )}
              />
            </button>
          ))}
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(index - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
          >
            <ChevronLeft className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
          >
            <ChevronRight className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
