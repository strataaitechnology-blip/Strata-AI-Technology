import type { Project, ProjectCategory } from "@/types";

/**
 * PLACEHOLDER PROJECTS
 * ------------------------------------------------------------------
 * These entries are illustrative concepts, NOT real client work. Each one is
 * flagged `isPlaceholder: true`, which shows a "Placeholder" badge in the UI.
 * To publish a real project: replace the fields, add an image under
 * /public/images/projects, and set `isPlaceholder: false`.
 */
export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Web",
  "Mobile",
  "AI",
  "Agentic AI",
  "Software",
];

const image = (slug: string, alt: string) => ({
  src: `/images/projects/${slug}.svg`,
  alt,
  width: 1200,
  height: 800,
});

export const projects: Project[] = [
  {
    slug: "commerce-platform",
    name: "Commerce Platform",
    category: "Web",
    industry: "Retail & E-commerce",
    description:
      "A sample storefront concept with fast catalog browsing, a streamlined checkout and an admin dashboard for managing products and orders.",
    service: "Web Development",
    serviceId: "web-development",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    image: image("commerce-platform", "Placeholder preview of a commerce platform with a product catalog and order summary."),
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "field-service-app",
    name: "Field Service App",
    category: "Mobile",
    industry: "Logistics",
    description:
      "A sample mobile app concept that helps field teams view assignments, capture updates on site and sync work back to the office.",
    service: "Mobile App Development",
    serviceId: "mobile-app-development",
    technologies: ["Flutter", "Node.js", "MongoDB"],
    image: image("field-service-app", "Placeholder preview of two mobile app screens showing a task list and a status chart."),
    isPlaceholder: true,
  },
  {
    slug: "knowledge-assistant",
    name: "Knowledge Assistant",
    category: "AI",
    industry: "Professional Services",
    description:
      "A sample assistant concept that answers questions from an organization's own documents, with sources shown alongside each answer.",
    service: "AI-Based Systems",
    serviceId: "ai-based-systems",
    technologies: ["Generative AI", "Natural Language Processing", "Node.js"],
    image: image("knowledge-assistant", "Placeholder preview of an AI assistant conversation with cited sources."),
    isPlaceholder: true,
  },
  {
    slug: "workflow-agent",
    name: "Workflow Agent",
    category: "Agentic AI",
    industry: "Operations",
    description:
      "A sample agent concept that reads incoming requests, checks records in connected systems, prepares actions and asks for approval before it acts.",
    service: "Agentic AI",
    serviceId: "agentic-ai",
    technologies: ["Agentic AI", "APIs", "PostgreSQL"],
    image: image("workflow-agent", "Placeholder preview of an AI agent workflow connecting tools, data and approvals."),
    featured: true,
    isPlaceholder: true,
  },
  {
    slug: "operations-suite",
    name: "Operations Suite",
    category: "Software",
    industry: "Manufacturing",
    description:
      "A sample internal software concept that brings scheduling, inventory and reporting into one maintainable platform.",
    service: "Software Development",
    serviceId: "software-development",
    technologies: ["React", "Node.js", "PostgreSQL"],
    image: image("operations-suite", "Placeholder preview of an operations software system with connected modules."),
    isPlaceholder: true,
  },
  {
    slug: "learning-portal",
    name: "Learning Portal",
    category: "Web",
    industry: "Education",
    description:
      "A sample web platform concept for delivering courses, tracking progress and giving instructors a clear view of learner activity.",
    service: "Web Development",
    serviceId: "web-development",
    technologies: ["React", "Next.js", "MongoDB"],
    image: image("learning-portal", "Placeholder preview of a learning portal with course progress and lessons."),
    isPlaceholder: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
