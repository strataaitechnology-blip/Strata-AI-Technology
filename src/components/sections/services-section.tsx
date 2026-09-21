import { Reveal } from "@/components/animations/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { agenticFlow, aiSystemFlow, services } from "@/data/services";

/** Spotlight on the two AI services, each shown as a live flow. */
function AiSpotlight() {
  return (
    <div className="force-dark relative mt-20 overflow-hidden rounded-3xl border border-border p-6 shadow-panel sm:p-10 lg:p-14">
      <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-70" />
      <div aria-hidden="true" className="glow-blue absolute -right-24 -top-32 h-[28rem] w-[28rem]" />

      <div className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">From answers to actions.</h3>
            <p className="mt-4 text-muted sm:text-lg">
              Agentic AI systems do more than respond. They reason about a goal, use your tools and data, take
              action and report back — with people in control wherever it matters.
            </p>
          </div>
          <ButtonLink href="/contact?service=agentic-ai" size="lg" className="shrink-0">
            Discuss Agentic AI
          </ButtonLink>
        </div>

        <div className="mt-12 space-y-12 lg:mt-14">
          <div>
            <p className="mb-6 text-sm font-medium text-accent-text">Agentic AI</p>
            <FlowDiagram steps={agenticFlow} emphasizeFirst label="Agentic AI flow: AI Agent, Tools, Data, Actions, Results" />
          </div>
          <div className="border-t border-border pt-10">
            <p className="mb-6 text-sm font-medium text-accent-text">AI-Based Systems</p>
            <FlowDiagram steps={aiSystemFlow} label="AI-based system flow: Data, Intelligence, Decision, Action" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesSection() {
  return (
    <Section id="services" labelledBy="services-heading">
      <Container>
        <Reveal>
          <SectionHeader
            id="services-heading"
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

/** Full capability table used on /services. Each row is a deep-link target. */
export function ServiceCapabilities() {
  return (
    <Section tone="muted" labelledBy="capabilities-heading">
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
              <li key={service.id} id={service.id} className="grid gap-6 border-b border-border-strong py-9 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-strong bg-background text-accent-text">
                    <Icon className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{service.title}</h3>
                    <p className="mt-2 max-w-md text-muted">{service.summary}</p>
                  </div>
                </div>
                <ul className="grid content-start gap-x-8 gap-y-3 sm:grid-cols-2">
                  {service.capabilities.map((capability) => (
                    <li key={capability} className="flex items-start gap-3 text-foreground/90">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {capability}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
