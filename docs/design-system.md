# Tasarım Sistemi

## Renk Paleti (app/globals.css) — "Ice + Petrol" duotone tema (v3)
Açık bölümler buz mavisi tonlu degrade zemin; iki bölüm (Problem→Çözüm, Neden Ben)
`.band-petrol` sınıfıyla koyu petrol kontrast bandı olarak akar.

| Token | Açık bölümler | `.band-petrol` içinde | Rol |
|---|---|---|---|
| `--bg` | `#e8eff6` | `#0e3a52` | Zemin |
| `--ink` | `#0d2540` | `#eef5fa` | Ana metin |
| `--muted` | `#46607d` | `#a7c1d4` | İkincil metin |
| `--accent` | `#0c9d74` | `#2fd6a3` | Yeşil aksan |
| `--blue` | `#3273c4` | `#6aa8e8` | İkincil aksan |
| `--line` | `rgba(13,55,100,.14)` | `rgba(190,220,240,.16)` | Hairline |
| `--card` | `#ffffff` | `rgba(255,255,255,.055)` + blur | Kart yüzeyi |

- Body zemini sabit (fixed) degrade: üstte mint, solda mavi yıkama + buz mavisi taban.
- `.band-petrol` token'ları scope içinde ezer → içindeki componentler otomatik uyum sağlar.

> Sürüm geçmişi: v1 koyu lacivert ("karartıcı" bulundu) → v2 beyaza yakın açık
> ("çok basit" bulundu) → v3 renkli ice zemin + petrol bantları → v4 ton bir kademe
> koyulaştırıldı (`--bg #ccdbe9`) + sürekli scroll 3D geçişler (2026-07-07).

## Tipografi (next/font — latin-ext, Türkçe destekli)
- **Display:** Archivo (500–800) — başlıklar, `.display` sınıfı, -0.035em tracking
- **Body:** Instrument Sans (400–600)
- **Mono:** IBM Plex Mono — `.mono-label` mikro etiketler (bölüm numaraları, kicker)

## Animasyon Dili
- **3D arka sahne:** `SceneBackground` — tüm sayfanın arkasında sabit (fixed) 3D katman:
  perspektifli zemin ızgarası scroll ile akar ve döner, 4 cam panel farklı
  derinliklerde (translateZ −90…−420px) farklı hızlarda süzülüp döner,
  2 renk küresi zıt yönlü parallax yapar. Reduced-motion'da statik sadeleşir;
  mobilde panel sayısı azalır (md/lg breakpoint).
- **Hero:** floating dashboard kartları — sahne duruşta bile ~10° rotateX/rotateY
  eğik durur (3D hissi hemen okunur), fare hareketiyle eğim değişir (spring parallax),
  kademeli giriş (stagger 0.05→0.45s), `cubic-bezier(0.16,1,0.3,1)`
- **Sürekli scroll 3D:** `AnimatedSection` — her bölüm viewport'ta ilerledikçe
  canlı dönüşür: girerken rotateX 11° + y 80px + scale 0.96'dan oturur, çıkarken
  −7°'ye katlanır. Tek seferlik değil, her scroll'da tekrarlanır (useScroll + spring).
- **Kart flip girişi:** `Reveal3D` — hizmet/proje kartları rotateY −22° 3D flip ile
  sırayla (stagger) dizilir.
- **Hero scroll-fold:** aşağı inildikçe kart sahnesi öne devrilir (+28° rotateX),
  metin parallax ile yukarı kayıp solar.
- **Kart tilt:** `FloatingCard` — perspective 700px, max 12° rotate + scale 1.02
- **Süreç timeline:** scroll'a bağlı ilerleme çizgisi (useScroll + useSpring)
- **CTA:** `.btn-shine` parlaması + `.glow-accent`
- **Erişilebilirlik:** `useReducedMotion` + CSS `prefers-reduced-motion` desteği;
  hero 3D kartları mobilde gizli (performans)

## Bölüm Yapısı (app/page.tsx)
Navbar → Hero → About(01) → Services(02) → ProblemsSolutions(03) → Projects(04)
→ Strengths(05) → Process(06) → WhyMe(07) → Testimonial → Contact(08) + Footer

Anchor id'leri: `#top #kimim #hizmetler #cozumler #projeler #uzmanlik #surec #neden #deneyim #iletisim`
