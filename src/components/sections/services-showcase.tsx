"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceVisual } from "@/components/ui/service-visuals";
import { services } from "@/data/services";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-panel sm:p-8">
      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <ServiceVisual id={service.visual} />
      </div>
      <h3 className="mt-6 text-xl font-bold text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>

      {service.tools && service.tools.length > 0 ? (
        <div className="mt-6 border-t border-border pt-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-text mb-3">
            What We Deliver
          </p>
          <ul className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
            {service.tools.map((tool) => (
              <li key={tool.name} className="flex flex-col gap-0.5 rounded-lg border border-border/60 bg-surface/60 p-2.5">
                <span className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Check
                    className="h-3.5 w-3.5 shrink-0 text-accent"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  {tool.name}
                </span>
                <p className="pl-5.5 text-[0.72rem] leading-relaxed text-muted">
                  {tool.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-6 border-t border-border pt-5">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-text mb-3">
            What You Get
          </p>
          <ul className="grid gap-x-4 gap-y-2.5 sm:grid-cols-2">
            {service.capabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-2.5 text-xs text-muted">
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span>{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-7 pt-4 border-t border-border">
        <Link
          href="/#contact"
          onClick={(e) => {
            if (typeof window !== "undefined" && window.location.pathname === "/") {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              window.history.replaceState(null, "", "#contact");
            }
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-accent-text underline-offset-4 transition-colors hover:text-accent hover:underline cursor-pointer"
        >
          <span>Discuss {service.title} with Our Team</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function ServicesShowcase() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1.3fr] lg:gap-12">
      {/* Service selection list */}
      <ul className="space-y-3">
        {services.map((service) => {
          const isActive = service.id === activeId;
          const Icon = service.icon;
          return (
            <li key={service.id}>
              <button
                type="button"
                id={`service-trigger-${service.id}`}
                aria-expanded={isActive}
                aria-controls={`service-panel-${service.id}`}
                onClick={() => setActiveId(service.id)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActiveId(service.id);
                }}
                className={cn(
                  "group relative flex w-full items-center gap-4 rounded-xl border p-4 sm:p-5 text-left transition-all duration-200 cursor-pointer",
                  isActive
                    ? "border-accent bg-accent-soft/20 shadow-md ring-1 ring-accent/30"
                    : "border-border bg-card/60 hover:border-accent/40 hover:bg-card"
                )}
              >
                {/* Circular tech icon badge (directly inspired by reference screenshot 4) */}
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200",
                    isActive
                      ? "bg-accent text-white shadow-sm ring-4 ring-accent/20"
                      : "bg-surface text-muted group-hover:text-accent group-hover:bg-accent-soft"
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-base sm:text-lg font-bold leading-tight tracking-tight transition-colors duration-200",
                        isActive ? "text-foreground" : "text-foreground/90 group-hover:text-foreground"
                      )}
                    >
                      {service.title}
                    </span>
                    {service.featured ? <Badge tone="accent">Featured</Badge> : null}
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs text-muted">
                    {service.summary}
                  </p>
                </div>

                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted transition-transform duration-300 lg:hidden",
                    isActive && "rotate-180"
                  )}
                />
              </button>

              <AnimatePresence initial={false}>
                {isActive ? (
                  <m.div
                    id={`service-panel-${service.id}`}
                    role="region"
                    aria-labelledby={`service-trigger-${service.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="overflow-hidden lg:hidden pt-3"
                  >
                    <ServiceDetail service={service} />
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Desktop sticky preview panel */}
      <div className="hidden lg:block">
        <div aria-live="polite" className="sticky top-28">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ServiceDetail service={active} />
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
