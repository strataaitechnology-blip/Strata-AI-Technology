import { ArrowRight, Eye, ShieldCheck, Target } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { about } from "@/data/about";

export function AboutSection({ showLink = false }: { showLink?: boolean }) {
  const blocks = [
    { ...about.mission, icon: Target },
    { ...about.vision, icon: Eye },
  ];

  return (
    <Section id="about" labelledBy="about-heading" className="relative overflow-hidden">
      <Container className="relative z-10 grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        {/* Left Column: Architectural Blueprint & Certified Metrics */}
        <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative">
            {/* Main Showcase Panel */}
            <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-card via-card to-surface/90 p-7 pb-20 shadow-panel sm:p-9 sm:pb-24">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent-text">
                    Your Technology Partner
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Trusted By Growing Businesses
                </span>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-display text-2xl font-bold leading-tight text-primary">
                  Turning Ideas Into Practical Digital Solutions.
                </h4>
                <p className="text-sm leading-relaxed text-muted">
                  We design and build custom websites, mobile apps, and business software tailored to your specific needs. Whether you want to attract more customers or eliminate hours of manual work, we make technology simple, dependable, and effective.
                </p>

                <div className="pt-2 flex flex-wrap gap-2 font-mono text-xs">
                  <span className="rounded-lg border border-border bg-surface px-3 py-1 text-muted">
                    Websites &amp; Mobile Apps
                  </span>
                  <span className="rounded-lg border border-border bg-surface px-3 py-1 text-muted">
                    Smart Business Automation
                  </span>
                  <span className="rounded-lg border border-border bg-surface px-3 py-1 text-muted">
                    Dedicated Support
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Executive Stats Bar */}
            <div className="force-dark absolute -bottom-6 inset-x-4 sm:inset-x-8 rounded-2xl border border-border-strong p-4 shadow-2xl sm:p-5">
              <div className="grid grid-cols-3 divide-x divide-border-strong text-center">
                <div className="px-2">
                  <p className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    5+
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
                    Years Experience
                  </p>
                </div>
                <div className="px-2">
                  <p className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    20+
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
                    Delivered Projects
                  </p>
                </div>
                <div className="px-2">
                  <p className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    100%
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
                    Client Dedication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Positioning & Mission/Vision */}
        <Reveal delay={0.1}>
          <div>
            <SectionHeader
              id="about-heading"
              eyebrow="Who We Are"
              title={
                <span>
                  Practical Technology,{" "}
                  <span className="highlight-accent text-primary">Real Business Results</span>
                </span>
              }
              description={about.intro}
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {blocks.map(({ title, text, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-xs transition-all duration-200 hover:border-accent/40"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <h4 className="mt-4 text-base font-bold text-primary">{title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">{text}</p>
                </div>
              ))}
            </div>

            {showLink ? (
              <div className="mt-9">
                <ButtonLink href="/#services" variant="secondary" className="gap-2">
                  <span>Explore Our Services</span>
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
