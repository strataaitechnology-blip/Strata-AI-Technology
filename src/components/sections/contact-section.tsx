import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/config/site";
import { Mail, MapPin, Phone } from "lucide-react";

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
    label: "Location",
    value: siteConfig.contact.address,
    href: undefined,
  },
];

export function ContactSection() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <Reveal>
          <SectionHeader
            id="contact-heading"
            eyebrow="Get In Touch"
            title="Let's Build Something Together."
            description="Tell us about your project and we will be in touch within one business day."
          />

          <dl className="mt-10 space-y-5">
            {contactDetails
              .filter((detail) => detail.value)
              .map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  {/* Teal icon container */}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-accent-soft text-accent-text">
                    <Icon className="h-4.5 w-4.5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-[0.7rem] font-semibold tracking-[0.1em] uppercase text-subtle">
                      {label}
                    </dt>
                    {href ? (
                      <dd>
                        <a
                          href={href}
                          className="text-sm text-foreground underline-offset-4 hover:text-accent-text hover:underline"
                        >
                          {value}
                        </a>
                      </dd>
                    ) : (
                      <dd className="text-sm text-foreground">{value}</dd>
                    )}
                  </div>
                </div>
              ))}
          </dl>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
