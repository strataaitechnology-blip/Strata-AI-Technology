import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { TeamSection } from "@/components/sections/team-section";
import { WhySection } from "@/components/sections/why-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Team",
  description: "Meet the engineers, designers and leaders behind STRATA Technologies.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <PageHero
        title="Team"
        description="The engineers, designers and leaders who turn ideas into working technology."
        breadcrumbs={[{ label: "Team" }]}
      />
      <TeamSection />
      <WhySection />
      <CtaBand />
    </>
  );
}
