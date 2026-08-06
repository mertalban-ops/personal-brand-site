export type ProjectCategory = 
  | "customer-project"     // Müşteri Projeleri
  | "product-lab"         // Albanexa Ürün Laboratuvarı — Geliştirme Aşamasında
  | "internal-project"    // İç Projeler
  | "concept-work";       // Çözüm Yetkinliği / Konsept Mimari

export type ProjectStatus =
  | "liveClientProject"
  | "inDevelopmentProduct"
  | "conceptArchitecture"
  | "internalProject";

export type CaseStudyModule = {
  name: string;
  features: string[];
};

export type Project = {
  name: string;
  tagline: string;
  status: "Active" | "In Development" | "Planned";
  category: ProjectCategory;
  projectStatus?: ProjectStatus;
  problem: string;
  solution: string;
  approach: string;
  benefit: string;
  tech: string[];
  features: string[];
  previewType: "stockapp" | "carpass" | "auto-service" | "business-dashboard" | "personal-brand";
  slug: string;
  caseSummary: string;
  targetUser: string;
  caseModules: CaseStudyModule[];
  userJourney: string[];
  outcomes: string[];
  lessons?: string[];
  futureWork?: string[];
  liveUrl?: string;
  industry?: string;
  role?: string;
  previousWorkflow?: string;
  clientTestimonial?: { author: string; role: string; text: string };
  metrics?: { label: string; before: string; after: string }[];
};

export const projectsTr: Project[] = [
  {
    name: "StockApp",
    tagline: "Stok, cari hesap ve tahsilat takip sistemi",
    status: "Active",
    category: "customer-project",
    problem: "Stok, müşteri bakiyesi ve tahsilat bilgilerinin defter ile farklı Excel dosyalarında dağınık tutulması.",
    solution: "Stok hareketleri, müşteri bakiyeleri ve tahsilat takibini tek arayüzde toplayan özel bir web uygulaması.",
    approach: "Next.js ve Supabase ile gerçek zamanlı veri yönetimi altyapısı kuruldu.",
    benefit: "Kimin ne kadar borcu var, depoda ne kaldı, bu ay ne toplandı sorularına tek ekrandan anlık cevap.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    features: [
      "Satış, tahsilat ve borç yönetim paneli",
      "Tek tıkla otomatik PDF hesap ekstresi üretimi",
      "WhatsApp üzerinden hızlı bakiye paylaşım akışı",
      "Kritik seviye uyarılı canlı stok takip ekranı",
    ],
    previewType: "stockapp",
    slug: "stockapp",
    caseSummary: "Stok ve cari hesap verisi defter ile Excel'de dağınık olan bir toptan ticaret işletmesi için özel bir web uygulaması geliştirildi. Hesap ekstresi hazırlama süresi 2 saatten 30 saniyeye indi; stok durumu ve müşteri bakiyeleri anlık takip edilebilir hale geldi.",
    targetUser: "Toptan veya perakende satış yapan, müşterilerine vadeli satış sunan KOBİ sahipleri ve yöneticileri",
    industry: "Toptan & Perakende Ticaret",
    role: "Kurucu & Baş Geliştirici",
    previousWorkflow: "Cari kayıtlar el yazısıyla defterde tutuluyor, tahsilat vadeleri takvimden manuel takip ediliyordu. Stok sayımları ise haftalık Excel tablolarıyla yapılıyordu.",
    clientTestimonial: {
      author: "StockApp Yöneticisi",
      role: "Kurucu",
      text: "Müşteri görüşü eklenecek."
    },
    caseModules: [
      {
        name: "Stok Yönetimi",
        features: ["Ürün giriş/çıkış kaydı", "Kritik stok seviye uyarısı", "Ürün geçmiş hareketleri"],
      },
      {
        name: "Cari Hesap",
        features: ["Müşteri bazlı bakiye takibi", "Satış ve ödeme geçmişi", "Vade takibi"],
      },
      {
        name: "Tahsilat",
        features: ["Ödeme kayıt ekranı", "Gecikmiş alacak bildirimleri", "Aylık tahsilat özeti"],
      },
      {
        name: "PDF Raporlama",
        features: ["Tek tıkla hesap ekstresi", "Stok durum raporu", "WhatsApp paylaşım akışı"],
      },
    ],
    userJourney: [
      "Yönetici paneline giriş yapar",
      "Günlük stok girişlerini kaydeder",
      "Müşteri satışını işler, cari hesap güncellenir",
      "Vadesi gelen tahsilat bildirimini görür",
      "Müşteriye PDF hesap ekstresi oluşturur ve WhatsApp'tan iletir",
      "Dashboard'da günlük tahsilat ve stok özetini inceler",
    ],
    outcomes: [
      "Hesap ekstresi hazırlama süresi 2 saatten 30 saniyeye indi",
      "Stok durumu ve müşteri bakiyeleri anlık görünür hale geldi",
      "Tahsilat takibi ve vade uyarıları sistem üzerinden otomatik yürütülüyor",
      "Tek tıkla PDF hesap ekstresi oluşturma ve WhatsApp paylaşım akışı",
    ],
    metrics: [
      { label: "Hesap ekstresi hazırlama", before: "~2 saat", after: "30 saniye" },
      { label: "Stok ve bakiye durumu", before: "Haftalık Excel", after: "Anlık ekran" },
    ],
    lessons: [
      "PDF oluşturma akışının mobil tarayıcıda da sorunsuz çalışması için ekstra test gerekti",
      "Kritik stok eşiğinin kullanıcı tarafından ayarlanabilir olması talep edildi ve eklendi",
    ],
    futureWork: [
      "Tedarikçi sipariş takibi modülü",
      "Barkod okuyucu ile stok girişi",
      "Çoklu depo desteği",
    ],
  },
  {
    name: "Hezer Auto Service",
    tagline: "Araç kabul, onarım ve oto servis operasyon sistemi",
    status: "Active",
    category: "customer-project",
    problem: "Araç kabul, onarım aşamaları ve müşteri geçmişinin kağıt ile sözlü iletişime dayanması.",
    solution: "Araç kabulünden teslime kadar tüm servis yaşam döngüsünü kayıt altına alan mobil uyumlu operasyon sistemi.",
    approach: "Atölye ve saha kullanımına uygun, hızlı ve mobil öncelikli Supabase entegrasyonu.",
    benefit: "Hangi aracın hangi aşamada olduğu, geçmişte ne yapıldığı tüm ekip tarafından anlık görülebilir.",
    tech: ["React Native", "Expo", "Supabase", "Playwright"],
    features: [
      "Adım adım araç kabul ve servis iş akışı",
      "Plaka bazlı kalıcı müşteri onarım geçmişi",
      "Saha personelinin kullanımı için özel mobil arayüzler",
      "Playwright ile uçtan uca (E2E) otomatik test akışları",
    ],
    previewType: "auto-service",
    slug: "hezer-auto-service",
    caseSummary: "Araç kabul ve onarım sürecini tamamen kağıt ve sözlü koordinasyondan dijitale taşıyan mobil öncelikli bir operasyon sistemi geliştirildi. Ekip, tüm iş emirlerini WhatsApp yerine sistem üzerinden yönetir hale geldi; araç servis geçmişine plaka ile saniyeler içinde ulaşılabilmektedir.",
    targetUser: "Servis danışmanları ve yöneticileri; müşteri kabulünden fatura kesimine kadar tüm servis sürecini takip eden personel",
    industry: "Otomotiv & Servis Hizmetleri",
    role: "Süreç Analisti & Geliştirici",
    previousWorkflow: "Müşteri kabul işlemleri kağıt formlarla yapılıyor, onarım durumları atölyedeki ustalarla sözlü olarak koordine ediliyordu. Müşteri geçmişi ancak eski fatura dosyalarından bulunabiliordu.",
    clientTestimonial: {
      author: "Serdar Hezer",
      role: "Sahibi, Hezer Otoşanzıman",
      text: "Artık borç takibini rahatça yapabiliyorum, gelir-giderimi anlık görebiliyorum. İşimi gerçekten kolaylaştırdı, çok pratik oldu. Geçen gün bir aracı teslim ederken müşteriye direkt PDF hesap ekstresi gönderdim — hem zamandan kazandım hem de dükkâna gerçek anlamda oturmuş bir sistemim oldu.",
    },
    caseModules: [
      {
        name: "Araç Kabul",
        features: ["Plaka ve müşteri kaydı", "Araç fotoğraf belgesi", "Kabul notu ve şikayet tanımı"],
      },
      {
        name: "İş Emri Takibi",
        features: ["Adım adım onarım durumu", "Usta ataması", "Tamamlama onayı"],
      },
      {
        name: "Müşteri ve Araç Geçmişi",
        features: ["Plaka bazlı servis geçmişi", "Önceki onarım notları", "Müşteri iletişim bilgileri"],
      },
      {
        name: "Test Altyapısı",
        features: ["Playwright ile E2E test süiti", "Kritik akış otomasyonu", "Regresyon testi"],
      },
    ],
    userJourney: [
      "Servis danışmanı aracı sisteme kaydeder",
      "Şikayet ve talep notu girilir",
      "İş emri oluşturulur, ustaya atanır",
      "Usta onarım adımlarını tamamladıkça durumu günceller",
      "Danışman teslim onayı verir",
      "Araç geçmişi kalıcı olarak sistemde saklanır",
    ],
    outcomes: [
      "Araç ve onarım geçmişinin kağıtsız ve merkezi olarak tutulması",
      "İş emrinin kim tarafından, hangi aşamada olduğunun her an görülebilmesi",
      "Süreç durumlarının müşteri ve ekip için daha görünür hale gelmesini destekleyen yapı",
      "İşlem sonunda müşteriye anında PDF servis raporu gönderilebiliyor",
    ],
    metrics: [
      { label: "Müşteriye servis raporu", before: "Kağıt form", after: "Anında PDF" },
      { label: "Araç geçmişine erişim", before: "Eski fatura dosyaları", after: "Plaka ile saniyeler" },
    ],
    lessons: [
      "Saha personelinin tablet ile hızlı veri girişi yapabilmesi için form tasarımı sadeleştirildi",
      "E2E test süiti kritik akışlardaki regresyonları erken yakaladı",
    ],
    futureWork: [
      "SMS ile müşteri bilgilendirme",
      "Parça ve malzeme maliyet takibi",
      "Fatura ve tahsilat modülü",
    ],
  },
  {
    name: "Hezer Otoşanzıman",
    tagline: "Oto Servis Kurumsal Web Sitesi",
    status: "Active",
    category: "customer-project",
    problem: "Hezer Otoşanzıman'ın dijital varlığı yoktu; potansiyel müşteriler servisi bulamıyor, mevcut müşteriler ise işletmenin güvenilirliğini teyit edecek bir kaynak arayıyordu.",
    solution: "Servis uzmanlığını, hizmet kapsamını ve iletişim bilgilerini ön plana çıkaran dönüşüm odaklı kurumsal web sitesi.",
    approach: "Mobil öncelikli, hızlı açılan ve arama motorlarında yerel aramalarda öne çıkacak teknik altyapıyla tasarlandı.",
    benefit: "Potansiyel müşteriler artık servisi çevrimiçi buluyor ve ilk temastan önce güven oluşturuluyor.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    features: [
      "Yerel SEO optimizasyonlu kurumsal tanıtım sayfası",
      "Hizmet kapsamı ve uzmanlık alanları bölümü",
      "Mobil uyumlu hızlı iletişim ve yönlendirme yapısı",
    ],
    previewType: "auto-service",
    slug: "hezer-otosanziman-site",
    caseSummary: "Hezer Otoşanzıman için kurumsal web sitesi tasarlandı ve geliştirildi. Servis uzmanlığını ve iletişim bilgilerini öne çıkaran, yerel SEO optimize edilmiş bu site potansiyel müşterilerin işletmeyi çevrimiçi bulmasını sağlıyor.",
    targetUser: "Otoşanzıman servisi arayan yerel araç sahipleri",
    industry: "Otomotiv & Servis Hizmetleri",
    role: "Web Tasarımcı & Geliştirici",
    previousWorkflow: "İşletmenin hiçbir dijital varlığı yoktu. Müşteriler yalnızca ağızdan ağıza tavsiyeyle ulaşabiliyordu.",
    clientTestimonial: {
      author: "Serdar Hezer",
      role: "Sahibi, Hezer Otoşanzıman",
      text: "Artık borç takibini rahatça yapabiliyorum, gelir-giderimi anlık görebiliyorum. İşimi gerçekten kolaylaştırdı, çok pratik oldu. Geçen gün bir aracı teslim ederken müşteriye direkt PDF hesap ekstresi gönderdim — hem zamandan kazandım hem de dükkâna gerçek anlamda oturmuş bir sistemim oldu.",
    },
    caseModules: [
      {
        name: "Kurumsal Tanıtım",
        features: ["Servis uzmanlığı ve hizmet kapsamı", "Takım ve deneyim sunumu", "Sosyal kanıt ve müşteri yorumları"],
      },
      {
        name: "Yerel SEO Altyapısı",
        features: ["Google Business Profile entegrasyonu", "Yerel arama optimizasyonu", "Schema markup ve meta yapısı"],
      },
      {
        name: "İletişim & Dönüşüm",
        features: ["Hızlı iletişim CTA'ları", "WhatsApp yönlendirme", "Mobil uyumlu harita entegrasyonu"],
      },
    ],
    userJourney: [
      "Potansiyel müşteri Google'da 'İzmir otoşanzıman servisi' arar",
      "Hezer Otoşanzıman web sitesini bulur",
      "Hizmetleri ve uzmanlığı inceler",
      "WhatsApp veya telefon ile iletişime geçer",
    ],
    outcomes: [
      "İşletme artık çevrimiçi bulunabilir ve yerel aramalarda görünür",
      "Potansiyel müşteriler ilk temas öncesinde güven oluşturabilir",
      "Mevcut müşteriler servisi kolayca tavsiye edebilir",
    ],
  },
  {
    name: "CARPASS",
    tagline: "Araç geçmişi ve yapay zekâ destekli risk analiz platformu",
    status: "In Development",
    category: "product-lab",
    problem: "İkinci el araç alımında güvenilir, tek merkezden yönetilen şeffaf bir geçmiş bilgisinin olmaması.",
    solution: "Araç verilerini toplayıp analiz eden ve yapay zekâ ile risk skoruna dönüştüren SaaS platformu.",
    approach: "Multi-tenant mimaride n8n otomasyonları ve yapay zekâ ajanları entegre edildi.",
    benefit: "Alıcı için şeffaflık, satıcı için güvenilir belge; ölçeklenebilir bir abonelik ürünü.",
    tech: ["React Native", "Supabase", "n8n", "AI Agents"],
    features: [
      "Yapay zekâ destekli Güven Raporu ve Risk Skoru",
      "Freemium abonelik ve faturalandırma altyapısı",
      "n8n ile otomatik veri toplama iş akışları",
      "Modern mobil arayüzler ve responsive web portalı",
    ],
    previewType: "carpass",
    slug: "carpass",
    caseSummary: "İkinci el araç alımında güvenilir bir kaynak eksikliğini gidermek için araç geçmişini toplayıp yapay zeka ile yorumlayan ve kullanıcıya risk skoru ile Trust Report sunan SaaS platform mimarisi tasarlandı ve geliştirme süreci devam ediyor.",
    targetUser: "İkinci el araç alıcıları ve bayiler; güvenilir araç geçmişine ihtiyaç duyan bireyler ve kurumsal alıcılar",
    caseModules: [
      {
        name: "Trust Report ve Risk Skoru",
        features: ["AI destekli risk analizi", "Hasar ve muayene verisi yorumlama", "Kullanıcıya sade rapor sunumu"],
      },
      {
        name: "SaaS ve Abonelik Altyapısı",
        features: ["Freemium plan yönetimi", "Ödeme ve fatura altyapısı", "Kullanım limiti takibi"],
      },
      {
        name: "n8n Otomasyon Akışları",
        features: ["Veri toplama otomasyonları", "Rapor üretim tetikleyicileri", "Hata yönetimi ve loglama"],
      },
      {
        name: "Mobil ve Web Arayüzü",
        features: ["React Native mobil uygulama", "Responsive web portalı", "Kullanıcı yönetim paneli"],
      },
    ],
    userJourney: [
      "Kullanıcı plaka numarasını girerek sorgu başlatır",
      "n8n iş akışı veri kaynaklarından araç bilgisini toplar",
      "AI modeli risk skorunu hesaplar",
      "Kullanıcıya Trust Report sunulur",
      "Premium kullanıcı tam rapor detaylarına erişir",
      "Abonelik yönetimini kullanıcı panelinden yapar",
    ],
    outcomes: [
      "İkinci el araç alıcılarına saniyeler içinde güvenilir risk analizi",
      "Platform sahibi için tekrar eden abonelik geliri modeli",
      "Ölçeklenebilir SaaS altyapısı üzerine kurulu sürdürülebilir ürün",
    ],
    lessons: [
      "AI prompt tasarımının tutarlı çıktı için iteratif test gerektirdiği görüldü",
      "Multi-tenant veri izolasyonunun baştan doğru kurulmasının sonraki geliştirmeleri hızlandırdığı anlaşıldı",
    ],
    futureWork: [
      "Bayi API entegrasyonu",
      "Karşılaştırmalı araç analizi",
      "Beyaz etiket (white-label) lisanslama",
    ],
  },
  {
    name: "SaaS Infrastructures",
    tagline: "Aboneliğe hazır çok-kiracılı (multi-tenant) yazılım altyapısı",
    status: "Planned",
    category: "concept-work",
    problem: "Tek bir şirket için kurulan iş takip sistemlerinin, aynı ihtiyacı olan diğer firmalara satılamaması.",
    solution: "Özel sistemleri çok-kiracılı (multi-tenant) ve abonelik modeline hazır SaaS ürünlerine dönüştüren mimari.",
    approach: "Var olan sistemlerin ortak çekirdeğini tenant yapısına uygun biçimde ürünleştirmek.",
    benefit: "Bir kez kurulan sistemin, dünya genelinde yüzlerce işletmeye kiralanabilir hale gelmesi.",
    tech: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
    features: [
      "Abonelik planları ve Stripe faturalandırma yönetimi",
      "Rol bazlı yetkilendirme ve kullanıcı yönetim yapısı",
      "Kiracılar (tenants) arasında izole edilmiş güvenli veri havuzları",
      "Geliştirilebilir ve ölçeklenebilir bulut mimarisi tasarımı",
    ],
    previewType: "business-dashboard",
    slug: "saas-operasyon-altyapisi",
    caseSummary: "Şirket içi çözülen bir operasyon problemini diğer firmalara satılabilir abonelik ürüne dönüştürmek isteyen işletmeler için multi-tenant SaaS mimari tasarımı ve altyapı kurulum şeması.",
    targetUser: "Sektörel bir problemi çözen iç sistemi olan ve bunu abonelik modeline dönüştürmek isteyen KOBİ'ler ve girişimciler",
    caseModules: [
      {
        name: "Multi-Tenant Mimari",
        features: ["Kiracı izolasyonu ve veri güvenliği", "Paylaşımlı altyapı yönetimi", "Tenant yönetim paneli"],
      },
      {
        name: "Abonelik ve Faturalandırma",
        features: ["Plan ve limit yönetimi", "Stripe entegrasyonu", "Fatura ve ödeme geçmişi"],
      },
      {
        name: "Kullanıcı ve Rol Yönetimi",
        features: ["Rol bazlı erişim kontrolü (RBAC)", "Ekip daveti sistemi", "Süper admin paneli"],
      },
      {
        name: "Ürün Altyapısı",
        features: ["API tasarımı ve webhook desteği", "Ölçeklenebilir veritabanı yapısı", "Audit log ve izleme"],
      },
    ],
    userJourney: [
      "İşletme sahibi SaaS ürün fikrini ve mevcut iç sistemi paylaşır",
      "Kapsam ve mimari tasarım netleştirilir",
      "Multi-tenant altyapı kurulur",
      "Abonelik ve faturalandırma modülü entegre edilir",
      "İlk müşteri (tenant) sisteme alınır",
      "Ürün büyüdükçe yeni modüller sisteme eklenir",
    ],
    outcomes: [
      "Güvenli ve izole edilmiş çok-kiracılı yapı",
      "Tekrar eden abonelik geliri sağlayan ölçeklenebilir ürün",
      "İşletme büyüdükçe dayanıklı kalan teknik temel",
    ],
    lessons: [
      "Tenant izolasyonunun mimari düzeyde baştan kurulmasının sonraki veri sızıntısı riskini ortadan kaldırdığı görüldü",
      "Abonelik planlarının esnek tutulmasının farklı müşteri segmentlerine hitap etmeyi kolaylaştırdığı anlaşıldı",
    ],
    futureWork: [
      "Beyaz etiket (white-label) tema desteği",
      "Kullanım bazlı fiyatlandırma (usage-based billing)",
      "Self-servis onboarding akışı",
    ],
  },
  {
    name: "Albanexa Personal Brand Site",
    tagline: "Kişisel marka ve stüdyo konumlandırması için çok sayfalı web sitesi",
    status: "Active",
    category: "internal-project",
    problem: "Mert Alban'ın geliştirdiği projeleri ve sunduğu hizmetleri net anlatan, müşteriyi ikna eden ve iletişime yönlendiren bir web varlığı yoktu.",
    solution: "Hizmet kategorileri, proje vaka çalışmaları, çalışma süreci ve iletişim akışını ayrı sayfalarda toplayan; 3D Spline robot ve Framer Motion animasyonlarıyla güçlendirilmiş çok sayfalı kişisel marka sitesi.",
    approach: "Bilgi mimarisi müşteri karar yolculuğuna göre tasarlandı. Her sayfa tek bir amaca hizmet edecek şekilde ayrıştırıldı; ana sayfa özet ve yönlendirme merkezi olarak konumlandırıldı.",
    benefit: "Ziyaretçi siteye girdiğinde kim olduğunu, hangi problemleri çözdüğünü ve nasıl çalışıldığını ilk birkaç saniyede anlayabiliyor.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Spline 3D"],
    features: [
      "Çok sayfalı bilgi mimarisi ve navigasyon sistemi",
      "Spline 3D robot ile interaktif hero deneyimi",
      "Framer Motion scroll reveal ve parallax animasyonlar",
      "Proje vaka çalışmaları (problem → çözüm → fayda yapısı)",
      "Çözüm kategorileri ve hizmet sayfaları",
      "TR / EN / DE çok dilli içerik desteği",
      "Responsive tasarım ve mobil menü",
      "SEO metadata, sitemap ve robots.txt",
    ],
    previewType: "personal-brand",
    slug: "personal-brand-site",
    caseSummary: "Mert Alban'ın geliştirdiği dijital çözümleri ve sunduğu hizmetleri profesyonel biçimde anlatan, müşteriyi doğru hizmete yönlendiren kişisel marka ve stüdyo sitesi.",
    targetUser: "Özel iş takip sistemi, web uygulaması, web sitesi veya SaaS ürünü yaptırmayı düşünen KOBİ sahipleri ve girişimciler",
    caseModules: [
      {
        name: "Bilgi Mimarisi",
        features: ["Müşteri yolculuğuna göre sayfa yapısı", "Çözüm kategorileri", "Proje vaka çalışmaları"],
      },
      {
        name: "3D ve Animasyon",
        features: ["Spline robot hero", "Scroll reveal animasyonlar", "Parallax efektleri"],
      },
      {
        name: "İçerik Sistemi",
        features: ["Locale tabanlı çok dilli içerik", "Data-driven proje sayfaları", "Çözüm detay sayfaları"],
      },
      {
        name: "Teknik Altyapı",
        features: ["Next.js App Router", "Tailwind CSS 4 design tokens", "Framer Motion animasyon sistemi"],
      },
    ],
    userJourney: [
      "Ziyaretçi Hero'da kim olduğumu ve ne yaptığımı görür",
      "Problem/çözüm bölümünde kendi sorununu tanır",
      "Çözümler sayfasında ilgili hizmet kategorisini inceler",
      "Projeler bölümünde gerçek örnekleri vaka çalışması olarak okur",
      "Süreç sayfasında nasıl çalışıldığını anlar",
      "İletişim sayfasından proje görüşmesi başlatır",
    ],
    outcomes: [
      "Hizmetlerin net ve ayrışık biçimde sunulması",
      "Proje kanıtlarının vaka çalışması formatında sunulması",
      "Müşterinin doğru hizmet kategorisini bulabilmesi",
      "İletişim ve teklif taleplerinin artması",
    ],
    lessons: [
      "PDF oluşturma akışının mobil tarayıcıda da sorunsuz çalışması için ekstra test gerekti",
      "Kritik stok eşiğinin kullanıcı tarafından ayarlanabilir olması talep edildi ve eklendi",
    ],
    futureWork: [
      "Blog ve içerik alanı",
      "İletişim formu backend entegrasyonu",
      "Hizmet bazlı landing page'ler",
    ],
  },
];

export const projectsEn: Project[] = [
  {
    name: "StockApp",
    tagline: "Inventory, finance, and receivables tracking system",
    status: "Active",
    category: "customer-project",
    problem: "Inventory and customer debt data is scattered between notebooks and Excel, leading to missed collections.",
    solution: "A custom web application that combines stock movements, client balances, and collection tracking into a single interface.",
    approach: "Built with Next.js and Supabase for a real-time data management infrastructure.",
    benefit: "Instant answers on who owes what, what is in stock, and what was collected this month from a single screen.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    features: [
      "Sales, collection, and receivables dashboard",
      "One-click automated PDF account statement generation",
      "Quick balance sharing flow via WhatsApp",
      "Live stock tracking screen with critical level warnings",
    ],
    previewType: "stockapp",
    slug: "stockapp",
    caseSummary: "A custom web application was developed for a business with scattered inventory and current account data in notebooks and Excel, bringing stock movements, client balances, and collection tracking into a single interface.",
    targetUser: "SME owners and managers selling wholesale or retail and offering vadeli (deferred) sales to clients",
    industry: "Wholesale & Retail Trade",
    role: "Founder & Lead Developer",
    previousWorkflow: "Current accounts were kept by hand in notebooks, and collections were tracked manually on calendars. Stock counts were updated weekly using Excel sheets.",
    clientTestimonial: {
      author: "StockApp Manager",
      role: "Founder",
      text: "Customer testimonial to be added."
    },
    caseModules: [
      {
        name: "Inventory Management",
        features: ["Product entry/exit records", "Critical stock level warnings", "Product historical movements"],
      },
      {
        name: "Current Accounts",
        features: ["Client-based balance tracking", "Sales and payment history", "Due date tracking"],
      },
      {
        name: "Collections",
        features: ["Payment record screen", "Overdue receivables notifications", "Monthly collection summary"],
      },
      {
        name: "PDF Reporting",
        features: ["One-click account statement", "Stock status report", "WhatsApp sharing workflow"],
      },
    ],
    userJourney: [
      "User logs into the manager panel",
      "Records daily stock entries",
      "Processes client sales, updating current account balance",
      "Sees due collection notifications on the dashboard",
      "Generates PDF account statement and sends it via WhatsApp",
      "Reviews daily collections and stock status summary on dashboard",
    ],
    outcomes: [
      "Instant stock level visibility",
      "Client balances accessible from any device at any time",
      "Collection tracking managed systematically",
      "One-click PDF account statement generation workflow",
    ],
    metrics: [
      { label: "Account statement preparation", before: "~2 hours", after: "30 seconds" },
      { label: "Stock & balance status", before: "Weekly Excel", after: "Live dashboard" },
    ],
    lessons: [
      "PDF generation workflow required extra testing to work flawlessly on mobile browsers",
      "Critical stock threshold was requested to be user-adjustable and added accordingly",
    ],
    futureWork: [
      "Supplier order tracking module",
      "Barcode reader integration for stock entry",
      "Multi-warehouse support",
    ],
  },
  {
    name: "Hezer Auto Service",
    tagline: "Vehicle intake, repair, and auto service operations system",
    status: "Active",
    category: "customer-project",
    problem: "Tracking serviced vehicles, repair processes, and client history relies entirely on paper and oral communication.",
    solution: "A mobile-friendly operations system logging the entire service lifecycle from vehicle intake to delivery.",
    approach: "Fast, mobile-first Supabase integration optimized for field and shop use.",
    benefit: "Vehicle history and repair stages are instantly visible to the entire shop team.",
    tech: ["React Native", "Expo", "Supabase", "Playwright"],
    features: [
      "Step-by-step vehicle intake and service workflow",
      "Permanent license-plate based customer repair history",
      "Custom mobile interfaces optimized for shop technicians",
      "E2E automated testing pipeline with Playwright",
    ],
    previewType: "auto-service",
    slug: "hezer-auto-service",
    caseSummary: "A mobile-friendly operations system was developed to record all process steps from vehicle intake to delivery for an auto service business where vehicle intake, repair tracking, and customer history relied on paper and oral communication.",
    targetUser: "Service advisors and managers tracking the entire service flow from intake to invoicing",
    industry: "Automotive & Service Industry",
    role: "Process Analyst & Developer",
    previousWorkflow: "Vehicle intake was done using paper forms, and repair status was coordinated verbally with technicians. Service histories could only be found by digging through physical invoice folders.",
    clientTestimonial: {
      author: "Serdar Hezer",
      role: "Owner, Hezer Otoşanzıman",
      text: "I can now easily track debts and see my income and expenses in real time. It really made my job easier and it's very practical. The other day when I handed over a vehicle, I sent the customer a PDF account statement directly — I saved time and now I truly have a proper system running in my shop.",
    },
    caseModules: [
      {
        name: "Vehicle Intake",
        features: ["License plate and client registration", "Vehicle photo documentation", "Intake notes and complaint definition"],
      },
      {
        name: "Work Order Tracking",
        features: ["Step-by-step repair status", "Technician assignment", "Completion approval"],
      },
      {
        name: "Client & Vehicle History",
        features: ["License plate-based service history", "Previous repair notes", "Client contact information"],
      },
      {
        name: "Testing Infrastructure",
        features: ["E2E test suite with Playwright", "Critical flow automation", "Regression testing"],
      },
    ],
    userJourney: [
      "Service advisor registers the vehicle into the system",
      "Enters complaints and request notes",
      "Creates work order and assigns it to a technician",
      "Technician updates repair steps as they complete them",
      "Advisor signs off on completion and delivery",
      "Vehicle history is stored permanently in the cloud",
    ],
    outcomes: [
      "Vehicle and repair history kept paperless and centralized",
      "Work order status and assignment visible at any moment",
      "Improved visibility of process stages for both the team and customers",
      "PDF service report sent to customer instantly at end of each service",
    ],
    metrics: [
      { label: "Service report delivery", before: "Paper form", after: "Instant PDF" },
      { label: "Vehicle history access", before: "Old invoice files", after: "Plate → seconds" },
    ],
    lessons: [
      "Form design was simplified to allow fast data entry by field technicians on tablets",
      "E2E test suite caught regressions early in critical flows",
    ],
    futureWork: [
      "SMS notification system for clients",
      "Parts and material cost tracking",
      "Billing and invoicing module",
    ],
  },
  {
    name: "Hezer Otoşanzıman",
    tagline: "Auto Service Corporate Website",
    status: "Active",
    category: "customer-project",
    problem: "Hezer Otoşanzıman had no digital presence; potential customers couldn't find the shop online and had no way to verify its credibility before visiting.",
    solution: "A conversion-focused corporate website showcasing the shop's expertise, service scope, and contact information.",
    approach: "Mobile-first, fast-loading design with local SEO technical foundation to rank in local searches.",
    benefit: "Potential customers now find the shop online and trust is established before the first contact.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    features: [
      "Local SEO-optimized corporate presentation",
      "Service scope and expertise sections",
      "Mobile-friendly fast contact and navigation structure",
    ],
    previewType: "auto-service",
    slug: "hezer-otosanziman-site",
    caseSummary: "A corporate website was designed and developed for Hezer Otoşanzıman, an auto transmission service shop. The site showcases the shop's expertise and enables customers to find the business in local search results.",
    targetUser: "Local vehicle owners searching for transmission repair services",
    industry: "Automotive & Service Industry",
    role: "Web Designer & Developer",
    previousWorkflow: "The business had zero digital presence. Customers could only reach them through word-of-mouth referrals.",
    clientTestimonial: {
      author: "Serdar Hezer",
      role: "Owner, Hezer Otoşanzıman",
      text: "I can now easily track debts and see my income and expenses in real time. It really made my job easier and it's very practical. The other day when I handed over a vehicle, I sent the customer a PDF account statement directly — I saved time and now I truly have a proper system running in my shop."
    },
    caseModules: [
      {
        name: "Corporate Presentation",
        features: ["Service expertise and scope", "Team and experience showcase", "Social proof and customer reviews"],
      },
      {
        name: "Local SEO Infrastructure",
        features: ["Google Business Profile integration", "Local search optimization", "Schema markup and meta structure"],
      },
      {
        name: "Contact & Conversion",
        features: ["Fast contact CTAs", "WhatsApp redirect", "Mobile-friendly map integration"],
      },
    ],
    userJourney: [
      "Potential customer searches 'İzmir transmission service' on Google",
      "Finds the Hezer Otoşanzıman website in local results",
      "Reviews services and expertise sections",
      "Contacts via WhatsApp or phone",
    ],
    outcomes: [
      "Business is now discoverable online and visible in local searches",
      "Potential customers can establish trust before first contact",
      "Existing customers can easily refer the shop to others",
    ],
  },
  {
    name: "CARPASS",
    tagline: "Vehicle history and AI-driven risk analysis platform",
    status: "In Development",
    category: "product-lab",
    problem: "Lack of a reliable, centralized, and transparent history source for used vehicles.",
    solution: "A SaaS platform aggregating vehicle data and converting it into a risk score via AI.",
    approach: "Integrated n8n automations and AI agents on a multi-tenant architecture.",
    benefit: "Transparency for the buyer, a reliable document for the seller; a scalable subscription product.",
    tech: ["React Native", "Supabase", "n8n", "AI Agents"],
    features: [
      "AI-powered Trust Report and Risk Score",
      "Freemium subscription and billing infrastructure",
      "n8n workflows for automated data aggregation",
      "Modern mobile UI and responsive web portal",
    ],
    previewType: "carpass",
    slug: "carpass",
    caseSummary: "To address the lack of a reliable source in used vehicle purchases, a SaaS platform architecture was designed to collect vehicle history, interpret it with AI, and present a Risk Score and Trust Report to the user.",
    targetUser: "Used car buyers and dealers needing reliable vehicle history; individuals and corporate buyers",
    caseModules: [
      {
        name: "Trust Report & Risk Score",
        features: ["AI-backed risk analysis", "Damage and inspection data interpretation", "Clean report presentation to the user"],
      },
      {
        name: "SaaS & Billing Infrastructure",
        features: ["Freemium plan management", "Payment and invoicing system", "Usage limits tracking"],
      },
      {
        name: "n8n Automation Flows",
        features: ["Data aggregation automations", "Report generation triggers", "Error handling and logging"],
      },
      {
        name: "Mobile & Web Interface",
        features: ["React Native mobile app", "Responsive web portal", "User management panel"],
      },
    ],
    userJourney: [
      "User enters plate number to start query",
      "n8n workflow aggregates vehicle data from sources",
      "AI model calculates risk score",
      "Trust Report is presented to the user",
      "Premium user accesses full report details",
      "Subscription management handled via user panel",
    ],
    outcomes: [
      "Reliable risk analysis provided to used car buyers in seconds",
      "Recurring subscription revenue model for the platform owner",
      "Sustainable product built on a scalable SaaS infrastructure",
    ],
    lessons: [
      "Iterative testing was crucial for consistent AI prompt outputs",
      "Correct setup of multi-tenant data isolation early accelerated later development",
    ],
    futureWork: [
      "Dealer API integration",
      "Comparative vehicle analysis",
      "White-label licensing models",
    ],
  },
  {
    name: "SaaS Infrastructures",
    tagline: "Subscription-ready multi-tenant software architecture",
    status: "Planned",
    category: "concept-work",
    problem: "Bespoke tracking systems built for a single company fail to scale to other businesses with similar needs.",
    solution: "An architecture turning bespoke systems into multi-tenant, subscription-based SaaS products.",
    approach: "Productizing the common core of existing systems using tenant-based cloud databases.",
    benefit: "A system built once can serve hundreds of businesses globally as a subscription model.",
    tech: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
    features: [
      "Subscription plans and Stripe billing management",
      "Role-based access control and user authorization scheme",
      "Isolated data environments for kiracılar (tenants)",
      "Scalable and modular cloud database design",
    ],
    previewType: "business-dashboard",
    slug: "saas-operasyon-altyapisi",
    caseSummary: "Multi-tenant SaaS architecture design and infrastructure setup blueprint for businesses wanting to turn an in-house operations system into a salable subscription-based product.",
    targetUser: "SMEs and entrepreneurs with an in-house tool solving a niche problem, wanting to productize it",
    caseModules: [
      {
        name: "Multi-Tenant Architecture",
        features: ["Tenant isolation and data security", "Shared infrastructure management", "Tenant admin dashboard"],
      },
      {
        name: "Subscription & Billing",
        features: ["Plan and limit management", "Stripe integration", "Invoice and payment history"],
      },
      {
        name: "User & Role Management",
        features: ["Role-based access control (RBAC)", "Team invitation system", "Super admin panel"],
      },
      {
        name: "Product Backbone",
        features: ["API design and webhook support", "Scalable database structure", "Audit log and monitoring"],
      },
    ],
    userJourney: [
      "Business owner shares SaaS product idea and current internal tool",
      "Scope and architecture design are finalized",
      "Multi-tenant infrastructure is set up",
      "Subscription and billing module is integrated",
      "First customer (tenant) onboarded to the system",
      "New features and modules added as the product grows",
    ],
    outcomes: [
      "Secure and isolated multi-tenant environment",
      "Scalable SaaS billing model providing recurring revenue",
      "Durable technical foundation built to scale",
    ],
    lessons: [
      "Setting up tenant isolation at the database level early eliminates later data leak risks",
      "Flexible subscription plans make it easier to address different client segments",
    ],
    futureWork: [
      "White-label theme support",
      "Usage-based billing",
      "Self-service onboarding flow",
    ],
  },
  {
    name: "Albanexa Personal Brand Site",
    tagline: "Multi-page website for personal branding and studio positioning",
    status: "Active",
    category: "internal-project",
    problem: "Mert Alban lacked a web presence that clearly explained his developed projects, services, and converted visitors.",
    solution: "A multi-page website separating services, case studies, process, and contact, powered by 3D Spline and Framer Motion.",
    approach: "Information architecture mapped to client decision journey, separating pages for distinct focus with homepage as index.",
    benefit: "Visitors instantly understand who he is, what problems he solves, and how he works within seconds.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Spline 3D"],
    features: [
      "Multi-page information architecture and navigation",
      "Interactive Spline 3D robot hero experience",
      "Framer Motion scroll reveal and parallax animations",
      "Project case studies (problem → solution → benefit structure)",
      "Solution categories and distinct service pages",
      "TR / EN / DE multi-lingual support",
      "Responsive layout and mobile navigation menu",
      "SEO metadata, sitemap, and robots.txt",
    ],
    previewType: "personal-brand",
    slug: "personal-brand-site",
    caseSummary: "A personal brand and studio website clearly explaining Mert Alban's digital solutions and services, directing clients to the correct service pipeline.",
    targetUser: "SME owners and entrepreneurs considering custom workflow tools, web applications, or SaaS products",
    caseModules: [
      {
        name: "Information Architecture",
        features: ["Decision journey-based page structure", "Solution categories", "Project case studies"],
      },
      {
        name: "3D & Animation",
        features: ["Spline robot hero", "Scroll reveal animations", "Parallax effects"],
      },
      {
        name: "Content System",
        features: ["Locale-based multilingual content", "Data-driven project pages", "Service detail subpages"],
      },
      {
        name: "Technical Stack",
        features: ["Next.js App Router", "Tailwind CSS 4 design tokens", "Framer Motion animation system"],
      },
    ],
    userJourney: [
      "Visitor sees who I am and what I do in the Hero section",
      "Identifies their own business issues in the bottlenecks area",
      "Explores specific service category in solutions page",
      "Reads real case studies in the portfolio section",
      "Understands the engagement process in the timeline area",
      "Starts a project conversation via the contact form",
    ],
    outcomes: [
      "Services presented in a clean, distinct layout",
      "Project proofs structured in a proper case-study format",
      "Visitors easily finding their matching service category",
      "Increase in booking and proposal inquiries",
    ],
    lessons: [
      "Extra testing was needed for PDF generation workflows on mobile screens",
      "Critical stock threshold was made user-configurable based on feedback",
    ],
    futureWork: [
      "Blog and resources section",
      "Contact form backend integrations",
      "Service-specific landing pages",
    ],
  },
];

export const projectsDe: Project[] = [
  {
    name: "StockApp",
    tagline: "System zur Verfolgung von Lagerbeständen, Finanzen und Einnahmen",
    status: "Active",
    category: "customer-project",
    problem: "Lagerbestands- und Kundenschuldendaten sind über Notizbücher und Excel verstreut, was zu verpassten Einnahmen führt.",
    solution: "Eine maßgeschneiderte Webanwendung, die Lagerbewegungen, Kundensalden und Einnahmenverfolgung zusammenführt.",
    approach: "Aufgebaut mit Next.js und Supabase für eine Echtzeit-Datenverwaltung.",
    benefit: "Sofortige Antworten darauf, wer was schuldet, was auf Lager ist und was diesen Monat eingenommen wurde, auf einem Bildschirm.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    features: [
      "Dashboard für Verkäufe, Einnahmen und Außenstände",
      "Automatische PDF-Kontoauszugserstellung mit einem Klick",
      "Schnelles Teilen von Kontoständen über WhatsApp",
      "Live-Lagerüberwachungsbildschirm mit Warnungen bei kritischem Bestand",
    ],
    previewType: "stockapp",
    slug: "stockapp",
    caseSummary: "Für ein Unternehmen mit verstreuten Lager- und Kontokorrentdaten in Notizbüchern und Excel wurde eine Webanwendung entwickelt, die alle Bewegungen in einer einzigen Oberfläche zusammenführt.",
    targetUser: "KMU-Inhaber und Manager, die Groß- oder Einzelhandel betreiben und ihren Kunden Zahlungsziele anbieten",
    industry: "Groß- & Einzelhandel",
    role: "Gründer & Hauptentwickler",
    previousWorkflow: "Cari-Konten wurden handschriftlich in Heften geführt, Zahlungsfristen manuell im Kalender überwacht. Bestände wurden wöchentlich mit Excel erfasst.",
    clientTestimonial: {
      author: "StockApp-Manager",
      role: "Gründer",
      text: "Kundenbewertung wird hinzugefügt."
    },
    caseModules: [
      {
        name: "Lagerverwaltung",
        features: ["Produkt-Ein-/Ausgangsprotokolle", "Kritische Bestandswarnungen", "Historische Produktbewegungen"],
      },
      {
        name: "Kontoauszug",
        features: ["Kundenbasierte Saldenverfolgung", "Verkaufs- und Zahlungsverlauf", "Fälligkeitsverfolgung"],
      },
      {
        name: "Einnahmen",
        features: ["Zahlungserfassungsbildschirm", "Benachrichtigungen über überfällige Forderungen", "Monatliche Einnahmenübersicht"],
      },
      {
        name: "PDF-Berichte",
        features: ["Kontoauszug mit einem Klick", "Bestandsstatusbericht", "WhatsApp-Freigabe-Workflow"],
      },
    ],
    userJourney: [
      "Benutzer meldet sich im Manager-Panel an",
      "Erfasst tägliche Lagerbuchungen",
      "Verarbeitet Kundenverkäufe und aktualisiert den Kontostand",
      "Sieht fällige Zahlungsmeldungen auf dem Dashboard",
      "Erstellt einen PDF-Kontoauszug und sendet ihn per WhatsApp",
      "Überprüft die täglichen Einnahmen und die Lagerübersicht auf dem Dashboard",
    ],
    outcomes: [
      "Sofortige Bestandsprüfung",
      "Kundensalden jederzeit abrufbar",
      "Einnahmenverfolgung über das System abgewickelt",
      "PDF-Kontoauszugserstellung per Mausklick",
    ],
    metrics: [
      { label: "Kontoauszug erstellen", before: "~2 Stunden", after: "30 Sekunden" },
      { label: "Lager- & Saldostatus", before: "Wöchentliches Excel", after: "Live-Dashboard" },
    ],
    lessons: [
      "Der PDF-Erstellungs-Workflow erforderte zusätzliche Tests, um auf mobilen Browsern einwandfrei zu funktionieren",
      "Der kritische Bestandsschwellenwert wurde als vom Benutzer anpassbar angefordert und hinzugefügt",
    ],
    futureWork: [
      "Lieferantenbestellungsverfolgungsmodul",
      "Bestandserfassung per Barcodeleser",
      "Unterstützung für mehrere Lager",
    ],
  },
  {
    name: "Hezer Auto Service",
    tagline: "Fahrzeugannahme, Reparatur und Autoservice-Betriebssystem",
    status: "Active",
    category: "customer-project",
    problem: "Die Verfolgung von Servicefahrzeugen, Reparaturprozessen und Kundenhistorien beruht vollständig auf Papier und mündlicher Kommunikation.",
    solution: "Ein mobiles Betriebssystem, das den gesamten Service-Lebenszyklus von der Fahrzeugannahme bis zur Auslieferung aufzeichnet.",
    approach: "Schnelle, mobile-first Supabase-Integration, optimiert für den Einsatz in Werkstätten und vor Ort.",
    benefit: "Fahrzeughistorie und Reparaturstatus sind sofort für das gesamte Team sichtbar.",
    tech: ["React Native", "Expo", "Supabase", "Playwright"],
    features: [
      "Schritt-für-Schritt-Fahrzeugannahme und Service-Workflow",
      "Dauerhafte, kennzeichenbasierte Reparaturhistorie",
      "Eigene mobile Oberflächen, optimiert für Techniker",
      "E2E-automatisierte Testpipeline mit Playwright",
    ],
    previewType: "auto-service",
    slug: "hezer-auto-service",
    caseSummary: "Ein mobiles Betriebssystem wurde entwickelt, um alle Prozessschritte von der Fahrzeugannahme bis zur Auslieferung für ein Autoservice-Unternehmen aufzuzeichnen, bei dem alles auf Papier basierte.",
    targetUser: "Serviceberater und Manager, die den gesamten Servicefluss von der Annahme bis zur Rechnungsstellung verfolgen",
    industry: "Automobil- & Servicedienstleistungen",
    role: "Prozessanalyst & Entwickler",
    previousWorkflow: "Die Fahrzeugaufnahme erfolgte über Papierformulare, Reparaturschritte wurden mündlich mit den Mechanikern abgestimmt. Historische Daten waren nur über alte Rechnungsordner abrufbar.",
    clientTestimonial: {
      author: "Serdar Hezer",
      role: "Inhaber, Hezer Otoşanzıman",
      text: "Ich kann jetzt mühelos Schulden verfolgen und meine Einnahmen und Ausgaben in Echtzeit einsehen. Es hat meinen Job wirklich erleichtert und ist sehr praktisch. Als ich neulich ein Fahrzeug übergab, habe ich dem Kunden direkt einen PDF-Kontoauszug geschickt — ich habe Zeit gespart und habe jetzt ein echtes System in meinem Laden.",
    },
    caseModules: [
      {
        name: "Fahrzeugannahme",
        features: ["Kennzeichen- und Kundenregistrierung", "Fahrzeugfotodokumentation", "Annahmenotizen und Mängeldefinition"],
      },
      {
        name: "Arbeitsauftragsverfolgung",
        features: ["Schritt-für-Schritt-Reparaturstatus", "Technikerzuweisung", "Abschlussgenehmigung"],
      },
      {
        name: "Kunde & Fahrzeughistorie",
        features: ["Kennzeichenbasierte Servicehistorie", "Vorherige Reparaturnotizen", "Kundenkontaktinformationen"],
      },
      {
        name: "Testinfrastruktur",
        features: ["E2E-Testsuite mit Playwright", "Kritische Ablaufautomatisierung", "Regressionstests"],
      },
    ],
    userJourney: [
      "Serviceberater registriert das Fahrzeug im System",
      "Erfasst Mängel und Wunschnotizen",
      "Erstellt einen Arbeitsauftrag und weist ihn einem Techniker zu",
      "Techniker aktualisiert die Reparaturschritte bei Fertigstellung",
      "Berater genehmigt Fertigstellung und Auslieferung",
      "Fahrzeughistorie wird dauerhaft in der Cloud gespeichert",
    ],
    outcomes: [
      "Fahrzeug- und Reparaturschritte papierlos und zentralisiert",
      "Status des Arbeitsauftrags und Zuweisung jederzeit sichtbar",
      "Verbesserte Sichtbarkeit der Prozessschritte für das Team und die Kunden",
      "PDF-Servicebericht wird dem Kunden am Ende jedes Services sofort zugesendet",
    ],
    metrics: [
      { label: "Servicebericht-Versand", before: "Papierformular", after: "Sofort-PDF" },
      { label: "Fahrzeughistorie abrufen", before: "Alte Rechnungsordner", after: "Kennzeichen → Sekunden" },
    ],
    lessons: [
      "Das Formulardesign wurde vereinfacht, um eine schnelle Dateneingabe durch Techniker auf Tablets zu ermöglichen",
      "Die E2E-Testsuite fängt Regressionen in kritischen Abläufen frühzeitig ab",
    ],
    futureWork: [
      "SMS-Benachrichtigungssystem für Kunden",
      "Teile- und Materialkostenverfolgung",
      "Abrechnungs- und Rechnungsmodul",
    ],
  },
  {
    name: "Hezer Otoşanzıman",
    tagline: "Autoservice Unternehmenswebsite",
    status: "Active",
    category: "customer-project",
    problem: "Hezer Otoşanzıman hatte keine digitale Präsenz; potenzielle Kunden konnten das Unternehmen nicht online finden und hatten keine Möglichkeit, die Glaubwürdigkeit zu prüfen.",
    solution: "Eine konversionsorientierte Unternehmenswebsite, die das Fachwissen, den Serviceumfang und die Kontaktdaten des Betriebs präsentiert.",
    approach: "Mobile-first, schnell ladendes Design mit lokalem SEO-Fundament für bessere Sichtbarkeit in lokalen Suchergebnissen.",
    benefit: "Potenzielle Kunden finden das Unternehmen jetzt online, und Vertrauen wird vor dem ersten Kontakt aufgebaut.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "SEO"],
    features: [
      "Lokal SEO-optimierte Unternehmensdarstellung",
      "Serviceumfang- und Fachkompetenz-Sektionen",
      "Mobilfreundliche schnelle Kontakt- und Navigationsstruktur",
    ],
    previewType: "auto-service",
    slug: "hezer-otosanziman-site",
    caseSummary: "Eine Unternehmenswebsite wurde für Hezer Otoşanzıman, eine Getriebeservicewerkstatt, entworfen und entwickelt. Die Website präsentiert das Fachwissen des Betriebs und ermöglicht es Kunden, das Unternehmen in lokalen Suchergebnissen zu finden.",
    targetUser: "Lokale Fahrzeugbesitzer, die nach Getriebereparaturdiensten suchen",
    industry: "Automobil- & Servicedienstleistungen",
    role: "Webdesigner & Entwickler",
    previousWorkflow: "Das Unternehmen hatte keinerlei digitale Präsenz. Kunden konnten nur über Mundpropaganda erreicht werden.",
    clientTestimonial: {
      author: "Serdar Hezer",
      role: "Inhaber, Hezer Otoşanzıman",
      text: "Ich kann jetzt mühelos Schulden verfolgen und meine Einnahmen und Ausgaben in Echtzeit einsehen. Es hat meinen Job wirklich erleichtert und ist sehr praktisch. Als ich neulich ein Fahrzeug übergab, habe ich dem Kunden direkt einen PDF-Kontoauszug geschickt — ich habe Zeit gespart und habe jetzt ein echtes System in meinem Laden."
    },
    caseModules: [
      {
        name: "Unternehmensdarstellung",
        features: ["Fachwissen und Serviceumfang", "Team- und Erfahrungspräsentation", "Social Proof und Kundenbewertungen"],
      },
      {
        name: "Lokale SEO-Infrastruktur",
        features: ["Google Business Profile-Integration", "Lokale Suchoptimierung", "Schema-Markup und Meta-Struktur"],
      },
      {
        name: "Kontakt & Conversion",
        features: ["Schnelle Kontakt-CTAs", "WhatsApp-Weiterleitung", "Mobilfreundliche Kartenintegration"],
      },
    ],
    userJourney: [
      "Potenzieller Kunde sucht 'Izmir Getriebeservice' auf Google",
      "Findet die Hezer Otoşanzıman-Website in lokalen Ergebnissen",
      "Sieht sich Services und Fachkompetenz an",
      "Kontaktiert via WhatsApp oder Telefon",
    ],
    outcomes: [
      "Unternehmen ist online auffindbar und in lokalen Suchen sichtbar",
      "Potenzielle Kunden können Vertrauen vor dem ersten Kontakt aufbauen",
      "Bestandskunden können das Unternehmen leicht weiterempfehlen",
    ],
  },
  {
    name: "CARPASS",
    tagline: "Fahrzeughistorie und KI-gestützte Risikoanalyseplattform",
    status: "In Development",
    category: "product-lab",
    problem: "Fehlen einer zuverlässigen, zentralisierten und transparenten Historienquelle für Gebrauchtfahrzeuge.",
    solution: "Eine SaaS-Plattform, die Fahrzeugdaten aggregiert und über KI in einen Risikoscore umwandelt.",
    approach: "Integrierte n8n-Automatisierungen und KI-Agenten auf einer Multi-Tenant-Architektur.",
    benefit: "Transparenz für den Käufer, ein zuverlässiges Dokument für den Verkäufer; ein skalierbares Abonnementprodukt.",
    tech: ["React Native", "Supabase", "n8n", "AI Agents"],
    features: [
      "KI-gestützter Vertrauensbericht und Risikoscore",
      "Freemium-Abonnement- und Abrechnungsinfrastruktur",
      "n8n-Workflows für automatisierte Datenaggregation",
      "Moderne mobile Benutzeroberfläche und responsives Webportal",
    ],
    previewType: "carpass",
    slug: "carpass",
    caseSummary: "Um das Fehlen einer zuverlässigen Quelle beim Kauf von Gebrauchtwagen zu beheben, wurde eine SaaS-Plattformarchitektur entwickelt, die die Fahrzeughistorie sammelt und bewertet.",
    targetUser: "Gebrauchtwagenkäufer und Händler, die eine zuverlässige Fahrzeughistorie benötigen; Privatpersonen und gewerbliche Käufer",
    caseModules: [
      {
        name: "Vertrauensbericht & Risikoscore",
        features: ["KI-gestützte Risikoanalyse", "Interpretation von Schadens- und Inspektionsdaten", "Saubere Berichtspräsentation für den Benutzer"],
      },
      {
        name: "SaaS- & Abrechnungsinfrastruktur",
        features: ["Freemium-Tarifverwaltung", "Zahlungs- und Rechnungssystem", "Nutzungslimits verfolgen"],
      },
      {
        name: "n8n-Automatisierungsabläufe",
        features: ["Datenaggregationsautomatisierungen", "Auslöser für die Berichterstellung", "Fehlerbehandlung und Protokollierung"],
      },
      {
        name: "Mobile & Web-Schnittstelle",
        features: ["React Native mobile App", "Responsives Webportal", "Benutzerverwaltungspanel"],
      },
    ],
    userJourney: [
      "Benutzer gibt das Kennzeichen ein, um die Abfrage zu starten",
      "n8n-Workflow aggregiert Fahrzeugdaten aus Quellen",
      "KI-Modell berechnet den Risikoscore",
      "Vertrauensbericht wird dem Benutzer präsentiert",
      "Premium-Benutzer greift auf vollständige Berichtsdetails zu",
      "Abonnementverwaltung über das Benutzerpanel abgewickelt",
    ],
    outcomes: [
      "Zuverlässige Risikoanalyse für Gebrauchtwagenkäufer in Sekunden",
      "Wiederkehrendes Abonnement-Einnahmemodell für den Plattformbesitzer",
      "Nachhaltiges Produkt auf einer skalierbaren SaaS-Infrastruktur",
    ],
    lessons: [
      "Iterative Tests waren entscheidend für konsistente KI-Prompts",
      "Die korrekte Einrichtung der Multi-Tenant-Datenisolation beschleunigte die spätere Entwicklung",
    ],
    futureWork: [
      "Händler-API-Integration",
      "Vergleichende Fahrzeuganalyse",
      "White-Label-Lizenzierungsmodelle",
    ],
  },
  {
    name: "SaaS Infrastructures",
    tagline: "Abonnementbereite Multi-Tenant-Softwarearchitektur",
    status: "Planned",
    category: "concept-work",
    problem: "Maßgeschneiderte Verfolgungssysteme für ein einzelnes Unternehmen lassen sich nicht auf andere Unternehmen übertragen.",
    solution: "Eine Architektur, die maßgeschneiderte Systeme in Multi-Tenant-SaaS-Produkte verwandelt.",
    approach: "Produktisierung des gemeinsamen Kerns bestehender Systeme unter Verwendung von Tenant-Datenbanken.",
    benefit: "Ein einmal erstelltes System kann Hunderten von Unternehmen weltweit als Abonnementmodell dienen.",
    tech: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
    features: [
      "Abonnementtarife und Stripe-Abrechnungsverwaltung",
      "Rollenbasierte Zugriffskontrolle und Benutzerautorisierung",
      "Isolierte Datenumgebungen für Mandanten (Tenants)",
      "Skalierbares und modulares Cloud-Datenbankdesign",
    ],
    previewType: "business-dashboard",
    slug: "saas-operasyon-altyapisi",
    caseSummary: "Konzept für Multi-Tenant-SaaS-Architektur und Infrastruktur-Setup für Unternehmen, die ein internes System vermarkten möchten.",
    targetUser: "KMUs und Gründer mit einem internen Tool, das ein Nischenproblem löst und das sie vermarkten möchten",
    caseModules: [
      {
        name: "Multi-Tenant-Architektur",
        features: ["Tenant-Isolierung und Datensicherheit", "Gemeinsame Infrastrukturverwaltung", "Tenant-Admin-Dashboard"],
      },
      {
        name: "Abonnement & Abrechnung",
        features: ["Tarif- und Limitverwaltung", "Stripe-Integration", "Rechnungs- und Zahlungsverlauf"],
      },
      {
        name: "Benutzer- & Rollenverwaltung",
        features: ["Rollenbasierte Zugriffskontrolle (RBAC)", "Teameinladungssystem", "Super-Admin-Panel"],
      },
      {
        name: "Produkt-Backbone",
        features: ["API-Design und Webhook-Unterstützung", "Skalierbare Datenbankstruktur", "Audit-Log und Überwachung"],
      },
    ],
    userJourney: [
      "Unternehmer teilt SaaS-Produktidee und aktuelles internes Tool mit",
      "Umfang und Architekturdesign werden finalisiert",
      "Multi-Tenant-Infrastruktur wird eingerichtet",
      "Abonnement- und Abrechnungsmodul wird integriert",
      "Erster Kunde (Tenant) im System angemeldet",
      "Neue Funktionen und Module werden hinzugefügt, wenn das Produkt wächst",
    ],
    outcomes: [
      "Sichere und isolierte Multi-Tenant-Umgebung",
      "Skalierbares SaaS-Abrechnungsmodell für wiederkehrende Einnahmen",
      "Robuste technische Basis für Skalierung",
    ],
    lessons: [
      "Die Einrichtung der Tenant-Isolierung auf Datenbankebene verhindert Datenlecks von Anfang an",
      "Flexible Abonnementtarife erleichtern die Ansprache unterschiedlicher Kundensegmente",
    ],
    futureWork: [
      "White-Label-Theme-Unterstützung",
      "Nutzungsbasierte Abrechnung",
      "Self-Service-Onboarding-Ablauf",
    ],
  },
  {
    name: "Albanexa Personal Brand Site",
    tagline: "Mehrseitige Website für persönliches Branding und Studio-Positionierung",
    status: "Active",
    category: "internal-project",
    problem: "Mert Alban fehlte eine Webpräsenz, die seine entwickelten Projekte und Dienstleistungen klar erklärte.",
    solution: "Eine mehrseitige Website, die Dienstleistungen, Fallstudien, Prozesse und Kontakte trennt, powered by 3D Spline und Framer Motion.",
    approach: "Die Informationsarchitektur wurde auf die Entscheidungsreise des Kunden abgestimmt.",
    benefit: "Besucher verstehen innerhalb von Sekunden, wer er ist, welche Probleme er löst und wie er arbeitet.",
    tech: ["Next.js 16", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Spline 3D"],
    features: [
      "Mehrseitige Informationsarchitektur und Navigation",
      "Interaktives Spline 3D-Roboter-Hero-Erlebnis",
      "Framer Motion Scroll-Reveal und Parallax-Animationen",
      "Projekt-Fallstudien (Problem → Lösung → Nutzen-Struktur)",
      "Lösungskategorien und eigene Service-Unterseiten",
      "Mehrsprachige Unterstützung in TR / EN / DE",
      "Responsive Layout und mobile Navigation",
      "SEO-Metadaten, Sitemap und robots.txt",
    ],
    previewType: "personal-brand",
    slug: "personal-brand-site",
    caseSummary: "Eine persönliche Marken- und Studio-Website, die Mert Albans digitale Lösungen und Dienstleistungen klar erklärt.",
    targetUser: "KMU-Inhaber und Gründer, die maßgeschneiderte Workflows, Webanwendungen oder SaaS-Produkte in Erwägung ziehen",
    caseModules: [
      {
        name: "Informationsarchitektur",
        features: ["Entscheidungsreise-basierte Seitenstruktur", "Lösungskategorien", "Projekt-Fallstudien"],
      },
      {
        name: "3D & Animation",
        features: ["Spline-Roboter-Hero", "Scroll-Reveal-Animationen", "Parallax-Effekte"],
      },
      {
        name: "Inhaltssystem",
        features: ["Lokale-basierte mehrsprachige Inhalte", "Datengetriebene Projektseiten", "Service-Unterseiten"],
      },
      {
        name: "Technischer Stack",
        features: ["Next.js App Router", "Tailwind CSS 4 Design-Tokens", "Framer Motion Animationssystem"],
      },
    ],
    userJourney: [
      "Besucher sieht im Hero-Bereich, wer ich bin und was ich tue",
      "Identifiziert eigene geschäftliche Probleme im Engpass-Bereich",
      "Erkundet spezifische Dienstleistungen auf der Lösungsseite",
      "Liest echte Fallstudien im Portfolio-Bereich",
      "Versteht den Arbeitsprozess im Zeitachsen-Bereich",
      "Startet ein Projektgespräch über das Kontaktformular",
    ],
    outcomes: [
      "Dienstleistungen in einem sauberen, separaten Layout präsentiert",
      "Projektnachweise im richtigen Fallstudienformat strukturiert",
      "Besucher finden leicht ihre passende Servicekategorie",
      "Anstieg von Buchungen und Projektanfragen",
    ],
    lessons: [
      "Zusätzliche Tests waren für PDF-Generierungs-Workflows auf mobilen Bildschirmen erforderlich",
      "Der kritische Bestandsschwellenwert wurde basierend auf Feedback anpassbar gemacht",
    ],
    futureWork: [
      "Blog und Ressourcen-Bereich",
      "Kontaktformular-Backend-Integrationen",
      "Dienstleistungsspezifische Landingpages",
    ],
  },
];

export const projects = projectsTr;

export function getProjects(lang: string = "tr"): Project[] {
  const getStatus = (cat: ProjectCategory): ProjectStatus => {
    if (cat === "customer-project") return "liveClientProject";
    if (cat === "product-lab") return "inDevelopmentProduct";
    if (cat === "concept-work") return "conceptArchitecture";
    return "internalProject";
  };

  const rawList = lang === "en" ? projectsEn : lang === "de" ? projectsDe : projectsTr;
  return rawList.map((p) => ({
    ...p,
    projectStatus: getStatus(p.category),
  }));
}

export function getProjectBySlug(slug: string, lang: string = "tr"): Project | undefined {
  const list = getProjects(lang);
  return list.find((p) => p.slug === slug);
}
