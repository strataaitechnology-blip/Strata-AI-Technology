"use client";

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
    "flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200";

  if (link.href) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${link.label} (opens in a new tab)`}
        className={`${box} border-border text-muted hover:border-accent hover:text-accent`}
      >
        <Icon className="h-4 w-4" />
      </a>
    );
  }

  return (
    <span
      role="img"
      aria-label={`${link.label} — placeholder, profile link not added yet`}
      title={`Placeholder: add the ${link.label} URL in src/config/social.ts`}
      data-placeholder="social-link"
      className={`${box} cursor-not-allowed border-dashed border-border text-subtle/60`}
    >
      <Icon className="h-4 w-4" />
    </span>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  function handleLinkClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (
      typeof window !== "undefined" &&
      window.location.pathname === "/" &&
      href.startsWith("/#")
    ) {
      e.preventDefault();
      const id = href.replace("/#", "");
      if (id === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(null, "", "/");
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", `#${id}`);
        }
      }
    }
  }

  return (
    <nav aria-label={title}>
      <h2 className="text-xs font-semibold tracking-[0.12em] uppercase text-foreground">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}-${link.href}`}>
            <Link
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm text-muted transition-colors hover:text-accent cursor-pointer"
            >
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
    /* force-dark = Deep Navy #0A1929 background */
    <footer className="force-dark border-t border-border">
      <Container className="pb-10 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Logo compact={false} />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {siteConfig.footerDescription}
            </p>
            <ul
              className="mt-6 flex items-center gap-2"
              aria-label="Social media"
            >
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <SocialItem link={link} />
                </li>
              ))}
            </ul>
            {hasPlaceholderSocials &&
            process.env.NODE_ENV !== "production" ? (
              <p className="mt-3 text-xs text-subtle">
                Dashed icons are placeholders — add real URLs in{" "}
                <code>src/config/social.ts</code>.
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn title="Navigation" links={mainNav} />
            <FooterColumn title="Services" links={footerServiceLinks} />
            <FooterColumn title="Legal" links={legalNav} />
          </div>
        </div>

        {/* Bottom bar — teal accent on copyright link */}
        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} STRATA Technologies. All rights
            reserved.
          </p>
          <p>
            Built with{" "}
            <span className="text-accent" aria-label="love">
              ♥
            </span>{" "}
            for growing businesses.
          </p>
        </div>
      </Container>
    </footer>
  );
}
