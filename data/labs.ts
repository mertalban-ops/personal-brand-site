// Albanexa Labs — dynamic project universe data model.
// One published project or learning link (category "training") == one apple on the Tree of Life.
// `id` is STABLE and never changes: it drives deterministic apple placement,
// so adding/removing projects never reshuffles existing apples.

import type { LanguageCode } from "@/context/LanguageContext";

export type LocalizedText = { tr: string; en: string; de: string };

export type LabCategory =
  | "customer-project"
  | "product-lab"
  | "internal-project"
  | "concept-work"
  | "training";

export interface LabPrompt {
  title: LocalizedText;
  content: string;
  tool?: string;
}

export interface LabDownload {
  label: LocalizedText;
  url: string;
}

export interface LabProject {
  /** Stable identity — never change this once assigned. Drives apple anchoring. */
  id: string;
  slug: string;
  /** Brand name, language-neutral. */
  title: string;
  summary: LocalizedText;
  description: LocalizedText;
  category: LabCategory;
  /** Hex accent used for the hover label + a faint apple tint. */
  accentColor: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt?: string;
  featured?: boolean;
  tools?: string[];
  technologies?: string[];
  demoUrl?: string;
  repositoryUrl?: string;
  /** Link to the existing corporate case-study page, when one exists. */
  caseUrl?: string;
  thumbnail?: string;
  heroVideo?: string;
  gallery?: string[];
  prompts?: LabPrompt[];
  installationSteps?: LocalizedText[];
  downloads?: LabDownload[];
  /** Slugs of related lab projects. */
  related?: string[];
  /** Learning links only: the external course/guide the apple points to. */
  externalUrl?: string;
  /** Learning links only: who publishes the resource. */
  provider?: string;
}

export const labCategoryLabel: Record<LabCategory, LocalizedText> = {
  "customer-project": { tr: "Müşteri Projesi", en: "Client Project", de: "Kundenprojekt" },
  "product-lab": { tr: "Ürün Laboratuvarı", en: "Product Lab", de: "Produktlabor" },
  "internal-project": { tr: "İç Proje", en: "Internal Project", de: "Internes Projekt" },
  "concept-work": { tr: "Konsept Çalışma", en: "Concept Work", de: "Konzeptarbeit" },
  training: { tr: "Eğitim", en: "Learning", de: "Lernen" },
};

export function isTraining(p: LabProject): boolean {
  return p.category === "training";
}

export function pickText(text: LocalizedText, lang: LanguageCode): string {
  return text[lang] ?? text.tr;
}

// Seeded from the real projects already in data/projects.ts.
// Only fields that are genuinely present are filled — no placeholder galleries,
// prompts or downloads (the detail page renders only what exists).
export const labProjects: LabProject[] = [
  {
    id: "lab-stockapp",
    slug: "stockapp",
    title: "StockApp",
    category: "customer-project",
    accentColor: "#38bdf8",
    status: "published",
    createdAt: "2025-01-10",
    summary: {
      tr: "Stok, cari hesap ve tahsilat takip sistemi",
      en: "Inventory, finance & receivables tracking system",
      de: "System für Lager, Konten & Forderungen",
    },
    description: {
      tr: "Stok, müşteri bakiyesi ve tahsilatı tek arayüzde toplayan özel web uygulaması. Hesap ekstresi hazırlama süresi 2 saatten 30 saniyeye indi.",
      en: "A custom web app unifying stock, client balances and collections in one interface. Account statement prep dropped from 2 hours to 30 seconds.",
      de: "Eine maßgeschneiderte Web-App, die Lager, Kundensalden und Einnahmen vereint. Kontoauszug-Erstellung von 2 Stunden auf 30 Sekunden reduziert.",
    },
    technologies: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    tools: ["Cursor", "Claude Code", "Supabase Studio"],
    caseUrl: "/projeler/stockapp",
    related: ["hezer-auto-service"],
  },
  {
    id: "lab-hezer-auto-service",
    slug: "hezer-auto-service",
    title: "Hezer Auto Service",
    category: "customer-project",
    accentColor: "#10b981",
    status: "published",
    createdAt: "2025-03-02",
    summary: {
      tr: "Araç kabul, onarım ve oto servis operasyon sistemi",
      en: "Vehicle intake, repair & auto-service operations system",
      de: "Fahrzeugannahme-, Reparatur- & Autoservice-System",
    },
    description: {
      tr: "Araç kabulünden teslime kadar tüm servis döngüsünü kayıt altına alan mobil öncelikli operasyon sistemi. Playwright ile uçtan uca test edildi.",
      en: "A mobile-first operations system logging the full service lifecycle from intake to delivery. End-to-end tested with Playwright.",
      de: "Ein mobile-first Betriebssystem, das den gesamten Service-Lebenszyklus erfasst. End-to-End getestet mit Playwright.",
    },
    technologies: ["React Native", "Expo", "Supabase", "Playwright"],
    tools: ["Claude Code", "Expo EAS", "Playwright"],
    caseUrl: "/projeler/hezer-auto-service",
    related: ["hezer-otosanziman-site", "stockapp"],
  },
  {
    id: "lab-hezer-site",
    slug: "hezer-otosanziman-site",
    title: "Hezer Otoşanzıman",
    category: "customer-project",
    accentColor: "#f59e0b",
    status: "published",
    createdAt: "2025-04-18",
    summary: {
      tr: "Oto servis kurumsal web sitesi",
      en: "Auto-service corporate website",
      de: "Autoservice-Unternehmenswebsite",
    },
    description: {
      tr: "Servis uzmanlığını ve iletişim bilgilerini öne çıkaran, yerel SEO optimize edilmiş dönüşüm odaklı kurumsal web sitesi.",
      en: "A conversion-focused, local-SEO-optimized corporate site showcasing the shop's expertise and contact details.",
      de: "Eine konversionsorientierte, lokal-SEO-optimierte Unternehmenswebsite, die Expertise und Kontaktdaten hervorhebt.",
    },
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    tools: ["Claude Code", "Vercel"],
    caseUrl: "/projeler/hezer-otosanziman-site",
    related: ["hezer-auto-service"],
  },
  {
    id: "lab-carpass",
    slug: "carpass",
    title: "CARPASS",
    category: "product-lab",
    accentColor: "#a78bfa",
    status: "published",
    createdAt: "2025-06-01",
    summary: {
      tr: "Araç geçmişi ve yapay zekâ destekli risk analiz platformu",
      en: "Vehicle history & AI-driven risk analysis platform",
      de: "Fahrzeughistorie & KI-gestützte Risikoanalyse-Plattform",
    },
    description: {
      tr: "Araç verilerini toplayıp yapay zekâ ile risk skoruna ve Trust Report'a dönüştüren multi-tenant SaaS platformu. n8n otomasyonları ve AI ajanları ile.",
      en: "A multi-tenant SaaS platform that aggregates vehicle data and turns it into an AI risk score and Trust Report, powered by n8n automations and AI agents.",
      de: "Eine multi-tenant SaaS-Plattform, die Fahrzeugdaten mit KI in Risikobewertung und Trust Report verwandelt — mit n8n-Automatisierungen und KI-Agenten.",
    },
    technologies: ["React Native", "Supabase", "n8n", "AI Agents"],
    tools: ["Claude Code", "n8n", "Anthropic API"],
    caseUrl: "/projeler/carpass",
    featured: true,
    related: ["stockapp"],
  },
  // ---- Learning links (category "training") ----
  // Curated free, official learning resources for the stack Albanexa builds with.
  // They grow on the tree next to the projects; the detail page links out via externalUrl.
  {
    id: "lab-training-nextjs-learn",
    slug: "egitim-nextjs-learn",
    title: "Next.js Learn",
    category: "training",
    accentColor: "#7dd3fc",
    status: "published",
    createdAt: "2026-10-27",
    externalUrl: "https://nextjs.org/learn",
    provider: "Vercel",
    summary: {
      tr: "Next.js'in resmi, ücretsiz ve uygulamalı kursu",
      en: "The official, free, hands-on Next.js course",
      de: "Der offizielle, kostenlose Next.js-Praxiskurs",
    },
    description: {
      tr: "Vercel'in hazırladığı resmi kurs: App Router, veri çekme, sunucu bileşenleri ve dağıtım adımlarını gerçek bir uygulama üzerinden öğretir. Albanexa sitelerinin temelindeki teknolojiye en doğrudan giriş.",
      en: "Vercel's official course: App Router, data fetching, server components and deployment, taught by building a real app. The most direct way into the technology behind Albanexa's sites.",
      de: "Der offizielle Kurs von Vercel: App Router, Datenabruf, Server Components und Deployment anhand einer echten App. Der direkteste Einstieg in die Technologie hinter den Albanexa-Websites.",
    },
    technologies: ["Next.js", "React", "TypeScript"],
  },
  {
    id: "lab-training-n8n-courses",
    slug: "egitim-n8n-kurslari",
    title: "n8n Courses",
    category: "training",
    accentColor: "#fda4af",
    status: "published",
    createdAt: "2026-10-27",
    externalUrl: "https://docs.n8n.io/courses/",
    provider: "n8n",
    summary: {
      tr: "İş akışı otomasyonu için resmi n8n kursları",
      en: "Official n8n courses for workflow automation",
      de: "Offizielle n8n-Kurse für Workflow-Automatisierung",
    },
    description: {
      tr: "n8n'in resmi başlangıç ve ileri seviye kursları: tetikleyiciler, veri dönüştürme, hata yönetimi ve gerçek iş akışları. Albanexa projelerindeki otomasyonlar bu araçla kuruluyor.",
      en: "n8n's official beginner and advanced courses: triggers, data transformation, error handling and real-world workflows. The automations in Albanexa's projects are built with this tool.",
      de: "Die offiziellen Einsteiger- und Fortgeschrittenenkurse von n8n: Trigger, Datentransformation, Fehlerbehandlung und echte Workflows. Die Automatisierungen in Albanexa-Projekten entstehen mit diesem Tool.",
    },
    technologies: ["n8n", "Otomasyon"],
  },
  {
    id: "lab-training-supabase-docs",
    slug: "egitim-supabase",
    title: "Supabase Docs",
    category: "training",
    accentColor: "#5eead4",
    status: "published",
    createdAt: "2026-10-27",
    externalUrl: "https://supabase.com/docs",
    provider: "Supabase",
    summary: {
      tr: "Veritabanı, kimlik doğrulama ve RLS için resmi rehberler",
      en: "Official guides for database, auth and RLS",
      de: "Offizielle Leitfäden zu Datenbank, Auth und RLS",
    },
    description: {
      tr: "Supabase'in resmi dokümantasyonu ve hızlı başlangıç rehberleri: Postgres veritabanı, kimlik doğrulama, satır düzeyinde güvenlik (RLS) ve depolama. StockApp ve CARPASS'ın arka ucu bu altyapı üzerinde.",
      en: "Supabase's official docs and quick-start guides: Postgres database, authentication, row-level security (RLS) and storage. StockApp's and CARPASS's back ends run on it.",
      de: "Die offizielle Supabase-Dokumentation mit Schnellstart-Leitfäden: Postgres, Authentifizierung, Row-Level-Security (RLS) und Storage. Das Backend von StockApp und CARPASS läuft darauf.",
    },
    technologies: ["Supabase", "PostgreSQL", "RLS"],
  },
  {
    id: "lab-training-anthropic-courses",
    slug: "egitim-anthropic-kurslari",
    title: "Anthropic Courses",
    category: "training",
    accentColor: "#fcd34d",
    status: "published",
    createdAt: "2026-10-27",
    externalUrl: "https://github.com/anthropics/courses",
    provider: "Anthropic",
    summary: {
      tr: "Prompt mühendisliği ve Claude API için ücretsiz kurslar",
      en: "Free courses on prompt engineering and the Claude API",
      de: "Kostenlose Kurse zu Prompt Engineering und der Claude API",
    },
    description: {
      tr: "Anthropic'in açık kaynak kurs serisi: API temelleri, prompt mühendisliği, gerçek dünya prompt'ları ve araç kullanımı. Albanexa'nın yapay zekâ destekli iş akışlarının temel tekniklerini kapsar.",
      en: "Anthropic's open-source course series: API fundamentals, prompt engineering, real-world prompting and tool use. Covers the core techniques behind Albanexa's AI-assisted workflows.",
      de: "Die Open-Source-Kursreihe von Anthropic: API-Grundlagen, Prompt Engineering, Prompts aus der Praxis und Tool Use. Deckt die Kerntechniken hinter Albanexas KI-gestützten Workflows ab.",
    },
    technologies: ["Claude API", "Prompt Engineering"],
  },
];

/** Everything that grows on the tree: published projects AND learning links. */
export function getPublishedLabProjects(): LabProject[] {
  return labProjects.filter((p) => p.status === "published");
}

export function getLabProject(slug: string): LabProject | undefined {
  return labProjects.find((p) => p.slug === slug);
}
