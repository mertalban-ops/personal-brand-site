"use client";

import Link from "next/link";
import { Users, Shield, Zap, Code, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function IsBirligiClient() {
  const { language } = useLanguage();

  const trContent = {
    crumbs: [{ label: "Ana Sayfa", href: "/" }, { label: "İş Birliği" }],
    kicker: "İş Ortaklığı",
    title: "Güçlerimizi birleştirelim, müşterilerinize değer katın",
    desc: "Yazılım geliştirme yetkinliklerimizi ve B2B tecrübemizi ajansınız, tasarım stüdyonuz veya işletmeniz için güvenilir bir teknoloji ortağı haline getirelim.",
    modelsHeading: "İş Birliği Modellerimiz",
    modelsDesc: "Farklı ihtiyaçlara göre yapılandırılmış 4 temel ortaklık yapısı.",
    models: [
      {
        icon: Shield,
        title: "White-Label Yazılım Geliştirme",
        desc: "Müşterilerinize kendi markanız adı altında premium Next.js web siteleri, CRM ve iş takip sistemleri sunun. Solvaria, arka planda tüm teknik tasarımı, kodlamayı ve desteği üstlensin.",
        bullets: ["Müşteri ilişkileri tamamen sizdedir", "Fiyatlandırmayı siz belirlersiniz", "Kesintisiz teknik operasyon garantisi"]
      },
      {
        icon: Users,
        title: "Alt Yüklenici (Subcontractor)",
        desc: "Yazılım ekibinizin yoğun olduğu dönemlerde veya özel uzmanlık gerektiren (Next.js, Supabase, n8n otomasyonları, AI entegrasyonları) projelerinizde güvenilir dış kaynak olarak ekibinize katılalım.",
        bullets: ["Zamanında teslim taahhüdü", "Temiz ve belgelenmiş kodlama", "Sorunsuz Git / Jira süreç entegrasyonu"]
      },
      {
        icon: Zap,
        title: "Ajans Çözüm Ortaklığı",
        desc: "Tasarım, SEO veya reklam ajanslarının müşterileri için ihtiyaç duyduğu gelişmiş web altyapılarını, veritabanı entegrasyonlarını ve API otomasyonlarını sıfır hata ile hayata geçirelim.",
        bullets: ["SEO ajansları için %100 Core Web Vitals", "Özel API ve webhook entegrasyonları", "Ölçeklenebilir bulut mimarisi"]
      },
      {
        icon: Code,
        title: "Tasarım Stüdyosu Ortaklığı",
        desc: "Figma'da hazırladığınız özel arayüz tasarımlarını piksel hassasiyetinde, akıcı Framer Motion animasyonları ve responsive uyum ile Next.js koduna dönüştürüp canlandıralim.",
        bullets: ["Tasarıma tam sadakat garanti edilir", "Modern CSS ve animasyon kütüphaneleri", "Mobil ve tablet öncelikli kodlama"]
      }
    ],
    whyHeading: "Neden Solvaria?",
    whyDesc: "Bir teknoloji ortağından beklediğiniz güven ve profesyonelliği sunuyoruz.",
    whyPoints: [
      { title: "Teknik Olgunluk", desc: "Next.js 16, Tailwind v4 ve modern bulut altyapılarında yüksek mühendislik standartları." },
      { title: "Zamanında ve Bütçesinde", desc: "Proje planlarına ve bütçe sınırlarına sadık kalarak, sürpriz maliyetler üretmeden çalışıyoruz." },
      { title: "Şeffaf İletişim", desc: "Jargonlardan uzak, durum raporları ve net Git geçmişleriyle izlenebilir süreçler." }
    ],
    ctaTitle: "Birlikte neler yapabiliriz?",
    ctaDesc: "Potansiyel projeleri değerlendirmek, fiyatlandırma modelimizi öğrenmek veya tanışmak için kısa bir görüşme planlayalım.",
    ctaPrimary: "İş Birliği Görüşmesi Başlatın",
    ctaSecondary: "Hizmetlerimizi İnceleyin"
  };

  const enContent = {
    crumbs: [{ label: "Home", href: "/" }, { label: "Partnership" }],
    kicker: "Partnership Program",
    title: "Let's combine our strengths to deliver value to your clients",
    desc: "Make our software development capabilities and B2B workflow experience a reliable technology partner for your agency, design studio, or business.",
    modelsHeading: "Our Partnership Models",
    modelsDesc: "Four structured partnership models tailored to different operational needs.",
    models: [
      {
        icon: Shield,
        title: "White-Label Development",
        desc: "Offer premium Next.js websites, CRMs, and workflow systems to your clients under your own brand. Solvaria handles all design, coding, and backend operations in the background.",
        bullets: ["You own the client relationship", "You control the pricing model", "Guaranteed technical operations support"]
      },
      {
        icon: Users,
        title: "Subcontractor Services",
        desc: "Join forces during peak project loads or for specialized tasks (Next.js, Supabase, n8n integrations, AI agents) requiring reliable external tech experts.",
        bullets: ["Strict delivery commitments", "Clean, documented, and modular code", "Seamless Git and Jira workflow integration"]
      },
      {
        icon: Zap,
        title: "Agency Solutions",
        desc: "Help design, SEO, or advertising agencies build advanced web infrastructures, API automations, and custom database integrations for their clients.",
        bullets: ["100% Core Web Vitals for SEO agencies", "Bespoke API and webhook connections", "Scalable cloud database setups"]
      },
      {
        icon: Code,
        title: "Design Studio Partnership",
        desc: "Convert your custom Figma interface designs into pixel-perfect Next.js code, complete with fluid Framer Motion animations and full responsiveness.",
        bullets: ["Bespoke loyalty to design visuals", "Modern CSS and layout patterns", "Mobile & tablet first implementation"]
      }
    ],
    whyHeading: "Why Partner with Solvaria?",
    whyDesc: "We deliver the reliability, performance, and communication you expect from a tech partner.",
    whyPoints: [
      { title: "Technical Excellence", desc: "High engineering standards using Next.js 16, Tailwind v4, and modern cloud infrastructures." },
      { title: "On Time & On Budget", desc: "Strict adherence to project timelines and budget boundaries with zero hidden costs." },
      { title: "Clear Communication", desc: "No tech jargon. Traceable workflows with structured updates and clean Git histories." }
    ],
    ctaTitle: "What can we build together?",
    ctaDesc: "Let's set up a brief call to evaluate upcoming projects, discuss our pricing structures, or simply introduce our teams.",
    ctaPrimary: "Start Partnership Discussion",
    ctaSecondary: "Explore Our Solutions"
  };

  const deContent = {
    crumbs: [{ label: "Startseite", href: "/" }, { label: "Partnerschaft" }],
    kicker: "Partnerschaftsprogramm",
    title: "Lassen Sie uns unsere Kräfte bündeln, um Mehrwert für Ihre Kunden zu schaffen",
    desc: "Machen Sie unsere Fähigkeiten in der Softwareentwicklung und unsere B2B-Prozesserfahrung zu einem zuverlässigen Technologiepartner für Ihre Agentur, Ihr Designstudio oder Ihr Unternehmen.",
    modelsHeading: "Unsere Kooperationsmodelle",
    modelsDesc: "Vier strukturierte Partnerschaftsmodelle, die auf unterschiedliche betriebliche Anforderungen zugeschnitten sind.",
    models: [
      {
        icon: Shield,
        title: "White-Label-Softwareentwicklung",
        desc: "Bieten Sie Ihren Kunden erstklassige Next.js-Websites, CRMs und Arbeitsabfolgesysteme unter Ihrer eigenen Marke an. Solvaria übernimmt das gesamte Design und Coding im Hintergrund.",
        bullets: ["Kundenbeziehung liegt ganz bei Ihnen", "Sie kontrollieren das Preismodell", "Garantierter technischer Support"]
      },
      {
        icon: Users,
        title: "Subunternehmer-Services",
        desc: "Unterstützen Sie Ihr Team bei hoher Auslastung oder für Projekte, die spezielles Fachwissen erfordern (Next.js, Supabase, n8n-Integrationen, KI-Agenten).",
        bullets: ["Strikte Einhaltung von Lieferfristen", "Sauberer, dokumentierter Code", "Nahtlose Git- und Jira-Workflow-Integration"]
      },
      {
        icon: Zap,
        title: "Agenturlösungen",
        desc: "Helfen Sie Design-, SEO- oder Werbeagenturen, fortschrittliche Web-Infrastrukturen, API-Automatisierungen und benutzerdefinierte Datenbankintegrationen zu erstellen.",
        bullets: ["100 % Core Web Vitals für SEO-Agenturen", "Maßgeschneiderte API- und Webhook-Verbindungen", "Skalierbare Cloud-Datenbank-Setups"]
      },
      {
        icon: Code,
        title: "Designstudio-Partnerschaft",
        desc: "Setzen Sie Ihre Figma-Designs pixelgenau in Next.js-Code mit flüssigen Framer Motion-Animationen und voller Reaktionsfähigkeit um.",
        bullets: ["Absolute Designtreue garantiert", "Moderne CSS- und Animationsbibliotheken", "Mobile-first Implementierung"]
      }
    ],
    whyHeading: "Warum Solvaria?",
    whyDesc: "Wir bieten die Zuverlässigkeit, Leistung und Kommunikation, die Sie von einem Technologiepartner erwarten.",
    whyPoints: [
      { title: "Technische Exzellenz", desc: "Hohe Engineering-Standards mit Next.js 16, Tailwind v4 und modernen Cloud-Infrastrukturen." },
      { title: "Pünktlich & Budgetgerecht", desc: "Strikte Einhaltung von Projektzeitplänen und Budgetgrenzen ohne versteckte Kosten." },
      { title: "Klare Kommunikation", desc: "Kein Tech-Jargon. Verfolgbare Workflows mit strukturierten Updates und sauberen Git-Historien." }
    ],
    ctaTitle: "Was können wir zusammen aufbauen?",
    ctaDesc: "Lassen Sie uns ein kurzes Gespräch vereinbaren, um anstehende Projekte zu bewerten, unsere Preisstrukturen zu besprechen oder uns einfach vorzustellen.",
    ctaPrimary: "Partnerschaftsgespräch starten",
    ctaSecondary: "Lösungen erkunden"
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

      {/* Models Grid */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              {c.modelsHeading}
            </h2>
            <p className="mt-4 text-muted text-sm max-w-lg mx-auto">
              {c.modelsDesc}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {c.models.map((model, idx) => {
              const Icon = model.icon;
              return (
                <div
                  key={idx}
                  className="card-surface flex flex-col justify-between rounded-2xl p-6 border border-line hover:border-accent/40 transition-colors"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-4">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="display text-lg font-bold text-ink mb-2">
                      {model.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed mb-6">
                      {model.desc}
                    </p>
                  </div>
                  <ul className="space-y-2 border-t border-line/60 pt-4">
                    {model.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[0.7rem] text-muted">
                        <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Solvaria */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              {c.whyHeading}
            </h2>
            <p className="mt-4 text-muted text-sm max-w-lg mx-auto">
              {c.whyDesc}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {c.whyPoints.map((item, idx) => (
              <div key={idx} className="rounded-xl border border-line bg-surface/30 p-5">
                <h3 className="font-semibold text-ink text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <h2 className="display text-3xl font-bold text-ink md:text-4xl mb-6">
            {c.ctaTitle}
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            {c.ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5 inline-block"
            >
              {c.ctaPrimary}
            </Link>
            <Link
              href="/cozumler"
              className="rounded-lg border border-line bg-surface/30 px-6 py-3 font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent inline-block"
            >
              {c.ctaSecondary} <ArrowRight className="h-4 w-4 inline ml-1.5" />
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
