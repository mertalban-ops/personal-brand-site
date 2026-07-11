"use client";

import { Mail, MapPin, MessageCircle, ExternalLink, Code2 } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import { contact } from "@/data/contact";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t, language } = useLanguage();

  const isTr = language === "tr";
  const isDe = language === "de";

  const emailLabel = isTr ? "E-posta" : isDe ? "E-Mail" : "Email";
  const locationLabel = isTr ? "Konum" : isDe ? "Standort" : "Location";
  const profileLabel = isTr ? "Profili görüntüle" : isDe ? "Profil ansehen" : "View profile";
  const projectsLabel = isTr ? "Projelere göz at" : isDe ? "Projekte ansehen" : "View projects";
  const dosLabel = isTr ? "dijital operasyon sistemleri" : isDe ? "digitale Betriebssysteme" : "digital operation systems";

  return (
    <AnimatedSection id="iletisim" className="relative overflow-hidden border-t border-line">
      <div
        className="absolute -bottom-52 left-1/2 -z-10 h-[440px] w-[640px] -translate-x-1/2 rounded-full opacity-[0.11] blur-[140px]"
        style={{ background: "var(--accent)" }}
      />
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mono-label mb-3">{t.contact.label}</p>
            <h2 className="display text-balance text-3xl font-bold text-ink md:text-4xl">
              {t.contact.title}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              {t.contact.subtitle}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent("Proje talebi")}`}
                className="btn-shine glow-accent inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-[#000000] transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {t.contact.emailBtn}
              </a>
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-6 py-3 font-medium text-ink transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.contact.whatsappBtn}
                </a>
              )}
            </div>
          </div>

          <div className="card-surface rounded-2xl p-7">
            <dl className="space-y-5">
              <div className="flex items-center gap-4">
                <span className="rounded-lg bg-accent/10 p-2.5">
                  <Mail className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <dt className="text-xs text-muted">{emailLabel}</dt>
                  <dd>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-medium text-ink transition-colors hover:text-accent"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="rounded-lg bg-accent/10 p-2.5">
                  <MapPin className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <dt className="text-xs text-muted">{locationLabel}</dt>
                  <dd className="font-medium text-ink">{contact.location}</dd>
                </div>
              </div>
              {contact.linkedin && (
                <div className="flex items-center gap-4">
                  <span className="rounded-lg bg-accent/10 p-2.5">
                    <ExternalLink className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <dt className="text-xs text-muted">LinkedIn</dt>
                    <dd>
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink transition-colors hover:text-accent"
                      >
                        {profileLabel}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
              {contact.github && (
                <div className="flex items-center gap-4">
                  <span className="rounded-lg bg-accent/10 p-2.5">
                    <Code2 className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <dt className="text-xs text-muted">GitHub</dt>
                    <dd>
                      <a
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-ink transition-colors hover:text-accent"
                      >
                        {projectsLabel}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>

      <footer className="border-t border-line mt-20 pt-16 pb-8 bg-bg">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-12 md:grid-cols-4 mb-16">
            <div className="md:col-span-2">
              <span className="display text-lg font-bold tracking-tight text-ink">
                {contact.name}
              </span>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {t.contact.footerText}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-ink mb-4">{t.contact.servicesCol}</h4>
              <ul className="space-y-3 text-sm text-muted">
                {t.services.items.slice(0, 4).map(s => (
                  <li key={s.title}>{s.title}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-ink mb-4">{t.contact.studioCol}</h4>
              <ul className="space-y-3 text-sm text-muted">
                <li><a href="#kimim" className="hover:text-accent transition-colors">{t.nav.studio}</a></li>
                <li><a href="#surec" className="hover:text-accent transition-colors">{t.nav.process}</a></li>
                <li><a href="#projeler" className="hover:text-accent transition-colors">{t.nav.cases}</a></li>
                <li><a href="#sss" className="hover:text-accent transition-colors">{t.faq.title}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-line">
            <p className="text-xs text-muted">
              © {new Date().getFullYear()} {contact.name}. {t.contact.rights}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color: "var(--faint)" }}>
              {dosLabel} · {contact.location}
            </p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
}
