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
  title: "Solvaria — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler",
  description:
    "Mert Alban / Solvaria: KOBİ'ler için kurumsal web siteleri, özel iş takip sistemleri, web uygulamaları, SaaS ürünleri ve otomasyon çözümleri.",
  metadataBase: new URL(siteConfig.baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Solvaria — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler",
    description:
      "Kurumsal web sitelerinden iş takip sistemlerine, web uygulamalarından SaaS altyapısına kadar işletmenize özel dijital çözümler geliştiriyoruz.",
    locale: "tr_TR",
    type: "website",
    url: siteConfig.baseUrl,
  },
};

export default function RootLayout({
  children,
  
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global structured data schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.baseUrl}/#organization`,
        "name": siteConfig.brandName,
        "url": siteConfig.baseUrl,
        "logo": `${siteConfig.baseUrl}/logo.png`,
        "sameAs": [siteConfig.github, siteConfig.linkedin].filter(Boolean)
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.baseUrl}/#person`,
        "name": "Mert Alban",
        "jobTitle": "Founder & Lead Software Engineer",
        "worksFor": {
          "@id": `${siteConfig.baseUrl}/#organization`
        },
        "url": siteConfig.baseUrl,
        "sameAs": [siteConfig.github, siteConfig.linkedin].filter(Boolean)
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.baseUrl}/#website`,
        "url": siteConfig.baseUrl,
        "name": siteConfig.brandName,
        "publisher": {
          "@id": `${siteConfig.baseUrl}/#organization`
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
