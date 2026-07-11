"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Dictionary } from "@/data/locales/types";
import { tr } from "@/data/locales/tr";
import { en } from "@/data/locales/en";
import { de } from "@/data/locales/de";

export type LanguageCode = "tr" | "en" | "de";

interface LanguageContextProps {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Dictionary;
}

const dictionaries: Record<LanguageCode, Dictionary> = { tr, en, de };

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LanguageCode>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("solvaria-lang") as LanguageCode;
    if (savedLang && dictionaries[savedLang]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(savedLang);
    } else {
      // Varsayılan olarak tarayıcı diline bak, TR değilse EN yap, DE ise DE yap
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "tr" || browserLang === "de" || browserLang === "en") {
        setLanguage(browserLang as LanguageCode);
      } else {
        setLanguage("en");
      }
    }
    setMounted(true);
  }, []);

  const handleSetLanguage = (lang: LanguageCode) => {
    setLanguage(lang);
    localStorage.setItem("solvaria-lang", lang);
    document.documentElement.lang = lang;
  };

  const t = dictionaries[language];

  // SSR hydration mismatch önlemek için mounted kontrolü
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "tr", setLanguage: handleSetLanguage, t: dictionaries["tr"] }}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
