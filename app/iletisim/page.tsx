import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import CtaStrip from "@/components/CtaStrip";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/data/contact";
import { Mail, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim — Solvaria",
  description:
    "Projenizi konuşalım. Ücretsiz keşif görüşmesi için iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb
            crumbs={[
              { label: "Ana Sayfa", href: "/" },
              { label: "İletişim" },
            ]}
          />
          <p className="mono-label mb-4">İletişim</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl text-balance max-w-3xl">
            Projenizi konuşalım
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Formu doldurun, kısa sürede dönelim. İlk görüşme ücretsiz ve
            bağlayıcı değil.
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
                Proje Talebi
              </h2>
              <ContactForm />
            </div>

            {/* Right: contact info */}
            <aside className="space-y-6">
              <h2 className="display text-xl font-bold text-ink">
                Doğrudan Ulaşın
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
                      E-posta
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
                        WhatsApp
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
                      Konum
                    </p>
                    <p className="text-sm text-ink font-medium">
                      {contact.location}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Uzaktan çalışıyoruz — konum fark etmez
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-surface/30 px-5 py-4">
                <p className="text-xs text-muted leading-relaxed">
                  İlk görüşme ücretsiz ve bağlayıcı değildir. Teklif almak için
                  herhangi bir taahhütte bulunmanız gerekmez.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </AnimatedSection>

      <FAQ />
      <CtaStrip />
    </main>
  );
}
