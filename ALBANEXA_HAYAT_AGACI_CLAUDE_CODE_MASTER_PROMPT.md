# ALBANEXA LABS — CINEMATIC FLOATING WORLD / TREE OF LIFE
## CLAUDE CODE MASTER IMPLEMENTATION PROMPT

Sen bu görevin yaratıcı yönetmeni, teknik sanatçısı (Technical Artist), kıdemli 3D/WebGL mühendisi, Three.js/React Three Fiber geliştiricisi, sinematik ışıklandırma uzmanı, UI/UX tasarımcısı, performans mühendisi ve QA sorumlususun. **Sadece tavsiye/plan üretme: mevcut proje üzerinde uygulamayı gerçekleştir, test et, ekran görüntüleriyle doğrula, sorunları düzelt ve tamamlanan işi raporla.**

## 0. GÖREV / KISITLAR

Mevcut `albanexa.com` projesinin **Albanexa Labs > Hayat Ağacı** alanını, referans 10 saniyelik videodaki fantastik dünya kalitesine mümkün olduğunca yaklaştıran **gerçek zamanlı, kullanıcı tarafından 360° döndürülebilen, interaktif 3D deneyime** dönüştür.

Referans materyaller proje içinde şu konumlarda bulunacak:
- `reference/current-website.png`: Mevcut sitenin ekran görüntüsü (mevcut tasarımın sorunlu hali)
- `reference/target-video.mp4`: İstenen kalite, dünya, ışık, atmosfer ve sanat yönetimi için ANA REFERANS
- `reference/video-contact-sheet.jpg`: 10 saniyelik videonun sahne özeti
- `reference/frames/*.jpg`: Videodan alınmış anahtar kareler

Dosyalar başka bir klasördeyse keşfet ve yolları düzelt; erişemediğin materyali erişmiş gibi gösterme. Önce videoyu/kareleri gerçekten incele. `ffmpeg` ve görüntü inceleme araçları mevcutsa zaman çizelgesi çıkart. Çalışmayı mevcut repo üzerinde yap. Mevcut navigasyon, yönlendirme, laboratuvar projeleri, SEO, tasarım sistemi, dil yapısı, performans ve çalışan özellikler korunacak. Yeni repo oluşturma, tüm siteyi yeniden tasarlama, çalışan özelliği silme.

**Önemli gerçeklik kuralı:** Videodaki tek kamerayla çekilmiş 2D kareler kendiliğinden tam bir 360° 3D varlık değildir. Eksik arka/yan yüzleri sanat yönünü koruyarak tutarlı biçimde modelle. Sadece video oynatarak, ekran görüntüsünü büyük bir düzleme yapıştırarak, CSS ile görseli döndürerek veya düşük kaliteli primitive ağaca birkaç bloom ekleyerek işi yapılmış sayma.

## 1. ÖNCE REPO'YU VE YETENEKLERİNİ KEŞFET

1. Proje dosyalarını, `package.json`, framework/React-Next sürümlerini, route yapısını, `src/app` veya `pages` düzenini, mevcut Labs deneyimini, 3D bileşenlerini, asset klasörlerini, styling yaklaşımını, `CLAUDE.md` talimatlarını ve git durumunu incele.
2. Çalışan sistemi ve mevcut deneyimin sorunlarını kısa bir **başlangıç envanteri** olarak kaydet. Değişiklik öncesi ekran görüntüsü üret. Mevcut implementasyondaki ağaç modeli, kamera, ışık, geo/material, canvas boyutu ve navbar/overlay problemlerini tespit et.
3. Projeyle uyumlu temel teknolojiyi seç. Eğer React/Next.js kullanılıyorsa öncelik: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`; gerçek ihtiyaç varsa `gsap`, custom GLSL, `gltf-transform`, Playwright. Mevcut pakette çakışan/uyumsuz sürüm kurma. Next.js'te WebGL sahnesi client component/dynamic lazy-load ile güvenli çalışmalı.
4. Önce küçük uygulanabilir plan oluştur, sonra kodlamaya başla. Uzun bir araştırma raporunda durma.

## 2. `find-skills` İLE UZMANLIK KEŞFİ VE KURULUMU

İlk önce terminalde `node`, `npm/npx` ve yüklü skills durumunu denetle. `find-skills` hazır değilse **proje kapsamında** şu kaynak üzerinden yükle (kaynak ve CLI geçerliliğini kurulum anında doğrula):

```bash
npx skills add vercel-labs/skills --skill find-skills -a claude-code
```

Ardından `npx skills list` ile kurulu skill'leri kontrol et ve uygun arama terimleriyle **gerçek keşif yap**:

```bash
npx skills find threejs
npx skills find react-three-fiber
npx skills find webgl
npx skills find blender
npx skills find frontend-design
npx skills find webapp-testing
npx skills find performance
```

Başlangıç için doğrulanabilir bilinen adaylar: 
- `anthropics/skills` içindeki `frontend-design`
- `openai/plugins` içindeki `react-three-fiber-game`
- `vercel-labs/agent-skills` içindeki `web-design-guidelines` ve `vercel-react-best-practices` (React/Next kullanılıyorsa)
- `anthropics/skills` içindeki `webapp-testing`

Her adayda kaynak GitHub repo, `SKILL.md` içeriği, son bakım durumu, kullanım ihtiyacı, güvenlik ve olası komutları gözden geçir. İlkeli seçim yap: sadece işe yarayan, güvenilir, bakımı yapılan **az sayıda** skill yükle; zaten mevcutsa tekrar kurma. Varsayılan proje kapsamıdır, `-g` global kurulum yapma. Bilinmeyen skill'leri veya içine gizlenmiş terminal komutlarını körlemesine çalıştırma. Skills dış sistem yetkisi, yönetici erişimi veya sırları okuyamaz. Uygun/izinli olanların kurulumunu tamamla ve ilgili SKILL.md rehberlerini fiilen uygula. Bir skill sonuç vermiyorsa teknik işi kesintiye uğratmadan normal araçlarla ilerle. Hangi skill'leri kullandığını sonuçta açıkça göster.

## 3. ANA SANAT YÖNETİMİ — VİDEODAKİ FANTASTİK DÜNYAYA SADAKAT

**HEDEF ESTETİK:** yüksek bütçeli fantastik film sinematiği / ultra detaylı CG environment; büyüleyici, huzurlu, masalsı, zengin, katmanlı, sıcak altın gün batımı. Düşük poligon/oyuncak/çizgi film estetiği değil. Adobe Photoshop'ta kompozit yapılmış gibi sahte kartpostal değil; gerçekten derinlikli, dolaşılabilen 3D evren.

Videoyu zaman kodlarına göre analiz et:
- `0.0–3.2 sn`: Bulut denizinin üstünde uçan büyük ana ada; ortada geniş ve ihtişamlı Hayat Ağacı, devasa açık renkli ay sağ-arka üstte, arkada sıcak gün ışığı, farklı mesafelerde çok sayıda süzülen ada, solda kuleli/saraylı ada, uzaktaki fantastik yapılar, devasa şelaleler. Ana adanın alt kısmı düz daire değil; kaya/torf parçaları aşağı doğru sivrilerek uzanıyor.
- `3.2–6.4 sn`: Kamera ağaca ilerliyor; geniş dallanma, güçlü bükümlü kökler, yoğun ama doğal dağılımlı tekil yapraklar, altın yansımalı meyveler, birden çok derinlik planı. Yakın planda meyveler altın kristal/cam elma formunda; yaprak ve küçük sapları belirgin.
- `6.4–9.6 sn`: Parlak elma dalından ayrılıp şelale ve bulutların önünden aşağı doğru düşüyor, yumuşak ışıklı iz ve büyülü parçacıklarla atmosferik bir geçiş oluşturuyor; finalde ışık/parçacık patlaması var. Bu efekt kullanıcı etkileşimine bağlanabilir fakat ağaç deneyimini kesintiye uğratmamalı.

Referansı **görsel gerçeklik için birincil kaynak** kabul et. Screenshot'taki mevcut model referans hedef değil, düzeltilmesi gereken problem. Görsel kıyaslamada siluet, renk sıcaklığı, kameranın yüksekliği, ada yüksekliği, ağacın gövde-kök oranları ve dünya ölçeği dikkate alınacak.

### 3A. Ana ağaç (hero asset)
- Yaşlı, büyük, organik **geniş tepe tacına** sahip Hayat Ağacı; tek pürüzsüz silindir gövde değil. Gövdede birbirini saran masif dallar, büyük köklerin adaya yayılması, yüzeyde kabuk rölyefi, doğal çatlaklar, mikro yosun ve roughness/normal map detayları.
- Taç bir solid yeşil kütle olamaz: dalların aralarından ışık geçmeli; yaprak demetleri çeşitli boyutlarda, tonlarda, yönlerde ve geçirgenlikte olmalı. Yakın mesafede geometriler düz billboard gibi görünmemeli.
- Hafif rüzgârda farklı yön ve frekansta yaprak/dal kıpırtısı. Tutarlı fiziksel ölçek.
- Ağacın silueti, **kökleri ve tüm ana ada** varsayılan masaüstü kamera kadrajında görünmeli. Şu anki ekran görüntüsünde ağacın tepesinin kesilmesi ve metnin adanın altında sıkışması giderilecek.

### 3B. Elmalar
- Videodaki gibi farklı dallarda dengeli dağıtılmış, doğal meyve siluetli ışıktan yapılmış altın/cam elmalar; beyaz-sıcak altın çekirdek, saydam/yarı saydam dış kabuk, kırılma/ışıltı hissi, gerçek sap ve 1–2 yeşil yaprak.
- **Parlayan sarı küre kullanmak yasak**. Emissive materyal + seçici/yumuşak bloom; meyveler beyaz lekeler haline gelmesin, elma şekli korunsun.
- Meyveler uzaktan okunabilir; yakında camın gövde ve ışık detayları görülebilir. Mesafeye göre düşük maliyetli farklı detay seviyeleri kullan.
- Elmaların üzerine hover/touch olunca incelikli halo, hafif hareket ve erişilebilir etiket; tıklanınca kullanıcının mevcut Lab projeleriyle ilişkili anlamlı bir aksiyon (mevcut veriye göre proje kartı, detay paneli veya sayfa bağlantısı). Uydurma proje veya bozuk link oluşturma.
- Bir özel elma için isteğe bağlı sinematik düşüş animasyonu: dalından ayrılma, doğal hareket, aşağı süzülme, yumuşak parçacık izi, kamera takibi ve ışık dalgası; animasyon sonunda kamera/nesne durumu sorunsuz sıfırlanabilir.

### 3C. Ana yüzen ada
- Geniş, asimetrik ama dengeli, doğal kıyı çizgili **gerçek hacimsel** uçan ada; üstte çok katmanlı çim, kökler, taşlar, çiçekler, yosun ve küçük bitkiler.
- Altta aşağı doğru uzanan yüzlerce santimetrelik değil sahne ölçeğine uygun **uzun, girintili çıkıntılı, kırıklı taş kaya oluşumu**, tortu, çıkıntılar, nemli yüzeyler. Düz, pürüzsüz frisbee/oval disk/platform kullanılmayacak.
- Kenarlardan bulutlara düşen birden fazla şelale; su akışı zamana bağlı, katmanlı ve gerçekçi hisli, küçük köpük/zerrecik ve hafif sis. Kamera 360 dönerken şelaleler gerçek 3D hacim ve katmanlarla tutarlı kalmalı. İlk ekranda en az birkaç şelale net görünmeli.
- Dal köklerinin adanın etrafına/kenarlarına sarılarak devam etmesi videodaki özgün detaydır.

### 3D. Çevre ve diğer adalar
- Yakın/orta/uzak derinlikte **6–10 farklı ölçekte ve siluette uçan ada** (performans testine göre dengelenebilir); birkaçında ayrı ağaçlar, küçük kuleler, antik taş mimari, şelale, orman ve ince sis perdesi.
- Solda belirgin uzak şato/kuleli ada, sağda küçük adalar; uzak merkezde ufukla bütünleşen masalsı mimari. Sadece aynı objenin eşit aralıklarla kopyalandığı yapay bir çember olmasın.
- Farklı yükseklik, sürüklenme yönü, genlik ve fazlarda **çok yavaş, doğal süzülme**; hafif dönme. Kullanıcı orbit yaptığında adalar farklı parallax göstererek mekânsal derinliği kanıtlamalı.
- Devasa soluk, dokulu ay sağ-üst uzak perspektifte; sıcak altın ışık sağdan/arkadan; mavi-lavanta/gül alt tonlu pastel bulutlar, hacimsel hisli yumuşak sis ve God rays. Güneş/ay kamera hareketine göre kopuk duran 2D sticker gibi görünmemeli.
- İleri-geri derinlik katmanları, gerçekçi atmosferik perspektif, gölgeler ve hafif düşük kontrastlı uzaktaki objeler.
- Bulut denizi mümkünse instanced volumetric-inspired cloud sistemleriyle; performans limitlerinde uyumlu, uzak arka plan tek başına fotokart değil.

### 3E. Işık ve sinematik post-processing
- PBR materyaller (base color, normal, roughness, gerektiği yerde transmission/clearcoat/emissive), golden-hour key light, ambient/sky fill, doğal penumbra, yumuşak contact shadow/SSAO ancak artefaktsız.
- Yalnızca elmalar ve gerçekten parlak bölgelerde kontrollü bloom. Parlamayı artırıp model eksikliğini maskeleme. Görüntü aşırı sarı, fazla sisli, bulanık, yanmış beyaz veya karanlık olmayacak.
- Renk yönetimini mevcut three.js sürümüne göre doğru kur: sRGB output/tekstür, uygun tone mapping ve post-processing zinciri; double tone mapping veya yanlış gamma olmasın.
- Ton hedefi videodaki sıcak pastel altın, açık lavanta gökyüzü, canlı ama gerçekçi yaprak yeşilleri, kaya grileri ve toprak tonları.

## 4. GERÇEK 360° ETKİLEŞİM — KESİN ŞART

- Kullanıcı **mouse/touch drag** ile ana ada ve ağacın etrafında kesintisiz yatay 360° dolaşabilsin; ön, arka, sağ ve sol yüzlerin tamamı **gerçek geometri** ile tutarlı olsun. OrbitControls veya eşdeğeri; yatay eksende kilit veya sahte dönüş olmayacak.
- Dikey kamera açısında konforlu limitler, ayarlı zoom/dolly, pinch-to-zoom, yumuşak damping, zemine/adaya girmeyi önleyen limitler.
- Canvas üzerinde etkileşim göstergesi: `Sürükle • 360° keşfet` (mobilde uygun dokunma ifadesi); küçük reset-camera butonu; istenirse `Sinematik tur` başlat/durdur. CTA ve navbar ile çakışmasın.
- Idle durumda hafif sinematik camera drift/yavaş orbit olabilir; kullanıcı sürüklediğinde hemen durur, bırakınca kullanıcı istediği açıda kalır. Sürüklemeye karşı savaşan otomatik kamera istemiyorum.
- Kullanıcıyı kontrolsüz şekilde döndürme, hareket hassasiyetini gözet; `prefers-reduced-motion` uyumu, turu/düşüşü atlama ve durdurma seçenekleri.
- Hover/tıkla etkileşimi WebGL raycasting ile; üst DOM katmanı tıklamaları Canvas tarafından engellenmesin.
- Kamera 360° döndüğünde dünya bütünlüğü bozulmayacak: arka ağaç formu, ada altı, dağılmış kökler, çevre adalar, ayın konumu, gökyüzü katmanları ve şelaleler tutarlı.
- Masaüstü mouse+wheel ve mobil touch+pinch kullanımı gerçekte test edilecek.

## 5. SAYFA AÇILIŞI, MARKA VE ARAYÜZ

- Labs sayfası yüklenince **kısa ve zarif (yaklaşık 1–2 sn, hazır oluş durumuna göre uyarlanabilen) girişten sonra doğrudan ağaç deneyimi** açılsın. Uzun splash/intro/cutscene YOK. Bir etkileşim için uzun bekleme YOK. Asset henüz yüklenmediyse gerçek progress göstergesi + erişilebilir fallback.
- Albanexa logosu, renkleri, header menüleri (`Çözümler`, `Projeler`, `Labs`, `Rehber`, `İş Birliği`, `Stüdyo`, TR, CTA) ve mevcut site işlevleri korunacak. Siteyi yeni landing page'e çevirmeyeceksin.
- Navbar ağaç ve ışık üstünde de **okunur** olmalı; doğru kontrast, zarif translucent katman, gerektiğinde gradient/scrim. `Tüm Projeler` butonu doğru çalışmalı.
- `ALBANEXA LABS` ve `Hayat Ağacı` başlığı düzenli hizalansın; ağaç ya da ada başlığın üstüne taşarak metni örtmesin. Çözümü devasa padding ile ekranı boşaltmak olmasın; **kamera framing, UI katmanları, safe-area ve responsive layout** beraber optimize edilsin.
- Yüksek çözünürlüklü 16:9, standart laptop, tablet ve mobil portre düzenlerinde kompozisyon bilinçli yeniden kadrajlansın; ada/merkez obje tamamen görünür, CTA erişilebilir, mobil menü çalışır olsun.
- Etkileşimli öğeler klavye ile kullanılabilsin; dekoratif 3D için erişilebilir kısa bir açıklama ve proje erişimi için alternatif HTML kontrolü olsun.

## 6. ASSET KALİTESİ: GEÇİŞTİRMEYE İZİN YOK

Bu görevin başarısının %70'i kaliteli **3D asset üretimine ve doğru sanat yönetimine** bağlı. Kod düzeyinde procedural sphere/cone/cylinder kümeleriyle ağacı tekrar üretme. Aşağıdaki yolu izle:

1. Repoda önceden var olan Blender/GLB/glTF, HDRI, PBR tekstürleri ve asset pipeline'ını ara; lisansını ve özgün kaynağını belirle. En iyi çalışan varlığı yeniden kullan.
2. Yetkin ve izinli araçlar varsa Blender Python/Geometry Nodes veya gerçek 3D modelleme/export pipeline'ı kullanarak ağaç, kaya altı ada, kökler, küçük adalar ve elmayı **yüksek poligon kaynak asset** olarak üret; web için LOD, instancing ve compression ile optimize et. Shader'ı modellemenin yerine değil destek için kullan.
3. Harici model gerekiyorsa kaynağı, lisansı (ticari kullanım/attribution), kalite ve linkini doğrula; telifsiz sanıp izinsiz asset/tekstür kullanma, ücretli abonelik veya lisans satın alma. Dış model alamıyorsan bunu saklama; eldeki imkanlarla en iyi **gerçek 3D** kaliteyi üret ve hangi şeylerin manuel yüksek kaliteli asset gerektirdiğini dürüstçe raporla.
4. Büyük 3D modelleri `GLB/glTF`, PBR texture, normal maps ve performans için gerektiğinde Draco/Meshopt/KTX2; doğru mipmap ve anisotropy ile entegre et. Asset'leri kamera mesafelerine uygun LOD/instancing ile ölçekle. Otomatik optimizasyon yüzünden silueti ve elma formunu bozma.
5. 3D görsel kaliteyi asla düz CSS/ikon/emoji/SVG şekliyle ikame etme. Video veya görseli arka planda oynatıp “360° 3D” diye sunma.

## 7. MİMARİ / KOD KALİTESİ

Sahneyi düzgün sorumluluklara ayrılmış bileşenlerle tasarla: `TreeOfLifeScene`, `WorldEnvironment`, `HeroFloatingIsland`, `HeroTree`, `GoldenApple`, `SecondaryIslands`, `Waterfalls`, `Atmosphere`, `CinematicLighting`, `CameraRig`, `InteractionLayer`, `QualityController` gibi **örnek** organizasyon; mevcut repo konvansiyonuna uy.

- 3D render state ile DOM/UI state ayrılmalı; gereksiz React render döngüleri, memory leak, kontrolsüz frame update yok.
- Tekrarlı objelerde instancing; geometri/material sharing; mipmaps/culling; dinamik kalite profilinde DPR ve efekt kalitesi adaptasyonu, uygun asset preload; kullanılmayan kaynakların dispose edilmesi.
- Yüksek/orta/düşük kalite profilleri ve WebGL desteklenmediğinde **özenli gerçek screenshot fallback + çalışır proje bağlantıları**. Kalite düşük cihazda sadeleşebilir, ancak “başarılı masaüstü deneyimini” mobile göre bozma.
- Hedef: güçlü masaüstünde akıcı yaklaşık 60fps, uygun mobilde mümkünse 30fps+; gerçek ölçüme dayalı raporla, garanti verme. JS bundle ve asset maliyetini denetle; gereksiz dev bağımlılık ekleme.
- Bir sahne için gereksiz physics engine yükleme; elma düşüşünün animasyonu lightweight olarak da çözülebilir.
- Vercel build, Next SSR hydration, client-only Canvas, dynamic import, strict TypeScript, ESLint ve mevcut SEO/meta/analytics davranışları korunmalı.

## 8. GÖRSEL VE FONKSİYONEL DOĞRULAMA DÖNGÜSÜ

Bu aşama opsiyonel değildir. Sadece `npm run build` geçti diye işi bitirme.

A. `baseline`: Orijinal current-website.png ile mevcut local UI görünümünü karşılaştır, engelleyici sorunların envanterini çıkar.
B. `quality gate`: Geliştirilen deneyimde ana adayı, ağacın tacını, kabuk-kökleri, gerçek şekilli parlak elmaları, yakın/uzak diğer adaları, şelaleleri, ayı ve bulut hacmini tek tek incele.
C. `reference match`: En az 3 karşılaştırma üret:
   1. video 0–3.2s uzak/genel kadraj ↔ yeni varsayılan hero kadrajı;
   2. video 4–6.4s ağaç/elma detayı ↔ yeni yakın kamera;
   3. video 7–9s düşüş atmosferi ↔ yeni elma etkileşimi.
   Aynı bakış açısına makul ölçüde hizala. Görsel farklılıkları listele ve önemli olanları gerçekten düzelt.
D. `360 proof`: Kamera 0°, 90°, 180°, 270°, 360° açılarından screenshot/video üret. Arka yüzlerin boş olmadığına, objelerin sahnede gerçek koordinatlara sahip olduğuna, perspektif ve örtüşmenin doğal olduğuna bak.
E. `responsive`: en az 1440×900, 1280×720, 390×844 boyutlarında tarayıcı/screenshot denetimi yap. İmkan varsa ayrıca Safari/WebKit.
F. `functionality`: mouse/touch drag, zoom/pinch, reset, elma hover/click, navbar, tüm projeler, motion-reduction, WebGL fallback, console errors, broken textures, route navigation testleri.
G. `performance`: mümkünse GPU memory/render stats, draw calls, FPS ve yükleme sürelerini ölç; sorunlu asset/efektleri optimize et.
H. Her test turundan sonra eksikleri düzelt ve tekrar test et. Sorun kalırsa olduğundan iyi göstermeden raporla.

## 9. TAMAMLANMA KRİTERLERİ / KABUL TESTİ

Aşağıdaki tüm maddeler test edilebilir olmalı:

- [ ] Site Labs açılışında kısa giriş sonrası **gerçek interaktif 3D Hayat Ağacı** gösteriliyor.
- [ ] Ağaç **yoğun fakat seçilebilir yapraklar, gerçek dal-kök-kabuk dokuları** ile sinematik kaliteli.
- [ ] Alt platform **düz yeşil disk değil**, detaylı **sarkıt kayalıklı yüzen ada** ve **akan şelaleler** var.
- [ ] Birkaç gerçek **elma formunda, altın ışıklı, tıklanabilir meyve** var.
- [ ] Dünyada farklı mesafelerde süzülen **yan adalar**, kule/kaleler, hacimli bulut hissi, büyük soluk ay ve altın sunset ışığı var.
- [ ] Mouse ve touch ile 360° her açıdan **gerçek 3D kamera orbit** çalışıyor; 180° arka görünüşü boş değil.
- [ ] Kamera kontrolü, yakınlaşma, reset, isteğe bağlı elma düşüşü/parçacık animasyonu çalışıyor.
- [ ] Albanexa navbar, mevcut menü/route'lar ve proje etkileşimi bozulmadı; başlık gizlenmiyor.
- [ ] Desktop ve mobilde kompozisyon/testler makul; erişilebilir fallback var.
- [ ] En az 3 videoyla karşılaştırmalı kare + 5 orbit açısı alınmış ve görsel farklılıklar giderilmiş.
- [ ] Build/lint/typecheck/test çalıştırıldı; başarısız testler açıkça belirtildi.

## 10. ÇALIŞMA ŞEKLİ VE SON RAPOR

**Uygulama akışı:** keşfet → skills araştır/yükle → gerçek video karelerini analiz et → 3D asset yaklaşımını seç → kaliteli dünya/mesh/texture'ları üret veya entegre et → doğru lighting/rendering → gerçek interaksiyon → Labs entegrasyonu → screenshot karşılaştırmaları → optimizasyon → test → düzeltme.

Önemli kararları kısa paylaş ama benden her aşamada onay istemek yerine güvenli, ücretsiz, geri alınabilir değişikliklerle **uygulamaya devam et**. Para harcama, global yazılım yükleme, canlı deploy, gizli anahtarlara erişim veya yıkıcı/repo dışı değişiklik için onay al. Verilen yetkileri aşma.

İş bitiminde şunları raporla:
1. Değişen dosyalar ve ne işe yaradıkları.
2. Kullanılan skill'ler; bulunup elenenler ve kısa nedenleri.
3. 3D asset kaynağı/lisansı; üretilen GLB ve tekstürler, asset boyutu.
4. Gerçek doğrulama kanıtları: screenshot/video yolları, 360° kanıtı, test çıktıları ve ölçülmüş performans.
5. Referans videoya kıyasla başarılan ve **henüz ulaşılamayan** detaylar.
6. Local preview komutu. Canlıya yayınlama yalnızca ayrıca açık iznimle.

**ÖNCELİK SIRASI:** (1) videoya yakın gerçek 3D asset kalitesi, (2) heyecan verici fantastik dünya/atmosfer, (3) sorunsuz 360° keşif, (4) mevcut Albanexa sistemiyle tam entegrasyon, (5) performans ve erişilebilirlik. Bunların hiçbirini diğerinin eksikliğini saklamak için kullanma. Hemen repo keşfinden başla, uygulayıp doğrula.
