"use client";

import Link from "next/link";
import { Globe, Boxes, Workflow, Wrench, MessageCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/data/config";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@vercel/analytics";
import { trackContact } from "@/lib/meta-events";

// Reels/carousel'lerdeki yorum anahtar kelimeleriyle birebir aynı (SITE, STOK, OTOMASYON, DEMO).
// WhatsApp mesajı anahtar kelimeyi taşır → DM akışında hangi içerikten gelindiği bilinir.
type Option = { key: string; icon: typeof Globe; title: string; desc: string; link?: { href: string; label: string } };

const labels = {
  tr: {
    kicker: "Instagram'dan geldin",
    title: "Neye ihtiyacın var?",
    desc: "Birini seç, WhatsApp'tan hazır mesajla yaz. Kısa bir iki soruyla sana uygun kapsamı ve fiyatı çıkaralım.",
    wa: "WhatsApp'tan yaz",
    msg: (k: string) => `Merhaba, Instagram'dan geliyorum – ${k}`,
    analysis: "Emin değilsen 30 dakikalık ücretsiz ihtiyaç analiziyle başlayalım.",
    analysisCta: "Ücretsiz ihtiyaç analizi",
    options: [
      { key: "SITE", icon: Globe, title: "Web sitesi", desc: "Google'da bulunmak, işini net anlatmak, tek dokunuşla aranmak.", link: { href: "/oto-servis-web-sitesi", label: "Oto servis paketleri" } },
      { key: "STOK", icon: Boxes, title: "Stok & cari takibi", desc: "Excel yerine stok, bakiye ve tahsilatı tek ekranda görmek.", link: { href: "/projeler/stockapp", label: "StockApp vakası" } },
      { key: "OTOMASYON", icon: Workflow, title: "Otomasyon", desc: "WhatsApp siparişleri, teklif taslakları, raporlar: tekrar eden işleri azaltmak." },
      { key: "DEMO", icon: Wrench, title: "Oto servis sistemi", desc: "Araç kabulden teslime, iş emri ve servis geçmişi tek sistemde.", link: { href: "/projeler/hezer-auto-service", label: "Hezer vakası" } },
    ] as Option[],
  },
  en: {
    kicker: "Coming from Instagram",
    title: "What do you need?",
    desc: "Pick one and message us on WhatsApp with a ready-made text. A couple of quick questions and we'll outline scope and price.",
    wa: "Message on WhatsApp",
    msg: (k: string) => `Hi, I'm coming from Instagram – ${k}`,
    analysis: "Not sure yet? Start with a free 30-minute discovery call.",
    analysisCta: "Free discovery call",
    options: [
      { key: "SITE", icon: Globe, title: "Website", desc: "Be found on Google, explain your business clearly, get called in one tap.", link: { href: "/oto-servis-web-sitesi", label: "Auto repair packages" } },
      { key: "STOK", icon: Boxes, title: "Inventory & accounts", desc: "Stock, balances and collections on one screen instead of Excel.", link: { href: "/projeler/stockapp", label: "StockApp case" } },
      { key: "OTOMASYON", icon: Workflow, title: "Automation", desc: "WhatsApp orders, quote drafts, reports: cut the repetitive work." },
      { key: "DEMO", icon: Wrench, title: "Auto service system", desc: "Vehicle intake to delivery, work orders and service history in one system.", link: { href: "/projeler/hezer-auto-service", label: "Hezer case" } },
    ] as Option[],
  },
  de: {
    kicker: "Von Instagram",
    title: "Was brauchst du?",
    desc: "Wähle eine Option und schreib uns per WhatsApp mit einer vorbereiteten Nachricht. Ein, zwei kurze Fragen und wir skizzieren Umfang und Preis.",
    wa: "Per WhatsApp schreiben",
    msg: (k: string) => `Hallo, ich komme von Instagram – ${k}`,
    analysis: "Noch unsicher? Starte mit einer kostenlosen 30-minütigen Bedarfsanalyse.",
    analysisCta: "Kostenlose Bedarfsanalyse",
    options: [
      { key: "SITE", icon: Globe, title: "Website", desc: "Bei Google gefunden werden, das Geschäft klar zeigen, mit einem Tipp angerufen werden.", link: { href: "/oto-servis-web-sitesi", label: "Werkstatt-Pakete" } },
      { key: "STOK", icon: Boxes, title: "Lager & Konten", desc: "Bestand, Salden und Zahlungen auf einem Bildschirm statt in Excel.", link: { href: "/projeler/stockapp", label: "StockApp-Fall" } },
      { key: "OTOMASYON", icon: Workflow, title: "Automatisierung", desc: "WhatsApp-Bestellungen, Angebotsentwürfe, Berichte: weniger Wiederholung." },
      { key: "DEMO", icon: Wrench, title: "Werkstattsystem", desc: "Fahrzeugannahme bis Übergabe, Aufträge und Servicehistorie in einem System.", link: { href: "/projeler/hezer-auto-service", label: "Hezer-Fall" } },
    ] as Option[],
  },
};

export default function InstagramClient() {
  const { language } = useLanguage();
  const L = labels[language] ?? labels.tr;
  const wa = (k: string) => `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(L.msg(k))}`;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-2xl px-5">
          <div className="text-center">
            <p className="mono-label mb-4">{L.kicker}</p>
            <h1 className="display text-3xl font-bold text-ink md:text-4xl text-balance">{L.title}</h1>
            <p className="mx-auto mt-5 max-w-lg text-muted">{L.desc}</p>
          </div>

          <div className="mt-10 space-y-4">
            {L.options.map(({ key, icon: Icon, title, desc, link }) => (
              <div key={key} className="rounded-xl border border-line bg-bg-raised/20 p-5">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="display text-lg font-bold text-ink">{title}</h2>
                    <p className="mt-1 text-sm text-muted">{desc}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={wa(key)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => { try { track("cta_instagram_whatsapp", { keyword: key }); trackContact(); } catch {} }}
                        className="btn-shine inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
                      >
                        <MessageCircle className="h-4 w-4" /> {L.wa}
                      </a>
                      {link && (
                        <Link href={link.href} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent">
                          {link.label} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-line bg-bg-raised/10 p-5 text-center">
            <p className="text-sm text-ink">{L.analysis}</p>
            <a
              href={wa("TEKLIF")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { track("cta_instagram_whatsapp", { keyword: "TEKLIF" }); trackContact(); } catch {} }}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {L.analysisCta} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
