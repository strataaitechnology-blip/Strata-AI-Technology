"use client";

import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  AppWindow,
  Bot,
  CheckCircle2,
  Clock,
  Cloud,
  Database,
  Lock,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SolutionTab = "software" | "ai" | "cloud";

export function HeroVisual({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<SolutionTab>("software");

  return (
    <div
      aria-label="STRATA Technologies Interactive Platform Showcase"
      className={cn("relative mx-auto w-full max-w-[42rem] select-none", className)}
    >
      {/* Soft ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-tr from-accent/15 via-accent/5 to-transparent blur-2xl"
      />

      {/* Main Container */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-panel transition-all">
        {/* Top Header Bar: Clean, minimal status */}
        <div className="flex items-center justify-between border-b border-border bg-surface/70 px-5 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="beacon-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-display text-sm font-bold tracking-tight text-primary">
              STRATA Platform
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Active &amp; Ready
          </span>
        </div>

        {/* Tab Controls: Clean and spacious */}
        <div className="flex border-b border-border bg-surface/40 p-1.5 text-xs font-semibold sm:text-sm">
          {[
            { id: "software", label: "Custom Software", icon: AppWindow },
            { id: "ai", label: "AI & Automation", icon: Bot },
            { id: "cloud", label: "Cloud & Security", icon: Cloud },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as SolutionTab)}
                className={cn(
                  "relative flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-center transition-all cursor-pointer",
                  active
                    ? "bg-card text-accent font-bold shadow-xs border border-border"
                    : "text-muted hover:text-primary hover:bg-surface-strong/60"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workspace Display Area: Spacious, un-congested layout */}
        <div className="p-6 sm:p-7">
          <AnimatePresence mode="wait">
            {activeTab === "software" && (
              <m.div
                key="software"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* 3 Core Cards with brief, clean wording */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-surface/50 p-4 transition-colors hover:border-accent/40">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Smartphone className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Web &amp; Mobile</p>
                    <p className="mt-1 text-xs text-muted">
                      Tailored for iOS, Android &amp; web.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-text">
                      Fast &amp; Responsive
                    </span>
                  </div>

                  <div className="rounded-xl border border-accent/40 bg-accent-soft/25 p-4 ring-1 ring-accent/20">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white shadow-xs">
                      <Workflow className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Workflows</p>
                    <p className="mt-1 text-xs text-muted">
                      Automate manual daily tasks.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                      Saves Team Time
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-surface/50 p-4 transition-colors hover:border-accent/40">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Database className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Integrations</p>
                    <p className="mt-1 text-xs text-muted">
                      Connect your tools &amp; data.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Safe &amp; In Sync
                    </span>
                  </div>
                </div>

                {/* Sleek, uncluttered benefit bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-surface/40 px-4 py-3 text-xs text-muted">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    Fast Loading
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                    Tested for Quality
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    99.9% Reliable
                  </span>
                </div>
              </m.div>
            )}

            {activeTab === "ai" && (
              <m.div
                key="ai"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* 3 Clear, spacious AI Cards */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-surface/50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Bot className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Smart Assistants</p>
                    <p className="mt-1 text-xs text-muted">
                      Answers questions 24/7.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-text">
                      Instant Replies
                    </span>
                  </div>

                  <div className="rounded-xl border border-accent/40 bg-accent-soft/25 p-4 ring-1 ring-accent/20">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white shadow-xs">
                      <Zap className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Automated Work</p>
                    <p className="mt-1 text-xs text-muted">
                      Handles routine emails &amp; updates.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                      Zero Repetition
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-surface/50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">You&apos;re in Control</p>
                    <p className="mt-1 text-xs text-muted">
                      You review before sending.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      100% Safe
                    </span>
                  </div>
                </div>

                {/* Clean time-saving highlight */}
                <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface/40 px-4 py-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-muted">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>Eliminate routine daily tasks</span>
                  </div>
                  <span className="font-bold text-accent-text">Save Hours Every Week</span>
                </div>
              </m.div>
            )}

            {activeTab === "cloud" && (
              <m.div
                key="cloud"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* 3 Clear, spacious Cloud Cards */}
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-surface/50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Lock className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Data Protection</p>
                    <p className="mt-1 text-xs text-muted">
                      Your data is safe &amp; private.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Protected 24/7
                    </span>
                  </div>

                  <div className="rounded-xl border border-accent/40 bg-accent-soft/25 p-4 ring-1 ring-accent/20">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white shadow-xs">
                      <Cloud className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Always Online</p>
                    <p className="mt-1 text-xs text-muted">
                      Ready when customers visit.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
                      99.9% Uptime
                    </span>
                  </div>

                  <div className="rounded-xl border border-border bg-surface/50 p-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Clock className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Auto Backups</p>
                    <p className="mt-1 text-xs text-muted">
                      Safe copies stored daily.
                    </p>
                    <span className="mt-3 inline-block rounded-md bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent-text">
                      Easy Recovery
                    </span>
                  </div>
                </div>

                {/* Clean Cloud Guarantee */}
                <div className="flex items-center justify-between rounded-xl border border-border/80 bg-surface/40 px-4 py-3 text-xs sm:text-sm">
                  <span className="text-muted">Hosting &amp; Reliability Standard:</span>
                  <span className="font-bold text-primary">Fast, Secure &amp; Always Accessible</span>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
