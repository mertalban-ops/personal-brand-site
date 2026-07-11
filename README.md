# Mert Alban — Kişisel Marka Sitesi

Tek sayfalık, Türkçe kişisel marka sitesi. Konumlandırma: küçük ve orta ölçekli
firmalara iş takip sistemleri kuran bağımsız dijital çözüm üreticisi.

## Stack
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide

## Çalıştırma
```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
```

## İçerik Güncelleme
Tüm metin ve bilgiler `data/` klasöründe:
- `profile.ts` — hero, hakkımda, süreç, neden ben, testimonial
- `services.ts` — hizmetler ve problem→çözüm listesi
- `projects.ts` — proje vitrini (StokApp, Hezer Auto Service, CARPASS, SaaS)
- `contact.ts` — iletişim; `whatsapp` / `linkedin` / `github` doldurulunca
  ilgili butonlar otomatik görünür

## Dokümantasyon
- [docs/brand-system.md](docs/brand-system.md) — marka ve metin kuralları
- [docs/design-system.md](docs/design-system.md) — renk, tipografi, animasyon
- [docs/deployment.md](docs/deployment.md) — Vercel yayına alma + n8n blueprint'leri
