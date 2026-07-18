import { ImageResponse } from "next/og";
import { siteLogoPath } from "@/lib/site";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const title = searchParams.get("title") ?? "Somanath Studio";
  const subtitle =
    searchParams.get("subtitle") ??
    "SaaS MVP Development, Performance Optimization, and Production Readiness";

  const logoData = await fetch(new URL(siteLogoPath, origin)).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #050505 0%, #121018 45%, #1b1230 100%)",
          color: "white",
          padding: "64px",
        }}
      >
        <img
          src={logoData as unknown as string}
          alt="Somanath Studio"
          height={72}
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              fontWeight: 700,
              maxWidth: "95%",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.85,
              maxWidth: "85%",
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        </div>
        <div
          style={{
            fontSize: 24,
            opacity: 0.8,
          }}
        >
          somanathkhadanga.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
