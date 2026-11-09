import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TechPill } from "@/components/ui/tech-pill";
import { technologyGroups } from "@/data/technologies";

export function TechnologySection() {
  return (
    <Section id="technology" labelledBy="technology-heading" className="relative overflow-hidden">
      <Container className="relative z-10 grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start lg:pr-10">
          <SectionHeader
            id="technology-heading"
            eyebrow="Our Technology"
            title={
              <span>
                Reliable Tools,{" "}
                <span className="highlight-accent text-primary">Dependable Results</span>
              </span>
            }
            description="We use modern, industry-standard tools chosen for fast performance, high security, and everyday reliability — so your business systems run smoothly without headaches."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-4">
            {technologyGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.id}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:border-accent/40 hover:shadow-panel sm:p-7"
                >
                  <div className="grid gap-4 sm:grid-cols-[13rem_1fr] sm:gap-6 sm:items-center">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                          <Icon
                            className="h-5 w-5"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </div>
                        <h4 className="text-base font-bold text-primary">
                          {group.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted pl-1">
                        {group.description}
                      </p>
                    </div>

                    <div>
                      <ul className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <li key={item}>
                            <TechPill>{item}</TechPill>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
