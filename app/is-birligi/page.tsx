import { buildPageMetadata } from "@/lib/metadata";
import IsBirligiClient from "./IsBirligiClient";

export const metadata = buildPageMetadata({
  title: "İş Birliği & Ortaklık",
  description: "Ajansınız, tasarım stüdyonuz veya yazılım ekibiniz için güvenilir teknoloji ortağı. Modellerimizi inceleyin.",
  path: "/is-birligi",
});

export default function IsBirligiPage() {
  return <IsBirligiClient />;
}
