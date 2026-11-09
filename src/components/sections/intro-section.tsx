"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { capabilities } from "@/data/capabilities";

/** Four core capabilities — modern, customer-first layout */
export function IntroSection() {
  return (
    <Section id="capabilities" labelledBy="intro-heading" tone="muted">
      <Container>
        <Reveal>
          <SectionHeader
            id="intro-heading"
            eyebrow="What We Do"
            title="Everything Your Business Needs to Work Smarter &amp; Grow."
            description="From easy-to-use websites and mobile apps to smart tools that handle repetitive work, we build technology designed to save you time and help your business succeed."
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <Reveal delay={index * 0.08}>
                  <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-8 shadow-xs transition-all duration-300 hover:border-accent/40 hover:shadow-panel hover:-translate-y-1">
                    <div>
                      <div className="flex items-start justify-between">
                        {/* Service Icon Badge */}
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                          <Icon
                            className="h-6 w-6"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </div>

                        {/* Discipline Index */}
                        <span className="font-mono text-xs font-bold tracking-widest text-muted/50 select-none">
                          {`// 0${index + 1}`}
                        </span>
                      </div>

                      <h3 className="mt-6 text-xl font-bold leading-snug tracking-tight text-primary">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {item.description}
                      </p>

                      {item.highlights && item.highlights.length > 0 ? (
                        <ul className="mt-6 space-y-2 border-t border-border/80 pt-5">
                          {item.highlights.map((tag) => (
                            <li
                              key={tag}
                              className="flex items-center gap-2.5 text-xs text-muted"
                            >
                              <Check
                                className="h-3.5 w-3.5 shrink-0 text-accent"
                                strokeWidth={2.5}
                                aria-hidden="true"
                              />
                              <span>{tag}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>

                    {item.href ? (
                      <div className="mt-8 pt-2">
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            if (typeof window !== "undefined" && window.location.pathname === "/" && item.href?.startsWith("/#")) {
                              e.preventDefault();
                              const id = item.href.replace("/#", "");
                              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                              window.history.replaceState(null, "", `#${id}`);
                            }
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent-text transition-colors hover:text-accent-hover cursor-pointer"
                        >
                          <span>Learn more about this service</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
