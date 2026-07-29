import { buildPageMetadata } from "@/lib/metadata";
import IletisimClient from "./IletisimClient";

export const metadata = buildPageMetadata({
  title: "İletişim — Ücretsiz İhtiyaç Analizi",
  description: "Albanexa ile projenizi konuşun. İş takip sistemi, web sitesi veya özel yazılım için 30 dakikalık ücretsiz ihtiyaç analizi alın.",
  path: "/iletisim",
});

export default function IletisimPage() {
  return <IletisimClient />;
}
