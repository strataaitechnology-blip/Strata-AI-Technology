import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { capabilities } from "@/data/capabilities";

/** Four core capabilities — editorial border-grid layout. */
export function IntroSection() {
  return (
    <Section id="capabilities" labelledBy="intro-heading" tone="muted">
      <Container>
        <Reveal>
          <SectionHeader
            id="intro-heading"
            eyebrow="Core Disciplines"
            title="Engineering Excellence Across The Entire Stack."
            description="We combine deep software craft with modern AI architectures to solve complex business challenges and drive measurable operational impact."
          />
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-0 border-t border-border sm:grid-cols-2">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.id}
                className="border-b border-border sm:[&:nth-child(odd)]:border-r"
              >
                <Reveal delay={index * 0.07}>
                  <div className="group p-8 sm:p-10 lg:p-12">
                    <div className="flex items-start justify-between">
                      {/* Teal icon container */}
                      <span className="flex h-11 w-11 items-center justify-center border border-accent/30 bg-accent-soft text-accent-text">
                        <Icon
                          className="h-5 w-5"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      {/* Faded number — stays border-strong for restraint */}
                      <span className="font-display text-4xl font-semibold leading-none tracking-tighter text-border-strong select-none">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold leading-snug tracking-tight text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>

                    {item.highlights && item.highlights.length > 0 ? (
                      <ul className="mt-5 space-y-1.5">
                        {item.highlights.map((tag) => (
                          <li
                            key={tag}
                            className="flex items-center gap-2.5 text-xs text-muted"
                          >
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 shrink-0 rounded-full bg-accent"
                            />
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {item.href ? (
                      <div className="mt-8">
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text transition-colors hover:text-primary"
                        >
                          Explore discipline
                          <ArrowRight
                            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
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
