import { Braces, Cpu, Lightbulb, Workflow } from "lucide-react";
import type { Capability } from "@/types";

/** The four core capabilities introduced directly below the hero. */
export const capabilities: Capability[] = [
  {
    id: "software",
    title: "Software",
    description: "Custom web applications, cloud architectures, and scalable enterprise platforms engineered for performance.",
    icon: Braces,
    highlights: ["Web & Mobile Apps", "Cloud Infrastructure", "API Systems"],
    href: "/services#software-development",
  },
  {
    id: "ai",
    title: "AI & Intelligence",
    description: "Autonomous agentic workflows, predictive ML models, and custom LLM integration to automate complex tasks.",
    icon: Cpu,
    highlights: ["Agentic AI", "LLM Integration", "Predictive Analytics"],
    href: "/services#agentic-ai",
  },
  {
    id: "automation",
    title: "Automation",
    description: "Streamlined business processes, API orchestrations, and automated pipelines that reduce manual overhead.",
    icon: Workflow,
    highlights: ["Workflow Engine", "Data Pipelines", "Process Automation"],
    href: "/services#ai-systems",
  },
  {
    id: "innovation",
    title: "Innovation",
    description: "Rapid technical prototyping, modernization of legacy platforms, and strategic digital transformation.",
    icon: Lightbulb,
    highlights: ["Tech Strategy", "Legacy Modernization", "Rapid Prototyping"],
    href: "/solutions",
  },
];
