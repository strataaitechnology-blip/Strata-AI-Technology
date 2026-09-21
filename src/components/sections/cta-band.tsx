import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/** Closing call to action for inner pages. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="pb-20 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal>
          <div className="force-dark relative overflow-hidden rounded-3xl border border-border px-6 py-14 shadow-panel sm:px-14 sm:py-20">
            <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
            <div aria-hidden="true" className="glow-blue absolute -right-20 -top-40 h-[30rem] w-[30rem]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 id="cta-heading" className="text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-foreground">
                  Have something to build? Let&apos;s talk.
                </h2>
                <p className="mt-4 text-lg text-muted">Share your idea and we will help you find the right way to build it.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Get Started
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary" size="lg" className="border-border-strong bg-transparent text-foreground">
                  Explore Our Services
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
