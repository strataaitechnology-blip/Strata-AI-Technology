import {
  Bot,
  Braces,
  Cloud,
  Cpu,
  Database,
  CircleCheck,
  Globe,
  Network,
  PenTool,
  ShieldCheck,
  Smartphone,
  GitBranch,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import type { FlowStep, Service } from "@/types";

/**
 * The nine STRATA services. Titles and summaries are the approved copy;
 * `capabilities` describe the kind of work involved (no client claims).
 */
export const services: Service[] = [
  {
    id: "software-development",
    title: "Software Development",
    summary:
      "Custom software engineered to solve complex business challenges and scale with your needs.",
    icon: Braces,
    visual: "software",
    capabilities: [
      "Custom business applications",
      "API design and system integration",
      "Legacy system modernization",
      "Maintenance and long-term support",
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    summary:
      "High-performance web experiences built for modern businesses and digital products.",
    icon: Globe,
    visual: "web",
    capabilities: [
      "Marketing sites and web platforms",
      "Web applications and dashboards",
      "SEO-ready, accessible front ends",
      "Performance and Core Web Vitals tuning",
    ],
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    summary:
      "Intuitive, reliable mobile applications designed for seamless experiences across platforms.",
    icon: Smartphone,
    visual: "mobile",
    capabilities: [
      "Cross-platform apps for iOS and Android",
      "Offline-ready and real-time features",
      "Backend and API connectivity",
      "Store release and update support",
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    summary:
      "User-centered interfaces that make complex technology simple, intuitive, and engaging.",
    icon: PenTool,
    visual: "design",
    capabilities: [
      "User research and journey mapping",
      "Wireframes and interactive prototypes",
      "Design systems and component libraries",
      "Usability testing and iteration",
    ],
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    summary:
      "Autonomous AI agents that reason, act, and automate complex business workflows.",
    icon: Bot,
    visual: "agentic",
    featured: true,
    capabilities: [
      "Task-focused agents connected to your tools",
      "Multi-step workflow automation",
      "Human approval and oversight controls",
      "Monitoring, logging and evaluation",
    ],
  },
  {
    id: "ai-based-systems",
    title: "AI-Based Systems",
    summary:
      "Intelligent systems that turn data and processes into smarter, automated solutions.",
    icon: Cpu,
    visual: "ai-systems",
    capabilities: [
      "Generative AI and NLP features",
      "Prediction, classification and recommendation",
      "Data pipelines and model integration",
      "AI added to existing products",
    ],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud & Infrastructure",
    summary:
      "Secure, scalable infrastructure built to support modern digital applications.",
    icon: Cloud,
    visual: "cloud",
    capabilities: [
      "Cloud architecture and migration",
      "CI/CD and automated deployment",
      "Monitoring and observability",
      "Security-minded, cost-aware setups",
    ],
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    summary:
      "Modernizing businesses through technology, automation, and intelligent digital solutions.",
    icon: Workflow,
    visual: "transformation",
    capabilities: [
      "Process discovery and automation",
      "Roadmaps for phased modernization",
      "System integration and data unification",
      "Change-friendly rollout planning",
    ],
  },
  {
    id: "quality-assurance-testing",
    title: "Quality Assurance & Testing",
    summary:
      "Rigorous testing that delivers reliable, secure, and production-ready software.",
    icon: ShieldCheck,
    visual: "quality",
    capabilities: [
      "Test strategy and automation",
      "Functional, regression and performance testing",
      "Security-focused review",
      "Release readiness checks",
    ],
  },
];

/** Conceptual flow shown for Agentic AI: AI Agent → Tools → Data → Actions → Results */
export const agenticFlow: FlowStep[] = [
  { label: "AI Agent", description: "Reasons about a goal and plans the steps to reach it.", icon: Bot },
  { label: "Tools", description: "Uses the APIs and software your business already runs on.", icon: Wrench },
  { label: "Data", description: "Reads the context it needs from your systems and documents.", icon: Database },
  { label: "Actions", description: "Takes steps, with approvals wherever people should decide.", icon: Zap },
  { label: "Results", description: "Delivers outcomes that are checked, logged and traceable.", icon: CircleCheck },
];

/** Conceptual flow shown for AI-Based Systems: Data → Intelligence → Decision → Action */
export const aiSystemFlow: FlowStep[] = [
  { label: "Data", description: "Information collected, cleaned and prepared.", icon: Database },
  { label: "Intelligence", description: "Models that find patterns and generate insight.", icon: Network },
  { label: "Decision", description: "Predictions and recommendations people can trust.", icon: GitBranch },
  { label: "Action", description: "Outcomes automated, or handed to the right person.", icon: Zap },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
