import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SolutionsExplorer } from "@/components/sections/solutions-explorer";

export function SolutionsSection() {
  return (
    <Section id="solutions" tone="muted" labelledBy="solutions-heading" className="relative overflow-hidden">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeader
            id="solutions-heading"
            eyebrow="Practical Solutions"
            title={
              <span>
                Technology Built to Solve{" "}
                <span className="highlight-accent text-primary">Real Business Problems</span>.
              </span>
            }
            description="Explore how we solve everyday business challenges — from automating manual tasks and building custom software to delivering secure websites that help your company thrive."
          />
        </Reveal>
        <div className="mt-12 sm:mt-16">
          <SolutionsExplorer />
        </div>
      </Container>
    </Section>
  );
}
