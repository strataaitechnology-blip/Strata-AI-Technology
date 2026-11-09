import { Braces, Cpu, Lightbulb, Workflow } from "lucide-react";
import type { Capability } from "@/types";

/** The four core capabilities introduced directly below the hero. */
export const capabilities: Capability[] = [
  {
    id: "apps",
    title: "Web & Mobile Apps",
    description: "We build intuitive websites and mobile apps that make it easy for your customers to find you, order services, and stay connected.",
    icon: Braces,
    highlights: ["Mobile Apps (iOS & Android)", "Fast & Modern Websites", "Simple Customer Portals"],
    href: "/#services",
  },
  {
    id: "software",
    title: "Custom Business Software",
    description: "We create software designed around how your company operates, replacing messy spreadsheets with one simple, organized system.",
    icon: Lightbulb,
    highlights: ["Internal Management Tools", "Order & Inventory Systems", "Custom Client Dashboards"],
    href: "/#services",
  },
  {
    id: "automation",
    title: "Business Automation",
    description: "We help your business save time by connecting everyday software tools and eliminating repetitive manual data entry.",
    icon: Workflow,
    highlights: ["Automated Daily Workflows", "Connected Apps & Tools", "Fewer Human Errors"],
    href: "/#services",
  },
  {
    id: "ai",
    title: "AI Solutions",
    description: "We build smart tools that handle routine questions, organize information, and help your team work more efficiently.",
    icon: Cpu,
    highlights: ["24/7 Customer Assistants", "Smart Document Search", "Helpful Business Insights"],
    href: "/#services",
  },
];
