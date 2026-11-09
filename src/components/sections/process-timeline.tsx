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
      {/* md and up: interactive tab timeline */}
      <div className="hidden md:block">
        <div
          ref={listRef}
          role="tablist"
          aria-label="Project process"
          className="relative grid grid-cols-6"
        >
          {/* Track: light track, vibrant blue progress */}
          <span
            aria-hidden="true"
            className="absolute left-[8.333%] right-[8.333%] top-[1.25rem] h-0.5 bg-border"
          />
          <m.span
            aria-hidden="true"
            className="absolute left-[8.333%] right-[8.333%] top-[1.25rem] h-0.5 origin-left bg-accent"
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
                className="group relative flex flex-col items-center gap-3 pb-2 text-center cursor-pointer"
              >
                {/* Step circle: tech blue active, passed, or pending */}
                <span
                  className={cn(
                    "relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-300",
                    selected
                      ? "border-2 border-accent bg-accent text-white shadow-md ring-4 ring-accent/20 scale-110"
                      : passed
                        ? "border-2 border-accent bg-accent-soft text-accent-text"
                        : "border-2 border-border bg-card text-muted group-hover:border-accent group-hover:text-accent"
                  )}
                >
                  {item.step}
                </span>
                <span
                  className={cn(
                    "text-xs font-bold tracking-tight transition-colors",
                    selected
                      ? "text-primary font-bold"
                      : "text-muted group-hover:text-foreground"
                  )}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-12 min-h-[10rem]">
          <div
            id="process-panel"
            role="tabpanel"
            aria-labelledby={`process-tab-${step.id}`}
            tabIndex={0}
            className="rounded-2xl border border-border bg-card p-8 shadow-panel outline-none lg:p-10"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={step.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-start gap-6 lg:gap-8"
              >
                {/* Large step number watermark */}
                <span
                  className="font-mono text-5xl font-extrabold leading-none tracking-tighter text-accent/25 select-none lg:text-7xl"
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <div className="pt-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <ActiveIcon
                        className="h-5 w-5"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">{step.description}</p>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Below md: vertical timeline */}
      <ol className="relative md:hidden space-y-6">
        <m.span
          aria-hidden="true"
          className="absolute bottom-3 left-[1.25rem] top-3 w-0.5 origin-top bg-accent/40"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {processSteps.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="relative flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm">
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-accent-soft font-mono text-xs font-bold text-accent-text">
                {item.step}
              </span>
              <div className="pt-0.5">
                <h3 className="flex items-center gap-2 text-base font-bold text-primary">
                  {item.title}
                  <Icon
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
