import type { Metadata } from "next";
import CozumlerClient from "./CozumlerClient";

export const metadata: Metadata = {
  title: "Çözümler — Solvaria",
  description:
    "İşletmeye özel dijital sistemler: iş takibi, stok ve cari hesap, operasyon otomasyonları, SaaS altyapısı.",
};

export default function CozumlerPage() {
  return <CozumlerClient />;
}
