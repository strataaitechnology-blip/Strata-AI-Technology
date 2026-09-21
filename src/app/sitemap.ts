import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/utils";

const staticRoutes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/services", priority: 0.9 },
  { path: "/solutions", priority: 0.8 },
  { path: "/projects", priority: 0.7 },
  { path: "/team", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-and-conditions", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticRoutes.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    priority,
  }));

  // Placeholder case studies are marked noindex, so they stay out of the sitemap.
  const caseStudies = projects
    .filter((project) => !project.isPlaceholder)
    .map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      priority: 0.6,
    }));

  return [...pages, ...caseStudies];
}
