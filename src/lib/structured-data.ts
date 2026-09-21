import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social";
import { absoluteUrl } from "@/lib/utils";

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

/**
 * Schema.org Organization.
 * Only facts that are genuinely known are emitted. Phone numbers, addresses,
 * social profiles, founding dates, awards, reviews and certifications are
 * intentionally omitted until real values are configured.
 */
export function organizationJsonLd() {
  const { email, phone } = siteConfig.contact;
  const sameAs = socialLinks.flatMap((link) => (link.href ? [link.href] : []));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    description: siteConfig.description,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(email || phone
      ? {
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer support",
            ...(email ? { email } : {}),
            ...(phone ? { telephone: phone } : {}),
          },
        }
      : {}),
  };
}

/** Schema.org WebSite. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    publisher: { "@id": ORG_ID },
  };
}

/** Serialise JSON-LD safely for use inside a <script> tag. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
