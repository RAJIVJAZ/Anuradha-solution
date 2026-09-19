/** Global site configuration: identity, navigation, contact, proof points. */

export const site = {
  name: "Anuradha Solutions",
  legalName: "Anuradha Solutions Advisory Private Limited",
  tagline: "Growth. Factory Setup. Funding. Branding.",
  shortDescription:
    "A niche business advisory firm that helps Indian MSMEs in manufacturing, dairy and food processing scale from ₹1 crore to ₹100 crore.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.anuradhasolutions.in",
  founded: "2016",
  email: "engage@anuradhasolutions.in",
  careersEmail: "careers@anuradhasolutions.in",
  phone: "+91 98765 43210",
  phoneHref: "+919876543210",
  whatsapp: "+919876543210",
  bookingUrl: "https://calendly.com/anuradha-solutions/discovery",
  offices: [
    {
      city: "Pune",
      role: "Head office",
      lines: ["4th Floor, Trade Centre, Baner Road", "Pune, Maharashtra 411045"],
    },
    {
      city: "Ahmedabad",
      role: "West India desk",
      lines: ["Prahlad Nagar Corporate Road", "Ahmedabad, Gujarat 380015"],
    },
    {
      city: "New Delhi",
      role: "Policy & subsidy desk",
      lines: ["Nehru Place Business Centre", "New Delhi 110019"],
    },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/anuradha-solutions",
    youtube: "https://www.youtube.com/@anuradhasolutions",
    x: "https://x.com/anuradhaadvisor",
  },
  /** Firm-level proof, reused in the hero strip and the About page. */
  proof: [
    { value: "₹640 Cr", label: "Project finance & subsidy sanctioned", detail: "Across 180+ DPRs since 2016" },
    { value: "310+", label: "MSME engagements delivered", detail: "Manufacturing, dairy, food processing" },
    { value: "42", label: "Greenfield plants commissioned", detail: "Site selection to trial production" },
    { value: "3.1x", label: "Median revenue growth", detail: "Measured 24 months post-engagement" },
  ],
  credentials: [
    "MSME Ministry empanelled consultant",
    "NABARD-accredited project report preparer",
    "PMFME & PMKSY scheme specialists",
    "FSSAI & FSSC 22000 implementation partners",
  ],
} as const;

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Rendered as a two-column mega-panel on desktop, accordion on mobile. */
  panel?: {
    heading: string;
    blurb: string;
    columns: { title: string; items: NavChild[] }[];
    feature?: { eyebrow: string; title: string; href: string; cta: string };
  };
}

export const primaryNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    panel: {
      heading: "What we do",
      blurb:
        "Six practices that plug into each other — most clients start with one and layer the rest as they scale.",
      columns: [
        {
          title: "Grow the business",
          items: [
            { label: "Business & Growth Strategy", href: "/services/business-growth-strategy", description: "Diagnostics, growth model, 3-year plan" },
            { label: "Branding & Marketing", href: "/services/branding-marketing", description: "Positioning, packaging, demand engine" },
            { label: "Technology & Automation", href: "/services/technology-automation", description: "ERP, CRM, dashboards, AI workflows" },
          ],
        },
        {
          title: "Build and fund it",
          items: [
            { label: "Project Funding & DPR", href: "/services/project-funding-dpr", description: "DPR, CMA, term loan, investor decks" },
            { label: "Factory Setup & Operations", href: "/services/factory-setup-operations", description: "Layout, SOPs, commissioning, OEE" },
            { label: "Subsidies & Compliance", href: "/services/subsidies-compliance", description: "PMFME, PMKSY, FSSAI, licences" },
          ],
        },
      ],
      feature: {
        eyebrow: "Not sure where to start?",
        title: "Take the 12-minute growth diagnostic",
        href: "/contact",
        cta: "Book a discovery call",
      },
    },
  },
  {
    label: "Industries",
    href: "/industries",
    panel: {
      heading: "Where we go deep",
      blurb:
        "We only take work in sectors where we already know the unit economics, the machinery and the regulator.",
      columns: [
        {
          title: "Food value chain",
          items: [
            { label: "Dairy", href: "/industries/dairy", description: "Chilling to value-added plants" },
            { label: "Food Processing", href: "/industries/food-processing", description: "Fruit, veg, spice, RTE lines" },
            { label: "Sweets & Bakery", href: "/industries/sweets-bakery", description: "Mithai, snacks, packaged bakery" },
            { label: "Agriculture & Agri-tech", href: "/industries/agriculture", description: "FPOs, warehousing, cold chain" },
          ],
        },
        {
          title: "Services & assets",
          items: [
            { label: "Healthcare Projects", href: "/industries/healthcare", description: "Hospitals, diagnostics, day-care" },
            { label: "Hospitality", href: "/industries/hospitality", description: "Hotels, resorts, cloud kitchens" },
            { label: "Retail & D2C", href: "/industries/retail-d2c", description: "Franchise, distribution, marketplaces" },
          ],
        },
      ],
      feature: {
        eyebrow: "Sector benchmarks",
        title: "Dairy plant capital cost & payback data",
        href: "/insights/dairy-plant-project-cost-india",
        cta: "Read the benchmark",
      },
    },
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  {
    label: "Firm",
    href: "/about",
    panel: {
      heading: "About Anuradha Solutions",
      blurb: "A small senior team. No pyramid, no juniors learning on your project.",
      columns: [
        {
          title: "The firm",
          items: [
            { label: "Our approach", href: "/about", description: "How we work and what we refuse" },
            { label: "Team", href: "/team", description: "The consultants on your project" },
            { label: "Careers", href: "/careers", description: "Open roles across India" },
          ],
        },
        {
          title: "Free to use",
          items: [
            { label: "Resource library", href: "/resources", description: "Models, templates, checklists" },
            { label: "Client portal", href: "/portal", description: "Live project tracking for clients" },
            { label: "Contact", href: "/contact", description: "Talk to a partner this week" },
          ],
        },
      ],
    },
  },
];

export const footerNav = [
  {
    title: "Services",
    items: [
      { label: "Business & Growth Strategy", href: "/services/business-growth-strategy" },
      { label: "Project Funding & DPR", href: "/services/project-funding-dpr" },
      { label: "Factory Setup & Operations", href: "/services/factory-setup-operations" },
      { label: "Branding & Marketing", href: "/services/branding-marketing" },
      { label: "Technology & Automation", href: "/services/technology-automation" },
      { label: "Subsidies & Compliance", href: "/services/subsidies-compliance" },
    ],
  },
  {
    title: "Industries",
    items: [
      { label: "Dairy", href: "/industries/dairy" },
      { label: "Food Processing", href: "/industries/food-processing" },
      { label: "Sweets & Bakery", href: "/industries/sweets-bakery" },
      { label: "Agriculture & Agri-tech", href: "/industries/agriculture" },
      { label: "Healthcare Projects", href: "/industries/healthcare" },
      { label: "Hospitality", href: "/industries/hospitality" },
      { label: "Retail & D2C", href: "/industries/retail-d2c" },
    ],
  },
  {
    title: "Firm",
    items: [
      { label: "Our approach", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Resource library", href: "/resources" },
      { label: "DPR readiness checklist", href: "/resources/dpr-readiness-checklist" },
      { label: "Dairy plant cost model", href: "/resources/dairy-plant-cost-model" },
      { label: "Subsidy eligibility matrix", href: "/resources/subsidy-eligibility-matrix" },
      { label: "Client portal", href: "/portal" },
    ],
  },
];

/** Homepage logo strip. Real engagements, named with permission or masked. */
export const clientLogos = [
  "Sahyadri Dairy",
  "Veerbhadra Foods",
  "Kesar Mithai",
  "Annapurna Agro FPO",
  "Shubham Hospitals",
  "Coastal Stay Resorts",
  "Rangoli Spices",
  "Nandini Cold Chain",
];
