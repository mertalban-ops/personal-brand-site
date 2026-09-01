// Oto servis sektör sayfası — tek doğruluk kaynağı.
// Fiyatlar WhatsApp'tan gönderilen teklif PDF'i ile BİREBİR aynı olmalıdır.
// Bir fiyat değişirse: sadece burayı güncelle; landing sayfası, JSON-LD Offer
// ve /teklif indirme dosyası aynı kaynağı kullanır.

export type OtoServisPackage = {
  id: "vitrin" | "servis" | "buyume";
  name: string;
  price: number; // TL, KDV hariç
  priceLabel: string; // "7.900 TL"
  tagline: string;
  highlight?: boolean; // en çok tercih edilen
  deliveryDays: string; // "yaklaşık 5 iş günü"
  revisions: string; // "1 revizyon turu"
  includes: string[];
};

export const CURRENCY = "TRY";

export const packages: OtoServisPackage[] = [
  {
    id: "vitrin",
    name: "Vitrin",
    price: 7900,
    priceLabel: "7.900 TL",
    tagline: "Tek sayfalık, sade ve hızlı. İşini Google'da göstermek isteyen servisler için.",
    deliveryDays: "yaklaşık 5 iş günü",
    revisions: "1 revizyon turu",
    includes: [
      "Tek sayfalık web sitesi",
      "İşletme adı, hizmetler ve kısa tanıtım",
      "Telefon ve WhatsApp butonu",
      "Adres ve harita",
      "Çalışma saatleri",
      "Telefonda hızlı açılan yapı",
    ],
  },
  {
    id: "servis",
    name: "Servis",
    price: 12900,
    priceLabel: "12.900 TL",
    tagline: "Çok bölümlü site. Hizmetlerini ve işini ayrıntılı anlatmak isteyen servisler için.",
    highlight: true,
    deliveryDays: "yaklaşık 10 iş günü",
    revisions: "2 revizyon turu",
    includes: [
      "Vitrin paketindeki her şey",
      "Ayrı hizmet bölümleri (kaporta, boya, mekanik vb.)",
      "Fotoğraf galerisi",
      "Müşteri yorumları alanı",
      "Sık sorulan sorular bölümü",
      "Google Haritalar bağlantısı",
    ],
  },
  {
    id: "buyume",
    name: "Büyüme",
    price: 24900,
    priceLabel: "24.900 TL",
    tagline: "Daha geniş site. Birden çok hizmet sayfası ve yazı bölümü isteyen servisler için.",
    deliveryDays: "yaklaşık 15 iş günü",
    revisions: "3 revizyon turu",
    includes: [
      "Servis paketindeki her şey",
      "Birden çok hizmet sayfası",
      "Yazı / haber bölümü (istersen düzenli içerik)",
      "İletişim formu",
      "Google'da bulunabilmen için teknik hazırlık",
      "Teslimden sonra kısa kullanım anlatımı",
    ],
  },
];

export const maintenance = {
  priceLabel: "900 TL/ay",
  price: 900,
  desc: "İçerik güncelleme, küçük değişiklikler, teknik bakım ve yedekleme. İstemezsen zorunlu değildir.",
};

// Fiyata dahil OLMAYANLAR
export const exclusions: string[] = [
  "Logo tasarımı",
  "Fotoğraf çekimi",
  "Reklam yönetimi (Google/Instagram reklamları)",
  "Google işletme kaydı açma/onaylatma işlemleri",
  "Muhasebe ve e-fatura sistemleri",
];

// Sitesi olmayan bir servisin kaybettiği üç şey
export const losses: { title: string; text: string }[] = [
  {
    title: "Yeni müşteri",
    text: "İnsanlar bugün servisi önce Google'da arıyor. Sayfan yoksa, seni bulamayan müşteri komşu servise gidiyor.",
  },
  {
    title: "Güven",
    text: "Adını arayan biri karşısında düzgün bir sayfa görürse sana güveniyor. Hiçbir şey çıkmazsa şüpheyle yaklaşıyor.",
  },
  {
    title: "Zaman",
    text: "Adres, çalışma saati, hangi işleri yaptığın… Aynı soruları telefonda tekrar tekrar anlatmak yerine tek sayfada gösterirsin.",
  },
];

// Üç adımlı süreç
export const steps: { step: string; title: string; text: string }[] = [
  {
    step: "1",
    title: "Örnek sayfa",
    text: "Önce senin için örnek bir sayfa hazırlıyoruz. Ödeme yok. Beğenirsen devam ediyoruz.",
  },
  {
    step: "2",
    title: "İçerik ve onay",
    text: "Hizmetlerini, fotoğraflarını ve iletişim bilgilerini yerleştiriyoruz. Sen kontrol edip onaylıyorsun.",
  },
  {
    step: "3",
    title: "Yayın",
    text: "Site yayına giriyor. Google'da ve telefonda paylaşabileceğin kendi adresin oluyor.",
  },
];

// Sektöre özel SSS (en az 6)
export const faqs: { q: string; a: string }[] = [
  {
    q: "Fiyata ne dahil?",
    a: "Seçtiğin pakete göre değişir. Vitrin pakedinde tek sayfalık site, iletişim ve harita var. Servis ve Büyüme pakedinde ayrıca hizmet bölümleri, galeri ve yorumlar gibi ek bölümler bulunuyor. Her paketin içinde ne olduğunu yukarıdaki listede tek tek yazdık.",
  },
  {
    q: "Ne kadar sürede hazır olur?",
    a: "Vitrin paketi yaklaşık 5 iş günü, Servis paketi yaklaşık 10 iş günü, Büyüme paketi yaklaşık 15 iş günü içinde teslim edilir. Süre, içerik ve fotoğrafları ne kadar hızlı ilettiğine göre kısalabilir.",
  },
  {
    q: "Sonradan değişiklik yapabilir miyim?",
    a: "Evet. Her pakette belirli sayıda ücretsiz revizyon (düzeltme) turu var. Yayından sonraki güncellemeler için aylık 900 TL bakım hizmeti alabilirsin; bu zorunlu değildir.",
  },
  {
    q: "Site benim mi olacak?",
    a: "Evet, site senin işletmene aittir. İçeriği ve alan adı seni temsil eder. Başka bir yere taşımak istersen engel yok.",
  },
  {
    q: "Fotoğrafım yoksa ne olur?",
    a: "Sorun değil. Telefonla çektiğin fotoğraflar çoğu zaman yeterli olur. Hiç fotoğraf yoksa sade ve düzgün görünen bir yapı ile başlarız, sonra dilediğinde ekleriz. Profesyonel fotoğraf çekimi fiyata dahil değildir.",
  },
  {
    q: "Beğenmezsem iptal edebilir miyim?",
    a: "İlk adımda ödeme almadan örnek bir sayfa hazırlıyoruz. Beğenmezsen devam etmek zorunda değilsin. Böylece riski en baştan ortadan kaldırıyoruz.",
  },
];

// WhatsApp ön dolu mesajları
export const waMessages = {
  general:
    "Merhaba, oto servisim için web sitesi paketleri hakkında bilgi almak istiyorum.",
  pkg: (name: string) =>
    `Merhaba, oto servisim için "${name}" paketi hakkında bilgi almak istiyorum.`,
  analysis:
    "Merhaba, oto servisimin durumunu konuşmak ve bana en uygun paketi belirlemek istiyorum.",
};

// Analitik olay adları (tek yerden)
export const events = {
  whatsapp: "cta_whatsapp_oto_servis",
  teklifIndir: "cta_teklif_indir",
  paketleriGor: "cta_paketleri_gor",
  ihtiyacAnalizi: "cta_ihtiyac_analizi_oto_servis",
} as const;

// Teklif PDF yolu (public altında)
export const teklifPdfPath = "/teklif/albanexa-oto-servis-teklif.pdf";
