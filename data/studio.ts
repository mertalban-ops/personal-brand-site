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
    tagline: "Dijital Çözüm Stüdyosu",
    description:
      "Albanexa, Mert Alban tarafından yönetilen bağımsız bir dijital çözüm stüdyosudur. Projenin ihtiyaç duyduğu özel uzmanlıklarda güvenilir çözüm ortaklarıyla çalışılır.",
    location: "İzmir, Türkiye · Türkiye geneline uzaktan hizmet",
    whyBuilt:
      "Çoğu KOBİ ya hantal ERP sistemlerine mahkum kalıyor ya da Excel ve WhatsApp arasında kaybolmuş süreçlerle çalışıyor. Doğru boyutta, gerçekten kullanılan sistemler ve müşteri kazandıran web siteleri kurmak için Albanexa kuruldu.",
  },
  founder: {
    name: "Mert Alban",
    role: "Kurucu",
    bio: "Mert Alban, kalite yönetimi, süreç analizi, eğitim ve veri bazlı operasyon geliştirme deneyimini yazılım geliştirmeyle birleştirir. Bu yaklaşım sayesinde yalnızca çalışan ekranlar değil, işletmenin günlük işleyişine uyum sağlayan ve ekiplerin gerçekten kullanabildiği sistemler tasarlar.",
    principles: [
      {
        title: "Süreci anlamadan kodlamaya başlamamak",
        text: "Müşterinin günlük akışını, operasyon adımlarını ve veri girdilerini tamamen haritalandırmadan tek bir satır kod yazmıyoruz."
      },
      {
        title: "Kullanıcıların sistemi benimsemesini düşünmek",
        text: "Yazılımın başarısı kodun temizliği kadar, personelin onu severek kullanmasıyla ölçülür. Arayüzleri en basit ve hızlı seviyede tutuyoruz."
      },
      {
        title: "Operasyonel darboğazları ölçmek",
        text: "Hangi adımda zaman kaybedildiğini, hangi verinin mükerrer girildiğini analiz ediyor ve darboğazları ortadan kaldırıyoruz."
      },
      {
        title: "Yönetici görünürlüğünü artırmak",
        text: "İşletme sahibinin depodaki son durumu, güncel cari bakiyeleri ve tahsilat durumunu tek bir temiz dashboard'dan görmesini sağlıyoruz."
      },
      {
        title: "Basit ve sürdürülebilir çözümler geliştirmek",
        text: "Karmaşık kütüphaneler veya hazır şablonlar yerine, uzun yıllar bakım gerektirmeden çalışacak hafif ve özel Next.js/Supabase mimarileri kuruyoruz."
      }
    ],
    note: "Tüm süreçlerde analiz ve geliştirme aşamalarına doğrudan dahil oluyorum.",
  },
  techApproach:
    "Modern web teknolojileri (Next.js, Supabase, TypeScript, Tailwind) kullanıyoruz. Teknoloji seçiminde işletmenin gerçek ihtiyacı ve uzun vadeli bakım kolaylığı belirleyici.",
  securityNote:
    "Tüm sistemlerde rol bazlı erişim kontrolü, güvenli veritabanı yapısı ve düzenli yedekleme standarttır.",
};

const studioEn: StudioDetails = {
  brand: {
    name: "Albanexa",
    tagline: "Digital Solution Studio",
    description:
      "Albanexa is an independent digital solution studio managed by Mert Alban. We collaborate with trusted partners for specialized project requirements.",
    location: "Izmir, Turkey · Remote service globally",
    whyBuilt:
      "Most SMBs either get trapped in bulky ERP systems or lose control of their data between Excel and messaging apps. Albanexa was established to build right-sized, genuinely used systems and high-converting websites.",
  },
  founder: {
    name: "Mert Alban",
    role: "Founder",
    bio: "Mert Alban combines his experience in quality management, process analysis, training, and data-driven operations with custom software development. Through this holistic approach, he designs not just functioning interfaces, but digital systems that seamlessly integrate into daily operations and are gladly adopted by teams.",
    principles: [
      {
        title: "Never code before mapping the daily process",
        text: "We write zero code until we map out your exact daily workflows, operational steps, and data entry points."
      },
      {
        title: "Ensure user adoption & training",
        text: "The success of a system is measured by how easily the staff adopts it. We design interfaces for speed, clarity, and minimal friction."
      },
      {
        title: "Measure and optimize operational bottlenecks",
        text: "We pinpoint where time is lost or data is entered redundantly, and engineer structures to bypass those exact bottlenecks."
      },
      {
        title: "Increase executive visibility & reporting",
        text: "We empower business owners to view real-time stock levels, current accounts, and collections on a single, clean executive dashboard."
      },
      {
        title: "Develop simple, maintainable software",
        text: "Rather than heavy templates or complex libraries, we construct lightweight, customized Next.js/Supabase solutions that run reliably for years."
      }
    ],
    note: "I am directly involved in the scoping, design, and development stages of every project.",
  },
  techApproach:
    "We utilize modern web standards (Next.js, Supabase, TypeScript, Tailwind CSS). Maintenance ease and operational longevity guide our technical stacks.",
  securityNote:
    "Role-based access control, relational database security, and automated backups are standard in every system we launch.",
};

const studioDe: StudioDetails = {
  brand: {
    name: "Albanexa",
    tagline: "Studio für digitale Lösungen",
    description:
      "Albanexa ist ein von Mert Alban geführtes unabhängiges Studio für digitale Lösungen. Bei Bedarf arbeiten wir mit vertrauenswürdigen Partnern zusammen.",
    location: "Izmir, Türkei · Weltweiter Remote-Service",
    whyBuilt:
      "Viele KMU kämpfen entweder mit unhandlichen ERP-Systemen oder verlieren ihre Daten zwischen Excel und Messaging-Apps. Albanexa wurde gegründet, um maßgeschneiderte, wirklich genutzte Systeme und konversionsstarke Websites zu entwickeln.",
  },
  founder: {
    name: "Mert Alban",
    role: "Gründer",
    bio: "Mert Alban kombiniert seine Erfahrung in Qualitätsmanagement, Prozessanalyse, Schulung und datengesteuerten Abläufen mit maßgeschneiderter Softwareentwicklung. Durch diesen ganzheitlichen Ansatz entwirft er nicht nur funktionierende Benutzeroberflächen, sondern digitale Systeme, die sich nahtlos in die täglichen Abläufe einfügen und von Teams gerne angenommen werden.",
    principles: [
      {
        title: "Niemals codieren, bevor der Prozess erfasst ist",
        text: "Wir schreiben keinen Code, bevor wir Ihre täglichen Arbeitsabläufe, Betriebsschritte und Dateneingabepunkte genau analysiert haben."
      },
      {
        title: "Benutzerakzeptanz und Schulung sicherstellen",
        text: "Der Erfolg eines Systems bemisst sich daran, wie gerne das Personal es nutzt. Wir entwerfen Benutzeroberflächen für Geschwindigkeit und Klarheit."
      },
      {
        title: "Betriebliche Engpässe messen und optimieren",
        text: "Wir analysieren, wo Zeit verloren geht oder Daten redundant erfasst werden, und entwickeln Strukturen zur Vermeidung dieser Engpässe."
      },
      {
        title: "Sichtbarkeit für Geschäftsführer erhöhen",
        text: "Wir ermöglichen es Unternehmensinhabern, Lagerbestände, Kontokorrentsalden und Einnahmen auf einem einzigen, übersichtlichen Dashboard in Echtzeit zu sehen."
      },
      {
        title: "Einfache, wartbare Software entwickeln",
        text: "Statt schwerer Vorlagen oder komplexer Bibliotheken erstellen wir schlanke Next.js/Supabase-Lösungen, die jahrelang zuverlässig laufen."
      }
    ],
    note: "Ich bin an der Konzeption, dem Design und der Entwicklung jedes Projekts direkt beteiligt.",
  },
  techApproach:
    "Wir nutzen moderne Webstandards (Next.js, Supabase, TypeScript, Tailwind CSS). Wartungsfreundlichkeit und Langlebigkeit bestimmen unsere Stack-Auswahl.",
  securityNote:
    "Rollenbasierte Zugriffskontrolle, relationale Datenbanksicherheit und automatische Backups sind Standard in jedem System.",
};

export const getStudio = (lang: string): StudioDetails => {
  if (lang === "en") return studioEn;
  if (lang === "de") return studioDe;
  return studioTr;
};
