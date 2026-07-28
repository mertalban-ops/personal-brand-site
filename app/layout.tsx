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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.siteUrl}/#organization`,
        "name": siteConfig.brandName,
        "url": siteConfig.siteUrl,
        "logo": `${siteConfig.siteUrl}/logo.png`,
        "sameAs": [siteConfig.socialLinks.github, siteConfig.socialLinks.linkedin].filter(Boolean)
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.siteUrl}/#person`,
        "name": siteConfig.founderName,
        "jobTitle": "Founder & Lead Software Engineer",
        "worksFor": {
          "@id": `${siteConfig.siteUrl}/#organization`
        },
        "url": siteConfig.siteUrl,
        "sameAs": [siteConfig.socialLinks.github, siteConfig.socialLinks.linkedin].filter(Boolean)
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
