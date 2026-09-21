import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectsSection } from "@/components/sections/projects-section";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Explore the kinds of web, mobile, AI, Agentic AI and software products STRATA Technologies designs and builds.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects"
        description="Web, mobile, AI and software work across industries."
        breadcrumbs={[{ label: "Projects" }]}
      />
      <ProjectsSection />
      <CtaBand />
    </>
  );
}
