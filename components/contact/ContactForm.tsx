"use client";

import Link from "next/link";
import { useState, useTransition, useRef } from "react";
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/app/actions/contact";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/data/config";
import { track } from "@vercel/analytics";
import { trackLead } from "@/lib/meta-events";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  needType: string;
  message: string;
  currentMethod: string;
  problem: string;
  userCount: string;
  timeline: string;
  budget: string;
  additionalInfo: string;
  marketingConsent?: boolean;
};

export default function ContactForm() {
  const { language } = useLanguage();
  const [stage, setStage] = useState<1 | 2>(1);
  const hasTrackedStart = useRef(false);
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    needType: "",
    message: "",
    currentMethod: "",
    problem: "",
    userCount: "",
    timeline: "",
    budget: "",
    additionalInfo: "",
    marketingConsent: false,
  });

  const [fieldErrors, setFieldErrors] = useState<{ [key in keyof FormState]?: string }>({});
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
    message: "Kısa Mesaj",
    messagePlaceholder: "Varsa proje hakkında kısa bir not",
    next: "Sonraki Adım",
    back: "Geri",
    currentMethod: "Şu an süreçlerinizi nasıl takip ediyorsunuz?",
    currentPlaceholder: "Excel, defter, WhatsApp, hazır programlar...",
    problem: "İşletmenizde çözmek istediğiniz en büyük darboğaz nedir? *",
    problemPlaceholder: "Örn: Stok sayımları tutarsız, tahsilatlar unutuluyor...",
    userCount: "Sistemi kullanacak kişi sayısı",
    userCountPlaceholder: "Örn: 5, 20, 100...",
    timeline: "Beklenen teslim zamanlaması",
    timelinePlaceholder: "Örn: 1-2 ay içinde, acil, esnek...",
    budget: "Tahmini bütçe aralığı",
    budgetPlaceholder: "Bütçe seçin...",
    additionalInfo: "Ek bilgi veya eklemek istedikleriniz",
    additionalInfoPlaceholder: "Sistem entegrasyonları, özel güvenlik talepleri vb.",
    kvkkPrefix: "Formda paylaştığınız kişisel veriler, talebinizi değerlendirmek ve sizinle iletişim kurmak amacıyla işlenir. Ayrıntılar için",
    kvkkLinkText: "KVKK Aydınlatma Metni",
    kvkkSuffix: "'ni inceleyebilirsiniz.",
    marketingConsentText: "Gelecekteki dijital rehber ve çözüm bilgilendirmelerini e-posta ile almak istiyorum (İsteğe bağlı).",
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
    message: "Short Message",
    messagePlaceholder: "A quick note about your project",
    next: "Next Step",
    back: "Back",
    currentMethod: "How do you currently track your workflows?",
    currentPlaceholder: "Excel, notebooks, WhatsApp, off-the-shelf software...",
    problem: "What is the biggest operational bottleneck you want to solve? *",
    problemPlaceholder: "E.g. inventory mismatch, collections are forgotten...",
    userCount: "Number of system users",
    userCountPlaceholder: "E.g. 5, 20, 100...",
    timeline: "Expected timeline",
    timelinePlaceholder: "E.g. within 1-2 months, urgent, flexible...",
    budget: "Estimated budget range",
    budgetPlaceholder: "Select budget...",
    additionalInfo: "Additional details or requirements",
    additionalInfoPlaceholder: "API integrations, specific security needs, etc.",
    kvkkPrefix: "Personal data submitted in this form is processed to evaluate your project inquiry and communicate with you. For details, view our",
    kvkkLinkText: "Privacy & Data Notice",
    kvkkSuffix: ".",
    marketingConsentText: "I would like to receive future solution updates and digital guides via email (Optional).",
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
    message: "Kurze Nachricht",
    messagePlaceholder: "Eine kurze Notiz zu Ihrem Projekt",
    next: "Nächster Schritt",
    back: "Zurück",
    currentMethod: "Wie verfolgen Sie Ihre Workflows derzeit?",
    currentPlaceholder: "Excel, Notizbücher, WhatsApp, Standardsoftware...",
    problem: "Was ist der größte operative Engpass, den Sie lösen möchten? *",
    problemPlaceholder: "Z.B. Lagerbestände ungenau, Einnahmen werden vergessen...",
    userCount: "Anzahl der Systembenutzer",
    userCountPlaceholder: "Z.B. 5, 20, 100...",
    timeline: "Gewünschter Zeitrahmen",
    timelinePlaceholder: "Z.B. in 1-2 Monaten, dringend, flexibel...",
    budget: "Geschätztes Budget",
    budgetPlaceholder: "Budget wählen...",
    additionalInfo: "Zusätzliche Details oder Anforderungen",
    additionalInfoPlaceholder: "API-Integrationen, spezifische Sicherheitsanforderungen etc.",
    kvkkPrefix: "Personenbezogene Daten in diesem Formular werden verarbeitet, um Ihre Anfrage zu bearbeiten. Details finden Sie in unserer",
    kvkkLinkText: "Datenschutzerklärung",
    kvkkSuffix: ".",
    marketingConsentText: "Ich möchte künftige Branchen-Updates und Anleitungen per E-Mail erhalten (Optional).",
    privacyNote: "Mit der Einsendung erklären Sie sich mit unserer Datenschutzerklärung einverstanden.",
    submit: "Anfrage senden",
    submitting: "Wird gesendet...",
    validationError: "Bitte füllen Sie alle erforderlichen (*) Felder aus.",
  };

  const c = language === "en" ? en : language === "de" ? de : tr;

  const needTypesTr = [
    "Kurumsal web sitesi",
    "Kişisel marka / portföy sitesi",
    "Landing page",
    "İş takip sistemi",
    "Stok ve cari hesap sistemi",
    "Servis / operasyon paneli",
    "Web uygulaması",
    "SaaS ürünü",
    "Otomasyon",
    "İş birliği",
    "Henüz emin değilim",
    "Diğer",
  ];
  const needTypesEn = [
    "Corporate website",
    "Personal brand / portfolio site",
    "Landing page",
    "Work tracking system",
    "Inventory & accounts system",
    "Service / operations panel",
    "Web application",
    "SaaS product",
    "Automation",
    "Partnership / Cooperation",
    "Not sure yet",
    "Other",
  ];
  const needTypesDe = [
    "Unternehmenswebsite",
    "Persönliche Marken- oder Portfolioseite",
    "Landingpage",
    "Arbeitsverfolgungssystem",
    "Lager- und Kontokorrentsystem",
    "Service- / Betriebspanel",
    "Webanwendung",
    "SaaS-Produkt",
    "Automatisierung",
    "Kooperation",
    "Noch nicht sicher",
    "Andere",
  ];

  const needTypes = language === "en" ? needTypesEn : language === "de" ? needTypesDe : needTypesTr;

  const validateField = (field: keyof FormState, value: string) => {
    let err = "";
    if (field === "name" && (!value.trim() || value.trim().length < 2)) {
      err = language === "tr" ? "Lütfen geçerli bir isim girin." : language === "de" ? "Bitte geben Sie einen gültigen Namen ein." : "Please enter a valid name.";
    }
    if (field === "email") {
      if (!value.trim()) {
        err = language === "tr" ? "E-posta adresi gereklidir." : language === "de" ? "E-Mail-Adresse ist erforderlich." : "Email address is required.";
      } else if (!value.includes("@") || !value.includes(".")) {
        err = language === "tr" ? "Geçerli bir e-posta adresi girin." : language === "de" ? "Geben Sie eine gültige E-Mail-Adresse ein." : "Enter a valid email address.";
      }
    }
    if (field === "needType" && !value) {
      err = language === "tr" ? "Lütfen bir çözüm türü seçin." : language === "de" ? "Bitte wählen Sie einen Lösungstyp." : "Please select a solution type.";
    }
    if (field === "problem" && stage === 2 && (!value.trim() || value.trim().length < 10)) {
      err = language === "tr" ? "Lütfen yaşadığınız problemi en az 10 karakterle açıklayın." : language === "de" ? "Bitte beschreiben Sie das Problem mit mindestens 10 Zeichen." : "Please describe the problem in at least 10 characters.";
    }

    setFieldErrors((prev) => ({ ...prev, [field]: err || undefined }));
    return !err;
  };

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      try { track("contact_form_start"); } catch (err) {}
    }
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    validateField(field, val);
    setErrorMsg(null);
  };

  const validateStage1 = () => {
    const isNameValid = validateField("name", form.name);
    const isEmailValid = validateField("email", form.email);
    const isNeedValid = validateField("needType", form.needType);

    if (!isNameValid || !isEmailValid || !isNeedValid) {
      setErrorMsg(c.validationError);
      return false;
    }
    setErrorMsg(null);
    return true;
  };

  const handleNext = () => {
    if (validateStage1()) {
      try { track("contact_form_step1_complete", { needType: form.needType }); } catch (err) {}
      setStage(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isProblemValid = validateField("problem", form.problem);
    if (!isProblemValid) {
      setErrorMsg(c.validationError);
      return;
    }

    startTransition(async () => {
      // Build FormData object for Server Action
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        formData.append(key, String(val ?? ""));
      });
      // Append honeypot field
      const hpField = (document.getElementById("cf_website_confirm") as HTMLInputElement)?.value || "";
      formData.append("cf_website_confirm", hpField);

      const result = await submitContactForm(null, formData);
      if (result.success) {
        try { track("contact_form_submitted", { needType: form.needType, company: !!form.company }); trackLead(); } catch (err) {}
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

  const inputClass = (field: keyof FormState) => {
    const base = "w-full rounded-lg border bg-bg-raised/30 px-4 py-2.5 text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-1 transition-colors";
    if (fieldErrors[field]) {
      return `${base} border-red-500/80 focus:border-red-500 focus:ring-red-500/20`;
    }
    return `${base} border-line focus:border-accent/60 focus:ring-accent/30`;
  };

  const labelClass = "block text-xs font-semibold text-muted mb-1.5";
  const showBudget = siteConfig.budgetRanges && siteConfig.budgetRanges.length > 0;

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
                  onBlur={(e) => validateField("name", e.target.value)}
                  className={inputClass("name")}
                  placeholder={c.namePlaceholder}
                />
                {fieldErrors.name && (
                  <p className="text-[10px] text-red-400 mt-1">{fieldErrors.name}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="cf-company">
                  {c.company}
                </label>
                <input
                  id="cf-company"
                  value={form.company}
                  onChange={set("company")}
                  className={inputClass("company")}
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
                  onBlur={(e) => validateField("email", e.target.value)}
                  className={inputClass("email")}
                  placeholder={c.emailPlaceholder}
                />
                {fieldErrors.email && (
                  <p className="text-[10px] text-red-400 mt-1">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <label className={labelClass} htmlFor="cf-phone">
                  {c.phone}
                </label>
                <input
                  id="cf-phone"
                  value={form.phone}
                  onChange={set("phone")}
                  className={inputClass("phone")}
                  placeholder={c.phonePlaceholder}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-1">
              <div>
                <label className={labelClass} htmlFor="cf-needType">
                  {c.needType}
                </label>
                <select
                  id="cf-needType"
                  required
                  value={form.needType}
                  onChange={set("needType")}
                  onBlur={(e) => validateField("needType", e.target.value)}
                  className={inputClass("needType")}
                >
                  <option value="">{c.needPlaceholder}</option>
                  {needTypes.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                {fieldErrors.needType && (
                  <p className="text-[10px] text-red-400 mt-1">{fieldErrors.needType}</p>
                )}
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="cf-message">
                {c.message}
              </label>
              <textarea
                id="cf-message"
                value={form.message}
                onChange={set("message")}
                rows={2}
                className={inputClass("message")}
                placeholder={c.messagePlaceholder}
              />
            </div>

            <div className="space-y-3 pt-2">
              <p className="text-[0.7rem] text-muted leading-relaxed">
                {c.kvkkPrefix}{" "}
                <Link
                  href="/kvkk-aydinlatma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline hover:text-accent/80 transition-colors"
                  aria-label={`${c.kvkkLinkText} (yeni sekmede açılır)`}
                >
                  {c.kvkkLinkText}
                </Link>
                {c.kvkkSuffix}
              </p>
              <button
                id="cf-next-btn"
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
                className={inputClass("currentMethod")}
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
                onBlur={(e) => validateField("problem", e.target.value)}
                rows={3}
                className={inputClass("problem")}
                placeholder={c.problemPlaceholder}
              />
              {fieldErrors.problem && (
                <p className="text-[10px] text-red-400 mt-1">{fieldErrors.problem}</p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="cf-userCount">
                  {c.userCount}
                </label>
                <input
                  id="cf-userCount"
                  value={form.userCount}
                  onChange={set("userCount")}
                  className={inputClass("userCount")}
                  placeholder={c.userCountPlaceholder}
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
                  className={inputClass("timeline")}
                  placeholder={c.timelinePlaceholder}
                />
              </div>
            </div>

            {showBudget && (
              <div>
                <label className={labelClass} htmlFor="cf-budget">
                  {c.budget}
                </label>
                <select
                  id="cf-budget"
                  value={form.budget}
                  onChange={set("budget")}
                  className={inputClass("budget")}
                >
                  <option value="">{c.budgetPlaceholder}</option>
                  {siteConfig.budgetRanges.map((range) => {
                    const label =
                      language === "en"
                        ? range.labelEn
                        : language === "de"
                        ? range.labelDe
                        : range.labelTr;
                    return (
                      <option key={range.value} value={range.value}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor="cf-additionalInfo">
                {c.additionalInfo}
              </label>
              <textarea
                id="cf-additionalInfo"
                value={form.additionalInfo}
                onChange={set("additionalInfo")}
                rows={2}
                className={inputClass("additionalInfo")}
                placeholder={c.additionalInfoPlaceholder}
              />
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-[0.7rem] text-muted leading-relaxed">
                {c.kvkkPrefix || "Formda paylaştığınız kişisel veriler, talebinizi değerlendirmek ve sizinle iletişim kurmak amacıyla işlenir. Ayrıntılar için"}{" "}
                <Link
                  href="/kvkk-aydinlatma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-accent underline hover:text-accent/80 transition-colors"
                  aria-label={`${c.kvkkLinkText || "KVKK Aydınlatma Metni"} (yeni sekmede açılır)`}
                >
                  {c.kvkkLinkText || "KVKK Aydınlatma Metni"}
                </Link>
                {c.kvkkSuffix || "'ni inceleyebilirsiniz."}
              </p>

              <label className="flex items-center gap-2 text-[0.7rem] text-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.marketingConsent || false}
                  onChange={(e) => setForm((prev) => ({ ...prev, marketingConsent: e.target.checked }))}
                  className="h-3.5 w-3.5 rounded border-line bg-surface/30 text-accent focus:ring-accent accent-accent"
                />
                <span>{c.marketingConsentText || "Gelecekteki dijital rehber ve bilgilendirmeleri e-posta ile almak istiyorum (İsteğe bağlı)."}</span>
              </label>
            </div>

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
