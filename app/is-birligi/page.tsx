import type { Metadata } from "next";
import IsBirligiClient from "./IsBirligiClient";

export const metadata: Metadata = {
  title: "İş Birliği & Ortaklık — Albanexa",
  description:
    "Ajansınız, tasarım stüdyonuz veya yazılım ekibiniz için güvenilir teknoloji ortağı. Modellerimizi inceleyin.",
};

export default function IsBirligiPage() {
  return <IsBirligiClient />;
}
