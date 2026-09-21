import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/legal-document";
import { PageHero } from "@/components/sections/page-hero";
import { privacySections } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How STRATA Technologies collects, uses and protects personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="How we handle the information you share with us."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />
      <LegalDocument sections={privacySections} />
    </>
  );
}
