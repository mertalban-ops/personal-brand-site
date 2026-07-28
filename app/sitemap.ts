import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const routes: { path: string; priority: number; freq: "monthly" | "weekly" | "yearly" }[] = [
    { path: "",                                        priority: 1.0, freq: "weekly" },
    { path: "/cozumler",                               priority: 0.9, freq: "monthly" },
    { path: "/cozumler/web-siteleri",                  priority: 0.9, freq: "monthly" },
    { path: "/cozumler/is-takip-sistemleri",           priority: 0.9, freq: "monthly" },
    { path: "/cozumler/stok-cari-tahsilat",            priority: 0.9, freq: "monthly" },
    { path: "/cozumler/operasyon-otomasyonlari",       priority: 0.8, freq: "monthly" },
    { path: "/cozumler/saas-urun-altyapisi",           priority: 0.8, freq: "monthly" },
    { path: "/projeler",                               priority: 0.8, freq: "monthly" },
    { path: "/projeler/stockapp",                      priority: 0.8, freq: "monthly" },
    { path: "/projeler/hezer-auto-service",            priority: 0.8, freq: "monthly" },
    { path: "/projeler/carpass",                       priority: 0.7, freq: "monthly" },
    { path: "/projeler/saas-operasyon-altyapisi",      priority: 0.7, freq: "monthly" },
    { path: "/surec",                                  priority: 0.7, freq: "monthly" },
    { path: "/studyo",                                 priority: 0.7, freq: "monthly" },
    { path: "/is-birligi",                             priority: 0.6, freq: "monthly" },
    { path: "/iletisim",                               priority: 0.8, freq: "monthly" },
    { path: "/rehber",                                 priority: 0.7, freq: "weekly" },
    { path: "/gizlilik",                               priority: 0.3, freq: "yearly" },
    { path: "/kullanim-kosullari",                     priority: 0.3, freq: "yearly" },
  ];

  return routes.map(({ path, priority, freq }) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));
}
