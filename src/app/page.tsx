import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq-section";
import { Hero } from "@/components/sections/hero";
import { IntroSection } from "@/components/sections/intro-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { TeamSection } from "@/components/sections/team-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { WhySection } from "@/components/sections/why-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSection />
      <AboutSection showLink />
      <ServicesSection />
      <SolutionsSection />
      <TechnologySection />
      <PortfolioSection />
      <WhySection />
      <ProcessSection />
      <TeamSection />
      <FaqSection />
      <CtaBand />
      <ContactSection />
    </>
  );
}
