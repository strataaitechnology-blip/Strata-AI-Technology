import { siteUrl } from "@/config/site";

type ClassValue = string | number | false | null | undefined;

/** Minimal class-name joiner (keeps the dependency list short). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? siteUrl : `${siteUrl}${normalized}`;
}

/** Format an ISO date (YYYY-MM-DD) for display, e.g. "September 21, 2026". */
export function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
