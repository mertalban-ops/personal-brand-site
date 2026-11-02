import { buildPageMetadata } from "@/lib/metadata";
import Navbar from "@/components/Navbar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ControllerInfo from "@/components/legal/ControllerInfo";
import { dataController, LEGAL_LAST_UPDATED } from "@/data/legal";

export const metadata = buildPageMetadata({
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı KVKK m.10 kapsamında albanexa.com aydınlatma metni — hangi verilerin, hangi amaçla, hangi hukuki sebeple işlendiği, kimlere aktarıldığı ve haklarınız.",
  path: "/kvkk-aydinlatma",
});

type Activity = {
  title: string;
  data: string;
  purpose: string;
  method: string;
  basis: string;
};

const activities: Activity[] = [
  {
    title: "Siteyi ziyaret ettiğinizde",
    data: "Tarayıcınızın her sayfa isteğinde otomatik olarak gönderdiği teknik bilgiler: IP adresi, tarayıcı/cihaz bilgisi, istenen sayfa, zaman.",
    purpose: "Siteyi size göstermek, hata ve saldırıları tespit etmek.",
    method: "Otomatik; barındırma sağlayıcısı Vercel tarafından.",
    basis: "KVKK m.5/2-f: sitenin çalışması ve güvenliğine ilişkin meşru menfaat.",
  },
  {
    title: "E-posta veya WhatsApp ile bize yazdığınızda",
    data: "Size ait iletişim bilgileri (ad, e-posta adresi veya telefon numarası) ve mesajınızda paylaştığınız bilgiler.",
    purpose: "Talebinizi değerlendirmek, size dönüş yapmak, istenirse teklif hazırlamak ve iş başlarsa hizmeti yürütmek.",
    method: "Sizin başlattığınız e-posta veya WhatsApp yazışması.",
    basis:
      "Hizmet veya teklif talepleri için KVKK m.5/2-c (sözleşmenin kurulmasıyla doğrudan ilgili olması); bunun dışındaki sorular için m.5/2-f (sorunuza yanıt verilmesindeki meşru menfaat).",
  },
];

type Recipient = { name: string; role: string; transfer: string };

const recipients: Recipient[] = [
  {
    name: "Vercel Inc. (ABD)",
    role: "Sitenin barındırılması ve teknik sunucu kayıtları",
    transfer: "Sürekli yurt dışı aktarım. KVKK m.9 kapsamındaki güvence (standart sözleşme) süreci henüz tamamlanmamıştır.",
  },
  {
    name: "Google (Google Workspace e-posta)",
    role: "E-posta yazışmalarının tutulduğu iş e-posta kutusu",
    transfer: "Sürekli yurt dışı aktarım. KVKK m.9 kapsamındaki güvence (standart sözleşme) süreci henüz tamamlanmamıştır.",
  },
  {
    name: "WhatsApp (Meta)",
    role: "Yalnızca WhatsApp üzerinden yazmayı seçerseniz mesajlaşma altyapısı",
    transfer: "Yurt dışı altyapı. KVKK m.9 kapsamındaki güvence süreci henüz tamamlanmamıştır; dilerseniz e-posta kanalını tercih edebilirsiniz.",
  },
  {
    name: "Yetkili kamu kurum ve kuruluşları",
    role: "Yalnızca kanunen yetkili mercilerin usulüne uygun talebi hâlinde",
    transfer: "—",
  },
];

export default function KvkkAydinlatmaPage() {
  return (
    <main className="w-full" style={{ overflowX: "clip" }}>
      <Navbar />
      <div className="mx-auto max-w-3xl px-5 pt-32 pb-20 md:pt-40">
        <Breadcrumb
          crumbs={[
            { label: "Ana Sayfa", href: "/" },
            { label: "KVKK Aydınlatma Metni" },
          ]}
        />
        <h1 className="display text-3xl font-bold text-ink mb-2">KVKK Aydınlatma Metni</h1>
        <p className="text-xs text-faint mb-6">Son güncelleme: {LEGAL_LAST_UPDATED}</p>

        <p className="mb-10 text-sm text-muted leading-relaxed">
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu&apos;nun (&ldquo;KVKK&rdquo;) 10.
          maddesi ve Aydınlatma Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar
          Hakkında Tebliğ uyarınca sizi bilgilendirmek içindir. Bir onay metni değildir.
        </p>

        <div className="space-y-10 text-muted leading-relaxed text-sm">
          <section>
            <h2 className="text-ink text-base font-semibold mb-3">1. Veri Sorumlusu</h2>
            <ControllerInfo />
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              2. Hangi Verileri, Hangi Amaçla ve Hangi Hukuki Sebeple İşliyoruz?
            </h2>
            <p className="text-xs mb-4">
              Sitede iletişim formu, çerez, ziyaretçi istatistiği veya reklam ölçüm aracı
              bulunmaz. Ziyaretçi profili çıkarılmaz; IP adresinden konum tespiti yapılmaz.
            </p>
            <div className="space-y-4">
              {activities.map((a) => (
                <div key={a.title} className="rounded-xl border border-line bg-surface/20 p-4 text-xs space-y-1.5">
                  <p className="text-ink font-semibold text-sm">{a.title}</p>
                  <p><strong className="text-ink">Veriler:</strong> {a.data}</p>
                  <p><strong className="text-ink">Amaç:</strong> {a.purpose}</p>
                  <p><strong className="text-ink">Toplama yöntemi:</strong> {a.method}</p>
                  <p><strong className="text-ink">Hukuki sebep:</strong> {a.basis}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs">
              Lütfen yazışmalarda sağlık, din, siyasi görüş, biyometri, sabıka kaydı gibi özel
              nitelikli kişisel verilerinizi ya da başka kişilere ait bilgileri paylaşmayın.
            </p>
            <p className="mt-2 text-xs">
              Size bülten veya kampanya iletisi (ticari elektronik ileti) gönderilmez. Bize yazmanız
              veya teklif istemeniz, bu tür iletilere izin verdiğiniz anlamına gelmez.
            </p>
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">
              3. Kişisel Veriler Kimlere ve Hangi Amaçla Aktarılır?
            </h2>
            <p className="text-xs mb-4">
              Verileriniz satılmaz. Aşağıdaki hizmet sağlayıcılar, yukarıdaki amaçlar için ve
              hizmetin gerektirdiği ölçüde verilere erişir. Sunucuları Türkiye dışında olduğundan
              verileriniz yurt dışına aktarılmaktadır (KVKK m.9).
            </p>
            <div className="space-y-3">
              {recipients.map((r) => (
                <div key={r.name} className="rounded-xl border border-line bg-surface/20 p-4 text-xs space-y-1">
                  <p className="text-ink font-semibold">{r.name}</p>
                  <p><strong className="text-ink">Rolü:</strong> {r.role}</p>
                  <p><strong className="text-ink">Yurt dışı aktarım durumu:</strong> {r.transfer}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">4. Saklama Süreleri</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Yazışmalar:</strong> Talep işe dönüşürse, iş ve ilgili ticari kayıtlar için
                kanunlarda öngörülen süreler boyunca saklanır. İşe dönüşmeyen yazışmalar, amaç sona
                erdiğinde silinir veya anonim hâle getirilir.
              </li>
              <li>
                <strong>Sunucu kayıtları:</strong> Barındırma sağlayıcısının (Vercel) kayıt saklama
                ayarlarına tabidir.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">5. Haklarınız (KVKK m.11)</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
              <li>KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme,</li>
              <li>Düzeltme ve silme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,</li>
              <li>Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhinize bir sonuç çıkmasına itiraz etme,</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">6. Başvuru Yöntemi ve Süre</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                Bize daha önce yazdığınız e-posta adresinizden{" "}
                <a href={`mailto:${dataController.email}`} className="text-accent hover:underline">
                  {dataController.email}
                </a>{" "}
                adresine e-posta ile,
              </li>
              <li>
                Yazılı olarak posta yoluyla
                {dataController.address ? ` (${dataController.address})` : " (adres e-posta ile talep edilmesi hâlinde bildirilir)"},
              </li>
              {dataController.kepAddress && <li>KEP ile {dataController.kepAddress} adresine.</li>}
            </ul>
            <p className="mt-2 text-xs">
              Başvurunuzda Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ&apos;in aradığı
              bilgileri (ad soyad, Türk vatandaşları için T.C. kimlik numarası / yabancılar için uyruk
              ve pasaport numarası, tebligata esas adres veya e-posta, talep konusu) belirtmeniz
              gerekir. Kimlik belgesi fotokopisi istemiyoruz.
            </p>
            <p className="mt-2 text-xs">
              Başvurunuz en geç <strong>30 gün</strong> içinde ücretsiz olarak sonuçlandırılır (KVKK
              m.13). İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kurul&apos;ca belirlenen tarifedeki
              ücret alınabilir. Başvurunuz reddedilir, yanıtı yetersiz bulunur veya süresinde
              yanıtlanmazsa, yanıtı öğrendiğiniz tarihten itibaren 30 gün ve her hâlde başvuru
              tarihinden itibaren 60 gün içinde Kişisel Verileri Koruma Kurulu&apos;na şikâyette
              bulunabilirsiniz (KVKK m.14).
            </p>
          </section>

          <section>
            <h2 className="text-ink text-base font-semibold mb-3">7. Güncellemeler</h2>
            <p className="text-xs">
              Teknik altyapı veya mevzuat değiştiğinde bu metin güncellenir; güncelleme tarihi sayfanın
              başında yer alır.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
