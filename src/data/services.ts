import {
  Bot,
  Braces,
  Cpu,
  Database,
  CircleCheck,
  Globe,
  Network,
  PenTool,
  GitBranch,
  Wrench,
  Zap,
} from "lucide-react";
import type { FlowStep, Service } from "@/types";

/**
 * STRATA services explained in simple, benefit-driven language for business owners.
 */
export const services: Service[] = [
  {
    id: "web-development",
    title: "Web & App Development",
    summary:
      "We build fast, professional websites and mobile apps that make it easy for customers to find you, explore your services, and place orders.",
    icon: Globe,
    visual: "web",
    capabilities: [
      "Custom business websites that look great on phones, tablets, and computers",
      "Mobile apps for iPhone and Android designed for simple, everyday use",
      "Online stores and booking systems that make buying quick and easy",
      "Customer portals where clients can log in, view details, and track orders",
      "Fast page loading speeds so visitors never leave out of frustration",
      "Secure hosting and ongoing maintenance so your site stays online 24/7",
    ],
    tools: [
      { name: "Modern Websites", description: "Clear, responsive layouts that work smoothly on every smartphone and laptop." },
      { name: "Mobile Apps (iOS & Android)", description: "Convenient apps that help customers interact with your services anywhere." },
      { name: "Online Payments & Orders", description: "Accept bookings, payments, and client inquiries directly through your site." },
      { name: "Fast & Secure Systems", description: "Built with industry-proven tools to keep your data safe and pages loading fast." },
    ],
  },
  {
    id: "software-development",
    title: "Custom Business Software",
    summary:
      "We build software shaped around how your business actually works, replacing disorganized spreadsheets with one simple, reliable system.",
    icon: Braces,
    visual: "software",
    capabilities: [
      "Internal tools built specifically around your team's daily processes",
      "Order, inventory, and client tracking in one easy-to-use dashboard",
      "Team access controls so managers and staff see the right information",
      "Connecting your separate apps so data stays up to date everywhere",
      "Long-term support and updates as your business grows",
    ],
    tools: [
      { name: "Order & Inventory Tracking", description: "Keep accurate track of products, stock levels, and customer requests." },
      { name: "Staff & Role Management", description: "Easily manage team permissions, task assignments, and daily activity." },
      { name: "Automated Reports", description: "See daily sales, performance numbers, and important business metrics at a glance." },
      { name: "Connected Tools", description: "Link your existing software so you never have to re-enter the same data twice." },
    ],
  },
  {
    id: "agentic-ai",
    title: "Business Automation",
    summary:
      "We help businesses save time by connecting everyday software tools and eliminating repetitive manual paperwork and data entry.",
    icon: Bot,
    visual: "agentic",
    featured: true,
    capabilities: [
      "Connecting your email, spreadsheets, and customer tools so work flows automatically",
      "Automatic confirmation emails, invoices, and client follow-ups",
      "Extracting details from incoming documents and forms without manual typing",
      "Fewer human mistakes and forgotten tasks in your daily operations",
      "Saving your staff hours every week so they can focus on high-priority work",
    ],
    tools: [
      { name: "Workflow Connections", description: "Connect tools like Gmail, Excel, WhatsApp, and CRMs to share updates automatically." },
      { name: "Automated Follow-ups", description: "Send timely reminders, receipts, and order updates without extra effort." },
      { name: "Document Organization", description: "Read and organize incoming invoices, orders, and inquiries automatically." },
      { name: "Team Approval Gates", description: "Require a single click from your team before any important action is finalized." },
    ],
  },
  {
    id: "ai-based-systems",
    title: "AI Solutions & Smart Tools",
    summary:
      "We create smart tools that reduce repetitive work, answer customer inquiries around the clock, and help your team make faster, better decisions.",
    icon: Cpu,
    visual: "ai-systems",
    capabilities: [
      "24/7 AI assistants that answer common customer questions accurately",
      "Smart document search that lets your staff find business answers in seconds",
      "Quick summaries of long emails, customer notes, and business reports",
      "Helpful sales and customer trend insights to guide your business growth",
      "Total human control: you always review and approve what matters",
    ],
    tools: [
      { name: "Customer Assistants", description: "Provide fast, helpful replies to website visitors at any time of day or night." },
      { name: "Document Search", description: "Find policies, manuals, customer histories, and past records instantly." },
      { name: "Smart Summaries", description: "Turn long emails and notes into clear, actionable bullet points." },
      { name: "Trend Insights", description: "Spot customer habits and busy periods to help you plan ahead with confidence." },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX & Product Design",
    summary:
      "We design clean, intuitive screens that make it easy and enjoyable for customers to navigate, understand, and use your digital products.",
    icon: PenTool,
    visual: "design",
    capabilities: [
      "Clear layouts that customers can understand immediately without instructions",
      "Interactive previews so you can see and test the design before building",
      "Professional branding, colors, and typography that build customer trust",
      "Accessible design tested so all customers can use your website or app easily",
    ],
  },
];

/** Conceptual flow shown for Business Automation: Request → Gathers Info → Prepares Action → Your Approval → Done */
export const agenticFlow: FlowStep[] = [
  { label: "Request Received", description: "A customer reaches out or a new order arrives.", icon: Bot },
  { label: "Gathers Info", description: "The system finds the needed details automatically.", icon: Wrench },
  { label: "Prepares Action", description: "A draft reply or record update is created.", icon: Database },
  { label: "Your Approval", description: "Your team approves with one click before sending.", icon: Zap },
  { label: "Task Done", description: "The action is completed, verified, and logged.", icon: CircleCheck },
];

/** Conceptual flow shown for AI Solutions: Your Data → Smart Analysis → Clear Guidance → Work Finished */
export const aiSystemFlow: FlowStep[] = [
  { label: "Your Data", description: "Information from your documents, orders, or inquiries.", icon: Database },
  { label: "Smart Analysis", description: "The tool spots key details and patterns quickly.", icon: Network },
  { label: "Clear Guidance", description: "Provides simple, helpful advice your team can trust.", icon: GitBranch },
  { label: "Work Finished", description: "Tasks get done faster with less manual effort.", icon: Zap },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}
