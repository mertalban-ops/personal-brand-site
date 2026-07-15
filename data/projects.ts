export type CaseStudyModule = {
  name: string;
  features: string[];
};

export type Project = {
  name: string;
  tagline: string;
  status: "Active" | "In Development" | "Planned";
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
};

export const projects: Project[] = [
  {
    name: "StockApp",
    tagline: "Inventory, finance, and receivables tracking",
    status: "Active",
    problem:
      "Inventory and customer debts are scattered across notebooks and Excel, leading to missed collections.",
    solution:
      "A centralized web application combining inventory movements, current accounts, and collections.",
    approach: "Built with modern web tech for real-time, data-driven management.",
    benefit:
      "Who owes what, what's in stock, what was collected this month—answered at a single glance.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    features: [
      "Sales, collections, and debt dashboard",
      "One-click PDF account statements",
      "Quick sharing via WhatsApp",
      "Critical low-stock alerts",
    ],
    previewType: "stockapp",
    slug: "stockapp",
    caseSummary:
      "Stok ve cari hesap verisi defter ile Excel'de dağınık olan bir işletme için stok hareketleri, müşteri bakiyeleri ve tahsilat takibini tek arayüzde toplayan özel bir web uygulaması geliştirildi.",
    targetUser: "Toptan veya perakende satış yapan, müşterilerine vadeli satış sunan KOBİ sahipleri ve yöneticileri",
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
      "Stok görünürlüğünün anlık hale gelmesi",
      "Müşteri bakiyelerine her an erişilebilmesi",
      "Tahsilat takibinin sistem üzerinden yürütülmesi",
      "Hesap ekstresi hazırlama süresinin dakikadan saniyelere inmesi",
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
    tagline: "Auto service operations and job tracking",
    status: "Active",
    problem:
      "Tracking serviced vehicles, pending jobs, and customer history relies entirely on memory and paper.",
    solution:
      "A mobile-friendly system logging the entire service lifecycle from vehicle intake to delivery.",
    approach: "Mobile-first design and cloud infrastructure optimized for field and shop use.",
    benefit: "Vehicle history and job statuses are instantly visible to the entire team.",
    tech: ["React Native", "Expo", "Supabase", "Playwright"],
    features: [
      "Vehicle intake and service workflow",
      "Comprehensive customer job history",
      "Custom UI component library",
      "End-to-end (E2E) testing pipeline",
    ],
    previewType: "auto-service",
    slug: "hezer-auto-service",
    caseSummary:
      "Araç kabul, onarım takibi ve müşteri geçmişi kağıt ve sözlü iletişime dayanan bir oto servis işletmesi için araç kabulünden teslimata kadar tüm süreç adımlarını kayıt altına alan mobil uyumlu bir operasyon sistemi geliştirildi.",
    targetUser: "Servis danışmanları ve yöneticileri; müşteri kabulünden fatura kesimine kadar tüm servis sürecini takip eden personel",
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
      "Müşteri güveninin servis şeffaflığıyla artması",
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
    name: "CARPASS",
    tagline: "Vehicle history and risk analysis platform",
    status: "In Development",
    problem:
      "Lack of a reliable, single-source history for used vehicles, leading to buyer hesitation.",
    solution:
      "A scalable platform that aggregates vehicle history and transforms it into actionable risk analysis.",
    approach: "Designed as a SaaS model with an AI-supported backbone.",
    benefit: "Transparency for the buyer, trust for the seller; a scalable product foundation.",
    tech: ["React Native", "Supabase", "n8n", "AI Agents"],
    features: [
      "AI-driven Trust Report and Risk Score",
      "Freemium billing infrastructure",
      "Automated n8n workflows",
      "Advanced mobile and web interfaces",
    ],
    previewType: "carpass",
    slug: "carpass",
    caseSummary:
      "İkinci el araç alımında güvenilir bir kaynak eksikliğini gidermek için araç geçmişini toplayıp yapay zeka ile yorumlayan ve kullanıcıya risk skoru ile Trust Report sunan SaaS platform mimarisi tasarlandı ve geliştirme süreci devam ediyor.",
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
    tagline: "Subscription-ready multi-tenant architectures",
    status: "Planned",
    problem:
      "Custom-built systems for a single company fail to scale to others with the exact same needs.",
    solution:
      "Transforming bespoke business tracking systems into multi-tenant, subscription-based products.",
    approach: "Productizing the common core of existing systems using tenant-based architecture.",
    benefit: "A solution built once can serve hundreds of businesses globally.",
    tech: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
    features: [
      "Subscription and billing management",
      "Role-based access control (RBAC)",
      "Isolated data environments for tenants",
      "Scalable cloud architecture",
    ],
    previewType: "business-dashboard",
    slug: "saas-operasyon-altyapisi",
    caseSummary:
      "Şirket içi çözülen bir operasyon problemini diğer firmalara satılabilir abonelik ürününe dönüştürmek isteyen işletmeler için multi-tenant SaaS mimari tasarımı ve altyapı kurulumu.",
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
    name: "Solvaria Personal Brand Site",
    tagline: "Kişisel marka ve stüdyo konumlandırması için çok sayfalı web sitesi",
    status: "Active",
    problem:
      "Mert Alban'ın geliştirdiği projeleri ve sunduğu hizmetleri net anlatan, müşteriyi ikna eden ve iletişime yönlendiren bir web varlığı yoktu.",
    solution:
      "Hizmet kategorileri, proje vaka çalışmaları, çalışma süreci ve iletişim akışını ayrı sayfalarda toplayan; 3D Spline robot ve Framer Motion animasyonlarıyla güçlendirilmiş çok sayfalı kişisel marka sitesi.",
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
    caseSummary:
      "Mert Alban'ın geliştirdiği dijital çözümleri ve sunduğu hizmetleri profesyonel biçimde anlatan, müşteriyi doğru hizmete yönlendiren kişisel marka ve stüdyo sitesi.",
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
    futureWork: [
      "Blog ve içerik alanı",
      "İletişim formu backend entegrasyonu",
      "Hizmet bazlı landing page'ler",
    ],
  },
];
