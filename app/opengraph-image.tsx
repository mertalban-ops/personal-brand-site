import { ImageResponse } from "next/og";

export const alt = "Albanexa — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OgImage() {
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
            fontSize: 14,
            letterSpacing: 6,
            marginBottom: 28,
            fontWeight: 600,
          }}
        >
          ALBANEXA
        </div>
        <div
          style={{
            color: "#f5f5f5",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 840,
          }}
        >
          Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler
        </div>
        <div
          style={{
            color: "#555",
            fontSize: 20,
            marginTop: 36,
          }}
        >
          KOBİ&apos;ler için işletmeye özel yazılım çözümleri
        </div>
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
