"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Layout, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useLanguage } from "@/context/LanguageContext";

export default function WebSiteleriClient() {
  const { language, t } = useLanguage();

  const trContent = {
    crumbs: [{ label: "Ana Sayfa", href: "/" }, { label: "Çözümler", href: "/cozumler" }, { label: "Kurumsal Web Siteleri" }],
    heroKicker: "Sistem Çözümleri",
    heroTitle: "Markanızı yalnızca görünür değil, ikna edici hale getiren web siteleri",
    heroDesc: "Next.js ve Tailwind CSS’in modern gücüyle; hızıyla arama motorlarını, tasarımıyla ziyaretçileri etkileyen, operasyonel hedeflerinize hizmet eden web siteleri kuruyoruz.",
    primaryCta: "Web Sitesi Projesi Konuşalım",
    secondaryCta: "Vaka Çalışmasını İnceleyin",
    problemsKicker: "Neden Önemli?",
    problemsTitle: "Web sitenizdeki hangi sorunları çözüyoruz?",
    problems: [
      { p: "Site eski veya amatör görünüyor, markanıza olan güveni zedeliyor.", s: "Kurumsal kimliğinizi yansıtan, modern ve kurumsal tasarım dili." },
      { p: "Ziyaretçiler sitenizi inceliyor ancak iletişime geçmeden çıkıyor.", s: "Müşterinin karar yolculuğuna uygun net sayfa akışı ve CTA yerleşimi." },
      { p: "Siteniz yavaş yükleniyor, mobil kullanıcılar beklemekten sıkılıyor.", s: "Next.js statik site üretimi (SSG) ve Core Web Vitals optimizasyonu." },
      { p: "Google ve arama motorlarında hizmetleriniz bulunamıyor.", s: "Teknik SEO standartları, sitemap, meta yapılandırması ve structured data." }
    ],
    vsKicker: "Temel Farklar",
    vsTitle: "Web Sitesi ile Web Uygulaması arasındaki fark nedir?",
    vsDesc: "İşletmenizin hangi çözüme ihtiyacı olduğunu netleştirmek, bütçe ve zaman planlaması için ilk adımdır.",
    vsHeaders: ["Kriter", "Kurumsal Web Sitesi", "Web Uygulaması (Panel)"],
    vsRows: [
      ["Ana Amaç", "Marka tanıtımı, güven oluşturma, hizmet anlatımı ve lead (müşteri talebi) toplama.", "Kullanıcıların giriş yaptığı, veri eklediği/sildiği, süreç yönettiği ve rapor aldığı çalışan sistem."],
      ["Kullanıcı Etkileşimi", "İçerik okuma, form doldurma, proje inceleme, WhatsApp’tan doğrudan iletişim.", "Stok girişi, borç kaydı, iş emri atama, PDF hesap ekstresi paylaşma, dashboard izleme."],
      ["Teknoloji Odağı", "Hızlı FCP (ilk açılış), kusursuz SEO, statik sayfalar (SSG), görsel geçişler ve responsive uyum.", "Güvenli veritabanı (Supabase), rol bazlı yetkilendirme (RBAC), API entegrasyonları, karmaşık formlar."],
      ["Kimler İçin?", "Hizmetlerini internette profesyonelce sunup, yeni B2B müşteriler kazanmak isteyen her işlet.", "Operasyonlarını defter ve Excel’den kurtarıp dijital sisteme bağlamak isteyen KOBİ’ler."]
    ],
    typesKicker: "Hizmet Alanları",
    typesTitle: "Hangi tür web siteleri geliştiriyoruz?",
    types: [
      { title: "Kurumsal Web Sitesi", desc: "Şirketinizin vizyonunu, referanslarını ve hizmetlerini müşterilerinize en güvenilir şekilde sunan kurumsal dijital kimlik." },
      { title: "Kişisel Marka & Portfolyo", desc: "Uzmanlığınızı, projelerinizi ve iş yapış şeklinizi öne çıkararak B2B müşterilerin doğrudan sizinle bağ kurmasını sağlayan kişisel marka alanı." },
      { title: "SaaS Tanıtım & Landing Page", desc: "Yazılım veya dijital ürününüzün değer önerisini, fiyatlandırma planlarını ve özelliklerini sunarak ziyaretçileri aboneliğe dönüştüren tek sayfa vitrin." },
      { title: "3D & İnteraktif Deneyimler", desc: "Ürünlerinizi veya hizmet süreçlerinizi tarayıcı üzerinde 3D modeller, etkileşimli grafikler ve akıcı animasyonlarla anlatan premium yapılar." }
    ],
    techKicker: "Tasarım & Mühendislik",
    techTitle: "Sıfırdan yazılan kod, işletmenize tam uyum sağlayan yapı",
    techDesc: "Solvaria olarak hazır şablonlar, hantal WordPress eklentileri veya yavaş web kurucuları kullanmıyoruz. Sitenizin her satırını Next.js ile sıfırdan geliştiriyoruz.",
    techFeatures: [
      { title: "Core Web Vitals Standartları", desc: "Açılış hızı Google sıralama kriterleri için en kritik etkendir. Saniyeler içinde açılan sayfalar üretiyoruz." },
      { title: "Klavye ve Ekran Okuyucu Uyumu (A11y)", desc: "Web sitenizin herkes tarafından kullanılabilir olması için semantik etiketleme ve odak yönetimini önemsiyoruz." },
      { title: "Structured Data Entegrasyonu", desc: "Arama motorlarının işletmenizi, projelerinizi ve sunduğunuz çözümleri doğru tanıması için arka plana şema yapıları kuruyoruz." }
    ],
    caseTitle: "Personal Brand Site Örneği",
    caseBadge: "Aktif Vaka",
    caseDesc: "Şu an incelediğiniz Solvaria web sitesi, Next.js 16, Tailwind CSS 4 ve Framer Motion ile geliştirdiğimiz çok sayfalı premium kişisel marka sitesine canlı bir örnektir.",
    caseScoresLabel: "Performans Skorları:",
    caseScoresVal: "%98+ Mobil / %100 Masaüstü",
    caseTechLabel: "Teknoloji Stack:",
    caseTechVal: "Next.js App Router, TS, Tailwind v4",
    caseFeaturesLabel: "Özellikler:",
    caseFeaturesVal: "Çok dilli, interaktif, responsive",
    caseCta: "Vaka Çalışmasını İncele",
    processKicker: "Çalışma Şeklimiz",
    processTitle: "Web siteniz nasıl geliştirilecek?",
    processSteps: [
      { step: "01", title: "İhtiyacı Anlama", text: "Hedef kitlenizi, markanızın güçlü yönlerini ve rakipleri analiz ederek bilgi mimarisini kurguluyoruz." },
      { step: "02", title: "Yapıyı Tasarlama", text: "Sade, okunabilir ve dönüşüm odaklı sayfa akışlarını, mobil öncelikli olacak şekilde tasarlıyoruz." },
      { step: "03", title: "Next.js Geliştirme", text: "Tasarımı en temiz kod yapısıyla, SEO kurallarına ve hız bütçelerine bağlı kalarak Next.js ile kodluyoruz." },
      { step: "04", title: "Test ve Yayına Alma", text: "Tüm linkleri, formları, Core Web Vitals skorlarını ve responsive yapıyı test edip sitenizi Vercel’de yayına alıyoruz." }
    ],
    processMore: "Çalışma Sürecimizin Tüm Aşamalarını Görün",
    finalKicker: "Hemen Başlayın",
    finalTitle: "Müşterilerinizin güvenle inceleyeceği dijital vitrininizi birlikte kuralım",
    finalDesc: "Hizmet kapsamını belirlemek, işletmeniz için doğru sayfa yapısını çıkarmak ve fiyat teklifi almak için 15 dakikalık ücretsiz bir keşif görüşmesi planlayabilirsiniz.",
    finalPrimary: "Projenizi Anlatın",
    finalSecondary: "WhatsApp'tan Yazın"
  };

  const enContent = {
    crumbs: [{ label: "Home", href: "/" }, { label: "Solutions", href: "/cozumler" }, { label: "Corporate Websites" }],
    heroKicker: "System Solutions",
    heroTitle: "Websites that make your brand not just visible, but convincing",
    heroDesc: "With the modern power of Next.js and Tailwind CSS, we build websites that impress search engines with their speed and visitors with their bespoke design.",
    primaryCta: "Let's Discuss a Website Project",
    secondaryCta: "Examine the Case Study",
    problemsKicker: "Why It Matters?",
    problemsTitle: "Which bottlenecks do we resolve on your website?",
    problems: [
      { p: "Website looks old or amateur, harming trust in your brand.", s: "A modern design language reflecting your corporate identity." },
      { p: "Visitors explore your site but leave without contacting you.", s: "Clear page flow and CTA placement tailored to decision journeys." },
      { p: "Your site loads slowly, frustrating mobile visitors.", s: "Next.js Static Site Generation (SSG) and Core Web Vitals optimization." },
      { p: "Your services cannot be found on Google and search engines.", s: "Technical SEO standards, sitemap, meta setup, and structured data." }
    ],
    vsKicker: "Key Differences",
    vsTitle: "What is the difference between a Website and a Web App?",
    vsDesc: "Clarifying which solution your business needs is the first step for budget and timeline planning.",
    vsHeaders: ["Criterion", "Corporate Website", "Web Application (Portal)"],
    vsRows: [
      ["Main Purpose", "Brand presentation, establishing trust, explaining services, and gathering leads.", "An active system where users log in, input/delete data, manage workflows, and receive reports."],
      ["User Interaction", "Reading content, filling out forms, examining case studies, direct WhatsApp contact.", "Stock entries, logging debts, assigning work orders, sharing PDF statements, viewing dashboards."],
      ["Tech Focus", "Fast FCP (first paint), flawless SEO, static pages (SSG), visual transitions, and responsive fit.", "Secure database (Supabase), role-based access control (RBAC), API integrations, complex forms."],
      ["Who is it for?", "Any business looking to showcase services professionally and win new B2B clients.", "SMEs wanting to rid their operations of notebooks and Excel, connecting them to a digital tool."]
    ],
    typesKicker: "Service Focus",
    typesTitle: "What types of websites do we build?",
    types: [
      { title: "Corporate Website", desc: "A corporate digital identity presenting your company's vision, references, and services in the most reliable way." },
      { title: "Personal Brand & Portfolio", desc: "A personal brand space showcasing your expertise, projects, and work methods to help B2B clients connect directly with you." },
      { title: "SaaS Presentation & Landing Page", desc: "A single-page showcase presenting your software or digital product's value proposition, plans, and features to convert users." },
      { title: "3D & Interactive Experiences", desc: "Premium layouts explaining your products or services using 3D models, interactive graphics, and fluid browser animations." }
    ],
    techKicker: "Design & Engineering",
    techTitle: "Bespoke code, a structure fully tailored to your business",
    techDesc: "At Solvaria, we do not use templates, heavy WordPress plugins, or slow website builders. We write every line of code from scratch using Next.js.",
    techFeatures: [
      { title: "Core Web Vitals Standards", desc: "Initial load speed is the most critical factor for Google ranking. We build pages that open in seconds." },
      { title: "Keyboard & Screen Reader Compatibility (A11y)", desc: "We prioritize semantic markup and focus management so your website is accessible to everyone." },
      { title: "Structured Data Integration", desc: "We set up schema structures in the backend to help search engines correctly identify your business, projects, and solutions." }
    ],
    caseTitle: "Personal Brand Site Example",
    caseBadge: "Active Case",
    caseDesc: "The Solvaria website you are currently exploring is a live example of a premium, multi-page personal brand site built with Next.js 16, Tailwind CSS 4, and Framer Motion.",
    caseScoresLabel: "Performance Scores:",
    caseScoresVal: "%98+ Mobile / %100 Desktop",
    caseTechLabel: "Technology Stack:",
    caseTechVal: "Next.js App Router, TS, Tailwind v4",
    caseFeaturesLabel: "Features:",
    caseFeaturesVal: "Multilingual, interactive, responsive",
    caseCta: "Examine the Case Study",
    processKicker: "Our Method",
    processTitle: "How will your website be developed?",
    processSteps: [
      { step: "01", title: "Understanding Needs", text: "We define the information architecture by analyzing your target audience, brand strengths, and competitors." },
      { step: "02", title: "Designing Layouts", text: "We design simple, readable, and conversion-focused page flows, prioritized for mobile screens." },
      { step: "03", title: "Next.js Coding", text: "We write the designs into clean code, maintaining strict technical SEO guidelines and page speed budgets." },
      { step: "04", title: "Testing & Launch", text: "We audit all links, forms, Core Web Vitals, and responsiveness before publishing your site live on Vercel." }
    ],
    processMore: "View All Steps of Our Engagement Workflow",
    finalKicker: "Start Now",
    finalTitle: "Let's build your digital vitrine that clients will inspect with confidence",
    finalDesc: "You can book a free 15-minute discovery session to determine the scope of services, define page layouts, and receive a price proposal.",
    finalPrimary: "Share Your Project",
    finalSecondary: "Chat on WhatsApp"
  };

  const deContent = {
    crumbs: [{ label: "Startseite", href: "/" }, { label: "Lösungen", href: "/cozumler" }, { label: "Unternehmenswebsites" }],
    heroKicker: "Systemlösungen",
    heroTitle: "Websites, die Ihre Marke nicht nur sichtbar, sondern überzeugend machen",
    heroDesc: "Mit der modernen Power von Next.js und Tailwind CSS bauen wir Websites, die Suchmaschinen durch Geschwindigkeit und Besucher durch maßgeschneidertes Design überzeugen.",
    primaryCta: "Lass uns über ein Website-Projekt sprechen",
    secondaryCta: "Fallstudie ansehen",
    problemsKicker: "Warum ist das wichtig?",
    problemsTitle: "Welche Engpässe lösen wir auf Ihrer Website?",
    problems: [
      { p: "Die Website sieht alt oder amateurhaft aus und schadet dem Vertrauen in Ihre Marke.", s: "Eine moderne Designsprache, die Ihre Corporate Identity widerspiegelt." },
      { p: "Besucher erkunden Ihre Website, gehen aber wieder, ohne Sie zu kontaktieren.", s: "Klarer Seitenfluss und Platzierung von CTAs, die auf die Entscheidungsreise abgestimmt sind." },
      { p: "Ihre Website lädt langsam, was mobile Besucher frustriert.", s: "Next.js Static Site Generation (SSG) und Core Web Vitals Optimierung." },
      { p: "Ihre Dienstleistungen können bei Google und Suchmaschinen nicht gefunden werden.", s: "Technische SEO-Standards, Sitemap, Meta-Setup und strukturierte Daten." }
    ],
    vsKicker: "Hauptunterschiede",
    vsTitle: "Was ist der Unterschied zwischen einer Website und einer Web-App?",
    vsDesc: "Die Klärung, welche Lösung Ihr Unternehmen benötigt, ist der erste Schritt zur Budget- und Zeitplanung.",
    vsHeaders: ["Kriterium", "Unternehmenswebsite", "Webanwendung (Portal)"],
    vsRows: [
      ["Hauptzweck", "Markenpräsentation, Vertrauensaufbau, Erläuterung von Dienstleistungen und Lead-Generierung.", "Ein aktives System, in dem sich Benutzer anmelden, Daten eingeben/löschen, Arbeitsabläufe verwalten und Berichte erhalten."],
      ["Benutzerinteraktion", "Inhalte lesen, Formulare ausfüllen, Fallstudien prüfen, direkter WhatsApp-Kontakt.", "Lagerbuchungen, Erfassung von Schulden, Zuweisung von Arbeitsaufträgen, Weitergabe von PDF-Auszügen, Anzeige von Dashboards."],
      ["Tech-Fokus", "Schnelles FCP (First Paint), fehlerfreies SEO, statische Seiten (SSG), visuelle Übergänge und responsive Passform.", "Sichere Datenbank (Supabase), rollenbasierte Zugriffskontrolle (RBAC), API-Integrationen, komplexe Formulare."],
      ["Für wen?", "Jedes Unternehmen, das Dienstleistungen professionell präsentieren und neue B2B-Kunden gewinnen möchte.", "KMUs, die ihre Abläufe von Notizbüchern und Excel befreien und mit einem digitalen Tool verbinden möchten."]
    ],
    typesKicker: "Dienstleistungsfokus",
    typesTitle: "Welche Arten von Websites bauen wir?",
    types: [
      { title: "Unternehmenswebsite", desc: "Eine digitale Identität eines Unternehmens, die die Vision, Referenzen und Dienstleistungen Ihres Unternehmens auf zuverlässigste Weise präsentiert." },
      { title: "Persönliche Marke & Portfolio", desc: "Ein persönlicher Markenbereich, der Ihr Fachwissen, Ihre Projekte und Arbeitsmethoden präsentiert, um B2B-Kunden zu helfen, sich direkt mit Ihnen zu verbinden." },
      { title: "SaaS-Präsentation & Landingpage", desc: "Ein einseitiges Showcase, das das Wertversprechen, die Pläne und die Funktionen Ihres Software- oder Digitalprodukts präsentiert, um Benutzer zu konvertieren." },
      { title: "3D & Interaktive Erlebnisse", desc: "Premium-Layouts, die Ihre Produkte oder Dienstleistungen mithilfe von 3D-Modellen, interaktiven Grafiken und flüssigen Browser-Animationen erklären." }
    ],
    techKicker: "Design & Engineering",
    techTitle: "Maßgeschneiderter Code, eine Struktur, die vollständig auf Ihr Unternehmen zugeschnitten ist",
    techDesc: "Bei Solvaria verwenden wir keine Vorlagen, schweren WordPress-Plugins oder langsamen Website-Builder. Wir schreiben jede Zeile Code von Grund auf neu mit Next.js.",
    techFeatures: [
      { title: "Core Web Vitals Standards", desc: "Die anfängliche Ladegeschwindigkeit ist der wichtigste Faktor für das Google-Ranking. Wir bauen Seiten, die sich in Sekunden öffnen." },
      { title: "Tastatur- und Bildschirmleser-Kompatibilität (A11y)", desc: "Wir legen Wert auf semantisches Markup und Fokusverwaltung, damit Ihre Website für jeden zugänglich ist." },
      { title: "Integration strukturierter Daten", desc: "Wir richten Schema-Strukturen im Backend ein, damit Suchmaschinen Ihr Unternehmen, Ihre Projekte und Ihre Lösungen korrekt identifizieren können." }
    ],
    caseTitle: "Beispiel für eine persönliche Marken-Website",
    caseBadge: "Aktiver Fall",
    caseDesc: "Die Solvaria-Website, die Sie gerade erkunden, ist ein Live-Beispiel für eine erstklassige, mehrseitige persönliche Marken-Website, die mit Next.js 16, Tailwind CSS 4 und Framer Motion erstellt wurde.",
    caseScoresLabel: "Leistungsbewertungen:",
    caseScoresVal: "%98+ Mobil / %100 Desktop",
    caseTechLabel: "Technologie-Stack:",
    caseTechVal: "Next.js App Router, TS, Tailwind v4",
    caseFeaturesLabel: "Eigenschaften:",
    caseFeaturesVal: "Mehrsprachig, interaktiv, responsive",
    caseCta: "Fallstudie ansehen",
    processKicker: "Unsere Methode",
    processTitle: "Wie wird Ihre Website entwickelt?",
    processSteps: [
      { step: "01", title: "Bedarfsanalyse", text: "Wir definieren die Informationsarchitektur, indem wir Ihre Zielgruppe, Ihre Markenentscheidungen und Ihre Wettbewerber analysieren." },
      { step: "02", title: "Layouts entwerfen", text: "Wir entwerfen einfache, lesbare und konversionsorientierte Seitenabläufe, die für mobile Bildschirme optimiert sind." },
      { step: "03", title: "Next.js-Codierung", text: "Wir setzen die Designs in sauberen Code um und halten uns an strenge technische SEO-Richtlinien und Seitengeschwindigkeitsbudgets." },
      { step: "04", title: "Testen & Launch", text: "Wir überprüfen alle Links, Formulare, Core Web Vitals und die Reaktionsfähigkeit, bevor wir Ihre Website live auf Vercel veröffentlichen." }
    ],
    processMore: "Alle Schritte unseres Engagement-Workflows anzeigen",
    finalKicker: "Jetzt starten",
    finalTitle: "Lassen Sie uns Ihre digitale Vitrine bauen, die Kunden mit Vertrauen inspizieren",
    finalDesc: "Sie können eine kostenlose 15-minütige Discovery-Session buchen, um den Leistungsumfang zu bestimmen, Seitenlayouts zu definieren und ein Preisangebot zu erhalten.",
    finalPrimary: "Teilen Sie Ihr Projekt",
    finalSecondary: "Chat auf WhatsApp"
  };

  const c = language === "en" ? enContent : language === "de" ? deContent : trContent;

  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="mx-auto max-w-6xl px-5">
          <Breadcrumb crumbs={c.crumbs} />
          <p className="mono-label mb-4">{c.heroKicker}</p>
          <h1 className="display text-4xl font-bold text-ink md:text-5xl lg:text-6xl text-balance max-w-4xl">
            {language === "tr" ? (
              <>
                Markanızı yalnızca görünür değil, <span className="text-accent">ikna edici</span> hale getiren web siteleri
              </>
            ) : language === "de" ? (
              <>
                Websites, die Ihre Marke nicht nur sichtbar, sondern <span className="text-accent">überzeugend</span> machen
              </>
            ) : (
              <>
                Websites that make your brand not just visible, but <span className="text-accent">convincing</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {c.heroDesc}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5 inline-block"
            >
              {c.primaryCta}
            </Link>
            <Link
              href="/projeler/personal-brand-site"
              className="rounded-lg border border-line bg-surface/30 px-6 py-3 font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent inline-block"
            >
              {c.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Problems & Solutions */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">{c.problemsKicker}</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              {c.problemsTitle}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.problems.map((item, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-xl border border-line bg-bg-raised/30 p-5"
              >
                <div>
                  <div className="flex items-center gap-2 text-red-400/80 mb-3">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                      {language === "tr" ? "Darboğaz" : language === "de" ? "Engpass" : "Bottleneck"}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed mb-6">{item.p}</p>
                </div>
                <div className="border-t border-line pt-4">
                  <div className="flex items-center gap-2 text-accent mb-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span className="text-[0.65rem] font-semibold uppercase tracking-wider">
                      {language === "tr" ? "Sistem Çözümü" : language === "de" ? "Systemlösung" : "System Solution"}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-ink leading-relaxed">{item.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Comparison table */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">{c.vsKicker}</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              {c.vsTitle}
            </h2>
            <p className="mt-4 text-muted max-w-2xl mx-auto text-sm leading-relaxed">
              {c.vsDesc}
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-line bg-surface/30">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-line bg-bg-raised/50 text-[0.7rem] font-mono text-faint uppercase tracking-wider">
                  <th className="p-4 md:p-5">{c.vsHeaders[0]}</th>
                  <th className="p-4 md:p-5 text-accent">{c.vsHeaders[1]}</th>
                  <th className="p-4 md:p-5 text-blue">{c.vsHeaders[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 text-muted">
                {c.vsRows.map((row, i) => (
                  <tr key={i}>
                    <td className="p-4 md:p-5 font-semibold text-ink">{row[0]}</td>
                    <td className="p-4 md:p-5">{row[1]}</td>
                    <td className="p-4 md:p-5">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>

      {/* Types of websites */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">{c.typesKicker}</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              {c.typesTitle}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {c.types.map((type, i) => (
              <div
                key={i}
                className="card-surface rounded-xl p-6 border border-line/45 hover:border-accent/30 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 mb-4">
                  <Layout className="h-5 w-5 text-accent" />
                </div>
                <h3 className="display text-lg font-bold text-ink mb-2">{type.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Engineering approach and case study */}
      <AnimatedSection>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <p className="mono-label mb-3">{c.techKicker}</p>
              <h2 className="display text-3xl font-bold text-ink mb-6">
                {c.techTitle}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {c.techDesc}
              </p>
              <div className="space-y-4">
                {c.techFeatures.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-ink text-sm">{item.title}</h4>
                      <p className="text-xs text-muted leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="card-surface rounded-2xl p-6 md:p-8 border border-line bg-gradient-to-br from-bg-raised/40 to-bg-raised/10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <span className="text-sm font-semibold text-ink">{c.caseTitle}</span>
                  </div>
                  <span className="rounded bg-accent/10 px-2 py-0.5 text-[0.65rem] font-mono text-accent">
                    {c.caseBadge}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  {c.caseDesc}
                </p>
                <div className="space-y-3 mb-6 border-t border-line/60 pt-4 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted">{c.caseScoresLabel}</span>
                    <span className="font-semibold text-accent">{c.caseScoresVal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{c.caseTechLabel}</span>
                    <span className="font-semibold text-ink">{c.caseTechVal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">{c.caseFeaturesLabel}</span>
                    <span className="font-semibold text-ink">{c.caseFeaturesVal}</span>
                  </div>
                </div>
                <Link
                  href="/projeler/personal-brand-site"
                  className="btn-shine glow-accent flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-center text-xs font-semibold text-black"
                >
                  {c.caseCta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Process step */}
      <AnimatedSection className="band-petrol border-y border-line">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-14">
            <p className="mono-label mb-2">{c.processKicker}</p>
            <h2 className="display text-2xl font-bold text-ink md:text-3xl">
              {c.processTitle}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.processSteps.map((step, idx) => (
              <div key={idx} className="relative rounded-xl border border-line bg-bg-raised/10 p-5">
                <span className="font-mono text-xs font-bold text-accent">{step.step}</span>
                <h3 className="display mt-2 font-bold text-ink text-sm">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed mt-2">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/surec"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              {c.processMore} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Final CTA */}
      <AnimatedSection>
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="mono-label mb-3">{c.finalKicker}</p>
          <h2 className="display text-3xl font-bold text-ink md:text-4xl mb-6">
            {c.finalTitle}
          </h2>
          <p className="text-muted leading-relaxed mb-8 max-w-2xl mx-auto">
            {c.finalDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/iletisim"
              className="btn-shine glow-accent rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-transform hover:-translate-y-0.5 inline-block"
            >
              {c.finalPrimary}
            </Link>
            <a
              href="https://wa.me/905000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-line bg-surface/30 px-6 py-3 font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent inline-block"
            >
              {c.finalSecondary}
            </a>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
