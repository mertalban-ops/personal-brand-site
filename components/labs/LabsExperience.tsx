"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  List,
  X,
  Search,
  RotateCcw,
  Compass,
  Play,
  Pause,
  ZoomIn,
  Sparkles as SparklesIcon,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import LabsScene from "./scene/LabsScene";
import type { CameraPresetCommand } from "./scene/CameraRig";
import {
  getPublishedLabProjects,
  labCategoryLabel,
  pickText,
  type LabProject,
} from "@/data/labs";
import { assignAnchors } from "@/lib/labs/anchors";
import { CAMERA } from "@/lib/labs/treeConfig";
import { useLanguage } from "@/context/LanguageContext";

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const ui = {
  eyebrow: { tr: "ALBANEXA LABS", en: "ALBANEXA LABS", de: "ALBANEXA LABS" },
  heading: {
    tr: "Hayat Ağacı",
    en: "The Tree of Life",
    de: "Der Baum des Lebens",
  },
  hint: {
    tr: "Altın elmalara dokunarak projeleri keşfet",
    en: "Touch a golden apple to explore a project",
    de: "Berühre einen goldenen Apfel, um ein Projekt zu entdecken",
  },
  dragDesktop: {
    tr: "Sürükle • 360° keşfet",
    en: "Drag • Explore 360°",
    de: "Ziehen • 360° entdecken",
  },
  dragMobile: {
    tr: "Dokun ve sürükle • 360° keşfet",
    en: "Touch & drag • Explore 360°",
    de: "Berühren & ziehen • 360° entdecken",
  },
  resetCamera: {
    tr: "Kamerayı Sıfırla",
    en: "Reset Camera",
    de: "Kamera zurücksetzen",
  },
  tourStart: {
    tr: "Sinematik Tur",
    en: "Cinematic Tour",
    de: "Kameratour",
  },
  tourStop: {
    tr: "Turu Durdur",
    en: "Pause Tour",
    de: "Tour pausieren",
  },
  closeUp: {
    tr: "Yakın Kadraj",
    en: "Close-up View",
    de: "Nahaufnahme",
  },
  wideView: {
    tr: "Genel Kadraj",
    en: "Wide View",
    de: "Weitwinkel",
  },
  appleFallDemo: {
    tr: "Elma Düşüşü",
    en: "Apple Fall",
    de: "Apfelfall",
  },
  directory: { tr: "Tüm Projeler", en: "All Projects", de: "Alle Projekte" },
  backToSite: { tr: "Siteye dön", en: "Back to site", de: "Zurück zur Seite" },
  search: { tr: "Proje ara…", en: "Search projects…", de: "Projekte suchen…" },
  emptyTitle: {
    tr: "Her büyük fikir bir tohumla başlar.",
    en: "Every great idea begins with a seed.",
    de: "Jede große Idee beginnt mit einem Samen.",
  },
  emptyBody: {
    tr: "Albanexa Labs'te ilk proje yakında filizlenecek.",
    en: "The first project at Albanexa Labs will sprout soon.",
    de: "Das erste Projekt bei Albanexa Labs wird bald sprießen.",
  },
};

declare global {
  interface Window {
    __labsSetCamera?: (
      mode: "hero" | "closeup" | "orbitAngle",
      azimuthDeg?: number,
    ) => void;
    __labsTriggerFallDemo?: () => void;
    __labsSetPose?: (
      pos: [number, number, number],
      target: [number, number, number],
      fov?: number,
    ) => void;
  }
}

export default function LabsExperience({ heroStart = false }: { heroStart?: boolean }) {
  const router = useRouter();
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(true);
  const [isTouch, setIsTouch] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [quality, setQuality] = useState<"high" | "low">("high");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [autoTour, setAutoTour] = useState(true);
  const [isCloseUp, setIsCloseUp] = useState(false);
  const [presetCommand, setPresetCommand] = useState<CameraPresetCommand | null>(null);
  const [dirOpen, setDirOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigatedRef = useRef(false);
  const cmdCounter = useRef(1);

  const [demo, setDemo] = useState(0);
  const projects = useMemo(() => {
    const real = getPublishedLabProjects();
    if (demo <= 0) return real;
    const extra: LabProject[] = [];
    const palette = ["#38bdf8", "#10b981", "#f59e0b", "#a78bfa", "#f472b6", "#34d399"];
    for (let i = 0; i < demo; i++) {
      extra.push({
        id: `demo-${i}`,
        slug: `demo-${i}`,
        title: `Demo ${i + 1}`,
        category: "concept-work",
        accentColor: palette[i % palette.length],
        status: "published",
        createdAt: `2026-01-${String((i % 27) + 1).padStart(2, "0")}`,
        summary: { tr: "Test projesi", en: "Test project", de: "Testprojekt" },
        description: { tr: "", en: "", de: "" },
      });
    }
    return [...real, ...extra];
  }, [demo]);
  const anchors = useMemo(() => assignAnchors(projects), [projects]);

  const issueCameraCommand = useCallback(
    (mode: "hero" | "closeup" | "orbitAngle", azimuthDeg?: number) => {
      cmdCounter.current += 1;
      setAutoTour(false);
      setPresetCommand({ id: cmdCounter.current, mode, azimuthDeg });
      if (mode === "hero") setIsCloseUp(false);
      if (mode === "closeup") setIsCloseUp(true);
    },
    [],
  );

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
    const params = new URLSearchParams(window.location.search);
    if (process.env.NODE_ENV !== "production") {
      const n = Number(params.get("demo"));
      if (Number.isFinite(n) && n > 0) setDemo(Math.min(n, 120));
    }
    if (params.get("nowebgl") === "1") {
      setWebgl(false);
    }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(coarse);
    if (coarse || window.innerWidth < 768) setQuality("low");
    if (mq.matches) setIntroDone(true);
  }, []);

  const navigate = useCallback(
    (slug: string) => {
      if (navigatedRef.current) return;
      navigatedRef.current = true;
      router.push(`/labs/${slug}`);
    },
    [router],
  );

  const handleSelect = useCallback(
    (slug: string) => {
      if (activeSlug) return;
      setAutoTour(false);
      router.prefetch(`/labs/${slug}`);
      if (reducedMotion) {
        navigate(slug);
        return;
      }
      setActiveSlug(slug);
    },
    [activeSlug, reducedMotion, router, navigate],
  );

  const triggerFallDemo = useCallback(() => {
    if (activeSlug) return;
    setAutoTour(false);
    setActiveSlug("__demo_fall__");
  }, [activeSlug]);

  useEffect(() => {
    window.__labsSetCamera = issueCameraCommand;
    window.__labsTriggerFallDemo = triggerFallDemo;
    return () => {
      delete window.__labsSetCamera;
      delete window.__labsTriggerFallDemo;
    };
  }, [issueCameraCommand, triggerFallDemo]);

  const handleFallDone = useCallback(() => {
    setFlash(true);
  }, []);

  useEffect(() => {
    if (!flash || !activeSlug) return;
    if (activeSlug === "__demo_fall__") {
      // Demo fall resets smoothly back to the hero view after the golden flash
      const id = setTimeout(() => {
        setFlash(false);
        setActiveSlug(null);
        issueCameraCommand("hero");
      }, 650);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => navigate(activeSlug), reducedMotion ? 0 : 480);
    return () => clearTimeout(id);
  }, [flash, activeSlug, reducedMotion, navigate, issueCameraCommand]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        pickText(p.summary, language).toLowerCase().includes(q),
    );
  }, [projects, query, language]);

  const isEmpty = projects.length === 0;

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#ead5be]">
      {/* Dark warm top scrim so Albanexa Navbar links & logo remain 100% legible over bright sunset sky */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 h-28"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,16,24,0.82) 0%, rgba(10,16,24,0.48) 58%, rgba(10,16,24,0) 100%)",
        }}
      />

      <Navbar />

      {/* Accessible screen-reader description of the 3D scene */}
      <p className="sr-only">
        {language === "tr"
          ? "Bulutların üzerinde süzülen yüzen bir adada 360 derece döndürülebilen üç boyutlu Hayat Ağacı. Ağaçtaki her altın elma bir Albanexa projesini temsil eder."
          : "Interactive 360-degree 3D Tree of Life on a floating island above the clouds. Each golden apple represents an Albanexa project."}
      </p>

      {/* 3D WebGL Canvas (or accessible screenshot + project list fallback) */}
      {mounted && webgl ? (
        <Canvas
          className="absolute inset-0"
          shadows={quality === "high"}
          dpr={[1, quality === "high" ? 2 : 1.5]}
          camera={{ position: CAMERA.start, fov: 42, near: 0.1, far: 220 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
          }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 0.9;
          }}
        >
          <LabsScene
            anchors={anchors}
            language={language}
            activeSlug={activeSlug}
            highlightedSlug={highlightedSlug}
            reducedMotion={reducedMotion}
            cinematic={!heroStart}
            introDone={introDone}
            autoTour={autoTour}
            presetCommand={presetCommand}
            quality={quality}
            onSelect={handleSelect}
            onFallDone={handleFallDone}
            onIntroDone={() => setIntroDone(true)}
            onUserInteract={() => {
              if (autoTour) setAutoTour(false);
            }}
          />
        </Canvas>
      ) : mounted && !webgl ? (
        <WebGLFallback />
      ) : null}

      {/* Sub-header action row: Back to site & All Projects button */}
      {webgl && (
        <div className="pointer-events-none absolute inset-x-0 top-20 z-20 mx-auto flex max-w-6xl items-center justify-between px-4 sm:top-22 sm:px-5">
          <Link
            href="/"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#0d1622]/75 px-3.5 py-1.5 text-xs font-medium text-white/95 shadow-sm backdrop-blur-md transition-colors hover:bg-[#0d1622]/90"
          >
            <ArrowLeft size={13} /> {ui.backToSite[language]}
          </Link>

          {!isEmpty && (
            <button
              onClick={() => setDirOpen((o) => !o)}
              className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-[#0d1622]/75 px-3.5 py-1.5 text-xs font-medium text-white/95 shadow-sm backdrop-blur-md transition-colors hover:bg-[#0d1622]/90"
              aria-expanded={dirOpen}
            >
              <List size={13} /> {ui.directory[language]}
            </button>
          )}
        </div>
      )}

      {/* Bottom HUD: Brand title (left) + 360° Camera Controls (center) + Keyboard-accessible project pills (right)
          Positioned cleanly in the bottom safe area so it NEVER collides with the island or tree crown. */}
      <AnimatePresence>
        {webgl && introDone && !activeSlug && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#12161f]/65 via-[#12161f]/25 to-transparent pb-3 pt-8 sm:pb-4"
          >
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2.5 px-4 sm:flex-row sm:items-end sm:px-5">
              {/* Brand Title Block — bottom-left on desktop, compact centered on mobile */}
              <div className="text-center sm:text-left">
                <span
                  className="mono-label block text-[10px] tracking-[0.22em]"
                  style={{ color: "#ffd88a" }}
                >
                  {ui.eyebrow[language]}
                </span>
                <h1
                  className="display text-2xl font-bold leading-tight text-white sm:text-3xl"
                  style={{ textShadow: "0 2px 16px rgba(10,14,22,0.75)" }}
                >
                  {ui.heading[language]}
                </h1>
                {!isEmpty && (
                  <p className="mt-0.5 text-xs text-white/80">
                    {ui.hint[language]}
                  </p>
                )}
              </div>

              {/* 360° Interactive Camera Control Pill Bar */}
              <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 rounded-full border border-white/20 bg-[#0d1622]/80 px-2.5 py-1.5 text-xs text-white/90 shadow-lg backdrop-blur-md">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium text-[#ffd88a]">
                  <Compass size={13} className="animate-pulse" />
                  {isTouch ? ui.dragMobile[language] : ui.dragDesktop[language]}
                </span>

                <span className="h-3.5 w-px bg-white/15" />

                <button
                  type="button"
                  onClick={() => {
                    setAutoTour(false);
                    issueCameraCommand("hero");
                  }}
                  title={ui.resetCamera[language]}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-white/90 transition-colors hover:bg-white/15"
                >
                  <RotateCcw size={12} />
                  <span>{ui.resetCamera[language]}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAutoTour(false);
                    issueCameraCommand(isCloseUp ? "hero" : "closeup");
                  }}
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-white/90 transition-colors hover:bg-white/15"
                >
                  <ZoomIn size={12} />
                  <span>{isCloseUp ? ui.wideView[language] : ui.closeUp[language]}</span>
                </button>

                {!reducedMotion && (
                  <button
                    type="button"
                    onClick={() => setAutoTour((t) => !t)}
                    aria-pressed={autoTour}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      autoTour
                        ? "bg-[#ffd88a]/25 text-[#ffd88a]"
                        : "text-white/90 hover:bg-white/15"
                    }`}
                  >
                    {autoTour ? <Pause size={12} /> : <Play size={12} />}
                    <span>{autoTour ? ui.tourStop[language] : ui.tourStart[language]}</span>
                  </button>
                )}

                {!reducedMotion && !isEmpty && (
                  <button
                    type="button"
                    onClick={triggerFallDemo}
                    className="hidden items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium text-[#ffd88a] transition-colors hover:bg-white/15 md:inline-flex"
                  >
                    <SparklesIcon size={12} />
                    <span>{ui.appleFallDemo[language]}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Keyboard-accessible quick project pills */}
            {!isEmpty && (
              <div
                role="navigation"
                aria-label={ui.directory[language]}
                className="pointer-events-auto mx-auto mt-2 hidden max-w-6xl flex-wrap items-center justify-center gap-1.5 px-5 lg:flex"
              >
                {projects.map((p) => (
                  <Link
                    key={p.id}
                    href={`/labs/${p.slug}`}
                    onMouseEnter={() => setHighlightedSlug(p.slug)}
                    onMouseLeave={() => setHighlightedSlug(null)}
                    onFocus={() => setHighlightedSlug(p.slug)}
                    onBlur={() => setHighlightedSlug(null)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0d1622]/65 px-2.5 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm transition-all hover:border-[#ffd88a]/60 hover:bg-[#0d1622]/90 focus:border-[#ffd88a] focus:outline-none"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: p.accentColor }}
                    />
                    <span>{p.title}</span>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {isEmpty && introDone && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="display text-2xl font-bold text-[#2a2013] sm:text-3xl">
            {ui.emptyTitle[language]}
          </h2>
          <p className="mt-2 text-sm text-[#5a4a33]">{ui.emptyBody[language]}</p>
        </div>
      )}

      {/* Project directory slide-over panel */}
      <AnimatePresence>
        {dirOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 z-[60] flex h-full w-full max-w-sm flex-col bg-[#0a121c]/95 p-5 pt-6 text-ink shadow-2xl backdrop-blur-md"
            aria-label={ui.directory[language]}
          >
            <div className="flex items-center justify-between">
              <span className="mono-label">{ui.directory[language]}</span>
              <button
                onClick={() => setDirOpen(false)}
                aria-label="close"
                className="rounded-lg p-1 text-muted hover:bg-white/10 hover:text-ink"
              >
                <X size={18} />
              </button>
            </div>
            <div className="relative mt-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={ui.search[language]}
                className="w-full rounded-lg border border-line bg-white/5 py-2 pl-9 pr-3 text-sm text-ink outline-none focus:border-accent/50"
              />
            </div>
            <ul className="mt-4 flex-1 space-y-1.5 overflow-y-auto">
              {filtered.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/labs/${p.slug}`}
                    className="block rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-accent/40 hover:bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ background: p.accentColor }}
                      />
                      <span className="text-sm font-semibold text-ink">{p.title}</span>
                    </div>
                    <span className="mt-0.5 block pl-4 text-xs text-muted">
                      {pickText(labCategoryLabel[p.category], language)} ·{" "}
                      {pickText(p.summary, language)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Cinematic solar & anamorphic light-burst transition matching 9600ms.jpg */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.42 }}
            animate={{ opacity: 1, scale: 1.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 z-50 overflow-hidden"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, #ffffff 0%, #fffdf4 22%, #ffe8af 44%, rgba(255,218,136,0.82) 66%, rgba(242,212,178,0.45) 100%)",
            }}
          >
            {/* Horizontal anamorphic lens flare streak across the center (exact match to 9600ms.jpg) */}
            <div
              className="absolute inset-x-0 top-1/2 h-16 -translate-y-1/2"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,248,220,0.85) 38%, #ffffff 50%, rgba(255,248,220,0.85) 62%, rgba(255,255,255,0) 100%)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WebGLFallback() {
  const { language } = useLanguage();
  const projects = getPublishedLabProjects();
  return (
    <div className="relative h-full w-full overflow-y-auto bg-[#0b131e] px-5 pb-16 pt-28">
      {/* Real visual backdrop from the Tree of Life poster */}
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <Image
          src="/labs/intro-poster.jpg"
          alt="Albanexa Labs Tree of Life"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b131e]/80 via-[#0b131e]/75 to-[#0b131e]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <span className="mono-label" style={{ color: "#ffd88a" }}>
          {ui.eyebrow[language]}
        </span>
        <h1 className="display mt-2 text-3xl font-bold text-ink sm:text-4xl">
          {ui.heading[language]}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {language === "tr"
            ? "Cihazınız 3D WebGL sahnesini desteklemiyor — Hayat Ağacı projelerini aşağıdan doğrudan keşfedebilirsiniz."
            : language === "de"
              ? "Ihr Gerät unterstützt die 3D-Szene nicht — entdecken Sie die Projekte direkt in der Liste."
              : "Your device doesn't support the 3D WebGL scene — explore the Tree of Life projects directly below."}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/labs/${p.slug}`}
              className="card-surface rounded-xl border border-white/10 bg-[#0f1926]/85 p-4 backdrop-blur-md transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: p.accentColor }}
                />
                <span className="font-semibold text-ink">{p.title}</span>
              </div>
              <p className="mt-1.5 text-sm text-muted">{pickText(p.summary, language)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
