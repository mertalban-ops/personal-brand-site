import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/metadata";
import ProjelerClient from "./ProjelerClient";

export const metadata = buildPageMetadata({
  title: "Projeler — Albanexa",
  description: "Gerçek firmalar için geliştirdiğimiz web siteleri, iş takip sistemleri, web uygulamaları ve otomasyon çözümleri.",
  path: "/projeler",
});

export default function ProjelerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-muted">Loading...</div>}>
      <ProjelerClient />
    </Suspense>
  );
}
