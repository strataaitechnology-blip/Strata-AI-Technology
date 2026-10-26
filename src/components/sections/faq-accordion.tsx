"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

/** Accessible accordion: real buttons, aria-expanded, aria-controls, regions. */
export function FaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  return (
    <ul className="border-t border-border">
      {faqs.map((faq) => {
        const open = faq.id === openId;
        return (
          <li key={faq.id} className="border-b border-border">
            <h3 className="m-0">
              <button
                type="button"
                id={`faq-trigger-${faq.id}`}
                aria-expanded={open}
                aria-controls={`faq-panel-${faq.id}`}
                onClick={() => setOpenId(open ? null : faq.id)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                suppressHydrationWarning
              >
                <span
                  className={cn(
                    "font-display text-base font-medium leading-snug tracking-tight transition-colors sm:text-lg",
                    open ? "text-primary" : "text-foreground group-hover:text-primary"
                  )}
                >
                  {faq.question}
                </span>
                {/* Plus icon: teal when open, navy outline on hover */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-200",
                    open
                      ? "rotate-45 border-accent bg-accent text-white"
                      : "border-border-strong text-muted group-hover:border-primary group-hover:text-primary"
                  )}
                >
                  <Plus className="h-3.5 w-3.5" strokeWidth={2} />
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
                  <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
