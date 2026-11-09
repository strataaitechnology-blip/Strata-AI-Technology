import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-and-conditions", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return staticRoutes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
  }));
}
