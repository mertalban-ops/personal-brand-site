import { buildPageMetadata } from "@/lib/metadata";
import CozumlerClient from "./CozumlerClient";

export const metadata = buildPageMetadata({
  title: "Çözümler — Albanexa",
  description: "İşletmeye özel dijital sistemler: iş takibi, stok ve cari hesap, operasyon otomasyonları, SaaS altyapısı.",
  path: "/cozumler",
});

export default function CozumlerPage() {
  return <CozumlerClient />;
}
