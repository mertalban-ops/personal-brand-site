import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";

// lastModified dates reflect actual content change dates, not build time.
// Update a page's date when its content materially changes.
const PAGES: {
  path: string;
  priority: number;
  freq: "monthly" | "weekly" | "yearly";
  lastModified: string;
}[] = [
  { path: "",                                          priority: 1.0, freq: "weekly",  lastModified: "2025-07-01" },
  { path: "/cozumler",                                 priority: 0.9, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/cozumler/web-siteleri",                    priority: 0.9, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/cozumler/web-uygulamalari",                priority: 0.9, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/cozumler/is-takip-sistemleri",             priority: 0.9, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/cozumler/stok-cari-tahsilat",              priority: 0.9, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/cozumler/operasyon-otomasyonlari",         priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/cozumler/saas-urun-altyapisi",             priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/projeler",                                 priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/projeler/stockapp",                        priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/projeler/hezer-auto-service",              priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/projeler/carpass",                         priority: 0.7, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/projeler/saas-operasyon-altyapisi",        priority: 0.7, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/surec",                                    priority: 0.7, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/studyo",                                   priority: 0.7, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/is-birligi",                               priority: 0.6, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/iletisim",                                 priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/rehber",                                   priority: 0.7, freq: "weekly",  lastModified: "2025-07-01" },
  { path: "/rehber/stok-takip-programi-kobiler-icin",        priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/rehber/cari-hesap-takip-sistemi-nedir",          priority: 0.8, freq: "monthly", lastModified: "2025-07-01" },
  { path: "/rehber/is-takip-sistemi-nedir-kobiler-icin",     priority: 0.8, freq: "monthly", lastModified: "2026-07-31" },
  { path: "/rehber/excel-yerine-ozel-stok-takip-sistemi",    priority: 0.8, freq: "monthly", lastModified: "2026-07-31" },
  { path: "/rehber/erp-alternatifi-kucuk-isletmeler-icin",   priority: 0.7, freq: "monthly", lastModified: "2026-07-31" },
  { path: "/rehber/web-uygulamasi-yaptirmak-surec-ve-maliyet", priority: 0.8, freq: "monthly", lastModified: "2026-07-31" },
  { path: "/rehber/whatsapp-is-takibi-neden-yanlis",            priority: 0.8, freq: "monthly", lastModified: "2026-07-31" },
  { path: "/rehber/ozel-yazilim-maliyeti-ve-fiyatlandirma",     priority: 0.8, freq: "monthly", lastModified: "2026-07-31" },
  { path: "/rehber/saas-urun-nasil-gelistirilir",                priority: 0.7, freq: "monthly", lastModified: "2026-07-31" },
  { path: "/gizlilik",                                 priority: 0.3, freq: "yearly",  lastModified: "2025-01-01" },
  { path: "/kvkk-aydinlatma",                          priority: 0.4, freq: "yearly",  lastModified: "2025-01-01" },
  { path: "/kullanim-kosullari",                       priority: 0.3, freq: "yearly",  lastModified: "2025-01-01" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  return PAGES.map(({ path, priority, freq, lastModified }) => ({
    url: `${base}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency: freq,
    priority,
  }));
}
