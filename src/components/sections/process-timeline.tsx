"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

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
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  }

  return (
    <>
      {/* md and up: interactive tab */}
      <div className="hidden md:block">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Project process"
          className="relative grid grid-cols-6"
        >
          {/* Track: grey base, teal progress */}
          <span
            aria-hidden="true"
            className="absolute left-[8.333%] right-[8.333%] top-[1.25rem] h-px bg-border-strong"
          />
          <m.span
            aria-hidden="true"
            className="absolute left-[8.333%] right-[8.333%] top-[1.25rem] h-px origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress }}
            transition={{ duration: 0.5, ease: "easeOut" }}
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
                className="group relative flex flex-col items-center gap-3 rounded-sm pb-2 text-center"
              >
                {/* Step circle: teal active, navy outline passed, grey pending */}
                <span
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center border-2 font-display text-sm font-semibold transition-all duration-300",
                    selected
                      ? "border-accent bg-accent text-white ring-4 ring-accent/15"
                      : passed
                        ? "border-accent bg-background text-accent-text"
                        : "border-border-strong bg-background text-muted group-hover:border-primary group-hover:text-primary"
                  )}
                >
                  {item.step}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    selected
                      ? "text-primary"
                      : "text-muted group-hover:text-primary"
                  )}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 min-h-[10rem]">
          <div
            id="process-panel"
            role="tabpanel"
            aria-labelledby={`process-tab-${step.id}`}
            tabIndex={0}
            className="border border-border bg-surface p-8 outline-none lg:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={step.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-start gap-6 lg:gap-8"
              >
                {/* Faded step number */}
                <span
                  className="font-display text-5xl font-semibold leading-none tracking-tighter text-accent/20 select-none lg:text-6xl"
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <div className="pt-1">
                  <div className="flex items-center gap-3">
                    <ActiveIcon
                      className="h-4.5 w-4.5 text-accent"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-semibold text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-xl text-muted">{step.description}</p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Below md: vertical timeline */}
      <ol className="relative md:hidden">
        <m.span
          aria-hidden="true"
          className="absolute bottom-3 left-[1.2rem] top-3 w-px origin-top bg-accent/40"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {processSteps.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="relative flex gap-5 pb-8 last:pb-0">
              <span className="relative z-10 flex h-[2.5rem] w-[2.5rem] shrink-0 items-center justify-center border-2 border-accent bg-background font-display text-sm font-semibold text-accent-text">
                {item.step}
              </span>
              <div className="pt-1.5">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-primary">
                  {item.title}
                  <Icon
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-1.5 text-sm text-muted">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
