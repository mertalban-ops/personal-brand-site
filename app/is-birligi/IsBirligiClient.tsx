"use client";

import Link from "next/link";
import { Users, Shield, Zap, Code, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

interface ModelDetail {
  forWhom: string;
  albanexaResponsibility: string;
  partnerResponsibility: string;
  commModel: string;
  delivery: string;
  privacy: string;
  pricing: string;
  firstStep: string;
}

interface PartnershipModel {
  icon: any;
  title: string;
  desc: string;
  bullets: string[];
  details: ModelDetail;
}

export default function IsBirligiClient() {
  const { language } = useLanguage();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const trLabels = {
    forWhom: "Kimler İçin Uygun?",
    albanexa: "Albanexa Neyi Üstlenir?",
    partner: "İş Ortağı Neyi Üstlenir?",
    comm: "İletişim Modeli",
    delivery: "Teslim Biçimi",
    privacy: "Gizlilik Yaklaşımı",
    pricing: "Fiyatlandırma Modeli",
    firstStep: "İlk Adım",
    moreDetails: "İş Birliği Detaylarını Göster",
    lessDetails: "Detayları Gizle"
  };

  const enLabels = {
    forWhom: "Who Is It For?",
    albanexa: "What Albanexa Handles",
    partner: "What the Partner Handles",
    comm: "Communication Model",
    delivery: "Delivery Format",
    privacy: "Privacy & NDA Approach",
    pricing: "Pricing Model",
    firstStep: "First Step",
    moreDetails: "Show Partnership Details",
    lessDetails: "Hide Details"
  };

  const deLabels = {
    forWhom: "Für wen ist das geeignet?",
    albanexa: "Was Albanexa übernimmt",
    partner: "Was der Partner übernimmt",
    comm: "Kommunikationsmodell",
    delivery: "Lieferformat",
    privacy: "Datenschutz & NDA",
    pricing: "Preismodell",
    firstStep: "Erster Schritt",
    moreDetails: "Kooperationsdetails anzeigen",
    lessDetails: "Details ausblenden"
  };

  const l = language === "en" ? enLabels : language === "de" ? deLabels : trLabels;

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
        desc: "Müşterilerinize kendi markanız adı altında premium Next.js web siteleri, CRM ve iş takip sistemleri sunun. Albanexa, arka planda tüm teknik tasarımı, kodlamayı ve desteği üstlensin.",
        bullets: ["Müşteri ilişkileri tamamen sizdedir", "Fiyatlandırmayı siz belirlersiniz", "Belirlenen hizmet kapsamına göre teknik destek"],
        details: {
          forWhom: "Yazılım geliştirme ekibi olmayan ancak müşterilerine özel yazılım veya web çözümleri satmak isteyen dijital pazarlama ajansları, SEO uzmanları ve danışmanlar.",
          albanexaResponsibility: "Tasarımın Next.js koduna dökülmesi, veritabanı kurulumu, entegrasyonlar, yayına alma ve SLA kapsamında bakım desteği.",
          partnerResponsibility: "Müşteri ilişkilerinin yürütülmesi, proje kapsam analizi, UI/UX tasarımı ve faturalandırma.",
          commModel: "İş ortağı ile Slack veya E-posta üzerinden doğrudan iletişim. Son müşteri ile doğrudan temas kurulmaz.",
          delivery: "Kaynak kodlar iş ortağına teslim edilir, Vercel/Supabase projesi iş ortağının hesaplarına aktarılır.",
          privacy: "Karşılıklı imzalanan Gizlilik Sözleşmesi (NDA) ile müşterilerinizin ve projelerinizin verileri tamamen korunur.",
          pricing: "Sabit proje fiyatlandırması veya aylık bazda SLA bakım bedeli.",
          firstStep: "Keşif görüşmesinde portföyünüzdeki olası projeleri değerlendirelim."
        }
      },
      {
        icon: Users,
        title: "Alt Yüklenici (Subcontractor)",
        desc: "Yazılım ekibinizin yoğun olduğu dönemlerde veya özel uzmanlık gerektiren (Next.js, Supabase, n8n otomasyonları, AI entegrasyonları) projelerinizde güvenilir dış kaynak olarak ekibinize katılalım.",
        bullets: ["Onaylı kapsam ve takvim doğrultusunda planlı teslim", "Temiz ve belgelenmiş kodlama", "Sorunsuz Git / Jira süreç entegrasyonu"],
        details: {
          forWhom: "İçeride yazılım ekibi olan ancak iş yükü kapasitesini aşan veya özel teknoloji odağına (n8n, Supabase, AI Ajanları) ihtiyaç duyan yazılım şirketleri ve stüdyolar.",
          albanexaResponsibility: "Belirlenen teknik görevleri veya modülleri Jira/Git standartlarınıza uygun şekilde kodlayıp test etmek.",
          partnerResponsibility: "Ürün yönetimi, genel mimari kararları, iş önceliklendirmesi ve kod incelemesi (Code Review).",
          commModel: "Ekibinizin kullandığı Slack, Jira, GitHub ortamlarına dahil olarak entegre çalışma.",
          delivery: "GitHub üzerinden belirlenen repo kollarına pull request (PR) olarak teslimat.",
          privacy: "Kapsamlı yazılım NDA sözleşmesi ve fikri mülkiyetin doğrudan iş ortağına ait olması.",
          pricing: "Adam/Gün (Man-Day) bazlı veya sprint/proje bazlı esnek fiyatlandırma.",
          firstStep: "Teknik yetkinliklerimizi ve Git iş akışımızı inceleyeceğimiz kısa bir teknik toplantı planlayalım."
        }
      },
      {
        icon: Zap,
        title: "Ajans Çözüm Ortaklığı",
        desc: "Tasarım, SEO veya reklam ajanslarının müşterileri için ihtiyaç duyduğu gelişmiş web altyapılarını, veritabanı entegrasyonlarını ve API otomasyonlarını kritik akış testleriyle hayata geçirelim.",
        bullets: ["Core Web Vitals hedeflerine yönelik optimizasyon", "Özel API ve webhook entegrasyonları", "Ölçeklenebilir bulut mimarisi"],
        details: {
          forWhom: "Müşterilerine performanslı web siteleri ve iş otomasyonları sunarak SEO ve reklam dönüşümlerini artırmak isteyen kreatif ajanslar.",
          albanexaResponsibility: "Modern Next.js web sitelerinin geliştirilmesi, hız optimizasyonları ve teknik SEO mimarisinin kurulması.",
          partnerResponsibility: "Kreatif konsept tasarımı, içeriklerin hazırlanması, marka konumlandırma ve müşteri yönetimi.",
          commModel: "İhtiyaca göre doğrudan müşteriyle ortak toplantılar veya arka planda sessiz ortaklık.",
          delivery: "Canlıya alınmış, test edilmiş ve tüm şema yapılandırması hazır web projesi.",
          privacy: "Gizlilik çerçevesinde ajansınızın adıyla (white-label) veya resmi iş ortağımız olarak çalışma seçeneği.",
          pricing: "Proje kapsamına göre ajanslara özel indirimli fiyatlandırma modelleri.",
          firstStep: "Ajansınızın web geliştirme ihtiyaçlarını ve iş hacmini analiz edelim."
        }
      },
      {
        icon: Code,
        title: "Tasarım Stüdyosu Ortaklığı",
        desc: "Figma'da hazırladığınız özel arayüz tasarımlarını yüksek görsel sadakatle, akıcı Framer Motion animasyonları ve responsive uyum ile Next.js koduna dönüştürüp canlandıralim.",
        bullets: ["Onaylanan tasarıma yüksek görsel sadakat", "Modern CSS ve animasyon kütüphaneleri", "Mobil ve tablet öncelikli kodlama"],
        details: {
          forWhom: "Görsel tasarımlarının kod tarafında bozulmadan, animasyonlu ve yüksek performanslı şekilde hayata geçmesini isteyen UI/UX tasarım stüdyoları.",
          albanexaResponsibility: "Figma tasarımlarının piksel seviyesinde Next.js ve Tailwind CSS koduna dönüştürülmesi ve mikro etkileşimlerin eklenmesi.",
          partnerResponsibility: "Figma üzerinde responsive ve grid standartlarına uygun temiz tasarım teslimi.",
          commModel: "Tasarımcı ve geliştirici arasında Slack ve Figma yorumları üzerinden anlık senkronizasyon.",
          delivery: "Animasyonları tamamlanmış, Vercel üzerinde yayına hazır frontend kod tabanı.",
          privacy: "Karşılıklı tasarım ve kod mülkiyeti haklarının sözleşmeyle korunması.",
          pricing: "Sayfa sayısı ve animasyon karmaşıklığına göre hazırlanan şeffaf sayfa başı tekliflendirme.",
          firstStep: "Mevcut bir Figma çalışmanızı paylaşın, dönüşüm ve animasyon kapsamını birlikte çıkaralım."
        }
      }
    ] as PartnershipModel[],
    whyHeading: "Neden Albanexa?",
    whyDesc: "Bir teknoloji ortağından beklediğiniz güven ve profesyonelliği sunuyoruz.",
    whyPoints: [
      { title: "Teknik Olgunluk", desc: "Next.js 16, Tailwind v4 ve modern bulut altyapılarında yüksek mühendislik standartları." },
      { title: "Zamanında ve Bütçesinde", desc: "Proje planlarına ve bütçe sınırlarına sadık kalarak, sürpriz maliyetler üretmeden çalışıyoruz." },
      { title: "Şeffaf İletişim", desc: "Jargonlardan uzak, durum raporları ve net Git geçmişleriyle izlenebilir süreçler." }
    ],
    ctaTitle: "Birlikte neler yapabiliriz?",
    ctaDesc: "Potansiyel projeleri değerlendirmek, fiyatlandırma modelimizi öğrenmek veya tanışmak için kısa bir görüşme planlayalım.",
    ctaPrimary: "Ortak çalışma modelini konuşalım",
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
        desc: "Offer premium Next.js websites, CRMs, and workflow systems to your clients under your own brand. Albanexa handles all design, coding, and backend operations in the background.",
        bullets: ["You own the client relationship", "You control the pricing model", "Technical support based on defined service scope"],
        details: {
          forWhom: "Digital marketing agencies, SEO consultants, and business advisors without internal developers who want to sell custom code solutions.",
          albanexaResponsibility: "Converting designs to Next.js code, database setup, integrations, production deployment, and SLA maintenance.",
          partnerResponsibility: "Client relationship management, project scoping, UI/UX design deliverables, and billing.",
          commModel: "Direct communication with the partner via Slack or Email. No direct contact with end clients.",
          delivery: "Source code delivered to the partner, and the Vercel/Supabase environment transferred to partner accounts.",
          privacy: "Both parties sign a Non-Disclosure Agreement (NDA) to fully protect your client and project data.",
          pricing: "Fixed project-based pricing or monthly SLA-based support retainer.",
          firstStep: "Let's review prospective projects in your pipeline during a brief call."
        }
      },
      {
        icon: Users,
        title: "Subcontractor Services",
        desc: "Join forces during peak project loads or for specialized tasks (Next.js, Supabase, n8n integrations, AI agents) requiring reliable external tech experts.",
        bullets: ["Planned delivery aligned with scope and schedule", "Clean, documented, and modular code", "Seamless Git and Jira workflow integration"],
        details: {
          forWhom: "Software companies and development studios that have internal teams but exceed capacity limits or need specific technology expertise (n8n, Supabase, AI Agents).",
          albanexaResponsibility: "Coding and testing defined technical tasks or modules in alignment with your Git/Jira workflow standards.",
          partnerResponsibility: "Product management, global architectural decisions, task prioritization, and code reviews.",
          commModel: "Integrated collaboration by joining your internal Slack, Jira, or GitHub workspaces.",
          delivery: "GitHub pull requests (PRs) submitted directly to the partner's repository branches.",
          privacy: "Comprehensive software NDA and intellectual property rights belong directly to the partner.",
          pricing: "Flexible pricing models based on Man-Day rates or sprint/project terms.",
          firstStep: "Let's schedule a brief call to evaluate our technical capabilities and Git workflow."
        }
      },
      {
        icon: Zap,
        title: "Agency Solutions",
        desc: "Help design, SEO, or advertising agencies build advanced web infrastructures, API automations, and custom database integrations for their clients.",
        bullets: ["Core Web Vitals optimization goals", "Bespoke API and webhook connections", "Scalable cloud database setups"],
        details: {
          forWhom: "Creative agencies wanting to increase SEO and advertising conversions by offering fast websites and workflow automations to their clients.",
          albanexaResponsibility: "Developing modern Next.js websites, speed optimizations, and setting up technical SEO structures.",
          partnerResponsibility: "Creative concept design, copywriting, brand positioning, and client relationship management.",
          commModel: "Joint client meetings as partners or silent background white-label collaboration depending on your preference.",
          delivery: "A live, fully tested web application with configured schema structures.",
          privacy: "Ability to work under your agency name (white-label) or as our official solution partner.",
          pricing: "Special agency discounts based on scope and volume of work.",
          firstStep: "Let's discuss your agency's web development needs and project frequency."
        }
      },
      {
        icon: Code,
        title: "Design Studio Partnership",
        desc: "Convert your custom Figma interface designs into pixel-perfect Next.js code, complete with fluid Framer Motion animations and full responsiveness.",
        bullets: ["High visual fidelity to approved designs", "Modern CSS and layout patterns", "Mobile & tablet first implementation"],
        details: {
          forWhom: "UI/UX design studios wanting their interface designs implemented cleanly, responsively, and with premium web animations.",
          albanexaResponsibility: "Pixel-perfect conversion of Figma layouts to Next.js and Tailwind CSS code with micro-interactions.",
          partnerResponsibility: "Providing clean Figma files built on responsive grids and design tokens.",
          commModel: "Real-time sync between designer and developer via Slack and Figma comments.",
          delivery: "An animated, performance-optimized frontend codebase ready for production deployment.",
          privacy: "Clear contractual agreements safeguarding mutual design and code ownership rights.",
          pricing: "Transparent per-page pricing structures based on page count and animation complexity.",
          firstStep: "Share an active Figma file, and let's define the conversion and animation scope."
        }
      }
    ] as PartnershipModel[],
    whyHeading: "Why Partner with Albanexa?",
    whyDesc: "We deliver the reliability, performance, and communication you expect from a tech partner.",
    whyPoints: [
      { title: "Technical Excellence", desc: "High engineering standards using Next.js 16, Tailwind v4, and modern cloud infrastructures." },
      { title: "On Time & On Budget", desc: "Strict adherence to project timelines and budget boundaries with zero hidden costs." },
      { title: "Clear Communication", desc: "No tech jargon. Traceable workflows with structured updates and clean Git histories." }
    ],
    ctaTitle: "What can we build together?",
    ctaDesc: "Let's set up a brief call to evaluate upcoming projects, discuss our pricing structures, or simply introduce our teams.",
    ctaPrimary: "Let's discuss our partnership model",
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
        desc: "Bieten Sie Ihren Kunden erstklassige Next.js-Websites, CRMs und Arbeitsabfolgesysteme unter Ihrer eigenen Marke an. Albanexa übernimmt das gesamte Design und Coding im Hintergrund.",
        bullets: ["Kundenbeziehung liegt ganz bei Ihnen", "Sie kontrollieren das Preismodell", "Technischer Support basierend auf dem definierten Serviceumfang"],
        details: {
          forWhom: "Digitalmarketing-Agenturen, SEO-Berater und Unternehmensberater ohne interne Entwickler, die eigene Softwarelösungen verkaufen möchten.",
          albanexaResponsibility: "Konvertierung von Designs in Next.js-Code, Datenbank-Setup, Integrationen, Produktionsbereitstellung und SLA-Wartung.",
          partnerResponsibility: "Kundenbeziehungsmanagement, Projektumfangsanalyse, UI/UX-Designleistungen und Abrechnung.",
          commModel: "Direkte Kommunikation mit dem Partner per Slack oder E-Mail. Kein direkter Kontakt zu Endkunden.",
          delivery: "Quellcode an den Partner übergeben, Vercel/Supabase-Projekt auf Partnerkonten übertragen.",
          privacy: "Beide Parteien unterzeichnen ein NDA (Geheimhaltungsvereinbarung), um Ihre Kunden- und Projektdaten vollständig zu schützen.",
          pricing: "Feste projektbasierte Preise oder monatliche SLA-basierte Supportgebühren.",
          firstStep: "Lassen Sie uns potenzielle Projekte in Ihrer Pipeline bei einem kurzen Telefonat bewerten."
        }
      },
      {
        icon: Users,
        title: "Subunternehmer-Services",
        desc: "Unterstützen Sie Ihr Team bei hoher Auslastung oder für Projekte, die spezielles Fachwissen erfordern (Next.js, Supabase, n8n-Integrationen, KI-Agenten).",
        bullets: ["Planmäßige Lieferung gemäß Kapsel und Zeitplan", "Sauberer, dokumentierter Code", "Nahtlose Git- und Jira-Workflow-Integration"],
        details: {
          forWhom: "Softwareunternehmen und Entwicklungsstudios, die über interne Teams verfügen, aber Kapazitätsgrenzen überschreiten oder spezielles Fachwissen benötigen (n8n, Supabase, KI-Agenten).",
          albanexaResponsibility: "Codierung und Testen definierter technischer Aufgaben oder Module gemäß Ihren Git/Jira-Workflow-Standards.",
          partnerResponsibility: "Produktmanagement, globale Architekturentscheidungen, Aufgabenpriorisierung und Code-Reviews.",
          commModel: "Integrierte Zusammenarbeit durch Beitritt zu Ihren internen Slack-, Jira- oder GitHub-Workspaces.",
          delivery: "GitHub-Pull-Requests (PRs) direkt an die Repository-Branches des Partners gesendet.",
          privacy: "Umfassendes Software-NDA und geistige Eigentumsrechte liegen direkt beim Partner.",
          pricing: "Flexible Preismodelle basierend auf Person-Tag-Raten oder Sprint-/Projektbedingungen.",
          firstStep: "Lassen Sie uns ein kurzes Telefonat vereinbaren, um unsere technischen Fähigkeiten und den Git-Workflow zu bewerten."
        }
      },
      {
        icon: Zap,
        title: "Agenturlösungen",
        desc: "Helfen Sie Design-, SEO- oder Werbeagenturen, fortschrittliche Web-Infrastrukturen, API-Automatisierungen und benutzerdefinierte Datenbankintegrationen zu erstellen.",
        bullets: ["Core Web Vitals Optimierungsziele", "Maßgeschneiderte API- und Webhook-Verbindungen", "Skalierbare Cloud-Datenbank-Setups"],
        details: {
          forWhom: "Kreativagenturen, die Conversions steigern möchten, indem sie schnelle Websites und Workflow-Automatisierungen anbieten.",
          albanexaResponsibility: "Entwicklung moderner Next.js-Websites, Geschwindigkeitsoptimierungen und Einrichtung technischer SEO-Strukturen.",
          partnerResponsibility: "Kreativkonzept-Design, Copywriting, Markenpositionierung und Kundenbeziehungsmanagement.",
          commModel: "Gemeinsame Kundentreffen als Partner oder stille White-Label-Zusammenarbeit im Hintergrund je nach Wunsch.",
          delivery: "Eine Live-Webanwendung, die vollständig getestet und mit konfigurierten Schemastrukturen versehen ist.",
          privacy: "Möglichkeit, unter Ihrem Agenturnamen (White-Label) oder als unser offizieller Lösungspartner zu arbeiten.",
          pricing: "Spezielle Agenturrabatte basierend auf Umfang und Volumen der Arbeit.",
          firstStep: "Lassen Sie uns die Webentwicklungsbedürfnisse und die Projekthäufigkeit Ihrer Agentur besprechen."
        }
      },
      {
        icon: Code,
        title: "Designstudio-Partnerschaft",
        desc: "Setzen Sie Ihre Figma-Designs pixelgenau in Next.js-Code mit flüssigen Framer Motion-Animationen und voller Reaktionsfähigkeit um.",
        bullets: ["Hohe visuelle Wiedergabetreue zu freigegebenen Designs", "Moderne CSS- und Animationsbibliotheken", "Mobile-first Implementierung"],
        details: {
          forWhom: "UI/UX-Designstudios, die eine saubere, responsive und leistungsstarke Umsetzung ihrer Designs mit erstklassigen Webanimationen wünschen.",
          albanexaResponsibility: "Pixelgenaue Konvertierung von Figma-Layouts in Next.js- und Tailwind-CSS-Code mit Mikrointeraktionen.",
          partnerResponsibility: "Bereitstellung sauberer Figma-Dateien basierend auf responsiven Grids und Design-Tokens.",
          commModel: "Echtzeit-Synchronisierung zwischen Designer und Entwickler per Slack und Figma-Kommentaren.",
          delivery: "Eine animierte, performanceoptimierte Frontend-Codebasis bereit für die Produktionsbereitstellung.",
          privacy: "Klare vertragliche Vereinbarungen zur Wahrung der gegenseitigen Design- und Codeeigentumsrechte.",
          pricing: "Transparente Preisgestaltung pro Seite basierend auf Seitenzahl und Animationskomplexität.",
          firstStep: "Teilen Sie eine aktive Figma-Datei und lassen Sie uns den Konvertierungs- und Animationsumfang definieren."
        }
      }
    ] as PartnershipModel[],
    whyHeading: "Warum Albanexa?",
    whyDesc: "Wir bieten die Zuverlässigkeit, Leistung und Kommunikation, die Sie von einem Technologiepartner erwarten.",
    whyPoints: [
      { title: "Technische Exzellenz", desc: "Hohe Engineering-Standards mit Next.js 16, Tailwind v4 und modernen Cloud-Infrastrukturen." },
      { title: "Pünktlich & Budgetgerecht", desc: "Strikte Einhaltung von Projektzeitplänen und Budgetgrenzen ohne versteckte Kosten." },
      { title: "Klare Kommunikation", desc: "Kein Tech-Jargon. Verfolgbare Workflows mit strukturierten Updates und sauberen Git-Historien." }
    ],
    ctaTitle: "Was können wir zusammen aufbauen?",
    ctaDesc: "Lassen Sie uns ein kurzes Gespräch vereinbaren, um anstehende Projekte zu bewerten, unsere Preisstrukturen zu besprechen oder uns einfach vorzustellen.",
    ctaPrimary: "Let's discuss our partnership model",
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

          <div className="grid gap-8">
            {c.models.map((model, idx) => {
              const Icon = model.icon;
              const isExpanded = expandedIdx === idx;
              return (
                <div
                  key={idx}
                  className="card-surface flex flex-col justify-between rounded-2xl p-6 md:p-8 border border-line hover:border-accent/40 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mb-4">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <button
                        onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                        className="flex items-center gap-1.5 rounded-lg border border-line bg-surface/20 px-3 py-1.5 text-xs font-semibold text-muted hover:text-ink transition-colors"
                      >
                        {isExpanded ? l.lessDetails : l.moreDetails}
                        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                    <h3 className="display text-xl font-bold text-ink mb-3">
                      {model.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6 max-w-3xl">
                      {model.desc}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="grid gap-2 border-t border-line/60 pt-4 sm:grid-cols-3">
                    {model.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-muted">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Expanded B2B details */}
                  {isExpanded && (
                    <div className="mt-6 border-t border-line/60 pt-6 grid gap-6 sm:grid-cols-2 text-xs leading-relaxed text-muted animate-[fadeIn_0.3s_ease]">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.forWhom}</h4>
                          <p>{model.details.forWhom}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.albanexa}</h4>
                          <p>{model.details.albanexaResponsibility}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.partner}</h4>
                          <p>{model.details.partnerResponsibility}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.comm}</h4>
                          <p>{model.details.commModel}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.delivery}</h4>
                          <p>{model.details.delivery}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.privacy}</h4>
                          <p>{model.details.privacy}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.pricing}</h4>
                          <p>{model.details.pricing}</p>
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-xs uppercase tracking-wider mb-1">{l.firstStep}</h4>
                          <p className="text-accent font-medium">{model.details.firstStep}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Albanexa */}
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
