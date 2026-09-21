import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SolutionsExplorer } from "@/components/sections/solutions-explorer";

export function SolutionsSection() {
  return (
    <Section id="solutions" tone="muted" labelledBy="solutions-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="solutions-heading"
            title="Technology Built Around Real Business Problems."
            description="Every solution follows the same path: start with the challenge, shape a strategy, choose the right technology, add intelligence where it helps, and measure the impact."
          />
        </Reveal>
        <div className="mt-14">
          <SolutionsExplorer />
        </div>
      </Container>
    </Section>
  );
}
