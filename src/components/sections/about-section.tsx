import { Eye, Target } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { about } from "@/data/about";

export function AboutSection({ showLink = false }: { showLink?: boolean }) {
  const blocks = [
    { ...about.mission, icon: Target },
    { ...about.vision, icon: Eye },
  ];

  return (
    <Section id="about" labelledBy="about-heading">
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <Reveal>
          <SectionHeader id="about-heading" title={about.heading} description={about.intro} />
          {showLink ? (
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              About STRATA
            </ButtonLink>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          {/* Two offset plates behind the panel echo the layered "strata" idea. */}
          <div className="relative pt-6">
            <div aria-hidden="true" className="absolute inset-x-8 top-0 h-full rounded-2xl border border-border bg-surface-strong/60" />
            <div aria-hidden="true" className="absolute inset-x-4 top-3 h-full rounded-2xl border border-border bg-surface" />
            <TiltCard className="shadow-panel divide-y divide-border border border-border-strong bg-card" maxDegree={8}>
              {blocks.map(({ title, text, icon: Icon }) => (
                <div key={title} className="flex gap-5 p-7 sm:p-9">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </TiltCard>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
