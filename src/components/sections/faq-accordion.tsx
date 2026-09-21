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
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                suppressHydrationWarning
              >
                <span
                  className={cn(
                    "font-display text-lg font-medium leading-snug tracking-tight transition-colors sm:text-xl",
                    open ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
                  )}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    open
                      ? "rotate-45 border-accent bg-accent text-accent-foreground"
                      : "border-border-strong text-muted group-hover:border-accent-text group-hover:text-accent-text"
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={2} />
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
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-muted">{faq.answer}</p>
                </m.div>
              ) : null}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
