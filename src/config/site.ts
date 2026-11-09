/**
 * Central site configuration.
 *
 * Everything that describes the company lives here or in /src/data so real
 * information can be inserted later WITHOUT touching component code.
 * Anything that is not yet known is `null` and rendered as a clearly-marked
 * placeholder — it is never invented and never emitted in structured data.
 */

const FALLBACK_URL = "http://localhost:3000";

function readEnv(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function resolveSiteUrl(): string {
  const raw = readEnv(process.env.NEXT_PUBLIC_SITE_URL);
  if (!raw) {
    if (process.env.NODE_ENV === "production") {
      console.warn(
        "[STRATA] NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, sitemap and " +
          "structured data will point to http://localhost:3000. Set it before deploying."
      );
    }
    return FALLBACK_URL;
  }
  try {
    return new URL(raw).origin;
  } catch {
    console.warn(`[STRATA] NEXT_PUBLIC_SITE_URL ("${raw}") is not a valid URL.`);
    return FALLBACK_URL;
  }
}

export const siteUrl = resolveSiteUrl();

export const siteConfig = {
  name: "STRATA Technologies",
  shortName: "STRATA",
  url: siteUrl,
  locale: "en_US",
  language: "en",
  title: "STRATA Technologies | Software, Websites & Business Automation",
  tagline: "Smart Software & Websites Built for Growing Businesses.",
  description:
    "STRATA Technologies builds custom software, websites, mobile apps, and automated tools that help businesses save time, work better, and reach more customers.",
  footerDescription:
    "We build custom software, websites, mobile apps, and smart business tools that help companies work faster and grow.",
  ogImageAlt:
    "STRATA Technologies — Smart software, websites, and automation for growing businesses.",
  keywords: [
    "software development company",
    "web development",
    "mobile app development",
    "business automation",
    "custom software",
    "AI solutions",
    "cloud hosting",
    "UI/UX design",
  ],

  /**
   * Public contact details. Set the NEXT_PUBLIC_CONTACT_* variables when real
   * details exist. `null` renders a visible placeholder in the UI.
   */
  contact: {
    email: readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "strataaitechnology@gmail.com",
    phone: readEnv(process.env.NEXT_PUBLIC_CONTACT_PHONE),
    address: readEnv(process.env.NEXT_PUBLIC_CONTACT_ADDRESS),
  },

  /** Legal pages. Replace the bracketed placeholders in /src/data/legal.ts. */
  legal: {
    lastUpdated: "2026-09-21",
  },
} as const;

export type SiteConfig = typeof siteConfig;
