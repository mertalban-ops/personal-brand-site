import { contact } from "./contact";

export const siteConfig = {
  // Brand & Location
  brandName: "Solvaria",
  tagline: "Dijital Çözüm Stüdyosu",
  locationTr: "İzmir, Türkiye · Türkiye geneline uzaktan hizmet",
  locationEn: "Izmir, Turkey · Remote service globally",
  locationDe: "Izmir, Germany · Remote service globally",

  // Centralized Domain / URLs
  productionDomain: "solvaria.com.tr", // Real target domain
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "https://personal-brand-site-azure.vercel.app",
  
  // Real Emails / WhatsApp
  email: contact.email || "mertalbaan@gmail.com",
  whatsapp: contact.whatsapp || "905379531547",
  whatsappEnabled: !!contact.whatsapp && contact.whatsapp !== "#",
  linkedin: contact.linkedin !== "#" ? contact.linkedin : "https://linkedin.com/in/mertalban",
  github: contact.github !== "#" ? contact.github : "https://github.com/mertalban",

  // Corporate Emails Placeholders (Faz 13)
  helloEmail: "hello@solvaria.com.tr",
  projectEmail: "projects@solvaria.com.tr",
  founderEmail: "mert@solvaria.com.tr",
  corporateEmailEnabled: false, // Turn true only when real corporate email is active

  // Budget Ranges (Faz 10)
  // Set to empty array [] or empty value to hide budget selector in production
  budgetRanges: [
    { value: "50k-100k", labelTr: "50.000 TL - 100.000 TL", labelEn: "50k TRY - 100k TRY", labelDe: "50k TRY - 100k TRY" },
    { value: "100k-250k", labelTr: "100.000 TL - 250.000 TL", labelEn: "100k TRY - 250k TRY", labelDe: "100k TRY - 250k TRY" },
    { value: "250k-500k", labelTr: "250.000 TL - 500.000 TL", labelEn: "250k TRY - 500k TRY", labelDe: "250k TRY - 500k TRY" },
    { value: "500k+", labelTr: "500.000 TL+", labelEn: "500k TRY+", labelDe: "500k TRY+" },
  ],
};
export type SiteConfig = typeof siteConfig;
