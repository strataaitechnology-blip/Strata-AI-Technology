import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { TiltCard } from "@/components/animations/tilt-card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";

function ContactDetail({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string | null; href?: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border-strong text-accent-text">
        <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm text-subtle">{label}</p>
        {value ? (
          href ? (
            <a href={href} className="font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent-text hover:decoration-accent-text">
              {value}
            </a>
          ) : (
            <p className="font-medium text-foreground">{value}</p>
          )
        ) : (
          <p className="text-muted" data-placeholder="contact-detail">
            To be added
          </p>
        )}
      </div>
    </li>
  );
}

function FormFallback() {
  return <div aria-hidden="true" className="min-h-[30rem] animate-pulse rounded-xl bg-surface" />;
}

export function ContactSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const { email, phone, address } = siteConfig.contact;

  return (
    <Section id="contact" labelledBy="contact-heading">
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <SectionHeader
            id="contact-heading"
            as={headingLevel}
            title="Let's Talk Technology."
            description="Tell us what you are building or trying to solve. We will get back to you to talk through goals, scope and the next sensible step."
          />
          <ul className="mt-10 space-y-6">
            <ContactDetail icon={Mail} label="Email" value={email} href={email ? `mailto:${email}` : undefined} />
            <ContactDetail icon={Phone} label="Phone" value={phone} href={phone ? `tel:${phone.replace(/[^+\d]/g, "")}` : undefined} />
            <ContactDetail icon={MapPin} label="Location" value={address} />
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <TiltCard className="p-6 sm:p-10 shadow-panel" maxDegree={7}>
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </TiltCard>
        </Reveal>
      </Container>
    </Section>
  );
}
