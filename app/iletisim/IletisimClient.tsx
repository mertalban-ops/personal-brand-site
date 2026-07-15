"use client";

import Navbar from "@/components/Navbar";
import FAQPreview from "@/components/home/FAQPreview";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/data/contact";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function IletisimClient() {
  const { language } = useLanguage();

  // Localization strings
  const trContent = {
    crumbs: [{ label: "Ana Sayfa", href: "/" }, { label: "İletişim" }],
    kicker: "İletişim",
    title: "Projenizi konuşalım",
    desc: "Formu doldurun, kısa sürede dönelim. İlk görüşme ücretsiz ve bağlayıcı değil.",
    formHeading: "Proje Talebi",
    infoHeading: "Doğrudan Ulaşın",
    mailLabel: "E-posta",
    whatsappLabel: "WhatsApp",
    locationLabel: "Konum",
    locationValue: "Uzaktan çalışıyoruz — konum fark etmez",
    guaranteeText: "İlk görüşme ücretsiz ve bağlayıcı değildir. Teklif almak için herhangi bir taahhütte bulunmanız gerekmez."
  };

  const enContent = {
    crumbs: [{ label: "Home", href: "/" }, { label: "Contact" }],
    kicker: "Contact",
    title: "Let's talk about your project",
    desc: "Fill out the form and we'll get back to you shortly. The initial consultation is free and non-binding.",
    formHeading: "Project Inquiry",
    infoHeading: "Reach Out Directly",
    mailLabel: "Email",
    whatsappLabel: "WhatsApp",
    locationLabel: "Location",
    locationValue: "Remote-first — serving globally",
    guaranteeText: "The initial consultation is 100% free and non-binding. No commitments required to receive a proposal."
  };

  const deContent = {
    crumbs: [{ label: "Startseite", href: "/" }, { label: "Kontakt" }],
    kicker: "Kontakt",
    title: "Lassen Sie uns über Ihr Projekt sprechen",
    desc: "Füllen Sie das Formular aus, wir melden uns in Kürze. Die Erstberatung ist kostenlos und unverbindlich.",
    formHeading: "Projektanfrage",
    infoHeading: "Direktkontakt",
    mailLabel: "E-Mail",
    whatsappLabel: "WhatsApp",
    locationLabel: "Standort",
    locationValue: "Remote-first — weltweit verfügbar",
    guaranteeText: "Die Erstberatung ist 100% kostenlos und unverbindlich. Es ist keine Verpflichtung erforderlich."
  };

  const c = language === "en" ? enContent : language === "de" ? deContent : trContent;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb crumbs={c.crumbs} />
          <p className="mono-label mb-4">{c.kicker}</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            {c.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {c.desc}
          </p>
        </div>
      </section>

      {/* Form + Contact info */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            {/* Left: form */}
            <div>
              <h2 className="display text-xl font-bold text-ink mb-6">
                {c.formHeading}
              </h2>
              <ContactForm />
            </div>

            {/* Right: contact info */}
            <aside className="space-y-6">
              <h2 className="display text-xl font-bold text-ink">
                {c.infoHeading}
              </h2>

              <div className="space-y-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="card-surface flex items-start gap-4 rounded-xl p-5 transition-colors hover:border-accent/40"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-faint mb-0.5">
                      {c.mailLabel}
                    </p>
                    <p className="text-sm text-ink font-medium break-all">
                      {contact.email}
                    </p>
                  </div>
                </a>

                {contact.whatsapp && contact.whatsapp !== "#" && (
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-surface flex items-start gap-4 rounded-xl p-5 transition-colors hover:border-accent/40"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                      <MessageCircle className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-faint mb-0.5">
                        {c.whatsappLabel}
                      </p>
                      <p className="text-sm text-ink font-medium">
                        +{contact.whatsapp}
                      </p>
                    </div>
                  </a>
                )}

                <div className="card-surface flex items-start gap-4 rounded-xl p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-faint mb-0.5">
                      {c.locationLabel}
                    </p>
                    <p className="text-sm text-ink font-medium">
                      {contact.location}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {c.locationValue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-surface/30 px-5 py-4">
                <p className="text-xs text-muted leading-relaxed">
                  {c.guaranteeText}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </AnimatedSection>

      <FAQPreview />
      <CtaStrip />
    </main>
  );
}
