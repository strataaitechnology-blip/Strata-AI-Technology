"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { TiltCard } from "@/components/animations/tilt-card";
import { Badge } from "@/components/ui/badge";
import { ServiceVisual } from "@/components/ui/service-visuals";
import { services } from "@/data/services";
import type { Service } from "@/types";
import { cn } from "@/lib/utils";

function ServiceDetail({ service }: { service: Service }) {
  return (
    <div>
      <ServiceVisual id={service.visual} />
      <h3 className="mt-6 text-xl font-semibold text-foreground">{service.title}</h3>
      <p className="mt-2 text-muted">{service.summary}</p>
      <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {service.capabilities.map((capability) => (
          <li key={capability} className="flex items-start gap-2.5 text-sm text-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" strokeWidth={2.25} aria-hidden="true" />
            {capability}
          </li>
        ))}
      </ul>
      <Link
        href={`/contact?service=${service.id}`}
        className="mt-6 inline-block text-sm font-medium text-accent-text underline decoration-accent-text/30 underline-offset-4 transition-colors hover:decoration-accent-text"
      >
        Discuss {service.title}
      </Link>
    </div>
  );
}

/**
 * Typographic service index. On large screens, hovering (or activating) a
 * service updates a sticky preview. On small screens the same list becomes an
 * accordion so every preview appears right under the row that opened it.
 */
export function ServicesShowcase() {
  const [activeId, setActiveId] = useState(services[0].id);
  const active = services.find((service) => service.id === activeId) ?? services[0];

  return (
    <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
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
                  className="group relative flex w-full items-center gap-4 py-5 pr-2 text-left sm:py-6"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -left-4 top-1/2 h-8 w-0.5 -translate-y-1/2 origin-center rounded-full bg-accent transition-transform duration-300 max-lg:hidden",
                      isActive ? "scale-y-100" : "scale-y-0"
                    )}
                  />
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200",
                      isActive
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border-strong bg-background text-accent-text group-hover:border-accent-text"
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span
                    className={cn(
                      "flex-1 font-display text-[1.3rem] font-semibold leading-tight tracking-tight transition-colors duration-200 sm:text-2xl",
                      isActive ? "text-foreground" : "text-muted group-hover:text-foreground"
                    )}
                  >
                    {service.title}
                  </span>
                  {service.featured ? <Badge tone="accent">Featured</Badge> : null}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "h-5 w-5 shrink-0 text-subtle transition-transform duration-300 lg:hidden",
                      isActive && "rotate-180"
                    )}
                  />
                </button>
              </h3>

              {/* Small screens: the detail opens inline (accordion). */}
              <AnimatePresence initial={false}>
                {isActive ? (
                  <m.div
                    id={`service-panel-${service.id}`}
                    role="region"
                    aria-labelledby={`service-trigger-${service.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
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

      {/* Large screens: one sticky preview that follows the selection. */}
      <div className="hidden lg:block">
        <div aria-live="polite" className="sticky top-28">
          <TiltCard className="p-6 shadow-panel" maxDegree={8}>
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
          </TiltCard>
        </div>
      </div>
    </div>
  );
}
