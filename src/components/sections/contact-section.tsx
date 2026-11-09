import { Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: siteConfig.contact.email
      ? `mailto:${siteConfig.contact.email}`
      : undefined,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phone,
    href: siteConfig.contact.phone
      ? `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`
      : undefined,
  },
  {
    icon: MapPin,
    label: "Office Location",
    value: siteConfig.contact.address,
    href: undefined,
  },
];

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="relative overflow-hidden">
      <Container className="relative z-10 grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <Reveal>
          <div>
            <SectionHeader
              id="contact-heading"
              eyebrow="Contact Us"
              title={
                <span>
                  Let&apos;s Build{" "}
                  <span className="highlight-accent text-primary">Something Great</span>.
                </span>
              }
              description="Tell us about your project idea, website need, or daily business challenge. We will review your goals and get back to you within 24 hours with straightforward advice and next steps."
            />

            {/* Direct Contact Cards */}
            <div className="mt-10 space-y-4">
              {contactDetails
                .filter((detail) => detail.value)
                .map(({ icon: Icon, label, value, href }) => (
                  <div
                    key={label}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs transition-all duration-200 hover:border-accent/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-accent/20">
                      <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent-text">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-0.5 block truncate text-sm font-semibold text-primary transition-colors hover:text-accent-text"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-semibold text-primary truncate">
                          {value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            {/* Response SLA Guarantee badge */}
            <div className="mt-8 rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-4 text-emerald-800 dark:text-emerald-300">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="font-mono text-xs font-bold tracking-wide uppercase">
                  Quick 24-Hour Reply
                </span>
              </div>
              <p className="mt-1.5 text-xs text-muted leading-relaxed">
                You will hear back directly from our team with honest advice and a clear, simple plan for your project.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-panel sm:p-10">
            <h3 className="font-display text-xl font-bold text-primary mb-2">
              Initiate Technical Consultation
            </h3>
            <p className="text-xs text-muted mb-6">
              Provide project details below to schedule an architectural discovery and scoping session.
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
