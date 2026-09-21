import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { capabilities } from "@/data/capabilities";

/** Four core capabilities redesigned into a rich 3D card showcase. */
export function IntroSection() {
  return (
    <Section id="capabilities" labelledBy="intro-heading" className="relative">
      {/* Background accents */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-50 pointer-events-none" />
      <div aria-hidden="true" className="glow-blue absolute -left-20 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 pointer-events-none opacity-40" />

      <Container className="relative">
        <Reveal>
          <SectionHeader
            id="intro-heading"
            badge="Core Disciplines"
            title="Engineering Excellence Across The Entire Stack."
            description="We combine deep software craft with modern AI architectures to solve complex business challenges and drive measurable operational impact."
          />
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            const stepNum = `0${index + 1}`;
            return (
              <li key={item.id} className="h-full">
                <Reveal delay={index * 0.08} className="h-full">
                  <TiltCard
                    className="group flex h-full flex-col justify-between p-7 sm:p-8 bg-card shadow-panel border-border-strong hover:border-accent-text/70 transition-all duration-300"
                    maxDegree={9}
                  >
                    <div>
                      {/* Top bar: Icon + Numbered step badge */}
                      <div className="flex items-center justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent-text transition-transform duration-300 group-hover:scale-110">
                          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <span className="font-display text-sm font-semibold tracking-wider text-muted/50">
                          {stepNum}
                        </span>
                      </div>

                      {/* Title & Detailed Copy */}
                      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-foreground group-hover:text-accent-text transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-[0.95rem]">
                        {item.description}
                      </p>

                      {/* Feature Highlights Pills */}
                      {item.highlights && item.highlights.length > 0 ? (
                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {item.highlights.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-md border border-border-strong/60 bg-surface px-2.5 py-1 text-xs font-medium text-subtle transition-colors group-hover:border-accent-text/30 group-hover:text-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {/* Action link */}
                    {item.href ? (
                      <div className="mt-8 border-t border-border/60 pt-4">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text transition-colors group-hover:text-accent-hover group-hover:underline"
                        >
                          Explore discipline
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                      </div>
                    ) : null}
                  </TiltCard>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
