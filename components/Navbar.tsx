"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useLanguage, LanguageCode } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const links = [
    { href: "#kimim", label: t.nav.studio },
    { href: "#hizmetler", label: t.nav.services },
    { href: "#projeler", label: t.nav.cases },
    { href: "#surec", label: t.nav.process },
  ];

  const availableLangs = (["tr", "en", "de"] as LanguageCode[]).filter((l) => l !== language);

  const langSwitcherJSX = (
    <div className="relative group">
      <button className="flex items-center gap-1.5 text-xs font-medium bg-surface/50 px-3 py-1.5 rounded-md border border-line uppercase text-ink transition-colors hover:border-accent/40">
        {language}
        <svg className="w-3 h-3 text-muted transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full pt-1 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
        <div className="flex flex-col bg-bg border border-line rounded-md shadow-lg overflow-hidden min-w-[70px]">
          {availableLangs.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className="px-3 py-2 text-xs font-medium uppercase text-muted hover:bg-surface hover:text-accent transition-colors text-left"
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

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
        <a href="#top" className="flex items-baseline gap-3" onClick={() => setIsOpen(false)}>
          <span className="display text-sm font-bold tracking-tight text-ink">
            Solvaria
          </span>
          <span className="mono-label hidden text-faint sm:inline" style={{ color: "var(--faint)" }}>
            digital operation systems
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          {langSwitcherJSX}
          <a
            href="#iletisim"
            className="btn-shine rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            {t.nav.contactBtn}
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {langSwitcherJSX}
          <a
            href="#iletisim"
            className="rounded-lg bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20"
            onClick={() => setIsOpen(false)}
          >
            {t.nav.contactBtn}
          </a>
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
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-ink transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
