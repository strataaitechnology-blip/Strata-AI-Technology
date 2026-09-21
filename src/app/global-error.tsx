"use client";

import "./globals.css";

/** Last-resort boundary: replaces the root layout, so it renders its own <html>. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-3xl font-semibold">Something went wrong.</h1>
          <p className="max-w-md text-muted">The site hit an unexpected problem. Please try again.</p>
          <button
            type="button"
            onClick={reset}
            className="h-11 rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground"
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
