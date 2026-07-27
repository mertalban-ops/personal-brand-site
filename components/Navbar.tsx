"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import { useLanguage, LanguageCode } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const links = [
    { href: "/cozumler", label: t.nav.solutions },
    { href: "/projeler", label: t.nav.cases },
    { href: "/surec", label: language === "tr" ? "Süreç" : language === "de" ? "Prozess" : "Process" },
    { href: "/is-birligi", label: t.nav.cooperation },
    { href: "/studyo", label: t.nav.studio },
  ];

  const availableLangs = (["tr", "en", "de"] as LanguageCode[]).filter((l) => l !== language);

  const handleLangSelect = (lang: LanguageCode) => {
    setLanguage(lang);
    setLangOpen(false);
  };

  const langSwitcherJSX = (
    <div className="relative" data-lang-switcher>
      <button
        onClick={() => setLangOpen((o) => !o)}
        className="flex items-center gap-1.5 text-xs font-medium bg-surface/50 px-3 py-1.5 rounded-md border border-line uppercase text-ink transition-colors hover:border-accent/40"
      >
        {language}
        <svg
          className={`w-3 h-3 text-muted transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {langOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full pt-1 z-50"
          >
            <div className="flex flex-col bg-bg border border-line rounded-md shadow-lg overflow-hidden min-w-[70px]">
              {availableLangs.map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLangSelect(lang)}
                  className="px-3 py-2 text-xs font-medium uppercase text-muted hover:bg-surface hover:text-accent transition-colors text-left"
                >
                  {lang}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  useEffect(() => {
    if (!langOpen) return;
    const close = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-lang-switcher]")) setLangOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [langOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || isOpen ? "bg-bg/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-baseline gap-3" onClick={() => setIsOpen(false)}>
          <span className="display text-sm font-bold tracking-tight text-ink">
            ALBANEXA
          </span>
          <span className="mono-label hidden text-faint sm:inline" style={{ color: "var(--faint)" }}>
            dijital çözümler & sistemler
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-7 md:flex">
          {/* Çözümler Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm transition-colors hover:text-ink ${
                pathname.startsWith("/cozumler") ? "text-ink font-medium" : "text-muted"
              }`}
            >
              {t.nav.solutions}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {solutionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[280px]"
                >
                  <div className="card-surface p-4 rounded-xl border border-line bg-bg shadow-xl flex flex-col gap-2.5">
                    <Link
                      href="/cozumler"
                      className="text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent-hover"
                    >
                      {language === "tr" ? "Tüm Çözümler" : language === "de" ? "Alle Lösungen" : "All Solutions"}
                    </Link>
                    <div className="h-px bg-line my-1" />
                    {[
                      { href: "/cozumler/is-takip-sistemleri", label: language === "tr" ? "İş Takip Sistemleri" : language === "de" ? "Arbeitsverfolgung" : "Job Tracking Systems" },
                      { href: "/cozumler/stok-cari-tahsilat", label: language === "tr" ? "Stok ve Cari Hesap" : language === "de" ? "Lager & Finanzen" : "Inventory & Accounts" },
                      { href: "/cozumler/operasyon-otomasyonlari", label: language === "tr" ? "Operasyon Otomasyonları" : language === "de" ? "Prozessautomatisierung" : "Operational Automation" },
                      { href: "/cozumler/saas-urun-altyapisi", label: language === "tr" ? "SaaS Ürün Altyapısı" : language === "de" ? "SaaS-Infrastruktur" : "SaaS Product Foundation" },
                      { href: "/cozumler/web-siteleri", label: language === "tr" ? "Kurumsal Web Siteleri" : language === "de" ? "Websites" : "Corporate Websites" },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-sm text-muted hover:text-ink transition-colors pl-1"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="h-px bg-line my-1" />
                    <Link
                      href="/surec"
                      className="text-xs text-accent flex items-center gap-1 hover:underline pl-1"
                    >
                      {language === "tr" ? "Süreç: Nasıl Çalışıyoruz? →" : language === "de" ? "Prozess: Wie wir arbeiten →" : "Process: How We Work →"}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Projeler */}
          <Link
            href="/projeler"
            className={`text-sm transition-colors hover:text-ink ${
              pathname.startsWith("/projeler") ? "text-ink font-medium" : "text-muted"
            }`}
          >
            {t.nav.cases}
          </Link>

          {/* İş Birliği */}
          <Link
            href="/is-birligi"
            className={`text-sm transition-colors hover:text-ink ${
              pathname === "/is-birligi" ? "text-ink font-medium" : "text-muted"
            }`}
          >
            {t.nav.cooperation}
          </Link>

          {/* Stüdyo Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setStudioOpen(true)}
            onMouseLeave={() => setStudioOpen(false)}
          >
            <button
              className={`flex items-center gap-1 text-sm transition-colors hover:text-ink ${
                pathname.startsWith("/studyo") || pathname === "/surec" ? "text-ink font-medium" : "text-muted"
              }`}
            >
              {t.nav.studio}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${studioOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {studioOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[200px]"
                >
                  <div className="card-surface p-4 rounded-xl border border-line bg-bg shadow-xl flex flex-col gap-2.5">
                    <Link
                      href="/studyo"
                      className="text-sm font-medium text-muted hover:text-ink transition-colors"
                    >
                      {language === "tr" ? "Stüdyo Hakkında" : language === "de" ? "Über das Studio" : "About Studio"}
                    </Link>
                    <Link
                      href="/surec"
                      className="text-sm font-medium text-muted hover:text-ink transition-colors"
                    >
                      {language === "tr" ? "Çalışma Süreci" : language === "de" ? "Arbeitsprozess" : "Working Process"}
                    </Link>
                    <Link
                      href="/is-birligi"
                      className="text-sm font-medium text-muted hover:text-ink transition-colors"
                    >
                      {language === "tr" ? "İş Birliği Modelleri" : language === "de" ? "Partnerschaft" : "Cooperation Models"}
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {langSwitcherJSX}

          <Link
            href="/iletisim"
            className="btn-shine rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            {t.nav.contactBtn}
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {langSwitcherJSX}
          <Link
            href="/iletisim"
            className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
            onClick={() => setIsOpen(false)}
          >
            {t.nav.contactBtn}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-ink p-1 transition-colors hover:text-accent"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-bg border-b border-line md:hidden shadow-lg"
          >
            <div className="flex flex-col px-5 py-6 space-y-5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-ink transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
