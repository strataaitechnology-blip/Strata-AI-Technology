import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated social preview (1200×630). Uses the built-in font, no network. */
export default function OpengraphImage() {
  const plates = [0, 1, 2, 3];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #050b19 0%, #0a1a3f 100%)",
          color: "#f1f5ff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 30, fontWeight: 700, letterSpacing: 2 }}>
            <div style={{ width: 22, height: 22, background: "#1d5cf0", transform: "rotate(45deg)", marginRight: 18 }} />
            STRATA
            <span style={{ marginLeft: 12, fontWeight: 400, color: "#a3b2cf" }}>Technologies</span>
          </div>
          <div style={{ marginTop: 44, fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Technology That Builds What&apos;s Next.
          </div>
          <div style={{ marginTop: 32, fontSize: 28, color: "#a3b2cf" }}>Software, AI &amp; Digital Solutions</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {plates.map((plate) => (
            <div
              key={plate}
              style={{
                width: 220,
                height: 58,
                marginTop: plate === 0 ? 0 : -18,
                background: plate === 0 ? "#1d5cf0" : `rgba(60,120,255,${0.3 - plate * 0.06})`,
                border: "2px solid rgba(120,168,255,0.6)",
                borderRadius: 6,
                transform: "skewX(-24deg)",
              }}
            />
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
