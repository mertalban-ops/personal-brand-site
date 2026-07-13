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
import SceneBackground from "@/components/SceneBackground";

export const metadata: Metadata = {
  title: "Solvaria — İş Takip Sistemleri ve Dijital Operasyon Çözümleri",
  description:
    "Küçük ve orta ölçekli firmalar için stok, cari hesap, satış, tahsilat, raporlama ve otomasyon odaklı web tabanlı iş takip sistemleri geliştiriyoruz.",
  openGraph: {
    title: "Solvaria — İş Takip Sistemleri ve Dijital Operasyon Çözümleri",
    description:
      "Dağınık iş süreçlerini sade, ölçülebilir ve dijital sistemlere dönüştürüyoruz. Stok, cari hesap, satış, tahsilat ve raporlama için firmalara özel çözümler.",
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
          <SceneBackground />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
