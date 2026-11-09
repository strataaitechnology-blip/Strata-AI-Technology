import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { testimonials } from "@/data/testimonials";

export function TestimonialsSection() {
  const hasPlaceholders = testimonials.some((t) => t.isPlaceholder);

  return (
    <Section id="testimonials" labelledBy="testimonials-heading" tone="muted" className="relative overflow-hidden">
      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16">
        <Reveal>
          <SectionHeader
            id="testimonials-heading"
            eyebrow="Client Feedback"
            title={
              <span>
                What It Is Like to{" "}
                <span className="highlight-accent text-primary">Work With Us</span>.
              </span>
            }
            description={
              hasPlaceholders
                ? "Client reviews and feedback will be published here as ongoing projects launch. We are dedicated to clear communication, on-time delivery, and dependable results."
                : "Real feedback from the businesses we partner with to build digital solutions."
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
