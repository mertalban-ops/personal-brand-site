import { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    studio: "Studio Approach",
    services: "System Solutions",
    cases: "Portfolio",
    process: "Delivery Process",
    contactBtn: "Discuss Project",
  },
  hero: {
    kicker: "Custom Business Systems · Inventory & Finance · Automation · SaaS Infrastructure",
    title1: "We transform your messy business processes into ",
    titleHighlight: "digital operation systems.",
    title2: "",
    subtitle:
      "We convert inventory, finance, sales, collection, and reporting processes for small and medium businesses into clean, measurable, and custom web-based systems.",
    primaryBtn: "Discuss My Project",
    secondaryBtn: "View Project Showcase",
    cards: {
      stock: "Inventory",
      stockDesc: "active items · 14 critical",
      finance: "Finance",
      financeDesc: "open balance · 37 clients",
      collection: "Collection",
      collectionDesc: "collected this month",
      report: "Report",
      reportTitle: "Account statement",
      reportDesc: "PDF generated",
    },
  },
  about: {
    label: "01 — Studio Approach",
    title: "A business digital system isn't just made of screens.",
    paragraphs: [
      "A great business tracking system creates value through accurate data flow, clear user experience, reliable reporting, and a design that fits the company's daily habits.",
      "We are a digital solution partnership that transforms the manual, messy, and time-wasting processes of SMBs into digital operation systems.",
      "In the systems we develop, we don't just consider the technical side, but also your actual working order; we turn processes that only exist on paper into digital structures that the team actually uses.",
    ],
  },
  services: {
    label: "02 — High-Value Solutions",
    title: "System Packages That Accelerate Your Business",
    subtitle:
      "Stop trying to adapt to off-the-shelf software. Work with completely custom systems designed specifically for your operational needs.",
    items: [
      {
        title: "Digital Work Tracking System",
        text: "Manage the entire operation from order to delivery in a single panel. Eliminate dependency on specific individuals.",
        icon: "ClipboardList",
      },
      {
        title: "Inventory & Product Management",
        text: "Take control of costs and eliminate counting errors with live tracking and critical stock alerts.",
        icon: "Boxes",
      },
      {
        title: "Finance & Collections",
        text: "See exactly who owes how much, overdue payments, and your monthly collections in a clear interface.",
        icon: "Wallet",
      },
      {
        title: "Sales & Client Panel",
        text: "Keep your customers' communication history, special pricing, and sales processes in a centralized system.",
        icon: "Users",
      },
      {
        title: "PDF Reporting Workflows",
        text: "Generate professional account statements with one click and send invoices or quotes to clients via WhatsApp.",
        icon: "FileText",
      },
      {
        title: "Dashboard & Business Analytics",
        text: "Monitor the company's instant performance, profitability, and critical operational metrics from a single screen.",
        icon: "LayoutDashboard",
      },
      {
        title: "Automation Systems",
        text: "Automate automated client reminders, email dispatching, and your repetitive manual tasks.",
        icon: "Workflow",
      },
      {
        title: "SaaS Product Infrastructure",
        text: "Turn an industry-specific problem you've solved internally into a digital product you can sell to other companies via subscriptions (SaaS).",
        icon: "Layers",
      },
    ],
  },
  problems: {
    label: "03 — Problem & Solution",
    title: "We consolidate tasks scattered across Notebooks, Excel, and WhatsApp into one system.",
    items: [
      {
        problem: "Inventory is a mess, exact stock levels are unknown",
        solution: "Live stock tracking screen with alerts",
      },
      {
        problem: "Debts are unclear, collections are forgotten",
        solution: "Client-based finance and balance tracking",
      },
      {
        problem: "Reports and account statements take hours to prepare manually",
        solution: "One-click automated PDF reporting workflow",
      },
      {
        problem: "Work progresses in people's memory, not company memory",
        solution: "Centralized and standardized digital workflow",
      },
      {
        problem: "Classic Excel spreadsheets can't keep up with operational speed",
        solution: "Custom, fast, and secure web application",
      },
      {
        problem: "Tracking multiple locations and staff is becoming difficult",
        solution: "Role-based access and cloud management panel",
      },
    ],
  },
  projects: {
    label: "04 — Portfolio",
    title: "Custom Digital Solutions We've Developed",
    problemLabel: "Problem",
    featuresLabel: "Business Benefit & Features",
    items: [
      {
        name: "StockApp",
        tagline: "Inventory, Finance and Collection Tracking System",
        status: "Live",
        problem:
          "Business inventory and debt data got lost between notebooks and Excel; management couldn't see the big picture.",
        solution:
          "A custom digital management system that consolidates all inventory movements, client finances, and collection statuses into a single interface.",
        approach: "A minimalist approach where the manager can see the financial summary on one screen without dealing with complex analytics.",
        benefit:
          "Answers exactly who owes what, what's in the warehouse, and collection targets instantly; operations accelerate.",
        tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
        features: [
          "Live sales, collection, and debt dashboard",
          "One-click custom PDF account statements",
          "Critical stock level and payment delay alerts",
        ],
        previewType: "stockapp",
      },
      {
        name: "Hezer Auto Service",
        tagline: "Auto Service Operation and Client Tracking Platform",
        status: "Live",
        problem:
          "Tracking of incoming vehicles, repair status, costs, and client history was scattered across notebooks.",
        solution:
          "A mobile-responsive system that centralizes all repair stages from vehicle intake to delivery, mechanic notes, and invoicing.",
        approach: "Designed a fast UI architecture where service mechanics and advisors can easily input data on tablets in the field.",
        benefit: "Secured the repair history of every vehicle, ensuring client satisfaction and operational transparency.",
        tech: ["React Native", "Expo", "Supabase", "Playwright"],
        features: [
          "Vehicle intake and step-by-step service tracking",
          "Permanent client repair history by license plate",
          "Secure infrastructure with end-to-end (E2E) testing",
        ],
        previewType: "auto-service",
      },
      {
        name: "CARPASS",
        tagline: "AI-Powered Vehicle Risk Analysis SaaS Platform",
        status: "In Development",
        problem:
          "Scattered history data in used car purchases couldn't be reliably converted into a single risk score.",
        solution:
          "A platform that aggregates scattered damage and inspection data, interprets it via AI models, and provides a secure 'Trust Report'.",
        approach: "Built a scalable and solid product foundation suitable for a SaaS subscription model with AI integration.",
        benefit: "Transparency in seconds for buyers, and a scalable revenue model (SaaS) for the platform owner.",
        tech: ["React Native", "Supabase", "n8n", "AI Agents"],
        features: [
          "AI-powered Trust Report generation",
          "Freemium and subscription (SaaS) billing infrastructure",
          "Fully automated background workflows built with n8n",
        ],
        previewType: "carpass",
      },
      {
        name: "Custom Enterprise SaaS Infra",
        tagline: "Transforming Corporate Processes into Subscription Models (SaaS)",
        status: "Concept / Architecture",
        problem:
          "Successfully built internal company software couldn't be licensed and sold to other companies in the industry.",
        solution:
          "Separating the core of existing business tracking systems and converting it into a secure, multi-tenant subscription product.",
        approach: "Scalable cloud architecture design with top-tier data security, isolation, and performance.",
        benefit: "The company not only solves its own problem but owns a tech product that provides solutions to the entire industry.",
        tech: ["Next.js", "Supabase", "Stripe", "Multi-tenant"],
        features: [
          "Automated billing and subscriptions integrated with Stripe",
          "Advanced role and permission-based user access control",
          "Secure, isolated data for every business (tenant)",
        ],
        previewType: "business-dashboard",
      },
    ],
  },
  process: {
    label: "05 — Our Signature Process",
    title: "We focus on delivering working systems, not just ideas.",
    items: [
      {
        step: "01",
        title: "Analysis",
        text: "We listen to your current workflow and pinpoint exactly where time and money are being lost in operations.",
      },
      {
        step: "02",
        title: "System Design",
        text: "We plan the screens, data structure, and reporting flows strictly according to your company's DNA and terminology.",
      },
      {
        step: "03",
        title: "Development",
        text: "We develop the web-based, mobile-ready system with a highly minimalist interface free from technical clutter.",
      },
      {
        step: "04",
        title: "Test & Delivery",
        text: "We test it with real-world scenarios and deliver the system ready-to-use to your team.",
      },
    ],
  },
  strengths: {
    label: "06 — Focus Areas",
    title: "Software development is a tool; the main goal is accelerating your business.",
    subtitle: "We don't just write code; we find where your operation is stuck and digitize it.",
    items: [
      "Operational Bottleneck Analysis",
      "User-Friendly B2B Interface Design",
      "Inventory, Finance & Accounting Architecture",
      "Secure Multi-Tenant (SaaS) Infrastructures",
      "PDF and Dynamic Reporting Systems",
      "Fast Web & Mobile App Development",
      "API & Workflow Automations",
      "High-Performance Cloud Database Mgmt",
    ],
  },
  whyMe: {
    label: "07 — Why Work With Us?",
    title: "Before pretty screens, we build systems that solve real business problems.",
    items: [
      {
        title: "Business language, not tech jargon",
        text: "We don't give clients technical clutter; we provide working, concrete solutions that directly accelerate their business.",
      },
      {
        title: "Understanding business needs",
        text: "We don't build copy-paste systems. We take the time to understand your process and build exactly what you need.",
      },
      {
        title: "Clean and usable interfaces",
        text: "We design clear screens stripped of complex menus that your staff can use immediately without hours of training.",
      },
      {
        title: "Making it measurable",
        text: "We digitize all manual steps to ensure the process is fully reportable and analyzable.",
      },
      {
        title: "Scalable and secure infrastructure",
        text: "When your business grows, the system can grow too. We build a solid infrastructure suited for modern expansion.",
      },
      {
        title: "Tracking, reporting, and automation at the core",
        text: "Not just data entry; we focus on smart, automated structures where the system generates its own alerts.",
      },
    ],
  },
  testimonial: {
    label: "Work Philosophy",
    note: "The cornerstone of producing premium solutions and business partnerships.",
    quote:
      "The quality of a digital system isn't measured by the length of code written; it's measured by the 'I'm in control and everything is secure' feeling the business owner gets when looking at it at the end of the day. Our goal is to build reliable operational structures that provide exactly this feeling to businesses.",
  },
  faq: {
    label: "08 — Frequently Asked",
    title: "Frequently Asked Questions",
    subtitle: "Key details about the quality of the systems we build and our working process.",
    items: [
      {
        q: "Who do you build systems for?",
        a: "We build custom systems for visionary SMBs and startups who struggle to manage processes via Excel, WhatsApp, or notebooks, but don't want to drown in clunky and expensive ERP software on the market.",
      },
      {
        q: "Do you sell off-the-shelf packages or develop custom software?",
        a: "We develop completely custom systems tailored to the workflow, terminology, and needs of your business. You get a system designed specifically with you, not a generic purchased one.",
      },
      {
        q: "Can the systems you develop be used on mobile?",
        a: "Yes. All web-based task tracking and operational systems we build are designed to premium standards to work flawlessly on both desktops and mobile phones or tablets (responsive).",
      },
      {
        q: "How is pricing determined and how long does the process take?",
        a: "It varies depending on the size of the system and the number of modules (Inventory, Finance, Reports, Automation, etc.). In our first meeting, we analyze your operation and provide you with a clear budget and timeline (usually between 4 to 12 weeks).",
      },
      {
        q: "Do you provide support after the system is delivered?",
        a: "Absolutely. A working system always needs maintenance and development. Through monthly maintenance agreements after delivery, we ensure system security and fulfill your requests for new features.",
      },
      {
        q: "Do you only build websites, or do you also build business tracking systems?",
        a: "We do not build corporate brochure websites. Our expertise lies entirely in building the backend management and operational panels (Task tracking, inventory, finance, B2B portals, SaaS infrastructures) for businesses.",
      },
    ],
  },
  contact: {
    label: "09 — Contact",
    title: "Let's transform your tracking chaos into a professional system.",
    subtitle:
      "If your inventory, finance, sales, collection, or reporting processes are scattered, we can make it manageable with a premium digital system tailored for your business. Let's discuss your project in 15 minutes.",
    emailBtn: "Send E-mail",
    whatsappBtn: "Message on WhatsApp",
    footerText:
      "We develop premium custom digital operation systems and SaaS infrastructures that consolidate business processes scattered across notebooks, Excel, and WhatsApp into a single center.",
    rights: "All rights reserved.",
    servicesCol: "System Solutions",
    studioCol: "Studio",
  },
};
