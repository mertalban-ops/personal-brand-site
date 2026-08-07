import { buildPageMetadata } from "@/lib/metadata";
import StudyoClient from "./StudyoClient";

export const metadata = buildPageMetadata({
  title: "Stüdyo — Hakkında",
  description: "Albanexa, Mert Alban tarafından yönetilen bağımsız bir dijital ürün stüdyosudur. KOBİ'ler için özel yazılım, iş takip sistemleri ve kurumsal web siteleri geliştiriyoruz.",
  path: "/studyo",
});

export default function StudyoPage() {
  return <StudyoClient />;
}
