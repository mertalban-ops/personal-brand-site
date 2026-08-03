# UTM Standardı — Albanexa

Versiyon: 1.0 · Tarih: 2026-08-03

---

## Şema

4 alan var. **Her seferinde yalnızca ilk 2'si zorunlu.** Campaign ve content opsiyoneldir — doldurmak anlamlandırır, doldurmazsak `(not set)` görünür ve bu sorun değil.

| Alan | Zorunlu | Ne anlama gelir | Örnek değerler |
|------|---------|-----------------|----------------|
| `utm_source` | **Evet** | Trafiğin geldiği platform | `instagram`, `linkedin`, `google`, `whatsapp` |
| `utm_medium` | **Evet** | Yerleşim türü | `bio`, `social`, `story`, `reel`, `email` |
| `utm_campaign` | Hayır | Hangi kampanya/tema | `organik`, `stokapp-tanitim`, `hezer-case` |
| `utm_content` | Hayır | Hangi gönderi / CTA varyantı | `carousel-1`, `reel-excel`, `link-sondaki` |

---

## Sabit Değer Listesi

### utm_source
```
instagram
linkedin
google
whatsapp
email
```

### utm_medium
```
bio          → Instagram/LinkedIn profil linki
social       → Genel organik paylaşım
story        → Instagram Story swipe-up
reel         → Reel açıklama linki
email        → E-posta imzası veya kampanyası
paid_social  → Gelecekte reklam başlarsa
```

### utm_campaign (opsiyonel — anlam katıyorsa kullan)
```
organik      → Genel içerik, spesifik kampanya yok
stokapp      → StokApp odaklı içerikler
hezer        → Hezer Auto Service vaka çalışması
web-sitesi   → Web sitesi hizmetini öne çıkaran içerikler
```

---

## Hazır Etiketli URL'ler

### Bio Linki (Instagram ve LinkedIn profili)
```
https://www.albanexa.com/?utm_source=instagram&utm_medium=bio&utm_campaign=organik
```
```
https://www.albanexa.com/?utm_source=linkedin&utm_medium=bio&utm_campaign=organik
```

### Instagram Story Swipe-up
```
https://www.albanexa.com/?utm_source=instagram&utm_medium=story&utm_campaign=organik
```
StokApp hikâyesi için:
```
https://www.albanexa.com/projeler/stockapp?utm_source=instagram&utm_medium=story&utm_campaign=stokapp
```

### Reel Açıklaması (Biyografide link)
```
https://www.albanexa.com/?utm_source=instagram&utm_medium=reel&utm_campaign=organik
```
> Reel açıklamasına tıklanabilir link eklenemez — sadece "Biyografimdeki linke tıkla" yaz, bio linkinin UTM'ini kullan.

### LinkedIn Gönderisi
```
https://www.albanexa.com/?utm_source=linkedin&utm_medium=social&utm_campaign=organik
```

### WhatsApp İmzası
```
https://www.albanexa.com/?utm_source=whatsapp&utm_medium=social
```

### E-posta İmzası
```
https://www.albanexa.com/?utm_source=email&utm_medium=email
```

---

## Kurallar

1. **Değerler küçük harf, Türkçe karakter yok, boşluk yerine tire.**  
   ✓ `stokapp-tanitim` ✗ `StokApp Tanıtım`

2. **Bio linkini değiştirme — sadece campaign güncelle.**  
   Bio linki albanexa.com anasayfasına gider. Özel bir sayfaya göndereceksen story ya da reel için ayrı URL kullan.

3. **Reel'de tıklanabilir link yok.**  
   Açıklamaya "link bio'da" yaz, bio'daki UTM sayılır.

4. **GA4'te kontrol yolu:**  
   Reports → Acquisition → Traffic Acquisition → filtre: `Session source / medium`  
   `instagram / bio` ve `instagram / story` ayrı satırlarda görünmeli.

5. **Campaign'i boş bırakmak mümkün — sorun değil.**  
   Basit paylaşımlarda source + medium yeterli. Karmaşıklaştırma.
