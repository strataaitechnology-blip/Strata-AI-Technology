import { TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { LEGAL_REVIEW_NOTICE } from "@/data/legal";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/utils";
import type { LegalSection } from "@/types";

interface LegalDocumentProps {
  sections: LegalSection[];
}

/** Renders a long-form legal page with a table of contents. */
export function LegalDocument({ sections }: LegalDocumentProps) {
  return (
    <section aria-label="Document" className="py-14 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-20">
        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-sm font-semibold text-foreground">On this page</p>
            <ol className="mt-4 space-y-2.5 border-l border-border pl-4 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-muted transition-colors hover:text-accent-text">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="max-w-2xl">
          <p className="text-sm text-subtle">Last updated: {formatDate(siteConfig.legal.lastUpdated)}</p>
          <p
            role="note"
            className="mt-5 flex items-start gap-3 rounded-xl border border-dashed border-border-strong bg-surface px-4 py-3.5 text-sm text-muted"
          >
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-accent-text" aria-hidden="true" />
            {LEGAL_REVIEW_NOTICE}
          </p>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`} className="text-2xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list ? (
                    <ul className="space-y-2.5">
                      {section.list.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
