export interface FounderPrinciple {
  title: string;
  text: string;
}

export interface StudioDetails {
  brand: {
    name: string;
    tagline: string;
    description: string;
    location: string;
    whyBuilt: string;
  };
  founder: {
    name: string;
    role: string;
    bio: string;
    principles: FounderPrinciple[];
    note: string;
  };
  techApproach: string;
  securityNote: string;
}

const studioTr: StudioDetails = {
  brand: {
    name: "Albanexa",
    tagline: "İşletme Süreçlerini Anlayan Dijital Çözüm Yaklaşımı",
    description:
      "Albanexa, işletmelerin günlük çalışma biçimlerini, operasyonel ihtiyaçlarını ve büyüme hedeflerini anlayarak dijital çözümler geliştiren bağımsız bir ürün stüdyosudur. Projenin kapsamına göre gerekli uzmanlık alanlarında güvenilir çözüm ortaklarıyla çalışılır.",
    location: "İzmir, Türkiye · Türkiye geneline uzaktan hizmet",
    whyBuilt:
      "Çoğu KOBİ ya hantal ERP sistemlerine mahkum kalıyor ya da Excel ve WhatsApp arasında kaybolmuş süreçlerle çalışıyor. İşletmenizin ölçeğine uygun, gerçekten kullanılan sistemler ve dönüşüm odaklı web siteleri geliştirmek için çalışıyoruz.",
  },
  founder: {
    name: "Mert Alban",
    role: "Stüdyo Yöneticisi & Mühendis",
    bio: "Albanexa, işletmelerin günlük çalışma biçimlerini, operasyonel ihtiyaçlarını ve büyüme hedeflerini anlayarak dijital çözümler geliştiren bağımsız bir ürün stüdyosudur. Projeler; süreç analizi, kullanıcı deneyimi, tasarım ve teknik geliştirme birlikte değerlendirilerek yürütülür. Amaç yalnızca çalışan bir yazılım üretmek değil, işletmenin gerçek ihtiyacına uyum sağlayan, anlaşılır ve geliştirilebilir bir sistem oluşturmaktır. Stüdyonun çalışmaları Mert Alban tarafından yönetilir.",
    principles: [
      {
        title: "Süreci anlamadan kodlamaya başlamamak",
        text: "Günlük operasyon adımlarını, iş akışlarını ve veri girdilerini haritalandırmadan tek bir satır kod yazmıyoruz."
      },
      {
        title: "Kullanıcıların sistemi benimsemesini sağlamak",
        text: "Yazılımın başarısı kodun temizliği kadar, personelin onu kolayca kullanmasıyla ölçülür. Arayüzleri sade ve hızlı tutuyoruz."
      },
      {
        title: "Operasyonel darboğazları analiz etmek",
        text: "Hangi adımda zaman kaybedildiğini ve hangi verinin mükerrer girildiğini inceleyerek süreçleri dijitalleştiriyoruz."
      },
      {
        title: "Yönetici görünürlüğünü ve raporlamayı artırmak",
        text: "Stok durumunu, güncel cari bakiyeleri ve tahsilatları tek bir anlaşılır yönetim panelinden görünür kılıyoruz."
      },
      {
        title: "Sürdürülebilir ve geliştirilebilir mimari kurmak",
        text: "Aşırı karmaşık yapılar yerine bakım kolaylığı gözetilen, hafif ve özelleştirilmiş Next.js/Supabase çözümleri geliştiriyoruz."
      }
    ],
    note: "Her projede ihtiyaçların doğru anlaşılmasına, kapsamın açık biçimde belirlenmesine ve sürecin şeffaf yürütülmesine önem verilir.",
  },
  techApproach:
    "Görseller, yazı tipleri, JavaScript yükü ve sayfa bileşenleri Core Web Vitals hedefleri (LCP < 2.5s, CLS < 0.1, INP < 200ms) dikkate alınarak optimize edilir. Teknoloji seçiminde işletmenin gerçek ihtiyacı ve uzun vadeli bakım kolaylığı esastır.",
  securityNote:
    "Yetkilendirme yapısı, veri güvenliği ve yedekleme gereksinimleri projenin kapsamına ve kullanılan altyapıya göre planlanır. Rol bazlı erişim kontrolü, veritabanı güvenliği ve SSL kullanımı, gerektiren projelerde uygulanır.",
};

const studioEn: StudioDetails = {
  brand: {
    name: "Albanexa",
    tagline: "Process-Aware Digital Solution Approach",
    description:
      "Albanexa is an independent product studio developing custom digital systems, automations, and high-performance web applications by understanding operational needs.",
    location: "İzmir, Türkiye · Remote service globally",
    whyBuilt:
      "Most SMBs either get trapped in bulky ERP systems or lose control of their data between Excel and messaging apps. Albanexa builds right-sized, genuinely adopted systems and high-converting websites.",
  },
  founder: {
    name: "Mert Alban",
    role: "Studio Lead & Engineer",
    bio: "Albanexa is an independent product studio developing digital solutions by analyzing daily workflows, operational bottlenecks, and growth objectives. Projects integrate process analysis, UX design, and technical engineering. The studio's operations are led by Mert Alban, collaborating with trusted domain specialists depending on project scope.",
    principles: [
      {
        title: "Never code before mapping the daily process",
        text: "We write zero code until we map out your exact daily workflows, operational steps, and data entry points."
      },
      {
        title: "Ensure user adoption & minimal friction",
        text: "The success of a system is measured by how easily staff adopts it. We design interfaces for speed, clarity, and ease."
      },
      {
        title: "Measure and resolve operational bottlenecks",
        text: "We pinpoint where time is lost or data is entered redundantly, and engineer structures to bypass those bottlenecks."
      },
      {
        title: "Increase executive visibility & reporting",
        text: "We empower business owners to view real-time stock levels, current accounts, and collections on a clean executive dashboard."
      },
      {
        title: "Develop simple, maintainable software",
        text: "Rather than heavy templates, we build lightweight, customized Next.js/Supabase solutions prioritizing long-term maintainability."
      }
    ],
    note: "We prioritize clear scoping, transparent communication, and empirical verification across every project phase.",
  },
  techApproach:
    "Assets, fonts, and scripts are optimized with Core Web Vitals targets in mind. Modern web standards (Next.js, Supabase, TypeScript, Tailwind) power our long-term maintainable architecture.",
  securityNote:
    "Authorization design, database security, and backup requirements are planned according to each project's scope and infrastructure. Role-based access control, database security, and SSL are applied where the project requires them.",
};

const studioDe: StudioDetails = {
  brand: {
    name: "Albanexa",
    tagline: "Prozessorientierter digitaler Lösungsansatz",
    description:
      "Albanexa ist ein unabhängiges Produktstudio, das maßgeschneiderte digitale Systeme, Automatisierungen und performante Webanwendungen entwickelt.",
    location: "Izmir, Türkei · Weltweiter Remote-Service",
    whyBuilt:
      "Viele KMU kämpfen mit unhandlichen ERP-Systemen oder verlieren ihre Daten zwischen Excel und Messaging-Apps. Albanexa wurde gegründet, um maßgeschneiderte, wirklich genutzte Systeme zu entwickeln.",
  },
  founder: {
    name: "Mert Alban",
    role: "Studioleiter & Ingenieur",
    bio: "Albanexa ist ein unabhängiges Produktstudio, das digitale Lösungen durch die Analyse täglicher Arbeitsabläufe entwickelt. Projekte verbinden Prozessanalyse, UX-Design und Software-Engineering. Die Arbeiten des Studios werden von Mert Alban geleitet.",
    principles: [
      {
        title: "Niemals codieren, bevor der Prozess erfasst ist",
        text: "Wir schreiben keinen Code, bevor wir Ihre täglichen Arbeitsabläufe und Dateneingabepunkte genau analysiert haben."
      },
      {
        title: "Benutzerakzeptanz sicherstellen",
        text: "Der Erfolg eines Systems bemisst sich daran, wie leicht das Personal es nutzt. Wir entwerfen Benutzeroberflächen für Klarheit."
      },
      {
        title: "Betriebliche Engpässe messen und optimieren",
        text: "Wir analysieren, wo Zeit verloren geht, und entwickeln Strukturen zur Vermeidung dieser Engpässe."
      },
      {
        title: "Sichtbarkeit für Geschäftsführer erhöhen",
        text: "Wir ermöglichen es Unternehmensinhabern, Lagerbestände, Kontokorrentsalden und Einnahmen auf einem Dashboard zu sehen."
      },
      {
        title: "Einfache, wartbare Software entwickeln",
        text: "Statt schwerer Vorlagen entwickeln wir schlanke, maßgeschneiderte Next.js/Supabase-Lösungen mit Fokus auf langfristige Wartbarkeit."
      }
    ],
    note: "Wir legen großen Wert auf klare Zieldefinitionen, transparente Kommunikation und empirische Prüfung in jeder Projektphase.",
  },
  techApproach:
    "Bilder, Schriften und Skripte werden unter Berücksichtigung der Core Web Vitals-Ziele optimiert. Wartungsfreundlichkeit bestimmt unsere Stack-Auswahl.",
  securityNote:
    "Berechtigungsstruktur, Datensicherheit und Backup-Anforderungen werden je nach Projektumfang und genutzter Infrastruktur geplant. Rollenbasierte Zugangskontrolle und Datenbanksicherheit werden dort eingesetzt, wo das Projekt es erfordert.",
};

export const getStudio = (lang: string): StudioDetails => {
  if (lang === "en") return studioEn;
  if (lang === "de") return studioDe;
  return studioTr;
};
