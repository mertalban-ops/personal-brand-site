"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useLanguage, LanguageCode } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const links = [
    { href: "/cozumler", label: t.nav.solutions ?? "Çözümler" },
    { href: "/projeler", label: t.nav.cases },
    { href: "/surec", label: t.nav.process },
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
            SOLVARIA
          </span>
          <span className="mono-label hidden text-faint sm:inline" style={{ color: "var(--faint)" }}>
            digital operation systems
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const base = l.href.split("#")[0];
            const isActive = pathname === base;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm transition-colors hover:text-ink ${isActive ? "text-ink font-medium" : "text-muted"}`}
              >
                {l.label}
              </Link>
            );
          })}
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
