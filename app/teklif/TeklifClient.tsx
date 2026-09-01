"use client";

import Link from "next/link";
import { Download, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { siteConfig } from "@/data/config";
import { getOtoServis, events, teklifPdfPath } from "@/data/oto-servis";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@vercel/analytics";
import { trackLead, trackContact } from "@/lib/meta-events";

const labels = {
  tr: {
    kicker: "Teklif",
    title: "Oto servis web sitesi teklifi",
    desc: "Paketleri ve fiyatları PDF olarak indirebilirsin. Sorun olursa WhatsApp'tan yaz, birlikte bakalım.",
    download: "Teklifi PDF indir",
    highlight: "En çok tercih edilen",
    vat: "Fiyatlara KDV dahil değildir.",
    whatsapp: "WhatsApp'tan yaz",
    details: "Tüm ayrıntılar",
  },
  en: {
    kicker: "Offer",
    title: "Auto repair shop website offer",
    desc: "Download the packages and prices as a PDF. If you have any questions, message us on WhatsApp and we'll look together.",
    download: "Download offer PDF",
    highlight: "Most popular",
    vat: "Prices exclude VAT.",
    whatsapp: "Message on WhatsApp",
    details: "All details",
  },
  de: {
    kicker: "Angebot",
    title: "Angebot für die Werkstatt-Website",
    desc: "Lade Pakete und Preise als PDF herunter. Bei Fragen schreib uns per WhatsApp, wir schauen gemeinsam.",
    download: "Angebot als PDF",
    highlight: "Am beliebtesten",
    vat: "Preise verstehen sich ohne MwSt.",
    whatsapp: "Per WhatsApp schreiben",
    details: "Alle Details",
  },
};

export default function TeklifClient() {
  const { language } = useLanguage();
  const c = getOtoServis(language);
  const L = labels[language] ?? labels.tr;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-40">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-2xl px-5 text-center">
          <p className="mono-label mb-4">{L.kicker}</p>
          <h1 className="display text-3xl font-bold text-ink md:text-4xl text-balance">{L.title}</h1>
          <p className="mx-auto mt-5 max-w-lg text-muted">{L.desc}</p>

          <a
            href={teklifPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { try { track(events.teklifIndir); trackLead(); } catch {} }}
            className="btn-shine glow-accent mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <Download className="h-4 w-4" /> {L.download}
          </a>

          {/* Özet */}
          <div className="mt-12 space-y-4 text-left">
            {c.packages.map((p) => (
              <div key={p.id} className="rounded-xl border border-line bg-bg-raised/20 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="display text-lg font-bold text-ink">
                    {p.name}
                    {p.highlight && (
                      <span className="ml-2 rounded-md bg-accent/10 px-2 py-0.5 text-[0.6rem] font-semibold text-accent">
                        {L.highlight}
                      </span>
                    )}
                  </h2>
                  <span className="text-xl font-bold text-accent">{p.priceLabel}</span>
                </div>
                <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  {p.deliveryDays} · {p.revisions}
                </p>
              </div>
            ))}
            <div className="rounded-xl border border-line bg-bg-raised/10 p-4 text-center text-sm text-ink">
              <span className="font-bold text-accent">{c.maintenance.priceLabel}</span> — {c.maintenance.desc}
            </div>
            <p className="text-center text-xs text-faint">{L.vat}</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(c.waMessages.general)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { track(events.whatsapp); trackContact(); } catch {} }}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" /> {L.whatsapp}
            </a>
            <Link
              href="/oto-servis-web-sitesi"
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              {L.details} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
