import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const routes = [
    "",
    "/cozumler",
    "/cozumler/is-takip-sistemleri",
    "/cozumler/stok-cari-tahsilat",
    "/cozumler/operasyon-otomasyonlari",
    "/cozumler/saas-urun-altyapisi",
    "/projeler",
    "/projeler/stockapp",
    "/projeler/hezer-auto-service",
    "/projeler/carpass",
    "/projeler/saas-operasyon-altyapisi",
    "/surec",
    "/studyo",
    "/iletisim",
    "/gizlilik",
    "/kullanim-kosullari",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));
}
