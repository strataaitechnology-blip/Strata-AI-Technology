import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FaqAccordion } from "@/components/sections/faq-accordion";

export function FaqSection({ showContactLink = true }: { showContactLink?: boolean }) {
  return (
    <Section id="faq" labelledBy="faq-heading" className="relative overflow-hidden">
      <Container className="relative z-10 grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start lg:pr-8">
          <SectionHeader
            id="faq-heading"
            eyebrow="Common Questions"
            title={
              <span>
                Frequently Asked{" "}
                <span className="highlight-accent text-primary">Questions</span>
              </span>
            }
            description="Straightforward answers about our services, project timelines, and how we help your business succeed."
          />
          {showContactLink ? (
            <div className="mt-8">
              <ButtonLink href="/#contact" variant="secondary" className="gap-2">
                <span>Have a Question? Contact Our Team</span>
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          ) : null}
        </Reveal>
        <Reveal delay={0.08}>
          <FaqAccordion />
        </Reveal>
      </Container>
    </Section>
  );
}
