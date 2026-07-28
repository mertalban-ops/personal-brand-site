export type SolutionModule = {
  title: string;
  items: string[];
};

export type SolutionFAQ = {
  q: string;
  a: string;
};

export type Solution = {
  slug: "is-takip-sistemleri" | "stok-cari-tahsilat" | "operasyon-otomasyonlari" | "saas-urun-altyapisi" | "web-siteleri" | "web-uygulamalari";
  title: string;
  tagline: string;
  seoSummary?: string;
  problemStatement: string;
  forWhom: string[];
  commonProblems: string[];
  modules: SolutionModule[];
  outcomes: string[];
  pageFaqs?: SolutionFAQ[];
  relatedProjectSlug?: string;
  cta: string;
};

export const solutionsTr: Solution[] = [
  {
    slug: "is-takip-sistemleri",
    title: "İş Takip Sistemleri",
    tagline: "Sipariş, görev ve müşteri süreçlerini tek panelden yönetin",
    seoSummary: "İş takip sistemi, siparişleri, görevleri ve müşteri süreçlerini WhatsApp ve Excel'den bağımsız tek bir dijital panelde yönetmenizi sağlar. Albanexa, servis işletmeleri, saha ekipleri ve çok lokasyonlu operasyonlar için işletmeye özel iş takip ve operasyon yönetim yazılımları geliştirmektedir.",
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
    pageFaqs: [
      {
        q: "İş takip sistemi ne işe yarar?",
        a: "İş takip sistemi; iş emirlerini, görev atamalarını, müşteri geçmişini ve servis süreçlerini dijital ortamda kaydeder. Hangi işin hangi aşamada olduğunu, kimin sorumlu olduğunu ve ne zaman tamamlandığını anlık olarak görmenizi sağlar. WhatsApp ve hafıza yerine sistemin yönetmesi sayesinde işlerin kişilere bağlı kalmasını ortadan kaldırır.",
      },
      {
        q: "Hazır CRM veya ERP yerine özel bir sistem kurmanın avantajı nedir?",
        a: "Hazır CRM ve ERP sistemleri genellikle işletmenizin terminolojisine, iş akışına ve sektörüne uymak için fazla genel kalır ya da uyarlamak için yüksek lisans maliyeti gerektirir. Özel bir iş takip sistemi, yalnızca sizin operasyonunuzu modeller; ekibinizin benimsemesi daha kolay, bakım maliyeti daha düşük olur.",
      },
      {
        q: "Sistem kaç kullanıcıyla çalışabilir?",
        a: "Kurduğumuz sistemler rol bazlı erişim kontrolüyle tasarlanır: yönetici, personel ve salt okunur raporlama gibi farklı roller tanımlanabilir. Kullanıcı sayısında teknik bir üst sınır yoktur; sistem büyüdükçe ölçeklenecek mimariyle kurulur.",
      },
      {
        q: "Mobil cihazlardan da kullanılabiliyor mu?",
        a: "Evet. Tüm sistemlerimiz responsive tasarımla geliştirilir; bilgisayar, tablet ve akıllı telefon üzerinden ekstra uygulama indirmeden tarayıcıdan erişilebilir.",
      },
    ],
    relatedProjectSlug: "hezer-auto-service",
    cta: "İş Takip Sistemi Konuşalım",
  },
  {
    slug: "stok-cari-tahsilat",
    title: "Stok, Cari Hesap ve Tahsilat",
    tagline: "Deponuzu, alacaklarınızı ve tahsilatlarınızı tek sistemde görün",
    seoSummary: "Stok ve cari hesap takip sistemi, depo hareketlerini, müşteri bakiyelerini ve tahsilatları gerçek zamanlı olarak tek ekranda gösterir. Albanexa, toptan ve perakende işletmeler için Excel'in yerini alan özel stok yönetim ve cari hesap yazılımları geliştirmektedir.",
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
    pageFaqs: [
      {
        q: "Stok takip sistemi nedir ve işletmeme ne kazandırır?",
        a: "Stok takip sistemi, depoya giren ve çıkan her ürünü kayıt altına alır; kritik stok seviyelerinde uyarı verir ve anlık envanter durumunu gösterir. Sayım hataları azalır, kayıp-kaçak azalır ve satın alma kararları gerçek veriye dayanır. Excel'le yapılan manuel takibe kıyasla hem zaman hem hata payı önemli ölçüde düşer.",
      },
      {
        q: "Cari hesap takibi ve tahsilat yönetimi nasıl çalışır?",
        a: "Sistemde her müşterinin açık bakiyesi, vadeli satışları ve ödeme geçmişi ayrı bir hesapta izlenir. Vadesini geçen alacaklar için otomatik hatırlatma gönderilebilir. Tek tıkla PDF hesap ekstresi oluşturulup WhatsApp üzerinden paylaşılabilir; hesap ekstresi hazırlama süresi önemli ölçüde kısalır.",
      },
      {
        q: "Excel'den özel bir sisteme geçiş ne kadar sürer?",
        a: "Mevcut Excel verilerinin aktarımı da dahil olmak üzere tipik bir stok ve cari hesap projesi 4 ila 8 hafta arasında tamamlanır. Veri geçiş planı, kapsam belgesinde netleştirilir ve hiçbir veri kaybı olmadan sisteme aktarılır.",
      },
      {
        q: "Birden fazla depo veya lokasyon destekleniyor mu?",
        a: "Evet. Sistem çok depolu yapıyı destekler; her deponun stok durumu ayrı ayrı izlenebilir, transferler kayıt altına alınır. Lokasyonlar arası raporlama tek bir yönetici panelinden yapılabilir.",
      },
    ],
    relatedProjectSlug: "stockapp",
    cta: "Stok ve Cari Sistemi Konuşalım",
  },
  {
    slug: "operasyon-otomasyonlari",
    title: "Operasyon Otomasyonları",
    tagline: "Tekrar eden işleri otomatiğe bağlayın, personelinizi asıl işe odaklayın",
    seoSummary: "Operasyon otomasyonu, e-posta gönderimi, rapor hazırlama ve sistemler arası veri aktarımı gibi tekrar eden manuel işleri otomatik akışlara bağlar. Albanexa, n8n tabanlı iş akışları ve özel entegrasyonlarla KOBİ'lerin günlük operasyon yükünü azaltmakta ve müşteri iletişimini otomatikleştirmektedir.",
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
    pageFaqs: [
      {
        q: "Hangi manuel işler otomatikleştirilebilir?",
        a: "Tekrar eden her iş otomasyona uygundur: müşteri sipariş onay e-postaları, haftalık satış raporları, düşük stok uyarıları, vade tarihi hatırlatmaları, WhatsApp bildirim akışları ve sistemler arası veri aktarımı bunların başında gelir. Mevcut operasyonunuzu analiz ederek hangi adımların otomasyona uygun olduğunu birlikte belirleriz.",
      },
      {
        q: "n8n nedir ve neden tercih edilmektedir?",
        a: "n8n, açık kaynaklı bir iş akışı otomasyon aracıdır. Farklı uygulamaları ve API'leri görsel bir arayüzde birbirine bağlar. Lisans maliyeti düşük, özelleştirme esnekliği yüksektir. İşletme verilerini kendi sunucunuzda tutmanızı sağlar, bu da veri güvenliği açısından önemlidir.",
      },
      {
        q: "Mevcut yazılımlarımızla entegrasyon sağlanabiliyor mu?",
        a: "Evet, çoğu modern yazılım REST API veya webhook desteği sunar. Fatura programları, muhasebe yazılımları, e-ticaret platformları ve özel veritabanlarıyla entegrasyon mümkündür. Entegrasyon kapsamı keşif görüşmesinde netleştirilir.",
      },
      {
        q: "Otomasyon sistemi kurulduktan sonra bakımı kim yapıyor?",
        a: "Teslim sonrası aylık bakım anlaşması kapsamında otomasyon akışlarının çalışır durumda kalması, API değişikliklerine uyarlanması ve yeni otomasyon ihtiyaçlarının karşılanması Albanexa tarafından yönetilir.",
      },
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "Otomasyon Sistemini Konuşalım",
  },
  {
    slug: "saas-urun-altyapisi",
    title: "SaaS Ürün Altyapısı",
    tagline: "Sektörünüzdeki sorunu çözen dijital ürünü birlikte inşa edin",
    seoSummary: "SaaS ürün altyapısı, şirket içinde çözülen bir problemi diğer firmalara kiralanan abonelik ürününe dönüştürmenizi sağlar. Albanexa, multi-tenant mimari, abonelik yönetimi ve ölçeklenebilir veritabanı tasarımıyla sektörel SaaS ürünlerinin teknik altyapısını kurmaktadır.",
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
    pageFaqs: [
      { q: "SaaS nedir ve nasıl çalışır?", a: "SaaS (Software as a Service), yazılımın kurulum gerektirmeden tarayıcı üzerinden aylık veya yıllık abonelikle kullanıldığı modeldir. Kullanıcılar sisteme hesaplarıyla giriş yapar; güncelleme, bakım ve sunucu yönetimi yazılımı geliştiren taraf tarafından yapılır." },
      { q: "Multi-tenant mimari ne demek, neden önemli?", a: "Multi-tenant mimaride birden fazla müşteri (kiracı) aynı yazılım altyapısını güvenli biçimde paylaşır; her kiracının verisi birbirinden izole tutulur. Bu yapı hem altyapı maliyetini düşürür hem de ürünün yüzlerce firmaya ölçeklenmesini mümkün kılar." },
      { q: "MVP'den tam ürüne geçiş ne kadar sürer?", a: "Kapsam ve özelliklere göre değişmekle birlikte, temel abonelik ve multi-tenant altyapısı içeren bir MVP genellikle 6–10 hafta içinde tamamlanır. Tam ürüne geçiş; ödeme entegrasyonu, rol yönetimi ve ölçeklendirme testleri dahil 3–5 ay sürebilir." },
      { q: "Abonelik ve ödeme altyapısı nasıl kurulur?", a: "Abonelik yönetimi için Stripe veya iyzico entegrasyonu yapılır; plan oluşturma, yükseltme, düşürme ve otomatik yenileme akışları tasarlanır. Faturalandırma ve ödeme geçmişi paneli, müşteri self-servis portalıyla birlikte sunulur." },
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "SaaS Ürünü Konuşalım",
  },
  {
    slug: "web-siteleri",
    title: "Kurumsal Web Siteleri",
    tagline: "Markanızı profesyonel, güvenilir ve ikna edici gösteren web siteleri",
    seoSummary: "Kurumsal web sitesi, markanızı dijitalde profesyonel biçimde temsil eden, ziyaretçiyi müşteriye dönüştüren ve arama motorlarında görünür kılan temel dijital varlığınızdır. Albanexa, KOBİ'ler ve uzmanlar için Next.js tabanlı, hızlı, SEO uyumlu ve mobil öncelikli kurumsal web siteleri geliştirmektedir.",
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
    pageFaqs: [
      { q: "Kurumsal web sitesi ne kadar sürede hazır olur?", a: "Kapsam ve içerik hazırlığına göre değişmekle birlikte, çok sayfalı bir kurumsal web sitesi genellikle 3–5 hafta içinde tamamlanır. Tasarım onayı ve içerik teslimatı süreci doğrudan etkiler; bu nedenle ilk görüşmede içerik takvimi netleştirilir." },
      { q: "Web sitemin Google'da görünmesi için ne yapılıyor?", a: "Site, teknik SEO temelleriyle inşa edilir: doğru HTML semantiği, hızlı yükleme süresi, mobil uyumluluk, schema.org yapısal verisi ve canonical URL yönetimi. Ek olarak Google Search Console entegrasyonu ve sitemap gönderimi yapılır." },
      { q: "Hazır şablon (WordPress, Wix) yerine özel site neden tercih edilmeli?", a: "Özel geliştirilen siteler rakiplerin şablonundan ayrışır, marka kimliğini tam yansıtır ve sayfa hızı açısından hazır şablonlardan belirgin biçimde üstün performans gösterir. Aynı zamanda içerik güncellemeleri daha esnek yönetilir ve SEO kontrolü tamamen sizin elinizde olur." },
      { q: "Site teslim sonrası güncelleme ve bakım nasıl sağlanıyor?", a: "Teslim sonrası destek paketi opsiyoneldir. Yönetici paneli veya kolay düzenlenebilir içerik alanları sayesinde metin ve görsel güncellemelerini kendiniz yapabilirsiniz. Teknik güncelleme ve hosting yönetimi için aylık bakım anlaşması seçeneği sunulmaktadır." },
    ],
    relatedProjectSlug: "personal-brand-site",
    cta: "Web Sitesi Konuşalım",
  },
  {
    slug: "web-uygulamalari",
    title: "İşletmeye Özel Web Uygulamaları",
    tagline: "Kullanıcıların giriş yaptığı, veri yönettiği ve süreç izlediği web sistemleri",
    seoSummary: "İşletmeye özel web uygulaması, ekibinizin giriş yapıp günlük operasyonlarını yönettiği, hazır yazılımların karşılayamadığı iş akışlarına göre sıfırdan tasarlanan bir sistemdir. Albanexa, rol bazlı erişim, gerçek zamanlı veri ve özel raporlama panelleriyle KOBİ'ler için ölçeklenebilir web uygulamaları geliştirmektedir.",
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
    pageFaqs: [
      { q: "Web uygulaması ile web sitesi arasındaki fark nedir?", a: "Web sitesi ağırlıklı olarak bilgi sunar; ziyaretçi içeriği okur. Web uygulaması ise kullanıcının giriş yapıp veri girdiği, iş akışlarını yönettiği interaktif bir sistemdir. İş takip paneli, sipariş yönetimi veya ekip koordinasyon araçları web uygulaması kategorisine girer." },
      { q: "Hazır ERP veya CRM yerine özel web uygulaması ne zaman tercih edilmeli?", a: "Hazır sistemler genel süreçlere göre tasarlanmıştır ve işletmenizin terminolojisine veya özgün iş akışına tam uymayabilir. Çalışanların %70'ten fazlası ek işlem yaptığında ya da sistemi esnetmek için sürekli geliştirici tutulduğunda özel geliştirme çok daha verimlidir." },
      { q: "Rol bazlı erişim kontrolü ne anlama geliyor?", a: "Rol bazlı erişimde her kullanıcı yalnızca kendi yetkisindeki ekran ve verilere ulaşır. Örneğin saha teknisyeni kendi iş emirlerini görebilirken yönetici tüm ekip verilerine ve raporlara erişebilir. Bu yapı hem güvenliği artırır hem de kullanıcı arayüzünü sade tutar." },
      { q: "Mevcut Excel/Access dosyalarını web uygulamasına taşıyabilir miyiz?", a: "Evet. Mevcut Excel dosyaları veya Access veri tabanı, veri temizleme ve dönüştürme adımından sonra yeni sisteme aktarılır. Bu süreç, özellikle yıllarca biriken müşteri, stok veya sipariş verilerinin kayıpsız taşınmasını kapsar." },
    ],
    relatedProjectSlug: "stockapp",
    cta: "Web Uygulaması Konuşalım",
  },
];

export const solutionsEn: Solution[] = [
  {
    slug: "is-takip-sistemleri",
    title: "Job Tracking Systems",
    tagline: "Manage orders, tasks, and client processes from a single dashboard",
    problemStatement: "Work orders remain in people's memory, tasks are scattered on WhatsApp, and client information is lost in spreadsheets.",
    forWhom: [
      "Service and maintenance businesses",
      "SMEs tracking manufacturing and orders",
      "Businesses with field teams",
      "Operations with multiple locations",
    ],
    commonProblems: [
      "Unclear status of work orders",
      "Client history is kept in memory",
      "Staff repeating the same work",
      "Manual and slow reporting",
    ],
    modules: [
      { title: "Work Order Management", items: ["Creation and assignment", "Step-by-step status tracking", "Completion approval"] },
      { title: "Clients & CRM", items: ["Communication history", "Custom notes", "Past jobs"] },
      { title: "User Roles", items: ["Admin dashboard", "Staff views", "Read-only reporting"] },
      { title: "Notifications", items: ["Status updates", "Delay alerts", "Completion notifications"] },
    ],
    outcomes: [
      "Work is tied to systems, not individuals",
      "Managers see the entire operation on a single screen",
      "Automatic and instant reporting",
    ],
    relatedProjectSlug: "hezer-auto-service",
    cta: "Let's Talk Job Tracking",
  },
  {
    slug: "stok-cari-tahsilat",
    title: "Inventory & Receivables",
    tagline: "See your warehouse, receivables, and collections in a single system",
    problemStatement: "Inventory counts are inconsistent, client balances are unclear, and collections are forgotten.",
    forWhom: [
      "Wholesale and retail sales businesses",
      "Companies with supplier and dealer networks",
      "Businesses offering vadeli (deferred) sales to clients",
      "Inventory-heavy operations",
    ],
    commonProblems: [
      "Exact stock levels are unknown",
      "Client balance tracking is confusing",
      "Collections are not tracked, overdue payments are forgotten",
      "Preparing account statements takes hours",
    ],
    modules: [
      { title: "Inventory Management", items: ["In/out tracking", "Critical stock level alerts", "Product history"] },
      { title: "Current Accounts", items: ["Client balance", "Sales history", "Due date tracking"] },
      { title: "Collections", items: ["Payment records", "Overdue alerts", "Monthly collection summary"] },
      { title: "PDF Reporting", items: ["Account statement", "Stock status report", "WhatsApp sharing"] },
    ],
    outcomes: [
      "Instant stock visibility",
      "Client balances accessible at any time",
      "Automated collection reminders",
    ],
    relatedProjectSlug: "stockapp",
    cta: "Let's Talk Inventory & Finance",
  },
  {
    slug: "operasyon-otomasyonlari",
    title: "Operational Automation",
    tagline: "Automate repetitive tasks, focus your team on what matters",
    problemStatement: "Daily manual tasks consume time and energy: sending emails, preparing reports, copying data.",
    forWhom: [
      "Businesses with repetitive operational workloads",
      "Teams moving data between different systems",
      "Companies wanting to automate client communication",
      "Managers wanting to speed up reporting",
    ],
    commonProblems: [
      "Manually entering the same data in multiple places",
      "Client reminders are forgotten",
      "Weekly reports take hours to compile",
      "Approval processes get lost in emails",
    ],
    modules: [
      { title: "n8n Workflows", items: ["Trigger-based automation", "Conditional flow management", "API integrations"] },
      { title: "Notifications & Comm", items: ["Automated email", "WhatsApp messaging", "Status updates"] },
      { title: "Report Generation", items: ["Scheduled reports", "Automated PDF creation", "Email delivery"] },
      { title: "Data Synchronization", items: ["Data flow between systems", "Audit log", "Error handling"] },
    ],
    outcomes: [
      "Reduction in manual repetitive workload",
      "Timely and consistent client communication",
      "Automated reporting workflows",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "Let's Talk Automation",
  },
  {
    slug: "saas-urun-altyapisi",
    title: "SaaS Product Foundation",
    tagline: "Build a digital product that solves your industry's main problem",
    problemStatement: "Transforming an in-house operational solution into a salable subscription-based product seems complex.",
    forWhom: [
      "Entrepreneurs wanting to build an industry-specific SaaS",
      "SMEs wanting to productize an in-house system",
      "Projects moving from MVP to a scalable architecture",
      "Companies wanting to rent a platform to other businesses",
    ],
    commonProblems: [
      "Unclear where to start and what architecture to choose",
      "Hard to keep multiple clients secure in the same system",
      "Complex billing and subscription infrastructure",
      "System becoming unstable as the product scales",
    ],
    modules: [
      { title: "Multi-Tenant Architecture", items: ["Tenant isolation", "Shared infrastructure", "Data security"] },
      { title: "Subscription System", items: ["Plan management", "Billing and invoice infrastructure", "Freemium logic"] },
      { title: "User Management", items: ["Role-based access", "Invite system", "Super admin panel"] },
      { title: "Product Backbone", items: ["API design", "Webhook support", "Scalable database"] },
    ],
    outcomes: [
      "Secure and isolated multi-tenant structure",
      "Scalable subscription and billing backbone",
      "Technical foundation that remains stable as you grow",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "Let's Talk SaaS Product",
  },
  {
    slug: "web-siteleri",
    title: "Corporate Websites",
    tagline: "Websites that make your brand look professional, reliable, and convincing",
    problemStatement: "The current site looks old or amateur, services are not clearly understood, and visitors do not convert.",
    forWhom: [
      "SMEs wanting to build a professional digital presence",
      "Experts looking for personal brand or portfolio sites",
      "Startups needing a landing page for a SaaS product",
      "Businesses wanting to rebuild their existing website",
    ],
    commonProblems: [
      "Website looks old or amateur, lacks trust",
      "Services and products are not clearly explained",
      "Weak and clunky mobile experience",
      "Visitors do not contact or convert",
      "Slow loading speeds, poor SEO foundation",
    ],
    modules: [
      { title: "Design & Development", items: ["Professional visual design", "Multi-page layout", "Custom animations and transitions"] },
      { title: "Mobile & Performance", items: ["Responsive design", "Speed optimization", "Core Web Vitals"] },
      { title: "Content & SEO", items: ["Clear page flow", "SEO foundation", "Structured data"] },
      { title: "Contact & CTA", items: ["Contact form", "Request workflow", "WhatsApp integration"] },
    ],
    outcomes: [
      "Visitors finding the brand highly trustworthy",
      "Services and value proposition clearly understood",
      "Increase in contact and proposal requests",
    ],
    relatedProjectSlug: "personal-brand-site",
    cta: "Let's Talk Websites",
  },
  {
    slug: "web-uygulamalari",
    title: "Custom Web Applications",
    tagline: "Web systems where users log in, manage data, and track processes",
    problemStatement: "Off-the-shelf software does not fit your unique business workflows; Excel and WhatsApp are no longer enough.",
    forWhom: [
      "Businesses wanting a custom dashboard for daily staff use",
      "Companies wanting to set up a client or dealer portal",
      "Operations requiring a custom B2B management system",
      "Teams wanting to migrate existing workflows to the cloud",
    ],
    commonProblems: [
      "Off-the-shelf software doesn't fit company terminology and flow",
      "Managing processes via Excel/WhatsApp increases errors",
      "No role-based access control or authorization",
      "Real-time reporting and dashboard needs are not met",
    ],
    modules: [
      { title: "User Management", items: ["Login and auth", "Role-based access", "Team management"] },
      { title: "Data & Workflow", items: ["Custom forms and screens", "Status tracking", "Work order management"] },
      { title: "Reporting", items: ["Dashboard and analytics", "PDF reports", "Data export"] },
      { title: "Integration", items: ["API connections", "n8n automation", "Notification system"] },
    ],
    outcomes: [
      "Work tied to systems, not individuals",
      "Real-time data visibility and reporting",
      "Friendly interface adopted by the team",
    ],
    relatedProjectSlug: "stockapp",
    cta: "Let's Talk Web Applications",
  },
];

export const solutionsDe: Solution[] = [
  {
    slug: "is-takip-sistemleri",
    title: "Arbeitsverfolgungssysteme",
    tagline: "Verwalten Sie Bestellungen, Aufgaben und Kundenprozesse in einem einzigen Dashboard",
    problemStatement: "Arbeitsaufträge bleiben im Gedächtnis von Personen, Aufgaben sind über WhatsApp verstreut, Kundeninformationen gehen in Tabellen verloren.",
    forWhom: [
      "Service- und Wartungsunternehmen",
      "KMUs, die Produktion und Bestellungen verfolgen",
      "Unternehmen mit Außendienstteams",
      "Betriebe mit mehreren Standorten",
    ],
    commonProblems: [
      "Unklarer Status von Arbeitsaufträgen",
      "Kundenhistorie wird im Gedächtnis behalten",
      "Mitarbeiter wiederholen dieselbe Arbeit",
      "Manuelle und langsame Berichterstattung",
    ],
    modules: [
      { title: "Arbeitsauftragsverwaltung", items: ["Erstellung und Zuweisung", "Schritt-für-Schritt-Statusverfolgung", "Abschlussgenehmigung"] },
      { title: "Kunden & CRM", items: ["Kommunikationsverlauf", "Benutzerdefinierte Notizen", "Vergangene Aufgaben"] },
      { title: "Benutzerrollen", items: ["Admin-Dashboard", "Mitarbeiteransichten", "Schreibgeschütztes Reporting"] },
      { title: "Benachrichtigungen", items: ["Status-Updates", "Verzögerungswarnungen", "Abschlussbenachrichtigungen"] },
    ],
    outcomes: [
      "Arbeit ist an Systeme gebunden, nicht an Personen",
      "Manager sehen den gesamten Betrieb auf einem Bildschirm",
      "Automatische und sofortige Berichterstattung",
    ],
    relatedProjectSlug: "hezer-auto-service",
    cta: "Lass uns über Arbeitsverfolgung sprechen",
  },
  {
    slug: "stok-cari-tahsilat",
    title: "Lager & Finanzen",
    tagline: "Sehen Sie Ihr Lager, Ihre Außenstände und Ihre Einnahmen in einem einzigen System",
    problemStatement: "Lagerbestände sind inkonsistent, Kundenkonten sind unklar, Einnahmen werden vergessen.",
    forWhom: [
      "Groß- und Einzelhandelsunternehmen",
      "Unternehmen mit Lieferanten- und Händlernetzwerken",
      "Unternehmen, die Kunden Ratenzahlung anbieten",
      "Lagerintensive Betriebe",
    ],
    commonProblems: [
      "Genaue Bestände sind unbekannt",
      "Kundenkontostände sind verwirrend",
      "Einnahmen werden nicht verfolgt, überfällige Zahlungen werden vergessen",
      "Die Erstellung von Kontoauszügen dauert Stunden",
    ],
    modules: [
      { title: "Lagerverwaltung", items: ["Ein-/Ausgangsverfolgung", "Kritische Bestandswarnungen", "Produktverlauf"] },
      { title: "Kontoauszug", items: ["Kundenkontostand", "Verkaufsverlauf", "Fälligkeitsverfolgung"] },
      { title: "Einnahmen", items: ["Zahlungsaufzeichnungen", "Mahnungen", "Monatliche Einnahmenübersicht"] },
      { title: "PDF-Berichte", items: ["Kontoauszug", "Bestandsbericht", "WhatsApp-Freigabe"] },
    ],
    outcomes: [
      "Sofortige Bestandsprüfung",
      "Kundenkontostände jederzeit abrufbar",
      "Automatisierte Zahlungserinnerungen",
    ],
    relatedProjectSlug: "stockapp",
    cta: "Lass uns über Lager & Finanzen sprechen",
  },
  {
    slug: "operasyon-otomasyonlari",
    title: "Prozessautomatisierung",
    tagline: "Automatisieren Sie wiederkehrende Aufgaben, entlasten Sie Ihr Team",
    problemStatement: "Tägliche manuelle Aufgaben kosten Zeit und Energie: E-Mails senden, Berichte erstellen, Daten kopieren.",
    forWhom: [
      "Unternehmen mit hohem manuellem Arbeitsaufwand",
      "Teams, die Daten zwischen verschiedenen Systemen übertragen",
      "Unternehmen, die die Kundenkommunikation automatisieren möchten",
      "Manager, die Berichte schneller erstellen möchten",
    ],
    commonProblems: [
      "Manuelle Eingabe derselben Daten an mehreren Stellen",
      "Kundenerinnerungen werden vergessen",
      "Wöchentliche Berichte dauern Stunden",
      "Genehmigungsprozesse gehen in E-Mails verloren",
    ],
    modules: [
      { title: "n8n-Workflows", items: ["Triggerbasierte Automatisierung", "Bedingte Ablaufsteuerung", "API-Integrationen"] },
      { title: "Benachrichtigungen & Komm", items: ["Automatisierte E-Mail", "WhatsApp-Nachrichten", "Status-Updates"] },
      { title: "Berichterstellung", items: ["Geplante Berichte", "Automatisierte PDF-Erstellung", "E-Mail-Zustellung"] },
      { title: "Datensynchronisation", items: ["Datenfluss zwischen Systemen", "Audit-Log", "Fehlerbehandlung"] },
    ],
    outcomes: [
      "Reduzierung des manuellen Arbeitsaufwands",
      "Rechtzeitige und konsistente Kundenkommunikation",
      "Automatisierte Berichterstattung",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "Lass uns über Automatisierung sprechen",
  },
  {
    slug: "saas-urun-altyapisi",
    title: "SaaS-Produkt-Infrastruktur",
    tagline: "Bauen Sie ein digitales Produkt, das das Hauptproblem Ihrer Branche löst",
    problemStatement: "Die Umwandlung einer internen Lösung in ein verkaufbares, abonnementbasiertes Produkt scheint komplex zu sein.",
    forWhom: [
      "Gründer, die ein branchenspezifisches SaaS bauen möchten",
      "KMUs, die ein internes System vermarkten möchten",
      "Projekte, die von einem MVP zu einer skalierbaren Architektur wechseln",
      "Unternehmen, die eine Plattform an andere Unternehmen vermieten möchten",
    ],
    commonProblems: [
      "Unklar, wo man anfangen soll und welche Architektur man wählen soll",
      "Schwierig, mehrere Kunden im selben System sicher zu halten",
      "Komplexe Abrechnungs- und Abonnementinfrastruktur",
      "System wird instabil, wenn das Produkt skaliert",
    ],
    modules: [
      { title: "Multi-Tenant-Architektur", items: ["Mandantenisolierung", "Gemeinsame Infrastruktur", "Datensicherheit"] },
      { title: "Abonnement-System", items: ["Tarifverwaltung", "Abrechnungs- und Zahlungsinfrastruktur", "Freemium-Logik"] },
      { title: "Benutzerverwaltung", items: ["Rollenbasierter Zugriff", "Einladungssystem", "Super-Admin-Panel"] },
      { title: "Produkt-Backbone", items: ["API-Design", "Webhook-Unterstützung", "Skalierbare Datenbank"] },
    ],
    outcomes: [
      "Sichere und isolierte Multi-Tenant-Struktur",
      "Skalierbares Abonnement- und Abrechnungs-Backbone",
      "Technische Basis, die auch bei Wachstum stabil bleibt",
    ],
    relatedProjectSlug: "saas-operasyon-altyapisi",
    cta: "Lass uns über SaaS-Produkte sprechen",
  },
  {
    slug: "web-siteleri",
    title: "Unternehmenswebsites",
    tagline: "Websites, die Ihre Marke professionell, vertrauenswürdig und überzeugend präsentieren",
    problemStatement: "Die aktuelle Website sieht alt oder amateurhaft aus, Dienstleistungen werden nicht verstanden, Besucher konvertieren nicht.",
    forWhom: [
      "KMUs, die eine professionelle digitale Präsenz aufbauen möchten",
      "Experten, die eine persönliche Marke oder ein Portfolio suchen",
      "Startups, die eine Landingpage für ein SaaS-Produkt benötigen",
      "Unternehmen, die ihre bestehende Website neu aufbauen möchten",
    ],
    commonProblems: [
      "Website sieht alt oder amateurhaft aus, es fehlt an Vertrauen",
      "Dienstleistungen und Produkte werden nicht klar erklärt",
      "Schlechte mobile Erfahrung",
      "Besucher kontaktieren oder konvertieren nicht",
      "Langsame Ladezeiten, schlechte SEO-Basis",
    ],
    modules: [
      { title: "Design & Entwicklung", items: ["Professionelles visuelles Design", "Mehrseitiges Layout", "Benutzerdefinierte Animationen"] },
      { title: "Mobil & Leistung", items: ["Responsive Design", "Geschwindigkeitsoptimierung", "Core Web Vitals"] },
      { title: "Inhalt & SEO", items: ["Klarer Seitenfluss", "SEO-Basis", "Strukturierte Daten"] },
      { title: "Kontakt & CTA", items: ["Kontaktformular", "Anfrage-Workflow", "WhatsApp-Integration"] },
    ],
    outcomes: [
      "Besucher finden die Marke sehr vertrauenswürdig",
      "Dienstleistungen und Wertversprechen klar verstanden",
      "Anstieg von Kontakt- und Angebotsanfragen",
    ],
    relatedProjectSlug: "personal-brand-site",
    cta: "Lass uns über Websites sprechen",
  },
  {
    slug: "web-uygulamalari",
    title: "Maßgeschneiderte Webanwendungen",
    tagline: "Websysteme, in denen sich Benutzer anmelden, Daten verwalten und Prozesse verfolgen",
    problemStatement: "Standardsoftware passt nicht zu Ihren einzigartigen Arbeitsabläufen; Excel und WhatsApp reichen nicht mehr aus.",
    forWhom: [
      "Unternehmen, die ein benutzerdefiniertes Dashboard für Mitarbeiter suchen",
      "Unternehmen, die ein Kunden- oder Händlerportal einrichten möchten",
      "Betriebe, die ein maßgeschneidertes B2B-Verwaltungssystem benötigen",
      "Teams, die bestehende Arbeitsabläufe in die Cloud migrieren möchten",
    ],
    commonProblems: [
      "Standardsoftware passt nicht zu Unternehmensabläufen und -begriffen",
      "Die Verwaltung von Prozessen über Excel/WhatsApp erhöht Fehler",
      "Keine rollenbasierte Zugriffskontrolle oder Autorisierung",
      "Echtzeit-Reporting und Dashboard-Anforderungen werden nicht erfüllt",
    ],
    modules: [
      { title: "Benutzerverwaltung", items: ["Anmeldung und Authentifizierung", "Rollenbasierter Zugriff", "Teamverwaltung"] },
      { title: "Daten & Workflow", items: ["Benutzerdefinierte Formulare", "Statusverfolgung", "Arbeitsauftragsverwaltung"] },
      { title: "Berichterstattung", items: ["Dashboard und Analysen", "PDF-Berichte", "Datenexport"] },
      { title: "Integration", items: ["API-Verbindungen", "n8n-Automatisierung", "Benachrichtigungssystem"] },
    ],
    outcomes: [
      "Arbeit an Systeme gebunden, nicht an Personen",
      "Echtzeit-Datenvisibilität und Berichterstattung",
      "Freundliche Benutzeroberfläche, die vom Team angenommen wird",
    ],
    relatedProjectSlug: "stockapp",
    cta: "Lass uns über Webanwendungen sprechen",
  },
];

export const solutions = solutionsTr;

export function getSolutions(lang: string = "tr"): Solution[] {
  if (lang === "en") return solutionsEn;
  if (lang === "de") return solutionsDe;
  return solutionsTr;
}

export function getSolutionBySlug(slug: string, lang: string = "tr"): Solution | undefined {
  const list = getSolutions(lang);
  return list.find((s) => s.slug === slug);
}
