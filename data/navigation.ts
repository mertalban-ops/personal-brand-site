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
  { href: "/studyo", label: "Stüdyo", labelEn: "Studio", labelDe: "Studio" },
];

export const footerLinks = {
  solutions: [
    { href: "/cozumler/is-takip-sistemleri", label: "İş Takip Sistemleri" },
    { href: "/cozumler/stok-cari-tahsilat", label: "Stok ve Cari Hesap" },
    { href: "/cozumler/operasyon-otomasyonlari", label: "Operasyon Otomasyonları" },
    { href: "/cozumler/saas-urun-altyapisi", label: "SaaS Ürün Altyapısı" },
  ],
  studio: [
    { href: "/studyo", label: "Stüdyo" },
    { href: "/projeler", label: "Projeler" },
    { href: "/surec", label: "Çalışma Süreci" },
    { href: "/iletisim", label: "İletişim" },
    { href: "/gizlilik", label: "Gizlilik" },
    { href: "/kullanim-kosullari", label: "Kullanım Koşulları" },
  ],
};
