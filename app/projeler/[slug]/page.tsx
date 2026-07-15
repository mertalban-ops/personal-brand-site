import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projectsTr } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projectsTr.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "tr"); // Default to TR metadata
  if (!project) notFound();
  return {
    title: `${project.name} — Vaka Çalışması | Solvaria`,
    description: project.caseSummary,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, "tr");
  if (!project) notFound();

  return <ProjectDetailClient slug={slug} />;
}
