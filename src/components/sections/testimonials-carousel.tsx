"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[index];

  const go = (next: number) => setIndex((next + total) % total);

  return (
    /* Teal left-border accent on the pull-quote block */
    <div className="relative border-l-2 border-accent pl-8 sm:pl-12">
      {/* Opening quote mark in teal */}
      <p
        aria-hidden="true"
        className="mb-6 font-display text-5xl font-semibold leading-none text-accent/40 select-none"
      >
        &ldquo;
      </p>

      <div aria-live="polite" className="relative min-h-[14rem]">
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
                Placeholder testimonial
              </Badge>
            ) : null}
            <blockquote className="max-w-3xl font-display text-xl font-medium leading-snug tracking-tight text-primary sm:text-2xl">
              {current.quote}
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              {/* Navy initial avatar */}
              <span
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary text-sm font-semibold text-primary-foreground"
              >
                {current.author.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-medium text-primary">
                  {current.author}
                </span>
                <span className="block text-xs text-muted">
                  {current.role}, {current.company}
                </span>
              </span>
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center gap-4">
        {/* Teal active indicator, grey for inactive */}
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
              className="flex h-5 items-center justify-center px-0.5 cursor-pointer"
            >
              <span
                className={cn(
                  "block h-px transition-all duration-300",
                  i === index
                    ? "w-8 bg-accent"
                    : "w-4 bg-border-strong hover:bg-accent-text"
                )}
              />
            </button>
          ))}
        </div>

        {/* Navigation arrows — navy hover */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(index - 1)}
            className="flex h-9 w-9 items-center justify-center border border-border-strong text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(index + 1)}
            className="flex h-9 w-9 items-center justify-center border border-border-strong text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
