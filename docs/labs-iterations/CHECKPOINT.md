# Albanexa Labs — Hayat Ağacı Görsel İyileştirme Checkpoint

Branch: `feature/labs-hayat-agaci-cinematic` (başlangıç checkpoint: `4a39736`)
Ölçüm: `LABS_URL=http://localhost:3000 LABS_PREV=<önceki> node scripts/labs-compare.mjs <iter-adı>`
Fonksiyonel QA: `LABS_URL=http://localhost:3000 node scripts/labs-visual-verify.mjs` → `public/labs/qa/`
Çıktılar: `docs/labs-iterations/<iter>/` → `compare-*.jpg` (referans | render | fark), `metrics.json`
(ham `render-*.png` dosyaları git dışı, yerelde)

Skor = bölge ağırlıklı (ağaç %30, ada %20, gökyüzü %20, şato/çevre %15, ışık %15) ×
(0.4 SSIM + 0.4 renk histogramı kesişimi + 0.2 Sobel kenar korelasyonu). 0 = alakasız, 1 = birebir.
Referans bir AI video karesi; gerçek zamanlı 3D ile piksel eşleşmesi mümkün değil. Metrik tek başına
sanatsal kaliteyi kanıtlamaz — her turda compare görselleri gözle de incelendi.
Not: 4800ms / 6400ms / 7200ms / 9600ms çekim pozları/zamanları turlar arasında yeniden kalibre edildi;
bu karelerde turlar arası fark kısmen kalibrasyondan gelir.

## Iterasyon günlüğü

| Iter | Değişiklik | Genel | Açılış 0000 | Yakın 4800 | Elma 5600 | Final 9600 | Karar |
|------|-----------|------:|------:|------:|------:|------:|------|
| 00 | Baseline | 0.189 | 0.242 | 0.107 | 0.118 | 0.313 | — |
| 01 | Tone mapping + lineer shader çıkışı, gökyüzü/ay/sis/ışık, iplik şelaleler | 0.196 | 0.322 | 0.111 | 0.115 | 0.232 | tut |
| 02 | Zeytin yaprak paleti, yoğun küçük yapraklar, kanopi kabuğunda ışıklı elmalar | 0.227 | 0.296 | 0.189 | 0.253 | 0.237 | tut |
| 03 | Kendi kümülüs sistemi, kamera kalibrasyonu, koyu yosunlu kaya, 13.6 sn düşüş | 0.247 | 0.312 | 0.187 | 0.254 | 0.362 | tut |
| 04/04b | Karnabahar bulut dokusu, yakın plan pozu | 0.217 | 0.300 | 0.162 | 0.221 | 0.293 | geri al (kök neden 04c'de bulundu) |
| 04c | Final ışık/parçacıklar bulutların altında kalıyordu → renderOrder | 0.261 | 0.302 | 0.158 | 0.218 | 0.522 | tut |
| 05 | Kanopi altı açma, ağaç kalbi ışığı, bokeh | 0.261 | 0.302 | 0.157 | 0.217 | 0.522 | nötr, tut |
| 06 | **Ağaç vazo formu** (dallar 25–35° yükselir, taç yükseldi) | 0.268 | 0.302 | 0.188 | 0.218 | 0.529 | tut |
| 07 | Elma formu (soğan → gerçek elma oranı), ayrık bulut kümeleri | 0.260 | 0.304 | 0.190 | 0.217 | 0.451* | tut |
| 08/09 | Yumuşak lobe dokusu, açık bulut düzlemi, güçlü final | 0.249 | 0.306 | 0.189 | 0.217 | 0.408 | kısmen |
| 10 | Küme başına doku: üst takımada lobe, derin taban yumuşak | 0.264 | 0.306 | 0.189 | 0.217 | 0.482 | tut |
| 11 | Daha derin altın elma, küçük haleler, koyu yaprak emissive | 0.269 | 0.307 | 0.210 | 0.231 | 0.482 | tut |
| 12 | Nötr lavanta bulut gölgeleri (pembe-kahve giderildi) | 0.276 | 0.309 | 0.209 | 0.231 | 0.494 | tut |
| 13 | Bulut düzlemi güneş gradyanı yumuşatıldı (180° şeritler) | **0.276** | 0.309 | 0.210 | 0.230 | 0.497 | **final** |
| 14 | Eski çapraz-quad bulut katmanını kaldırma denemesi | 0.270 | 0.298 | 0.209 | 0.230 | 0.518 | geri al |

\* 9600 karesi düşüşün son ~0.3 sn'sine denk geldiği için zamanlama gürültüsüne duyarlı.

Toplam: baseline 0.189 → final 0.276 (+%46). Açılış +%28, yakın plan +%96, elma yakın +%95, final +%59.

## Kök neden bulguları
1. **Tone mapping yoktu**: EffectComposer lineer HDR'de çalışıyor; zincirde ToneMapping efekti olmadığı için vurgular düz beyaza kırpılıyordu. Özel shader'lar da sRGB rengi lineer buffer'a yazıyordu (çift gamma → soluk sahne). → `ToneMapping(ACES)` + tüm özel shader'larda `pow(col, 2.2)`.
2. **drei `<Clouds>` hiç render olmuyordu** (dokusu üçüncü parti CDN'den; billboard'lar Lambert ile gölgelenemez). → `Cumulus.tsx`.
3. **Şeffaf çizim sırası**: depth yazmayan bulut düzlemi kümülüsleri, kümülüsler de düşüşteki ışık/parçacıkları örtüyordu. → bulut düzlemi depth yazar + discard; kümülüs renderOrder 2; düşüş efektleri 3–4.
4. **Ağaç silüeti**: ana dallar neredeyse yataydı (alçak "masa"). Referans vazo formunda. → dal yükselişi 0.18 → 0.44–0.6.
5. **Ay mavi lekeleri**: 2.55× kontrast + soğuk mare tonu.

## Fonksiyonel doğrulama (iter-13)
- 360° orbit (0/90/180/270/360°), yakın kadraj, kamera sıfırlama: ✓
- Otomatik sinematik tur açılışta başlıyor, akıcı, kamera obje içine girmiyor (4/9/15 sn kareleri): ✓
- Elma düşüş demosu → ışığa dönüşüm → hero'ya dönüş (state sıfırlanıyor): ✓
- Proje navigasyonu (`/labs/carpass`), "Tüm Projeler" çekmecesi, WebGL fallback (`?nowebgl=1`): ✓
- Responsive 1440×900, 1280×720, 390×844 (mobil = quality low): ✓
- FPS: 60 (masaüstü, headless Chromium/Metal ve WebKit). Gerçek mobil cihazda ölçülmedi.
- Konsol hatası: 0. TypeScript: temiz. ESLint: yeni hata yok (8 adet önceden var olan react-hooks uyarısı).
- Production build çalıştırılmadı (dev sunucusu aynı `.next` klasörünü kullanıyor).

## Kalan görsel farklar (öncelik sırasıyla)
1. Yakın planda (4800/5600) render ~+30 parlak; kanopi altı referanstaki gibi altın ışıkla yıkanmıyor, dallar daha az görünür.
2. Bulut denizi: kümülüs tepeleri referanstaki kadar hacimli/derin değil; yüksek tur açılarında eski çapraz-quad bulutların sert kenarları görünüyor (kaldırınca skor düştü — sistemin billboard'a taşınması gerekiyor).
3. Ada alt yüzeyi referanstan daha sığ; şelaleler daha kısa görünüyor.
4. Şatolar referanstaki gibi soluk beyaz-gri değil, sağdaki su kemeri baskın.
5. Elmalarda iç "kristal" yapı (dikey ışık damarları) zayıf.
6. Mobil cihaz FPS ölçümü ve production build doğrulaması.
