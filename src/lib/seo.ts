import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl } from "@/lib/utils";

interface BuildMetadataOptions {
  /** Page title without the site name. Omit for the homepage. */
  title?: string;
  description?: string;
  /** Site-relative path used for the canonical URL, e.g. "/about". */
  path?: string;
  noIndex?: boolean;
}

/**
 * Shared metadata builder so every page gets a title, description, canonical
 * URL, Open Graph and Twitter/X tags consistently.
 *
 * The Open Graph image is referenced explicitly because a page-level
 * `openGraph` object replaces the one inherited from the root layout.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const image = absoluteUrl("/opengraph-image");

  return {
    title: title ? title : { absolute: siteConfig.title },
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: fullTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: siteConfig.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
