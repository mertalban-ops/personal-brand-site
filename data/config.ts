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
  gbpUrl?: string; // Google Business Profile URL (g.page/... or maps.google.com/?cid=...)
  budgetRanges: {
    value: string;
    labelTr: string;
    labelEn: string;
    labelDe: string;
  }[];
}

export const siteConfig: SiteConfig = {
  brandName: "Albanexa",
  founderName: "Mert Alban",
  siteUrl: "https://www.albanexa.com",
  productionDomain: "www.albanexa.com",
  temporaryDomain: "https://www.albanexa.com",
  contactEmail: "mert@albanexa.com",
  projectEmail: "mert@albanexa.com",
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
    { value: "monthly-2k-5k", labelTr: "Aylık 2.000 - 5.000 TL (abonelik)", labelEn: "Monthly 2k-5k TRY (subscription)", labelDe: "Monatlich 2k-5k TRY (Abo)" },
    { value: "monthly-5k-10k", labelTr: "Aylık 5.000 - 10.000 TL (abonelik)", labelEn: "Monthly 5k-10k TRY (subscription)", labelDe: "Monatlich 5k-10k TRY (Abo)" },
    { value: "5k-15k", labelTr: "5.000 - 15.000 TL (tek seferlik)", labelEn: "5k-15k TRY (one-time)", labelDe: "5k-15k TRY (einmalig)" },
    { value: "15k-50k", labelTr: "15.000 - 50.000 TL (tek seferlik)", labelEn: "15k-50k TRY (one-time)", labelDe: "15k-50k TRY (einmalig)" },
    { value: "50k+", labelTr: "50.000 TL+ (kurumsal proje)", labelEn: "50k TRY+ (enterprise)", labelDe: "50k TRY+ (Enterprise)" },
    { value: "not-sure", labelTr: "Henüz bilmiyorum / Teklif bekliyorum", labelEn: "Not sure yet / Need a quote", labelDe: "Noch unklar / Angebot erwünscht" },
  ],
};
