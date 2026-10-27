"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, ExternalLink, Download, ChevronDown } from "lucide-react";

import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import {
  type LabProject,
  labCategoryLabel,
  pickText,
  getPublishedLabProjects,
} from "@/data/labs";

const t = {
  backToTree: { tr: "Labs ağacına dön", en: "Back to the Labs tree", de: "Zurück zum Labs-Baum" },
  about: { tr: "Proje Hakkında", en: "About the Project", de: "Über das Projekt" },
  aboutTraining: { tr: "Eğitim Hakkında", en: "About the Course", de: "Über den Kurs" },
  tech: { tr: "Teknolojiler", en: "Technologies", de: "Technologien" },
  tools: { tr: "Kullanılan Araçlar", en: "AI Tools Used", de: "Verwendete Tools" },
  prompts: { tr: "Kullanılan Promptlar", en: "Prompts Used", de: "Verwendete Prompts" },
  install: { tr: "Kurulum Rehberi", en: "Installation Guide", de: "Installationsanleitung" },
  downloads: { tr: "İndirilebilir Kaynaklar", en: "Downloads", de: "Downloads" },
  related: { tr: "İlgili Projeler", en: "Related Projects", de: "Verwandte Projekte" },
  liveDemo: { tr: "Canlı Demo", en: "Live Demo", de: "Live-Demo" },
  caseStudy: { tr: "Vaka Çalışması", en: "Case Study", de: "Fallstudie" },
  openTraining: { tr: "Eğitime Git", en: "Open the Course", de: "Zum Kurs" },
  copy: { tr: "Kopyala", en: "Copy", de: "Kopieren" },
  copied: { tr: "Kopyalandı", en: "Copied", de: "Kopiert" },
};

function PromptCard({ title, content, tool }: { title: string; content: string; tool?: string }) {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="card-surface overflow-hidden rounded-xl">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-ink">
          {title}
          {tool && <span className="ml-2 text-xs font-normal text-accent">· {tool}</span>}
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-line p-4">
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-black/30 p-3 font-mono text-xs leading-relaxed text-muted">
            {content}
          </pre>
          <button
            onClick={copy}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? t.copied[language] : t.copy[language]}
          </button>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mono-label mb-3">{title}</h2>
      {children}
    </section>
  );
}

export default function LabsProjectClient({ project }: { project: LabProject }) {
  const { language } = useLanguage();
  const related = (project.related ?? [])
    .map((slug) => getPublishedLabProjects().find((p) => p.slug === slug))
    .filter(Boolean) as LabProject[];

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <article className="mx-auto max-w-3xl px-5 pb-24 pt-28">
        <Link
          href="/labs"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} /> {t.backToTree[language]}
        </Link>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-6"
        >
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: `${project.accentColor}22`, color: project.accentColor }}
          >
            {pickText(labCategoryLabel[project.category], language)}
          </span>
          <h1 className="display mt-4 text-4xl font-bold text-ink sm:text-5xl">{project.title}</h1>
          <p className="mt-3 text-lg text-muted">{pickText(project.summary, language)}</p>
        </motion.header>

        {/* CTAs */}
        {(project.externalUrl || project.demoUrl || project.caseUrl || project.repositoryUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                <ExternalLink size={14} /> {t.openTraining[language]}
                {project.provider && <span className="text-accent/70">· {project.provider}</span>}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
              >
                <ExternalLink size={14} /> {t.liveDemo[language]}
              </a>
            )}
            {project.caseUrl && (
              <Link
                href={project.caseUrl}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/40"
              >
                {t.caseStudy[language]} <ArrowLeft size={14} className="rotate-180" />
              </Link>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent/40"
              >
                <ExternalLink size={14} /> GitHub
              </a>
            )}
          </div>
        )}

        {/* Hero video */}
        {project.heroVideo && (
          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            <video src={project.heroVideo} controls className="w-full" />
          </div>
        )}

        {/* Description */}
        <Section title={(project.category === "training" ? t.aboutTraining : t.about)[language]}>
          <p className="prose-albanexa">{pickText(project.description, language)}</p>
        </Section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <Section title="Galeri">
            <div className="grid gap-3 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt={`${project.title} ${i + 1}`} className="rounded-lg border border-line" />
              ))}
            </div>
          </Section>
        )}

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <Section title={t.tech[language]}>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-lg border border-line bg-bg-raised px-3 py-1.5 text-xs text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Tools */}
        {project.tools && project.tools.length > 0 && (
          <Section title={t.tools[language]}>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span key={tool} className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs text-accent">
                  {tool}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Prompts */}
        {project.prompts && project.prompts.length > 0 && (
          <Section title={t.prompts[language]}>
            <div className="space-y-2.5">
              {project.prompts.map((p, i) => (
                <PromptCard key={i} title={pickText(p.title, language)} content={p.content} tool={p.tool} />
              ))}
            </div>
          </Section>
        )}

        {/* Installation */}
        {project.installationSteps && project.installationSteps.length > 0 && (
          <Section title={t.install[language]}>
            <ol className="prose-albanexa">
              {project.installationSteps.map((step, i) => (
                <li key={i}>{pickText(step, language)}</li>
              ))}
            </ol>
          </Section>
        )}

        {/* Downloads */}
        {project.downloads && project.downloads.length > 0 && (
          <Section title={t.downloads[language]}>
            <div className="flex flex-col gap-2">
              {project.downloads.map((d, i) => (
                <a
                  key={i}
                  href={d.url}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm text-ink transition-colors hover:border-accent/40"
                >
                  <Download size={15} className="text-accent" /> {pickText(d.label, language)}
                </a>
              ))}
            </div>
          </Section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <Section title={t.related[language]}>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.id} href={`/labs/${r.slug}`} className="card-surface rounded-xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: r.accentColor }} />
                    <span className="font-semibold text-ink">{r.title}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{pickText(r.summary, language)}</p>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </article>
    </div>
  );
}
