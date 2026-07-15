import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolutionBySlug, solutionsTr } from "@/data/solutions";
import CozumlerDetailClient from "./CozumlerDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return solutionsTr.filter((s) => s.slug !== "web-siteleri").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "web-siteleri") notFound();
  const solution = getSolutionBySlug(slug, "tr");
  if (!solution) notFound();
  return {
    title: `${solution.title} — Solvaria`,
    description: solution.tagline,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug === "web-siteleri") notFound();
  const solution = getSolutionBySlug(slug, "tr");
  if (!solution) notFound();

  return <CozumlerDetailClient slug={slug} />;
}
