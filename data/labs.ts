// Albanexa Labs — dynamic project universe data model.
// One published project == one apple on the Tree of Life.
// `id` is STABLE and never changes: it drives deterministic apple placement,
// so adding/removing projects never reshuffles existing apples.

import type { LanguageCode } from "@/context/LanguageContext";

export type LocalizedText = { tr: string; en: string; de: string };

export type LabCategory =
  | "customer-project"
  | "product-lab"
  | "internal-project"
  | "concept-work";

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
}

export const labCategoryLabel: Record<LabCategory, LocalizedText> = {
  "customer-project": { tr: "Müşteri Projesi", en: "Client Project", de: "Kundenprojekt" },
  "product-lab": { tr: "Ürün Laboratuvarı", en: "Product Lab", de: "Produktlabor" },
  "internal-project": { tr: "İç Proje", en: "Internal Project", de: "Internes Projekt" },
  "concept-work": { tr: "Konsept Çalışma", en: "Concept Work", de: "Konzeptarbeit" },
};

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
    related: ["saas-operasyon-altyapisi", "hezer-auto-service"],
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
    related: ["hezer-auto-service", "personal-brand-site"],
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
    related: ["saas-operasyon-altyapisi", "stockapp"],
  },
  {
    id: "lab-saas-infra",
    slug: "saas-operasyon-altyapisi",
    title: "SaaS Infrastructures",
    category: "concept-work",
    accentColor: "#f472b6",
    status: "published",
    createdAt: "2025-07-12",
    summary: {
      tr: "Aboneliğe hazır çok-kiracılı yazılım altyapısı",
      en: "Subscription-ready multi-tenant software architecture",
      de: "Abonnementfertige Multi-Tenant-Software-Architektur",
    },
    description: {
      tr: "Özel sistemleri çok-kiracılı ve abonelik modeline hazır SaaS ürünlerine dönüştüren mimari. Stripe faturalandırma, RBAC ve izole veri havuzları.",
      en: "An architecture turning bespoke systems into multi-tenant, subscription-ready SaaS products. Stripe billing, RBAC and isolated data pools.",
      de: "Eine Architektur, die Einzelsysteme in multi-tenant, abonnementfertige SaaS-Produkte verwandelt. Stripe-Abrechnung, RBAC und isolierte Datenpools.",
    },
    technologies: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
    tools: ["Claude Code", "Stripe"],
    related: ["carpass", "stockapp"],
  },
  {
    id: "lab-personal-brand",
    slug: "personal-brand-site",
    title: "Albanexa Brand Site",
    category: "internal-project",
    accentColor: "#34d399",
    status: "published",
    createdAt: "2025-08-20",
    summary: {
      tr: "Kişisel marka ve stüdyo konumlandırması için çok sayfalı web sitesi",
      en: "Multi-page site for personal brand & studio positioning",
      de: "Mehrseitige Website für persönliche Marke & Studio",
    },
    description: {
      tr: "Hizmetleri, vaka çalışmalarını ve çalışma sürecini anlatan; Spline 3D ve Framer Motion ile güçlendirilmiş çok sayfalı kişisel marka sitesi. Bu Labs deneyimi de burada yaşıyor.",
      en: "A multi-page personal-brand site covering services, case studies and process, powered by Spline 3D and Framer Motion. This very Labs experience lives here.",
      de: "Eine mehrseitige Personal-Brand-Website mit Diensten, Fallstudien und Prozess, angetrieben von Spline 3D und Framer Motion. Dieses Labs-Erlebnis lebt hier.",
    },
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Three.js"],
    tools: ["Claude Code", "Spline", "Vercel"],
    caseUrl: "/projeler/personal-brand-site",
    related: ["hezer-otosanziman-site"],
  },
];

export function getPublishedLabProjects(): LabProject[] {
  return labProjects.filter((p) => p.status === "published");
}

export function getLabProject(slug: string): LabProject | undefined {
  return labProjects.find((p) => p.slug === slug);
}
