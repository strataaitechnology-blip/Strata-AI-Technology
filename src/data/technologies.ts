import { Cloud, Database, Monitor, Server, Smartphone, Sparkles } from "lucide-react";
import type { TechnologyGroup } from "@/types";

export const technologyGroups: TechnologyGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Fast, accessible interfaces.",
    icon: Monitor,
    items: ["React.js", "Next.js"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Dependable services and integrations.",
    icon: Server,
    items: ["Node.js", "Express.js", "Firebase", "Socket.IO", "APIs"],
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
    title: "AI & Agentic",
    description: "Intelligence applied where it matters.",
    icon: Sparkles,
    items: ["LangGraph", "LangChain", "OpenAI SDK", "Google ADK", "n8n", "Generative AI", "Machine Learning", "NLP", "Computer Vision", "Deep Learning"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Secure, scalable foundations.",
    icon: Cloud,
    items: ["Cloud Platforms", "Deployment", "Scalable Systems"],
  },
];

