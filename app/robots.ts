import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://personal-brand-site-azure.vercel.app/sitemap.xml",
  };
}
