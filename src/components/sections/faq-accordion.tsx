"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

/** Accessible accordion with modern rounded cards and animated toggle */
export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <ul className="space-y-3.5">
      {faqs.map((faq) => {
        const open = faq.id === openId;
        return (
          <li
            key={faq.id}
            className={cn(
              "rounded-2xl border transition-all duration-200",
              open
                ? "border-accent/40 bg-card shadow-sm ring-1 ring-accent/20"
                : "border-border bg-card/60 hover:border-accent/30 hover:bg-card"
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={`faq-trigger-${faq.id}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${faq.id}`}
                onClick={() => setOpenId(open ? null : faq.id)}
                className="group flex w-full items-center justify-between gap-6 p-5 sm:p-6 text-left cursor-pointer"
                suppressHydrationWarning
              >
                <span
                  className={cn(
                    "text-base font-bold leading-snug tracking-tight transition-colors sm:text-lg",
                    open ? "text-primary font-bold" : "text-foreground group-hover:text-primary"
                  )}
                >
                  {faq.question}
                </span>
                {/* Circular toggle with rotate animation */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                    open
                      ? "rotate-45 bg-accent text-white shadow-sm ring-4 ring-accent/20"
                      : "bg-surface text-muted group-hover:text-accent group-hover:bg-accent-soft"
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.2} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <m.div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border/70 px-5 pb-6 pt-4 sm:px-6">
                    <p className="max-w-2xl text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </div>
                </m.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
