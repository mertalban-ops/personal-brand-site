export type EvidenceStatus =
  | "verified"
  | "internalOnly"
  | "needsEvidence"
  | "remove";

export interface EvidenceItem {
  id: string;
  projectId?: string;
  claim: string;
  status: EvidenceStatus;
  source?: string;
  measuredAt?: string;
  method?: string;
  publicEvidenceUrl?: string;
  approvedForMarketing: boolean;
}

export const evidenceRegistry: EvidenceItem[] = [
  {
    id: "stockapp-pdf-export",
    projectId: "stockapp",
    claim: "Tek tıkla PDF hesap ekstresi oluşturma akışı geliştirildi.",
    status: "verified",
    source: "StockApp PDF Export Module v1.0",
    measuredAt: "2026-03-10",
    method: "Functional verification on iOS/Android/Chrome",
    approvedForMarketing: true,
  },
  {
    id: "hezer-status-tracking",
    projectId: "hezer-auto-service",
    claim: "Araç ve servis durumlarının ekip ve müşteri açısından daha görünür hale gelmesini destekleyen merkezi takip yapısı.",
    status: "verified",
    source: "Hezer Auto Service Lifecycle Tracker",
    measuredAt: "2026-04-12",
    method: "Team user role inspection & status updates logs",
    approvedForMarketing: true,
  },
  {
    id: "hezer-client-testimonial",
    projectId: "hezer-auto-service",
    claim: "Müşteri: borç takibi, gelir/gider yönetimi ve tek tıkla PDF gönderimi sayesinde zaman tasarrufu ve operasyonel düzen sağlandı.",
    status: "verified",
    source: "Hezer Otoşanzıman sahibi — doğrudan sözlü geri bildirim",
    measuredAt: "2026-08-06",
    method: "Direct client verbal feedback, recorded in conversation",
    approvedForMarketing: true,
  },
  {
    id: "hezer-website-published",
    projectId: "hezer-otosanziman-site",
    claim: "Hezer Otoşanzıman için kurumsal web sitesi tasarlandı ve yayınlandı.",
    status: "verified",
    source: "Hezer Otoşanzıman Web Sitesi",
    measuredAt: "2026-08-06",
    method: "Live site deployment verification",
    approvedForMarketing: true,
  },
  {
    id: "hezer-playwright-e2e",
    projectId: "hezer-auto-service",
    claim: "Playwright ile uçtan uca (E2E) otomatik test akışları kuruldu.",
    status: "verified",
    source: "Personal Brand Site Playwright Integration Suite",
    measuredAt: "2026-07-15",
    method: "Test suite completion logs showing 7/7 passed",
    approvedForMarketing: true,
  },
];

export function getVerifiedClaims(projectId?: string): string[] {
  return evidenceRegistry
    .filter(
      (item) =>
        (!projectId || item.projectId === projectId) &&
        item.status === "verified" &&
        item.approvedForMarketing
    )
    .map((item) => item.claim);
}
