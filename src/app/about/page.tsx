import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { CtaBand } from "@/components/sections/cta-band";
import { IntroSection } from "@/components/sections/intro-section";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { WhySection } from "@/components/sections/why-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "STRATA Technologies combines modern software engineering with artificial intelligence to build practical, scalable and intelligent digital solutions.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About STRATA Technologies"
        description="A software and AI company focused on practical technology that solves real problems."
        breadcrumbs={[{ label: "About" }]}
      />
      <AboutSection />
      <IntroSection />
      <WhySection />
      <ProcessSection />
      <CtaBand />
    </>
  );
}
