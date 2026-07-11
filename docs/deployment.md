# Yayına Alma (Vercel)

## Ön Koşullar
- Eksik bilgileri doldur: `data/contact.ts` → `whatsapp`, `linkedin`, `github`
  (boş bırakılanlar sitede görünmez, hata üretmez)
- `npm run build` yerelde hatasız geçmeli (son kontrol: geçti)

## Adımlar
1. GitHub'a push et (repo `create-next-app` tarafından init edildi):
   ```bash
   cd ~/Desktop/Yapay\ Zeka/01_Projeler/personal-brand-site
   git add -A && git commit -m "Personal brand site v1"
   # GitHub'da boş repo oluşturduktan sonra:
   git remote add origin <repo-url>
   git push -u origin main
   ```
2. vercel.com → "Add New Project" → repoyu seç → framework otomatik Next.js → Deploy.
3. Özel alan adı (öneri): `mertalban.com` veya `mertalban.dev` — Vercel → Domains.
4. Deploy sonrası kontrol: mobil görünüm, e-posta CTA'sı, OG önizlemesi
   (ör. https://www.opengraph.xyz ile).

## OG Görseli (opsiyonel ama önerilir)
1200×630 px, koyu lacivert zemin + "Mert Alban — İş Takip Sistemleri" + yeşil aksan.
`app/opengraph-image.png` olarak eklersen Next.js otomatik kullanır.

## n8n Workflow Blueprint'leri (opsiyonel — kurulmadı, sadece plan)
Bu site statik olduğu için form yerine e-posta/WhatsApp CTA kullanıldı.
İleride form eklenirse:
1. **Contact Lead Capture:** Webhook → Google Sheet/Supabase kaydı → Telegram/e-posta bildirimi.
2. **Client Inquiry Follow-up:** Yeni lead → 2 gün sonra onaylı takip e-postası taslağı üret.
3. **Content Repurpose:** Hizmet açıklamalarından LinkedIn postu + kısa tanıtım metni taslağı.
Kural: otomatik mesaj gönderimi yok; her akış taslak üretir, gönderim onayla yapılır.
Credential'lar n8n arayüzünden elle tanımlanır.
