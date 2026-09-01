// Oto servis sektör sayfası — çok dilli (tr/en/de) tek doğruluk kaynağı.
// Fiyatlar WhatsApp'tan gönderilen teklif PDF'i ile BİREBİR aynı olmalıdır.
// Fiyat değişirse: sadece `prices` bloğunu güncelle; landing, JSON-LD Offer
// ve /teklif aynı kaynağı kullanır. PDF'i ayrıca yeniden üret.

export type Lang = "tr" | "en" | "de";
export const CURRENCY = "TRY";
export const teklifPdfPath = "/teklif/albanexa-oto-servis-teklif.pdf";

// Analitik olay adları (tek yerden)
export const events = {
  whatsapp: "cta_whatsapp_oto_servis",
  teklifIndir: "cta_teklif_indir",
  paketleriGor: "cta_paketleri_gor",
  ihtiyacAnalizi: "cta_ihtiyac_analizi_oto_servis",
} as const;

export type PackageId = "vitrin" | "servis" | "buyume";
const packageOrder: PackageId[] = ["vitrin", "servis", "buyume"];

// Fiyatlar dil-bağımsız (TRY). Etiketler tüm dillerde aynı (PDF ile birebir).
const prices: Record<PackageId, { price: number; priceLabel: string; highlight: boolean }> = {
  vitrin: { price: 7900, priceLabel: "7.900 TL", highlight: false },
  servis: { price: 12900, priceLabel: "12.900 TL", highlight: true },
  buyume: { price: 24900, priceLabel: "24.900 TL", highlight: false },
};
const maintenancePrice = { price: 900, priceLabel: "900 TL/ay" };

type PackageText = {
  name: string;
  tagline: string;
  deliveryDays: string;
  revisions: string;
  includes: string[];
};

type Bundle = {
  hero: { kicker: string; titleA: string; titleB: string; desc: string; ctaPackages: string; ctaWhatsapp: string };
  social: { badge: string; sameSector: string; quote: string; author: string; role: string; caseLink: string };
  lossesTitle: string;
  lossesKicker: string;
  lossLabel: string;
  losses: { title: string; text: string }[];
  packagesKicker: string;
  packagesTitle: string;
  packagesNote: string;
  highlightBadge: string;
  deliveryLabel: string;
  revisionsLabel: string;
  packageCta: string;
  packages: Record<PackageId, PackageText>;
  maintenanceDesc: string;
  exclusionsTitle: string;
  exclusionsIntro: string;
  exclusions: string[];
  stepsKicker: string;
  stepsTitle: string;
  steps: { step: string; title: string; text: string }[];
  faqKicker: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  closing: {
    title: string;
    desc: string;
    ctaWhatsapp: string;
    ctaPdf: string;
    analysisPre: string;
    analysisLink: string;
    analysisPost: string;
    samplesPre: string;
    samplesLink: string;
  };
  waMessages: { general: string; analysis: string; pkg: (name: string) => string };
};

const tr: Bundle = {
  hero: {
    kicker: "Oto Servisler İçin",
    titleA: "Müşteri servisi Google'da arıyor.",
    titleB: "Bir sayfan yoksa seni bulamıyor.",
    desc: "Oto servis, kaporta-boya ve oto elektrikçiler için sade, hızlı ve senin işletmene ait bir web sitesi. Sabit fiyat, açık kapsam, sürpriz yok.",
    ctaPackages: "Paketleri ve fiyatları gör",
    ctaWhatsapp: "WhatsApp'tan yaz",
  },
  social: {
    badge: "Doğrulanmış Müşteri",
    sameSector: "Aynı sektör · Aynı şehir (İzmir)",
    quote:
      "Artık borç takibini rahatça yapabiliyorum, gelir-giderimi anlık görebiliyorum. İşimi gerçekten kolaylaştırdı, çok pratik oldu. Geçen gün bir aracı teslim ettikten hemen sonra servis raporunu müşteriye PDF olarak gönderdim — hem zamandan kazandım hem de dükkâna gerçek anlamda oturmuş bir sistemim oldu.",
    author: "Serdar Hezer",
    role: "Sahibi, Hezer Otoşanzıman · İzmir",
    caseLink: "Çalışmayı gör",
  },
  lossesKicker: "Neden Önemli",
  lossesTitle: "Sitesi olmayan bir servisin kaybettiği üç şey",
  lossLabel: "Kayıp",
  losses: [
    { title: "Yeni müşteri", text: "İnsanlar bugün servisi önce Google'da arıyor. Sayfan yoksa, seni bulamayan müşteri komşu servise gidiyor." },
    { title: "Güven", text: "Adını arayan biri karşısında düzgün bir sayfa görürse sana güveniyor. Hiçbir şey çıkmazsa şüpheyle yaklaşıyor." },
    { title: "Zaman", text: "Adres, çalışma saati, hangi işleri yaptığın… Aynı soruları telefonda tekrar tekrar anlatmak yerine tek sayfada gösterirsin." },
  ],
  packagesKicker: "Paketler ve Fiyatlar",
  packagesTitle: "Sabit fiyat. Açık kapsam. Sürpriz yok.",
  packagesNote: "Fiyatlar KDV hariçtir ve WhatsApp'tan gönderdiğimiz teklifle aynıdır.",
  highlightBadge: "En çok tercih edilen",
  deliveryLabel: "Teslim:",
  revisionsLabel: "Düzeltme:",
  packageCta: "Bu paketi konuşalım",
  packages: {
    vitrin: {
      name: "Vitrin",
      tagline: "Tek sayfalık, sade ve hızlı. İşini Google'da göstermek isteyen servisler için.",
      deliveryDays: "yaklaşık 5 iş günü",
      revisions: "1 revizyon turu",
      includes: ["Tek sayfalık web sitesi", "İşletme adı, hizmetler ve kısa tanıtım", "Telefon ve WhatsApp butonu", "Adres ve harita", "Çalışma saatleri", "Telefonda hızlı açılan yapı"],
    },
    servis: {
      name: "Servis",
      tagline: "Çok bölümlü site. Hizmetlerini ve işini ayrıntılı anlatmak isteyen servisler için.",
      deliveryDays: "yaklaşık 10 iş günü",
      revisions: "2 revizyon turu",
      includes: ["Vitrin paketindeki her şey", "Ayrı hizmet bölümleri (kaporta, boya, mekanik vb.)", "Fotoğraf galerisi", "Müşteri yorumları alanı", "Sık sorulan sorular bölümü", "Google Haritalar bağlantısı"],
    },
    buyume: {
      name: "Büyüme",
      tagline: "Daha geniş site. Birden çok hizmet sayfası ve yazı bölümü isteyen servisler için.",
      deliveryDays: "yaklaşık 15 iş günü",
      revisions: "3 revizyon turu",
      includes: ["Servis paketindeki her şey", "Birden çok hizmet sayfası", "Yazı / haber bölümü (istersen düzenli içerik)", "İletişim formu", "Google'da bulunabilmen için teknik hazırlık", "Teslimden sonra kısa kullanım anlatımı"],
    },
  },
  maintenanceDesc: "İçerik güncelleme, küçük değişiklikler, teknik bakım ve yedekleme. İstemezsen zorunlu değildir.",
  exclusionsTitle: "Fiyata dahil değildir",
  exclusionsIntro: "Dürüst olmak için baştan söylüyoruz. Aşağıdakiler paket fiyatına dahil değildir:",
  exclusions: ["Logo tasarımı", "Fotoğraf çekimi", "Reklam yönetimi (Google/Instagram reklamları)", "Google işletme kaydı açma/onaylatma işlemleri", "Muhasebe ve e-fatura sistemleri"],
  stepsKicker: "Nasıl İlerliyoruz",
  stepsTitle: "Üç adımda hazır",
  steps: [
    { step: "1", title: "Örnek sayfa", text: "Önce senin için örnek bir sayfa hazırlıyoruz. Ödeme yok. Beğenirsen devam ediyoruz." },
    { step: "2", title: "İçerik ve onay", text: "Hizmetlerini, fotoğraflarını ve iletişim bilgilerini yerleştiriyoruz. Sen kontrol edip onaylıyorsun." },
    { step: "3", title: "Yayın", text: "Site yayına giriyor. Google'da ve telefonda paylaşabileceğin kendi adresin oluyor." },
  ],
  faqKicker: "Sık Sorulan Sorular",
  faqTitle: "Aklına takılanlar",
  faqs: [
    { q: "Fiyata ne dahil?", a: "Seçtiğin pakete göre değişir. Vitrin pakedinde tek sayfalık site, iletişim ve harita var. Servis ve Büyüme pakedinde ayrıca hizmet bölümleri, galeri ve yorumlar gibi ek bölümler bulunuyor. Her paketin içinde ne olduğunu yukarıdaki listede tek tek yazdık." },
    { q: "Ne kadar sürede hazır olur?", a: "Vitrin paketi yaklaşık 5 iş günü, Servis paketi yaklaşık 10 iş günü, Büyüme paketi yaklaşık 15 iş günü içinde teslim edilir. Süre, içerik ve fotoğrafları ne kadar hızlı ilettiğine göre kısalabilir." },
    { q: "Sonradan değişiklik yapabilir miyim?", a: "Evet. Her pakette belirli sayıda ücretsiz revizyon (düzeltme) turu var. Yayından sonraki güncellemeler için aylık 900 TL bakım hizmeti alabilirsin; bu zorunlu değildir." },
    { q: "Site benim mi olacak?", a: "Evet, site senin işletmene aittir. İçeriği ve alan adı seni temsil eder. Başka bir yere taşımak istersen engel yok." },
    { q: "Fotoğrafım yoksa ne olur?", a: "Sorun değil. Telefonla çektiğin fotoğraflar çoğu zaman yeterli olur. Hiç fotoğraf yoksa sade ve düzgün görünen bir yapı ile başlarız, sonra dilediğinde ekleriz. Profesyonel fotoğraf çekimi fiyata dahil değildir." },
    { q: "Beğenmezsem iptal edebilir miyim?", a: "İlk adımda ödeme almadan örnek bir sayfa hazırlıyoruz. Beğenmezsen devam etmek zorunda değilsin. Böylece riski en baştan ortadan kaldırıyoruz." },
  ],
  closing: {
    title: "Kısa bir mesaj at, gerisini konuşalım",
    desc: "Hangi paketin sana uygun olduğundan emin değilsen dert etme. WhatsApp'tan yaz, birlikte karar verelim. Teklifi PDF olarak da indirebilirsin.",
    ctaWhatsapp: "WhatsApp'tan yaz",
    ctaPdf: "Teklifi PDF indir",
    analysisPre: "Daha ayrıntılı konuşmak istersen ",
    analysisLink: "ücretsiz ihtiyaç analizi",
    analysisPost: " planlayabilirsin.",
    samplesPre: "Örnek çalışmaları görmek ister misin? ",
    samplesLink: "Örnekleri incele",
  },
  waMessages: {
    general: "Merhaba, oto servisim için web sitesi paketleri hakkında bilgi almak istiyorum.",
    analysis: "Merhaba, oto servisimin durumunu konuşmak ve bana en uygun paketi belirlemek istiyorum.",
    pkg: (name) => `Merhaba, oto servisim için "${name}" paketi hakkında bilgi almak istiyorum.`,
  },
};

const en: Bundle = {
  hero: {
    kicker: "For Auto Repair Shops",
    titleA: "Customers search for a repair shop on Google.",
    titleB: "Without a page, they can't find you.",
    desc: "A simple, fast website that belongs to your business — for auto repair, body & paint and auto electrics shops. Fixed price, clear scope, no surprises.",
    ctaPackages: "See packages & prices",
    ctaWhatsapp: "Message on WhatsApp",
  },
  social: {
    badge: "Verified Customer",
    sameSector: "Same industry · Same city (İzmir)",
    quote:
      "I can now easily track debts and see my income and expenses in real time. It really made my job easier and it's very practical. The other day, right after handing over a vehicle, I sent the customer the service report as a PDF — I saved time and now I truly have a proper system running in my shop.",
    author: "Serdar Hezer",
    role: "Owner, Hezer Otoşanzıman · İzmir, Turkey",
    caseLink: "View the work",
  },
  lossesKicker: "Why It Matters",
  lossesTitle: "Three things a repair shop without a website loses",
  lossLabel: "Lost",
  losses: [
    { title: "New customers", text: "Today people search for a repair shop on Google first. If you have no page, the customer who can't find you goes to the shop next door." },
    { title: "Trust", text: "Someone searching your name and seeing a proper page trusts you. If nothing shows up, they hesitate." },
    { title: "Time", text: "Address, opening hours, what jobs you do… Instead of repeating the same answers on the phone, you show it all on one page." },
  ],
  packagesKicker: "Packages & Prices",
  packagesTitle: "Fixed price. Clear scope. No surprises.",
  packagesNote: "Prices exclude VAT and are the same as the offer we send on WhatsApp.",
  highlightBadge: "Most popular",
  deliveryLabel: "Delivery:",
  revisionsLabel: "Revisions:",
  packageCta: "Let's talk about this package",
  packages: {
    vitrin: {
      name: "Vitrin",
      tagline: "One page, simple and fast. For shops that just want to show up on Google.",
      deliveryDays: "about 5 business days",
      revisions: "1 revision round",
      includes: ["Single-page website", "Business name, services and short intro", "Phone and WhatsApp button", "Address and map", "Opening hours", "Fast-loading on mobile"],
    },
    servis: {
      name: "Servis",
      tagline: "A multi-section site. For shops that want to explain their services in detail.",
      deliveryDays: "about 10 business days",
      revisions: "2 revision rounds",
      includes: ["Everything in Vitrin", "Separate service sections (body, paint, mechanical, etc.)", "Photo gallery", "Customer reviews area", "Frequently asked questions section", "Google Maps link"],
    },
    buyume: {
      name: "Büyüme",
      tagline: "A larger site. For shops that want multiple service pages and an articles section.",
      deliveryDays: "about 15 business days",
      revisions: "3 revision rounds",
      includes: ["Everything in Servis", "Multiple service pages", "Articles / news section (regular content if you want)", "Contact form", "Technical setup so you can be found on Google", "A short usage walkthrough after delivery"],
    },
  },
  maintenanceDesc: "Content updates, small changes, technical maintenance and backups. Optional — not required.",
  exclusionsTitle: "Not included in the price",
  exclusionsIntro: "To be upfront: the following are not included in the package price:",
  exclusions: ["Logo design", "Photography", "Ad management (Google/Instagram ads)", "Setting up / verifying a Google Business Profile", "Accounting and e-invoicing systems"],
  stepsKicker: "How It Works",
  stepsTitle: "Ready in three steps",
  steps: [
    { step: "1", title: "Sample page", text: "First we prepare a sample page for you. No payment. If you like it, we continue." },
    { step: "2", title: "Content & approval", text: "We add your services, photos and contact details. You review and approve." },
    { step: "3", title: "Launch", text: "The site goes live. You get your own address to share on Google and by phone." },
  ],
  faqKicker: "Frequently Asked Questions",
  faqTitle: "Questions you might have",
  faqs: [
    { q: "What's included in the price?", a: "It depends on the package you choose. The Vitrin package includes a single-page site, contact and map. The Servis and Büyüme packages also add sections like services, gallery and reviews. We list exactly what each package includes above." },
    { q: "How long does it take?", a: "The Vitrin package is delivered in about 5 business days, Servis in about 10, and Büyüme in about 15. Timing can be shorter depending on how quickly you send content and photos." },
    { q: "Can I make changes later?", a: "Yes. Each package includes a set number of free revision rounds. For updates after launch you can take the 900 TL/month maintenance service; it is not required." },
    { q: "Will the site be mine?", a: "Yes, the site belongs to your business. The content and domain represent you. You're free to move it elsewhere if you wish." },
    { q: "What if I don't have photos?", a: "No problem. Photos taken with your phone are usually enough. If you have none, we start with a clean, tidy layout and add photos whenever you like. Professional photography is not included in the price." },
    { q: "Can I cancel if I don't like it?", a: "In the first step we prepare a sample page without taking payment. If you don't like it, you're not obliged to continue — removing the risk from the very start." },
  ],
  closing: {
    title: "Send a short message, we'll take it from there",
    desc: "Not sure which package suits you? Don't worry. Message us on WhatsApp and we'll decide together. You can also download the offer as a PDF.",
    ctaWhatsapp: "Message on WhatsApp",
    ctaPdf: "Download offer PDF",
    analysisPre: "If you'd like to talk in more detail, you can book a ",
    analysisLink: "free needs analysis",
    analysisPost: ".",
    samplesPre: "Want to see sample work? ",
    samplesLink: "Browse examples",
  },
  waMessages: {
    general: "Hello, I'd like information about the website packages for my auto repair shop.",
    analysis: "Hello, I'd like to discuss my shop's situation and find the package that fits me best.",
    pkg: (name) => `Hello, I'd like information about the "${name}" package for my auto repair shop.`,
  },
};

const de: Bundle = {
  hero: {
    kicker: "Für Kfz-Werkstätten",
    titleA: "Kunden suchen die Werkstatt bei Google.",
    titleB: "Ohne Seite finden sie dich nicht.",
    desc: "Eine einfache, schnelle Website, die deinem Betrieb gehört — für Kfz-, Karosserie-/Lack- und Autoelektrik-Werkstätten. Festpreis, klarer Umfang, keine Überraschungen.",
    ctaPackages: "Pakete & Preise ansehen",
    ctaWhatsapp: "Per WhatsApp schreiben",
  },
  social: {
    badge: "Verifizierter Kunde",
    sameSector: "Gleiche Branche · Gleiche Stadt (İzmir)",
    quote:
      "Ich kann jetzt mühelos Schulden verfolgen und meine Einnahmen und Ausgaben in Echtzeit einsehen. Es hat meinen Job wirklich erleichtert und ist sehr praktisch. Neulich, kurz nach der Fahrzeugübergabe, habe ich dem Kunden den Servicebericht direkt als PDF geschickt — ich habe Zeit gespart und habe jetzt ein echtes System in meinem Laden.",
    author: "Serdar Hezer",
    role: "Inhaber, Hezer Otoşanzıman · İzmir, Türkei",
    caseLink: "Arbeit ansehen",
  },
  lossesKicker: "Warum es wichtig ist",
  lossesTitle: "Drei Dinge, die eine Werkstatt ohne Website verliert",
  lossLabel: "Verlust",
  losses: [
    { title: "Neue Kunden", text: "Heute sucht man die Werkstatt zuerst bei Google. Ohne Seite geht der Kunde, der dich nicht findet, zur Werkstatt nebenan." },
    { title: "Vertrauen", text: "Wer deinen Namen sucht und eine ordentliche Seite sieht, vertraut dir. Erscheint nichts, wird er skeptisch." },
    { title: "Zeit", text: "Adresse, Öffnungszeiten, welche Arbeiten du machst… Statt dieselben Fragen am Telefon zu wiederholen, zeigst du alles auf einer Seite." },
  ],
  packagesKicker: "Pakete & Preise",
  packagesTitle: "Festpreis. Klarer Umfang. Keine Überraschungen.",
  packagesNote: "Preise verstehen sich ohne MwSt. und entsprechen dem Angebot, das wir per WhatsApp senden.",
  highlightBadge: "Am beliebtesten",
  deliveryLabel: "Lieferung:",
  revisionsLabel: "Korrekturen:",
  packageCta: "Über dieses Paket sprechen",
  packages: {
    vitrin: {
      name: "Vitrin",
      tagline: "Eine Seite, einfach und schnell. Für Werkstätten, die einfach bei Google erscheinen wollen.",
      deliveryDays: "ca. 5 Werktage",
      revisions: "1 Korrekturrunde",
      includes: ["Einseitige Website", "Firmenname, Leistungen und kurze Vorstellung", "Telefon- und WhatsApp-Button", "Adresse und Karte", "Öffnungszeiten", "Schnell ladend auf dem Handy"],
    },
    servis: {
      name: "Servis",
      tagline: "Eine mehrteilige Website. Für Werkstätten, die ihre Leistungen ausführlich zeigen wollen.",
      deliveryDays: "ca. 10 Werktage",
      revisions: "2 Korrekturrunden",
      includes: ["Alles aus Vitrin", "Separate Leistungsbereiche (Karosserie, Lack, Mechanik usw.)", "Fotogalerie", "Bereich für Kundenbewertungen", "Bereich für häufige Fragen", "Google-Maps-Link"],
    },
    buyume: {
      name: "Büyüme",
      tagline: "Eine größere Website. Für Werkstätten mit mehreren Leistungsseiten und einem Beitragsbereich.",
      deliveryDays: "ca. 15 Werktage",
      revisions: "3 Korrekturrunden",
      includes: ["Alles aus Servis", "Mehrere Leistungsseiten", "Beitrags-/Newsbereich (auf Wunsch regelmäßige Inhalte)", "Kontaktformular", "Technische Einrichtung, damit man dich bei Google findet", "Kurze Einführung nach der Übergabe"],
    },
  },
  maintenanceDesc: "Inhaltsaktualisierungen, kleine Änderungen, technische Wartung und Backups. Optional — nicht verpflichtend.",
  exclusionsTitle: "Nicht im Preis enthalten",
  exclusionsIntro: "Ehrlich gesagt: Folgendes ist nicht im Paketpreis enthalten:",
  exclusions: ["Logo-Design", "Fotoaufnahmen", "Werbeverwaltung (Google-/Instagram-Anzeigen)", "Einrichtung / Verifizierung eines Google-Unternehmensprofils", "Buchhaltungs- und E-Rechnungssysteme"],
  stepsKicker: "So läuft es ab",
  stepsTitle: "In drei Schritten fertig",
  steps: [
    { step: "1", title: "Beispielseite", text: "Zuerst erstellen wir eine Beispielseite für dich. Keine Zahlung. Wenn sie dir gefällt, machen wir weiter." },
    { step: "2", title: "Inhalt & Freigabe", text: "Wir fügen deine Leistungen, Fotos und Kontaktdaten ein. Du prüfst und gibst frei." },
    { step: "3", title: "Veröffentlichung", text: "Die Seite geht online. Du bekommst deine eigene Adresse zum Teilen bei Google und am Telefon." },
  ],
  faqKicker: "Häufige Fragen",
  faqTitle: "Fragen, die du vielleicht hast",
  faqs: [
    { q: "Was ist im Preis enthalten?", a: "Das hängt vom gewählten Paket ab. Das Vitrin-Paket enthält eine einseitige Website, Kontakt und Karte. Servis und Büyüme fügen zusätzlich Bereiche wie Leistungen, Galerie und Bewertungen hinzu. Oben ist genau aufgelistet, was jedes Paket enthält." },
    { q: "Wie lange dauert es?", a: "Das Vitrin-Paket wird in ca. 5 Werktagen geliefert, Servis in ca. 10 und Büyüme in ca. 15. Die Dauer kann kürzer sein, je nachdem wie schnell du Inhalte und Fotos schickst." },
    { q: "Kann ich später Änderungen machen?", a: "Ja. Jedes Paket enthält eine bestimmte Anzahl kostenloser Korrekturrunden. Für Aktualisierungen nach dem Launch kannst du die Wartung für 900 TL/Monat nutzen; sie ist nicht verpflichtend." },
    { q: "Gehört die Seite mir?", a: "Ja, die Seite gehört deinem Betrieb. Inhalt und Domain repräsentieren dich. Du kannst sie jederzeit woanders hin umziehen." },
    { q: "Was, wenn ich keine Fotos habe?", a: "Kein Problem. Mit dem Handy aufgenommene Fotos reichen meist aus. Ohne Fotos starten wir mit einem sauberen Layout und ergänzen sie später. Professionelle Fotoaufnahmen sind nicht im Preis enthalten." },
    { q: "Kann ich absagen, wenn es mir nicht gefällt?", a: "Im ersten Schritt erstellen wir ohne Zahlung eine Beispielseite. Gefällt sie dir nicht, musst du nicht weitermachen — so ist das Risiko von Anfang an ausgeschlossen." },
  ],
  closing: {
    title: "Schreib kurz, den Rest besprechen wir",
    desc: "Nicht sicher, welches Paket passt? Kein Problem. Schreib uns per WhatsApp und wir entscheiden gemeinsam. Du kannst das Angebot auch als PDF herunterladen.",
    ctaWhatsapp: "Per WhatsApp schreiben",
    ctaPdf: "Angebot als PDF",
    analysisPre: "Wenn du ausführlicher sprechen möchtest, kannst du eine ",
    analysisLink: "kostenlose Bedarfsanalyse",
    analysisPost: " buchen.",
    samplesPre: "Möchtest du Beispielarbeiten sehen? ",
    samplesLink: "Beispiele ansehen",
  },
  waMessages: {
    general: "Hallo, ich hätte gerne Informationen zu den Website-Paketen für meine Kfz-Werkstatt.",
    analysis: "Hallo, ich möchte die Situation meiner Werkstatt besprechen und das passende Paket finden.",
    pkg: (name) => `Hallo, ich hätte gerne Informationen zum Paket "${name}" für meine Kfz-Werkstatt.`,
  },
};

const dict: Record<Lang, Bundle> = { tr, en, de };

export type LocalizedPackage = PackageText & {
  id: PackageId;
  price: number;
  priceLabel: string;
  highlight: boolean;
};

export function getOtoServis(lang: Lang) {
  const b = dict[lang] ?? dict.tr;
  const packages: LocalizedPackage[] = packageOrder.map((id) => ({
    id,
    ...prices[id],
    ...b.packages[id],
  }));
  return {
    ...b,
    packages,
    maintenance: { ...maintenancePrice, desc: b.maintenanceDesc },
  };
}
