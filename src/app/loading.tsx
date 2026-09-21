import { LogoMark } from "@/components/ui/logo";

export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
      <LogoMark className="h-12 w-12 animate-pulse" />
      <p className="text-sm text-muted">Loading…</p>
    </div>
  );
}
