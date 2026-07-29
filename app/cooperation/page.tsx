import type { Metadata } from "next";
import IsBirligiClient from "../is-birligi/IsBirligiClient";
import { siteConfig } from "@/data/config";

export const metadata: Metadata = {
  title: "Partnership & Collaboration — Albanexa",
  description: "Reliable technology partner for your agency, design studio, or software team. Explore our partnership models.",
  alternates: {
    canonical: `${siteConfig.siteUrl}/is-birligi`,
  },
  robots: { index: false, follow: false },
};

export default function CooperationPage() {
  return <IsBirligiClient />;
}
