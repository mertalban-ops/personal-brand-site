import { buildPageMetadata } from "@/lib/metadata";
import IsBirligiClient from "../is-birligi/IsBirligiClient";

export const metadata = buildPageMetadata({
  title: "Partnership & Collaboration — Albanexa",
  description: "Reliable technology partner for your agency, design studio, or software team. Explore our partnership models.",
  path: "/cooperation",
});

export default function CooperationPage() {
  return <IsBirligiClient />;
}
