import type { CaseStudy } from "@/content/types";

/**
 * Case studies are the highest-converting asset on a consulting site, so each
 * one is structured as challenge → context → approach → measured result, with
 * a named metric in the headline position.
 *
 * Client names are used with written permission; where permission was limited
 * we mask the name and say so (`anonymised: true`).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "sahyadri-dairy-expansion",
    client: "Sahyadri Dairy",
    anonymised: false,
    title: "A ₹18 crore dairy expansion funded, built and running at 86% OEE",
    industry: "Dairy",
    services: ["project-funding-dpr", "factory-setup-operations", "subsidies-compliance"],
    location: "Kolhapur, Maharashtra",
    duration: "22 months",
    engagementModel: "Project fee + success fee on sanction",
    challenge:
      "A 20,000 LPD chilling centre with loyal farmer supply, 5% gross margins and no way to fund the value-added plant that would fix them.",
    context: [
      "Sahyadri had built genuine procurement strength across 41 villages but sold every litre as bulk chilled milk to a larger dairy, at a margin that could not fund its own growth.",
      "The promoters had approached two banks independently over eighteen months. Both files stalled: the first on projections a credit officer described as 'aspirational', the second because the proposed site had no viable effluent solution.",
      "A machinery supplier had quoted a ₹24 crore turnkey plant with capacity for eight product lines. Nobody had asked whether the procurement curve or the market could support eight.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–3",
        title: "Pre-feasibility and a harder question",
        detail:
          "We modelled contribution per litre for nine candidate products against Sahyadri's actual month-by-month procurement curve. Only paneer, ghee and a small shrikhand line survived the analysis. The recommendation cut the proposed project from ₹24 crore to ₹18 crore, and the number of product lines from eight to three.",
      },
      {
        phase: "Phase 2 · Weeks 3–7",
        title: "Site reappraisal",
        detail:
          "The original site failed on effluent load and would not have received Consent to Establish without a disproportionate treatment investment. We appraised three alternatives on freight, power, water, labour and effluent cost, and the selected site reduced projected annual operating cost by ₹34 lakh.",
      },
      {
        phase: "Phase 3 · Weeks 5–12",
        title: "DPR, subsidy sequencing and sanction",
        detail:
          "A 118-page DPR with every capital number traced to a quotation, CMA data in the lender's format, and an AHIDF interest-subvention application filed before the machinery order — which preserved ₹2.4 crore of benefit the earlier attempts would have forfeited. Sanction came 3.1 months after submission.",
      },
      {
        phase: "Phase 4 · Months 4–18",
        title: "Independent tendering and commissioning",
        detail:
          "We wrote the technical specification and ran a three-vendor tender rather than accepting the original turnkey quote. Evaluated on total cost of ownership, the selected package came in 12% below the incumbent's revised bid with a stronger performance guarantee. We chaired the weekly site review through to trial production.",
      },
      {
        phase: "Phase 5 · Months 18–22",
        title: "Operating system handover",
        detail:
          "Workstation SOPs, a daily production board, preventive maintenance calendar and four weeks of supervisor training. OEE was baselined at 61% in month one and reached 86% by month four of commercial operation.",
      },
    ],
    headlineResult: { label: "Gross margin", value: "5% → 24%", detail: "18 months after commissioning" },
    results: [
      { label: "Project funded", value: "₹18.2 Cr", detail: "Term loan ₹11.4 Cr, subsidy ₹2.4 Cr, promoter ₹4.4 Cr" },
      { label: "Capex avoided", value: "₹6 Cr", detail: "Versus the original eight-line proposal" },
      { label: "Revenue", value: "₹14 Cr → ₹41 Cr", detail: "FY23 to FY25" },
      { label: "OEE on primary line", value: "86%", detail: "From a 61% commissioning baseline" },
      { label: "Farmer suppliers", value: "41 → 96", detail: "Villages served" },
      { label: "Time to sanction", value: "3.1 months", detail: "After two failed attempts over 18 months" },
    ],
    quote: {
      text: "Two banks had already said no. Anuradha's first act was to tell us our own project was too big — which was not what we wanted to hear, and was the reason the third bank said yes.",
      author: "Mahesh Patil",
      role: "Managing Director, Sahyadri Dairy",
    },
    visual: "funding-waterfall",
    seo: {
      title: "Case Study: ₹18 Cr Dairy Expansion Funded & Commissioned — Sahyadri Dairy",
      description:
        "How a 20,000 LPD chilling centre moved from 5% to 24% gross margin: right-sized project, ₹18.2 Cr funded including ₹2.4 Cr AHIDF benefit, 86% OEE post-commissioning.",
      keywords: ["dairy expansion case study", "dairy project funding India", "AHIDF subsidy case study"],
    },
  },

  {
    slug: "veerbhadra-oee-turnaround",
    client: "Veerbhadra Foods",
    anonymised: false,
    title: "Three times the output from the same plant, without new land",
    industry: "Food Processing",
    services: ["factory-setup-operations", "technology-automation"],
    location: "Nashik, Maharashtra",
    duration: "9 months",
    engagementModel: "Operations Excellence retainer",
    challenge:
      "A fruit pulp line rated at 5 tonnes per hour that delivered 2.8 on a good day, with the promoters about to buy land for a second plant.",
    context: [
      "Veerbhadra processed tomato and mango pulp for institutional buyers. Demand exceeded supply, and the board had approved ₹7 crore of land acquisition for a second facility.",
      "Nobody in the business had measured overall equipment effectiveness. Production reporting arrived weekly, by which point the previous week's losses were unrecoverable and unattributable.",
      "Yield loss was assumed to be 'about 4%'. It was not measured at any point in the process, and there was no mass balance for the line.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–4",
        title: "Measure before changing anything",
        detail:
          "Four weeks of shift-by-shift logging of availability, performance and quality losses, plus a full mass balance across the line. True OEE was 31%, not the 56% the team believed. Yield loss was 7.1%, concentrated in two places nobody had instrumented.",
      },
      {
        phase: "Phase 2 · Weeks 5–6",
        title: "Rank the losses in rupees",
        detail:
          "Changeover time, an undersized pulper feed, unplanned pump maintenance and evaporator fouling accounted for 78% of the loss, in that order. The ranked list changed the board conversation: the second plant was deferred pending the outcome of four interventions.",
      },
      {
        phase: "Phase 3 · Months 2–5",
        title: "Fix the top four",
        detail:
          "Changeover reduced from 145 to 42 minutes through a documented SMED routine; the pulper feed conveyor resized for ₹11 lakh; a preventive maintenance calendar with condition monitoring on the two critical pumps; and a CIP schedule change that cut evaporator fouling downtime by two thirds.",
      },
      {
        phase: "Phase 4 · Months 5–9",
        title: "Make it visible and keep it",
        detail:
          "Weighbridge and line instruments integrated into the ERP, an hourly production board on the floor, and a ten-metric owner dashboard refreshed nightly. Reporting lag went from nine days to one, and each of the four fixes has a named owner and a control chart.",
      },
    ],
    headlineResult: { label: "Line output", value: "2.8 → 4.6 TPH", detail: "A 64% increase, same equipment" },
    results: [
      { label: "OEE", value: "31% → 74%", detail: "Measured on the primary line" },
      { label: "Annual output", value: "3.1x", detail: "Including recovered operating weeks" },
      { label: "Capex deferred", value: "₹7 Cr", detail: "Second plant no longer required" },
      { label: "Yield loss", value: "7.1% → 3.4%", detail: "Worth ₹1.4 Cr a year at current volumes" },
      { label: "Changeover time", value: "145 → 42 min", detail: "Documented SMED routine" },
      { label: "Reporting lag", value: "9 days → 1 day", detail: "Production MIS" },
    ],
    quote: {
      text: "We had board approval to spend seven crore on a second plant. Anuradha spent four weeks with a clipboard and found most of the second plant inside the first one.",
      author: "Sunita Kale",
      role: "Director — Operations, Veerbhadra Foods",
    },
    visual: "capacity-gauge",
    seo: {
      title: "Case Study: 3x Output Without New Capex — Veerbhadra Foods OEE Turnaround",
      description:
        "A fruit pulp line went from 31% to 74% OEE and 2.8 to 4.6 TPH in nine months, deferring ₹7 crore of planned capex. Measurement first, then four targeted interventions.",
      keywords: ["OEE improvement case study India", "food plant productivity", "manufacturing turnaround MSME"],
    },
  },

  {
    slug: "kesar-mithai-brand-launch",
    client: "Kesar Mithai",
    anonymised: false,
    title: "A 62-year-old sweet shop becomes a packaged brand in four states",
    industry: "Sweets & Bakery",
    services: ["branding-marketing", "factory-setup-operations", "subsidies-compliance"],
    location: "Ahmedabad, Gujarat",
    duration: "14 months",
    engagementModel: "Brand Launch project + Growth Marketing retainer",
    challenge:
      "Three outlets with genuine local love, a three-day shelf life, and a founder's son who wanted national distribution without losing what made it loved.",
    context: [
      "Kesar's mohanthal and kaju katli had a devoted local following built over six decades, entirely through counter sales at three Ahmedabad outlets.",
      "Two earlier attempts at packaged retail had failed: the first on shelf life, the second when a modern trade chain rejected the listing on non-compliant artwork and an unsubstantiated shelf-life claim.",
      "The family had no costing for packaged goods. Counter margins had always absorbed the distributor and retailer margins that packaged sales would demand.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–4",
        title: "Codify the halwai's judgement",
        detail:
          "A sensory panel benchmarked the founder's product, then we converted the recipe into measurable parameters — time, temperature, moisture, water activity, pH — with acceptance ranges. This became the specification every later scale-up step was tested against.",
      },
      {
        phase: "Phase 2 · Weeks 4–10",
        title: "Shelf life without changing the product",
        detail:
          "Water activity management, nitrogen-flushed MAP packing and barrier film selection with the converter, validated by accelerated shelf-life studies at a NABL lab. Mohanthal reached 90 days and the khoya-based range 52, with both claims substantiated on file before any artwork was printed.",
      },
      {
        phase: "Phase 3 · Weeks 8–16",
        title: "Positioning, pack architecture and compliance",
        detail:
          "Positioning built on the six-decade provenance rather than a generic 'premium sweets' claim. Three pack tiers — impulse, take-home and gifting — priced to survive full trade margins, with FSSAI and Legal Metrology declarations checked line by line, which is exactly where the previous attempt failed.",
      },
      {
        phase: "Phase 4 · Months 5–10",
        title: "A plant for the festive curve",
        detail:
          "A 1.2 TPD line with chilled storage, sized for sustainable volume with a pre-build strategy for the Diwali peak rather than capacity that would idle for forty-six weeks. PMFME support of ₹9.6 lakh filed and sanctioned before the machinery order.",
      },
      {
        phase: "Phase 5 · Months 9–14",
        title: "Distribution and demand",
        detail:
          "Modern trade listings in four states, a distributor ROI model that made appointment conversations straightforward, a D2C store for gifting, and WhatsApp retention flows. The demand engine was handed to an internal two-person team in month twelve with documented SOPs.",
      },
    ],
    headlineResult: { label: "Revenue", value: "₹4.2 Cr → ₹19.6 Cr", detail: "14 months, counter + packaged" },
    results: [
      { label: "Shelf life", value: "3 → 90 days", detail: "Mohanthal, MAP packed, NABL substantiated" },
      { label: "Modern trade listings", value: "11 chains", detail: "Gujarat, Maharashtra, Rajasthan, MP" },
      { label: "Price realisation", value: "+17%", detail: "Versus the pre-launch counter price per kg" },
      { label: "PMFME subsidy", value: "₹9.6 lakh", detail: "Sanctioned before machinery order" },
      { label: "D2C gifting revenue", value: "₹2.3 Cr", detail: "First full festive season" },
      { label: "Repeat purchase rate", value: "38%", detail: "D2C, within 90 days" },
    ],
    quote: {
      text: "My father's worry was that we would industrialise the taste out of it. They ran a sensory panel on his mohanthal in the first week and made that benchmark the specification. He signed off on batch forty-one himself.",
      author: "Jignesh Shah",
      role: "Director, Kesar Mithai",
    },
    visual: "revenue-bars",
    seo: {
      title: "Case Study: Sweet Shop to Packaged Brand in Four States — Kesar Mithai",
      description:
        "How a 62-year-old mithai house extended shelf life from 3 to 90 days, won 11 modern trade listings and grew from ₹4.2 Cr to ₹19.6 Cr in 14 months.",
      keywords: ["mithai brand launch case study", "sweets packaging shelf life", "PMFME subsidy case study"],
    },
  },

  {
    slug: "rangoli-spices-export-readiness",
    client: "Rangoli Spices",
    anonymised: false,
    title: "From a single buyer to eleven, and an export licence that holds",
    industry: "Food Processing",
    services: ["business-growth-strategy", "subsidies-compliance", "branding-marketing"],
    location: "Indore, Madhya Pradesh",
    duration: "16 months",
    engagementModel: "Growth Diagnostic + Filing & Liaison + Growth Marketing retainer",
    challenge:
      "A spice grinding business where one private-label buyer accounted for 74% of despatch and set the price every quarter.",
    context: [
      "Rangoli ground and blended spices for a large private-label buyer at a contribution margin that had declined for three consecutive years, with no ability to refuse the annual price reset.",
      "The business had attempted exports twice and been stopped by pesticide residue limits and documentation it did not understand.",
      "There was no own-brand presence, no food safety certification and no costing visibility below the level of total factory cost.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–3",
        title: "Diagnostic and the concentration problem",
        detail:
          "Rebuilding three years of P&L by customer and SKU showed the anchor buyer was contributing 74% of volume at 41% of gross margin. The diagnostic reframed the goal from 'grow revenue' to 'replace half the anchor volume within eighteen months'.",
      },
      {
        phase: "Phase 2 · Months 2–6",
        title: "Build the compliance platform first",
        detail:
          "FSSC 22000 implemented as a working system, a residue testing protocol with a NABL lab, traceability to farmer lot, and APEDA registration. This was deliberately sequenced before any buyer outreach, because both earlier export attempts had failed on exactly this.",
      },
      {
        phase: "Phase 3 · Months 4–10",
        title: "Own brand for the domestic shelf",
        detail:
          "A regional own-brand range positioned on single-origin sourcing and freshness, with pack-price architecture designed so it would not undercut the private-label business that still paid the bills.",
      },
      {
        phase: "Phase 4 · Months 8–16",
        title: "Diversify the book",
        detail:
          "Institutional and HoReCa supply, two additional private-label accounts, and first export orders to the UAE and Oman supported by Market Access Initiative reimbursement for two trade fairs.",
      },
    ],
    headlineResult: { label: "Top-buyer concentration", value: "74% → 31%", detail: "Of total despatch, 16 months" },
    results: [
      { label: "Active buyers", value: "1 → 11", detail: "Private label, institutional, export" },
      { label: "Gross margin", value: "+7.2 pts", detail: "Blended across the book" },
      { label: "Export revenue", value: "₹3.4 Cr", detail: "UAE and Oman, first full year" },
      { label: "FSSC 22000", value: "Passed first attempt", detail: "Zero major non-conformities" },
      { label: "Own brand revenue", value: "₹5.1 Cr", detail: "Year one of launch" },
      { label: "Revenue", value: "₹22 Cr → ₹38 Cr", detail: "With a materially safer book" },
    ],
    quote: {
      text: "Every consultant we spoke to wanted to talk about exports. Anuradha spent the first six months on certification and residue testing, which is the boring answer and the reason the orders did not fall through this time.",
      author: "Arvind Jain",
      role: "Partner, Rangoli Spices",
    },
    visual: "revenue-bars",
    seo: {
      title: "Case Study: Reducing Buyer Concentration 74% to 31% — Rangoli Spices",
      description:
        "A spice processor diversified from one anchor buyer to eleven, added ₹3.4 Cr of exports and improved gross margin 7.2 points by building the compliance platform first.",
      keywords: ["spice export consultant case study", "FSSC 22000 case study", "buyer concentration MSME"],
    },
  },

  {
    slug: "annapurna-fpo-infrastructure",
    client: "Annapurna Agro Producer Company",
    anonymised: false,
    title: "A farmer company that kept the margin it created",
    industry: "Agriculture & Agri-tech",
    services: ["project-funding-dpr", "subsidies-compliance", "business-growth-strategy"],
    location: "Jalgaon, Maharashtra",
    duration: "13 months",
    engagementModel: "Project fee, part-funded by the FPO promotion grant",
    challenge:
      "1,840 member farmers selling banana and onion at mandi prices, with no storage, no grading and no bargaining position.",
    context: [
      "Annapurna had been registered for three years with a functioning board but no infrastructure and no credit history. Members sold individually at distress prices during peak arrivals.",
      "Two banks had declined loan applications, citing absent audited accounts and no demonstrable offtake.",
      "An earlier consultant had produced a project report for a ₹9 crore integrated processing unit — an order of magnitude beyond what the FPO could operate or service.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–5",
        title: "Governance before capital",
        detail:
          "Three years of accounts brought to audit, board processes documented, a transparent member pricing policy adopted, and a simple MIS installed. Unglamorous work, and the reason the third bank engaged at all.",
      },
      {
        phase: "Phase 2 · Weeks 4–9",
        title: "Right-size the project",
        detail:
          "We replaced the ₹9 crore processing proposal with a ₹4.1 crore grading, packing and warehousing facility the FPO could staff and service, with structural provision for a processing phase two once a trading record existed.",
      },
      {
        phase: "Phase 3 · Weeks 6–14",
        title: "Offtake before construction",
        detail:
          "Grade specifications agreed and indicative pricing settled with two institutional buyers and one exporter before the loan application was filed — which converted the lender conversation from speculative to evidenced.",
      },
      {
        phase: "Phase 4 · Months 4–13",
        title: "AIF funding and commissioning",
        detail:
          "DPR and AIF application with 3% interest subvention and credit guarantee, sanctioned in 4.2 months. Construction, weighbridge, grading line and a 5,000 MT warehouse commissioned, with SOPs and a trained three-person operating team.",
      },
    ],
    headlineResult: { label: "Member realisation", value: "+16%", detail: "Versus mandi sale, post-grading" },
    results: [
      { label: "Project funded", value: "₹4.1 Cr", detail: "AIF term loan with 3% subvention" },
      { label: "Member farmers", value: "1,840 → 2,610", detail: "Growth after commissioning" },
      { label: "Distress sale volume", value: "-62%", detail: "Peak-arrival period" },
      { label: "FPO turnover", value: "₹0 → ₹11.8 Cr", detail: "First full year of operations" },
      { label: "Time to sanction", value: "4.2 months", detail: "After two prior rejections" },
      { label: "Capex avoided", value: "₹4.9 Cr", detail: "Versus the earlier over-scoped proposal" },
    ],
    quote: {
      text: "The first report we paid for was a beautiful book for a plant we could never have run. This one was smaller, and the bank believed it.",
      author: "Dr. Shalini Patil",
      role: "Chairperson, Annapurna Agro Producer Company",
    },
    visual: "funding-waterfall",
    seo: {
      title: "Case Study: ₹4.1 Cr FPO Warehouse & Grading Facility — Annapurna Agro",
      description:
        "How an FPO with two loan rejections secured ₹4.1 Cr of AIF funding, lifted member realisation 16% and built ₹11.8 Cr of turnover in its first year of operations.",
      keywords: ["FPO case study India", "agriculture infrastructure fund case study", "FPO warehouse project"],
    },
  },

  {
    slug: "shubham-hospital-project",
    client: "A 64-bed secondary care hospital",
    anonymised: true,
    title: "A hospital that broke even in month fourteen, at half the beds the promoters wanted",
    industry: "Healthcare Projects",
    services: ["project-funding-dpr", "business-growth-strategy"],
    location: "Central Maharashtra",
    duration: "19 months",
    engagementModel: "Feasibility + DPR project fee",
    challenge:
      "A clinician group planning a 130-bed multi-specialty hospital in a district town whose addressable catchment did not support it.",
    context: [
      "Three consultants had produced projections for a 130-bed facility. All three modelled demand from district population rather than realistic addressable catchment and payer mix.",
      "The promoters were experienced clinicians with no project finance experience, and had already commissioned architectural drawings for the larger facility.",
      "No model included a ramp-up reserve, despite occupancy in comparable facilities taking two years to mature.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–6",
        title: "Catchment study the promoters did not enjoy",
        detail:
          "Competitor bed census, referral pattern mapping across 38 feeder locations, payer mix analysis and realistic addressable population. The defensible answer was 64 beds in phase one, less than half the plan.",
      },
      {
        phase: "Phase 2 · Weeks 5–9",
        title: "Bed mix and specialty modelling",
        detail:
          "Revenue per bed-day by specialty and payer, length of stay, theatre and imaging utilisation. Two of the six proposed specialties were removed and a day-care surgical block added, which materially improved projected return on the same footprint.",
      },
      {
        phase: "Phase 3 · Weeks 8–14",
        title: "DPR with an honest ramp",
        detail:
          "A project report modelling occupancy maturing over 26 months, with an explicit working capital and interest-servicing reserve, stress-tested at 70% of projected occupancy. The lender's credit note cited the ramp-up reserve as the reason for approval.",
      },
      {
        phase: "Phase 4 · Months 4–19",
        title: "Phased construction and approvals",
        detail:
          "Structural provision for a phase two above the day-care block, so expansion would not mean rebuilding. Clinical establishment registration, biomedical waste authorisation, AERB licensing and fire NOC run in parallel from month one.",
      },
    ],
    headlineResult: { label: "Operating break-even", value: "Month 14", detail: "Against 24 months projected" },
    results: [
      { label: "Project funded", value: "₹21.4 Cr", detail: "Term loan with ramp-up reserve" },
      { label: "Phase one beds", value: "130 → 64", detail: "Right-sized to addressable catchment" },
      { label: "Occupancy, month 18", value: "71%", detail: "Against 58% projected" },
      { label: "Capex avoided", value: "₹19 Cr", detail: "Versus the 130-bed plan" },
      { label: "Day-care contribution", value: "28%", detail: "Of revenue, from the added block" },
      { label: "Phase two", value: "Approved", detail: "Funded from operating cash flow" },
    ],
    quote: {
      text: "Being told to halve the project was not what we paid for. Fourteen months in, we are cash positive and building phase two from our own surplus — which is not the conversation our peers in the next district are having.",
      author: "Managing Trustee",
      role: "Name withheld at the client's request",
    },
    visual: "growth-curve",
    seo: {
      title: "Case Study: Right-Sizing a Hospital Project — Break-Even in Month 14",
      description:
        "A 130-bed hospital plan cut to 64 beds on catchment evidence, funded at ₹21.4 Cr with a ramp-up reserve, reached operating break-even ten months ahead of projection.",
      keywords: ["hospital feasibility case study", "hospital project funding India", "bed mix modelling"],
    },
  },

  {
    slug: "coastal-stay-resort-turnaround",
    client: "Coastal Stay Resorts",
    anonymised: false,
    title: "A resort that stopped renting its demand from the OTAs",
    industry: "Hospitality",
    services: ["business-growth-strategy", "branding-marketing", "technology-automation"],
    location: "Sindhudurg, Maharashtra",
    duration: "11 months",
    engagementModel: "Growth Diagnostic + Growth Marketing retainer",
    challenge:
      "A 38-key coastal property at 44% annual occupancy, 81% of it booked through OTAs at commissions that erased the season's profit.",
    context: [
      "Coastal Stay had a genuinely attractive property and a good monsoon-season story that nobody was telling. Bookings came almost entirely through two aggregators.",
      "The owners had responded to weak occupancy with deeper OTA discounting, which improved volume and reduced profit for two consecutive years.",
      "There was no property website worth the name, no booking engine, and no record of past guests beyond the aggregators' masked contact data.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–3",
        title: "Diagnostic on channel economics",
        detail:
          "Net revenue per occupied room by channel, after commission, payment charges and discount. Direct bookings were worth 31% more per room-night than the OTA average — and were 6% of the book.",
      },
      {
        phase: "Phase 2 · Weeks 3–8",
        title: "Position the monsoon, not the beach",
        detail:
          "Repositioned around monsoon and shoulder-season experiences — the periods with the worst occupancy and the least competition — instead of competing on a beach proposition every property in the district also sells.",
      },
      {
        phase: "Phase 3 · Months 2–6",
        title: "Own the booking path",
        detail:
          "A property website with a commission-free booking engine, metasearch presence, a guest data platform, and WhatsApp-based pre-arrival and post-stay flows. OTA presence was kept for discovery, with rate parity managed deliberately rather than by default.",
      },
      {
        phase: "Phase 4 · Months 5–11",
        title: "Build the repeat engine",
        detail:
          "A returning-guest programme, corporate offsite and small-wedding packages for weekdays, and an F&B and experience programme that lifted spend per guest. Weekday occupancy was the specific target.",
      },
    ],
    headlineResult: { label: "Direct bookings", value: "6% → 44%", detail: "Of total room-nights" },
    results: [
      { label: "Annual occupancy", value: "44% → 63%", detail: "With no rate reduction" },
      { label: "RevPAR", value: "+58%", detail: "Year on year" },
      { label: "OTA commission paid", value: "-₹41 lakh", detail: "Annualised" },
      { label: "Monsoon occupancy", value: "19% → 52%", detail: "June to September" },
      { label: "Repeat guests", value: "27%", detail: "Of direct bookings" },
      { label: "F&B revenue share", value: "31% → 44%", detail: "Of total revenue" },
    ],
    quote: {
      text: "We were discounting harder every season and wondering why the money never arrived. The fix was not a better rate on the aggregator, it was owning the guest — and monsoon, which we had always treated as the off season.",
      author: "Rohan Sawant",
      role: "Proprietor, Coastal Stay Resorts",
    },
    visual: "revenue-bars",
    seo: {
      title: "Case Study: Resort Direct Bookings 6% to 44% — Coastal Stay Resorts",
      description:
        "A 38-key coastal resort lifted occupancy from 44% to 63% and RevPAR 58% by repositioning the monsoon season and moving bookings off the OTAs.",
      keywords: ["resort turnaround case study India", "hotel direct booking strategy", "RevPAR improvement"],
    },
  },

  {
    slug: "nandini-cold-chain-network",
    client: "Nandini Cold Chain",
    anonymised: false,
    title: "A cold chain designed for the despatch pattern that actually existed",
    industry: "Dairy",
    services: ["factory-setup-operations", "project-funding-dpr", "technology-automation"],
    location: "Belagavi, Karnataka",
    duration: "15 months",
    engagementModel: "Turnkey project management",
    challenge:
      "A chilled distribution business losing 9% of despatched value to shrinkage, returns and temperature excursions it could not locate.",
    context: [
      "Nandini distributed chilled dairy across 340 retail points in two districts, with a route structure that had grown by accretion rather than design.",
      "Shrinkage was known in aggregate and unattributable in detail. There was no temperature logging between the plant gate and the retailer's chiller.",
      "A PMKSY cold chain grant application had been prepared and abandoned twice for want of a technically defensible project configuration.",
    ],
    approach: [
      {
        phase: "Phase 1 · Weeks 1–4",
        title: "Find the losses",
        detail:
          "Temperature loggers on twelve routes for four weeks, plus a returns teardown by SKU, route and retailer. 71% of the loss traced to two route legs and a retailer segment whose own chillers were failing overnight.",
      },
      {
        phase: "Phase 2 · Weeks 4–9",
        title: "Redesign the network",
        detail:
          "A hub-and-spoke structure with one new 400 MT cold store, revised route legs under a hard time-to-first-drop limit, and a segmented service model for the retailers whose infrastructure could not hold temperature.",
      },
      {
        phase: "Phase 3 · Weeks 8–14",
        title: "Fund it properly",
        detail:
          "A DPR and PMKSY cold chain grant application with the technical configuration the earlier attempts lacked. Grant of ₹2.9 crore sanctioned against an eligible project cost of ₹7.4 crore.",
      },
      {
        phase: "Phase 4 · Months 4–15",
        title: "Build, instrument, hand over",
        detail:
          "Cold store commissioned, reefer fleet specified and tendered independently, IoT temperature telemetry to a live dashboard with exception alerts, and route SOPs with a daily cold-chain compliance report.",
      },
    ],
    headlineResult: { label: "Value loss", value: "9.0% → 1.8%", detail: "Shrinkage, returns and excursions" },
    results: [
      { label: "Project funded", value: "₹7.4 Cr", detail: "Including ₹2.9 Cr PMKSY grant" },
      { label: "Retail points served", value: "340 → 610", detail: "Same fleet, redesigned routes" },
      { label: "Temperature excursions", value: "-94%", detail: "Logged incidents per month" },
      { label: "Annual value recovered", value: "₹2.6 Cr", detail: "From reduced loss" },
      { label: "Time to first drop", value: "4.5 → 2.1 hrs", detail: "Median across routes" },
      { label: "Fill rate", value: "82% → 97%", detail: "Retailer order fulfilment" },
    ],
    quote: {
      text: "We had applied for the same grant twice and given up twice. The difference was not the paperwork — it was that this time the project design could be defended.",
      author: "Girish Kulkarni",
      role: "Managing Partner, Nandini Cold Chain",
    },
    visual: "factory-flow",
    seo: {
      title: "Case Study: Cold Chain Loss 9% to 1.8% — Nandini Cold Chain",
      description:
        "A chilled dairy distributor cut value loss from 9% to 1.8%, nearly doubled retail coverage on the same fleet and secured ₹2.9 Cr of PMKSY cold chain grant.",
      keywords: ["cold chain case study India", "PMKSY cold chain grant", "dairy distribution consultant"],
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export const caseStudySlugs = caseStudies.map((study) => study.slug);
