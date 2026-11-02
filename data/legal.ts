// Single source for legal-page facts. Only information that is already public
// on the site is used; nothing is guessed. See docs/KVKK-DENETIM.md §6–§7.

export const LEGAL_LAST_UPDATED = "2 Kasım 2026";

export type ControllerType = "gercek-kisi" | "tuzel-kisi";

export const dataController: {
  type: ControllerType;
  legalName: string; // Gerçek kişi adı soyadı veya ticaret unvanı
  tradeName: string; // Marka / işletme adı (hukuki kimlik değildir)
  // The owner chose not to publish a home address. Set a KEP or business
  // address here when available; until then written requests are routed by e-mail.
  address: string | null;
  kepAddress: string | null;
  email: string;
} = {
  type: "gercek-kisi",
  legalName: "Mert Alban",
  tradeName: "Albanexa",
  address: null,
  kepAddress: null,
  email: "mert@albanexa.com",
};

export type StorageItem = {
  name: string;
  provider: string;
  purpose: string;
  duration: string;
  category: "Zorunlu / işlevsel";
  storage: "localStorage";
};

// The site sets no cookies and loads no analytics or advertising tools.
export const storageInventory: StorageItem[] = [
  {
    name: "albanexa-lang",
    provider: "Albanexa (birinci taraf)",
    purpose: "Seçtiğiniz site dilini hatırlamak",
    duration: "Siz tarayıcınızdan silene kadar",
    category: "Zorunlu / işlevsel",
    storage: "localStorage",
  },
];
