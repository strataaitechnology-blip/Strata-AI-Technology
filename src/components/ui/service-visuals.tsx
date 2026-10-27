import type { ReactNode } from "react";
import { Check, MousePointer2 } from "lucide-react";
import { FlowDiagram } from "@/components/ui/flow-diagram";
import { aiSystemFlow, agenticFlow } from "@/data/services";
import type { ServiceVisualId } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Small, purely decorative illustrations — one per service. Built from
 * theme tokens so they work in light, dark and force-dark contexts.
 */

function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface", className)}
    >
      <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6">{children}</div>
    </div>
  );
}

const bar = "h-1.5 bg-border-strong";
const dot = "h-2 w-2 bg-border-strong";

function SoftwareVisual() {
  return (
    <div className="w-full max-w-[26rem] overflow-hidden rounded-lg border border-border-strong bg-card shadow-panel">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className={dot} />
        <span className={dot} />
        <span className={dot} />
        <span className="ml-2 font-mono text-[10px] text-subtle">orders.ts</span>
      </div>
      <pre className="overflow-hidden p-3 font-mono text-[10.5px] leading-[1.75] text-muted sm:text-[11px]">
        <code>
          <span className="block">
            <span className="text-accent-text">export async function</span> createOrder(input) {"{"}
          </span>
          <span className="block pl-4">
            <span className="text-accent-text">const</span> order = <span className="text-accent-text">await</span> db.orders.create(input);
          </span>
          <span className="block pl-4">
            <span className="text-accent-text">await</span> events.publish(&quot;order.created&quot;, order);
          </span>
          <span className="block pl-4">
            <span className="text-accent-text">return</span> order;
          </span>
          <span className="block">{"}"}</span>
        </code>
      </pre>
      <div className="flex items-center justify-between border-t border-border px-3 py-1.5 text-[10px] text-subtle">
        <span className="flex items-center gap-1.5 text-success">
          <Check className="h-3 w-3" strokeWidth={2.5} /> All checks passed
        </span>
        <span>TypeScript</span>
      </div>
    </div>
  );
}

function WebVisual() {
  return (
    <div className="w-full max-w-[26rem] overflow-hidden rounded-lg border border-border-strong bg-card shadow-panel">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className={dot} />
        <span className={dot} />
        <span className={dot} />
        <span className="ml-3 flex-1 rounded-full bg-surface px-3 py-0.5 text-[10px] text-subtle">yourbrand.com</span>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <span className="h-2.5 w-14 rounded-full bg-foreground/80" />
          <span className="flex gap-2">
            <span className={cn(bar, "w-8")} />
            <span className={cn(bar, "w-8")} />
            <span className={cn(bar, "w-8")} />
          </span>
        </div>
        <div className="space-y-2 pt-2">
          <span className="block h-3 w-3/4 rounded-full bg-foreground/85" />
          <span className="block h-3 w-1/2 rounded-full bg-foreground/85" />
          <span className="mt-3 block h-1.5 w-2/3 rounded-full bg-border-strong" />
        </div>
        <span className="block h-7 w-24 rounded-md bg-accent" />
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-12 rounded-md border border-border bg-surface" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Phone({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "aspect-[9/17] h-[92%] rounded-[1.4rem] border-2 border-border-strong bg-card p-2 shadow-panel",
        className
      )}
    >
      <span className="mx-auto mb-2 block h-1 w-8 rounded-full bg-border-strong" />
      {children}
    </div>
  );
}

function MobileVisual() {
  return (
    <div className="flex h-full items-center justify-center">
      <Phone className="-mr-3 -rotate-6">
        <div className="space-y-1.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-md bg-surface p-1.5">
              <span className={cn("h-4 w-4 shrink-0 rounded-full", i === 0 ? "bg-accent" : "bg-border-strong")} />
              <span className="flex-1 space-y-1">
                <span className={cn(bar, "block w-4/5")} />
                <span className={cn(bar, "block w-1/2 opacity-60")} />
              </span>
            </div>
          ))}
        </div>
      </Phone>
      <Phone className="mt-4 rotate-3">
        <span className="mb-2 block h-8 rounded-md bg-accent-soft" />
        <div className="flex h-16 items-end gap-1.5 px-1">
          {[40, 65, 50, 85, 60].map((h, i) => (
            <span key={i} className="flex-1 rounded-t-sm bg-accent" style={{ height: `${h}%`, opacity: 0.35 + i * 0.13 }} />
          ))}
        </div>
        <span className={cn(bar, "mt-3 block w-3/4")} />
      </Phone>
    </div>
  );
}

function DesignVisual() {
  return (
    <div className="flex w-full max-w-[26rem] items-center justify-between gap-3">
      <div className="w-[42%] space-y-2 rounded-lg border border-dashed border-border-strong bg-card/60 p-3">
        <span className="block h-8 rounded border border-dashed border-border-strong" />
        <span className={cn(bar, "block w-full")} />
        <span className={cn(bar, "block w-2/3")} />
        <span className="block h-5 w-1/2 rounded border border-dashed border-border-strong" />
      </div>
      <MousePointer2 className="h-5 w-5 shrink-0 text-accent-text" strokeWidth={1.75} />
      <div className="w-[46%] space-y-2 rounded-lg border border-border-strong bg-card p-3 shadow-panel">
        <span className="block h-8 rounded bg-accent" />
        <span className="block h-1.5 w-full rounded-full bg-foreground/70" />
        <span className="block h-1.5 w-2/3 rounded-full bg-foreground/40" />
        <span className="flex items-center gap-1.5 pt-1">
          <span className="h-3.5 w-3.5 rounded-full bg-accent" />
          <span className="h-3.5 w-3.5 rounded-full bg-accent-text" />
          <span className="h-3.5 w-3.5 rounded-full bg-foreground" />
        </span>
      </div>
    </div>
  );
}

function AgenticVisual() {
  const log = [
    { text: "Request received", done: true },
    { text: "Customer record checked", done: true },
    { text: "Reply drafted, awaiting approval", done: false },
  ];
  return (
    <div className="w-full max-w-[28rem] space-y-5">
      <FlowDiagram steps={agenticFlow} variant="compact" emphasizeFirst label="Agentic AI flow" />
      <div className="space-y-1.5 rounded-lg border border-border-strong bg-card p-3 shadow-panel">
        {log.map((entry) => (
          <p key={entry.text} className="flex items-center gap-2 text-[11px] text-muted">
            <span
              className={cn(
                "flex h-3.5 w-3.5 items-center justify-center rounded-full",
                entry.done ? "bg-success/15 text-success" : "bg-accent-soft text-accent-text"
              )}
            >
              {entry.done ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-accent-text" />}
            </span>
            {entry.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function AiSystemsVisual() {
  return (
    <div className="w-full max-w-[28rem] space-y-5">
      <FlowDiagram steps={aiSystemFlow} variant="compact" label="AI-based system flow" />
      <div className="rounded-lg border border-border-strong bg-card p-3 shadow-panel">
        <svg viewBox="0 0 200 60" className="h-16 w-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="ai-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--accent)", stopOpacity: 0.35 }} />
              <stop offset="100%" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <path d="M0 48 L25 42 L50 46 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14 L200 60 L0 60Z" fill="url(#ai-area)" />
          <path
            d="M0 48 L25 42 L50 46 L75 30 L100 34 L125 20 L150 24 L175 10 L200 14"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ stroke: "var(--accent-text)" }}
          />
        </svg>
      </div>
    </div>
  );
}

const visuals: Record<ServiceVisualId, () => ReactNode> = {
  software: SoftwareVisual,
  web: WebVisual,
  mobile: MobileVisual,
  design: DesignVisual,
  agentic: AgenticVisual,
  "ai-systems": AiSystemsVisual,
};

export function ServiceVisual({ id }: { id: ServiceVisualId }) {
  const Visual = visuals[id];
  return (
    <Frame>
      <Visual />
    </Frame>
  );
}
