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
import SceneBackground from "@/components/SceneBackground";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Solvaria — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler",
  description:
    "Mert Alban / Solvaria: KOBİ'ler için kurumsal web siteleri, özel iş takip sistemleri, web uygulamaları, SaaS ürünleri ve otomasyon çözümleri.",
  openGraph: {
    title: "Solvaria — Web Siteleri, İş Takip Sistemleri ve Dijital Çözümler",
    description:
      "Kurumsal web sitelerinden iş takip sistemlerine, web uygulamalarından SaaS altyapısına kadar işletmenize özel dijital çözümler geliştiriyoruz.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <ActiveProjectProvider>
            <SceneBackground />
            {children}
            <Footer />
          </ActiveProjectProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
