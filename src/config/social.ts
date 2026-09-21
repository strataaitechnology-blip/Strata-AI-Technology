import type { SocialLink } from "@/types";

/**
 * PLACEHOLDER SOCIAL LINKS
 * ------------------------------------------------------------------
 * Set the matching environment variables (see .env.example) once the real
 * profiles exist. While a value is empty (`null`), the footer renders the
 * icon as a disabled placeholder instead of a link, and the profile is
 * excluded from Schema.org `sameAs`.
 */
const readEnv = (value: string | undefined) => value?.trim() || null;

export const socialLinks: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: readEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL) },
  { id: "facebook", label: "Facebook", href: readEnv(process.env.NEXT_PUBLIC_FACEBOOK_URL) },
  { id: "instagram", label: "Instagram", href: readEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL) },
  { id: "x", label: "X", href: readEnv(process.env.NEXT_PUBLIC_X_URL) },
];
