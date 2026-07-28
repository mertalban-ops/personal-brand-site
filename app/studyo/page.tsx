import { buildPageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
import StudyoClient from "./StudyoClient";

export const metadata = buildPageMetadata({
  title: "Stüdyo Hakkında — Albanexa",
  description: "Albanexa nedir, kim tarafından kuruldu ve hangi ilkelerle çalışır.",
  path: "/studyo",
});

export default function StudyoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg flex items-center justify-center text-muted">Loading...</div>}>
      <StudyoClient />
    </Suspense>
  );
}
