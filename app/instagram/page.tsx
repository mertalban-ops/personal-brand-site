import type { Metadata } from "next";
import { siteConfig } from "@/data/config";
import InstagramClient from "./InstagramClient";

// Instagram profil/Reels trafiği için karşılama sayfası: ana menüde yer almaz, aramada indekslenmez.
export const metadata: Metadata = {
  title: "Instagram'dan Gelenler İçin",
  description: "Web sitesi, stok ve cari takibi ya da otomasyon: ihtiyacını seç, WhatsApp'tan tek mesajla yaz.",
  alternates: { canonical: "/instagram" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Albanexa · Instagram",
    description: "İhtiyacını seç, WhatsApp'tan tek mesajla yaz.",
    url: `${siteConfig.siteUrl}/instagram`,
    locale: "tr_TR",
    type: "website",
  },
};

export default function InstagramPage() {
  return <InstagramClient />;
}
