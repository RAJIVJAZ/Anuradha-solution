import type { Resource } from "@/content/types";

/**
 * The resource library is the top of the funnel. Gated resources trade a real
 * deliverable for contact details; ungated ones exist to build trust and earn
 * links, and are deliberately useful on their own.
 */
export const resources: Resource[] = [
  {
    slug: "dpr-readiness-checklist",
    title: "DPR Readiness Checklist",
    format: "Checklist",
    pages: "9 pages",
    summary:
      "The 64 documents, numbers and decisions a lender will ask for, organised in the order you should assemble them. Use it to find out whether you are eight weeks or eight months from a submittable file.",
    gated: false,
    audience: "Promoters planning a term loan application",
    includes: [
      "64-point document checklist by category",
      "Promoter and entity documentation list",
      "Technical and quotation requirements",
      "The six places credit committees push back",
      "A self-scored readiness rating",
    ],
    industries: ["Dairy", "Food Processing", "Healthcare Projects", "Hospitality"],
  },
  {
    slug: "dairy-plant-cost-model",
    title: "Dairy Plant Cost & Payback Model",
    format: "Model",
    pages: "Excel, 7 sheets",
    summary:
      "A working capital-cost and payback model for dairy projects from 5,000 to 200,000 LPD, with a product-mix contribution calculator. Our own benchmark ranges are built in, so your inputs get sanity-checked as you type.",
    gated: true,
    audience: "Promoters evaluating a dairy project",
    includes: [
      "Capacity and product mix input sheet",
      "Capital cost build-up with benchmark ranges",
      "Contribution per litre by product",
      "Means of finance and subsidy scenarios",
      "10-year projection with DSCR and payback",
      "Sensitivity table on procurement price and utilisation",
    ],
    industries: ["Dairy"],
  },
  {
    slug: "subsidy-eligibility-matrix",
    title: "Subsidy Eligibility Matrix",
    format: "Template",
    pages: "Excel + 6-page guide",
    summary:
      "Score your project against the seven central schemes and the state policy variables that matter, and get an indicative entitlement range plus the filing sequence. The sequence is the part that saves money.",
    gated: true,
    audience: "Anyone planning capex in the next 12 months",
    includes: [
      "Seven central schemes with eligibility tests",
      "State policy variable checklist",
      "Pre-condition and deadline tracker",
      "Indicative benefit calculator",
      "Filing sequence template",
      "Claim evidence file index",
    ],
    industries: ["Food Processing", "Dairy", "Sweets & Bakery", "Agriculture & Agri-tech"],
  },
  {
    slug: "oee-measurement-pack",
    title: "OEE Measurement Starter Pack",
    format: "Template",
    pages: "Excel + 4-page method note",
    summary:
      "The shift log, loss categories and calculation sheet we use in the first four weeks of an operations engagement. Run it yourself for a month and you will know whether you need capacity or a fix.",
    gated: false,
    audience: "Plant managers and owner-operators",
    includes: [
      "Shift-wise loss log sheet",
      "Availability, performance and quality loss categories",
      "OEE calculation and trend chart",
      "Ranked loss Pareto template",
      "Method note on measuring without instrumentation",
    ],
    industries: ["Food Processing", "Dairy", "Sweets & Bakery"],
  },
  {
    slug: "packaging-compliance-checklist",
    title: "Packaging Compliance Pre-Press Checklist",
    format: "Checklist",
    pages: "6 pages",
    summary:
      "Run this over artwork before it goes to press. It covers FSSAI label declarations, Legal Metrology requirements and the additional gates modern trade applies — the three places listings get rejected.",
    gated: false,
    audience: "Food brand owners and packaging teams",
    includes: [
      "FSSAI mandatory declaration checklist",
      "Legal Metrology packaged commodity requirements",
      "Shelf-life substantiation requirements",
      "Modern trade additional gates",
      "Three-gate review process",
    ],
    industries: ["Food Processing", "Sweets & Bakery", "Dairy", "Retail & D2C"],
  },
  {
    slug: "unit-economics-calculator",
    title: "SKU & Channel Contribution Calculator",
    format: "Calculator",
    pages: "Excel, 4 sheets",
    summary:
      "Calculate contribution margin by SKU and by channel, including the yield loss and cost-to-serve items most MSME costing omits. Also computes contribution per hour of your bottleneck.",
    gated: true,
    audience: "Founders and finance leads in food manufacturing",
    includes: [
      "SKU cost build-up at actual yield",
      "Channel cost-to-serve comparison",
      "Contribution per unit and per bottleneck hour",
      "Discount and scheme leakage tracker",
      "Product mix optimisation view",
    ],
    industries: ["Food Processing", "Dairy", "Sweets & Bakery", "Retail & D2C"],
  },
  {
    slug: "erp-requirement-template",
    title: "ERP Requirement & Scoring Template",
    format: "Template",
    pages: "Excel + 5-page guide",
    summary:
      "Write your requirement from the decisions you make weekly, then score three vendors against it with weights you set before the demo. Includes a five-year total cost model.",
    gated: false,
    audience: "MSME manufacturers evaluating an ERP",
    includes: [
      "Weekly decisions to data-requirement mapping",
      "Requirement specification template",
      "Weighted three-vendor scoring matrix",
      "Five-year total cost of ownership model",
      "Thin-slice implementation plan template",
    ],
    industries: ["Food Processing", "Dairy", "Retail & D2C"],
  },
  {
    slug: "approvals-critical-path-planner",
    title: "Statutory Approvals Critical-Path Planner",
    format: "Template",
    pages: "Excel, 3 sheets",
    summary:
      "Eight statutory approvals for a food or dairy plant, with typical durations, dependencies and document checklists, laid out against your target commissioning date so you can see what has to start this week.",
    gated: true,
    audience: "Promoters and project managers of greenfield plants",
    includes: [
      "Eight approvals with typical durations",
      "Dependency map and critical path",
      "Document checklist per approval",
      "Gantt view against your commissioning date",
      "Owner and status tracker",
    ],
    industries: ["Dairy", "Food Processing", "Sweets & Bakery", "Healthcare Projects"],
  },
  {
    slug: "growth-diagnostic-self-assessment",
    title: "Growth Ceiling Self-Assessment",
    format: "Guide",
    pages: "11 pages",
    summary:
      "Twenty-eight questions that identify which of the four growth ceilings is actually binding your business — founder bandwidth, systems, capital or market structure — and what the right response is for each.",
    gated: false,
    audience: "Founders of ₹1–100 crore businesses",
    includes: [
      "28 diagnostic questions with scoring",
      "Symptom to ceiling mapping table",
      "The wrong response for each ceiling",
      "First-90-days action list per ceiling",
      "When to re-diagnose",
    ],
    industries: ["Food Processing", "Dairy", "Sweets & Bakery", "Retail & D2C", "Hospitality"],
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug);
}

export const resourceSlugs = resources.map((resource) => resource.slug);
