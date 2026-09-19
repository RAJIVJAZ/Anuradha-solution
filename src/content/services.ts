import type { Service } from "@/content/types";

/**
 * Six practices. Each entry is the single source for its page, its card, the
 * mega-nav description and its SEO metadata.
 */
export const services: Service[] = [
  {
    slug: "business-growth-strategy",
    name: "Business & Growth Strategy",
    navLabel: "Business & Growth Strategy",
    eyebrow: "Strategy practice",
    headline: "Find the one constraint holding your revenue back — then remove it",
    summary:
      "A three-week diagnostic that separates a demand problem from a capacity problem from a margin problem, followed by a costed 36-month growth plan your bank and your plant manager both understand.",
    promise: "Diagnostics, growth model, 3-year plan",
    icon: "strategy",
    visual: "growth-curve",
    problems: [
      "Revenue has been flat for three years while input costs keep climbing.",
      "You are busy at 100% of a capacity you never actually measured.",
      "Every month is profitable on paper and tight in the bank account.",
      "Two buyers account for 70% of despatch and both know it.",
      "You have four expansion ideas and no way to compare them.",
    ],
    approach: [
      {
        step: "01",
        title: "Baseline in numbers, not opinions",
        description:
          "We rebuild 36 months of your P&L by product, channel and customer, then walk the plant with a stopwatch. Most founders see their true contribution margin per SKU for the first time in this week.",
      },
      {
        step: "02",
        title: "Isolate the binding constraint",
        description:
          "Demand, capacity, working capital, margin or management bandwidth — only one is actually binding at any time. We prove which, so you stop spending on the other four.",
      },
      {
        step: "03",
        title: "Model three futures",
        description:
          "Each option gets a full financial model: capex, working capital, break-even volume, payback and the downside case at 70% of plan. You choose with the numbers in front of you.",
      },
      {
        step: "04",
        title: "Convert the plan into a calendar",
        description:
          "A 36-month roadmap broken into quarterly milestones, each with an owner, a budget and a leading indicator. We review it with you monthly for the first two quarters.",
      },
    ],
    deliverables: [
      {
        title: "Business diagnostic report",
        description:
          "Segment-level P&L rebuild, contribution analysis by SKU and channel, capacity study, working-capital cycle and a ranked list of the leaks we found.",
        timeline: "Week 3",
      },
      {
        title: "Growth strategy blueprint",
        description:
          "Market sizing for your district and state, positioning decision, product and channel roadmap, and the make-or-buy call on capacity.",
        timeline: "Week 5",
      },
      {
        title: "Three-scenario financial model",
        description:
          "Driver-based Excel model — volume, price, yield, freight, credit days — with base, upside and stress cases, and a one-page summary for lenders.",
        timeline: "Week 6",
      },
      {
        title: "36-month execution roadmap",
        description:
          "Quarterly milestones, owners, capex phasing, hiring plan and the ten metrics on your review dashboard.",
        timeline: "Week 7",
      },
    ],
    outcomes: [
      { label: "Median revenue growth", value: "3.1x", detail: "24 months post-engagement" },
      { label: "Gross margin improvement", value: "+6.4 pts", detail: "Median across 41 diagnostics" },
      { label: "Working capital released", value: "₹1.8 Cr", detail: "Median for ₹20–50 Cr businesses" },
    ],
    tiers: [
      {
        name: "Growth Diagnostic",
        model: "Project",
        price: "₹2.5 – 4.5 lakh",
        bestFor: "₹5–50 Cr businesses that need to know what is actually wrong",
        includes: [
          "3-week diagnostic",
          "Segment-level P&L rebuild",
          "Constraint analysis",
          "Ranked opportunity list",
          "Board presentation",
        ],
      },
      {
        name: "Strategy & Roadmap",
        model: "Project",
        price: "₹6 – 14 lakh",
        bestFor: "Businesses committing to a 3-year expansion or diversification",
        includes: [
          "Everything in the Diagnostic",
          "Market sizing and positioning",
          "Three-scenario financial model",
          "36-month roadmap",
          "Two quarterly reviews",
        ],
      },
      {
        name: "Growth Partner",
        model: "Retainer",
        price: "₹1.5 – 4 lakh / month",
        bestFor: "Founders who want a senior sparring partner in the monthly review",
        includes: [
          "Monthly management review",
          "MIS and dashboard ownership",
          "Board pack preparation",
          "On-call decision support",
          "Quarterly strategy reset",
        ],
      },
    ],
    industries: ["Dairy", "Food Processing", "Sweets & Bakery", "Retail & D2C", "Agriculture"],
    faqs: [
      {
        question: "How is this different from what my CA already does?",
        answer:
          "Your CA reports what happened and keeps you compliant, which is essential and different work. We start from the plant floor and the market: capacity studies, SKU-level contribution, channel economics and competitor pricing. On most engagements we work alongside the CA, and they usually end up using our model for the following year's projections.",
      },
      {
        question: "Do you take equity or a percentage of revenue?",
        answer:
          "No. We charge fees, and on funding work a success fee tied to sanction. We deliberately do not take equity in client businesses — it would compromise the advice we give about whether to expand at all.",
      },
      {
        question: "What access to our data do you need?",
        answer:
          "Three years of financials, your item master with costing, 12 months of production and despatch records, and two days on site with your production and sales heads. Everything is covered by a mutual NDA signed before kick-off.",
      },
      {
        question: "What if the diagnostic says we should not expand?",
        answer:
          "Then we say so, in writing, with the numbers. It happens on roughly one engagement in six, and it is the highest-value report we write — a ₹3 lakh fee that prevents an ₹8 crore mistake.",
      },
    ],
    relatedInsights: [
      "msme-growth-1-crore-to-100-crore",
      "unit-economics-food-manufacturing",
      "factory-automation-guide-msme",
    ],
    seo: {
      title: "Business Growth Strategy Consultants for Indian MSMEs",
      description:
        "Three-week growth diagnostic and costed 36-month plan for manufacturing, dairy and food processing MSMEs. Median 3.1x revenue growth in 24 months. Pune, Ahmedabad, Delhi.",
      keywords: [
        "business growth consultant India",
        "MSME growth strategy",
        "manufacturing business consultant",
        "business diagnostic services India",
        "growth strategy consultant Pune",
      ],
    },
  },

  {
    slug: "project-funding-dpr",
    name: "Project Funding & DPR",
    navLabel: "Project Funding & DPR",
    eyebrow: "Financial advisory practice",
    headline: "Bankable project reports that survive the credit committee",
    summary:
      "Detailed Project Reports, CMA data, term-loan proposals and investor decks built to the standard your lender's credit team actually applies — not a template with your name pasted in.",
    promise: "DPR, CMA, term loan, investor decks",
    icon: "finance",
    visual: "funding-waterfall",
    problems: [
      "Your file has been 'under process' at the branch for five months.",
      "The bank asked for CMA data and nobody has explained what it wants.",
      "Your projections show 40% margins and the credit officer stopped reading there.",
      "You need ₹12 crore and do not know how much of it must be your own money.",
      "A subsidy was available and the application window closed while you were ordering machinery.",
    ],
    approach: [
      {
        step: "01",
        title: "Pre-feasibility before paperwork",
        description:
          "Two weeks of hard questions: is the project viable at 70% of your assumed volume? We have stopped 14 projects at this stage. That is a feature.",
      },
      {
        step: "02",
        title: "Build the model from physical reality",
        description:
          "Capacity, yield, shift pattern, power tariff, freight lane rates, credit days. Every number in the DPR traces to a quotation, a tariff order or a signed LOI, and we keep the source file.",
      },
      {
        step: "03",
        title: "Structure the means of finance",
        description:
          "Promoter contribution, term loan, subsidy, working capital and lease — sequenced so the subsidy application precedes the machinery order, which is where most claims are lost.",
      },
      {
        step: "04",
        title: "Sit in the meetings",
        description:
          "We present to the branch, the zonal office and the credit committee, answer the queries in writing, and stay on the file until disbursement. Our fee is not complete at submission.",
      },
    ],
    deliverables: [
      {
        title: "Pre-feasibility note",
        description:
          "Go / no-go recommendation with break-even volume, sensitivity to the three variables that matter, and the honest downside case.",
        timeline: "Week 2",
      },
      {
        title: "Detailed Project Report",
        description:
          "80–140 pages: promoter profile, market study, technical configuration with machinery specifications and quotations, civil estimate, manpower plan, cost of project, means of finance, 10-year projections, DSCR, IRR, break-even and risk mitigation.",
        timeline: "Week 5",
      },
      {
        title: "CMA data & term-loan proposal",
        description:
          "Forms I–VI in your lender's format, ratio analysis, fund-flow statement and the covering proposal note the credit team reads first.",
        timeline: "Week 6",
      },
      {
        title: "Investor pitch deck & data room",
        description:
          "For equity routes: a 14–18 slide deck, a one-page teaser, the cap-table scenario model and an indexed data room.",
        timeline: "Week 7",
      },
      {
        title: "Sanction support",
        description:
          "Query responses, site-visit preparation, technical clarifications and follow-through to disbursement.",
        timeline: "Until sanction",
      },
    ],
    outcomes: [
      { label: "Sanction rate on submitted files", value: "84%", detail: "46 proposals, FY 2024–25" },
      { label: "Project finance arranged", value: "₹640 Cr", detail: "Cumulative since 2016" },
      { label: "Median time to sanction", value: "3.4 months", detail: "From DPR submission" },
    ],
    tiers: [
      {
        name: "DPR — Standard",
        model: "Project",
        price: "₹55,000 – 1.4 lakh",
        bestFor: "Projects up to ₹5 crore, including PMFME and Mudra routes",
        includes: [
          "Pre-feasibility note",
          "Detailed Project Report",
          "CMA data",
          "One lender submission",
          "Query support for 90 days",
        ],
      },
      {
        name: "DPR — Comprehensive",
        model: "Project",
        price: "₹2 – 6 lakh",
        bestFor: "Projects of ₹5–50 crore with multi-lender or consortium funding",
        includes: [
          "Everything in Standard",
          "Detailed market study",
          "Machinery vendor evaluation",
          "Subsidy structuring",
          "Credit committee presentations",
          "Support until disbursement",
        ],
      },
      {
        name: "Funding Partner",
        model: "Success fee",
        price: "0.75 – 1.5% of sanction",
        bestFor: "Promoters who want fees weighted to the outcome",
        includes: [
          "Reduced upfront fee",
          "Success fee on disbursement only",
          "Lender shortlisting and negotiation",
          "Term-sheet review",
          "Disclosed in writing before engagement",
        ],
      },
    ],
    industries: ["Dairy", "Food Processing", "Healthcare", "Hospitality", "Agriculture"],
    faqs: [
      {
        question: "Can you guarantee the loan will be sanctioned?",
        answer:
          "No, and anyone who guarantees it is either lying or planning something you do not want to be part of. What we control is the quality of the file, the honesty of the projections and the quality of our answers to the credit team. On that basis our sanction rate was 84% last financial year; the files that failed mostly failed on promoter credit history, which we now check before starting.",
      },
      {
        question: "How much promoter contribution will the bank expect?",
        answer:
          "Typically 20–25% of project cost for a manufacturing term loan, sometimes 15% where a capital subsidy is part of the structure and 30%+ for first-generation promoters or unproven sectors. We tell you your number in the pre-feasibility note, in week two, before you have spent anything material.",
      },
      {
        question: "We already have a DPR from another consultant. Can you review it?",
        answer:
          "Yes. A fixed-fee DPR review is ₹35,000 and takes a week. We mark it up the way a credit officer would and tell you whether it needs a rewrite or a patch. Roughly half need a rewrite, usually because the projections are not defensible.",
      },
      {
        question: "Do you work with NBFCs and co-operative banks too?",
        answer:
          "Yes. Scheduled commercial banks, SIDBI, NABARD refinance routes, state co-operative banks and a panel of NBFCs for shorter-tenor equipment finance. The right lender depends on your sector, tenor and how fast you need the money — that recommendation is part of the engagement.",
      },
    ],
    relatedInsights: [
      "how-to-prepare-bankable-dpr",
      "dairy-plant-project-cost-india",
      "government-subsidies-food-processing",
    ],
    seo: {
      title: "DPR Preparation & Project Funding Consultants | Bank Loan Proposals",
      description:
        "Bankable Detailed Project Reports, CMA data, term-loan proposals and investor decks for Indian MSMEs. ₹640 Cr arranged, 84% sanction rate. Support until disbursement.",
      keywords: [
        "DPR consultant India",
        "detailed project report preparation",
        "CMA data preparation",
        "bank loan project report",
        "project finance consultant MSME",
        "bankable project report",
      ],
    },
  },

  {
    slug: "factory-setup-operations",
    name: "Factory Setup & Operations",
    navLabel: "Factory Setup & Operations",
    eyebrow: "Operations practice",
    headline: "From bare land to trial production — and then to a plant that runs without you",
    summary:
      "Site appraisal, process design, plant layout, machinery selection, commissioning and the SOP system that keeps output stable after we leave. Plus OEE turnarounds for plants already running.",
    promise: "Layout, SOPs, commissioning, OEE",
    icon: "factory",
    visual: "factory-flow",
    problems: [
      "Machinery suppliers are quoting you a plant design. That is a conflict of interest.",
      "Your line is rated 5 tonnes an hour and does 2.8 on a good day.",
      "Output depends on which supervisor is on shift.",
      "Rework and yield loss are real numbers nobody has ever calculated.",
      "Commissioning is six months late and no single person owns the schedule.",
    ],
    approach: [
      {
        step: "01",
        title: "Design the process, then the building",
        description:
          "Mass balance first: what goes in, what comes out, what is lost, at what moisture and temperature. Buildings and machinery follow from that, not the reverse.",
      },
      {
        step: "02",
        title: "Lay out for material flow",
        description:
          "Single-direction flow, segregated raw and finished zones, hygienic-design compliance for food, and utility runs planned before the civil drawings are frozen.",
      },
      {
        step: "03",
        title: "Specify and tender machinery independently",
        description:
          "We write the technical specification, run the tender, evaluate three quotes on total cost of ownership and negotiate the performance guarantee. We take no commission from any supplier, ever.",
      },
      {
        step: "04",
        title: "Commission against a checklist",
        description:
          "Water trials, product trials, yield validation, OEE baseline and a defect log closed before the final payment to the supplier is released.",
      },
      {
        step: "05",
        title: "Hand over a system, not a building",
        description:
          "SOPs at the workstation, shift handover formats, a daily production board, preventive maintenance calendar and two weeks of supervisor training on the floor.",
      },
    ],
    deliverables: [
      {
        title: "Site appraisal & process design",
        description:
          "Mass and energy balance, utility load calculation, effluent load estimate, and a scored comparison of up to three candidate sites on freight, power, water, labour and effluent cost.",
        timeline: "Week 3",
      },
      {
        title: "Plant layout & equipment schedule",
        description:
          "Block layout, detailed equipment layout, material and personnel flow diagrams, utility routing and a line-item equipment schedule with specifications.",
        timeline: "Week 6",
      },
      {
        title: "Machinery tender & evaluation",
        description:
          "Technical specification documents, vendor shortlist, comparative evaluation on total cost of ownership, and negotiated performance guarantees.",
        timeline: "Week 9",
      },
      {
        title: "Project management to commissioning",
        description:
          "Weekly site coordination, a live critical-path schedule, contractor reviews, and a commissioning protocol with trial-run acceptance criteria.",
        timeline: "Through execution",
      },
      {
        title: "SOP & operating system",
        description:
          "Workstation SOPs, quality control plan, preventive maintenance calendar, shift reporting formats and a trained supervisory layer.",
        timeline: "Month 2 post-commissioning",
      },
    ],
    outcomes: [
      { label: "Greenfield plants commissioned", value: "42", detail: "Dairy, food, bakery, pharma-adjacent" },
      { label: "Median OEE improvement", value: "+24 pts", detail: "On brownfield turnarounds" },
      { label: "Capex saved vs. supplier design", value: "11%", detail: "Median, on independently tendered projects" },
    ],
    tiers: [
      {
        name: "Plant Feasibility & Layout",
        model: "Project",
        price: "₹1.5 – 5 lakh",
        bestFor: "Promoters deciding what to build and what it will cost",
        includes: [
          "Process and mass balance design",
          "Capacity and utility sizing",
          "Block and equipment layout",
          "Indicative capex estimate",
          "Equipment schedule",
        ],
      },
      {
        name: "Turnkey Project Management",
        model: "Project",
        price: "2.5 – 5% of project cost",
        bestFor: "Greenfield plants from land to trial production",
        includes: [
          "Everything in Feasibility & Layout",
          "Machinery tender and negotiation",
          "Civil and utility coordination",
          "Site supervision and schedule control",
          "Commissioning and trial runs",
          "SOP handover and training",
        ],
      },
      {
        name: "Operations Excellence",
        model: "Retainer",
        price: "₹1.25 – 3 lakh / month",
        bestFor: "Running plants stuck below 70% OEE",
        includes: [
          "OEE and yield baselining",
          "Bottleneck removal programme",
          "SOP and quality system rollout",
          "Supervisor capability building",
          "Monthly performance review",
        ],
      },
    ],
    industries: ["Dairy", "Food Processing", "Sweets & Bakery", "Healthcare", "Agriculture"],
    faqs: [
      {
        question: "Do you take a commission from machinery suppliers?",
        answer:
          "Never, and we put that in the engagement letter. Supplier commissions are the single biggest reason Indian MSME plants are over-specified and badly laid out. Our fee comes from you alone, which is why we can recommend the ₹40 lakh line over the ₹90 lakh one when that is the right answer.",
      },
      {
        question: "How early should we involve you?",
        answer:
          "Before you buy land, and definitely before you place a machinery order. The two most expensive mistakes we are called in to fix — a site with no effluent solution, and a line whose bottleneck is the packing machine nobody sized — are both free to avoid at the design stage.",
      },
      {
        question: "Can you work alongside our existing architect and contractor?",
        answer:
          "Yes, and it is the normal arrangement. We own the process design, equipment specification and schedule; your architect owns structural and statutory drawings; your contractor builds. We coordinate the three and chair the weekly site review.",
      },
      {
        question: "What does an OEE turnaround actually involve?",
        answer:
          "Four weeks of measurement before any change: availability, performance and quality losses logged shift by shift. Then a ranked loss list, and typically three or four interventions that recover most of the gap — usually changeover time, an unsized bottleneck, an unmeasured yield loss and a maintenance practice. Median improvement across our engagements is 24 percentage points of OEE.",
      },
    ],
    relatedInsights: [
      "factory-automation-guide-msme",
      "dairy-plant-project-cost-india",
      "unit-economics-food-manufacturing",
    ],
    seo: {
      title: "Factory Setup Consultants | Plant Design, Layout & Commissioning India",
      description:
        "Independent factory setup consultants for dairy, food processing and manufacturing plants. Process design, layout, machinery tendering, commissioning and OEE turnarounds. 42 plants commissioned.",
      keywords: [
        "factory setup consultant India",
        "plant layout design consultant",
        "food plant project management",
        "dairy plant setup consultant",
        "OEE improvement consultant",
        "turnkey project consultant MSME",
      ],
    },
  },

  {
    slug: "branding-marketing",
    name: "Branding & Marketing",
    navLabel: "Branding & Marketing",
    eyebrow: "Brand practice",
    headline: "A brand that earns its price premium on a crowded shelf",
    summary:
      "Positioning, naming, identity, packaging that survives Indian retail conditions, and a demand engine your own team can run after we hand it over.",
    promise: "Positioning, packaging, demand engine",
    icon: "brand",
    visual: "brand-system",
    problems: [
      "You make a better product than the market leader and sell it for 12% less.",
      "Your packaging was designed by the printer's nephew.",
      "Modern trade rejected the listing on artwork and compliance.",
      "You are spending ₹2 lakh a month on ads with no idea what it returns.",
      "Every distributor calls your brand 'the cheaper one'.",
    ],
    approach: [
      {
        step: "01",
        title: "Find the premium you are already earning",
        description:
          "Trade interviews, consumer intercepts at the point of purchase, and a shelf audit of the eight brands you compete with. The gap between what you deliver and what the market believes is your pricing headroom.",
      },
      {
        step: "02",
        title: "Fix the position before the logo",
        description:
          "One sentence: who it is for, what it replaces, and why it is worth more. Everything downstream — name, pack, price, channel — is derived from that sentence, and we do not open a design file until it is signed off.",
      },
      {
        step: "03",
        title: "Design for Indian retail reality",
        description:
          "Legibility at four feet in bad light, FSSAI and Legal Metrology compliance built in, flexo and rotogravure tolerances checked with your converter, and shelf mock-ups tested against the real competing packs.",
      },
      {
        step: "04",
        title: "Build a demand engine, not a campaign",
        description:
          "Website, content calendar, performance media, WhatsApp and retention flows — instrumented so cost per acquisition and repeat rate are visible weekly, and documented so your team runs it from month four.",
      },
    ],
    deliverables: [
      {
        title: "Brand & category audit",
        description:
          "Competitive shelf audit, trade and consumer interviews, price-ladder analysis and a positioning recommendation with the evidence behind it.",
        timeline: "Week 3",
      },
      {
        title: "Brand identity system",
        description:
          "Name and tagline options with trademark search, logo system, colour and type system, iconography, photography direction and a brand book.",
        timeline: "Week 6",
      },
      {
        title: "Packaging design & artwork",
        description:
          "Structural and graphic design across the SKU range, FSSAI and Legal Metrology compliant declarations, print-ready artwork and converter coordination through the first print run.",
        timeline: "Week 9",
      },
      {
        title: "Website & content system",
        description:
          "Next.js website, product catalogue, enquiry funnel, analytics, and an editorial calendar with the first twelve pieces produced.",
        timeline: "Week 11",
      },
      {
        title: "Demand engine playbook",
        description:
          "Channel plan with budgets, performance media structure, WhatsApp and email flows, retailer activation kit and the SOPs for your team to run it.",
        timeline: "Week 12",
      },
    ],
    outcomes: [
      { label: "Median price realisation gain", value: "+14%", detail: "Post-repositioning, 12 months" },
      { label: "Modern trade listings won", value: "38", detail: "Across 9 client brands" },
      { label: "Median CAC reduction", value: "-31%", detail: "After first demand-engine quarter" },
    ],
    tiers: [
      {
        name: "Positioning Sprint",
        model: "Project",
        price: "₹1.2 – 2.5 lakh",
        bestFor: "Businesses that need clarity before they spend on design or media",
        includes: [
          "Category and shelf audit",
          "Trade and consumer interviews",
          "Positioning statement",
          "Price-ladder recommendation",
          "Messaging framework",
        ],
      },
      {
        name: "Brand Launch",
        model: "Project",
        price: "₹4.5 – 12 lakh",
        bestFor: "New brands, or existing brands going to modern trade or D2C",
        includes: [
          "Everything in Positioning Sprint",
          "Identity system and brand book",
          "Packaging design and artwork",
          "Website build",
          "First-90-days demand plan",
        ],
      },
      {
        name: "Growth Marketing",
        model: "Retainer",
        price: "₹75,000 – 3 lakh / month",
        bestFor: "Brands with product-market fit that need a system, not an agency",
        includes: [
          "Performance media management",
          "Content production calendar",
          "Retention and WhatsApp flows",
          "Weekly CAC and cohort reporting",
          "Quarterly brand health review",
        ],
      },
    ],
    industries: ["Dairy", "Sweets & Bakery", "Food Processing", "Retail & D2C", "Hospitality"],
    faqs: [
      {
        question: "We just need a logo and packaging. Can we skip the strategy?",
        answer:
          "You can, and we will still work with you — but expect us to ask the positioning questions anyway, because a designer who has not answered them is guessing. If budget is the constraint, do the Positioning Sprint first and the design three months later. The sprint usually pays for itself in the print run you do not have to redo.",
      },
      {
        question: "Do you handle the printing?",
        answer:
          "We do not print, and we do not take a margin on printing. We specify, supply print-ready artwork, run the converter coordination and attend the first press approval. Keeping the print margin with your converter rather than with us is worth more to you than the convenience.",
      },
      {
        question: "How do you measure whether the branding worked?",
        answer:
          "Three numbers, agreed before we start: realised price per unit, distribution depth in your target channel, and repeat purchase rate. Brand recall surveys are secondary. If price realisation has not moved twelve months after relaunch, the work did not do its job.",
      },
      {
        question: "Will our internal team be able to run the marketing afterwards?",
        answer:
          "That is the design intent. Everything is documented as SOPs, the ad accounts and analytics stay in your name, and we spend the last month of the engagement training whoever will own it. Roughly 60% of clients move fully in-house within a year; the rest keep a light quarterly retainer.",
      },
    ],
    relatedInsights: [
      "branding-strategies-fmcg-india",
      "packaging-compliance-fssai-legal-metrology",
      "msme-growth-1-crore-to-100-crore",
    ],
    seo: {
      title: "Branding & Marketing Consultants for Food, Dairy & FMCG Brands",
      description:
        "Positioning, identity, retail-ready packaging and demand engines for Indian food, dairy and FMCG brands. Median +14% price realisation and -31% CAC.",
      keywords: [
        "FMCG branding consultant India",
        "food packaging design consultant",
        "brand positioning consultant",
        "D2C marketing consultant India",
        "dairy brand consultant",
      ],
    },
  },

  {
    slug: "technology-automation",
    name: "Technology & Automation",
    navLabel: "Technology & Automation",
    eyebrow: "Technology practice",
    headline: "Systems that tell you the truth about your plant by 9am",
    summary:
      "ERP selection and implementation, production and quality digitisation, CRM, management dashboards and AI automation — scoped for a ₹20 crore business, not a ₹2,000 crore one.",
    promise: "ERP, CRM, dashboards, AI workflows",
    icon: "technology",
    visual: "automation-radar",
    problems: [
      "Your ERP went live two years ago and the plant still runs on a WhatsApp group.",
      "Yesterday's production number arrives on Thursday.",
      "Three people maintain three different versions of the stock position.",
      "A software vendor quoted ₹40 lakh for something you suspect you do not need.",
      "Your team spends nine hours a week copying data between Excel files.",
    ],
    approach: [
      {
        step: "01",
        title: "Map the decisions, not the software",
        description:
          "We start from the twelve decisions you make weekly and work backwards to the minimum data required. Most ERP failures are scope failures: modules bought for decisions nobody makes.",
      },
      {
        step: "02",
        title: "Select on fit and total cost",
        description:
          "Three shortlisted systems, scored against your actual process on a weighted matrix, with five-year total cost including implementation, licences, customisation and the internal time nobody budgets for.",
      },
      {
        step: "03",
        title: "Implement in thin slices",
        description:
          "Inventory and production first, then quality, then finance integration, then sales. Each slice is live and used before the next begins — a six-month sequence of small wins rather than one eighteen-month big bang.",
      },
      {
        step: "04",
        title: "Automate the copying",
        description:
          "Weighbridge to ERP, quality readings to batch records, despatch to e-way bill, enquiry to CRM. Plus LLM-assisted workflows where they genuinely earn their keep: tender summarisation, RFQ response drafting, quality report extraction.",
      },
      {
        step: "05",
        title: "One dashboard the owner actually opens",
        description:
          "Ten numbers, refreshed nightly: output, yield, OEE, rejections, despatch reliability, order book, collections, stock cover, cash position and cost per unit. One screen, on a phone.",
      },
    ],
    deliverables: [
      {
        title: "Digital maturity assessment",
        description:
          "Scored assessment across ERP, production, quality, CRM, finance MIS and automation, with a ranked gap list and a 12-month roadmap.",
        timeline: "Week 2",
      },
      {
        title: "System selection report",
        description:
          "Requirement specification, three-vendor comparison on a weighted matrix, five-year total cost of ownership and a negotiated commercial proposal.",
        timeline: "Week 5",
      },
      {
        title: "Implementation programme management",
        description:
          "Phase plan, data migration governance, user acceptance test scripts, training plan and go-live checklist for each slice.",
        timeline: "Through rollout",
      },
      {
        title: "Automation build",
        description:
          "Integrations between plant instruments, ERP, CRM and statutory portals, plus documented AI-assisted workflows with human review gates.",
        timeline: "Month 3–6",
      },
      {
        title: "Management dashboard",
        description:
          "Ten-metric owner dashboard, nightly refresh, mobile-first, with definitions documented so a number always means the same thing.",
        timeline: "Month 4",
      },
    ],
    outcomes: [
      { label: "Clerical hours removed weekly", value: "31 hrs", detail: "Median, ₹20–60 Cr businesses" },
      { label: "Reporting lag", value: "9 days → 1", detail: "Production MIS availability" },
      { label: "ERP budget avoided", value: "₹22 lakh", detail: "Median, versus first vendor quote" },
    ],
    tiers: [
      {
        name: "Digital Diagnostic",
        model: "Project",
        price: "₹85,000 – 2 lakh",
        bestFor: "Businesses about to spend on software and unsure what they need",
        includes: [
          "Maturity assessment across six systems",
          "Decision-to-data mapping",
          "Ranked gap list",
          "12-month roadmap",
          "Indicative budget",
        ],
      },
      {
        name: "ERP Selection & Implementation",
        model: "Project",
        price: "₹3 – 12 lakh",
        bestFor: "First ERP, or rescuing an implementation that stalled",
        includes: [
          "Everything in Digital Diagnostic",
          "Requirement specification",
          "Vendor selection and negotiation",
          "Phase-wise implementation management",
          "Data migration governance",
          "Training and go-live support",
        ],
      },
      {
        name: "Technology Partner",
        model: "Retainer",
        price: "₹60,000 – 2.5 lakh / month",
        bestFor: "Businesses with no CTO that keep needing one",
        includes: [
          "Roadmap ownership",
          "Vendor management",
          "Automation build queue",
          "Dashboard maintenance",
          "Monthly technology review",
        ],
      },
    ],
    industries: ["Dairy", "Food Processing", "Retail & D2C", "Healthcare", "Hospitality"],
    faqs: [
      {
        question: "Which ERP do you recommend?",
        answer:
          "It depends on your process, and we are deliberately vendor-neutral. For MSME manufacturing in India we most often shortlist from Tally Prime with a plant add-on, Zoho One, Odoo, Microsoft Business Central and SAP Business One. The right answer for a ₹15 crore dairy with batch traceability needs is rarely the right answer for a ₹60 crore engineering job shop.",
      },
      {
        question: "Is AI automation actually useful at our scale?",
        answer:
          "In narrow places, yes — summarising tender documents, drafting RFQ responses, extracting numbers from supplier quality certificates, classifying inbound enquiries. All of it sits behind human review. What we will not do is put an unreviewed model anywhere near a quality release, a price quotation or a statutory filing.",
      },
      {
        question: "Our last ERP implementation failed. Why would this be different?",
        answer:
          "Most failures we audit share three causes: scope set by the vendor rather than the business, a single big-bang go-live, and no named internal owner. We fix all three — thin slices, business-owned scope, and a named process owner per module who signs the acceptance tests. We also start by making the current system work where we can, because a rescue is usually cheaper than a replacement.",
      },
      {
        question: "Do you build custom software?",
        answer:
          "Only integrations, dashboards and automations — the connective tissue. For core systems we implement established products, because a ₹25 crore business should not be maintaining bespoke software. If a requirement genuinely has no product answer, we will say so and help you scope it for a specialist development firm.",
      },
    ],
    relatedInsights: [
      "factory-automation-guide-msme",
      "erp-selection-msme-manufacturing",
      "unit-economics-food-manufacturing",
    ],
    seo: {
      title: "ERP, Automation & Business Dashboard Consultants for MSMEs",
      description:
        "Vendor-neutral ERP selection, production digitisation, CRM, AI automation and owner dashboards for Indian manufacturing MSMEs. Median ₹22 lakh of avoided software spend.",
      keywords: [
        "ERP consultant India MSME",
        "ERP selection consultant",
        "manufacturing automation consultant",
        "business dashboard consultant India",
        "AI automation for MSME",
      ],
    },
  },

  {
    slug: "subsidies-compliance",
    name: "Subsidies & Compliance",
    navLabel: "Subsidies & Compliance",
    eyebrow: "Government advisory practice",
    headline: "Claim what you are entitled to — in the right order",
    summary:
      "Central and state subsidy identification and filing, FSSAI and FSSC 22000 implementation, factory and pollution approvals, trademark filing, and the sequencing that decides whether a claim survives audit.",
    promise: "PMFME, PMKSY, FSSAI, licences",
    icon: "compliance",
    visual: "compliance-grid",
    problems: [
      "You ordered machinery before filing, and the subsidy is now gone.",
      "Nobody can tell you which of the eleven schemes you qualify for.",
      "Your Consent to Establish has been pending for four months.",
      "Modern trade asked for an FSSC 22000 certificate and you have an FSSAI licence.",
      "Commissioning is stalled on a fire NOC nobody started.",
    ],
    approach: [
      {
        step: "01",
        title: "Map entitlement before spending",
        description:
          "Central schemes, your state's industrial policy, sector-specific funds and district-level incentives, scored against your project. Deadlines and pre-conditions first, because most claims are lost on sequence, not eligibility.",
      },
      {
        step: "02",
        title: "Sequence the critical path",
        description:
          "Which approval blocks which, what must be filed before the machinery order, and what can run in parallel. Delivered as a dated Gantt against your commissioning target.",
      },
      {
        step: "03",
        title: "File and follow through",
        description:
          "Applications, annexures, departmental queries, inspections and hearings. We attend the site visits, because that is where files stall.",
      },
      {
        step: "04",
        title: "Build the system, not the certificate",
        description:
          "FSSAI, FSSC 22000 and HACCP implemented as SOPs, records and internal audits your team actually runs, so the recertification audit is uneventful.",
      },
      {
        step: "05",
        title: "Keep the claim audit-proof",
        description:
          "Subsidy claims get audited years later. We hand over an indexed evidence file — invoices, payment proofs, installation certificates, photographs — so the disbursement survives scrutiny.",
      },
    ],
    deliverables: [
      {
        title: "Subsidy eligibility report",
        description:
          "Scheme-by-scheme eligibility with quantum, pre-conditions, deadlines and the filing sequence, covering central, state and district incentives.",
        timeline: "Week 2",
      },
      {
        title: "Approvals critical-path plan",
        description:
          "Dated Gantt of every statutory approval against your commissioning target, with dependencies, document checklists and the owner for each.",
        timeline: "Week 3",
      },
      {
        title: "Application filing & liaison",
        description:
          "Complete applications with annexures, query responses, inspection coordination and follow-through to sanction or licence issue.",
        timeline: "Through approval",
      },
      {
        title: "Food safety system implementation",
        description:
          "FSSAI schedule-4 or FSSC 22000 documentation, HACCP plan, SOPs, records, internal audit programme and staff training to audit readiness.",
        timeline: "Week 10",
      },
      {
        title: "Claim evidence file",
        description:
          "Indexed, audit-ready evidence pack for every subsidy claimed, retained in your document management system.",
        timeline: "On disbursement",
      },
    ],
    outcomes: [
      { label: "Subsidy sanctioned for clients", value: "₹96 Cr", detail: "Cumulative since 2016" },
      { label: "Median subsidy per project", value: "₹1.9 Cr", detail: "Food and dairy projects" },
      { label: "First-time FSSC 22000 pass rate", value: "100%", detail: "17 audits" },
    ],
    tiers: [
      {
        name: "Eligibility & Sequencing",
        model: "Project",
        price: "₹35,000 – 90,000",
        bestFor: "Anyone planning capex in the next twelve months",
        includes: [
          "Central, state and district scheme mapping",
          "Quantum and pre-condition analysis",
          "Filing sequence and deadlines",
          "Approvals critical-path plan",
        ],
      },
      {
        name: "Filing & Liaison",
        model: "Project",
        price: "₹1.5 – 6 lakh",
        bestFor: "Projects that need the applications actually filed and chased",
        includes: [
          "Everything in Eligibility & Sequencing",
          "Application preparation and filing",
          "Departmental liaison and queries",
          "Inspection coordination",
          "Claim evidence file",
        ],
      },
      {
        name: "Subsidy Success Fee",
        model: "Success fee",
        price: "2 – 4% of sanctioned subsidy",
        bestFor: "Promoters who prefer fees tied to disbursement",
        includes: [
          "Reduced upfront fee",
          "Fee payable on disbursement",
          "Full filing and liaison scope",
          "Audit-defence support",
          "Disclosed in writing before engagement",
        ],
      },
    ],
    industries: ["Dairy", "Food Processing", "Sweets & Bakery", "Agriculture", "Healthcare", "Hospitality"],
    faqs: [
      {
        question: "Which schemes matter most for a food or dairy project?",
        answer:
          "Most often PMFME for micro units, PMKSY component schemes for cold chain and processing infrastructure, the Animal Husbandry Infrastructure Development Fund for dairy, AIF for post-harvest infrastructure, CGTMSE for collateral-free credit, and your state's own industrial policy — which is frequently the largest single component and the one most often missed. Your eligibility report ranks them by net rupees, not by how well known they are.",
      },
      {
        question: "We have already ordered machinery. Is it too late?",
        answer:
          "For some schemes yes, for others no. Several central schemes require the application before any order is placed; state capital subsidies are often more forgiving if commercial production has not started. Tell us your dates and we will tell you honestly what is still claimable — that assessment takes a day.",
      },
      {
        question: "Do you guarantee the subsidy will be sanctioned?",
        answer:
          "No. Sanction depends on budget availability, departmental discretion and factors outside anyone's control. What we guarantee is a complete, correctly sequenced, audit-proof file — and we tell you the realistic probability before you engage us, based on what we have seen in that scheme and state over the last two years.",
      },
      {
        question: "Can you handle approvals outside Maharashtra and Gujarat?",
        answer:
          "Yes. We work directly in Maharashtra, Gujarat, Karnataka, Madhya Pradesh and Rajasthan, and through vetted local associates elsewhere. The filing quality and the fee stay ours; the local liaison is theirs. We tell you which arrangement applies before you engage.",
      },
    ],
    relatedInsights: [
      "government-subsidies-food-processing",
      "packaging-compliance-fssai-legal-metrology",
      "how-to-start-dairy-plant-india",
    ],
    seo: {
      title: "Subsidy & Compliance Consultants | PMFME, PMKSY, FSSAI, Factory Licences",
      description:
        "Subsidy eligibility, filing and liaison plus FSSAI, FSSC 22000, pollution and factory approvals for Indian MSMEs. ₹96 Cr of subsidy sanctioned for clients.",
      keywords: [
        "subsidy consultant India",
        "PMFME scheme consultant",
        "PMKSY subsidy consultant",
        "FSSAI licence consultant",
        "FSSC 22000 implementation India",
        "factory licence consultant",
      ],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs = services.map((service) => service.slug);
