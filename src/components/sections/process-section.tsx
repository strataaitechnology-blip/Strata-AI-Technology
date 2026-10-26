import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ProcessTimeline } from "@/components/sections/process-timeline";

export function ProcessSection() {
  return (
    <Section id="process" tone="muted" labelledBy="process-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="process-heading"
            eyebrow="Our Process"
            title="From Idea to Intelligent Product."
            description="A clear path from the first conversation to a solution running in production."
          />
        </Reveal>
        <div className="mt-14 lg:mt-16">
          <ProcessTimeline />
        </div>
      </Container>
    </Section>
  );
}
