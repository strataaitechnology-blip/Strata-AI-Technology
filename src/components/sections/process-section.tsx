import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ProcessTimeline } from "@/components/sections/process-timeline";

export function ProcessSection() {
  return (
    <Section id="process" tone="muted" labelledBy="process-heading" className="relative overflow-hidden">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeader
            id="process-heading"
            eyebrow="How We Work"
            title={
              <span>
                From Initial Idea to{" "}
                <span className="highlight-accent text-primary">Successful Launch</span>.
              </span>
            }
            description="A clear, straightforward 6-step process designed to deliver dependable software on time, within budget, and with zero surprises."
          />
        </Reveal>
        <div className="mt-14 lg:mt-16">
          <ProcessTimeline />
        </div>
      </Container>
    </Section>
  );
}
