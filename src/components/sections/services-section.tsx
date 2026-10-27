import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { agenticFlow, aiSystemFlow, services } from "@/data/services";

/**
 * Agentic AI spotlight — Deep Navy dark panel, teal accent.
 */
function AiSpotlight() {
  return (
    <div className="force-dark mt-20 border border-border">
      <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
        <div className="p-8 sm:p-12 lg:p-14">
          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-accent">
            Agentic AI & Automation
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            From answers to actions.
          </h3>
          <p className="mt-4 max-w-xl text-muted">
            We develop intelligent AI agents and automated workflows that
            streamline business operations, reduce manual effort, and improve
            productivity through smart decision-making and seamless system
            integration.
          </p>
        </div>
        <div className="flex items-center border-t border-border p-8 lg:border-l lg:border-t-0 lg:p-12">
          <ButtonLink
            href="/contact?service=agentic-ai"
            size="lg"
            variant="accent"
          >
            Discuss Agentic AI & Automation
          </ButtonLink>
        </div>
      </div>

      <div className="border-t border-border p-8 sm:p-12 lg:p-14">
        <div className="space-y-10">
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.14em] uppercase text-accent-text">
              Agentic AI flow
            </p>
            <FlowDiagram
              steps={agenticFlow}
              emphasizeFirst
              label="Agentic AI flow: AI Agent, Tools, Data, Actions, Results"
            />
          </div>
          <div className="border-t border-border pt-10">
            <p className="mb-5 text-xs font-semibold tracking-[0.14em] uppercase text-accent-text">
              AI-Based Systems
            </p>
            <FlowDiagram
              steps={aiSystemFlow}
              label="AI-based system flow: Data, Intelligence, Decision, Action"
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
      <Container>
        <Reveal>
          <SectionHeader
            id="services-heading"
            eyebrow="Services"
            title="Technology Solutions Designed Around Your Business."
            description="From the first line of code to intelligent automation, we cover the full range of modern software and AI work."
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

export function ServiceCapabilities() {
  return (
    <Section tone="default" labelledBy="capabilities-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="capabilities-heading"
            title="What each service includes."
            description="The kind of work you can expect under every discipline."
          />
        </Reveal>
        <ul className="mt-12 border-t border-border-strong">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li
                key={service.id}
                id={service.id}
                className="grid gap-8 border-b border-border py-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16"
              >
                <div className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent-soft text-accent-text">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      {service.summary}
                    </p>
                  </div>
                </div>

                <div>
                  {service.tools && service.tools.length > 0 ? (
                    <ul className="grid content-start gap-x-6 gap-y-4 sm:grid-cols-2">
                      {service.tools.map((tool) => (
                        <li key={tool.name} className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-2 text-sm font-semibold text-primary">
                            <span
                              aria-hidden="true"
                              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {tool.name}
                          </span>
                          <p className="pl-3.5 text-xs leading-relaxed text-muted">
                            {tool.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="grid content-start gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {service.capabilities.map((capability) => (
                        <li
                          key={capability}
                          className="flex items-start gap-3 text-sm text-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

