import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCapabilities, ServicesSection } from "@/components/sections/services-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Software development, web and mobile apps, UI/UX design, Agentic AI, AI-based systems, cloud and infrastructure, digital transformation, and quality assurance from STRATA Technologies.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services"
        description="Nine disciplines, one engineering approach — from software and mobile apps to Agentic AI and cloud."
        breadcrumbs={[{ label: "Services" }]}
      />
      <ServicesSection />
      <ServiceCapabilities />
      <TechnologySection />
      <CtaBand />
    </>
  );
}
