import type { Metadata } from "next";
import ProjelerClient from "./ProjelerClient";

export const metadata: Metadata = {
  title: "Projeler — Solvaria",
  description: "Gerçek firmalar için geliştirdiğimiz web siteleri, iş takip sistemleri, web uygulamaları ve otomasyon çözümleri.",
};

export default function ProjelerPage() {
  return <ProjelerClient />;
}
