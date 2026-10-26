import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const hasPlaceholders = testimonials.some((t) => t.isPlaceholder);

  return (
    <Section id="testimonials" labelledBy="testimonials-heading" tone="muted">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
        <Reveal>
          <SectionHeader
            id="testimonials-heading"
            eyebrow="Client Stories"
            title="Trusted by teams who build for the future."
            description={
              hasPlaceholders
                ? "These are placeholder testimonials. Real client stories will appear here once they are collected and approved."
                : "Real feedback from the businesses and teams we have worked with."
            }
          />
        </Reveal>

        <Reveal delay={0.1}>
          <TestimonialsCarousel />
        </Reveal>
      </Container>
    </Section>
  );
}
