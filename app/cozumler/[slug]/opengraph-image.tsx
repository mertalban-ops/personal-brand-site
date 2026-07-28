import { ImageResponse } from "next/og";
import { getSolutionBySlug } from "@/data/solutions";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug, "tr");
  const title = solution?.title ?? "Çözüm";
  const tagline = solution?.tagline ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            color: "#4ade80",
            fontSize: 13,
            letterSpacing: 6,
            marginBottom: 28,
            fontWeight: 600,
          }}
        >
          ALBANEXA · ÇÖZÜM
        </div>
        <div
          style={{
            color: "#f5f5f5",
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 840,
          }}
        >
          {title}
        </div>
        {tagline && (
          <div
            style={{
              color: "#888",
              fontSize: 22,
              marginTop: 28,
              maxWidth: 700,
            }}
          >
            {tagline}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            color: "#333",
            fontSize: 14,
            letterSpacing: 2,
          }}
        >
          www.albanexa.com
        </div>
      </div>
    ),
    { ...size }
  );
}
