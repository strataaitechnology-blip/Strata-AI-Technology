"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { solutionStages, solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

export function SolutionsExplorer() {
  const [activeId, setActiveId] = useState(solutions[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const active = solutions.find((s) => s.id === activeId) ?? solutions[0];
  const ActiveIcon = active.icon;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = solutions.length - 1;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    setActiveId(solutions[next].id);
    listRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
      {/* Vertical tab list — teal left border on active */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Solution areas"
        aria-orientation="vertical"
        className="-mx-5 flex snap-x gap-1 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l-2 lg:border-border lg:px-0 lg:pb-0"
      >
        {solutions.map((solution, index) => {
          const selected = solution.id === activeId;
          const Icon = solution.icon;
          return (
            <button
              key={solution.id}
              type="button"
              role="tab"
              id={`solution-tab-${solution.id}`}
              aria-selected={selected}
              aria-controls="solution-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(solution.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "relative flex shrink-0 snap-start items-center gap-2.5 border px-3.5 py-2 text-left text-sm font-medium transition-colors duration-200",
                "lg:-ml-[2px] lg:border-0 lg:border-l-2 lg:px-5 lg:py-4 lg:text-base",
                selected
                  ? "border-accent bg-accent-soft text-primary lg:border-accent"
                  : "border-border-strong text-muted hover:text-primary lg:border-transparent"
              )}
            >
              <Icon
                className={cn(
                  "hidden h-4 w-4 shrink-0 lg:block",
                  selected ? "text-accent" : "text-subtle"
                )}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {solution.title}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      <div
        id="solution-panel"
        role="tabpanel"
        aria-labelledby={`solution-tab-${active.id}`}
        tabIndex={0}
        className="min-w-0 outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent-soft text-accent-text">
                <ActiveIcon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-primary sm:text-2xl">
                  {active.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">
                  {active.summary}
                </p>
              </div>
            </div>

            <ol className="relative mt-10 grid gap-8 lg:grid-cols-5 lg:gap-4">
              <span
                aria-hidden="true"
                className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px bg-border lg:left-0 lg:right-0 lg:top-[0.6rem] lg:h-px lg:w-auto"
              />
              <m.span
                aria-hidden="true"
                initial={{ scaleX: 0, scaleY: 0 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-accent lg:left-0 lg:right-0 lg:top-[0.6rem] lg:h-px lg:w-auto lg:origin-left"
              />
              {solutionStages.map((stage, i) => {
                const isImpact = i === solutionStages.length - 1;
                return (
                  <li key={stage.id} className="relative pl-9 lg:pl-0 lg:pt-9">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0.5 h-[1.2rem] w-[1.2rem] border-2 lg:top-0",
                        isImpact
                          ? "border-accent bg-accent"
                          : "border-accent bg-background"
                      )}
                    />
                    <p className="text-sm font-semibold text-primary">
                      {stage.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {active.stages[stage.id]}
                    </p>
                  </li>
                );
              })}
            </ol>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
