import type { Metadata } from "next";
import WebSiteleriClient from "./WebSiteleriClient";

export const metadata: Metadata = {
  title: "Kurumsal Web Siteleri — Solvaria",
  description:
    "Markanızı yalnızca görünür değil, ikna edici hale getiren hızlı, SEO uyumlu ve premium Next.js web siteleri.",
};

export default function WebSiteleriPage() {
  return <WebSiteleriClient />;
}
