import { Eye, Target } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
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
      <Container className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal>
          <SectionHeader
            id="about-heading"
            title={about.heading}
            description={about.intro}
          />
          {showLink ? (
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              About STRATA
            </ButtonLink>
          ) : null}
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="space-y-0 divide-y divide-border border border-border">
            {blocks.map(({ title, text, icon: Icon }) => (
              <div key={title} className="flex gap-5 p-8 sm:p-10">
                {/* Teal icon — accent on white/light surface */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent-soft text-accent-text">
                  <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-sm font-semibold text-primary">{title}</dt>
                  <dd className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                    {text}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
