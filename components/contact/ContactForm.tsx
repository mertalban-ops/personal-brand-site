"use client";

import { useState, useTransition } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { useLanguage } from "@/context/LanguageContext";

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

export default function ContactForm() {
  const { language } = useLanguage();
  const [stage, setStage] = useState<1 | 2>(1);
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Multi-language translation maps
  const tr = {
    step1: "1. İletişim Bilgileri",
    step2: "2. Proje Detayları",
    name: "Ad Soyad *",
    namePlaceholder: "Adınız Soyadınız",
    company: "Firma Adı",
    companyPlaceholder: "Varsa şirketinizin adı",
    email: "E-posta *",
    emailPlaceholder: "ornek@firma.com",
    phone: "Telefon",
    phonePlaceholder: "İletişim numarası (isteğe bağlı)",
    needType: "Çözüm Türü *",
    needPlaceholder: "Seçin...",
    needTypes: [
      "KOBİ Operasyon Sistemleri (Stok, Cari, Tahsilat)",
      "Kurumsal Web ve Dijital Marka",
      "SaaS ve Otomasyon Altyapıları",
      "Diğer Özel Yazılımlar",
    ],
    next: "Sonraki Adım",
    back: "Geri",
    currentMethod: "Şu an süreçlerinizi nasıl takip ediyorsunuz?",
    currentPlaceholder: "Excel, defter, WhatsApp, hazır programlar...",
    problem: "İşletmenizde çözmek istediğiniz en büyük darboğaz nedir? *",
    problemPlaceholder: "Örn: Stok sayımları tutarsız, tahsilatlar unutuluyor...",
    expected: "Bu sistemden temel beklentiniz nedir?",
    expectedPlaceholder: "Hangi işlemlerin otomatikleşmesini istersiniz?",
    timeline: "Zamanlama ve bütçe beklentiniz",
    timelinePlaceholder: "Örn: 1-2 ay içinde canlıya geçmeli...",
    privacyNote: "Talebinizi göndererek Gizlilik Sözleşmesini okuduğunuzu onaylarsınız.",
    submit: "Talebi Gönder",
    submitting: "Gönderiliyor...",
    validationError: "Lütfen tüm zorunlu (*) alanları doldurun.",
  };

  const en = {
    step1: "1. Contact Info",
    step2: "2. Project Details",
    name: "Full Name *",
    namePlaceholder: "First and last name",
    company: "Company Name",
    companyPlaceholder: "Company name if applicable",
    email: "Email Address *",
    emailPlaceholder: "example@company.com",
    phone: "Phone Number",
    phonePlaceholder: "Phone number (optional)",
    needType: "Solution Type *",
    needPlaceholder: "Select...",
    needTypes: [
      "SME Operational Systems (Inventory, Accounts, Finance)",
      "Corporate Web & Digital Brand",
      "SaaS & Automation Infrastructures",
      "Other Custom Software",
    ],
    next: "Next Step",
    back: "Back",
    currentMethod: "How do you currently track your workflows?",
    currentPlaceholder: "Excel, notebooks, WhatsApp, off-the-shelf software...",
    problem: "What is the biggest operational bottleneck you want to solve? *",
    problemPlaceholder: "E.g. inventory mismatch, collections are forgotten...",
    expected: "What is your main expectation from this system?",
    expectedPlaceholder: "Which manual tasks do you want to automate?",
    timeline: "Expected timeline and budget",
    timelinePlaceholder: "E.g. launch within 1-2 months...",
    privacyNote: "By submitting, you agree that you have read our Privacy Policy.",
    submit: "Submit Proposal",
    submitting: "Submitting...",
    validationError: "Please fill out all required (*) fields.",
  };

  const de = {
    step1: "1. Kontaktinfo",
    step2: "2. Projektdetails",
    name: "Name, Vorname *",
    namePlaceholder: "Vor- und Nachname",
    company: "Firmenname",
    companyPlaceholder: "Firmenname falls zutreffend",
    email: "E-Mail-Adresse *",
    emailPlaceholder: "beispiel@firma.de",
    phone: "Telefonnummer",
    phonePlaceholder: "Telefonnummer (optional)",
    needType: "Lösungstyp *",
    needPlaceholder: "Wählen...",
    needTypes: [
      "KMU-Betriebssysteme (Lager, Konten, Finanzen)",
      "Unternehmensweb & Digitale Marke",
      "SaaS- & Automatisierungs-Infrastrukturen",
      "Andere maßgeschneiderte Software",
    ],
    next: "Nächster Schritt",
    back: "Zurück",
    currentMethod: "Wie verfolgen Sie Ihre Workflows derzeit?",
    currentPlaceholder: "Excel, Notizbücher, WhatsApp, Standardsoftware...",
    problem: "Was ist der größte operative Engpass, den Sie lösen möchten? *",
    problemPlaceholder: "Z.B. Lagerbestände ungenau, Einnahmen werden vergessen...",
    expected: "Was ist Ihre Haupterwartung an dieses System?",
    expectedPlaceholder: "Welche manuellen Aufgaben möchten Sie automatisieren?",
    timeline: "Gewünschter Zeitrahmen und Budget",
    timelinePlaceholder: "Z.B. Live-Schaltung in 1-2 Monaten...",
    privacyNote: "Mit der Einsendung erklären Sie sich mit unserer Datenschutzerklärung einverstanden.",
    submit: "Anfrage senden",
    submitting: "Wird gesendet...",
    validationError: "Bitte füllen Sie alle erforderlichen (*) Felder aus.",
  };

  const c = language === "en" ? en : language === "de" ? de : tr;

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrorMsg(null);
  };

  const validateStage1 = () => {
    if (!form.name.trim() || !form.email.trim() || !form.needType) {
      setErrorMsg(c.validationError);
      return false;
    }
    if (!form.email.includes("@")) {
      setErrorMsg(language === "tr" ? "Geçerli bir e-posta girin." : "Enter a valid email.");
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleNext = () => {
    if (validateStage1()) {
      setStage(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.problem.trim()) {
      setErrorMsg(c.validationError);
      return;
    }

    startTransition(async () => {
      // Build FormData object for Server Action
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, val);
      });
      // Append honeypot field
      const hpField = (document.getElementById("cf_website_confirm") as HTMLInputElement)?.value || "";
      formData.append("cf_website_confirm", hpField);

      const result = await submitContactForm(null, formData);
      if (result.success) {
        setSuccessMsg(result.message);
        setErrorMsg(null);
      } else {
        setErrorMsg(result.message);
        setSuccessMsg(null);
      }
    });
  };

  if (successMsg) {
    return (
      <div className="card-surface rounded-2xl p-8 text-center border border-accent/30 bg-accent/5 animate-[fadeIn_0.4s_ease]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <h3 className="display text-xl font-bold text-ink mb-3">
          {language === "tr"
            ? "Talebiniz Alındı"
            : language === "de"
            ? "Anfrage eingegangen"
            : "Proposal Received"}
        </h3>
        <p className="text-muted text-sm leading-relaxed max-w-md mx-auto">
          {successMsg}
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-line bg-bg-raised/30 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/30 transition-colors";
  const labelClass = "block text-xs font-semibold text-muted mb-1.5";

  return (
    <div className="card-surface rounded-2xl p-6 md:p-8 border border-line bg-surface/30">
      {/* Progress indicators */}
      <div className="mb-6 flex justify-between items-center text-xs">
        <span className={`font-mono ${stage === 1 ? "text-accent font-bold" : "text-muted"}`}>
          {c.step1}
        </span>
        <div className="h-0.5 flex-grow mx-4 bg-line relative">
          <div
            className="h-full bg-accent absolute left-0 top-0 transition-all duration-300"
            style={{ width: stage === 1 ? "50%" : "100%" }}
          />
        </div>
        <span className={`font-mono ${stage === 2 ? "text-accent font-bold" : "text-muted"}`}>
          {c.step2}
        </span>
      </div>

      {errorMsg && (
        <div className="mb-5 flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot hidden input */}
        <div style={{ display: "none" }}>
          <input
            type="text"
            id="cf_website_confirm"
            name="cf_website_confirm"
            tabIndex={-1}
            autoComplete="off"
            placeholder="Do not fill this"
          />
        </div>

        {stage === 1 && (
          <div className="space-y-5 animate-[fadeIn_0.25s_ease]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="cf-name">
                  {c.name}
                </label>
                <input
                  id="cf-name"
                  required
                  value={form.name}
                  onChange={set("name")}
                  className={inputClass}
                  placeholder={c.namePlaceholder}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="cf-company">
                  {c.company}
                </label>
                <input
                  id="cf-company"
                  value={form.company}
                  onChange={set("company")}
                  className={inputClass}
                  placeholder={c.companyPlaceholder}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="cf-email">
                  {c.email}
                </label>
                <input
                  id="cf-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={set("email")}
                  className={inputClass}
                  placeholder={c.emailPlaceholder}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="cf-phone">
                  {c.phone}
                </label>
                <input
                  id="cf-phone"
                  value={form.phone}
                  onChange={set("phone")}
                  className={inputClass}
                  placeholder={c.phonePlaceholder}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-needType">
                {c.needType}
              </label>
              <select
                id="cf-needType"
                required
                value={form.needType}
                onChange={set("needType")}
                className={inputClass}
              >
                <option value="">{c.needPlaceholder}</option>
                {c.needTypes.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleNext}
                className="btn-shine glow-accent flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-black"
              >
                {c.next} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {stage === 2 && (
          <div className="space-y-5 animate-[fadeIn_0.25s_ease]">
            <div>
              <label className={labelClass} htmlFor="cf-currentMethod">
                {c.currentMethod}
              </label>
              <input
                id="cf-currentMethod"
                value={form.currentMethod}
                onChange={set("currentMethod")}
                className={inputClass}
                placeholder={c.currentPlaceholder}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-problem">
                {c.problem}
              </label>
              <textarea
                id="cf-problem"
                required
                value={form.problem}
                onChange={set("problem")}
                rows={3}
                className={inputClass}
                placeholder={c.problemPlaceholder}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-expected">
                {c.expected}
              </label>
              <textarea
                id="cf-expected"
                value={form.expected}
                onChange={set("expected")}
                rows={2}
                className={inputClass}
                placeholder={c.expectedPlaceholder}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-timeline">
                {c.timeline}
              </label>
              <input
                id="cf-timeline"
                value={form.timeline}
                onChange={set("timeline")}
                className={inputClass}
                placeholder={c.timelinePlaceholder}
              />
            </div>

            <p className="text-[0.65rem] text-faint leading-relaxed">
              {c.privacyNote}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStage(1)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-line bg-surface/20 px-4 py-3 font-medium text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="h-4 w-4" /> {c.back}
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="btn-shine glow-accent flex-grow flex items-center justify-center gap-2 rounded-lg bg-accent py-3 font-semibold text-black disabled:opacity-60"
              >
                {isPending ? c.submitting : c.submit}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
