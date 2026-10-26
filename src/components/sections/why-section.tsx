import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { principles } from "@/data/principles";
import { cn } from "@/lib/utils";

/**
 * Deep Navy band — icons and principles.
 * tone="dark" applies the force-dark class which sets background to #0A1929.
 */
export function WhySection() {
  return (
    <Section id="why-strata" tone="dark" labelledBy="why-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="why-heading"
            eyebrow="Why STRATA"
            title="Built With Purpose. Engineered To Scale."
          />
        </Reveal>

        <ul className="mt-16 grid gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <li
                key={principle.id}
                className={cn(
                  "border-b border-border p-8 sm:p-10",
                  index % 2 === 0 &&
                    index < principles.length - 1 &&
                    "sm:border-r sm:border-border",
                  "lg:border-r lg:[&:nth-child(3n)]:border-r-0"
                )}
              >
                <Reveal delay={(index % 3) * 0.07}>
                  {/* Teal icon — deliberate accent on deep navy */}
                  <Icon
                    className="h-6 w-6 text-accent"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {principle.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
