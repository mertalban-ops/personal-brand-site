import { buildPageMetadata } from "@/lib/metadata";
import IletisimClient from "./IletisimClient";

export const metadata = buildPageMetadata({
  title: "İletişim — Albanexa",
  description: "Projenizi konuşalım. Ücretsiz keşif görüşmesi için iletişime geçin.",
  path: "/iletisim",
});

export default function IletisimPage() {
  return <IletisimClient />;
}
