"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { contact } from "@/data/contact";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  needType: string;
  currentMethod: string;
  problem: string;
  expected: string;
  timeline: string;
};

const NEED_TYPES = [
  "İş takip sistemi",
  "Stok ve cari hesap",
  "Servis / operasyon paneli",
  "Otomasyon",
  "SaaS ürünü",
  "Web uygulaması",
  "Diğer",
];

export default function ContactForm() {
  const shouldReduce = useReducedMotion();
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    needType: "",
    currentMethod: "",
    problem: "",
    expected: "",
    timeline: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Proje talebi — ${form.company || form.name}`
    );
    const body = encodeURIComponent(
      `Ad Soyad: ${form.name}\nFirma: ${form.company}\nE-posta: ${form.email}\nTelefon: ${form.phone}\nİhtiyaç: ${form.needType}\nMevcut yöntem: ${form.currentMethod}\nProblem: ${form.problem}\nBeklenti: ${form.expected}\nZamanlama: ${form.timeline}`
    );
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="card-surface rounded-2xl p-10 text-center"
        style={
          shouldReduce ? undefined : { transition: "opacity 0.3s ease" }
        }
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
          <span className="text-2xl text-accent">✓</span>
        </div>
        <h3 className="display text-xl font-bold text-ink mb-2">
          E-posta istemciniz açıldı
        </h3>
        <p className="text-muted text-sm">
          Formu göndermek için e-posta uygulamanızdan devam edin.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-bg-raised/30 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors";
  const labelClass = "block text-xs font-medium text-muted mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="cf-name">
            Ad Soyad *
          </label>
          <input
            id="cf-name"
            required
            value={form.name}
            onChange={set("name")}
            className={inputClass}
            placeholder="Adınız Soyadınız"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="cf-company">
            Firma Adı
          </label>
          <input
            id="cf-company"
            value={form.company}
            onChange={set("company")}
            className={inputClass}
            placeholder="Firma Adı"
          />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="cf-email">
            E-posta *
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={form.email}
            onChange={set("email")}
            className={inputClass}
            placeholder="ornek@firma.com"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="cf-phone">
            Telefon
          </label>
          <input
            id="cf-phone"
            value={form.phone}
            onChange={set("phone")}
            className={inputClass}
            placeholder="İsteğe bağlı"
          />
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="cf-needType">
          İhtiyaç Türü *
        </label>
        <select
          id="cf-needType"
          required
          value={form.needType}
          onChange={set("needType")}
          className={inputClass}
        >
          <option value="">Seçin...</option>
          {NEED_TYPES.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass} htmlFor="cf-currentMethod">
          Şu an nasıl takip ediyorsunuz?
        </label>
        <input
          id="cf-currentMethod"
          value={form.currentMethod}
          onChange={set("currentMethod")}
          className={inputClass}
          placeholder="Excel, defter, WhatsApp..."
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="cf-problem">
          Yaşadığınız temel problem *
        </label>
        <textarea
          id="cf-problem"
          required
          value={form.problem}
          onChange={set("problem")}
          rows={3}
          className={inputClass}
          placeholder="Kısaca anlatın..."
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="cf-expected">
          Beklentiniz nedir?
        </label>
        <textarea
          id="cf-expected"
          value={form.expected}
          onChange={set("expected")}
          rows={2}
          className={inputClass}
          placeholder="Hangi sorunun çözülmesini istiyorsunuz?"
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="cf-timeline">
          Tahmini zamanlama
        </label>
        <input
          id="cf-timeline"
          value={form.timeline}
          onChange={set("timeline")}
          className={inputClass}
          placeholder="1-3 ay, acil, belirsiz..."
        />
      </div>
      <p className="text-xs text-faint">
        Formu göndererek{" "}
        <a href="/gizlilik" className="underline hover:text-muted">
          Gizlilik Politikası
        </a>
        &apos;nı okuduğunuzu ve onayladığınızı kabul etmiş olursunuz.
      </p>
      <button
        type="submit"
        className="btn-shine glow-accent w-full rounded-lg bg-accent py-3 font-semibold text-black transition-transform hover:-translate-y-0.5"
      >
        Talebi Gönder
      </button>
    </form>
  );
}
