import type { Metadata } from "next";
import { siteConfig } from "@/data/config";
import TeklifClient from "./TeklifClient";

// İndirme / dönüşüm yardımcı sayfası: ana menüde yer almaz, aramada indekslenmez.
export const metadata: Metadata = {
  title: "Oto Servis Web Sitesi Teklifi",
  description: "Oto servis web sitesi paket teklifini PDF olarak indirin.",
  alternates: { canonical: "/teklif" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Oto Servis Web Sitesi Teklifi",
    description: "Oto servis web sitesi paket teklifini PDF olarak indirin.",
    url: `${siteConfig.siteUrl}/teklif`,
    locale: "tr_TR",
    type: "website",
  },
};

export default function TeklifPage() {
  return <TeklifClient />;
}
