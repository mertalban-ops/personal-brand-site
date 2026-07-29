"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/config";
import { footerLinks, NavLink } from "@/data/navigation";

export default function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  const getLocalizedLabel = (link: NavLink) => {
    if (language === "en") return link.labelEn || link.label;
    if (language === "de") return link.labelDe || link.label;
    return link.label;
  };

  const getWhatsappText = () => {
    if (language === "en") return "Chat on WhatsApp";
    if (language === "de") return "Schreib uns auf WhatsApp";
    return "WhatsApp'tan yaz";
  };

  const location = language === "en" ? siteConfig.locationEn : language === "de" ? siteConfig.locationDe : siteConfig.locationTr;

  return (
    <footer className="border-t mt-0 pt-14 pb-8" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-5">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/albanexa-logo.png"
                alt="Albanexa"
                width={360}
                height={145}
                className="h-16 w-auto sm:h-20 md:h-24"
              />
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {t.contact.footerText}
            </p>

            {/* Always-visible contact */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent("Proje talebi")}`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
                style={{ color: "var(--muted)" }}
              >
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                {siteConfig.contactEmail}
              </a>
              {siteConfig.whatsappNumber && (
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
                  style={{ color: "var(--muted)" }}
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  {getWhatsappText()}
                </a>
              )}
              <span
                className="inline-flex items-center gap-2 text-sm"
                style={{ color: "var(--faint)" }}
              >
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {location}
              </span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-ink">{t.contact.servicesCol}</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
              {footerLinks.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-accent">
                    {getLocalizedLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-ink">{t.contact.studioCol}</h4>
            <ul className="space-y-2.5 text-sm" style={{ color: "var(--muted)" }}>
              {footerLinks.studio.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-accent">
                    {getLocalizedLabel(link)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t text-xs"
          style={{ borderColor: "var(--line)", color: "var(--faint)" }}
        >
          <p>© {year} {siteConfig.brandName}. {t.contact.rights}</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/gizlilik" className="transition-colors hover:text-ink">{t.nav.privacy ?? "Gizlilik"}</Link>
            <Link href="/kvkk-aydinlatma" className="transition-colors hover:text-ink">KVKK</Link>
            <Link href="/kullanim-kosullari" className="transition-colors hover:text-ink">{t.nav.terms ?? "Kullanım Koşulları"}</Link>
            <a
              href="https://linkedin.com/in/mertalban"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
