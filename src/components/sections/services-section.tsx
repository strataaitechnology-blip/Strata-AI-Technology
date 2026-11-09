import { Check } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { agenticFlow, aiSystemFlow, services } from "@/data/services";

/**
 * Agentic AI spotlight — High-contrast deep navy panel with glowing blue accent.
 */
function AiSpotlight() {
  return (
    <div className="force-dark mt-20 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
        <div className="p-8 sm:p-12 lg:p-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase text-accent-text">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            AI &amp; Business Automation
          </div>
          <h3 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
            Less repetitive work.{" "}
            <span className="highlight-accent text-white">More time for your business.</span>
          </h3>
          <p className="mt-4 max-w-2xl text-muted leading-relaxed">
            We build smart tools and automated workflows that handle routine tasks,
            answer customer inquiries, and keep your software in sync — freeing your team
            to focus on growing your business.
          </p>
        </div>
        <div className="flex items-center border-t border-border p-8 lg:border-l lg:border-t-0 lg:p-12">
          <ButtonLink
            href="/#contact"
            size="lg"
            variant="accent"
            className="w-full sm:w-auto shadow-md"
          >
            Start Your Project
          </ButtonLink>
        </div>
      </div>

      <div className="border-t border-border bg-surface/50 p-8 sm:p-12 lg:p-14">
        <div className="space-y-12">
          <div>
            <p className="mb-6 font-mono text-xs font-bold tracking-[0.14em] uppercase text-accent-text">
              01 // How Automation Works For You
            </p>
            <FlowDiagram
              steps={agenticFlow}
              emphasizeFirst
              label="How business automation works: Request, Gathers Info, Prepares Action, Approval, Done"
            />
          </div>
          <div className="border-t border-border pt-10">
            <p className="mb-6 font-mono text-xs font-bold tracking-[0.14em] uppercase text-accent-text">
              02 // How Smart Tools Help You Decide
            </p>
            <FlowDiagram
              steps={aiSystemFlow}
              label="How smart tools work: Data, Smart Analysis, Clear Guidance, Work Finished"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" labelledBy="services-heading" tone="muted">
      {/* Decorative background wavy lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 opacity-20"
      >
        <svg viewBox="0 0 200 200" fill="none" className="h-full w-full stroke-accent">
          <path d="M0 40 Q 50 10, 100 40 T 200 40" strokeWidth="2" fill="none" />
          <path d="M0 60 Q 50 30, 100 60 T 200 60" strokeWidth="2" fill="none" />
          <path d="M0 80 Q 50 50, 100 80 T 200 80" strokeWidth="2" fill="none" />
          <path d="M0 100 Q 50 70, 100 100 T 200 100" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Decorative dot matrix on bottom left */}
      <div
        aria-hidden="true"
        className="bg-dot-matrix pointer-events-none absolute bottom-8 left-8 h-32 w-32 rounded-full"
      />

      <Container className="relative z-10">
        <Reveal>
          <SectionHeader
            id="services-heading"
            eyebrow="Our Services"
            title={
              <span className="text-primary">
                Technology Solutions Designed Around{" "}
                <span className="highlight-accent text-primary">Your Business</span>
              </span>
            }
            description="From modern websites and mobile apps to smart tools that handle daily tasks, we build digital solutions that help your business run smoothly and grow."
          />
        </Reveal>

        <div className="mt-14 lg:mt-16">
          <ServicesShowcase />
        </div>

        <Reveal>
          <AiSpotlight />
        </Reveal>
      </Container>
    </Section>
  );
}

/** Detailed capabilities breakdown used on the /services page */
export function ServiceCapabilities() {
  return (
    <Section tone="default" labelledBy="capabilities-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="capabilities-heading"
            eyebrow="Service Breakdown"
            title={
              <span>
                What Each Service{" "}
                <span className="highlight-accent text-primary">Delivers</span>.
              </span>
            }
            description="A clear breakdown of the capabilities, tools, and real-world advantages behind every service we provide."
          />
        </Reveal>

        <ul className="mt-14 space-y-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li
                key={service.id}
                id={service.id}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:border-accent/40 sm:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-14">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {service.summary}
                      </p>
                    </div>
                  </div>

                  <div>
                    {service.tools && service.tools.length > 0 ? (
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {service.tools.map((tool) => (
                          <li
                            key={tool.name}
                            className="rounded-xl border border-border/80 bg-surface/60 p-3"
                          >
                            <span className="flex items-center gap-2 text-xs font-bold text-primary">
                              <Check
                                className="h-3.5 w-3.5 text-accent shrink-0"
                                strokeWidth={2.5}
                              />
                              {tool.name}
                            </span>
                            <p className="mt-1 pl-5.5 text-[0.72rem] leading-relaxed text-muted">
                              {tool.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="grid gap-2.5 sm:grid-cols-2">
                        {service.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="flex items-start gap-2.5 text-xs text-muted"
                          >
                            <Check
                              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                              strokeWidth={2.5}
                            />
                            <span>{capability}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
