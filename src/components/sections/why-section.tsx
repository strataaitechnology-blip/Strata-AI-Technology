import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { principles } from "@/data/principles";
import { cn } from "@/lib/utils";

/** Navy band with five principles on a staggered 3 + 2 grid. */
export function WhySection() {
  return (
    <Section id="why-strata" tone="dark" labelledBy="why-heading" className="overflow-hidden">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="glow-blue absolute -left-40 top-0 h-[34rem] w-[34rem]" />
      <Container className="relative">
        <Reveal>
          <SectionHeader id="why-heading" title="Built With Purpose. Engineered To Scale." />
        </Reveal>

        <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-6">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <li key={principle.id} className={cn("border-t border-border-strong pt-6 lg:col-span-2", index >= 3 && "lg:col-span-3")}>
                <Reveal delay={(index % 3) * 0.06}>
                  <Icon className="h-7 w-7 text-accent-text" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{principle.title}</h3>
                  <p className="mt-2 max-w-sm text-muted">{principle.description}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
