export type Project = {
  name: string;
  tagline: string;
  status: "Active" | "In Development" | "Planned";
  problem: string;
  solution: string;
  approach: string;
  benefit: string;
  tech: string[];
  features: string[];
  previewType: "stockapp" | "carpass" | "auto-service" | "business-dashboard";
};

export const projects: Project[] = [
  {
    name: "StockApp",
    tagline: "Inventory, finance, and receivables tracking",
    status: "Active",
    problem:
      "Inventory and customer debts are scattered across notebooks and Excel, leading to missed collections.",
    solution:
      "A centralized web application combining inventory movements, current accounts, and collections.",
    approach: "Built with modern web tech for real-time, data-driven management.",
    benefit:
      "Who owes what, what's in stock, what was collected this month—answered at a single glance.",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    features: [
      "Sales, collections, and debt dashboard",
      "One-click PDF account statements",
      "Quick sharing via WhatsApp",
      "Critical low-stock alerts",
    ],
    previewType: "stockapp",
  },
  {
    name: "Hezer Auto Service",
    tagline: "Auto service operations and job tracking",
    status: "Active",
    problem:
      "Tracking serviced vehicles, pending jobs, and customer history relies entirely on memory and paper.",
    solution:
      "A mobile-friendly system logging the entire service lifecycle from vehicle intake to delivery.",
    approach: "Mobile-first design and cloud infrastructure optimized for field and shop use.",
    benefit: "Vehicle history and job statuses are instantly visible to the entire team.",
    tech: ["React Native", "Expo", "Supabase", "Playwright"],
    features: [
      "Vehicle intake and service workflow",
      "Comprehensive customer job history",
      "Custom UI component library",
      "End-to-end (E2E) testing pipeline",
    ],
    previewType: "auto-service",
  },
  {
    name: "CARPASS",
    tagline: "Vehicle history and risk analysis platform",
    status: "In Development",
    problem:
      "Lack of a reliable, single-source history for used vehicles, leading to buyer hesitation.",
    solution:
      "A scalable platform that aggregates vehicle history and transforms it into actionable risk analysis.",
    approach: "Designed as a SaaS model with an AI-supported backbone.",
    benefit: "Transparency for the buyer, trust for the seller; a scalable product foundation.",
    tech: ["React Native", "Supabase", "n8n", "AI Agents"],
    features: [
      "AI-driven Trust Report and Risk Score",
      "Freemium billing infrastructure",
      "Automated n8n workflows",
      "Advanced mobile and web interfaces",
    ],
    previewType: "carpass",
  },
  {
    name: "SaaS Infrastructures",
    tagline: "Subscription-ready multi-tenant architectures",
    status: "Planned",
    problem:
      "Custom-built systems for a single company fail to scale to others with the exact same needs.",
    solution:
      "Transforming bespoke business tracking systems into multi-tenant, subscription-based products.",
    approach: "Productizing the common core of existing systems using tenant-based architecture.",
    benefit: "A solution built once can serve hundreds of businesses globally.",
    tech: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
    features: [
      "Subscription and billing management",
      "Role-based access control (RBAC)",
      "Isolated data environments for tenants",
      "Scalable cloud architecture",
    ],
    previewType: "business-dashboard",
  },
];
