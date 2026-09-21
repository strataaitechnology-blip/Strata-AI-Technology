import type { CSSProperties } from "react";

/**
 * The hero illustration: four isometric "strata" — Interface, Software,
 * Intelligence and Data — joined by a spine of flowing data.
 *
 * Pure SVG + CSS (no client JS). Colors come from theme tokens through the
 * `.hv-*` classes in globals.css, so it re-themes automatically.
 */

const W = 210; // half width of a plate
const H = 100; // half height of a plate
const T = 14; // plate thickness
const CX = 320; // horizontal center in the viewBox
const PLATE_Y = [118, 250, 382, 514] as const;
const LABELS = ["Interface", "Software", "Intelligence", "Data"] as const;

type Point = [number, number];

/** Map plate coordinates (a, b ∈ 0..1) to isometric screen coordinates. */
const iso = (a: number, b: number): Point => [(a - b) * W, (a + b - 1) * H];
const points = (list: Point[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const tile = (a0: number, b0: number, a1: number, b1: number) =>
  points([iso(a0, b0), iso(a1, b0), iso(a1, b1), iso(a0, b1)]);
const line = ([x1, y1]: Point, [x2, y2]: Point) => `M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`;

const gridPaths = [0.25, 0.5, 0.75].flatMap((k) => [line(iso(k, 0), iso(k, 1)), line(iso(0, k), iso(1, k))]).join("");

function Plate({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <polygon className="hv-side-l" points={`${-W},0 0,${H} 0,${H + T} ${-W},${T}`} />
      <polygon className="hv-side-r" points={`${W},0 0,${H} 0,${H + T} ${W},${T}`} />
      <polygon className="hv-top" points={`0,${-H} ${W},0 0,${H} ${-W},0`} />
      <path className="hv-grid" d={gridPaths} />
      {children}
    </>
  );
}

/** Software plate: a small graph of services and their links. */
const nodes: Record<string, Point> = {
  a: iso(0.2, 0.7),
  b: iso(0.5, 0.5),
  c: iso(0.8, 0.7),
  d: iso(0.5, 0.86),
};
const links: Array<[string, string]> = [
  ["a", "b"],
  ["b", "c"],
  ["b", "d"],
  ["a", "d"],
  ["c", "d"],
];

/** Intelligence plate: concentric rings with orbiting nodes. */
const orbit = [20, 140, 262].map((deg): Point => {
  const rad = (deg * Math.PI) / 180;
  return [Math.cos(rad) * 78, 16 + Math.sin(rad) * 31];
});

export function HeroVisual({ className }: { className?: string }) {
  const spineTop = PLATE_Y[0];
  const spineBottom = PLATE_Y[3];
  const packetStyle = (delay: string): CSSProperties =>
    ({ "--travel": `${spineBottom - spineTop}px`, "--d": delay }) as CSSProperties;

  return (
    <svg
      viewBox="0 0 680 650"
      role="img"
      aria-label="Illustration of four stacked technology layers — interface, software, intelligence and data — connected by flowing data."
      className={className}
    >
      <defs>
        <radialGradient id="hv-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--glow)" }} />
          <stop offset="100%" style={{ stopColor: "var(--glow)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>

      <g className="hv-float">
        <ellipse cx={CX} cy={340} rx={330} ry={280} fill="url(#hv-glow)" />

        {/* Draw from the bottom layer up so upper layers overlap correctly. */}
        {[3, 2, 1, 0].map((index) => (
          <g key={index} transform={`translate(${CX} ${PLATE_Y[index]})`}>
            <g className={`hv-layer-${index}`}>
              {index === 0 && (
                <Plate>
                  <polygon className="hv-tile-accent" points={tile(0.16, 0.16, 0.84, 0.27)} />
                  <polygon className="hv-tile" points={tile(0.16, 0.35, 0.6, 0.84)} />
                  <polygon className="hv-tile" points={tile(0.68, 0.35, 0.84, 0.57)} />
                  <polygon className="hv-tile" points={tile(0.68, 0.64, 0.84, 0.84)} />
                </Plate>
              )}

              {index === 1 && (
                <Plate>
                  {links.map(([from, to]) => (
                    <path key={`${from}${to}`} className="hv-link" d={line(nodes[from], nodes[to])} />
                  ))}
                  {Object.entries(nodes).map(([key, [x, y]]) => (
                    <circle key={key} className="hv-node" cx={x} cy={y} r={key === "b" ? 8 : 6} />
                  ))}
                </Plate>
              )}

              {index === 2 && (
                <Plate>
                  <ellipse className="hv-ring" cx={0} cy={16} rx={78} ry={31} />
                  <ellipse className="hv-ring" cx={0} cy={16} rx={46} ry={18} />
                  {orbit.map(([x, y]) => (
                    <path key={`${x}${y}`} className="hv-link" d={`M0 16L${x.toFixed(1)} ${y.toFixed(1)}`} />
                  ))}
                  {orbit.map(([x, y]) => (
                    <circle key={`n${x}${y}`} className="hv-node" cx={x} cy={y} r={5} />
                  ))}
                  <circle className="hv-node" cx={0} cy={16} r={9} />
                </Plate>
              )}

              {index === 3 && (
                <Plate>
                  <polygon className="hv-tile" points={tile(0.28, 0.5, 0.72, 0.6)} />
                  <polygon className="hv-tile" points={tile(0.28, 0.64, 0.72, 0.74)} />
                  <polygon className="hv-tile-accent" points={tile(0.28, 0.78, 0.72, 0.88)} />
                </Plate>
              )}
            </g>
          </g>
        ))}

        {/* The spine: data flowing down through every layer. */}
        <g transform={`translate(${CX} 0)`}>
          <line className="hv-flow" x1={0} y1={spineTop} x2={0} y2={spineBottom} />
          {PLATE_Y.map((y) => (
            <g key={y}>
              <circle className="hv-pulse" cx={0} cy={y} r={7} />
              <circle className="hv-node" cx={0} cy={y} r={5} />
            </g>
          ))}
          <circle className="hv-packet" cx={0} cy={spineTop} r={3.5} style={packetStyle("0s")} />
          <circle className="hv-packet" cx={0} cy={spineTop} r={3.5} style={packetStyle("2.1s")} />
        </g>

        {/* Layer labels (hidden on very small screens, where they would be tiny). */}
        {PLATE_Y.map((y, index) => (
          <g key={LABELS[index]} className="max-sm:hidden">
            <line x1={CX + W + 10} y1={y + T / 2} x2={CX + W + 34} y2={y + T / 2} stroke="var(--layer-stroke-strong)" strokeWidth={1} />
            <text
              x={CX + W + 42}
              y={y + T / 2 + 4.5}
              fontSize={13}
              fontWeight={500}
              style={{ fill: "var(--muted)", fontFamily: "var(--font-sans)" }}
            >
              {LABELS[index]}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
