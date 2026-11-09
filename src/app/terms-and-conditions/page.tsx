import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/legal-document";
import { PageHero } from "@/components/sections/page-hero";
import { termsSections } from "@/data/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms that apply when you use the STRATA AI Technologies website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms & Conditions"
        description="The terms that apply when you use this website."
        breadcrumbs={[{ label: "Terms & Conditions" }]}
      />
      <LegalDocument sections={termsSections} />
    </>
  );
}

