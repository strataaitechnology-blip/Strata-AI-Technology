import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 -z-10 opacity-50"
      />
      <Container className="flex min-h-[70dvh] flex-col items-start justify-center py-24">
        {/* Large faded 404 — uses primary/20 for a navy tint */}
        <p
          aria-hidden="true"
          className="font-display text-[6rem] font-semibold leading-none tracking-tighter text-primary/10 select-none sm:text-[9rem]"
        >
          404
        </p>
        <h1
          id="not-found-heading"
          className="mt-4 text-2xl font-semibold text-primary sm:text-3xl"
        >
          This page isn&apos;t part of the stack.
        </h1>
        <p className="mt-4 max-w-md text-muted">
          The page you are looking for may have moved or never existed. Head
          back and try again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to Home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary" size="lg">
            Contact Us
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
