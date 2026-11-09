import type { LucideIcon } from "lucide-react";

/* ── Navigation ─────────────────────────────────────────── */
export interface NavItem {
  label: string;
  href: string;
}

/* ── Services ───────────────────────────────────────────── */
export type ServiceVisualId =
  | "software"
  | "web"
  | "mobile"
  | "design"
  | "agentic"
  | "ai-systems";

export interface Service {
  /** URL-safe id, also used as the anchor on /services (e.g. #agentic-ai). */
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  visual: ServiceVisualId;
  capabilities: string[];
  /** Optional named tools or sub-services with a short description. */
  tools?: { name: string; description: string }[];
  featured?: boolean;
}

export interface FlowStep {
  label: string;
  description: string;
  icon: LucideIcon;
}

/* ── Solutions ──────────────────────────────────────────── */
export type SolutionStageId =
  | "challenge"
  | "strategy"
  | "technology"
  | "intelligence"
  | "impact";

export interface SolutionStage {
  id: SolutionStageId;
  label: string;
}

export interface Solution {
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  stages: Record<SolutionStageId, string>;
}

/* ── Technology ─────────────────────────────────────────── */
export interface TechnologyGroup {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
}

/* ── Projects ───────────────────────────────────────────── */
export type ProjectCategory = "Web" | "Mobile" | "AI" | "Automation" | "Software";

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  industry: string;
  description: string;
  /** Title of the STRATA service this project relates to. */
  service: string;
  serviceId: string;
  technologies: string[];
  image: ImageAsset;
  featured?: boolean;
  /** Set to false once this entry describes a real, approved project. */
  isPlaceholder: boolean;
  /** Optional link to live project, demo, or case study (can be added later). */
  projectUrl?: string;
}

/* ── Team / testimonials / FAQ ──────────────────────────── */
export interface TeamMember {
  id: string;
  role: string;
  name?: string;
  bio?: string;
  photo?: ImageAsset;
  linkedin?: string;
  /** Set to false once this entry describes a real team member. */
  isPlaceholder: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Set to false once this entry is a genuine, approved testimonial. */
  isPlaceholder: boolean;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

/* ── Process / principles ───────────────────────────────── */
export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlights?: string[];
  href?: string;
}

/* ── Contact ────────────────────────────────────────────── */
export interface ContactFormValues {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export interface ContactApiResponse {
  ok: boolean;
  /** true only when an email provider actually accepted the message. */
  delivered?: boolean;
  message: string;
  errors?: ContactFieldErrors;
}

export interface SocialLink {
  id: "linkedin" | "facebook" | "instagram" | "x";
  label: string;
  /** null = placeholder (no real profile yet). */
  href: string | null;
}

/* ── Legal ──────────────────────────────────────────────── */
export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}
