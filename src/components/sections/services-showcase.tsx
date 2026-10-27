"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ServiceVisual } from "@/components/ui/service-visuals";
import { services } from "@/data/services";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div>
      <ServiceVisual id={service.visual} />
      <h3 className="mt-6 text-lg font-semibold text-primary">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{service.summary}</p>
      {service.tools && service.tools.length > 0 ? (
        <ul className="mt-5 grid gap-x-4 gap-y-3 sm:grid-cols-2">
          {service.tools.map((tool) => (
            <li key={tool.name} className="flex flex-col gap-0.5">
              <span className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Check
                  className="h-3 w-3 shrink-0 text-accent"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                {tool.name}
              </span>
              <p className="pl-5 text-[0.7rem] leading-relaxed text-muted">
                {tool.description}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {service.capabilities.map((capability) => (
            <li key={capability} className="flex items-start gap-2.5 text-xs text-muted">
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              {capability}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={`/contact?service=${service.id}`}
        className="mt-6 inline-block text-xs font-semibold text-accent-text underline-offset-4 transition-colors hover:text-primary hover:underline"
      >
        Discuss {service.title}
      </Link>
    </div>
  );
}

export function ServicesShowcase() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <ul className="border-t border-border">
        {services.map((service) => {
          const isActive = service.id === activeId;
          const Icon = service.icon;
          return (
            <li key={service.id} className="border-b border-border">
              <h3 className="m-0">
                <button
                  type="button"
                  id={`service-trigger-${service.id}`}
                  aria-expanded={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  onClick={() => setActiveId(service.id)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActiveId(service.id);
                  }}
                  className="group relative flex w-full items-center gap-4 py-5 text-left"
                >
                  {/* Teal left-bar for active */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-4 top-1/2 h-6 w-[3px] -translate-y-1/2 origin-center bg-accent transition-transform duration-300 max-lg:hidden",
                      isActive ? "scale-y-100" : "scale-y-0"
                    )}
                  />
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-200",
                      isActive
                        ? "border-accent bg-accent text-white"
                        : "border-border-strong text-muted group-hover:border-primary group-hover:text-primary"
                    )}
                  >
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "flex-1 text-lg font-semibold leading-tight tracking-tight transition-colors duration-200",
                      isActive ? "text-primary" : "text-muted group-hover:text-primary"
                    )}
                  >
                    {service.title}
                  </span>
                  {service.featured ? <Badge tone="accent">Featured</Badge> : null}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "h-4 w-4 shrink-0 text-subtle transition-transform duration-300 lg:hidden",
                      isActive && "rotate-180"
                    )}
                  />
                </button>
              </h3>

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
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="pb-7">
                      <ServiceDetail service={service} />
                    </div>
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:block">
        <div aria-live="polite" className="sticky top-28">
          <div className="border border-border bg-surface p-6">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ServiceDetail service={active} />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
