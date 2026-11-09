import { Compass, PenTool, Rocket, Search, ShieldCheck, Terminal } from "lucide-react";
import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    step: "01",
    title: "Discovery",
    description: "We discuss your business goals, daily challenges, and what you want to achieve.",
    icon: Search,
  },
  {
    id: "plan",
    step: "02",
    title: "Planning",
    description: "We outline a simple plan, project timeline, and the most practical technology for your budget.",
    icon: Compass,
  },
  {
    id: "design",
    step: "03",
    title: "Design",
    description: "We create clean, user-friendly mockups so you can preview everything before we build.",
    icon: PenTool,
  },
  {
    id: "develop",
    step: "04",
    title: "Building",
    description: "Our team builds your website, app, or automation with high attention to detail.",
    icon: Terminal,
  },
  {
    id: "test",
    step: "05",
    title: "Testing",
    description: "We test everything thoroughly on multiple devices to ensure smooth, glitch-free performance.",
    icon: ShieldCheck,
  },
  {
    id: "launch",
    step: "06",
    title: "Launch & Support",
    description: "We launch your solution smoothly and provide ongoing support so you always have help when needed.",
    icon: Rocket,
  },
];
