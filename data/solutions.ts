export type SolutionModule = {
  title: string;
  items: string[];
};

export type Solution = {
  slug: "is-takip-sistemleri" | "stok-cari-tahsilat" | "operasyon-otomasyonlari" | "saas-urun-altyapisi" | "web-siteleri" | "web-uygulamalari";
  title: string;
  tagline: string;
  problemStatement: string;
  forWhom: string[];
  commonProblems: string[];
  modules: SolutionModule[];
  outcomes: string[];
  relatedProjectSlug?: string;
  cta: string;
};

export const solutions: Solution[] = [
  {
    slug: "is-takip-sistemleri",
    title: "İş Takip Sistemleri",
    tagline: "Sipariş, görev ve müşteri süreçlerini tek panelden yönetin",
    problemStatement: "İş emirleri kişilerin hafızasında, görevler WhatsApp'ta, müşteri bilgileri dağınık Excel tablolarında kalıyor.",
    forWhom: [
      "Servis ve bakım işletmeleri",
      "Üretim ve sipariş takibi yapan KOBİ'ler",
      "Saha ekibi olan işletmeler",
      "Birden fazla lokasyonlu operasyonlar",
    ],
    commonProblems: [
      "Hangi iş emrinin hangi aşamada olduğu bilinmiyor",
      "Müşteri geçmişi kişilerin hafızasında",
      "Farklı personel aynı işi tekrarlıyor",
      "Raporlama manuel ve zaman alıyor",
    ],
    modules: [
      { title: "İş Emri Yönetimi", items: ["Oluşturma ve atama", "Adım adım durum takibi", "Tamamlama onayı"] },
      { title: "Müşteri ve CRM", items: ["İletişim geçmişi", "Özel notlar", "Geçmiş işler"] },
      { title: "Kullanıcı Rolleri", items: ["Yönetici paneli", "Personel görünümü", "Salt okunur raporlama"] },
      { title: "Bildirimler", items: ["Durum güncellemeleri", "Gecikme uyarıları", "Tamamlanma bildirimleri"] },
    ],
    outcomes: [
      "İşlerin kişilere değil sisteme bağlı olması",
      "Yöneticinin tüm operasyonu tek ekrandan görmesi",
      "Raporlamanın otomatik ve anlık hale gelmesi",
    ],
    relatedProjectSlug: "hezer-auto-service",
    cta: "İş Takip Sistemi Konuşalım",
  },
  {
    slug: "stok-cari-tahsilat",
    title: "Stok, Cari Hesap ve Tahsilat",
    tagline: "Deponuzu, alacaklarınızı ve tahsilatlarınızı tek sistemde görün",
    problemStatement: "Stok sayımları tutarsız, müşteri bakiyeleri belirsiz, tahsilatlar unutuluyor.",
    forWhom: [
      "Toptan ve perakende satış işletmeleri",
      "Tedarikçi ve bayi ağı olan firmalar",
      "Müşterilere vadeli satış yapan işletmeler",
      "Stok yoğun operasyonlar",
    ],
    commonProblems: [
      "Stokta ne kadar ürün kaldığı bilinmiyor",
      "Kimin ne kadar borçlu olduğu karışık",
      "Tahsilatlar takip edilemiyor, vadesi geçenler unutuluyor",
      "Hesap ekstresi hazırlamak saat alıyor",
    ],
    modules: [
      { title: "Stok Yönetimi", items: ["Giriş/çıkış takibi", "Kritik seviye uyarısı", "Ürün geçmişi"] },
      { title: "Cari Hesap", items: ["Müşteri bakiyesi", "Satış geçmişi", "Vade takibi"] },
      { title: "Tahsilat", items: ["Ödeme kayıtları", "Gecikme bildirimleri", "Aylık tahsilat özeti"] },
      { title: "PDF Raporlama", items: ["Hesap ekstresi", "Stok durum raporu", "WhatsApp paylaşımı"] },
    ],
    outcomes: [
      "Stok görünürlüğünün anlık olması",
      "Müşteri bakiyelerinin her an erişilebilir olması",
      "Tahsilat hatırlatmalarının otomatikleşmesi",
    ],
    relatedProjectSlug: "stockapp",
    cta: "Stok ve Cari Sistemi Konuşalım",
  },
  {
    slug: "operasyon-otomasyonlari",
    title: "Operasyon Otomasyonları",
    tagline: "Tekrar eden işleri otomatiğe bağlayın, personelinizi asıl işe odaklayın",
    problemStatement: "Her gün aynı manuel işler zaman ve enerji harcatıyor: e-posta göndermek, rapor hazırlamak, veri aktarmak.",
    forWhom: [
      "Tekrar eden operasyonel iş yükü olan işletmeler",
      "Farklı sistemler arasında veri taşıyan ekipler",
      "Müşteri iletişimini otomatikleştirmek isteyen firmalar",
      "Raporlamayı hızlandırmak isteyen yöneticiler",
    ],
    commonProblems: [
      "Aynı veriyi birden fazla yere manuel girmek",
      "Müşteri hatırlatmaları unutuluyor",
      "Haftalık raporlar saatler alıyor",
      "Onay süreçleri e-postayla ilerliyor, kaybolabiliyor",
    ],
    modules: [
      { title: "n8n İş Akışları", items: ["Tetikleyici bazlı otomasyonlar", "Koşullu akış yönetimi", "API entegrasyonları"] },
      { title: "Bildirim ve İletişim", items: ["Otomatik e-posta", "WhatsApp mesajlaşma", "Durum güncellemeleri"] },
      { title: "Rapor Üretimi", items: ["Zamanlanmış raporlar", "PDF otomatik oluşturma", "E-posta ile gönderim"] },
      { title: "Veri Senkronizasyonu", items: ["Sistemler arası veri akışı", "Audit log", "Hata yönetimi"] },
    ],
    outcomes: [
      "Manuel tekrar eden iş yükünün azalması",
      "Müşteri iletişiminin zamanında ve tutarlı olması",
      "Raporlamanın otomatik çalışması",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "Otomasyon Sistemini Konuşalım",
  },
  {
    slug: "saas-urun-altyapisi",
    title: "SaaS Ürün Altyapısı",
    tagline: "Sektörünüzdeki sorunu çözen dijital ürünü birlikte inşa edin",
    problemStatement: "Şirket içi çözülen bir problemi, diğer firmalara satılabilir abonelik modeline dönüştürmek karmaşık görünüyor.",
    forWhom: [
      "Sektörel yazılım ürünü geliştirmek isteyen girişimciler",
      "Mevcut iç sistemi ürünleştirmek isteyen KOBİ'ler",
      "MVP aşamasından ölçeklenebilir yapıya geçmek isteyenler",
      "Farklı firmalara kiralayabileceği bir platform kurmak isteyenler",
    ],
    commonProblems: [
      "Nereden başlayacağı ve hangi yapıyı kurması gerektiği belirsiz",
      "Birden fazla müşteriyi aynı sistemde güvenli tutmak zor",
      "Abonelik ve faturalandırma altyapısı karmaşık",
      "Ürün büyüdükçe sistemin tutarsızlaşması",
    ],
    modules: [
      { title: "Multi-Tenant Mimari", items: ["Kiracı izolasyonu", "Paylaşımlı altyapı", "Veri güvenliği"] },
      { title: "Abonelik Sistemi", items: ["Plan yönetimi", "Fatura ve ödeme altyapısı", "Freemium mantığı"] },
      { title: "Kullanıcı Yönetimi", items: ["Rol bazlı erişim", "Davet sistemi", "Süper admin paneli"] },
      { title: "Ürün Altyapısı", items: ["API tasarımı", "Webhook desteği", "Ölçeklenebilir veritabanı"] },
    ],
    outcomes: [
      "Güvenli ve izole edilmiş çok-kiracılı yapı",
      "Ölçeklenebilir abonelik ve faturalandırma sistemi",
      "Ürün büyüdükçe dayanıklı kalan teknik temel",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "SaaS Ürünü Konuşalım",
  },
  {
    slug: "web-siteleri",
    title: "Kurumsal Web Siteleri",
    tagline: "Markanızı profesyonel, güvenilir ve ikna edici gösteren web siteleri",
    problemStatement: "Mevcut site eski veya amatör görünüyor, hizmetler net anlaşılmıyor, ziyaretçiler iletişime geçmiyor.",
    forWhom: [
      "Profesyonel bir dijital varlık oluşturmak isteyen KOBİ'ler",
      "Kişisel marka veya portfolyo sitesi arayan uzmanlar",
      "SaaS ürünü için tanıtım sayfası ihtiyacı olan girişimler",
      "Mevcut sitesini yenilemek isteyen işletmeler",
    ],
    commonProblems: [
      "Site eski veya amatör görünüyor, güven vermiyor",
      "Hizmetler ve ürünler net anlaşılmıyor",
      "Mobil deneyim zayıf, kullanışsız",
      "Ziyaretçiler iletişime geçmiyor, dönüşüm yok",
      "Sayfa yavaş açılıyor, SEO temeli zayıf",
    ],
    modules: [
      { title: "Tasarım ve Geliştirme", items: ["Profesyonel görsel tasarım", "Çok sayfalı yapı", "Özel animasyon ve geçişler"] },
      { title: "Mobil ve Performans", items: ["Responsive tasarım", "Hız optimizasyonu", "Core Web Vitals"] },
      { title: "İçerik ve SEO", items: ["Net sayfa akışı", "SEO temeli", "Structured data"] },
      { title: "İletişim ve CTA", items: ["İletişim formu", "Teklif akışı", "WhatsApp entegrasyonu"] },
    ],
    outcomes: [
      "Ziyaretçinin markayı güvenilir bulması",
      "Hizmetlerin ve teklifin net anlaşılması",
      "İletişim ve teklif taleplerinin artması",
    ],
    relatedProjectSlug: "personal-brand-site",
    cta: "Web Sitesi Konuşalım",
  },
  {
    slug: "web-uygulamalari",
    title: "İşletmeye Özel Web Uygulamaları",
    tagline: "Kullanıcıların giriş yaptığı, veri yönettiği ve süreç izlediği web sistemleri",
    problemStatement: "Hazır yazılımlar işletmenizin özel süreçlerine uymuyor; Excel ve WhatsApp ile yönetim artık yetmiyor.",
    forWhom: [
      "Ekibinin günlük kullandığı özel bir panel isteyen işletmeler",
      "Müşteri veya bayi portalı kurmak isteyenler",
      "B2B operasyon yönetim sistemi ihtiyacı olanlar",
      "Mevcut süreçlerini web tabanlı yapıya taşımak isteyenler",
    ],
    commonProblems: [
      "Hazır yazılımlar işletmenin terminolojisine ve iş akışına uymuyor",
      "Excel ve WhatsApp ile süreç yönetimi hataları artırıyor",
      "Rol bazlı erişim ve yetkilendirme yok",
      "Anlık raporlama ve dashboard ihtiyacı karşılanamıyor",
    ],
    modules: [
      { title: "Kullanıcı Yönetimi", items: ["Giriş ve kimlik doğrulama", "Rol bazlı erişim", "Ekip yönetimi"] },
      { title: "Veri ve İş Akışı", items: ["Özel form ve ekranlar", "Durum takibi", "İş emri yönetimi"] },
      { title: "Raporlama", items: ["Dashboard ve analitik", "PDF raporlar", "Veri dışa aktarma"] },
      { title: "Entegrasyon", items: ["API bağlantıları", "n8n otomasyon", "Bildirim sistemi"] },
    ],
    outcomes: [
      "İşlerin kişilere değil sisteme bağlı olması",
      "Anlık veri görünürlüğü ve raporlama",
      "Ekibin benimsediği kullanışlı arayüz",
    ],
    relatedProjectSlug: "stockapp",
    cta: "Web Uygulaması Konuşalım",
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
