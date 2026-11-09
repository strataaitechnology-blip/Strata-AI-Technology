import { Blocks, Layers, Lightbulb, Sparkles, Users } from "lucide-react";
import type { Principle } from "@/types";

export const principles: Principle[] = [
  {
    id: "modern-engineering",
    title: "Reliable Engineering",
    description: "Clean, well-tested systems that keep your business running smoothly without unexpected crashes.",
    icon: Blocks,
  },
  {
    id: "intelligent-technology",
    title: "Practical AI",
    description: "Smart automation used only where it genuinely saves you time, cuts costs, or helps your customers.",
    icon: Sparkles,
  },
  {
    id: "user-centered",
    title: "Designed for Real People",
    description: "Intuitive screens and simple workflows that your staff and customers will easily understand.",
    icon: Users,
  },
  {
    id: "scalable-solutions",
    title: "Built to Grow With You",
    description: "Flexible software designed so adding new products, features, or team members is simple.",
    icon: Layers,
  },
  {
    id: "practical-innovation",
    title: "Clear & Honest Partnership",
    description: "Direct communication, transparent timelines, and practical solutions with zero technical jargon.",
    icon: Lightbulb,
  },
];
