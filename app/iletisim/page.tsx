import type { Metadata } from "next";
import IletisimClient from "./IletisimClient";

export const metadata: Metadata = {
  title: "İletişim — Solvaria",
  description:
    "Projenizi konuşalım. Ücretsiz keşif görüşmesi için iletişime geçin.",
};

export default function IletisimPage() {
  return <IletisimClient />;
}
