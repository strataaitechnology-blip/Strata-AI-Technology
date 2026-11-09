"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { solutionStages, solutions } from "@/data/solutions";
import { ButtonLink } from "@/components/ui/button";
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
    <div className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-10">
      {/* Modern Horizontal Navigation Tabs */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Solution areas"
        className="flex flex-wrap gap-2 border-b border-border pb-6"
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
                "inline-flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer",
                selected
                  ? "bg-accent text-white shadow-sm"
                  : "bg-surface text-muted hover:bg-surface-strong hover:text-foreground"
              )}
            >
              <Icon
                className={cn("h-4 w-4", selected ? "text-white" : "text-muted")}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span>{solution.title}</span>
            </button>
          );
        })}
      </div>

      {/* Solution Detail Panel */}
      <div
        id="solution-panel"
        role="tabpanel"
        aria-labelledby={`solution-tab-${active.id}`}
        tabIndex={0}
        className="mt-8 outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* Header with circular icon badge & summary */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent ring-4 ring-accent/10">
                  <ActiveIcon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-text">
                      Business Solution
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                    {active.title}
                  </h3>
                </div>
              </div>

              <ButtonLink
                href="/#contact"
                size="md"
                className="w-full sm:w-auto"
              >
                <span>Discuss This Solution</span>
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
              {active.summary}
            </p>

            {/* 5-Stage Lifecycle Road (Problem → Plan → Solution → Smart Automation → Result) */}
            <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-primary">
                  How We Solve It: Step by Step
                </h4>
              </div>

              <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {solutionStages.map((stage, i) => {
                  const isImpact = i === solutionStages.length - 1;
                  return (
                    <li
                      key={stage.id}
                      className={cn(
                        "relative flex flex-col justify-between rounded-xl border p-4 transition-all",
                        isImpact
                          ? "border-accent/40 bg-accent-soft/40 shadow-sm"
                          : "border-border bg-card"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                              isImpact
                                ? "bg-accent text-white"
                                : "bg-surface-strong text-muted"
                            )}
                          >
                            {i + 1}
                          </span>
                          {isImpact ? (
                            <Zap className="h-4 w-4 text-accent" />
                          ) : null}
                        </div>
                        <p className="mt-3 text-sm font-bold text-primary">
                          {stage.label}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-muted">
                          {active.stages[stage.id]}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Key Features Breakdown */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <h5 className="text-sm font-bold text-primary">Built for Reliability</h5>
                  <p className="mt-1 text-xs text-muted">
                    Designed to run smoothly 24/7 without crashes, interruptions, or data loss.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <h5 className="text-sm font-bold text-primary">Smart Automation</h5>
                  <p className="mt-1 text-xs text-muted">
                    Helpful tools that handle routine tasks accurately so your team can focus on customers.
                  </p>
                </div>
              </div>

              <div className="col-span-full sm:col-span-2 lg:col-span-1 flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <h5 className="text-sm font-bold text-primary">Dependable Performance</h5>
                  <p className="mt-1 text-xs text-muted">
                    Fast loading speeds, 99.9% uptime, and systems that scale easily as you grow.
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
