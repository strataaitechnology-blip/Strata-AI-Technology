import { Cloud, Database, Monitor, Server, Smartphone, Sparkles } from "lucide-react";
import type { TechnologyGroup } from "@/types";

export const technologyGroups: TechnologyGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Fast, accessible interfaces.",
    icon: Monitor,
    items: ["React", "Next.js"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Dependable services and integrations.",
    icon: Server,
    items: ["Node.js", "APIs"],
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "One codebase, every platform.",
    icon: Smartphone,
    items: ["Flutter"],
  },
  {
    id: "data",
    title: "Data",
    description: "Structured and flexible storage.",
    icon: Database,
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    id: "ai",
    title: "AI",
    description: "Intelligence applied where it matters.",
    icon: Sparkles,
    items: ["Generative AI", "Agentic AI", "Machine Learning", "Natural Language Processing"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Secure, scalable foundations.",
    icon: Cloud,
    items: ["Cloud Platforms", "Deployment", "Scalable Systems"],
  },
];
