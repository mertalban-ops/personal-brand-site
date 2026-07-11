export type Service = {
  title: string;
  text: string;
  icon: string; // Lucide icon adı — Services component'inde eşleştirilir
};

export const services: Service[] = [
  {
    title: "Operations Management Systems",
    text: "Manage the entire process from order to delivery through a single dashboard. End the chaos.",
    icon: "ClipboardList",
  },
  {
    title: "Inventory & Product Management",
    text: "Zero out counting errors with live inbound/outbound tracking and critical stock alerts.",
    icon: "Boxes",
  },
  {
    title: "Finance & Receivables Tracking",
    text: "Get crystal clear visibility on who owes what and track your monthly collections seamlessly.",
    icon: "Wallet",
  },
  {
    title: "Sales & Client CRM",
    text: "Keep your clients' communication history and sales records in a centralized system.",
    icon: "Users",
  },
  {
    title: "PDF Reporting & Sharing",
    text: "Generate professional account statements with one click and share them via WhatsApp.",
    icon: "FileText",
  },
  {
    title: "Dashboards & Business Analytics",
    text: "Monitor your business's financial summary and overall performance on a single control panel.",
    icon: "LayoutDashboard",
  },
  {
    title: "Workflow Automation",
    text: "Automate email dispatch, notifications, and repetitive manual administrative tasks.",
    icon: "Workflow",
  },
  {
    title: "SaaS Product Development",
    text: "Transform your internal industry solution into a scalable product you can sell via subscriptions.",
    icon: "Layers",
  },
];

export const problemSolutions = [
  {
    problem: "Inventory lost in notebooks and Excel",
    solution: "Live inventory tracking",
  },
  {
    problem: "Uncertainty about who owes what",
    solution: "Client-based ledger accounts",
  },
  {
    problem: "Forgotten or missed collections",
    solution: "Payment and balance dashboards",
  },
  {
    problem: "Hours wasted preparing reports",
    solution: "One-click PDF statements",
  },
  {
    problem: "Workflows scattered across WhatsApp",
    solution: "Centralized management panel",
  },
  {
    problem: "Disorganized client information",
    solution: "Unified customer profiles",
  },
];
