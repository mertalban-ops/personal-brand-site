# Meta Business Kurulum Runbook — Albanexa

Versiyon: 1.0 · Hazırlayan: Claude · Tarih: 2026-08-03

---

## Ön Koşullar

- Kişisel Facebook hesabı (yönetici olarak kullanılacak)
- Doğrulama için erişilebilir telefon numarası
- albanexa.com alan adına DNS erişimi (doğrulama için)
- Tarayıcı: masaüstü Chrome/Firefox önerilir

---

## Adım 1 — Facebook Sayfası Oluşturma

**Neden:** Instagram Business hesabı bir Facebook Sayfasına bağlı olmak zorundadır.  
**Tahmini süre:** 10 dakika

**BEN YAPACAĞIM:**

1. `facebook.com/pages/create` adresine git
2. Kategori seç: **"Küçük İşletme"** veya **"Yerel İşletme"** → *Alt kategori:* Yazılım/Teknoloji
3. Sayfa adı: `Albanexa`
4. Açıklama (kısa): `KOBİ'lere özel iş takip sistemleri, stok & cari hesap yazılımları ve kurumsal web siteleri.`
5. Profil fotoğrafı: albanexa logosu (beyaz/transparan arka plan, 1:1)
6. Kapak fotoğrafı: geçici olarak sade bir görsel, sonra güncellenebilir
7. "Sayfa Oluştur" butonuna bas

**Gereken bilgi:** Marka adı, kısa açıklama, logo dosyası  
**Yaygın hata:** Kişisel profil yerine Sayfa oluşturulduğundan emin ol — Facebook bazen kişisel profile yönlendirir.

---

## Adım 2 — Instagram Hesabı Açma ve Business'a Çevirme

**Tahmini süre:** 15 dakika

**BEN YAPACAĞIM:**

1. Instagram mobil uygulamasını aç (veya instagram.com)
2. "Hesap Oluştur" → e-posta ile kayıt: `mert@albanexa.com`
3. Kullanıcı adı: `albanexa` *(müsait değilse `albanexa.studio` veya `albanexa_tr` dene)*
4. Profil bilgilerini gir (bio, profil fotoğrafı) — content/instagram-profil.md dosyasından kopyala
5. Business hesabına geçiş:
   - Profil → Sağ üst ≡ menü → **Ayarlar ve Gizlilik**
   - **Hesap** → **Profesyonel Hesaba Geç**
   - Kategori: **Yazılım Şirketi** (veya "Dijital İçerik Üreticisi" — *doğrulanmalı: en uygun kategori hangisi?*)
   - **İşletme** tipini seç (Yaratıcı değil)
6. İletişim bilgilerini gir: `mert@albanexa.com` ve `+90 537 953 15 47`

**Gereken bilgi:** E-posta, telefon, profil metinleri  
**Yaygın hata:** "Yaratıcı" tipi seçmek — reklam ve Meta entegrasyonu için "İşletme" seçilmeli.

---

## Adım 3 — Instagram'ı Facebook Sayfası'na Bağlama

**Tahmini süre:** 5 dakika

**BEN YAPACAĞIM:**

**Yöntem A — Instagram'dan:**
1. Instagram → Ayarlar → **Hesap** → **Bağlı Hesaplar** (veya "Paylaşım ve Yeniden Paylaşım") 
2. Facebook'u seç → 1. Adımda oluşturulan `Albanexa` sayfasını seç

**Yöntem B — Facebook'tan (alternatif):**
1. `facebook.com/albanexa` (oluşturulan sayfa) → **Ayarlar** → **Bağlı Hesaplar** → Instagram

*Not: Arayüz Meta güncellemeleriyle değişebilir — "Instagram hesabı bağla" seçeneğini ara. (doğrulanmalı)*

**Yaygın hata:** Kişisel Facebook profilini bağlamak — sayfa (Page) bağlanmalı, profil değil.

---

## Adım 4 — Meta Business Suite Kurulumu

**Tahmini süre:** 20 dakika

**BEN YAPACAĞIM:**

1. `business.facebook.com` adresine git → **"Hesap Oluştur"**
2. İşletme adı: `Albanexa`
3. İşletme e-postası: `mert@albanexa.com`
4. Oluştur → e-posta doğrulama yap

**Varlıkları tek çatı altına al:**

5. Sol menü → **Ayarlar** → **Sayfalar** → **"Sayfa Ekle"**
   - 1. Adımda oluşturulan `Albanexa` Facebook Sayfasını ekle
6. Sol menü → **Ayarlar** → **Instagram Hesapları** → **"Hesap Ekle"**
   - 2. Adımda oluşturulan `albanexa` Instagram hesabını ekle
7. Sol menü → **Veri Kaynakları** → **Pikseller** → **"Ekle"**
   - Piksel adı: `Albanexa Web Pikseli`
   - Web sitesi: `https://www.albanexa.com`
   - Piksel oluşturulunca **Piksel ID'yi** kaydet (15-16 haneli sayı) — `.env.local`'a gireceksin

**Gereken bilgi:** İşletme e-postası, Facebook Sayfası ve IG hesabına erişim  
**Yaygın hata:** Kişisel reklam hesabını Business Manager'a taşımayı unutmak. Business Manager'da sıfırdan reklam hesabı açmak daha temizdir.

---

## Adım 5 — albanexa.com Alan Adı Doğrulaması

**Tahmini süre:** 30 dakika (DNS yayılımı dahil; meta-etiket yöntemi daha hızlı)

**İki yöntem var — meta-etiket yöntemi önerilir:**

### Yöntem A: Meta Etiket (Önerilir)

**BEN YAPACAĞIM:**

1. Business Manager → **Marka Güvenliği** → **Alan Adları** → **"Ekle"**
2. `albanexa.com` gir
3. Meta sana bir `<meta name="facebook-domain-verification" content="XXXX" />` etiketi verecek
4. Bu etiketi `app/layout.tsx`'teki `metadata` nesnesine ekle:
   ```ts
   verification: {
     google: "c20fOLWvAmiLp3Cfx8gevf0GvUXJJwMWtf6FtLSoa64",
     other: { "facebook-domain-verification": ["BURAYA_KOD_GELECEK"] },
   }
   ```
5. Deploy et → Business Manager'da **"Doğrula"** butonuna bas

### Yöntem B: DNS TXT Kaydı

1. Alan adı sağlayıcında (Cloudflare/GoDaddy vb.) TXT kaydı ekle
2. İçerik: Meta'nın verdiği doğrulama değeri
3. 24-48 saat bekle → doğrula

**Yaygın hata:** Doğrulama kodunu test ortamında değil production URL'de çalıştırmak gerekiyor.

---

## Adım 6 — Reklam Hesabı Oluşturma (Ödeme Yöntemi Olmadan)

**Tahmini süre:** 10 dakika  
**Neden şimdi:** Reklam hesabı bir kez oluşturulunca geçmiş ve piksel ilişkilendirmesi başlar. Hesap yokken piksel verileri toplanmaz; hesap varsa data birikmekte. İleride reklam vermek istediğinde sıfır geçmişli değil, veri dolu bir hesapla başlarsın.

**BEN YAPACAĞIM:**

1. Business Manager → **Sol menü** → **Reklam Hesapları** → **"Ekle"** → **"Yeni Reklam Hesabı Oluştur"**
2. Hesap adı: `Albanexa`
3. Saat dilimi: `Türkiye (UTC+3)`
4. Para birimi: `TRY`
5. **"Oluştur"** → Ödeme yöntemi ekle adımını **ATLA** (ya da "Daha Sonra Ekle" seç)
6. Reklam hesabını Business Manager'a bağla: **Ayarlar** → **Reklam Hesapları** → bu hesabı seç

**Ödeme yöntemi EKLEME.** Kampanya KURMA.

**Yaygın hata:** Meta bazen ödeme yöntemini zorunlu kılar — bu durumda adımı geç, sonra geri dönüp ödeme yöntemi ekle. Hesap oluşmadan piksel reklam hesabına bağlanamaz. (*doğrulanmalı: Meta Türkiye için ödeme zorunluluğu değişiyor olabilir*)

---

## Kontrol Listesi

- [ ] Facebook Sayfası oluşturuldu: `Albanexa`
- [ ] Instagram hesabı açıldı: `@albanexa`, Business tipine çevrildi
- [ ] Instagram ↔ Facebook Sayfası bağlantısı yapıldı
- [ ] Meta Business Manager kuruldu: `business.facebook.com`
- [ ] Facebook Sayfası Business Manager'a eklendi
- [ ] Instagram hesabı Business Manager'a eklendi
- [ ] Meta Piksel oluşturuldu, Piksel ID kaydedildi
- [ ] Piksel ID `.env.local`'a `NEXT_PUBLIC_META_PIXEL_ID=XXXXX` olarak girildi
- [ ] `albanexa.com` alan adı doğrulandı
- [ ] Reklam hesabı oluşturuldu (ödeme yöntemi yok, kampanya yok)
