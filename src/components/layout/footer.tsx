import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from "@/components/ui/social-icons";
import { socialLinks } from "@/config/social";
import { siteConfig } from "@/config/site";
import { footerServiceLinks, legalNav, mainNav } from "@/data/navigation";
import type { SocialLink } from "@/types";

const socialIcons = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  x: XIcon,
} as const;

function SocialItem({ link }: { link: SocialLink }) {
  const Icon = socialIcons[link.id];
  const box =
    "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors";

  if (link.href) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.label} (opens in a new tab)`}
        className={`${box} border-border-strong text-muted hover:border-accent-text hover:text-accent-text`}
      >
        <Icon className="h-[1.1rem] w-[1.1rem]" />
      </a>
    );
  }

  // PLACEHOLDER: no real profile URL configured yet (see src/config/social.ts).
  return (
    <span
      role="img"
      aria-label={`${link.label} — placeholder, profile link not added yet`}
      title={`Placeholder: add the ${link.label} URL in src/config/social.ts`}
      data-placeholder="social-link"
      className={`${box} cursor-not-allowed border-dashed border-border-strong text-subtle opacity-70`}
    >
      <Icon className="h-[1.1rem] w-[1.1rem]" />
    </span>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-sm font-semibold tracking-tight text-foreground">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-muted transition-colors hover:text-accent-text">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const hasPlaceholderSocials = socialLinks.some((link) => !link.href);

  return (
    <footer className="force-dark relative overflow-hidden border-t border-border">
      <div aria-hidden="true" className="glow-blue pointer-events-none absolute -bottom-64 left-1/2 h-[32rem] w-[52rem] -translate-x-1/2 opacity-70" />

      <Container className="relative pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Logo compact={false} />
            <p className="mt-5 text-sm leading-relaxed text-muted">{siteConfig.footerDescription}</p>
            <ul className="mt-6 flex items-center gap-2.5" aria-label="Social media">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <SocialItem link={link} />
                </li>
              ))}
            </ul>
            {hasPlaceholderSocials && process.env.NODE_ENV !== "production" ? (
              <p className="mt-3 text-xs text-subtle">
                Dashed icons are placeholders — add real URLs in <code>src/config/social.ts</code>.
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn title="Navigation" links={mainNav} />
            <FooterColumn title="Services" links={footerServiceLinks} />
            <FooterColumn title="Legal" links={legalNav} />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 STRATA Technologies. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
