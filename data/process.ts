export type ProcessStep = {
  step: string;
  title: string;
  description: string;
  clientProvides: string[];
  weDeliver: string[];
  output: string;
  approvalPoint: boolean;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Ön Görüşme",
    description: "İşletmenizin mevcut durumunu, yaşadığınız sorunları ve beklentilerinizi dinliyoruz.",
    clientProvides: ["Operasyon ve süreç tanımı", "Mevcut araçlar (Excel, defter, WhatsApp vs.)", "Öncelikli sorunlar"],
    weDeliver: ["Sorun analizi özeti", "Uygun çözüm önerileri", "Yaklaşık kapsam"],
    output: "Kapsam taslağı",
    approvalPoint: false,
  },
  {
    step: "02",
    title: "İhtiyaç ve Darboğaz Analizi",
    description: "Operasyonunuzun hangi noktada tıkandığını ayrıntılı inceliyoruz.",
    clientProvides: ["Mevcut süreç belgeleri", "Örnek veriler (varsa)", "Kullanıcı rolleri listesi"],
    weDeliver: ["Darboğaz haritası", "Modül listesi önerisi", "Teknik yaklaşım taslağı"],
    output: "İhtiyaç belgesi",
    approvalPoint: true,
  },
  {
    step: "03",
    title: "Kapsam ve Teklif",
    description: "Sistemin tam kapsamını, bütçesini ve takvimini netleştiriyoruz.",
    clientProvides: ["Öncelik sıralaması", "Bütçe beklentisi"],
    weDeliver: ["Detaylı kapsam belgesi", "Fiyat teklifi", "Takvim"],
    output: "İmzalı kapsam belgesi",
    approvalPoint: true,
  },
  {
    step: "04",
    title: "Sistem Tasarımı",
    description: "Veri modeli, kullanıcı rolleri ve ekran akışlarını tasarlıyoruz.",
    clientProvides: ["Terminoloji ve alan adları", "Onay"],
    weDeliver: ["Wireframe / ekran akışı", "Veri modeli", "Kullanıcı yolculuğu"],
    output: "Tasarım dokümanı",
    approvalPoint: true,
  },
  {
    step: "05",
    title: "Geliştirme",
    description: "Tasarlanan sistemi modül modül geliştiriyoruz.",
    clientProvides: ["Ara geri bildirim", "Test verileri"],
    weDeliver: ["Çalışan modüller", "Haftalık ilerleme güncellemesi"],
    output: "Test ortamına alınan sistem",
    approvalPoint: false,
  },
  {
    step: "06",
    title: "Test ve Doğrulama",
    description: "Gerçek kullanım senaryolarıyla sistemi birlikte test ediyoruz.",
    clientProvides: ["Gerçek senaryo testleri", "Hata bildirimleri"],
    weDeliver: ["Hata düzeltmeleri", "Performans doğrulaması", "Kullanıcı kabulü"],
    output: "Test onayı",
    approvalPoint: true,
  },
  {
    step: "07",
    title: "Teslim",
    description: "Sistemi canlı ortama alıyor, ekibinizi kısa bir kullanım eğitimiyle hazırlıyoruz.",
    clientProvides: ["Canlı ortam erişimleri", "Ekip katılımı"],
    weDeliver: ["Canlı sistem", "Kullanım kılavuzu", "Teknik belgeler"],
    output: "Canlı sistem teslimi",
    approvalPoint: true,
  },
  {
    step: "08",
    title: "Destek ve Geliştirme",
    description: "Teslim sonrası sistemin büyümesine ve gelişmesine destek oluyoruz.",
    clientProvides: ["Yeni ihtiyaçlar", "Geri bildirim"],
    weDeliver: ["Bakım ve güvenlik güncellemeleri", "Yeni modül geliştirme", "Teknik destek"],
    output: "Aylık bakım anlaşması (isteğe bağlı)",
    approvalPoint: false,
  },
];

export const pricingNote =
  "Fiyat ve süre; modül sayısı, kullanıcı rolleri, entegrasyonlar ve veri geçişi ihtiyacına göre belirlenir. İlk görüşmede kapsamı netleştirip net teklif sunuyoruz.";
