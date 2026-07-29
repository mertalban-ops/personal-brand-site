export type FAQ = {
  q: string;
  a: string;
  category?: "genel" | "surec" | "teknik" | "fiyat";
};

export const faqs: FAQ[] = [
  {
    q: "Hazır paket mi satıyorsunuz, özel sistem mi geliştiriyorsunuz?",
    a: "Satın alınan hazır bir paket değil, işletmenin işleyişine, terminolojisine ve ihtiyaçlarına göre özelleştirilmiş bir sistemdir. Modüller, kullanıcı akışları ve entegrasyonlar işletmenin gereksinimlerine göre ayrı ayrı planlanır.",
    category: "genel",
  },
  {
    q: "Geliştirdiğiniz sistemler mobilde de kullanılabiliyor mu?",
    a: "Evet. Kurduğumuz tüm web tabanlı iş takip ve operasyon sistemleri hem bilgisayarda hem de cep telefonu veya tablette sorunsuz çalışacak standartta tasarlanır.",
    category: "teknik",
  },
  {
    q: "Süreç nasıl başlar?",
    a: "Kısa bir ön görüşmeyle başlıyoruz. Operasyonunuzu, yaşadığınız sorunları ve beklentilerinizi dinliyoruz. Ardından kapsam ve teklifimizi sunuyoruz.",
    category: "surec",
  },
  {
    q: "Fiyat nasıl belirlenir?",
    a: "Sistemin büyüklüğüne, modül sayısına (Stok, Finans, Rapor, Otomasyon) ve entegrasyon ihtiyacına göre değişir. İlk görüşmede net bütçe ve takvim sunuyoruz.",
    category: "fiyat",
  },
  {
    q: "Sistem teslim edildikten sonra destek veriyor musunuz?",
    a: "Evet. Teslim sonrası aylık bakım anlaşmalarıyla güvenlik kontrollerini, güncellemeleri ve yeni geliştirme ihtiyaçlarını planlı biçimde yönetiyoruz.",
    category: "surec",
  },
  {
    q: "Hangi işletmeler için sistem kuruyorsunuz?",
    a: "Excel, WhatsApp veya defter üzerinden süreç yönetmekte zorlanan, ancak büyük ve pahalı ERP programlarına gerek duymayan KOBİ'ler ve girişimler için özel sistemler kuruyoruz.",
    category: "genel",
  },
  {
    q: "Web sitesi mi, web uygulaması mı ihtiyacım var?",
    a: "Web sitesi, markanızı ve hizmetlerinizi tanıtır; müşterilerinizin güvenini kazanır. Web uygulaması ise kullanıcıların giriş yaptığı, veri girdiği, işlem yaptığı ve rapor aldığı çalışan sistemdir. Her ikisini de geliştiriyoruz — hangisinin size uyduğunu kısa bir görüşmeyle netleştirebiliriz.",
    category: "genel",
  },
  {
    q: "Geliştirme ne kadar sürer?",
    a: "Projenin kapsamına göre genellikle 4 ila 12 hafta arasında değişir. Modül sayısı, entegrasyonlar ve veri geçişi ihtiyacı süreyi etkiler. İlk görüşmede tahmini takvimi paylaşırız.",
    category: "fiyat",
  },
];

export function getHomepageFAQs(): FAQ[] {
  return faqs.filter((f) =>
    ["Web sitesi mi", "Hazır paket", "mobilde", "Fiyat nasıl"].some((keyword) =>
      f.q.includes(keyword)
    )
  );
}
