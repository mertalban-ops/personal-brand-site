import { Dictionary } from "./types";

export const tr: Dictionary = {
  nav: {
    studio: "Stüdyo Yaklaşımı",
    services: "Sistem Çözümleri",
    cases: "Referans Projeler",
    process: "Teslimat Süreci",
    contactBtn: "Projemi Konuşalım",
  },
  hero: {
    kicker: "Özel iş takip sistemleri · Stok ve cari hesap · Otomasyon · SaaS altyapıları",
    title1: "İşletmenizin dağınık süreçlerini ",
    titleHighlight: "dijital operasyon sistemlerine",
    title2: " dönüştürüyoruz.",
    subtitle:
      "Küçük ve orta ölçekli firmalar için stok, cari hesap, satış, tahsilat, müşteri takibi ve raporlama süreçlerini sade, ölçülebilir ve web tabanlı sistemlere dönüştürüyoruz.",
    primaryBtn: "Projemi Konuşalım",
    secondaryBtn: "Proje Vitrinini Gör",
    cards: {
      stock: "Stok",
      stockDesc: "aktif ürün · 14 kritik",
      finance: "Cari Hesap",
      financeDesc: "açık bakiye · 37 müşteri",
      collection: "Tahsilat",
      collectionDesc: "bu ay tahsil edildi",
      report: "Rapor",
      reportTitle: "Hesap ekstresi",
      reportDesc: "PDF oluşturuldu",
    },
  },
  about: {
    label: "01 — Stüdyo Yaklaşımı",
    title: "Bir işletmenin dijital sistemi, sadece ekranlardan oluşmaz.",
    paragraphs: [
      "İyi bir iş takip sistemi; doğru veri akışı, net kullanıcı deneyimi, güvenilir raporlama ve işletmenin günlük alışkanlıklarına uygun tasarımla değer üretir.",
      "Biz, küçük ve orta ölçekli işletmelerin manuel, dağınık ve zaman kaybettiren süreçlerini dijital operasyon sistemlerine dönüştüren bir dijital çözüm ortaklığıyız.",
      "Geliştirdiğimiz sistemlerde yalnızca teknik tarafı değil, işletmenizin gerçek çalışma düzenini de dikkate alıyor; kağıt üstünde kalan süreçleri ekibin gerçekten kullandığı dijital yapılara dönüştürüyoruz.",
    ],
  },
  services: {
    label: "02 — Yüksek Değerli Çözümler",
    title: "İşletmenizi Hızlandıran Sistem Paketleri",
    subtitle:
      "Hazır yazılımlara uymaya çalışmayın. İşletmenizin operasyonel ihtiyacına göre tasarlanmış, tamamen size özel kurulan sistemlerle çalışın.",
    items: [
      {
        title: "Dijital İş Takip Sistemi",
        text: "Siparişten teslimata kadar tüm operasyonu tek panelden yönetin. İşlerin kişilere bağlılığını ortadan kaldırın.",
        icon: "ClipboardList",
      },
      {
        title: "Stok ve Ürün Yönetimi",
        text: "Canlı giriş/çıkış takibi ve kritik stok uyarılarıyla sayım hatalarını azaltıp maliyetleri kontrol altına alın.",
        icon: "Boxes",
      },
      {
        title: "Cari Hesap & Tahsilat",
        text: "Kimin ne kadar borcu olduğunu, vadesi geçen ödemeleri ve aylık tahsilatlarınızı net bir arayüzde görün.",
        icon: "Wallet",
      },
      {
        title: "Satış ve Müşteri Paneli",
        text: "Müşterilerinizin iletişim geçmişini, özel fiyatlandırmaları ve satış süreçlerini merkezi bir sistemde tutun.",
        icon: "Users",
      },
      {
        title: "PDF Raporlama Akışları",
        text: "Tek tıkla profesyonel hesap ekstresi oluşturun, faturaları veya teklifleri müşterilerinize WhatsApp'tan iletin.",
        icon: "FileText",
      },
      {
        title: "Dashboard & İşletme Analitiği",
        text: "Şirketin anlık performansını, karlılık durumunu ve kritik operasyonel metrikleri tek bir ekrandan anlık izleyin.",
        icon: "LayoutDashboard",
      },
      {
        title: "Otomasyon Sistemleri",
        text: "Müşteriye giden otomatik hatırlatmalar, e-posta gönderimleri ve tekrar eden manuel işlerinizi otomatiğe bağlayın.",
        icon: "Workflow",
      },
      {
        title: "SaaS Ürün Altyapısı",
        text: "İçeride çözdüğünüz sektörel bir problemi, abonelik (SaaS) modeliyle diğer firmalara satabileceğiniz bir dijital ürüne dönüştürün.",
        icon: "Layers",
      },
    ],
  },
  problems: {
    label: "03 — Problem & Çözüm",
    title: "Defter, Excel ve WhatsApp arasında dağılan işleri tek sisteme topluyoruz.",
    items: [
      {
        problem: "Stok karışıyor, ne kadar ürün kaldığı bilinmiyor",
        solution: "Canlı ve uyarılı stok takip ekranı",
      },
      {
        problem: "Borçlar belirsiz, tahsilatlar unutuluyor",
        solution: "Müşteri bazlı cari hesap ve bakiye takibi",
      },
      {
        problem: "Raporlar ve hesap ekstreleri manuel hazırlanıyor",
        solution: "Tek tıkla otomatik PDF rapor akışı",
      },
      {
        problem: "İşler şirket hafızasında değil, kişilerin hafızasında ilerliyor",
        solution: "Merkezi ve standart dijital işleyiş süreci",
      },
      {
        problem: "Klasik Excel tabloları operasyon hızına yetişemiyor",
        solution: "İşletmeye özel, hızlı ve güvenli web uygulaması",
      },
      {
        problem: "Birden fazla lokasyon ve personel takibi zorlaşıyor",
        solution: "Rol bazlı erişim ve bulut tabanlı yönetim paneli",
      },
    ],
  },
  projects: {
    label: "04 — Referans Projeler",
    title: "Geliştirdiğimiz Özel Dijital Çözümler",
    problemLabel: "Problem",
    featuresLabel: "İşletmeye Fayda & Özellikler",
    items: [
      {
        name: "StockApp",
        tagline: "Stok, Cari Hesap ve Tahsilat Takip Sistemi",
        status: "Canlı",
        problem:
          "İşletmenin stok ve borç verisinin defter ile Excel arasında kaybolması, yöneticinin genel durumu görememesi.",
        solution:
          "Tüm stok hareketlerini, müşteri bazlı cari hesapları ve tahsilat durumunu tek bir arayüzde toplayan özel bir dijital yönetim sistemi.",
        approach: "Yöneticinin karmaşık analizlerle uğraşmadan tek ekranda finansal özeti görebildiği minimalist yaklaşım.",
        benefit:
          "Kim ne kadar borçlu, depoda ne var ve tahsilat hedefleri ne durumda anında cevaplanıyor; operasyon hızlanıyor.",
        tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
        features: [
          "Canlı satış, tahsilat ve borç dashboard'u",
          "Müşteriye özel tek tıkla PDF hesap ekstresi",
          "Kritik stok seviye ve ödeme gecikme uyarıları",
        ],
        previewType: "stockapp",
      },
      {
        name: "Hezer Auto Service",
        tagline: "Oto Servis Operasyon ve Müşteri Takip Platformu",
        status: "Canlı",
        problem:
          "Servise giren araçların onarım durumunun, maliyetlerin ve müşteri geçmişinin not defterlerinde dağınık takip edilmesi.",
        solution:
          "Araç kabulünden teslimata kadar tüm onarım aşamalarını, usta notlarını ve faturalandırmayı merkezi hale getiren mobil uyumlu sistem.",
        approach: "Servis ustalarının ve danışmanların sahada tabletle kolayca veri girebileceği hızlı bir UI mimarisi tasarlandı.",
        benefit: "Her aracın geçmiş onarımları güvenceye alındı, müşteri memnuniyeti ve işlem şeffaflığı sağlandı.",
        tech: ["React Native", "Expo", "Supabase", "Playwright"],
        features: [
          "Araç kabul ve adım adım servis süreç takibi",
          "Plaka bazlı kalıcı müşteri onarım geçmişi",
          "Uçtan uca (E2E) test edilen güvenli altyapı",
        ],
        previewType: "auto-service",
      },
      {
        name: "CARPASS",
        tagline: "Yapay Zeka Destekli Araç Risk Analizi SaaS Platformu",
        status: "Geliştirme Aşamasında",
        problem:
          "İkinci el araç alımında dağınık geçmiş verilerinin güvenilir tek bir risk puanına dönüştürülememesi.",
        solution:
          "Dağınık hasar ve muayene verilerini toplayıp AI modelleriyle yorumlayan ve kullanıcıya güvenli 'Trust Report' sunan platform.",
        approach: "SaaS abonelik modeline uygun, yapay zeka entegrasyonu barındıran ölçeklenebilir ve sağlam bir ürün temeli atıldı.",
        benefit: "Alıcılar için saniyeler içinde şeffaflık, platform sahibi için ise ölçeklenebilir bir gelir modeli (SaaS).",
        tech: ["React Native", "Supabase", "n8n", "AI Agents"],
        features: [
          "Yapay zeka (AI) destekli Trust Report oluşturma",
          "Freemium ve abonelik modeli (SaaS) ödeme altyapısı",
          "n8n ile kurulan tam otomatik arka plan iş akışları",
        ],
        previewType: "carpass",
      },
      {
        name: "İşletmeye Özel SaaS Altyapısı",
        tagline: "Kurumsal Süreçleri Abonelik Modeline (SaaS) Dönüştürme",
        status: "Konsept / Mimari",
        problem:
          "Başarılı bir şekilde kurulan şirket içi yazılımların, sektördeki diğer firmalara lisanslanarak satılamaması.",
        solution:
          "Mevcut iş takip sistemlerinin çekirdeğini ayırıp çok-kiracılı (multi-tenant) güvenli bir abonelik ürününe dönüştürmek.",
        approach: "Veri güvenliğinin ve performansın en üst düzeyde olduğu, izole edilmiş ölçeklenebilir bulut mimarisi tasarımı.",
        benefit: "Şirketin yalnızca kendi sorununu çözmekle kalmayıp, sektörüne teknoloji sağlayan bir ürüne sahip olması.",
        tech: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
        features: [
          "Stripe ile entegre otomatik faturalandırma ve abonelik",
          "Rol ve yetki bazlı gelişmiş kullanıcı erişim kontrolü",
          "Her işletme (tenant) için izole edilmiş güvenli veri",
        ],
        previewType: "business-dashboard",
      },
    ],
  },
  process: {
    label: "05 — İmza Niteliğindeki Sürecimiz",
    title: "Fikri değil, çalışan sistemi teslim etmeye odaklanıyoruz.",
    items: [
      {
        step: "01",
        title: "Analiz",
        text: "Mevcut iş takibinizi, yaşanan sorunları ve asıl ihtiyaçları detaylıca masaya yatırıp analiz ediyoruz.",
      },
      {
        step: "02",
        title: "Sistem Tasarımı",
        text: "Stok, cari hesap, satış, kullanıcı rolleri ve rapor akışlarını işletmenizin DNA'sına uygun olarak planlıyoruz.",
      },
      {
        step: "03",
        title: "Geliştirme",
        text: "Web tabanlı, mobil uyumlu ve hiçbir teknik karmaşası olmayan, son derece sade arayüzlü sistemi geliştiriyoruz.",
      },
      {
        step: "04",
        title: "Test & Teslim",
        text: "Gerçek kullanım senaryolarıyla test eder, sistemi kullanıma hazır bir şekilde ekibinize teslim ederiz.",
      },
    ],
  },
  strengths: {
    label: "06 — Odak Noktalarımız",
    title: "Yazılım geliştirmek bir araçtır, asıl amaç işinizi hızlandırmaktır.",
    subtitle: "Sadece kod yazmıyoruz; operasyonunuzun nerede tıkandığını bulup onu dijitalleştiriyoruz.",
    items: [
      "Operasyonel Darboğaz Analizi",
      "Kullanıcı Dostu B2B Arayüz Tasarımı",
      "Stok, Finans ve Cari Hesap Mimarisi",
      "Güvenli Çok-Kiracılı (SaaS) Altyapılar",
      "PDF ve Dinamik Raporlama Sistemleri",
      "Hızlı Web ve Mobil Uygulama Geliştirme",
      "API ve İş Akışı (Workflow) Otomasyonları",
      "Performanslı Bulut Veritabanı Yönetimi",
    ],
  },
  whyMe: {
    label: "07 — Neden Bizimle Çalışmalısınız?",
    title: "Güzel ekranlardan önce, gerçek iş problemini çözen sistemler kuruyoruz.",
    items: [
      {
        title: "Teknoloji jargonu değil, iş dili",
        text: "Müşteriye teknik karmaşa değil, doğrudan işlerini hızlandıracak, çalışan, somut çözümler sunarız.",
      },
      {
        title: "İşletme ihtiyacını anlama",
        text: "Kopyala-yapıştır sistemler kurmayız. Sürecinizi anlamak için vakit ayırır, tam ihtiyacınız olanı inşa ederiz.",
      },
      {
        title: "Sade ve kullanılabilir arayüz",
        text: "Personelinizin kullanmakta zorlanmayacağı, karmaşık menülerden arındırılmış temiz ekranlar tasarlarız.",
      },
      {
        title: "Ölçülebilir hale getirme",
        text: "Manuel yapılan tüm adımları dijitalleştirerek sürecin raporlanabilir ve analiz edilebilir olmasını sağlarız.",
      },
      {
        title: "Geliştirilebilir ve güvenli altyapı",
        text: "İşletmeniz büyüdüğünde sistem de büyüyebilir. Modern ve genişlemeye uygun sağlam bir altyapı kurarız.",
      },
      {
        title: "Takip, rapor ve otomasyon merkezde",
        text: "Sadece veri girişi değil; sistemin kendi kendine uyarı ürettiği akıllı ve otomatik yapılara odaklanırız.",
      },
    ],
  },
  testimonial: {
    label: "Çalışma Felsefesi",
    note: "Premium çözüm üretmenin ve iş ortaklığının temel taşı.",
    quote:
      "Bir dijital sistemin kalitesi, yazılan kodun uzunluğuyla değil; işletme sahibinin gün sonunda o sisteme bakıp hissettiği 'kontrol bende ve her şey güvende' duygusuyla ölçülür. Amacımız işletmelere tam olarak bu hissi veren güvenilir operasyon yapıları kurmaktır.",
  },
  faq: {
    label: "08 — Merak Edilenler",
    title: "Sıkça Sorulan Sorular",
    subtitle: "Kurduğumuz sistemlerin niteliği ve işleyiş süreci hakkındaki temel detaylar.",
    items: [
      {
        q: "Hangi işletmeler için sistem kuruyorsunuz?",
        a: "Excel, WhatsApp veya defter üzerinden süreç yönetmekte zorlanan, ancak piyasadaki hantal ve pahalı ERP programlarında boğulmak istemeyen vizyoner KOBİ'ler ve girişimler için özel sistemler kuruyoruz.",
      },
      {
        q: "Hazır paket mi satıyorsunuz, özel sistem mi geliştiriyorsunuz?",
        a: "Tamamen sizin işletmenizin işleyişine, terminolojisine ve ihtiyaçlarına göre özel sistemler geliştiriyoruz. Satın alınan değil, sizinle birlikte terzi usulü tasarlanan bir sisteme sahip oluyorsunuz.",
      },
      {
        q: "Geliştirdiğiniz sistemler mobilde de kullanılabiliyor mu?",
        a: "Evet. Kurduğumuz tüm web tabanlı iş takip ve operasyon sistemleri hem bilgisayarda (desktop) hem de cep telefonu veya tabletlerde (responsive) kusursuz çalışacak premium standartta tasarlanır.",
      },
      {
        q: "Fiyat nasıl belirlenir ve süreç ne kadar sürer?",
        a: "Sistemin büyüklüğüne, modül sayısına (Stok, Finans, Rapor, Otomasyon vs.) göre değişkenlik gösterir. İlk görüşmemizde operasyonunuzu analiz eder, projenin net bütçesini ve takvimini (genelde 4 ila 12 hafta arası) size sunarız.",
      },
      {
        q: "Sistem teslim edildikten sonra destek veriyor musunuz?",
        a: "Kesinlikle. İşleyen bir sistemin her zaman bakıma ve gelişime ihtiyacı vardır. Teslim sonrası aylık bakım anlaşmalarıyla sistemin güvenliğini sağlıyor ve yeni eklenti taleplerinizi karşılıyoruz.",
      },
      {
        q: "Sadece web sitesi mi yapıyorsunuz, yoksa iş takip sistemi de kuruyor musunuz?",
        a: "Biz kurumsal web siteleri yapmıyoruz. Uzmanlığımız tamamen işletmelerin arka plandaki yönetim ve operasyon panellerini (İş takip, stok, cari hesap, B2B portallar, SaaS altyapıları) kurmaktır.",
      },
    ],
  },
  contact: {
    label: "09 — İletişim",
    title: "İşletmenizdeki takip karmaşasını profesyonel bir sisteme dönüştürelim.",
    subtitle:
      "Stok, cari hesap, satış, tahsilat veya raporlama süreçleriniz dağınıksa, işletmenize özel premium bir dijital sistemle bunu yönetilebilir hale getirebiliriz. Projenizi 15 dakikada konuşalım.",
    emailBtn: "E-posta Gönder",
    whatsappBtn: "WhatsApp'tan Yaz",
    footerText:
      "Defter, Excel ve WhatsApp arasında dağılan iş süreçlerini tek bir merkezde toplayan, kuruma özel premium dijital operasyon sistemleri ve SaaS altyapıları geliştiriyoruz.",
    rights: "Tüm hakları saklıdır.",
    servicesCol: "Sistem Çözümleri",
    studioCol: "Stüdyo",
  },
};
