import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { principles } from "@/data/principles";

/**
 * Deep Navy band — The STRATA Engineering Standard.
 * tone="dark" applies the force-dark class which sets background to deep executive obsidian navy.
 */
export function WhySection() {
  return (
    <Section id="why-strata" tone="dark" labelledBy="why-heading">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeader
            id="why-heading"
            eyebrow="Why Choose STRATA"
            title={
              <span>
                Built for Quality,{" "}
                <span className="highlight-accent">Reliability &amp; Growth</span>
              </span>
            }
            description="We build software and websites designed to deliver real business value, protect your information, and help your company grow with confidence."
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <li key={principle.id}>
                <Reveal delay={(index % 3) * 0.08}>
                  <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-7 shadow-xs transition-all duration-300 hover:border-accent/40 hover:shadow-panel hover:-translate-y-1 sm:p-8">
                    <div>
                      {/* Tech Icon Badge */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-accent/20 transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                        <Icon
                          className="h-6 w-6"
                          strokeWidth={1.8}
                          aria-hidden="true"
                        />
                      </div>

                      <h3 className="mt-6 text-lg font-bold text-foreground">
                        {principle.title}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-muted sm:text-sm">
                        {principle.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-accent-text font-bold">
                        Our Commitment
                      </span>
                      <span className="font-mono text-xs font-bold text-muted/50">
                        {`// 0${index + 1}`}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
