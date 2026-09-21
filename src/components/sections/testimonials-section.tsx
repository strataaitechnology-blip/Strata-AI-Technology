import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const hasPlaceholders = testimonials.some((item) => item.isPlaceholder);

  return (
    <Section id="testimonials" tone="muted" labelledBy="testimonials-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="testimonials-heading"
            title="What Our Partners Say."
            description={hasPlaceholders ? "These are placeholders. Real partner testimonials will replace them once they are approved." : undefined}
          />
        </Reveal>
        <Reveal delay={0.08} className="mt-12">
          <TestimonialsCarousel />
        </Reveal>
      </Container>
    </Section>
  );
}
