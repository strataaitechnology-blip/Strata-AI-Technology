import { Enter } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "@/components/ui/hero-visual";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-background">
      {/* Subtle dot grid, fading out at bottom */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dot-grid absolute inset-0 opacity-60" />
        <div
          className="absolute inset-x-0 bottom-0 h-28"
          style={{
            background: "linear-gradient(to top, var(--background), transparent)",
          }}
        />
      </div>

      <Container className="grid items-center gap-10 pb-10 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-14 lg:pt-20">
        <div className="relative z-10">
          <Enter delay={0.07}>
            <h1
              id="hero-heading"
              className="text-[clamp(2.8rem,6.5vw,5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-primary"
            >
              Technology That Builds What&apos;s Next.
            </h1>
          </Enter>

          <Enter delay={0.14}>
            <p className="mt-6 max-w-lg text-[1.1rem] leading-relaxed text-muted">
              We build modern software, intelligent AI systems, and digital
              solutions that help businesses grow, automate, and innovate.
            </p>
          </Enter>

          <Enter delay={0.21}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Primary CTA: Deep Navy */}
              <ButtonLink href="/services" size="lg">
                Explore Our Services
              </ButtonLink>
              {/* Secondary CTA: outlined */}
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Let&apos;s Work Together
              </ButtonLink>
            </div>
          </Enter>

          {/* Stat proof-line */}
          <Enter delay={0.28}>
            <div className="mt-10 flex items-center gap-6 border-t border-border pt-8">
              {[
                { value: "5+", label: "Years building" },
                { value: "20+", label: "Projects shipped" },
                { value: "100%", label: "Client focus" },
              ].map(({ value, label }) => (
                <div key={label} className="min-w-0">
                  <p className="font-display text-xl font-semibold text-primary">
                    {value}
                  </p>
                  <p className="text-xs text-muted">{label}</p>
                </div>
              ))}
            </div>
          </Enter>
        </div>

        <Enter
          delay={0.18}
          y={20}
          scale={0.99}
          className="relative mx-auto w-full max-w-[40rem] lg:max-w-none"
        >
          <HeroVisual className="h-auto w-full" />
        </Enter>
      </Container>
    </section>
  );
}
