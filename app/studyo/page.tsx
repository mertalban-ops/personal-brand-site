import { buildPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import StudyoClient from "./StudyoClient";

export const metadata = buildPageMetadata({
  title: "Stüdyo — Albanexa Hakkında",
  description: "Albanexa, Mert Alban tarafından yönetilen bağımsız bir dijital ürün stüdyosudur. KOBİ'ler için özel yazılım, iş takip sistemleri ve kurumsal web siteleri geliştiriyoruz.",
  path: "/studyo",
});

export default function StudyoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-muted">Loading...</div>}>
      <StudyoClient />
    </Suspense>
  );
}
