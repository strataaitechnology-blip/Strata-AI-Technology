import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { FaqAccordion } from "@/components/sections/faq-accordion";

export function FaqSection({ showContactLink = true }: { showContactLink?: boolean }) {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="faq-heading"
            title="Frequently asked questions."
            description="Straight answers about how we work. Can't find yours? Just ask."
          />
          {showContactLink ? (
            <ButtonLink href="/contact" variant="secondary" className="mt-8">
              Ask a Question
            </ButtonLink>
          ) : null}
        </Reveal>
        <Reveal delay={0.08}>
          <FaqAccordion />
        </Reveal>
      </Container>
    </Section>
  );
}
