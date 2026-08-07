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

export const processStepsEn: ProcessStep[] = [
  {
    step: "01",
    title: "Initial Meeting",
    description: "We listen to your current business state, the challenges you're facing, and your expectations.",
    clientProvides: ["Operations and process description", "Current tools (Excel, notebooks, WhatsApp, etc.)", "Priority issues"],
    weDeliver: ["Problem analysis summary", "Suitable solution recommendations", "Approximate scope"],
    output: "Scope draft",
    approvalPoint: false,
  },
  {
    step: "02",
    title: "Needs & Bottleneck Analysis",
    description: "We examine your operation in detail to identify exactly where it's getting stuck.",
    clientProvides: ["Current process documents", "Sample data (if available)", "User roles list"],
    weDeliver: ["Bottleneck map", "Module list proposal", "Technical approach draft"],
    output: "Needs document",
    approvalPoint: true,
  },
  {
    step: "03",
    title: "Scope & Proposal",
    description: "We define the full scope, budget, and timeline of the system.",
    clientProvides: ["Priority ranking", "Budget expectations"],
    weDeliver: ["Detailed scope document", "Price proposal", "Timeline"],
    output: "Signed scope document",
    approvalPoint: true,
  },
  {
    step: "04",
    title: "System Design",
    description: "We design the data model, user roles, and screen flows.",
    clientProvides: ["Terminology and field names", "Approval"],
    weDeliver: ["Wireframes / screen flows", "Data model", "User journey"],
    output: "Design document",
    approvalPoint: true,
  },
  {
    step: "05",
    title: "Development",
    description: "We build the designed system module by module.",
    clientProvides: ["Interim feedback", "Test data"],
    weDeliver: ["Working modules", "Weekly progress updates"],
    output: "System deployed to test environment",
    approvalPoint: false,
  },
  {
    step: "06",
    title: "Testing & Validation",
    description: "We test the system together using real-world scenarios.",
    clientProvides: ["Real scenario tests", "Bug reports"],
    weDeliver: ["Bug fixes", "Performance validation", "User acceptance"],
    output: "Test sign-off",
    approvalPoint: true,
  },
  {
    step: "07",
    title: "Delivery",
    description: "We deploy the system to production and prepare your team with a brief usage training.",
    clientProvides: ["Production environment access", "Team participation"],
    weDeliver: ["Live system", "User guide", "Technical documentation"],
    output: "Live system handover",
    approvalPoint: true,
  },
  {
    step: "08",
    title: "Support & Development",
    description: "We support the growth and evolution of the system after delivery.",
    clientProvides: ["New requirements", "Feedback"],
    weDeliver: ["Maintenance and security updates", "New module development", "Technical support"],
    output: "Monthly maintenance agreement (optional)",
    approvalPoint: false,
  },
];

export const processStepsDe: ProcessStep[] = [
  {
    step: "01",
    title: "Erstgespräch",
    description: "Wir hören uns Ihren aktuellen Geschäftszustand, Ihre Probleme und Erwartungen an.",
    clientProvides: ["Betriebs- und Prozessbeschreibung", "Aktuelle Tools (Excel, Notizbücher, WhatsApp usw.)", "Prioritäre Probleme"],
    weDeliver: ["Problemanalyse-Zusammenfassung", "Geeignete Lösungsempfehlungen", "Ungefährer Umfang"],
    output: "Umfangsentwurf",
    approvalPoint: false,
  },
  {
    step: "02",
    title: "Bedarfs- und Engpassanalyse",
    description: "Wir untersuchen Ihren Betrieb im Detail, um genau herauszufinden, wo er feststeckt.",
    clientProvides: ["Aktuelle Prozessdokumente", "Beispieldaten (falls vorhanden)", "Liste der Benutzerrollen"],
    weDeliver: ["Engpasskarte", "Modulvorschlagsliste", "Technischer Ansatzentwurf"],
    output: "Bedarfsdokument",
    approvalPoint: true,
  },
  {
    step: "03",
    title: "Umfang & Angebot",
    description: "Wir definieren den vollständigen Umfang, das Budget und den Zeitplan des Systems.",
    clientProvides: ["Prioritätsranking", "Budgeterwartungen"],
    weDeliver: ["Detailliertes Umfangsdokument", "Preisangebot", "Zeitplan"],
    output: "Unterzeichnetes Umfangsdokument",
    approvalPoint: true,
  },
  {
    step: "04",
    title: "Systemdesign",
    description: "Wir entwerfen das Datenmodell, Benutzerrollen und Bildschirmabläufe.",
    clientProvides: ["Terminologie und Feldnamen", "Genehmigung"],
    weDeliver: ["Wireframes / Bildschirmabläufe", "Datenmodell", "Benutzerreise"],
    output: "Designdokument",
    approvalPoint: true,
  },
  {
    step: "05",
    title: "Entwicklung",
    description: "Wir bauen das entworfene System Modul für Modul auf.",
    clientProvides: ["Zwischenfeedback", "Testdaten"],
    weDeliver: ["Funktionierende Module", "Wöchentliche Fortschrittsupdates"],
    output: "System in Testumgebung bereitgestellt",
    approvalPoint: false,
  },
  {
    step: "06",
    title: "Test & Validierung",
    description: "Wir testen das System gemeinsam mit realen Szenarien.",
    clientProvides: ["Reale Szenariotests", "Fehlerberichte"],
    weDeliver: ["Fehlerbehebungen", "Leistungsvalidierung", "Benutzerakzeptanz"],
    output: "Testabnahme",
    approvalPoint: true,
  },
  {
    step: "07",
    title: "Übergabe",
    description: "Wir stellen das System in der Produktionsumgebung bereit und bereiten Ihr Team mit einer kurzen Schulung vor.",
    clientProvides: ["Zugang zur Produktionsumgebung", "Teambeteiligung"],
    weDeliver: ["Live-System", "Benutzerhandbuch", "Technische Dokumentation"],
    output: "Live-System-Übergabe",
    approvalPoint: true,
  },
  {
    step: "08",
    title: "Support & Weiterentwicklung",
    description: "Wir unterstützen das Wachstum und die Weiterentwicklung des Systems nach der Übergabe.",
    clientProvides: ["Neue Anforderungen", "Feedback"],
    weDeliver: ["Wartungs- und Sicherheitsupdates", "Neue Modulentwicklung", "Technischer Support"],
    output: "Monatlicher Wartungsvertrag (optional)",
    approvalPoint: false,
  },
];

export const pricingNote =
  "Fiyat ve süre; modül sayısı, kullanıcı rolleri, entegrasyonlar ve veri geçişi ihtiyacına göre belirlenir. İlk görüşmede kapsamı netleştirip net teklif sunuyoruz.";

export const pricingNoteEn =
  "Price and timeline are determined by the number of modules, user roles, integrations, and data migration requirements. We clarify the scope in the first meeting and provide a firm quote.";

export const pricingNoteDe =
  "Preis und Zeitplan richten sich nach der Anzahl der Module, Benutzerrollen, Integrationen und Datenmigrationsbedarf. Im Erstgespräch klären wir den Umfang und unterbreiten ein verbindliches Angebot.";

export function getProcessSteps(lang: string): ProcessStep[] {
  if (lang === "en") return processStepsEn;
  if (lang === "de") return processStepsDe;
  return processSteps;
}

export function getPricingNote(lang: string): string {
  if (lang === "en") return pricingNoteEn;
  if (lang === "de") return pricingNoteDe;
  return pricingNote;
}
