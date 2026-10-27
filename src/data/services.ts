import {
  Bot,
  Braces,
  Cpu,
  Database,
  CircleCheck,
  Globe,
  Network,
  PenTool,
  Smartphone,
  GitBranch,
  Wrench,
  Zap,
} from "lucide-react";
import type { FlowStep, Service } from "@/types";

/**
 * STRATA services. Titles and summaries are the approved copy;
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
    title: "Web & App Development",
    summary:
      "We develop modern, scalable, and user-friendly web and mobile applications using cutting-edge technologies to deliver seamless digital experiences.",
    icon: Globe,
    visual: "web",
    capabilities: [
      "React.js — interactive and responsive web interfaces",
      "Flutter — cross-platform mobile apps for Android & iOS",
      "Node.js & Express.js — scalable backend systems and APIs",
      "MongoDB — flexible and efficient database solutions",
      "API Development & Integration",
      "Firebase — real-time databases, auth, and cloud services",
      "Socket.IO — real-time communication and live tracking",
    ],
    tools: [
      { name: "React.js", description: "Build interactive and responsive web interfaces." },
      { name: "Flutter", description: "Develop cross-platform mobile applications for Android and iOS." },
      { name: "Node.js & Express.js", description: "Build scalable backend systems and robust APIs." },
      { name: "MongoDB", description: "Design flexible and efficient database solutions." },
      { name: "API Development & Integration", description: "Connect applications with external services and systems." },
      { name: "Firebase", description: "Implement real-time databases, authentication, notifications, and cloud services." },
      { name: "Socket.IO", description: "Enables real-time communication for ride updates, driver offers, and live location tracking." },
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
    title: "Agentic AI & Automation",
    summary:
      "We develop intelligent AI agents and automated workflows that streamline business operations, reduce manual effort, and improve productivity through smart decision-making and seamless system integration.",
    icon: Bot,
    visual: "agentic",
    featured: true,
    capabilities: [
      "n8n Automation — connecting applications, APIs, and AI models",
      "LangGraph — stateful AI agents and multi-agent workflows",
      "LangChain — AI apps with tools, databases, and knowledge sources",
      "OpenAI SDK — intelligent assistants and AI-powered applications",
      "Google ADK — orchestrate agents for complex multi-step tasks",
      "Custom AI Automation — end-to-end systems tailored to business needs",
    ],
    tools: [
      { name: "n8n Automation", description: "Design automated workflows connecting applications, APIs, and AI models." },
      { name: "LangGraph", description: "Build stateful AI agents and structured multi-agent workflows." },
      { name: "LangChain", description: "Develop AI applications integrated with tools, databases, and knowledge sources." },
      { name: "OpenAI SDK", description: "Build intelligent assistants and AI-powered applications using OpenAI models." },
      { name: "Google ADK", description: "Develop and orchestrate AI agents for complex, multi-step tasks." },
      { name: "Custom AI Automation", description: "Create end-to-end automation systems tailored to business needs." },
    ],
  },
  {
    id: "ai-based-systems",
    title: "AI-Based Systems",
    summary:
      "We develop intelligent AI solutions that combine advanced algorithms, data-driven insights, and research-based innovation to solve complex problems and improve business efficiency.",
    icon: Cpu,
    visual: "ai-systems",
    capabilities: [
      "AI Model Development — custom models for business and research",
      "Model Tuning — optimized accuracy, efficiency, and performance",
      "Computer Vision — image processing, object detection, visual recognition",
      "Research-Based Projects — innovative ideas into practical AI solutions",
      "Natural Language Processing (NLP) — text analysis and language understanding",
      "Transformers — language processing, content generation, contextual understanding",
      "Data Analytics — extract insights for informed decision-making",
      "Machine Learning — predictive models from data patterns",
      "Deep Learning — neural networks for complex analysis and prediction",
    ],
    tools: [
      { name: "AI Model Development", description: "Build custom AI models tailored to specific business and research needs." },
      { name: "Model Tuning", description: "Optimize AI models for improved accuracy, efficiency, and performance." },
      { name: "Computer Vision", description: "Develop intelligent systems for image processing, object detection, and visual recognition." },
      { name: "Research-Based Projects", description: "Transform innovative research ideas into practical AI solutions." },
      { name: "Natural Language Processing (NLP)", description: "Build systems for text analysis, language understanding, and intelligent communication." },
      { name: "Transformers", description: "Develop transformer-based solutions for language processing, content generation, and contextual understanding." },
      { name: "Data Analytics", description: "Extract meaningful insights from data to support informed decision-making." },
      { name: "Machine Learning", description: "Create predictive models that learn from data and identify valuable patterns." },
      { name: "Deep Learning", description: "Build neural network solutions for complex data analysis, recognition, and prediction tasks." },
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
