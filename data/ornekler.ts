// /ornekler — demo galerisi.
// ÖNEMLİ (Kalite kapısı G3/G6): Buradaki örneklerin tamamı TEMSİLİ ve KURGUSALDIR.
// Gerçek bir işletmeye ait değildir. Hiçbir gerçek marka, logo veya müşteri içeriği
// izinsiz kullanılamaz. Yeni örnek eklerken gerçek işletme adı/logosu KULLANMA.

export type OrnekService = { title: string; desc: string };

export type Ornek = {
  slug: string;
  name: string; // kurgusal / temsili isim
  sector: string;
  city: string;
  tagline: string;
  summary: string; // galeri kartı ve meta açıklaması
  accent: string; // demo vurgu rengi (hex)
  phone: string; // temsili
  hours: string;
  services: OrnekService[];
  highlights: string[];
};

export const DISCLAIMER =
  "Örnek çalışma — Tanıtım amacıyla hazırlanmış temsili bir örnektir. Gerçek bir işletmeye ait değildir; hiçbir marka, logo veya içerik izinsiz kullanılmamıştır.";

export const ornekler: Ornek[] = [
  {
    slug: "ornek-oto-servis",
    name: "Örnek Oto Servis",
    sector: "Genel oto tamir & bakım",
    city: "İzmir",
    tagline: "Aracınız güvenilir ellerde",
    summary:
      "Genel bakım ve mekanik onarım yapan bir oto servis için tek sayfalık temsili site örneği.",
    accent: "#10b981",
    phone: "0500 000 00 00",
    hours: "Hafta içi 08:30 – 19:00 · Cumartesi 09:00 – 17:00",
    services: [
      { title: "Periyodik bakım", desc: "Yağ, filtre ve genel kontrol." },
      { title: "Fren sistemi", desc: "Balata, disk ve fren kontrolü." },
      { title: "Motor arıza tespiti", desc: "Cihazla arıza okuma ve onarım." },
      { title: "Akü & elektrik", desc: "Akü değişimi ve temel elektrik." },
    ],
    highlights: ["15 yıllık tecrübe", "Orijinal ve muadil parça", "İşlem öncesi bilgilendirme"],
  },
  {
    slug: "ornek-kaporta-boya",
    name: "Usta Kaporta & Boya (Örnek)",
    sector: "Kaporta – boya",
    city: "İzmir",
    tagline: "Çiziği, göçüğü ilk günkü hâline getiriyoruz",
    summary:
      "Kaporta ve boya işleri yapan bir işletme için galeri odaklı tek sayfalık temsili site örneği.",
    accent: "#3b82f6",
    phone: "0500 000 00 00",
    hours: "Hafta içi 09:00 – 19:00 · Cumartesi 09:00 – 16:00",
    services: [
      { title: "Göçük düzeltme", desc: "Boyasız ve boyalı göçük onarımı." },
      { title: "Boya işleri", desc: "Lokal ve komple boya." },
      { title: "Sigorta işlemleri", desc: "Hasar sürecinde yönlendirme." },
      { title: "Pasta & cila", desc: "Yüzey yenileme ve parlatma." },
    ],
    highlights: ["Öncesi–sonrası fotoğraflar", "Renk eşleştirme", "Teslim tarihi netliği"],
  },
  {
    slug: "ornek-oto-elektrik",
    name: "Merkez Oto Elektrik (Örnek)",
    sector: "Oto elektrik",
    city: "İzmir",
    tagline: "Elektrik arızasında doğru adres",
    summary:
      "Oto elektrik işleri yapan bir usta için sade ve hızlı tek sayfalık temsili site örneği.",
    accent: "#f59e0b",
    phone: "0500 000 00 00",
    hours: "Hafta içi 08:30 – 18:30 · Cumartesi 09:00 – 15:00",
    services: [
      { title: "Marş & şarj sistemi", desc: "Marş, alternatör ve şarj kontrolü." },
      { title: "Aydınlatma", desc: "Far, sinyal ve iç aydınlatma." },
      { title: "Sensör & arıza", desc: "Elektronik arıza tespiti." },
      { title: "Ses & multimedya", desc: "Teyp ve kamera montajı." },
    ],
    highlights: ["Cihazla arıza tespiti", "Hızlı işlem", "Açık fiyatlandırma"],
  },
];

export function getOrnek(slug: string): Ornek | undefined {
  return ornekler.find((o) => o.slug === slug);
}
