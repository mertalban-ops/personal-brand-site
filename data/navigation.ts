export type NavLink = {
  href: string;
  label: string;
  labelEn?: string;
  labelDe?: string;
};

export const mainNavLinks: NavLink[] = [
  { href: "/cozumler", label: "Çözümler", labelEn: "Solutions", labelDe: "Lösungen" },
  { href: "/projeler", label: "Projeler", labelEn: "Projects", labelDe: "Projekte" },
  { href: "/surec", label: "Süreç", labelEn: "Process", labelDe: "Prozess" },
  { href: "/rehber", label: "Rehber", labelEn: "Guide", labelDe: "Leitfaden" },
  { href: "/studyo", label: "Stüdyo", labelEn: "Studio", labelDe: "Studio" },
];

export const footerLinks = {
  solutions: [
    { href: "/cozumler/is-takip-sistemleri", label: "İş Takip Sistemleri", labelEn: "Job Tracking Systems", labelDe: "Arbeitsverfolgungssysteme" },
    { href: "/cozumler/stok-cari-tahsilat", label: "Stok ve Cari Hesap", labelEn: "Inventory & Accounts", labelDe: "Lager & Finanzen" },
    { href: "/cozumler/operasyon-otomasyonlari", label: "Operasyon Otomasyonları", labelEn: "Operational Automation", labelDe: "Prozessautomatisierung" },
    { href: "/cozumler/saas-urun-altyapisi", label: "SaaS Ürün Altyapısı", labelEn: "SaaS Product Foundation", labelDe: "SaaS-Produkt-Infrastruktur" },
  ] as NavLink[],
  studio: [
    { href: "/studyo", label: "Stüdyo", labelEn: "Studio", labelDe: "Studio" },
    { href: "/projeler", label: "Projeler", labelEn: "Projects", labelDe: "Projekte" },
    { href: "/surec", label: "Çalışma Süreci", labelEn: "Engagement Process", labelDe: "Arbeitsprozess" },
    { href: "/is-birligi", label: "İş Birliği", labelEn: "Partnership", labelDe: "Partnerschaft" },
    { href: "/iletisim", label: "İletişim", labelEn: "Contact", labelDe: "Kontakt" },
  ] as NavLink[],
};
