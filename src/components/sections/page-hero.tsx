import Link from "next/link";
import { Enter } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";

interface PageHeroProps {
  title: string;
  description: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

/** Compact hero for inner pages with clean enterprise styling. */
export function PageHero({ title, description, breadcrumbs = [] }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative overflow-hidden border-b border-border bg-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="technical-dots absolute inset-0 opacity-60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgb(37 99 235 / 0.08), transparent 70%)",
          }}
        />
      </div>

      <Container className="relative z-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <Enter>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-card/85 px-4 py-1.5 text-xs text-muted shadow-xs backdrop-blur-sm">
              <li>
                <Link
                  href="/"
                  className="font-medium transition-colors hover:text-accent-text"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-muted/40">
                    /
                  </span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="font-medium transition-colors hover:text-accent-text"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={
                        index === breadcrumbs.length - 1 ? "page" : undefined
                      }
                      className="font-bold text-primary"
                    >
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Enter>
        <Enter delay={0.06}>
          <h1
            id="page-heading"
            className="max-w-4xl text-[clamp(2.4rem,5.5vw,4.25rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-primary"
          >
            {title}
          </h1>
        </Enter>
        <Enter delay={0.12}>
          <p className="mt-5 max-w-2xl text-[1.1rem] leading-relaxed text-muted">
            {description}
          </p>
        </Enter>
      </Container>
    </section>
  );
}
