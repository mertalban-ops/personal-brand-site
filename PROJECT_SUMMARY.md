# Personal Brand Site

## Konum
`~/Desktop/Yapay Zeka/01_Projeler/personal-brand-site/`

## Durum
Aktif Git repo — tek sayfalık kişisel marka sitesi, yayına hazır (Vercel bekliyor).

## Amaç
Mert Alban'ın müşterilere gönderilebilir kişisel marka sitesi.
Konumlandırma: KOBİ'lere iş takip sistemleri kuran bağımsız dijital çözüm üreticisi
(stok, cari hesap, satış, tahsilat, raporlama, otomasyon, SaaS).

## Teknoloji
- Next.js 16 (App Router) — statik çıktı
- TypeScript
- Tailwind CSS v4
- Framer Motion (3D hero kartları, scroll animasyonları)
- Lucide icons

## Özel İçerik
- `data/` → tüm site metinleri (profile, services, projects, contact)
- `components/` → 11 section componenti
- `docs/` → brand-system, design-system, deployment + n8n blueprint'leri

## Vitrindeki Projeler
StokApp (Aktif) · Hezer Auto Service (Aktif) · CARPASS (Geliştirme) · SaaS Altyapıları (Planlanan)

## Eksikler
- `data/contact.ts` → WhatsApp, LinkedIn, GitHub boş (dolunca butonlar otomatik görünür)
- OG paylaşım görseli (1200×630)
- Gerçek müşteri yorumu (şimdilik "hedeflenen müşteri deneyimi" etiketiyle)

## Notlar
Çalıştırmak için: `cd ~/Desktop/Yapay\ Zeka/01_Projeler/personal-brand-site && npm run dev`
