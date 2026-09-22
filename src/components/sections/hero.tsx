import { Enter } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "@/components/ui/hero-visual";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0" />
        <div className="glow-blue absolute -right-[8%] -top-[12%] h-[44rem] w-[44rem] opacity-90" />
      </div>

      <Container className="grid items-center gap-8 pb-6 pt-8 sm:pt-12 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-10 lg:pt-16">
        <div className="relative z-10">
          <Enter>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-background/70 px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-accent-text backdrop-blur">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              SOFTWARE • AI • INNOVATION
            </p>
          </Enter>

          <Enter delay={0.08}>
            <h1
              id="hero-heading"
              className="mt-6 text-[clamp(2.6rem,6.2vw,4.9rem)] font-semibold leading-[1.03] tracking-[-0.038em] text-foreground"
            >
              Technology That Builds What&apos;s Next.
            </h1>
          </Enter>

          <Enter delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              We build modern software, intelligent AI systems, and digital solutions that help
              businesses grow, automate, and innovate.
            </p>
          </Enter>

          <Enter delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/services" size="lg">
                Explore Our Services
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Let&apos;s Work Together
              </ButtonLink>
            </div>
          </Enter>
        </div>

        <Enter delay={0.2} y={24} scale={0.985} className="relative mx-auto w-full max-w-[40rem] lg:max-w-none">
          <HeroVisual className="h-auto w-full" />
        </Enter>
      </Container>
    </section>
  );
}
