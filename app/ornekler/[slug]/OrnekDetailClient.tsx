"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Phone, Clock, MapPin, Info, CheckCircle2, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { getOrnek, disclaimer, ornekLabels } from "@/data/ornekler";
import { siteConfig } from "@/data/config";
import { getOtoServis, events } from "@/data/oto-servis";
import { useLanguage } from "@/context/LanguageContext";
import { track } from "@vercel/analytics";
import { trackContact } from "@/lib/meta-events";

export default function OrnekDetailClient({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const o = getOrnek(slug);
  if (!o) return notFound();
  const t = o.i18n[language] ?? o.i18n.tr;
  const L = ornekLabels[language] ?? ornekLabels.tr;
  const waGeneral = getOtoServis(language).waMessages.general;
  const crumbHome = language === "de" ? "Startseite" : language === "en" ? "Home" : "Ana Sayfa";

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      <section className="pt-28 pb-6 md:pt-36">
        <div className="mx-auto max-w-5xl px-5">
          <Breadcrumb
            crumbs={[
              { label: crumbHome, href: "/" },
              { label: L.galleryKicker, href: "/ornekler" },
              { label: t.name },
            ]}
          />
          {/* Zorunlu, görünür uyarı bandı */}
          <div className="mt-2 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 text-sm text-ink">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <p>{disclaimer[language] ?? disclaimer.tr}</p>
          </div>
        </div>
      </section>

      {/* Temsili tek sayfalık site önizlemesi */}
      <div className="mx-auto max-w-5xl px-5 pb-8">
        <div className="overflow-hidden rounded-2xl border border-line bg-bg-raised/20">
          {/* tarayıcı çerçevesi */}
          <div className="flex items-center gap-2 border-b border-line bg-bg-raised/40 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
            <span className="ml-3 truncate rounded bg-black/20 px-2 py-0.5 text-[0.65rem] text-muted">
              {o.slug}.com · {L.representative}
            </span>
          </div>

          {/* demo hero */}
          <div
            className="px-6 py-12 text-center md:py-16"
            style={{ background: `linear-gradient(160deg, ${o.accent}1f, transparent 75%)` }}
          >
            <span
              className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold"
              style={{ background: `${o.accent}22`, color: o.accent }}
            >
              {t.name.charAt(0)}
            </span>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">{t.name}</h2>
            <p className="mt-2 text-muted">{t.tagline}</p>
            <p className="mt-1 text-sm text-faint">{t.sector} · {t.city}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                style={{ background: o.accent, color: "#04121a" }}
              >
                <Phone className="h-4 w-4" /> {L.callLabel}: {o.phone}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm text-ink">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </span>
            </div>
          </div>

          {/* demo hizmetler */}
          <div className="border-t border-line px-6 py-8">
            <h3 className="display mb-4 text-center text-lg font-bold text-ink">{L.servicesTitle}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {t.services.map((s) => (
                <div key={s.title} className="rounded-lg border border-line bg-bg-raised/30 p-4">
                  <p className="text-sm font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-xs text-muted">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* demo bilgi şeridi */}
          <div className="grid gap-px border-t border-line bg-line sm:grid-cols-3">
            <div className="flex items-start gap-2 bg-bg-raised/20 p-4 text-xs text-muted">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{t.hours}</span>
            </div>
            <div className="flex items-start gap-2 bg-bg-raised/20 p-4 text-xs text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{t.city} · {L.mapLink}</span>
            </div>
            <div className="flex items-start gap-2 bg-bg-raised/20 p-4 text-xs text-muted">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{o.phone}</span>
            </div>
          </div>

          {/* demo öne çıkanlar */}
          <div className="border-t border-line px-6 py-6">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {t.highlights.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5 text-xs text-ink">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" /> {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alt navigasyon + CTA */}
      <AnimatedSection className="band-petrol border-t border-line">
        <div className="mx-auto max-w-3xl px-5 py-14 text-center">
          <h2 className="display text-2xl font-bold text-ink md:text-3xl">{L.ctaTitleDetail}</h2>
          <p className="mx-auto mt-3 max-w-lg text-muted">{L.ctaDescDetail}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link
              href="/oto-servis-web-sitesi#paketler"
              className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-semibold text-black transition-transform hover:-translate-y-0.5"
            >
              {L.ctaPackages} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(waGeneral)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { try { track(events.whatsapp); trackContact(); } catch {} }}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3.5 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
            >
              <MessageCircle className="h-4 w-4" /> {L.ctaWhatsapp}
            </a>
          </div>
          <Link
            href="/ornekler"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> {L.backAll}
          </Link>
        </div>
      </AnimatedSection>
    </main>
  );
}
