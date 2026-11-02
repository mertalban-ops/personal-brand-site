import { dataController } from "@/data/legal";

export default function ControllerInfo() {
  return (
    <div className="text-xs space-y-1.5">
      <p>
        <strong className="text-ink">Veri sorumlusu:</strong> {dataController.legalName}{" "}
        <span className="text-faint">
          ({dataController.type === "gercek-kisi" ? "gerçek kişi" : "tüzel kişi"})
        </span>
      </p>
      <p>
        <strong className="text-ink">Kullanılan marka:</strong> {dataController.tradeName}{" "}
        <span className="text-faint">(marka adıdır; ayrı bir tüzel kişilik değildir)</span>
      </p>
      <p>
        <strong className="text-ink">E-posta:</strong>{" "}
        <a href={`mailto:${dataController.email}`} className="text-accent hover:underline">
          {dataController.email}
        </a>
      </p>
      {dataController.kepAddress && (
        <p>
          <strong className="text-ink">KEP:</strong> {dataController.kepAddress}
        </p>
      )}
      <p>
        <strong className="text-ink">Posta adresi:</strong>{" "}
        {dataController.address ??
          "Yazılı başvuru yapmak isterseniz posta adresi, e-posta ile talep etmeniz hâlinde size bildirilir."}
      </p>
    </div>
  );
}
