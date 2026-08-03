"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const STORAGE_KEY = "albanexa_cookie_consent";

export type ConsentStatus = "accepted" | "rejected";

export function getConsentStatus(): ConsentStatus | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return null;
}

export function setConsentStatus(status: ConsentStatus) {
  localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(new Event("cookieConsentUpdated"));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    setConsentStatus("accepted");
    setVisible(false);
  };

  const handleReject = () => {
    setConsentStatus("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez bildirimi"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0a]/95 px-4 py-4 backdrop-blur-sm md:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-sm leading-relaxed text-white/60">
          Bu site; ziyaretçi analizi ve Meta Pixel için çerez kullanır. Detaylar:{" "}
          <Link
            href="/kvkk-aydinlatma"
            className="text-white/80 underline underline-offset-2 transition-colors hover:text-white"
          >
            KVKK Aydınlatma Metni
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            Sadece Zorunlular
          </button>
          <button
            onClick={handleAccept}
            className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
