import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";
import { FaqSection } from "@/components/sections/faq-section";
import { PageHero } from "@/components/sections/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell STRATA Technologies about your project. Send an inquiry about software, web, mobile, AI or Agentic AI solutions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        description="Start a conversation about your next product, system or AI idea."
        breadcrumbs={[{ label: "Contact" }]}
      />
      <ContactSection />
      <FaqSection showContactLink={false} />
    </>
  );
}
