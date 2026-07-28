import type { Metadata } from "next";
import { Archivo, Instrument_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Archivo({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

import { LanguageProvider } from "@/context/LanguageContext";
import { ActiveProjectProvider } from "@/context/ActiveProjectContext";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/data/config";
import ClientSceneBackground from "@/components/ClientSceneBackground";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
};

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global structured data schema
  const sameAs = [siteConfig.socialLinks.github, siteConfig.socialLinks.linkedin].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": `${siteConfig.siteUrl}/#organization`,
        "name": siteConfig.brandName,
        "description": "Albanexa, İzmir merkezli, Türkiye geneline hizmet veren, Mert Alban tarafından kurulan bağımsız dijital çözüm stüdyosudur. KOBİ'ler için özel iş takip sistemleri, stok ve cari hesap yazılımları, kurumsal web siteleri ve SaaS altyapıları geliştirmektedir.",
        "url": siteConfig.siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteConfig.siteUrl}/logo.png`
        },
        "email": siteConfig.contactEmail,
        "telephone": `+${siteConfig.whatsappNumber}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "İzmir",
          "addressCountry": "TR"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Türkiye"
        },
        "priceRange": "₺₺₺",
        "knowsLanguage": ["tr", "en"],
        "serviceType": [
          "Özel Yazılım Geliştirme",
          "İş Takip Sistemi",
          "Stok ve Cari Hesap Yönetim Sistemi",
          "Kurumsal Web Sitesi",
          "SaaS Altyapısı",
          "Operasyon Otomasyonu"
        ],
        "founder": {
          "@id": `${siteConfig.siteUrl}/#person`
        },
        "sameAs": sameAs
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.siteUrl}/#person`,
        "name": siteConfig.founderName,
        "jobTitle": "Kurucu & Baş Yazılım Mühendisi",
        "description": "Mert Alban, kalite yönetimi ve süreç analizi geçmişini yazılım geliştirmeyle birleştirerek KOBİ'ler için özel dijital operasyon sistemleri tasarlayan Albanexa'nın kurucusudur.",
        "knowsAbout": [
          "Özel yazılım geliştirme",
          "İş takip sistemleri",
          "Stok ve cari hesap yönetimi",
          "SaaS mimari tasarımı",
          "Operasyon otomasyonu",
          "Kalite yönetimi ve süreç analizi",
          "Next.js",
          "Supabase",
          "TypeScript",
          "n8n iş akışı otomasyonu"
        ],
        "worksFor": {
          "@id": `${siteConfig.siteUrl}/#organization`
        },
        "url": siteConfig.siteUrl,
        "sameAs": sameAs
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        "url": siteConfig.siteUrl,
        "name": siteConfig.brandName,
        "publisher": {
          "@id": `${siteConfig.siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteConfig.siteUrl}/projeler?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html
      lang="tr"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <ActiveProjectProvider>
            <ClientSceneBackground />
            {children}
            <Footer />
            <Analytics />
          </ActiveProjectProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
