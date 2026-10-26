import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Closing CTA — Deep Navy bordered panel.
 * Teal "accent" button is the primary CTA here for visual variety.
 */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="pb-20 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal>
          {/* Deep Navy dark panel */}
          <div className="force-dark border border-border px-8 py-14 sm:px-14 sm:py-20">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2
                  id="cta-heading"
                  className="text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
                >
                  Have something to build?{" "}
                  <span className="text-accent">Let&apos;s talk.</span>
                </h2>
                <p className="mt-4 text-muted">
                  Share your idea and we will help you find the right way to
                  build it.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                {/* Teal primary CTA on dark background */}
                <ButtonLink href="/contact" size="lg" variant="accent">
                  Get Started
                </ButtonLink>
                <ButtonLink
                  href="/services"
                  variant="secondary"
                  size="lg"
                  className="border-border-strong bg-transparent text-foreground hover:border-accent hover:text-accent"
                >
                  Explore Services
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
