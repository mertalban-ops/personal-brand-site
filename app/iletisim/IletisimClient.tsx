"use client";

import Navbar from "@/components/Navbar";
import FAQPreview from "@/components/home/FAQPreview";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { siteConfig } from "@/data/config";
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
    desc: "E-posta veya WhatsApp ile yazın, kısa sürede dönelim. İlk görüşme ücretsiz ve bağlayıcı değil.",
    formHeading: "Nasıl yazmalı?",
    briefIntro: "Mesajınızda şunlara kısaca değinmeniz yeterli:",
    briefItems: ["İşletmenizin ne iş yaptığı", "Çözmek istediğiniz sorun veya ihtiyaç", "Sistemi kaç kişinin kullanacağı", "Beklediğiniz zamanlama ve varsa bütçe aralığı"],
    emailCta: "E-posta ile yaz",
    whatsappCta: "WhatsApp'tan yaz",
    privacyNote: "Lütfen sağlık, din, siyasi görüş gibi özel nitelikli bilgiler ya da başka kişilere ait bilgiler paylaşmayın. Yazışmalarınız yalnızca talebinize dönüş yapmak için kullanılır ve pazarlama amacıyla kullanılmaz.",
    privacyLink: "KVKK Aydınlatma Metni",
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
    desc: "Write to us by email or WhatsApp and we'll get back to you shortly. The initial consultation is free and non-binding.",
    formHeading: "What to include",
    briefIntro: "A few short points are enough:",
    briefItems: ["What your business does", "The problem or need you want to solve", "How many people will use the system", "Your expected timeline and, if any, budget range"],
    emailCta: "Write by email",
    whatsappCta: "Write on WhatsApp",
    privacyNote: "Please do not share special categories of data (health, religion, political views) or other people's details. Your messages are used only to reply to your request, never for marketing.",
    privacyLink: "Privacy Notice (Turkish)",
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
    desc: "Schreiben Sie uns per E-Mail oder WhatsApp, wir melden uns in Kürze. Die Erstberatung ist kostenlos und unverbindlich.",
    formHeading: "Was Sie schreiben sollten",
    briefIntro: "Ein paar kurze Punkte genügen:",
    briefItems: ["Was Ihr Unternehmen macht", "Das Problem oder der Bedarf", "Wie viele Personen das System nutzen werden", "Gewünschter Zeitrahmen und ggf. Budget"],
    emailCta: "Per E-Mail schreiben",
    whatsappCta: "Auf WhatsApp schreiben",
    privacyNote: "Bitte keine besonderen Kategorien personenbezogener Daten (Gesundheit, Religion, politische Ansichten) oder Daten anderer Personen angeben. Ihre Nachrichten werden nur zur Beantwortung Ihrer Anfrage genutzt, nicht für Werbung.",
    privacyLink: "Datenschutzhinweis (Türkisch)",
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

      {/* How to write + Contact info */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            {/* Left: what to include */}
            <div>
              <h2 className="display text-xl font-bold text-ink mb-6">
                {c.formHeading}
              </h2>
              <div className="card-surface rounded-2xl border border-line bg-surface/30 p-6 md:p-8" data-testid="contact-brief">
                <p className="text-sm text-muted mb-4">{c.briefIntro}</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-ink">
                  {c.briefItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${contact.email}`}
                    className="btn-shine glow-accent inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-black"
                  >
                    <Mail className="h-4 w-4" /> {c.emailCta}
                  </a>
                  {siteConfig.whatsappNumber && (
                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      <MessageCircle className="h-4 w-4" /> {c.whatsappCta}
                    </a>
                  )}
                </div>
                <p className="mt-6 text-[0.75rem] leading-relaxed text-muted">
                  {c.privacyNote}{" "}
                  <Link href="/kvkk-aydinlatma" className="text-accent underline">
                    {c.privacyLink}
                  </Link>
                </p>
              </div>
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
                        +90 537 953 15 47
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
