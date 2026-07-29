"use client";

import { getStudio } from "@/data/studio";
import { useLanguage } from "@/context/LanguageContext";

export default function FounderCard() {
  const { language } = useLanguage();
  const s = getStudio(language);

  const managementText = {
    tr: "Albanexa'nın proje ve ürün geliştirme süreçleri Mert Alban tarafından yönetilir. Kalite yönetimi, süreç analizi ve operasyon deneyimi; kullanıcı deneyimi ve yazılım geliştirme yaklaşımıyla birlikte değerlendirilir. Projenin kapsamına göre gerekli uzmanlık alanlarında çözüm ortaklarıyla çalışılabilir.",
    en: "Albanexa's project and product development processes are managed by Mert Alban. Quality management, process analysis, and operational experience are evaluated together with user experience and software development practices. Depending on project scope, trusted domain specialists may be engaged.",
    de: "Die Projekt- und Produktentwicklungsprozesse von Albanexa werden von Mert Alban geleitet. Qualitätsmanagement, Prozessanalyse und Betriebserfahrung werden gemeinsam mit Ansätzen aus User Experience und Softwareentwicklung bewertet. Je nach Projektumfang können vertrauenswürdige Fachspezialisten hinzugezogen werden.",
  };

  const text = managementText[language as "tr" | "en" | "de"] ?? managementText.tr;

  return (
    <div className="card-surface rounded-xl p-8 border border-line">
      <p className="text-sm font-semibold text-ink mb-1">{s.founder.name}</p>
      <p className="text-xs text-muted mb-4">
        {s.founder.role} &middot; {s.brand.location}
      </p>
      <p className="text-sm text-muted leading-relaxed">{text}</p>
    </div>
  );
}
