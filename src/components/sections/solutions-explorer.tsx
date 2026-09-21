"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { solutionStages, solutions } from "@/data/solutions";
import { cn } from "@/lib/utils";

/**
 * Choose a solution area and see how it moves through the five stages:
 * Challenge → Strategy → Technology → Intelligence → Impact.
 */
export function SolutionsExplorer() {
  const [activeId, setActiveId] = useState(solutions[0].id);
  const listRef = useRef<HTMLDivElement>(null);
  const active = solutions.find((solution) => solution.id === activeId) ?? solutions[0];
  const ActiveIcon = active.icon;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = solutions.length - 1;
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    setActiveId(solutions[next].id);
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
      <div
        ref={listRef}
        role="tablist"
        aria-label="Solution areas"
        aria-orientation="vertical"
        className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-border lg:px-0 lg:pb-0"
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
                "relative flex shrink-0 snap-start items-center gap-3 rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-colors duration-200",
                "lg:-ml-px lg:rounded-none lg:border-0 lg:border-l-2 lg:px-5 lg:py-4 lg:text-base",
                selected
                  ? "border-accent bg-accent text-accent-foreground lg:bg-accent-soft lg:text-foreground lg:border-accent"
                  : "border-border-strong text-muted hover:text-foreground lg:border-transparent"
              )}
            >
              <Icon
                className={cn("hidden h-[1.1rem] w-[1.1rem] shrink-0 lg:block", selected ? "text-accent-text" : "text-subtle")}
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {solution.title}
            </button>
          );
        })}
      </div>

      <div id="solution-panel" role="tabpanel" aria-labelledby={`solution-tab-${active.id}`} tabIndex={0} className="min-w-0">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent-text/30 bg-accent-soft text-accent-text">
                <ActiveIcon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">{active.title}</h3>
                <p className="mt-1.5 max-w-xl text-muted">{active.summary}</p>
              </div>
            </div>

            <ol className="relative mt-10 grid gap-8 lg:grid-cols-5 lg:gap-5">
              {/* Track: a hairline with a progress line that draws on every change. */}
              <span aria-hidden="true" className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px bg-border lg:left-0 lg:right-0 lg:top-[0.6rem] lg:h-px lg:w-auto" />
              <m.span
                aria-hidden="true"
                initial={{ scaleX: 0, scaleY: 0 }}
                animate={{ scaleX: 1, scaleY: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-accent lg:left-0 lg:right-0 lg:top-[0.6rem] lg:h-px lg:w-auto lg:origin-left"
              />
              {solutionStages.map((stage, index) => {
                const isImpact = index === solutionStages.length - 1;
                return (
                  <li key={stage.id} className="relative pl-9 lg:pl-0 lg:pt-9">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute left-0 top-0.5 h-[1.3rem] w-[1.3rem] rounded-full border-2 lg:top-0",
                        isImpact ? "border-accent bg-accent" : "border-accent-text bg-background"
                      )}
                    />
                    <p className="font-display text-base font-semibold text-foreground">{stage.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{active.stages[stage.id]}</p>
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
