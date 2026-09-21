import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { WhySection } from "@/components/sections/why-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description:
    "Business automation, enterprise software, customer experience, data and analytics, cloud solutions and digital platforms — technology built around real business problems.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="Solutions"
        description="Six areas where technology, strategy and intelligence come together to solve real business problems."
        breadcrumbs={[{ label: "Solutions" }]}
      />
      <SolutionsSection />
      <WhySection />
      <CtaBand />
    </>
  );
}
