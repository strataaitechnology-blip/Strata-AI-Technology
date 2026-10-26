import Link from "next/link";
import { Enter } from "@/components/animations/reveal";
import { Container } from "@/components/ui/container";

interface PageHeroProps {
  title: string;
  description: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

/** Compact hero for inner pages. Renders the page's single <h1>. */
export function PageHero({ title, description, breadcrumbs = [] }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-heading"
      className="relative border-b border-border bg-surface"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-dot-grid absolute inset-0 opacity-50" />
      </div>
      <Container className="pb-14 pt-12 sm:pb-18 sm:pt-16 lg:pb-20 lg:pt-18">
        <Enter>
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-accent-text"
                >
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-border-strong">
                    /
                  </span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-accent-text"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={
                        index === breadcrumbs.length - 1 ? "page" : undefined
                      }
                      className="text-primary font-medium"
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
            className="max-w-4xl text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary"
          >
            {title}
          </h1>
        </Enter>
        <Enter delay={0.12}>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
            {description}
          </p>
        </Enter>
      </Container>
    </section>
  );
}
