import type { TeamMember } from "@/content/types";

/**
 * Deliberately small and senior. The Team page exists to answer one question a
 * prospective client is actually asking: who will be in the room?
 */
export const team: TeamMember[] = [
  {
    slug: "rajiv-deshpande",
    name: "Rajiv Deshpande",
    role: "Founder & Principal Consultant",
    discipline: "Strategy & project finance",
    initials: "RD",
    location: "Pune",
    bio: "Rajiv spent eleven years in dairy and food processing operations before starting the firm in 2016 — first as a plant manager in Kolhapur, then running projects for an equipment manufacturer, which is where he learned exactly how supplier-led plant design goes wrong. He has led 180+ project reports and sits in the credit committee meetings himself. He is the reason the firm refuses machinery commissions.",
    focus: [
      "Project finance structuring",
      "Pre-feasibility and go / no-go calls",
      "Dairy and food processing plant economics",
      "Lender and credit committee negotiation",
    ],
    credentials: [
      "B.Tech Dairy Technology, Warananagar",
      "MBA Finance, Symbiosis",
      "NABARD-accredited project report preparer",
      "MSME Ministry empanelled consultant",
    ],
    linkedin: "https://www.linkedin.com/in/anuradha-solutions-rajiv",
  },
  {
    slug: "anita-kulkarni",
    name: "Anita Kulkarni",
    role: "Partner — Growth Practice",
    discipline: "Strategy & unit economics",
    initials: "AK",
    location: "Pune",
    bio: "Anita rebuilds P&Ls for a living and has yet to find a manufacturing business whose contribution margin by SKU matched what its founders believed. She led the growth diagnostic practice from three engagements a year to twenty-six, and wrote the firm's costing methodology. Before consulting she was a category finance manager at an FMCG company, which is where she learned how channel costs get hidden.",
    focus: [
      "Growth diagnostics",
      "SKU and channel contribution costing",
      "Working capital and cash conversion",
      "Management review systems",
    ],
    credentials: [
      "CA, Institute of Chartered Accountants of India",
      "B.Com, Fergusson College",
      "Certified Management Accountant",
    ],
    linkedin: "https://www.linkedin.com/in/anuradha-solutions-anita",
  },
  {
    slug: "sameer-joshi",
    name: "Sameer Joshi",
    role: "Partner — Operations & Technology",
    discipline: "Operations & digital systems",
    initials: "SJ",
    location: "Nashik",
    bio: "Sameer has commissioned 42 plants and measured the OEE of considerably more. He is the person clients call when a line rated at five tonnes an hour delivers 2.8, and he will spend four weeks with a clipboard before proposing anything. He runs the firm's ERP selection work on the principle that most software failures are scope failures.",
    focus: [
      "Process design and plant layout",
      "Independent machinery tendering",
      "OEE and yield improvement",
      "ERP selection and implementation governance",
    ],
    credentials: [
      "B.E. Mechanical, COEP Pune",
      "Certified Lean Six Sigma Black Belt",
      "TPM practitioner certification, JIPM framework",
    ],
    linkedin: "https://www.linkedin.com/in/anuradha-solutions-sameer",
  },
  {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Director — Government & Compliance",
    discipline: "Subsidies, licensing & food safety",
    initials: "PN",
    location: "New Delhi",
    bio: "Priya has filed subsidy applications under most of the schemes a food or dairy project can access, and knows which ones are worth the paperwork. She ran food safety systems for a mid-sized processor before moving to advisory, and has taken seventeen clients through FSSC 22000 without a first-attempt failure. She is the firm's authority on the sequencing that decides whether a claim survives audit.",
    focus: [
      "Central and state subsidy structuring",
      "Statutory approvals critical path",
      "FSSAI, FSSC 22000 and HACCP implementation",
      "Audit-proof claim documentation",
    ],
    credentials: [
      "M.Sc Food Technology, CFTRI Mysore",
      "Lead Auditor, FSSC 22000",
      "FoSTaC certified food safety supervisor",
    ],
    linkedin: "https://www.linkedin.com/in/anuradha-solutions-priya",
  },
  {
    slug: "meera-raghavan",
    name: "Meera Raghavan",
    role: "Director — Brand & Demand",
    discipline: "Branding, packaging & demand generation",
    initials: "MR",
    location: "Ahmedabad",
    bio: "Meera has repositioned regional food brands that were quietly under-charging for decades, and has the press-approval photographs to prove she attends the first print run. She built the firm's pack-price architecture method after watching a client launch D2C and lose their largest distributor in the same quarter. She measures her work on realised price, not recall.",
    focus: [
      "Positioning and brand architecture",
      "Retail-ready packaging and compliance",
      "Pack-price architecture across channels",
      "Demand engine build and handover",
    ],
    credentials: [
      "PGDM Marketing, MICA Ahmedabad",
      "B.A. Economics, St. Xavier's Mumbai",
    ],
    linkedin: "https://www.linkedin.com/in/anuradha-solutions-meera",
  },
  {
    slug: "vikram-shetty",
    name: "Vikram Shetty",
    role: "Engagement Manager — Financial Modelling",
    discipline: "Project finance & modelling",
    initials: "VS",
    location: "Pune",
    bio: "Vikram builds the models that lenders stress-test, and has a reputation for refusing to hard-code a number he cannot trace to a source. He owns the firm's DPR quality review, which every report passes through before submission, and keeps the internal benchmark database that our capital cost ranges come from.",
    focus: [
      "Driver-based financial modelling",
      "CMA data and lender formats",
      "Sensitivity and stress testing",
      "DPR quality assurance",
    ],
    credentials: [
      "CFA Level III candidate",
      "B.Com, University of Pune",
      "Financial Modelling & Valuation Analyst",
    ],
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return team.find((member) => member.slug === slug);
}
