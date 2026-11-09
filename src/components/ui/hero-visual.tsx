"use client";

import { cn } from "@/lib/utils";

export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      aria-label="STRATA Technologies layered technology stack diagram"
      className={cn("relative mx-auto w-full max-w-[42rem] select-none", className)}
    >
      <style>{`
        @keyframes strata-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes strata-pulse-node {
          0%, 100% { opacity: 1; r: 5; }
          50% { opacity: 0.6; r: 7; }
        }
        @keyframes strata-dash {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -24; }
        }
        @keyframes strata-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes strata-ping {
          0% { opacity: 0.8; r: 4; }
          70% { opacity: 0; r: 10; }
          100% { opacity: 0; r: 10; }
        }
        @keyframes strata-layer-enter {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .strata-layer-1 { animation: strata-layer-enter 0.5s ease both 0.1s; }
        .strata-layer-2 { animation: strata-layer-enter 0.5s ease both 0.25s; }
        .strata-layer-3 { animation: strata-layer-enter 0.5s ease both 0.4s; }
        .strata-layer-4 { animation: strata-layer-enter 0.5s ease both 0.55s; }

        .strata-float { animation: strata-float 4s ease-in-out infinite; }
        .strata-float-slow { animation: strata-float 6s ease-in-out infinite 1s; }

        .strata-dash-anim {
          stroke-dasharray: 6 6;
          animation: strata-dash 1s linear infinite;
        }

        .strata-orbit-group {
          transform-origin: 310px 348px;
          animation: strata-orbit 8s linear infinite;
        }
        .strata-orbit-group-rev {
          transform-origin: 310px 348px;
          animation: strata-orbit 12s linear infinite reverse;
        }

        .strata-node-pulse {
          animation: strata-pulse-node 2.5s ease-in-out infinite;
        }
        .strata-ping {
          animation: strata-ping 2s ease-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 620 580"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-hidden="true"
      >
        {/* ── Definitions ───────────────────────────────── */}
        <defs>
          <linearGradient id="sg-plane-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eff6ff" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
          <linearGradient id="sg-plane-fill-dark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
          <filter id="sg-shadow" x="-10%" y="-10%" width="120%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#2563eb" floodOpacity="0.10" />
          </filter>
          <filter id="sg-glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ════════════════════════════════════════════════
            LAYER 1 — Interface (top)
            Isometric top face: parallelogram centred ~y=100
        ════════════════════════════════════════════════ */}
        <g className="strata-layer-1" filter="url(#sg-shadow)">
          {/* Top face */}
          <polygon
            points="310,48  510,160  310,200  110,160"
            fill="url(#sg-plane-fill)"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          {/* Left face */}
          <polygon
            points="110,160  310,200  310,230  110,190"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          {/* Right face */}
          <polygon
            points="510,160  310,200  310,230  510,190"
            fill="#bfdbfe"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Grid lines on top face */}
          <g stroke="#93c5fd" strokeWidth="0.8" opacity="0.6">
            {/* Horizontal rows — isometric lines going right */}
            <line x1="176" y1="140" x2="376" y2="180" />
            <line x1="142" y1="150" x2="342" y2="190" />
            {/* Vertical cols — isometric lines going left */}
            <line x1="376" y1="124" x2="176" y2="164" />
            <line x1="444" y1="142" x2="244" y2="182" />
          </g>

          {/* UI wireframe elements on top face */}
          {/* Header bar */}
          <rect
            x="330" y="90" width="130" height="22" rx="3"
            fill="#2563eb" opacity="0.85"
            transform="skewX(-30) translateX(60) skewY(0)"
            style={{ transform: "translate(10px,-20px) skewX(-30deg) skewY(10deg)" }}
          />
          {/* Two content blocks */}
          <rect
            x="210" y="130" width="70" height="38" rx="3"
            fill="none" stroke="#3b82f6" strokeWidth="1.5"
            style={{ transform: "translate(-10px,-12px) skewX(-30deg) skewY(10deg)" }}
          />
          <rect
            x="300" y="140" width="90" height="28" rx="3"
            fill="none" stroke="#93c5fd" strokeWidth="1.2"
            style={{ transform: "translate(5px,-8px) skewX(-30deg) skewY(10deg)" }}
          />

          {/* SVG-native isometric rects (simpler approach) */}
          {/* Header bar on plane */}
          <polygon points="340,88  450,114  450,124  340,98" fill="#2563eb" opacity="0.75" />
          {/* Content block A */}
          <polygon points="175,152  255,168  255,185  175,169" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Content block B */}
          <polygon points="265,165  350,181  350,194  265,178" fill="none" stroke="#93c5fd" strokeWidth="1.2" />
          {/* Small square */}
          <polygon points="365,175  405,183  405,193  365,185" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
        </g>

        {/* Label — Interface */}
        <g className="strata-layer-1" opacity="0.9">
          <line x1="510" y1="170" x2="540" y2="162" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="544" y="166" fontSize="13" fontWeight="600" fill="#475569" fontFamily="system-ui,sans-serif">Interface</text>
        </g>

        {/* ════════════════════════════════════════════════
            LAYER 2 — Software
        ════════════════════════════════════════════════ */}
        <g className="strata-layer-2 strata-float" filter="url(#sg-shadow)">
          {/* Top face */}
          <polygon
            points="310,255  510,310  310,350  110,310"
            fill="url(#sg-plane-fill)"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          {/* Left face */}
          <polygon
            points="110,310  310,350  310,380  110,340"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          {/* Right face */}
          <polygon
            points="510,310  310,350  310,380  510,340"
            fill="#bfdbfe"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Grid */}
          <g stroke="#93c5fd" strokeWidth="0.7" opacity="0.5">
            <line x1="176" y1="296" x2="376" y2="332" />
            <line x1="376" y1="278" x2="176" y2="318" />
            <line x1="444" y1="294" x2="244" y2="334" />
          </g>

          {/* Neural network nodes + edges on plane */}
          {/* Edges */}
          <g stroke="#2563eb" strokeWidth="1.4" opacity="0.7">
            <line x1="220" y1="310" x2="275" y2="295" />
            <line x1="275" y1="295" x2="310" y2="308" />
            <line x1="310" y1="308" x2="360" y2="295" />
            <line x1="310" y1="308" x2="345" y2="325" />
            <line x1="220" y1="310" x2="310" y2="308" />
            <line x1="360" y1="295" x2="400" y2="315" />
          </g>
          {/* Nodes */}
          <circle cx="220" cy="310" r="5" fill="#1d4ed8" filter="url(#sg-glow)" />
          <circle cx="275" cy="295" r="5" fill="#1d4ed8" filter="url(#sg-glow)" />
          <circle cx="310" cy="308" r="8" fill="#2563eb" filter="url(#sg-glow)" className="strata-node-pulse" />
          <circle cx="360" cy="295" r="5" fill="#1d4ed8" filter="url(#sg-glow)" />
          <circle cx="345" cy="325" r="4.5" fill="#3b82f6" filter="url(#sg-glow)" />
          <circle cx="400" cy="315" r="5" fill="#1d4ed8" filter="url(#sg-glow)" />
        </g>

        <g className="strata-layer-2" opacity="0.9">
          <line x1="510" y1="320" x2="540" y2="312" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="544" y="316" fontSize="13" fontWeight="600" fill="#475569" fontFamily="system-ui,sans-serif">Software</text>
        </g>

        {/* ════════════════════════════════════════════════
            LAYER 3 — Intelligence
        ════════════════════════════════════════════════ */}
        <g className="strata-layer-3 strata-float-slow" filter="url(#sg-shadow)">
          {/* Top face */}
          <polygon
            points="310,420  510,460  310,500  110,460"
            fill="url(#sg-plane-fill)"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          {/* Left face */}
          <polygon
            points="110,460  310,500  310,528  110,488"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.6"
          />
          {/* Right face */}
          <polygon
            points="510,460  310,500  310,528  510,488"
            fill="#bfdbfe"
            stroke="#2563eb"
            strokeWidth="1"
            strokeOpacity="0.6"
          />

          {/* Grid */}
          <g stroke="#93c5fd" strokeWidth="0.7" opacity="0.5">
            <line x1="176" y1="446" x2="376" y2="482" />
            <line x1="376" y1="428" x2="176" y2="468" />
            <line x1="444" y1="446" x2="244" y2="486" />
          </g>

          {/* Orbital ellipses */}
          <ellipse cx="310" cy="460" rx="80" ry="22"
            fill="none" stroke="#2563eb" strokeWidth="1.3" opacity="0.5" />
          <ellipse cx="310" cy="460" rx="50" ry="14"
            fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.6" />

          {/* Centre node */}
          <circle cx="310" cy="460" r="8" fill="#2563eb" filter="url(#sg-glow)" />
          <circle cx="310" cy="460" r="12" fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.4"
            className="strata-ping" />

          {/* Orbiting dot group 1 */}
          <g style={{ transformOrigin: "310px 460px", animation: "strata-orbit 7s linear infinite" }}>
            <circle cx="390" cy="460" r="5.5" fill="#1d4ed8" filter="url(#sg-glow)" />
          </g>
          {/* Orbiting dot group 2 */}
          <g style={{ transformOrigin: "310px 460px", animation: "strata-orbit 7s linear infinite", animationDelay: "-3.5s" }}>
            <circle cx="230" cy="460" r="4" fill="#3b82f6" filter="url(#sg-glow)" />
          </g>
          {/* Orbiting dot inner ring */}
          <g style={{ transformOrigin: "310px 460px", animation: "strata-orbit 5s linear infinite reverse" }}>
            <circle cx="360" cy="460" r="3.5" fill="#60a5fa" filter="url(#sg-glow)" />
          </g>
          {/* Side nodes on orbit */}
          <circle cx="230" cy="460" r="4.5" fill="#1d4ed8" opacity="0.5" />
          <circle cx="390" cy="460" r="4.5" fill="#1d4ed8" opacity="0.5" />
        </g>

        <g className="strata-layer-3" opacity="0.9">
          <line x1="510" y1="468" x2="540" y2="460" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="544" y="464" fontSize="13" fontWeight="600" fill="#475569" fontFamily="system-ui,sans-serif">Intelligence</text>
        </g>

        {/* ════════════════════════════════════════════════
            LAYER 4 — Data (bottom)
        ════════════════════════════════════════════════ */}
        <g className="strata-layer-4" filter="url(#sg-shadow)">
          {/* Top face — slightly lower */}
          <polygon
            points="310,540  490,572  310,580  130,572"
            fill="url(#sg-plane-fill-dark)"
            stroke="#2563eb"
            strokeWidth="1.5"
          />
          {/* Only a thin right face strip visible */}
          <polygon
            points="490,572  310,580  310,580  490,572"
            fill="#bfdbfe"
            stroke="#2563eb"
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />

          {/* Data block A */}
          <polygon points="175,562  290,572  290,576  175,566" fill="#2563eb" opacity="0.6" />
          {/* Data block B */}
          <polygon points="300,568  420,576  420,579  300,571" fill="#3b82f6" opacity="0.4" />
          {/* Small blocks */}
          <polygon points="175,556  235,561  235,562  175,557" fill="#93c5fd" opacity="0.5" />
          <polygon points="350,562  410,567  410,568  350,563" fill="#93c5fd" opacity="0.4" />
        </g>

        <g className="strata-layer-4" opacity="0.9">
          <line x1="490" y1="574" x2="540" y2="566" stroke="#94a3b8" strokeWidth="1.2" />
          <text x="544" y="570" fontSize="13" fontWeight="600" fill="#475569" fontFamily="system-ui,sans-serif">Data</text>
        </g>

        {/* ════════════════════════════════════════════════
            Vertical connecting dashed line
            Runs from centre of top plane to bottom plane
        ════════════════════════════════════════════════ */}
        <g className="strata-layer-1">
          {/* Dashed spine */}
          <line
            x1="310" y1="124"
            x2="310" y2="540"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="5 5"
            opacity="0.5"
            className="strata-dash-anim"
          />

          {/* Dot at Layer 1 junction */}
          <circle cx="310" cy="175" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
          {/* Dot at Layer 2 junction */}
          <circle cx="310" cy="308" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" className="strata-layer-2" />
          {/* Dot at Layer 3 junction */}
          <circle cx="310" cy="460" r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" className="strata-layer-3" />
          {/* Dot at Layer 4 junction */}
          <circle cx="310" cy="554" r="3.5" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" className="strata-layer-4" />
        </g>
      </svg>
    </div>
  );
}
