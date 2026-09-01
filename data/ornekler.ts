// /ornekler — demo galerisi (çok dilli: tr/en/de).
// ÖNEMLİ (Kalite kapısı G3/G6): Buradaki örneklerin tamamı TEMSİLİ ve KURGUSALDIR.
// Gerçek bir işletmeye ait değildir. Hiçbir gerçek marka, logo veya müşteri içeriği
// izinsiz kullanılamaz. Yeni örnek eklerken gerçek işletme adı/logosu KULLANMA.

import type { Lang } from "@/data/oto-servis";

export type OrnekService = { title: string; desc: string };

type OrnekLocale = {
  name: string;
  sector: string;
  city: string;
  tagline: string;
  summary: string;
  hours: string;
  services: OrnekService[];
  highlights: string[];
};

export type Ornek = {
  slug: string;
  accent: string; // demo vurgu rengi (hex)
  phone: string; // temsili
  i18n: Record<Lang, OrnekLocale>;
};

export const disclaimer: Record<Lang, string> = {
  tr: "Örnek çalışma — Tanıtım amacıyla hazırlanmış temsili bir örnektir. Gerçek bir işletmeye ait değildir; hiçbir marka, logo veya içerik izinsiz kullanılmamıştır.",
  en: "Sample work — A representative example created for demonstration. It does not belong to any real business; no brand, logo or content is used without permission.",
  de: "Beispielarbeit — Ein repräsentatives Muster zu Demonstrationszwecken. Es gehört keinem realen Unternehmen; keine Marke, kein Logo und kein Inhalt wird ohne Erlaubnis verwendet.",
};

// UI etiketleri (galeri + detay)
export const ornekLabels: Record<Lang, {
  sampleTag: string;
  openExample: string;
  galleryKicker: string;
  galleryTitle: string;
  galleryDesc: string;
  representative: string;
  servicesTitle: string;
  mapLink: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPackages: string;
  ctaWhatsapp: string;
  ctaTitleDetail: string;
  ctaDescDetail: string;
  backAll: string;
  callLabel: string;
}> = {
  tr: {
    sampleTag: "Örnek çalışma",
    openExample: "Örneği aç",
    galleryKicker: "Örnek Çalışmalar",
    galleryTitle: "Bir oto servis sitesi nasıl görünür?",
    galleryDesc: "Aşağıdaki örnekler, farklı servis türleri için hazırlanmış temsili tek sayfalık site örnekleridir. İncele, hangisinin sana yakın olduğuna bak.",
    representative: "temsili",
    servicesTitle: "Hizmetlerimiz",
    mapLink: "Harita bağlantısı",
    ctaTitle: "Kendi servisin için böyle bir sayfa ister misin?",
    ctaDesc: "Paketleri ve fiyatları sektör sayfasında görebilir, ya da doğrudan WhatsApp'tan yazabilirsin.",
    ctaPackages: "Paketleri ve fiyatları gör",
    ctaWhatsapp: "WhatsApp'tan yaz",
    ctaTitleDetail: "Seninki de böyle olsun",
    ctaDescDetail: "Paketleri ve fiyatları gör, ya da WhatsApp'tan kısa bir mesaj at.",
    backAll: "Tüm örneklere dön",
    callLabel: "Ara",
  },
  en: {
    sampleTag: "Sample work",
    openExample: "Open example",
    galleryKicker: "Sample Work",
    galleryTitle: "What does an auto repair shop site look like?",
    galleryDesc: "The examples below are representative single-page sites prepared for different shop types. Browse them and see which one fits you.",
    representative: "representative",
    servicesTitle: "Our Services",
    mapLink: "Map link",
    ctaTitle: "Want a page like this for your own shop?",
    ctaDesc: "See packages and prices on the sector page, or message us directly on WhatsApp.",
    ctaPackages: "See packages & prices",
    ctaWhatsapp: "Message on WhatsApp",
    ctaTitleDetail: "Let's make yours look like this",
    ctaDescDetail: "See packages and prices, or send a short message on WhatsApp.",
    backAll: "Back to all examples",
    callLabel: "Call",
  },
  de: {
    sampleTag: "Beispielarbeit",
    openExample: "Beispiel öffnen",
    galleryKicker: "Beispielarbeiten",
    galleryTitle: "Wie sieht eine Werkstatt-Website aus?",
    galleryDesc: "Die folgenden Beispiele sind repräsentative einseitige Websites für verschiedene Werkstatttypen. Sieh sie dir an und finde, was zu dir passt.",
    representative: "repräsentativ",
    servicesTitle: "Unsere Leistungen",
    mapLink: "Karten-Link",
    ctaTitle: "Möchtest du so eine Seite für deine Werkstatt?",
    ctaDesc: "Pakete und Preise findest du auf der Branchenseite, oder schreib uns direkt per WhatsApp.",
    ctaPackages: "Pakete & Preise ansehen",
    ctaWhatsapp: "Per WhatsApp schreiben",
    ctaTitleDetail: "So soll auch deine aussehen",
    ctaDescDetail: "Sieh dir Pakete und Preise an oder schreib kurz per WhatsApp.",
    backAll: "Zurück zu allen Beispielen",
    callLabel: "Anrufen",
  },
};

export const ornekler: Ornek[] = [
  {
    slug: "ornek-oto-servis",
    accent: "#10b981",
    phone: "0500 000 00 00",
    i18n: {
      tr: {
        name: "Örnek Oto Servis",
        sector: "Genel oto tamir & bakım",
        city: "İzmir",
        tagline: "Aracınız güvenilir ellerde",
        summary: "Genel bakım ve mekanik onarım yapan bir oto servis için tek sayfalık temsili site örneği.",
        hours: "Hafta içi 08:30 – 19:00 · Cumartesi 09:00 – 17:00",
        services: [
          { title: "Periyodik bakım", desc: "Yağ, filtre ve genel kontrol." },
          { title: "Fren sistemi", desc: "Balata, disk ve fren kontrolü." },
          { title: "Motor arıza tespiti", desc: "Cihazla arıza okuma ve onarım." },
          { title: "Akü & elektrik", desc: "Akü değişimi ve temel elektrik." },
        ],
        highlights: ["15 yıllık tecrübe", "Orijinal ve muadil parça", "İşlem öncesi bilgilendirme"],
      },
      en: {
        name: "Sample Auto Service",
        sector: "General auto repair & maintenance",
        city: "İzmir",
        tagline: "Your car in reliable hands",
        summary: "A representative single-page site example for an auto shop doing general maintenance and mechanical repair.",
        hours: "Weekdays 08:30 – 19:00 · Saturday 09:00 – 17:00",
        services: [
          { title: "Periodic maintenance", desc: "Oil, filter and general check." },
          { title: "Brake system", desc: "Pads, discs and brake check." },
          { title: "Engine diagnostics", desc: "Device-based fault reading and repair." },
          { title: "Battery & electrics", desc: "Battery change and basic electrics." },
        ],
        highlights: ["15 years of experience", "Original and aftermarket parts", "Briefing before any work"],
      },
      de: {
        name: "Beispiel Kfz-Werkstatt",
        sector: "Allgemeine Kfz-Reparatur & Wartung",
        city: "İzmir",
        tagline: "Ihr Auto in zuverlässigen Händen",
        summary: "Ein repräsentatives einseitiges Beispiel für eine Werkstatt mit allgemeiner Wartung und Mechanik.",
        hours: "Wochentags 08:30 – 19:00 · Samstag 09:00 – 17:00",
        services: [
          { title: "Regelmäßige Wartung", desc: "Öl, Filter und allgemeine Prüfung." },
          { title: "Bremssystem", desc: "Beläge, Scheiben und Bremsprüfung." },
          { title: "Motordiagnose", desc: "Gerätebasierte Fehlerauslesung und Reparatur." },
          { title: "Batterie & Elektrik", desc: "Batteriewechsel und Basiselektrik." },
        ],
        highlights: ["15 Jahre Erfahrung", "Original- und Nachrüstteile", "Aufklärung vor jeder Arbeit"],
      },
    },
  },
  {
    slug: "ornek-kaporta-boya",
    accent: "#3b82f6",
    phone: "0500 000 00 00",
    i18n: {
      tr: {
        name: "Usta Kaporta & Boya (Örnek)",
        sector: "Kaporta – boya",
        city: "İzmir",
        tagline: "Çiziği, göçüğü ilk günkü hâline getiriyoruz",
        summary: "Kaporta ve boya işleri yapan bir işletme için galeri odaklı tek sayfalık temsili site örneği.",
        hours: "Hafta içi 09:00 – 19:00 · Cumartesi 09:00 – 16:00",
        services: [
          { title: "Göçük düzeltme", desc: "Boyasız ve boyalı göçük onarımı." },
          { title: "Boya işleri", desc: "Lokal ve komple boya." },
          { title: "Sigorta işlemleri", desc: "Hasar sürecinde yönlendirme." },
          { title: "Pasta & cila", desc: "Yüzey yenileme ve parlatma." },
        ],
        highlights: ["Öncesi–sonrası fotoğraflar", "Renk eşleştirme", "Teslim tarihi netliği"],
      },
      en: {
        name: "Master Body & Paint (Sample)",
        sector: "Body & paint",
        city: "İzmir",
        tagline: "We restore scratches and dents to day one",
        summary: "A gallery-focused representative single-page site example for a body & paint business.",
        hours: "Weekdays 09:00 – 19:00 · Saturday 09:00 – 16:00",
        services: [
          { title: "Dent repair", desc: "Paintless and painted dent repair." },
          { title: "Paint work", desc: "Local and full paint." },
          { title: "Insurance handling", desc: "Guidance through the claim process." },
          { title: "Polish & wax", desc: "Surface renewal and polishing." },
        ],
        highlights: ["Before–after photos", "Color matching", "Clear delivery date"],
      },
      de: {
        name: "Meister Karosserie & Lack (Beispiel)",
        sector: "Karosserie & Lack",
        city: "İzmir",
        tagline: "Kratzer und Dellen wie am ersten Tag",
        summary: "Ein galeriebasiertes repräsentatives Einseiten-Beispiel für einen Karosserie- und Lackbetrieb.",
        hours: "Wochentags 09:00 – 19:00 · Samstag 09:00 – 16:00",
        services: [
          { title: "Dellenentfernung", desc: "Lackfreie und lackierte Dellenreparatur." },
          { title: "Lackarbeiten", desc: "Teil- und Komplettlackierung." },
          { title: "Versicherungsabwicklung", desc: "Begleitung im Schadensprozess." },
          { title: "Politur & Wachs", desc: "Oberflächenerneuerung und Politur." },
        ],
        highlights: ["Vorher-Nachher-Fotos", "Farbanpassung", "Klarer Liefertermin"],
      },
    },
  },
  {
    slug: "ornek-oto-elektrik",
    accent: "#f59e0b",
    phone: "0500 000 00 00",
    i18n: {
      tr: {
        name: "Merkez Oto Elektrik (Örnek)",
        sector: "Oto elektrik",
        city: "İzmir",
        tagline: "Elektrik arızasında doğru adres",
        summary: "Oto elektrik işleri yapan bir usta için sade ve hızlı tek sayfalık temsili site örneği.",
        hours: "Hafta içi 08:30 – 18:30 · Cumartesi 09:00 – 15:00",
        services: [
          { title: "Marş & şarj sistemi", desc: "Marş, alternatör ve şarj kontrolü." },
          { title: "Aydınlatma", desc: "Far, sinyal ve iç aydınlatma." },
          { title: "Sensör & arıza", desc: "Elektronik arıza tespiti." },
          { title: "Ses & multimedya", desc: "Teyp ve kamera montajı." },
        ],
        highlights: ["Cihazla arıza tespiti", "Hızlı işlem", "Açık fiyatlandırma"],
      },
      en: {
        name: "Central Auto Electrics (Sample)",
        sector: "Auto electrics",
        city: "İzmir",
        tagline: "The right address for electrical faults",
        summary: "A simple, fast representative single-page site example for an auto electrics specialist.",
        hours: "Weekdays 08:30 – 18:30 · Saturday 09:00 – 15:00",
        services: [
          { title: "Starter & charging", desc: "Starter, alternator and charging check." },
          { title: "Lighting", desc: "Headlights, signals and interior lighting." },
          { title: "Sensors & faults", desc: "Electronic fault diagnosis." },
          { title: "Audio & multimedia", desc: "Stereo and camera installation." },
        ],
        highlights: ["Device-based diagnosis", "Fast service", "Transparent pricing"],
      },
      de: {
        name: "Zentrale Autoelektrik (Beispiel)",
        sector: "Autoelektrik",
        city: "İzmir",
        tagline: "Die richtige Adresse bei Elektrikfehlern",
        summary: "Ein einfaches, schnelles repräsentatives Einseiten-Beispiel für einen Autoelektrik-Spezialisten.",
        hours: "Wochentags 08:30 – 18:30 · Samstag 09:00 – 15:00",
        services: [
          { title: "Anlasser & Ladung", desc: "Anlasser-, Lichtmaschinen- und Ladeprüfung." },
          { title: "Beleuchtung", desc: "Scheinwerfer, Blinker und Innenbeleuchtung." },
          { title: "Sensoren & Fehler", desc: "Elektronische Fehlerdiagnose." },
          { title: "Audio & Multimedia", desc: "Radio- und Kameraeinbau." },
        ],
        highlights: ["Gerätebasierte Diagnose", "Schneller Service", "Transparente Preise"],
      },
    },
  },
];

export function getOrnek(slug: string): Ornek | undefined {
  return ornekler.find((o) => o.slug === slug);
}
