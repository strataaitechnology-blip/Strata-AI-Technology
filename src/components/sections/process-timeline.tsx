"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { TiltCard } from "@/components/animations/tilt-card";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * Six-step timeline. From md upward it is interactive (select a step to read
 * it); on small screens it becomes a simple vertical timeline.
 */
export function ProcessTimeline() {
  const [index, setIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const step = processSteps[index];
  const ActiveIcon = step.icon;
  const progress = index / (processSteps.length - 1);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, current: number) {
    const last = processSteps.length - 1;
    let next = current;
    if (event.key === "ArrowRight") next = Math.min(current + 1, last);
    else if (event.key === "ArrowLeft") next = Math.max(current - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    setIndex(next);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <>
      {/* md and up: interactive */}
      <div className="hidden md:block">
        <div ref={listRef} role="tablist" aria-label="Project process" className="relative grid grid-cols-6">
          <span aria-hidden="true" className="absolute left-[8.333%] right-[8.333%] top-[1.375rem] h-px bg-border-strong" />
          <m.span
            aria-hidden="true"
            className="absolute left-[8.333%] right-[8.333%] top-[1.375rem] h-px origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {processSteps.map((item, i) => {
            const selected = i === index;
            const passed = i < index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`process-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="process-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={(event) => onKeyDown(event, i)}
                className="group relative flex flex-col items-center gap-3 rounded-lg pb-2 text-center"
              >
                <span
                  className={cn(
                    "relative z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 font-display text-sm font-semibold transition-all duration-300",
                    selected
                      ? "scale-110 border-accent bg-accent text-accent-foreground shadow-[0_0_0_6px_var(--accent-soft)]"
                      : passed
                        ? "border-accent bg-background text-accent-text"
                        : "border-border-strong bg-background text-muted group-hover:border-accent-text group-hover:text-accent-text"
                  )}
                >
                  {item.step}
                </span>
                <span className={cn("text-sm font-medium transition-colors", selected ? "text-foreground" : "text-muted group-hover:text-foreground")}>
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 min-h-[11rem]">
          <TiltCard
            id="process-panel"
            role="tabpanel"
            aria-labelledby={`process-tab-${step.id}`}
            tabIndex={0}
            className="p-8 shadow-panel lg:p-10"
            maxDegree={7}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={step.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-start gap-6 lg:gap-8"
              >
                <span className="font-display text-6xl font-semibold leading-none tracking-tighter text-accent-text/25 lg:text-7xl" aria-hidden="true">
                  {step.step}
                </span>
                <div className="pt-1">
                  <div className="flex items-center gap-3">
                    <ActiveIcon className="h-5 w-5 text-accent-text" strokeWidth={1.75} aria-hidden="true" />
                    <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                  </div>
                  <p className="mt-3 max-w-xl text-lg text-muted">{step.description}</p>
                </div>
              </m.div>
            </AnimatePresence>
          </TiltCard>
        </div>
      </div>

      {/* below md: vertical timeline */}
      <ol className="relative md:hidden">
        <m.span
          aria-hidden="true"
          className="absolute bottom-3 left-[1.3rem] top-3 w-px origin-top bg-accent/60"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
        {processSteps.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="relative flex gap-5 pb-9 last:pb-0">
              <span className="relative z-10 flex h-[2.65rem] w-[2.65rem] shrink-0 items-center justify-center rounded-full border-2 border-accent bg-background font-display text-sm font-semibold text-accent-text">
                {item.step}
              </span>
              <div className="pt-1.5">
                <h3 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                  {item.title}
                  <Icon className="h-4 w-4 text-accent-text" strokeWidth={1.75} aria-hidden="true" />
                </h3>
                <p className="mt-1.5 text-muted">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
