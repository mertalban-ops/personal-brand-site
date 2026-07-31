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
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Analytics } from "@vercel/analytics/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { siteConfig } from "@/data/config";
import ClientSceneBackground from "@/components/ClientSceneBackground";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "Albanexa — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler",
    template: "%s | Albanexa",
  },
  description:
    "Albanexa, KOBİ'ler için özel yazılım geliştiren İzmir merkezli bağımsız dijital ürün stüdyosudur. İş takip sistemleri, stok ve cari hesap yazılımları, kurumsal web siteleri.",
  keywords: [
    "Albanexa",
    "Mert Alban",
    "özel yazılım geliştirme",
    "iş takip sistemi",
    "stok takip programı",
    "cari hesap takip",
    "kurumsal web sitesi",
    "KOBİ yazılımı",
    "web uygulaması geliştirme",
    "SaaS altyapısı",
    "dijital ürün stüdyosu",
    "İzmir yazılım",
  ],
  openGraph: {
    siteName: "Albanexa",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "c20fOLWvAmiLp3Cfx8gevf0GvUXJJwMWtf6FtLSoa64",
  },
  icons: {
    icon: "/albanexa-logo.png",
    shortcut: "/albanexa-logo.png",
    apple: "/albanexa-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global structured data schema
  const sameAs = [
    siteConfig.socialLinks.github,
    siteConfig.socialLinks.linkedin,
    "https://maps.google.com/?q=Albanexa+İzmir",
  ].filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${siteConfig.siteUrl}/#organization`,
        "name": siteConfig.brandName,
        "description": "Albanexa, İzmir merkezli, Türkiye geneline ve uluslararası uzaktan projelere hizmet veren Mert Alban tarafından yönetilen bağımsız dijital ürün stüdyosudur. İşletmeler için özel iş takip sistemleri, stok ve cari hesap yazılımları, kurumsal web siteleri ve SaaS altyapıları geliştirmektedir.",
        "url": siteConfig.siteUrl,
        "foundingDate": "2024",
        "logo": {
          "@type": "ImageObject",
          "url": `${siteConfig.siteUrl}/logo.png`,
          "width": 200,
          "height": 200
        },
        "email": siteConfig.contactEmail,
        "telephone": `+${siteConfig.whatsappNumber}`,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "İzmir",
          "addressCountry": "TR"
        },
        "areaServed": [
          {
            "@type": "Country",
            "name": "Türkiye"
          },
          {
            "@type": "Place",
            "name": "Dünya Geneli (Remote)"
          }
        ],
        "priceRange": "₺₺₺",
        "knowsLanguage": ["tr", "en", "de"],
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
        "description": "Mert Alban, kalite yönetimi, süreç mühendisliği ve operasyonel analiz tecrübesini yazılım geliştirmeyle birleştirerek işletmeler için özel dijital sistemler kuran Albanexa'nın kurucusudur.",
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
        "url": `${siteConfig.siteUrl}/studyo`,
        "sameAs": [
          siteConfig.socialLinks.linkedin,
          siteConfig.socialLinks.github,
        ].filter(Boolean)
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.siteUrl}/#website`,
        "url": siteConfig.siteUrl,
        "name": siteConfig.brandName,
        "publisher": {
          "@id": `${siteConfig.siteUrl}/#organization`
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:font-semibold focus:text-black focus:shadow-xl focus:outline-none"
        >
          Ana içeriğe atla
        </a>
        <LanguageProvider>
          <ActiveProjectProvider>
            <ClientSceneBackground />
            <div id="main-content" className="flex-grow">
              {children}
            </div>
            <Footer />
            <FloatingWhatsApp />
            <Analytics />
          </ActiveProjectProvider>
        </LanguageProvider>
      </body>
      <GoogleAnalytics gaId="G-EBXG0KWWV0" />
    </html>
  );
}
