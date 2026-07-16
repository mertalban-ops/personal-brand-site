export interface SiteConfig {
  brandName: string;
  founderName: string;
  siteUrl: string;
  productionDomain?: string;
  temporaryDomain: string;
  contactEmail: string;
  projectEmail?: string;
  whatsappNumber: string;
  locationTr: string;
  locationEn: string;
  locationDe?: string;
  discoveryCallMinutes: number;
  discoveryCallLabelTr: string;
  discoveryCallLabelEn: string;
  discoveryCallLabelDe?: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  budgetRanges: {
    value: string;
    labelTr: string;
    labelEn: string;
    labelDe: string;
  }[];
}

export const siteConfig: SiteConfig = {
  brandName: "Solvaria",
  founderName: "Mert Alban",
  siteUrl: "https://personal-brand-site-azure.vercel.app",
  productionDomain: "solvaria.com.tr", // Real target domain (not yet active, placeholder for legal text domain fallback)
  temporaryDomain: "https://personal-brand-site-azure.vercel.app",
  contactEmail: "mertalbaan@gmail.com",
  projectEmail: "mertalbaan@gmail.com",
  whatsappNumber: "905379531547",
  locationTr: "İzmir, Türkiye · Türkiye geneline uzaktan hizmet",
  locationEn: "Izmir, Türkiye · Remote collaboration worldwide",
  locationDe: "Izmir, Türkei · Weltweite Remote-Zusammenarbeit",
  discoveryCallMinutes: 30,
  discoveryCallLabelTr: "30 dakikalık ücretsiz ihtiyaç analizi",
  discoveryCallLabelEn: "30-minute free discovery call",
  discoveryCallLabelDe: "30-minütige kostenlose Bedarfsanalyse",
  socialLinks: {
    linkedin: "https://linkedin.com/in/mertalban",
    github: "https://github.com/mertalban",
  },
  budgetRanges: [
    { value: "50k-100k", labelTr: "50.000 TL - 100.000 TL", labelEn: "50k TRY - 100k TRY", labelDe: "50k TRY - 100k TRY" },
    { value: "100k-250k", labelTr: "100.000 TL - 250.000 TL", labelEn: "100k TRY - 250k TRY", labelDe: "100k TRY - 250k TRY" },
    { value: "250k-500k", labelTr: "250.000 TL - 500.000 TL", labelEn: "250k TRY - 500k TRY", labelDe: "250k TRY - 500k TRY" },
    { value: "500k+", labelTr: "500.000 TL+", labelEn: "500k TRY+", labelDe: "500k TRY+" },
  ],
};
