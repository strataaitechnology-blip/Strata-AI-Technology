"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section aria-labelledby="error-heading">
      <Container className="flex min-h-[70dvh] flex-col items-start justify-center py-24">
        <h1 id="error-heading" className="text-3xl font-semibold text-foreground sm:text-4xl">
          Something went wrong.
        </h1>
        <p className="mt-4 max-w-md text-lg text-muted">
          An unexpected error stopped this page from loading. You can try again, or return to the homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            Try Again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Back to Home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
