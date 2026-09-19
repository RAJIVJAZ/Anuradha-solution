import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "nodejs";

/**
 * Open Graph card generator.
 *
 * Built from the design tokens so a shared link looks like the site: ink
 * background, serif headline, saffron rule. Kept deliberately typographic —
 * OG images are usually rendered at 300px wide in a chat app, where anything
 * detailed is illegible.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? site.name).slice(0, 120);
  const subtitle = (searchParams.get("subtitle") ?? site.tagline).slice(0, 90);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#04101c",
          padding: "68px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: "#ecad5c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#04101c",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#ffffff", fontSize: 26, letterSpacing: -0.5 }}>Anuradha</span>
            <span style={{ color: "#7d8d9d", fontSize: 13, letterSpacing: 4 }}>SOLUTIONS</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: title.length > 70 ? 54 : 66,
              lineHeight: 1.1,
              letterSpacing: -1.6,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 34 }}>
            <div style={{ width: 64, height: 4, background: "#ecad5c" }} />
            <div style={{ color: "#a8b6c4", fontSize: 26 }}>{subtitle}</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#5b6b7b",
            fontSize: 20,
            borderTop: "1px solid #143a5b",
            paddingTop: 24,
          }}
        >
          <span>anuradhasolutions.in</span>
          <span>MSME · Manufacturing · Dairy · Food processing</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
