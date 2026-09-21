import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TechPill } from "@/components/ui/tech-pill";
import { technologyGroups } from "@/data/technologies";

export function TechnologySection() {
  return (
    <Section id="technology" labelledBy="technology-heading">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="technology-heading"
            title="Modern technology, chosen with care."
            description="We pick tools for the problem in front of us — proven where reliability matters, current where it creates an advantage."
          />
        </Reveal>

        <Reveal delay={0.08}>
          <dl className="border-t border-border-strong">
            {technologyGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div key={group.id} className="grid gap-4 border-b border-border-strong py-7 sm:grid-cols-[11rem_1fr] sm:gap-8">
                  <dt>
                    <span className="flex items-center gap-2.5 font-display text-lg font-semibold text-foreground">
                      <Icon className="h-[1.1rem] w-[1.1rem] text-accent-text" strokeWidth={1.75} aria-hidden="true" />
                      {group.title}
                    </span>
                    <span className="mt-1 block text-sm text-subtle">{group.description}</span>
                  </dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <TechPill>{item}</TechPill>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </Container>
    </Section>
  );
}
