import { Compass, PenTool, Rocket, Search, ShieldCheck, Terminal } from "lucide-react";
import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    step: "01",
    title: "Discover",
    description: "Understand the problem, users, goals, and requirements.",
    icon: Search,
  },
  {
    id: "plan",
    step: "02",
    title: "Plan",
    description: "Define strategy, architecture, and technology.",
    icon: Compass,
  },
  {
    id: "design",
    step: "03",
    title: "Design",
    description: "Create the experience and system design.",
    icon: PenTool,
  },
  {
    id: "develop",
    step: "04",
    title: "Develop",
    description: "Build the software, application, or AI system.",
    icon: Terminal,
  },
  {
    id: "test",
    step: "05",
    title: "Test",
    description: "Validate quality, reliability, security, and performance.",
    icon: ShieldCheck,
  },
  {
    id: "launch",
    step: "06",
    title: "Launch",
    description: "Deploy the solution.",
    icon: Rocket,
  },
];
