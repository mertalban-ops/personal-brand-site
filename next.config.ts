import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Removed projects
      { source: "/projeler/saas-operasyon-altyapisi", destination: "/projeler", permanent: true },
      { source: "/projeler/personal-brand-site", destination: "/projeler", permanent: true },
      { source: "/labs/saas-operasyon-altyapisi", destination: "/labs", permanent: true },
      { source: "/labs/personal-brand-site", destination: "/labs", permanent: true },
      {
        source: "/:path*",
        has: [{ type: "host", value: "albanexa.com" }],
        destination: "https://www.albanexa.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

