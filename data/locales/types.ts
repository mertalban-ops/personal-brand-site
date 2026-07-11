export type Dictionary = {
  nav: {
    studio: string;
    services: string;
    cases: string;
    process: string;
    contactBtn: string;
  };
  hero: {
    kicker: string;
    title1: string;
    titleHighlight: string;
    title2: string;
    subtitle: string;
    primaryBtn: string;
    secondaryBtn: string;
    cards: {
      stock: string;
      stockDesc: string;
      finance: string;
      financeDesc: string;
      collection: string;
      collectionDesc: string;
      report: string;
      reportTitle: string;
      reportDesc: string;
    };
  };
  about: {
    label: string;
    title: string;
    paragraphs: string[];
  };
  services: {
    label: string;
    title: string;
    subtitle: string;
    items: { title: string; text: string; icon: string }[];
  };
  problems: {
    label: string;
    title: string;
    items: { problem: string; solution: string }[];
  };
  projects: {
    label: string;
    title: string;
    problemLabel: string;
    featuresLabel: string;
    items: {
      name: string;
      tagline: string;
      status: string;
      problem: string;
      solution: string;
      approach: string;
      benefit: string;
      tech: string[];
      features: string[];
      previewType: "stockapp" | "carpass" | "auto-service" | "business-dashboard";
    }[];
  };
  process: {
    label: string;
    title: string;
    items: { step: string; title: string; text: string }[];
  };
  strengths: {
    label: string;
    title: string;
    subtitle: string;
    items: string[];
  };
  whyMe: {
    label: string;
    title: string;
    items: { title: string; text: string }[];
  };
  testimonial: {
    label: string;
    note: string;
    quote: string;
  };
  faq: {
    label: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  contact: {
    label: string;
    title: string;
    subtitle: string;
    emailBtn: string;
    whatsappBtn: string;
    footerText: string;
    rights: string;
    servicesCol: string;
    studioCol: string;
  };
};
