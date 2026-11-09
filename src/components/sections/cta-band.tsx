import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

/**
 * Closing CTA — High-impact Deep Midnight Navy panel with vibrant blue glow.
 */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="pb-20 sm:pb-24 lg:pb-32">
      <Container>
        <Reveal>
          <div className="force-dark relative overflow-hidden rounded-3xl border border-border-strong bg-gradient-to-r from-[#050b14] via-[#0a1832] to-[#050b14] px-8 py-14 shadow-2xl sm:px-14 sm:py-20">
            {/* Background ambient radial blue glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-20 -top-20 h-64 rounded-full bg-accent/20 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pattern-rings pointer-events-none absolute -bottom-10 -right-10 h-64 w-64 rounded-full opacity-20"
            />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-text">
                  Start Your Project
                </span>
                <h2
                  id="cta-heading"
                  className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground"
                >
                  Ready to make your business run smoother?{" "}
                  <span className="text-accent underline decoration-accent/40 decoration-wavy underline-offset-8">
                    Let&apos;s talk.
                  </span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                  Share your project idea, daily challenge, or growth plans. We will help
                  you choose the simplest, most effective way to build and launch with total confidence.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <ButtonLink href="/#contact" size="lg" variant="accent" className="shadow-lg">
                  <span>Start Your Project</span>
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="/#services"
                  variant="secondary"
                  size="lg"
                  className="border-border-strong bg-card/60 text-foreground hover:border-accent hover:text-accent-text"
                >
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
