/**
 * "Anu" — the site qualification assistant.
 *
 * A deterministic decision tree, not a free-text LLM, for three reasons:
 * subsidy and lending answers must never be hallucinated, every path is
 * testable, and the whole flow costs nothing to run. The nodes double as the
 * conversation design spec (docs/12-chatbot-flow.md).
 *
 * An optional LLM fallback answers off-script questions; it is enabled only
 * when ANTHROPIC_API_KEY is set and is always framed as "general guidance,
 * a consultant will confirm".
 */

export interface ChatOption {
  label: string;
  next: string;
  /** Recorded against the session for lead scoring. */
  tag?: string;
}

export interface ChatNode {
  id: string;
  message: string[];
  options?: ChatOption[];
  /** Terminal nodes recommend a page and offer the booking CTA. */
  recommend?: { label: string; href: string }[];
  capture?: "contact" | "none";
  cta?: { label: string; href: string };
}

export const chatFlow: Record<string, ChatNode> = {
  start: {
    id: "start",
    message: [
      "Hello — I'm Anu, the assistant for Anuradha Solutions.",
      "I can point you to the right practice in about four questions. What brings you here today?",
    ],
    options: [
      { label: "I need funding for a project", next: "funding", tag: "intent:funding" },
      { label: "I want to set up a factory or plant", next: "factory", tag: "intent:factory" },
      { label: "My business has stopped growing", next: "growth", tag: "intent:growth" },
      { label: "I need a subsidy or licence", next: "compliance", tag: "intent:compliance" },
      { label: "Branding, packaging or marketing", next: "brand", tag: "intent:brand" },
      { label: "Something else", next: "other", tag: "intent:other" },
    ],
  },

  funding: {
    id: "funding",
    message: ["Understood. How much project cost are you working with?"],
    options: [
      { label: "Under ₹1 crore", next: "funding-small", tag: "ticket:<1cr" },
      { label: "₹1 – 10 crore", next: "funding-core", tag: "ticket:1-10cr" },
      { label: "₹10 – 50 crore", next: "funding-core", tag: "ticket:10-50cr" },
      { label: "Above ₹50 crore", next: "funding-large", tag: "ticket:>50cr" },
      { label: "I don't know yet", next: "funding-core", tag: "ticket:unknown" },
    ],
  },

  "funding-small": {
    id: "funding-small",
    message: [
      "At that size, a PMFME or Mudra-linked route is usually cheaper and faster than a full term loan process.",
      "We handle these as a fixed-fee DPR engagement, typically ₹45,000 – ₹90,000, delivered in three weeks.",
    ],
    recommend: [
      { label: "Project Funding & DPR", href: "/services/project-funding-dpr" },
      { label: "Subsidies & Compliance", href: "/services/subsidies-compliance" },
      { label: "Free: DPR readiness checklist", href: "/resources/dpr-readiness-checklist" },
    ],
    capture: "contact",
    cta: { label: "Book a 30-minute funding review", href: "/contact" },
  },

  "funding-core": {
    id: "funding-core",
    message: [
      "That's our core band. A bankable DPR with CMA data, sensitivity analysis and a lender-ready financial model is the deliverable.",
      "Two questions decide the approach: do you already have land or a building?",
    ],
    options: [
      { label: "Yes, land is owned or leased", next: "funding-ready", tag: "land:yes" },
      { label: "No, still identifying a site", next: "funding-site", tag: "land:no" },
    ],
  },

  "funding-ready": {
    id: "funding-ready",
    message: [
      "Good — with the site settled, a DPR usually takes four to five weeks, and sanction three to four months after that.",
      "Our 2024–25 sanction rate on submitted proposals was 84%, across 46 files.",
    ],
    recommend: [
      { label: "Project Funding & DPR", href: "/services/project-funding-dpr" },
      { label: "Case study: ₹18 Cr dairy expansion funded", href: "/case-studies/sahyadri-dairy-expansion" },
    ],
    capture: "contact",
    cta: { label: "Book a discovery call", href: "/contact" },
  },

  "funding-site": {
    id: "funding-site",
    message: [
      "Then site selection comes first — the wrong location quietly kills the project's viability through freight and effluent costs.",
      "We bundle site appraisal into the pre-feasibility stage so the DPR is built on real numbers.",
    ],
    recommend: [
      { label: "Factory Setup & Operations", href: "/services/factory-setup-operations" },
      { label: "Project Funding & DPR", href: "/services/project-funding-dpr" },
    ],
    capture: "contact",
    cta: { label: "Book a site & funding review", href: "/contact" },
  },

  "funding-large": {
    id: "funding-large",
    message: [
      "Above ₹50 crore we work as a consortium lead with your CA and legal counsel, and the engagement is structured as a retainer plus success fee.",
      "A partner should scope this directly rather than through a form.",
    ],
    recommend: [{ label: "Project Funding & DPR", href: "/services/project-funding-dpr" }],
    capture: "contact",
    cta: { label: "Request a partner call", href: "/contact" },
  },

  factory: {
    id: "factory",
    message: ["Which best describes the plant?"],
    options: [
      { label: "Dairy processing", next: "factory-dairy", tag: "sector:dairy" },
      { label: "Food processing / RTE", next: "factory-food", tag: "sector:food" },
      { label: "Sweets, snacks or bakery", next: "factory-food", tag: "sector:sweets" },
      { label: "Something else", next: "factory-other", tag: "sector:other" },
    ],
  },

  "factory-dairy": {
    id: "factory-dairy",
    message: [
      "We've commissioned 19 dairy plants from 5,000 to 200,000 LPD.",
      "The three decisions that drive your payback: product mix, chilling strategy, and whether you build for tanker despatch or retail packs.",
    ],
    recommend: [
      { label: "Dairy industry practice", href: "/industries/dairy" },
      { label: "Factory Setup & Operations", href: "/services/factory-setup-operations" },
      { label: "Benchmark: dairy plant project cost", href: "/insights/dairy-plant-project-cost-india" },
    ],
    capture: "contact",
    cta: { label: "Book a plant scoping call", href: "/contact" },
  },

  "factory-food": {
    id: "factory-food",
    message: [
      "Food processing lines live or die on two numbers: yield per tonne of raw material and hours of genuine line utilisation.",
      "We design the layout backwards from those, then fit the machinery — not the other way round.",
    ],
    recommend: [
      { label: "Food Processing practice", href: "/industries/food-processing" },
      { label: "Factory Setup & Operations", href: "/services/factory-setup-operations" },
    ],
    capture: "contact",
    cta: { label: "Book a plant scoping call", href: "/contact" },
  },

  "factory-other": {
    id: "factory-other",
    message: [
      "We take general manufacturing work selectively — only where the process is close to something we've already built.",
      "Tell a consultant what you're planning and you'll get a straight yes or no within a day.",
    ],
    recommend: [{ label: "Factory Setup & Operations", href: "/services/factory-setup-operations" }],
    capture: "contact",
    cta: { label: "Ask a consultant", href: "/contact" },
  },

  growth: {
    id: "growth",
    message: ["Where does it feel stuck?"],
    options: [
      { label: "Sales have plateaued", next: "growth-demand", tag: "constraint:demand" },
      { label: "We're at full capacity", next: "growth-capacity", tag: "constraint:capacity" },
      { label: "Revenue grows, profit doesn't", next: "growth-margin", tag: "constraint:margin" },
      { label: "Too dependent on a few buyers", next: "growth-concentration", tag: "constraint:concentration" },
    ],
  },

  "growth-demand": {
    id: "growth-demand",
    message: [
      "A plateau is usually a positioning or channel problem, not an effort problem.",
      "Our growth diagnostic separates the two in three weeks so you stop spending on the wrong one.",
    ],
    recommend: [
      { label: "Business & Growth Strategy", href: "/services/business-growth-strategy" },
      { label: "Branding & Marketing", href: "/services/branding-marketing" },
    ],
    capture: "contact",
    cta: { label: "Book a growth diagnostic", href: "/contact" },
  },

  "growth-capacity": {
    id: "growth-capacity",
    message: [
      "Before you spend on capex: most plants we audit are running at 55–68% true OEE, so a third of the capacity you need is already paid for.",
      "We measure it first, then decide whether expansion is actually the answer.",
    ],
    recommend: [
      { label: "Factory Setup & Operations", href: "/services/factory-setup-operations" },
      { label: "Case study: 3x capacity without new land", href: "/case-studies/veerbhadra-oee-turnaround" },
    ],
    capture: "contact",
    cta: { label: "Book a capacity review", href: "/contact" },
  },

  "growth-margin": {
    id: "growth-margin",
    message: [
      "Almost always one of four things: product mix, freight, yield loss, or discount leakage at the distributor.",
      "A costing teardown finds it in two to three weeks.",
    ],
    recommend: [
      { label: "Business & Growth Strategy", href: "/services/business-growth-strategy" },
      { label: "Technology & Automation", href: "/services/technology-automation" },
    ],
    capture: "contact",
    cta: { label: "Book a margin teardown", href: "/contact" },
  },

  "growth-concentration": {
    id: "growth-concentration",
    message: [
      "Buyer concentration caps your valuation as much as your risk. The fix is a second channel built deliberately, usually D2C or institutional.",
    ],
    recommend: [
      { label: "Business & Growth Strategy", href: "/services/business-growth-strategy" },
      { label: "Retail & D2C practice", href: "/industries/retail-d2c" },
    ],
    capture: "contact",
    cta: { label: "Book a channel strategy call", href: "/contact" },
  },

  compliance: {
    id: "compliance",
    message: ["Which one is blocking you?"],
    options: [
      { label: "Central or state subsidy", next: "compliance-subsidy", tag: "need:subsidy" },
      { label: "FSSAI licence or audit", next: "compliance-fssai", tag: "need:fssai" },
      { label: "Factory, pollution or fire approvals", next: "compliance-approvals", tag: "need:approvals" },
      { label: "Trademark or IP", next: "compliance-ip", tag: "need:ip" },
    ],
  },

  "compliance-subsidy": {
    id: "compliance-subsidy",
    message: [
      "Most MSMEs qualify for more than one scheme and claim none of them, usually because the application had to be filed before the machinery order.",
      "Sequence matters more than paperwork here.",
    ],
    recommend: [
      { label: "Subsidies & Compliance", href: "/services/subsidies-compliance" },
      { label: "Free: subsidy eligibility matrix", href: "/resources/subsidy-eligibility-matrix" },
      { label: "Guide: food processing subsidies", href: "/insights/government-subsidies-food-processing" },
    ],
    capture: "contact",
    cta: { label: "Check my eligibility", href: "/contact" },
  },

  "compliance-fssai": {
    id: "compliance-fssai",
    message: [
      "Licence, or licence plus an audit-ready system? The second is what buyers and modern trade actually ask for.",
      "We implement FSSAI and FSSC 22000 as working SOPs, not a file in a cupboard.",
    ],
    recommend: [{ label: "Subsidies & Compliance", href: "/services/subsidies-compliance" }],
    capture: "contact",
    cta: { label: "Talk to our compliance desk", href: "/contact" },
  },

  "compliance-approvals": {
    id: "compliance-approvals",
    message: [
      "Consent to Establish, factory licence, fire NOC and the boiler registration all sit on the critical path of your commissioning date.",
      "We run them in parallel from day one of the project plan.",
    ],
    recommend: [
      { label: "Subsidies & Compliance", href: "/services/subsidies-compliance" },
      { label: "Factory Setup & Operations", href: "/services/factory-setup-operations" },
    ],
    capture: "contact",
    cta: { label: "Get an approvals timeline", href: "/contact" },
  },

  "compliance-ip": {
    id: "compliance-ip",
    message: [
      "Trademark search and filing we handle in-house; oppositions go to our empanelled IP counsel.",
      "If you're about to print packaging, file first — reprints cost more than the filing.",
    ],
    recommend: [
      { label: "Subsidies & Compliance", href: "/services/subsidies-compliance" },
      { label: "Branding & Marketing", href: "/services/branding-marketing" },
    ],
    capture: "contact",
    cta: { label: "Ask about a filing", href: "/contact" },
  },

  brand: {
    id: "brand",
    message: ["What stage is the brand at?"],
    options: [
      { label: "Launching something new", next: "brand-launch", tag: "brand:launch" },
      { label: "Rebranding an existing business", next: "brand-rebrand", tag: "brand:rebrand" },
      { label: "Brand is fine, demand isn't", next: "brand-demand", tag: "brand:demand" },
    ],
  },

  "brand-launch": {
    id: "brand-launch",
    message: [
      "Launches fail on shelf, not on strategy decks. We work positioning → packaging → first-90-days demand plan as one engagement.",
      "Typical investment ₹4.5 – 12 lakh over ten weeks.",
    ],
    recommend: [
      { label: "Branding & Marketing", href: "/services/branding-marketing" },
      { label: "Case study: mithai brand launch", href: "/case-studies/kesar-mithai-brand-launch" },
    ],
    capture: "contact",
    cta: { label: "Book a brand call", href: "/contact" },
  },

  "brand-rebrand": {
    id: "brand-rebrand",
    message: [
      "The risk in a rebrand is losing the equity you already have in trade. We audit recall with your distributors before changing anything visual.",
    ],
    recommend: [{ label: "Branding & Marketing", href: "/services/branding-marketing" }],
    capture: "contact",
    cta: { label: "Book a brand audit", href: "/contact" },
  },

  "brand-demand": {
    id: "brand-demand",
    message: [
      "Then it's a channel and demand-engine problem. We build the funnel, the content system and the retention loop, and hand it to your team with SOPs.",
    ],
    recommend: [
      { label: "Branding & Marketing", href: "/services/branding-marketing" },
      { label: "Technology & Automation", href: "/services/technology-automation" },
    ],
    capture: "contact",
    cta: { label: "Book a demand review", href: "/contact" },
  },

  other: {
    id: "other",
    message: [
      "No problem — leave your details and the practice head closest to your question will reply personally, usually within a business day.",
      "If we're not the right firm, we'll say so and point you somewhere better.",
    ],
    recommend: [
      { label: "All services", href: "/services" },
      { label: "Resource library", href: "/resources" },
    ],
    capture: "contact",
    cta: { label: "Send us your question", href: "/contact" },
  },
};

export function getNode(id: string): ChatNode | null {
  return chatFlow[id] ?? null;
}
