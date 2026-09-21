import { Building2, ChartColumn, Cloud, Layers, MessagesSquare, Workflow } from "lucide-react";
import type { Solution, SolutionStage } from "@/types";

/** The five stages every solution moves through. */
export const solutionStages: SolutionStage[] = [
  { id: "challenge", label: "Challenge" },
  { id: "strategy", label: "Strategy" },
  { id: "technology", label: "Technology" },
  { id: "intelligence", label: "Intelligence" },
  { id: "impact", label: "Impact" },
];

export const solutions: Solution[] = [
  {
    id: "business-automation",
    title: "Business Automation",
    summary: "Replace repetitive manual work with reliable, intelligent workflows.",
    icon: Workflow,
    stages: {
      challenge: "Repetitive manual work slows teams down and introduces errors.",
      strategy: "Map the workflows worth automating and define what success looks like.",
      technology: "Workflow engines, integrations and APIs that connect the tools you already use.",
      intelligence: "AI that classifies, extracts and routes work, with people kept in the loop.",
      impact: "Faster turnaround, fewer errors, and teams free to focus on higher-value work.",
    },
  },
  {
    id: "enterprise-software",
    title: "Enterprise Software",
    summary: "Software shaped around how your organization actually operates.",
    icon: Building2,
    stages: {
      challenge: "Off-the-shelf tools do not fit the way the business really works.",
      strategy: "Design the domain model and architecture around real processes and future growth.",
      technology: "Modular, secure applications on proven and maintainable technology.",
      intelligence: "Embedded analytics and assistants where they help people decide faster.",
      impact: "One dependable platform that scales with the organization.",
    },
  },
  {
    id: "customer-experience",
    title: "Customer Experience",
    summary: "Smoother journeys across web, mobile and conversational channels.",
    icon: MessagesSquare,
    stages: {
      challenge: "Customers meet friction across disconnected channels and slow responses.",
      strategy: "Research the journey and prioritize the moments that matter most.",
      technology: "Web, mobile and conversational interfaces on a shared backend.",
      intelligence: "Personalization and AI assistance that respond to context.",
      impact: "Easier experiences and stronger relationships with customers.",
    },
  },
  {
    id: "data-analytics",
    title: "Data & Analytics",
    summary: "Turn scattered data into insight your team can act on.",
    icon: ChartColumn,
    stages: {
      challenge: "Data is scattered, inconsistent and hard to trust.",
      strategy: "Define the questions that matter and the data needed to answer them.",
      technology: "Pipelines, storage and dashboards on a well-governed foundation.",
      intelligence: "Models that forecast, detect anomalies and surface insight.",
      impact: "Decisions grounded in evidence rather than guesswork.",
    },
  },
  {
    id: "cloud-solutions",
    title: "Cloud Solutions",
    summary: "Infrastructure that is resilient, secure and ready to scale.",
    icon: Cloud,
    stages: {
      challenge: "Infrastructure is costly, fragile or difficult to change.",
      strategy: "Plan architecture and migration around reliability, security and cost.",
      technology: "Cloud-native infrastructure with automated deployment and monitoring.",
      intelligence: "Observability that flags issues and capacity needs early.",
      impact: "Resilient systems that grow on demand.",
    },
  },
  {
    id: "digital-platforms",
    title: "Digital Platforms",
    summary: "A product foundation that can grow with your ambitions.",
    icon: Layers,
    stages: {
      challenge: "A good idea needs a product foundation that can grow into a business.",
      strategy: "Shape the product vision, roadmap and technical foundation together.",
      technology: "Web and mobile platforms built to be extended over time.",
      intelligence: "AI features introduced only where they create measurable value.",
      impact: "A launch-ready platform your team can evolve with confidence.",
    },
  },
];
