// /egitimler sayfasının verisi. Kaynak: Albanexa_Icerik_Motoru/01_ARASTIRMA/egitim_kaynaklari.md
// Bilgiler resmi BTK Akademi sayfalarından okunmuştur. Bir eğitim tamamlandığında
// durum "tamamlandi" yapılır ve tamamlanmaTarihi eklenir; tamamlanmamış eğitim "tamamlandı" gösterilmez.

export type Egitim = {
  slug: string;
  ad: string;
  konu: string;
  sure: string;
  seviye: "Temel" | "Orta" | "İleri" | "Genel";
  kime: string;
  url: string;
  durum: "aliyorum" | "tamamlandi";
  tamamlanmaTarihi?: string;
};

export const EGITIM_SON_KONTROL = "2026-11-07";
export const BTK_UCRETSIZ_DUYURU = "https://www.btkakademi.gov.tr/portal/news/btk-akademi-deki-tum-egitimler-ucretsizdir-5000";

export const egitimler: Egitim[] = [
  { slug: "excel-pivot", ad: "Excel Pivot Tablolarla Veri Analizi", konu: "Excel / veri analizi", sure: "4 sa 17 dk", seviye: "Orta", kime: "Satış ve stok raporunu her hafta elle toplayan çalışan ya da işletme sahibi", url: "https://www.btkakademi.gov.tr/portal/course/excel-pivot-tablolarla-veri-analizi-45651", durum: "aliyorum" },
  { slug: "excel-dashboard", ad: "Excel'de Dashboard ve İleri Fonksiyonlar", konu: "Excel dashboard", sure: "3 sa 36 dk", seviye: "İleri", kime: "Yöneticisine düzenli rapor hazırlayan ekip", url: "https://www.btkakademi.gov.tr/portal/course/excel-de-dashboard-ve-ileri-fonksiyonlar-18800", durum: "aliyorum" },
  { slug: "veri-bilimi", ad: "Veri Bilimine Giriş", konu: "Veri analizi", sure: "8 sa 19 dk", seviye: "Temel", kime: "Kararlarını veriyle vermek isteyen işletme sahibi", url: "https://www.btkakademi.gov.tr/portal/course/veri-bilimine-giris-35390", durum: "aliyorum" },
  { slug: "uretken-yapay-zeka", ad: "Üretken Yapay Zekâya Giriş", konu: "Yapay zekâ araçları", sure: "5 sa 40 dk", seviye: "Temel", kime: "Yapay zekâya sıfırdan başlayan herkes", url: "https://www.btkakademi.gov.tr/portal/course/uretken-yapay-zekaya-giris-45762", durum: "aliyorum" },
  { slug: "guncel-yapay-zeka", ad: "Güncel Yapay Zekâ Uygulamaları", konu: "Yapay zekâ iş dünyasında", sure: "28 sa 06 dk", seviye: "Temel", kime: "Yapay zekâyı pazarlama ve tedarik süreçlerinde kullanmak isteyen işletme", url: "https://www.btkakademi.gov.tr/portal/course/guncel-yapay-zeka-uygulamalari-59427", durum: "aliyorum" },
  { slug: "rpa", ad: "Turkcell Robotik Süreç Otomasyonu (RPA)", konu: "Otomasyon / no-code", sure: "3 sa 07 dk", seviye: "Temel", kime: "Tekrarlayan ofis işi çok olan ekip", url: "https://www.btkakademi.gov.tr/portal/course/turkcell-robotik-surec-otomasyonu-rpa-23946", durum: "aliyorum" },
  { slug: "kalite-guvence", ad: "Kalite Güvence ve Sertifikasyon", konu: "Kalite / ISO", sure: "1 sa 11 dk", seviye: "Temel", kime: "Kalite yönetim sistemine hazırlanan işletme (örnekler savunma sanayiinden)", url: "https://www.btkakademi.gov.tr/portal/course/kalite-guvence-ve-sertifikasyon-45615", durum: "aliyorum" },
  { slug: "sosyal-medya-yapay-zeka", ad: "Sosyal Medyada Yapay Zekâ ile Dijital Pazarlama", konu: "Dijital pazarlama", sure: "1 sa 56 dk", seviye: "Temel", kime: "Sosyal medyasını kendi yöneten işletme sahibi", url: "https://www.btkakademi.gov.tr/portal/course/sosyal-medyada-yapay-zeka-ile-dijital-pazarlama-61567", durum: "aliyorum" },
  { slug: "yapay-zeka-uygulama", ad: "Yapay Zekâ ile Web ve Mobil Uygulama Geliştirme", konu: "Yazılıma giriş", sure: "2 sa 25 dk", seviye: "Temel", kime: "Uygulama fikrini prototiplemek isteyen girişimci", url: "https://www.btkakademi.gov.tr/portal/course/yapay-zeka-ile-web-ve-mobil-uygulama-gelistirme-67576", durum: "aliyorum" },
  { slug: "musteriyi-tanimak", ad: "Müşteriyi Tanımak", konu: "Müşteri deneyimi", sure: "17 dk", seviye: "Genel", kime: "Ön büro, satış ve çağrı ekibi; özellikle işe yeni başlayanlar", url: "https://www.btkakademi.gov.tr/portal/course/musteriyi-tanimak-28601", durum: "aliyorum" },
];

export const baslangicOnerileri = [
  { durum: "İlk kez başlıyorsan", yol: ["musteriyi-tanimak", "uretken-yapay-zeka"] },
  { durum: "Raporla boğuşuyorsan", yol: ["excel-pivot", "excel-dashboard"] },
  { durum: "Tekrar eden ofis işin çoksa", yol: ["rpa", "guncel-yapay-zeka"] },
  { durum: "Kalite sistemine hazırlanıyorsan", yol: ["kalite-guvence"] },
];
