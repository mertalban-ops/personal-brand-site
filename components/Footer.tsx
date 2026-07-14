"use client";

import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { contact } from "@/data/contact";
import { footerLinks } from "@/data/navigation";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t mt-0 pt-14 pb-8" style={{ borderColor: "var(--line)", background: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl px-5">
        {/* Top grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="display text-base font-bold tracking-tight text-ink">
              SOLVARIA
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
              {t.contact.footerText}
            </p>

            {/* Always-visible contact */}
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent("Proje talebi")}`}
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
                style={{ color: "var(--muted)" }}
              >
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                {contact.email}
              </a>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
                  style={{ color: "var(--muted)" }}
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" style={{ color: "var(--accent)" }} />
                  WhatsApp&apos;tan yaz
                </a>
              )}
              <span
                className="inline-flex items-center gap-2 text-sm"
                style={{ color: "var(--faint)" }}
              >
                <MapPin className="h-4 w-4 flex-shrink-0" />
                {contact.location}
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
                    {link.label}
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
                    {link.label}
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
          <p>© {year} {contact.name}. {t.contact.rights}</p>
          <div className="flex items-center gap-4">
            <Link href="/gizlilik" className="transition-colors hover:text-ink">Gizlilik</Link>
            <Link href="/kullanim-kosullari" className="transition-colors hover:text-ink">Kullanım Koşulları</Link>
            <span className="font-mono uppercase tracking-wider hidden md:inline" style={{ fontSize: "0.65rem" }}>
              Digital Operation Systems · {contact.location}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
