# albanexa.com — KVKK ve İnternet Sitesi Yükümlülükleri Denetimi

- **Denetim tarihi:** 2 Kasım 2026
- **Kapsam:** `01_Projeler/personal-brand-site` (Next.js 16.2.10, Vercel), `main` dalı `e61a1e8` üzerindeki commit edilmemiş değişiklikler
- **Karar (site sahibi, 02.11.2026):** "B — sade sürüm". İletişim formu ve tüm ölçüm/reklam araçları kaldırıldı; iletişim yalnızca e-posta ve WhatsApp ile. Veri sorumlusu: **Mert Alban (gerçek kişi / şahıs)**. Site sahibi ev adresi, TCKN ve VKN yayımlamak istemedi; bu bilgiler eklenmedi.
- **Durum:** Değişiklikler yerelde yapıldı ve test edildi. **Canlıya dağıtılmadı.**
- Bu belge hukuki görüş değildir; "uyumlu" veya "risk yok" sonucu içermez.

---

## 1. Kaynaklar (kontrol tarihi: 02.11.2026)

| Kaynak | Bağlantı | Kullanılan hüküm / içerik |
|---|---|---|
| 6698 sayılı KVKK (güncel metin) | https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6698.pdf | m.4 (ilkeler), m.5 (işleme şartları), m.6 (özel nitelikli veri), m.7 (silme), m.9 (yurt dışı aktarım), m.10 (aydınlatma), m.11 (haklar), m.12 (güvenlik), m.13 (başvuru, 30 gün), m.14 (Kurula şikâyet 30/60 gün). *PDF bu oturumda zaman aşımına uğradı. m.13/m.14 süreleri https://www.kvkk.gov.tr/Icerik/2063/Sikayet-Hakki ve Kurul kararı 2019/9 (https://www.kvkk.gov.tr/Icerik/5358/) üzerinden doğrulandı.* |
| 7499 sayılı Kanun ile KVKK m.6 ve m.9 değişikliği | https://kvkk.gov.tr/SharedFolderServer/CMSFiles/4eba766b-7425-4cd4-97f5-cb09c4cf4ef9.pdf | Değişiklik 01.06.2024'te yürürlüğe girdi. Eski m.9 (açık rıza) geçiş süresi 01.09.2024'te sona erdi. |
| Kişisel Verilerin Yurt Dışına Aktarılmasına İlişkin Usul ve Esaslar Hakkında Yönetmelik (RG 10.07.2024) | https://www.resmigazete.gov.tr/eskiler/2024/07/20240710-2.htm | Uygun güvenceler, standart sözleşme türleri, 5 iş günü bildirim, arızi aktarım |
| KVKK — Yurt Dışına Aktarım Rehberi | https://www.kvkk.gov.tr/Icerik/8142/Kisisel-Verilerin-Yurt-Disina-Aktarilmasi-Rehberi | Sürekli aktarımın arızi istisnaya dayandırılamaması |
| KVKK — Standart sözleşmelerde dikkat edilecek hususlar | https://www.kvkk.gov.tr/Icerik/8170/ | Her iki tarafın da imza tarihi koyması, Türkçe metnin esas alınması, değişiklik yapılmaması |
| KVKK — Standart Sözleşme Bildirim Modülü (Kurul kararı 2024/1793) | https://www.kvkk.gov.tr/Icerik/8043/ | Bildirimin internet üzerinden yapılabilmesi |
| Aydınlatma Yükümlülüğü Tebliği (RG 10.03.2018/30356) | https://www.resmigazete.gov.tr/eskiler/2018/03/20180310-5.htm | Aydınlatmanın içeriği; açık, anlaşılır ve sade dil (m.5) |
| Veri Sorumlusuna Başvuru Usul ve Esasları Tebliği (RG 10.03.2018) | https://www.resmigazete.gov.tr/eskiler/2018/03/20180310.htm | Başvuru kanalları (yazılı, KEP, güvenli e-imza/mobil imza, sistemde kayıtlı e-posta), başvuru içeriği |
| KVKK — Çerez Uygulamaları Hakkında Rehber | https://www.kvkk.gov.tr/SharedFolderServer/CMSFiles/fb193dbb-b159-4221-8a7b-3addc083d33f.pdf | Zorunlu ve zorunlu olmayan çerez ayrımı, opt-in, çerez duvarı |
| Kurul kararı 2022/229 (çerez) | https://www.kvkk.gov.tr/Icerik/7275/2022-229 | Reklam, pazarlama ve performans çerezleri açık rızaya tabi; kategoriler varsayılan olarak kapalı başlamalı |
| Kurul kararı 2022/1358 (çerez aydınlatma/rıza yokluğu) | https://www.kvkk.gov.tr/Icerik/7595/2022-1358 | Aydınlatma ve rıza sunulmadan zorunlu olmayan çerez kullanılması nedeniyle idari para cezası |
| VERBİS istisna kriterleri | https://www.kvkk.gov.tr/Icerik/2044/ ; https://www.kvkk.gov.tr/Icerik/7646/ | Kurul kararı 2023/1154: yıllık çalışan sayısı < 50 **ve** yıllık mali bilanço < 100 milyon TL olan ve ana faaliyeti özel nitelikli veri işleme olmayan veri sorumluları sicile kayıttan muaf |
| 6563 sayılı E-Ticaret Kanunu | https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6563.pdf | m.3 (hizmet sağlayıcının tanıtıcı bilgileri), m.6 (ticari elektronik ileti için önceden onay) |
| Ticari İletişim ve Ticari Elektronik İletiler Yönetmeliği (RG 15.07.2015) | https://www.resmigazete.gov.tr/eskiler/2015/07/20150715-4.htm | Onay, ret hakkı, İYS |
| Vercel Web Analytics gizlilik belgesi | https://vercel.com/docs/analytics/privacy-policy | Çerez kullanmıyor. İstekten üretilen ve günlük sıfırlanan karma kullanıyor. Oturum verisi 24 saat tutuluyor. |
| Vercel Privacy Notice | https://vercel.com/legal/privacy-notice | IP adresinden şehir/ülke çıkarımı. Bu belge eski (2021) politikayla çelişiyor; güncel olan esas alındı. |
| Vercel Functions bölgeleri | https://vercel.com/docs/functions/configuring-functions/region | Yeni projelerde varsayılan bölge iad1 (Washington D.C.) |

**Ayrım:** 2022 tarihli çerez kararları, 7499 sayılı Kanun'dan önceki döneme aittir. Bu kararlar çerezlerde rıza yaklaşımı için hâlâ yol gösterici. Yurt dışı aktarım ise **01.06.2024 sonrası** m.9 rejimine göre değerlendirildi. Eski "açık rıza ile yurt dışı aktarım" yaklaşımı esas alınmadı.

---

## 2. Gerçek veri akışı

> Canlı sitedeki hukuki sayfalar dağıtım öncesinde kaynak kodla aynıydı. Eski metinde "izleme çerezi kullanılmaz" ve "Vercel Analytics anonim" yazıyordu; bu ifadeler teknik gerçeklikle çelişiyordu. GA4 onaysız yükleniyordu.

### 2.1 Değişiklikten önce

| Akış | Veri | Alıcı | Sorun |
|---|---|---|---|
| İletişim formu → Telegram | Ad, e-posta, telefon, firma, bütçe, serbest metin **+ IP'den konum/İSS/saat dilimi, cihaz, tarayıcı, işletim sistemi, referrer, dil** | Telegram | Tüm içerik ve profil sohbet geçmişinde birikiyordu |
| IP → ip-api.com | IP | ip-api.com, **şifresiz HTTP** | Gerekçesiz zenginleştirme |
| Form → n8n (env tanımlıysa) | Tüm form + konum | n8n Cloud → Google Sheets, Telegram, otomatik e-posta | Ek kopyalar. Production env doğrulanamadı (Vercel 403). |
| Pazarlama onay kutusu | Onay | **Hiçbir yere kaydedilmiyordu** | İzin kanıtlanamıyordu; İYS yoktu |
| GA4 | Çerez kimliği, sayfa, IP/konum | Google | Onaysız yükleniyordu |
| Vercel Web Analytics | İstek karması, olaylar | Vercel | "Anonim" deniyordu |
| Meta Pixel | `_fbp`, olaylar | Meta | Ret seçeneği eşit değildi; geri alma yoktu |
| Spline sahnesi | IP, UA | prod.spline.design | Otomatik üçüncü taraf isteği |

### 2.2 Değişiklikten sonra (B sürümü)

| Akış | Veri | Amaç | Alıcı | Saklama | Hukuki sebep | Doğrulanmamış |
|---|---|---|---|---|---|---|
| Site ziyareti | IP, UA, yol, zaman (sunucu kaydı) | Siteyi sunmak, güvenlik | Vercel (ABD) | Vercel plan ayarı | m.5/2-f | Fonksiyon bölgesi, log süresi |
| E-posta ile yazışma | Ziyaretçinin paylaştığı bilgiler | Yanıt, teklif, hizmet | Google Workspace | İşe dönüşürse kanuni süreler; dönüşmezse amaç bitince silme (somut süre belirlenmedi) | m.5/2-c; diğer sorularda m.5/2-f | Workspace veri bölgesi |
| WhatsApp ile yazışma | Aynı | Aynı | WhatsApp (Meta) | Aynı | Aynı | — |
| Dil tercihi | `albanexa-lang` (localStorage) | Dil hatırlama | Cihazdan çıkmaz | Kullanıcı silene kadar | İşlevsel | — |

Sitede **çerez yok, form yok, analitik yok, reklam pikseli yok, otomatik üçüncü taraf isteği yok** (yazı tipleri ve 3B sahne site içinden yükleniyor). Bu nedenle çerez onay penceresi kaldırıldı; gizlilik sayfasında depolama envanteri gösteriliyor.

---

## 3. Bulgular ve durum

**Anahtar:** ✅ giderildi · 🟡 kısmen giderildi · 📄 bilgi/belge bekliyor · ⚪ kapsam dışı

| # | Bulgu | Durum | Kanıt | Kalan işlem |
|---|---|---|---|---|
| 1 | GA4 onaysız yükleniyordu | ✅ | Kaldırıldı; test: istek yok, GA kimliği HTML'de ve build çıktısında yok | — |
| 2 | Vercel Analytics koşulsuz ve "anonim" denmişti | ✅ | Paket kaldırıldı; test: `/_vercel/insights` isteği yok | Vercel panelinde Web Analytics'i kapatın |
| 3 | Meta Pixel ve eşit olmayan çerez penceresi | ✅ | Pixel ve pencere kaldırıldı; izin gerektiren bir şey kalmadı | — |
| 4 | "İzleme çerezi kullanılmaz" ifadesi yanlıştı | ✅ | Artık doğru: test, çerez olmadığını doğruluyor | — |
| 5 | ip-api.com ile IP → konum/İSS | ✅ | Kod kaldırıldı; build çıktısında yok | Geçmişteki sorgular geri alınamaz |
| 6 | UA/referrer/dil profili | ✅ | Form ve sunucu fonksiyonu kaldırıldı | — |
| 7 | Telegram'a tam form içeriği | ✅ | Kaldırıldı; build çıktısında `api.telegram.org` yok. `TELEGRAM_*` değişkenleri 02.11.2026'da Vercel'den silindi. | Eski sohbet geçmişi (§5); bot token'ı BotFather'dan iptal edilmeli |
| 8 | n8n webhook kopyası | ✅ | Kod kaldırıldı. Vercel'de `N8N_WEBHOOK_URL` hiç tanımlı değildi, yani production'da bu yol çalışmıyordu. n8n Cloud adresi (`mertalb.app.n8n.cloud`) tüm uç noktalarda 404 döndürüyor (02.11.2026). | Başka bir n8n hesabı varsa workflow 03 orada kontrol edilmeli |
| 9 | Pazarlama onayı kaydedilmiyordu; İYS yoktu | ✅ | Kutu kaldırıldı. Aydınlatmada "ticari ileti gönderilmez; teklif istemek izin sayılmaz" yazıyor | Bülten gönderilecekse §6/5 |
| 10 | Rızaya dönük "okudum, onaylıyorum" kalıbı | ✅ | Form yok; aydınlatma "bir onay metni değildir" diyor | — |
| 11 | Özel nitelikli veri uyarısı | ✅ | İletişim sayfasında ve aydınlatmada var (test) | — |
| 12 | Veri sorumlusu olarak marka adı kullanılıyordu | ✅ | "Mert Alban (gerçek kişi)"; marka ayrı belirtiliyor (test) | — |
| 13 | Yazılı başvuru için posta adresi | 🟡📄 | Sitede "adres e-posta ile talep edilmesi hâlinde bildirilir" yazıyor; e-posta başvuru kanalı Tebliğ'e uygun | **KEP adresi edinilmesi önerilir** (§6/2). Ev adresi yayımlanmadı. |
| 14 | 6563 m.3 tanıtıcı bilgiler (ad, adres, iletişim) | 🟡📄 | Ad ve iletişim var; adres yok | Sitede online sözleşme kurulmadığından kapsamın netleşmesi ve gerekiyorsa KEP/işyeri adresi (§6/2) |
| 15 | Yurt dışı aktarım için "DPA yeterli" yaklaşımı | 🟡📄 | Metin düzeltildi; Vercel, Google ve WhatsApp için "güvence tamamlanmadı" yazıyor | §6/1 |
| 16 | Gerekçesiz saklama süreleri (2 yıl / 12 ay) | 🟡 | Kaldırıldı; "amaç bitince silme" ilkesi yazıldı | Somut süre belirlenmesi önerilir (§6/3) |
| 17 | Başvuru usulü eksikti | ✅ | Kanallar, Tebliğ içeriği, kimlik fotokopisi istenmemesi, 30 gün, m.14 şikâyet süreleri | — |
| 18 | Yorumlarda gerçek ad ve "Doğrulanmış Müşteri" rozeti | 🟡 | Hezer: site sahibi yayın izni olduğunu beyan etti, adlar geri yüklendi. Aden Ticaret (S. İ.): izin beyanı yok, anonim kaldı. Rozet "Müşteri geri bildirimi" yapıldı. | Hezer izninin yazılı bir kopyası (e-posta) saklanmalı. Aden Ticaret adı yalnızca izin alınırsa geri konmalı. |
| 19 | Spline üçüncü taraf isteği | ✅ | `public/spline/hero-robot.splinecode`; test: yerelden yükleniyor | — |
| 20 | Kullanım koşullarında dinamik tarih ve "her şey Albanexa'ya ait" ifadesi | ✅ | Sabit tarih; site sahibi bölümü eklendi | — |
| 21 | Hukuki metinler yalnızca Türkçe | 🟡 | İletişim sayfası EN/DE'de bağlantının Türkçe metne gittiğini belirtiyor; 3 dilde mobil testi geçti | İsteğe bağlı çeviri |
| 22 | VERBİS | 📄 | — | §6/6 |
| 23 | Ödeme ve online sözleşme | ⚪ | Yok | Eklenirse yeniden değerlendirme |
| 24 | `npm audit` açıkları, 138 eski lint hatası, 5 eski başarısız E2E testi | ⚪ | HEAD'de de aynı (worktree ile doğrulandı) | Ayrı iş |
| 25 | CSP başlığı yok | ⚪ | Diğer güvenlik başlıkları var | Öneri |

### Meşru menfaat (m.5/2-f) değerlendirmesi — iç kayıt

| İşlem | Menfaat | Gereklilik | Denge |
|---|---|---|---|
| Barındırma sunucu kayıtları | Siteyi sunmak, saldırı tespiti | Sağlayıcı tarafında kaçınılmaz | Ziyaretçinin makul beklentisi içinde; profil çıkarılmıyor. Süre ve erişim Vercel ayarına bağlı → koşullu |
| Hizmet dışı sorulara yanıt | Gelen soruyu yanıtlamak | Yanıt için iletişim bilgisi şart | Yazışmayı ziyaretçi başlatıyor; pazarlama yok → ağır basıyor |
| **Eski** konum, İSS ve cihaz profili | "Ziyaretçi zekâsı" | Gerekmiyor | Ziyaretçi beklemiyordu → **ağır basmıyor; kaldırıldı** |

---

## 4. Değişen dosyalar

- **Kaldırıldı:**
  - Form: `app/actions/contact.ts`, `components/contact/ContactForm.tsx`
  - Takip ve onay: `components/CookieConsent.tsx`, `components/MetaPixel.tsx`, `lib/meta-events.ts`
  - Paketler: `@vercel/analytics`, `@next/third-parties`
- **Takip çağrıları silindi:** `track()` ve `fbq` çağrıları şu dosyalardan çıkarıldı: `InstagramClient`, `OrneklerClient`, `OrnekDetailClient`, `OtoServisClient`, `ProjectDetailClient`, `TeklifClient`, `CtaStrip`, `FloatingWhatsApp`, `FinalCTA`.
- **İletişim sayfası:** `app/iletisim/*` artık form yerine "nasıl yazmalı" rehberi, e-posta ve WhatsApp butonları ve özel nitelikli veri uyarısı gösteriyor. `app/izmir-yazilim-gelistirme/page.tsx` içindeki SSS cevabı güncellendi.
- **Hukuki sayfalar:**
  - Yeni: `data/legal.ts`, `components/legal/ControllerInfo.tsx`
  - Yeniden yazıldı: `app/kvkk-aydinlatma`, `app/gizlilik`, `app/kullanim-kosullari`
- **Yorumlar:** `components/Testimonials.tsx`, `data/projects.ts`, `data/oto-servis.ts` içinde kişi adları anonimleştirildi.
- **3B sahne:** `components/Hero.tsx`, `public/spline/hero-robot.splinecode` (sahne site içinden yükleniyor).
- **Yapılandırma:** `app/layout.tsx`, `components/Footer.tsx`, `.env.example`, `.gitignore`, `package.json`.
- **Testler:**
  - Yeni: `playwright.privacy.config.ts`, `tests/privacy/kvkk.spec.ts`
  - Güncellendi: `tests/solvaria.spec.ts` (form testi "form kaldırıldı" gerekçesiyle atlanıyor)

---

## 5. Mevcut verilerin temizlenmesi — DRY-RUN (hiçbir şey silinmedi)

| Yer | Ne var | Önerilen işlem |
|---|---|---|
| Telegram bot sohbeti | Eski form gönderimleri + konum, İSS, cihaz | Gerekli talepleri e-postaya aktarın, sonra sohbeti uygulamadan silin (Bot API geçmişi listeleyemez) |
| n8n Cloud | Workflow 03 execution kayıtları | Workflow'u kapatın, execution geçmişini temizleyin |
| Google Sheets (workflow 03) | Lead satırları + konum, İSS | Konum, İSS ve cihaz sütunlarını ve süresi geçen satırları silin |
| Vercel | Ortam değişkenleri | ✅ 02.11.2026'da silindi: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_META_PIXEL_ID` (production + preview). Projede değişken kalmadı. Silme yalnızca yeni dağıtımlara uygulanır. |
| Meta Business / Google Analytics | Geçmiş ölçüm verisi | İsterseniz mülkleri silin veya veri saklama süresini kısaltın |
| Yerel `.env.local` | Eski Telegram ve Pixel anahtarları | Artık kullanılmıyor; isterseniz silin. Telegram bot token'ını BotFather'dan iptal edin. |

---

## 6. Kodla çözülemeyen konular

1. **Yurt dışı aktarım (m.9):** Vercel (barındırma), Google Workspace (e-posta) ve WhatsApp sürekli aktarım sayılır.
   - Bu aktarımlar arızi istisnaya veya genel bir açık rızaya dayandırılamaz.
   - Seçenek 1: Sağlayıcıyla Kurul'un Türkçe standart sözleşmesini imzalamak ve imzadan sonra **5 iş günü** içinde Kurum'a bildirmek.
   - Seçenek 2: Türkiye'de barındırma ve e-posta hizmetine geçmek.
   - Sağlayıcıların AB'ye yönelik GDPR SCC ve DPA'ları Türkiye için otomatik olarak yeterli sayılmaz.
2. **Adres ve KEP:** Ev adresi yayımlamamak için KEP adresi (PTT KEP vb.) veya işyeri/sanal ofis adresi önerilir. Bu adres hem yazılı KVKK başvurusu hem de 6563 m.3 tanıtıcı bilgi için kullanılabilir. Adres `data/legal.ts` içindeki `kepAddress` veya `address` alanına yazıldığında sayfalarda kendiliğinden görünür.
3. **Saklama süresi:** İşe dönüşmeyen yazışmalar için somut bir süre belirlenmesi önerilir. Ticari kayıt süreleri mali müşavirle teyit edilmeli.
4. **Müşteri içerikleri:** Hezer için izin var (site sahibinin beyanı); yazılı kopyası saklanmalı. Aden Ticaret için izin alınmadıkça yorum anonim kalmalı.
5. **Ticari elektronik ileti:** Şu an gönderilmiyor. Gönderilecekse ayrı onay, İYS kaydı ve ret bağlantısı gerekir.
6. **VERBİS:** Şahıs işletmesinin yıllık çalışan sayısı ve mali bilanço toplamı bilinmeden muafiyet varsayılmadı. 2023/1154 eşikleri: <50 çalışan ve <100 milyon TL. Mali müşavirle teyit edin.
7. **Vercel ayarları:** Fonksiyon bölgesi (varsayılan iad1, ABD) ve log saklama süresi panelden kontrol edilmeli.

---

## 7. Test sonuçları (02.11.2026, yerel)

| Kontrol | Sonuç |
|---|---|
| `npx tsc --noEmit` | ✅ |
| ESLint, değiştirilen dosyalar | ✅ yeni hata yok. Projede değişiklik öncesinden 138 hata var; bunlardan 2'si `izmir-yazilim-gelistirme` sayfasında, dokunulmayan satırlarda. |
| `next build` | ✅ |
| `playwright -c playwright.privacy.config.ts` | ✅ **9/9** |
| — 7 sayfada (`/`, `/iletisim`, `/projeler`, `/oto-servis-web-sitesi`, `/teklif`, `/instagram`, `/gizlilik`) GA, Meta, Vercel Insights, ip-api, Telegram, Spline ve Google Fonts isteği yok; çerez yok | ✅ |
| — Çerez penceresi yok; localStorage'da yalnızca `albanexa-lang` var | ✅ |
| — İletişim sayfasında form veya giriş alanı yok; e-posta, WhatsApp, aydınlatma bağlantısı ve özel veri uyarısı var | ✅ |
| — Build çıktısında ip-api, Telegram, n8n, GA kimliği, fbevents ve Vercel Insights yok | ✅ |
| — Hukuki sayfalar 375px'te TR/EN/DE'de 200 dönüyor, yatay kaydırma yok, footer bağlantıları mevcut | ✅ |
| — Veri sorumlusu adı görünüyor; TCKN veya VKN yayımlanmıyor | ✅ |
| `tests/solvaria.spec.ts` | 16 geçti, 1 atlandı (form kaldırıldı), 5 başarısız. Aynı 5 test değişiklik öncesi HEAD'de de başarısız. |

**Test edilmeyenler:** Vercel production ortam değişkenleri ve ayarları; n8n, Sheets ve Telegram'daki eski veriler.

## 8. Yayına hazırlık

Kod tarafı dağıtıma hazır. Mevcut canlı sürüme göre risk belirgin biçimde azalıyor: onaysız takip, profil çıkarma ve verinin Telegram/n8n'e kopyalanması sona eriyor.

Açık kalanlar:
- ⚠️ Yurt dışı aktarım güvenceleri: Vercel, Google ve WhatsApp (§6/1). Sayfalarda açıkça "tamamlanmadı" yazıyor.
- ⚠️ KEP veya işyeri adresi önerisi (§6/2).
- ⚠️ Eski Telegram sohbet geçmişi ve bot token'ının iptali (§5).
- ⚠️ **Uyarı:** Yeni kod commit edilmedi. Bu süre içinde eski kod yeniden dağıtılırsa, Telegram değişkenleri silindiği için eski form talepleri sessizce kaybolur. Bu yüzden bir sonraki dağıtım yeni sürüm olmalı.

Otomatik dağıtım yapılmadı; dağıtım kararı site sahibine ait.
