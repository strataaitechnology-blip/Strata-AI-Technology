import { ArrowRight, CheckCircle2, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Enter } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "@/components/ui/hero-visual";
import { TechnicalGridBackground } from "@/components/ui/enterprise-motifs";

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden bg-background">
      {/* Precision technical grid background */}
      <TechnicalGridBackground />

      <Container className="relative z-10 grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.12fr_1fr] lg:gap-12 lg:pb-24 lg:pt-20">
        <div className="relative">
          <Enter delay={0.08}>
            <h1
              id="hero-heading"
              className="text-[clamp(2.15rem,3.8vw,3.5rem)] font-extrabold leading-[1.14] tracking-[-0.03em] text-primary"
            >
              Software, Websites &amp; Apps Built to{" "}
              <span className="highlight-accent text-primary">Grow Your Business</span>
            </h1>
          </Enter>

          <Enter delay={0.15}>
            <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-muted">
              We create easy-to-use websites, mobile apps, and smart tools that help you
              reach more customers, eliminate repetitive daily tasks, and run your business better.
            </p>
          </Enter>

          <Enter delay={0.2}>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              {/* Primary Consultation Action */}
              <ButtonLink href="/#contact" size="lg" className="shadow-md">
                <span>Start Your Project</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              {/* Secondary Solutions Action */}
              <ButtonLink href="/#services" variant="secondary" size="lg">
                Explore Our Services
              </ButtonLink>
            </div>
          </Enter>

          {/* Business Credibility Metrics */}
          <Enter delay={0.25}>
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4 sm:gap-6">
              {[
                { value: "5+ Years", label: "Industry Experience", icon: Clock },
                { value: "20+", label: "Delivered Projects", icon: Sparkles },
                { value: "99.9%", label: "Reliable Uptime", icon: ShieldCheck },
                { value: "100%", label: "Client Commitment", icon: CheckCircle2 },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Icon className="h-4 w-4 text-accent" strokeWidth={2} />
                    <p className="font-display text-xl font-bold text-primary sm:text-2xl">
                      {value}
                    </p>
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted">{label}</p>
                </div>
              ))}
            </div>
          </Enter>
        </div>

        <Enter
          delay={0.18}
          y={20}
          scale={0.99}
          className="relative mx-auto w-full max-w-[42rem] lg:max-w-none"
        >
          <HeroVisual className="h-auto w-full" />
        </Enter>
      </Container>
    </section>
  );
}
