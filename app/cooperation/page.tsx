import type { Metadata } from "next";
import IsBirligiClient from "../is-birligi/IsBirligiClient";

export const metadata: Metadata = {
  title: "Partnership & Collaboration — Albanexa",
  description:
    "Reliable technology partner for your agency, design studio, or software team. Explore our partnership models.",
};

export default function CooperationPage() {
  return <IsBirligiClient />;
}
