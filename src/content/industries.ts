import type { Industry } from "@/content/types";

export const industries: Industry[] = [
  {
    slug: "dairy",
    name: "Dairy",
    eyebrow: "Industry practice",
    headline: "From chilling centre to value-added plant, without stranding capital",
    summary:
      "We have commissioned nineteen dairy plants between 5,000 and 200,000 litres per day. The difference between a dairy that compounds and one that stalls is almost never the machinery — it is the product mix, the procurement model and whether the cold chain was designed for the despatch pattern that actually exists.",
    marketContext:
      "India processes barely a quarter of its milk through the organised sector, and value-added products carry two to four times the contribution margin of liquid milk. That gap is the opportunity — and the trap, because value-added lines demand cold chain, brand and working capital discipline that liquid-milk operators have never needed.",
    icon: "dairy",
    visual: "capacity-gauge",
    challenges: [
      {
        title: "Procurement volatility",
        description:
          "Flush and lean season swings of 40% break plants designed for an average. We size chilling, drying and SMP capacity around the seasonal curve, not the annual mean.",
      },
      {
        title: "Liquid-milk margin trap",
        description:
          "Liquid milk at 4–7% gross margin cannot fund growth. The question is which value-added products your procurement, cold chain and market can actually support — usually two, not eight.",
      },
      {
        title: "Cold chain economics",
        description:
          "A broken cold chain destroys margin invisibly through shrinkage and returns. We model chilling, storage and distribution as one system with a landed cost per litre per kilometre.",
      },
      {
        title: "Adulteration and traceability",
        description:
          "Buyers and regulators increasingly want batch traceability from village to pack. Retrofitting it costs several times what designing it in does.",
      },
      {
        title: "Effluent load",
        description:
          "Dairy effluent is high-BOD and pollution consent is a real constraint on site selection. It is the single most common reason a dairy site we are asked to appraise fails.",
      },
    ],
    playbook: [
      {
        title: "Product mix before capacity",
        description:
          "We model contribution per litre for every candidate product against your procurement curve and market access, then size the plant for the two or three that win.",
      },
      {
        title: "Procurement that holds in the lean season",
        description:
          "Village-level collection design, chilling centre network, farmer payment cycles and quality-linked pricing that keeps supply loyal when a competitor offers two rupees more.",
      },
      {
        title: "Plant designed for the real despatch pattern",
        description:
          "Tanker despatch and retail packs are different plants. We design for your actual channel split, with headroom where it is cheap and none where it is not.",
      },
      {
        title: "Subsidy-funded cold chain",
        description:
          "AHIDF, PMKSY cold chain components and state dairy policies routinely fund 25–35% of a dairy project. Filed in the right order, before the machinery order.",
      },
      {
        title: "Brand built for the chilled shelf",
        description:
          "Paneer, curd, ghee and flavoured milk compete on trust and freshness cues. Positioning, packaging and a distribution depth plan for chilled retail.",
      },
    ],
    benchmarks: [
      { label: "Capex per 1,000 LPD", value: "₹9 – 16 lakh", detail: "Liquid milk with chilling, 2025 prices" },
      { label: "Value-added gross margin", value: "22 – 38%", detail: "Paneer, ghee, curd, shrikhand" },
      { label: "Typical project payback", value: "4.5 – 6 yrs", detail: "Value-added mix, subsidy included" },
      { label: "Plants commissioned", value: "19", detail: "5,000 to 200,000 LPD" },
    ],
    schemes: [
      {
        name: "AHIDF",
        body: "Department of Animal Husbandry & Dairying",
        benefit: "Interest subvention of 3% on term loans for dairy processing and value addition, with a credit guarantee for MSMEs.",
      },
      {
        name: "PMKSY — Cold Chain",
        body: "Ministry of Food Processing Industries",
        benefit: "Grant-in-aid of 35–50% on eligible cold chain and value-addition infrastructure, subject to ceilings.",
      },
      {
        name: "NPDD",
        body: "National Programme for Dairy Development",
        benefit: "Support for chilling infrastructure, milk testing equipment and village-level collection systems.",
      },
      {
        name: "State dairy policy",
        body: "State animal husbandry / industries department",
        benefit: "Capital subsidy typically 15–35% with additional incentives on power tariff and stamp duty; varies by state and district category.",
      },
    ],
    services: ["project-funding-dpr", "factory-setup-operations", "subsidies-compliance", "branding-marketing"],
    caseStudies: ["sahyadri-dairy-expansion", "nandini-cold-chain-network"],
    faqs: [
      {
        question: "What does a dairy plant cost to set up in India?",
        answer:
          "For liquid milk with chilling, budget ₹9–16 lakh per 1,000 litres per day of capacity at 2025 prices, excluding land. A 50,000 LPD plant with a paneer and ghee line typically lands between ₹9 and ₹14 crore all-in. The range is wide because effluent treatment, power backup and the degree of automation move the number more than the processing equipment does.",
      },
      {
        question: "Is a chilling centre or a processing plant the better first step?",
        answer:
          "If you do not yet control procurement, a chilling centre at ₹60–90 lakh buys you the supply base and the farmer relationships that make a processing plant viable later. If procurement is already secured through a co-operative or contract, go straight to processing. The wrong sequence is a processing plant with no assured milk, and we see it every year.",
      },
      {
        question: "Which value-added products should we start with?",
        answer:
          "Usually paneer and ghee, because both tolerate procurement variability, have long-established demand and do not need an unbroken chilled retail chain. Curd and flavoured milk need genuine cold-chain distribution discipline. We model contribution per litre for each against your specific procurement curve and market before recommending a mix.",
      },
      {
        question: "How long does a greenfield dairy take to commission?",
        answer:
          "Fourteen to twenty months from land in hand to trial production, assuming funding is sanctioned before civil work starts. The critical path is almost always statutory approvals and the effluent treatment plant, not the dairy equipment — which is exactly why we run the approvals plan from week one.",
      },
    ],
    seo: {
      title: "Dairy Consultancy India | Plant Setup, Funding & Value-Added Strategy",
      description:
        "Dairy consultants for chilling centres, processing plants and value-added lines. 19 plants commissioned from 5,000 to 200,000 LPD. DPR, subsidy, layout, commissioning and brand.",
      keywords: [
        "dairy consultant India",
        "dairy plant setup consultant",
        "dairy project report",
        "milk processing plant consultant",
        "paneer ghee plant consultant",
        "AHIDF subsidy consultant",
      ],
    },
  },

  {
    slug: "food-processing",
    name: "Food Processing",
    eyebrow: "Industry practice",
    headline: "Yield per tonne and hours of real line utilisation decide everything else",
    summary:
      "Fruit and vegetable processing, spices, ready-to-eat, frozen and ambient lines. We design the process backwards from those two numbers, then fit machinery to it — which is the opposite of how most Indian food plants get built.",
    marketContext:
      "India wastes a substantial share of its horticultural output for want of processing and cold chain, while packaged food demand compounds in double digits. The capital is available and heavily subsidised; what is scarce is process design discipline, because plants are usually specified by the machinery supplier who profits from over-specification.",
    icon: "food",
    visual: "factory-flow",
    challenges: [
      {
        title: "Seasonal raw material",
        description:
          "A mango line runs ten weeks a year. Plants built for a single crop sit idle for nine months — we design complementary crop calendars so the asset earns year-round.",
      },
      {
        title: "Yield loss nobody measures",
        description:
          "Two to five points of yield hide in peeling, blanching, evaporation and rework. At scale that is the entire profit, and it is invisible without a mass balance.",
      },
      {
        title: "Supplier-led over-specification",
        description:
          "Machinery vendors design the plant they want to sell. Independently tendered projects in our portfolio came in a median 11% below the supplier-led alternative.",
      },
      {
        title: "Food safety as paperwork",
        description:
          "An FSSAI licence in a file is not a food safety system. Modern trade, exports and institutional buyers audit the system, and failures cost the listing.",
      },
      {
        title: "Working capital in the peak",
        description:
          "Buying a season's raw material in ten weeks needs a working capital line sized for the peak, not the average. It is the most common cause of a good plant stalling in year one.",
      },
    ],
    playbook: [
      {
        title: "Mass balance first",
        description:
          "Every input, output, loss and utility load quantified before a layout is drawn. This single document prevents most of the expensive mistakes we are later asked to fix.",
      },
      {
        title: "Multi-crop calendars",
        description:
          "Line configurations that switch between two or three crops with acceptable changeover, so fixed cost is spread across more operating weeks.",
      },
      {
        title: "Independent machinery tendering",
        description:
          "We write the specification, run a three-vendor tender, evaluate on total cost of ownership and negotiate performance guarantees. We accept no supplier commission.",
      },
      {
        title: "Food safety as a working system",
        description:
          "HACCP, FSSAI schedule-4 or FSSC 22000 implemented as SOPs, records and internal audits that survive an unannounced buyer audit.",
      },
      {
        title: "Grant-funded infrastructure",
        description:
          "PMFME, PMKSY components and AIF routinely fund 35–50% of eligible infrastructure. Sequenced so eligibility is preserved.",
      },
    ],
    benchmarks: [
      { label: "Capex, 2 TPH fruit line", value: "₹4.5 – 8 Cr", detail: "Excluding land, 2025 prices" },
      { label: "Realistic first-year OEE", value: "52 – 64%", detail: "Before an improvement programme" },
      { label: "Grant support available", value: "35 – 50%", detail: "On eligible PMKSY / PMFME components" },
      { label: "Median yield recovered", value: "+3.2 pts", detail: "In our operations engagements" },
    ],
    schemes: [
      {
        name: "PMFME",
        body: "Ministry of Food Processing Industries",
        benefit: "35% credit-linked capital subsidy up to ₹10 lakh for micro food processing units, plus branding and marketing support for groups.",
      },
      {
        name: "PMKSY — Unit Scheme",
        body: "Ministry of Food Processing Industries",
        benefit: "Grant-in-aid of 35–50% on plant, machinery and technical civil works, subject to scheme ceilings.",
      },
      {
        name: "Agriculture Infrastructure Fund",
        body: "Ministry of Agriculture & Farmers' Welfare",
        benefit: "3% interest subvention and credit guarantee on loans for post-harvest and processing infrastructure.",
      },
      {
        name: "State food processing policy",
        body: "State industries / agriculture department",
        benefit: "Additional capital subsidy, power tariff concessions and stamp duty exemption, varying by state and district category.",
      },
    ],
    services: ["factory-setup-operations", "project-funding-dpr", "subsidies-compliance", "technology-automation"],
    caseStudies: ["veerbhadra-oee-turnaround", "rangoli-spices-export-readiness"],
    faqs: [
      {
        question: "What is a realistic capex for a small food processing unit?",
        answer:
          "A 1–2 tonne-per-hour fruit or vegetable line lands between ₹4.5 and ₹8 crore excluding land, with utilities and effluent treatment usually 18–25% of that total. A micro unit under the PMFME route can start at ₹40–90 lakh. The honest answer needs your product, throughput and whether you need ambient, chilled or frozen despatch.",
      },
      {
        question: "How do we avoid a plant that runs three months a year?",
        answer:
          "Design the crop calendar before the line. Most single-crop processors can add a complementary crop with modest tooling changes — mango and guava, tomato and chilli, or a contract-packing window for somebody else's brand. We model the annual utilisation curve in the feasibility stage precisely so this decision is made before the money is spent.",
      },
      {
        question: "Do we need FSSC 22000 or is FSSAI enough?",
        answer:
          "FSSAI is the legal minimum and non-negotiable. FSSC 22000 or BRC becomes necessary when you sell to modern trade, export, or supply an institutional buyer who audits — and it takes eight to twelve weeks to implement properly, so starting it when the buyer asks is already too late.",
      },
      {
        question: "Can you help us find buyers as well?",
        answer:
          "We build the channel strategy, the trade kit and the pricing structure, and we make introductions where we have them — particularly in modern trade and institutional supply. We are not a broker and we do not take a margin on your sales; commission-based selling would compromise the pricing advice we give you.",
      },
    ],
    seo: {
      title: "Food Processing Consultancy India | Plant Design, Subsidy & Funding",
      description:
        "Food processing consultants for fruit, vegetable, spice, RTE and frozen lines. Mass balance design, independent machinery tendering, PMKSY and PMFME subsidy, FSSC 22000.",
      keywords: [
        "food processing consultant India",
        "food plant setup consultant",
        "PMFME consultant",
        "fruit processing plant project report",
        "food processing subsidy consultant",
        "FSSC 22000 consultant India",
      ],
    },
  },

  {
    slug: "sweets-bakery",
    name: "Sweets & Bakery",
    eyebrow: "Industry practice",
    headline: "Turning a beloved local sweet shop into a brand that travels",
    summary:
      "Mithai, namkeen, biscuits and packaged bakery. The hard part is never the recipe — it is shelf life, batch consistency and a cost structure that survives distributor margins and a 40% festive demand spike.",
    marketContext:
      "The Indian sweets and snacks market is enormous, overwhelmingly unorganised, and consolidating fast as packaged brands take shelf space from counter sales. Regional sweet houses with genuine brand equity have a real window — but only if they can industrialise without losing the product that made them loved.",
    icon: "sweets",
    visual: "revenue-bars",
    challenges: [
      {
        title: "Shelf life versus authenticity",
        description:
          "Every extension in shelf life risks the texture and taste that built your reputation. Getting from three days to ninety is a process and packaging problem, not a preservative one.",
      },
      {
        title: "Batch-to-batch variation",
        description:
          "A halwai's judgement does not scale. Converting craft knowledge into measurable process parameters is the core work of industrialising a sweet shop.",
      },
      {
        title: "Festive demand spikes",
        description:
          "Diwali can be 30–40% of annual volume in six weeks. Capacity, manpower and working capital all have to flex for it without idling for the other forty-six.",
      },
      {
        title: "Counter-sale cost structures",
        description:
          "Shop margins do not survive distributor and retailer margins. Packaged pricing has to be built from scratch, and usually needs a reformulated pack-price architecture.",
      },
      {
        title: "Compliance on packaged food",
        description:
          "Nutrition labelling, shelf-life substantiation, allergen declarations and Legal Metrology rules all apply the moment you pack it — and modern trade rejects on artwork before it ever rejects on taste.",
      },
    ],
    playbook: [
      {
        title: "Codify the recipe as a process",
        description:
          "Time, temperature, moisture, water activity and pH captured as measurable parameters with acceptance ranges, so any trained operator reproduces what the founder makes.",
      },
      {
        title: "Shelf life by design",
        description:
          "Water activity management, MAP or nitrogen flushing, barrier selection and accelerated shelf-life studies with a NABL lab — before the artwork is printed.",
      },
      {
        title: "Pack-price architecture",
        description:
          "Impulse, take-home and gifting packs priced for their channel, with a cost sheet that survives full trade margins and the festive discount you will inevitably give.",
      },
      {
        title: "Festive capacity planning",
        description:
          "Peak planning using contract manufacturing, pre-building of stable SKUs and a seasonal manpower model, so you do not buy capacity for six weeks a year.",
      },
      {
        title: "Brand that keeps the heritage",
        description:
          "Identity and packaging that carry the equity of the shop onto a national shelf, rather than replacing it with something generic and modern.",
      },
    ],
    benchmarks: [
      { label: "Capex, 1 TPD mithai line", value: "₹1.8 – 3.5 Cr", detail: "Including chilled storage" },
      { label: "Shelf life achievable", value: "45 – 120 days", detail: "Milk-based sweets, MAP packed" },
      { label: "Gross margin, packaged", value: "28 – 42%", detail: "After full trade margins" },
      { label: "Festive share of volume", value: "30 – 40%", detail: "Typical for mithai brands" },
    ],
    schemes: [
      {
        name: "PMFME",
        body: "Ministry of Food Processing Industries",
        benefit: "35% credit-linked subsidy up to ₹10 lakh for micro units, with a dedicated one-district-one-product route that fits regional sweets well.",
      },
      {
        name: "PMKSY — Unit Scheme",
        body: "Ministry of Food Processing Industries",
        benefit: "Grant-in-aid of 35–50% on plant and machinery for bakery and confectionery units above the micro threshold.",
      },
      {
        name: "CGTMSE",
        body: "Ministry of MSME",
        benefit: "Collateral-free credit guarantee, which matters for sweet houses whose main asset is a leased shop.",
      },
      {
        name: "State MSME incentives",
        body: "State industries department",
        benefit: "Capital subsidy, interest subvention and certification reimbursement for first-time packaged food manufacturers.",
      },
    ],
    services: ["branding-marketing", "factory-setup-operations", "subsidies-compliance", "business-growth-strategy"],
    caseStudies: ["kesar-mithai-brand-launch"],
    faqs: [
      {
        question: "Can traditional mithai really be packaged for a 90-day shelf life?",
        answer:
          "Most of it, yes — with water activity control, modified atmosphere packaging and the right barrier film, and without preservatives in many cases. Khoya-based sweets are the hardest and usually top out around 45–60 days at ambient. We run accelerated shelf-life studies through a NABL lab before anything is printed, because a shelf-life claim you cannot substantiate is a recall waiting to happen.",
      },
      {
        question: "We are a single shop. Is a factory the right next step?",
        answer:
          "Not always. For many sweet houses the better first move is a central kitchen serving three or four outlets, which proves the process discipline at a fraction of the capital. A packaged-goods factory makes sense once you have a distribution plan for it — capacity without a channel is the most common failure in this sector.",
      },
      {
        question: "How do we handle the Diwali spike without idle capacity?",
        answer:
          "Three levers: pre-build the SKUs with adequate shelf life from six weeks out, contract-manufacture the stable commodity items, and keep a trained seasonal manpower pool with a standing arrangement. We build the peak plan into the capacity model so the plant is sized for sustainable volume, not the festive week.",
      },
      {
        question: "Will industrialising the process change the taste?",
        answer:
          "It will change it unless you actively prevent that, which is the whole point of codifying the process before scaling. We benchmark the founder's product on a sensory panel first, then set the process parameters to hit that benchmark, and we re-test at every scale-up step. Clients who skip this step are the ones whose customers notice.",
      },
    ],
    seo: {
      title: "Sweets, Namkeen & Bakery Manufacturing Consultants India",
      description:
        "Consultants for mithai, namkeen and packaged bakery manufacturers: shelf-life extension, process codification, plant setup, pack-price architecture and brand launch.",
      keywords: [
        "mithai manufacturing consultant",
        "sweets factory setup India",
        "bakery plant consultant",
        "namkeen manufacturing consultant",
        "shelf life extension consultant India",
      ],
    },
  },

  {
    slug: "agriculture",
    name: "Agriculture & Agri-tech",
    eyebrow: "Industry practice",
    headline: "Infrastructure that lets a farmer group keep the margin it creates",
    summary:
      "FPO strengthening, warehousing, cold chain, primary processing and grading infrastructure — structured so the value added stays with the producer organisation instead of leaking to the trader.",
    marketContext:
      "Post-harvest losses and the gap between farm-gate and consumer price are both large and both addressable with modest, heavily subsidised infrastructure. The binding constraint is rarely capital; it is governance, aggregation discipline and market linkage inside the producer organisation.",
    icon: "agriculture",
    visual: "funding-waterfall",
    challenges: [
      {
        title: "Aggregation discipline",
        description:
          "An FPO that cannot commit volume cannot negotiate price. Member commitment mechanisms matter more than the warehouse itself.",
      },
      {
        title: "Working capital for procurement",
        description:
          "Paying farmers at pickup needs a line that most FPOs cannot access on their own balance sheet. Structuring it is the real unlock.",
      },
      {
        title: "Governance and compliance",
        description:
          "Boards, audits, statutory filings and transparent pricing. Without these, no lender or institutional buyer will engage, regardless of the crop.",
      },
      {
        title: "Market linkage",
        description:
          "Infrastructure without a committed buyer becomes a subsidised shed. The offtake agreement should precede the construction.",
      },
      {
        title: "Grading and traceability",
        description:
          "Institutional and export buyers pay for consistent grades and documented provenance, not for volume alone.",
      },
    ],
    playbook: [
      {
        title: "Business plan the FPO can run",
        description:
          "Crop-wise volume, realistic margin, member commitment terms and a staffing model an FPO can actually afford and manage.",
      },
      {
        title: "Fund infrastructure through AIF and state schemes",
        description:
          "Warehousing, grading, primary processing and cold storage funded through the Agriculture Infrastructure Fund, PMKSY and state horticulture missions.",
      },
      {
        title: "Secure offtake before you build",
        description:
          "Buyer conversations, grade specifications and indicative pricing settled before the capital is committed.",
      },
      {
        title: "Governance that lenders accept",
        description:
          "Board processes, transparent member pricing, audited accounts and an MIS that makes the FPO creditworthy on its own record.",
      },
      {
        title: "Move up the value chain deliberately",
        description:
          "Grading, then primary processing, then packing under an FPO brand — sequenced so each step is funded by the last.",
      },
    ],
    benchmarks: [
      { label: "Capex, 5,000 MT warehouse", value: "₹3.2 – 5 Cr", detail: "Including grading and weighbridge" },
      { label: "AIF interest subvention", value: "3%", detail: "On loans up to ₹2 crore per project" },
      { label: "Typical FPO margin gain", value: "8 – 18%", detail: "Versus mandi sale, post-grading" },
      { label: "FPO engagements delivered", value: "23", detail: "Across four states" },
    ],
    schemes: [
      {
        name: "Agriculture Infrastructure Fund",
        body: "Ministry of Agriculture & Farmers' Welfare",
        benefit: "3% interest subvention and credit guarantee on loans for post-harvest management infrastructure and community farming assets.",
      },
      {
        name: "10,000 FPO Formation & Promotion",
        body: "Ministry of Agriculture / NABARD / SFAC",
        benefit: "Equity grant, management cost support and credit guarantee for new and growing farmer producer organisations.",
      },
      {
        name: "PMKSY — Cold Chain",
        body: "Ministry of Food Processing Industries",
        benefit: "Grant-in-aid of 35–50% for integrated cold chain, pack houses, ripening chambers and reefer transport.",
      },
      {
        name: "Mission for Integrated Development of Horticulture",
        body: "State horticulture mission",
        benefit: "Subsidy on pack houses, cold rooms, primary processing units and protected cultivation infrastructure.",
      },
    ],
    services: ["project-funding-dpr", "subsidies-compliance", "business-growth-strategy", "technology-automation"],
    caseStudies: ["annapurna-fpo-infrastructure"],
    faqs: [
      {
        question: "Can an FPO borrow without member collateral?",
        answer:
          "Yes, in practice — through the AIF credit guarantee, NABARD refinance routes and CGTMSE, provided the FPO has audited accounts, a functioning board and a demonstrable offtake arrangement. The blocker in almost every case we see is governance documentation, not the absence of security.",
      },
      {
        question: "Warehouse first or processing first?",
        answer:
          "Warehousing and grading almost always first. They are cheaper, they immediately reduce distress sale, and they generate the trading record that makes a lender comfortable with processing capex later. Processing before aggregation is reliably the more expensive order.",
      },
      {
        question: "Do you work with individual farmers or only FPOs?",
        answer:
          "We work with FPOs, producer companies, co-operatives and agri-entrepreneurs with a minimum viable scale — broadly a project above ₹1 crore, which is where our fee structure makes sense for the client. Below that, the state's own FPO resource institutions are genuinely the better route and we will point you to them.",
      },
      {
        question: "How long does an AIF-funded project take?",
        answer:
          "Typically nine to fourteen months from engagement to commissioning: two months for the business plan and DPR, three to five months for sanction, and six months of construction. FPO governance clean-up, when it is needed, runs in parallel and is usually what determines whether the sanction happens at all.",
      },
    ],
    seo: {
      title: "Agriculture & FPO Consultants | Warehousing, Cold Chain, AIF Funding",
      description:
        "Consultants for FPOs, producer companies and agri-entrepreneurs: business plans, AIF and PMKSY funding, warehousing and grading infrastructure, governance and market linkage.",
      keywords: [
        "FPO consultant India",
        "agriculture infrastructure fund consultant",
        "warehouse project report",
        "cold chain consultant India",
        "farmer producer organisation business plan",
      ],
    },
  },

  {
    slug: "healthcare",
    name: "Healthcare Projects",
    eyebrow: "Industry practice",
    headline: "Hospital and diagnostic projects sized for the catchment, not the ambition",
    summary:
      "Feasibility, bed-mix modelling, DPR and funding for hospitals, day-care centres, diagnostic chains and specialty clinics in tier-two and tier-three India — where the demand is real and the over-building is expensive.",
    marketContext:
      "Tier-two and tier-three cities carry genuine unmet demand for secondary care, but the failure pattern is consistent: too many beds, the wrong specialty mix, and a capital structure that cannot absorb a twenty-four month ramp-up. Getting the catchment analysis right matters more than the building.",
    icon: "healthcare",
    visual: "growth-curve",
    challenges: [
      {
        title: "Catchment over-estimation",
        description:
          "Bed demand modelled on district population rather than the realistic addressable catchment and payer mix is the single most common error we are called to correct.",
      },
      {
        title: "Ramp-up cash burn",
        description:
          "Occupancy takes eighteen to thirty months to mature. Projects funded without an explicit ramp-up reserve stall in month nine.",
      },
      {
        title: "Clinician dependence",
        description:
          "In smaller cities, volume follows two or three consultants. Retention and revenue-share structures are a financial risk, not an HR detail.",
      },
      {
        title: "Payer mix and scheme rates",
        description:
          "Ayushman Bharat and state scheme rates, insurance empanelment and cash mix determine realisation per bed-day far more than the tariff card does.",
      },
      {
        title: "Regulatory and accreditation load",
        description:
          "Clinical establishment registration, biomedical waste authorisation, AERB licensing for imaging, fire and NABH readiness all sit on the commissioning critical path.",
      },
    ],
    playbook: [
      {
        title: "Catchment and payer-mix study",
        description:
          "Realistic addressable population, competitor bed census, referral pattern mapping and payer mix, producing a defensible bed and specialty plan.",
      },
      {
        title: "Bed-mix and specialty modelling",
        description:
          "Revenue per bed-day by specialty and payer, average length of stay, theatre and imaging utilisation, tested against a conservative occupancy ramp.",
      },
      {
        title: "Phased capital plan",
        description:
          "Phase one sized to break even at achievable occupancy, with structural provision for phase two so the second wave does not mean rebuilding.",
      },
      {
        title: "Funding with a ramp-up reserve",
        description:
          "DPR and term loan structured with an explicit working capital and interest-servicing reserve for the ramp-up, which lenders accept when it is modelled honestly.",
      },
      {
        title: "Approvals and accreditation path",
        description:
          "Clinical establishment registration, biomedical waste, AERB, fire and a documented NABH readiness roadmap, planned from day one.",
      },
    ],
    benchmarks: [
      { label: "Capex per bed", value: "₹18 – 42 lakh", detail: "Secondary care, tier-2 city, excl. land" },
      { label: "Break-even occupancy", value: "48 – 58%", detail: "Typical for 50–100 bed secondary care" },
      { label: "Occupancy maturity", value: "18 – 30 months", detail: "From commissioning" },
      { label: "Healthcare projects advised", value: "11", detail: "Hospitals, day-care and diagnostics" },
    ],
    schemes: [
      {
        name: "Credit Guarantee Fund (CGTMSE)",
        body: "Ministry of MSME",
        benefit: "Collateral-free credit guarantee for eligible healthcare MSMEs, including diagnostics and day-care centres.",
      },
      {
        name: "State healthcare investment policy",
        body: "State health / industries department",
        benefit: "Capital subsidy, stamp duty exemption and electricity duty concessions for hospitals in designated tier-2 and tier-3 locations.",
      },
      {
        name: "PM Ayushman Bharat Health Infrastructure Mission",
        body: "Ministry of Health & Family Welfare",
        benefit: "Support for critical care blocks and diagnostic infrastructure, largely through public and public-private routes.",
      },
      {
        name: "SIDBI / NABARD refinance",
        body: "SIDBI / NABARD",
        benefit: "Refinance-backed term loans at competitive rates for healthcare infrastructure in underserved districts.",
      },
    ],
    services: ["project-funding-dpr", "business-growth-strategy", "subsidies-compliance", "technology-automation"],
    caseStudies: ["shubham-hospital-project"],
    faqs: [
      {
        question: "How many beds should a tier-two city hospital start with?",
        answer:
          "Usually fewer than the promoter wants. We model the addressable catchment, existing bed census and referral patterns, and the answer for a typical district town is 40–70 beds in phase one with structural provision for a second phase. Starting at 150 beds is how good clinical teams end up in financial distress.",
      },
      {
        question: "Will a bank fund a first-time hospital promoter?",
        answer:
          "Yes, if the promoter group includes clinical credibility, the catchment study is defensible, and the structure includes a ramp-up reserve. Promoter contribution expectations are higher than in manufacturing — typically 25–30% — and lenders look closely at whether the anchor consultants are contractually committed.",
      },
      {
        question: "Do you help with NABH accreditation?",
        answer:
          "We build the readiness roadmap, the documentation architecture and the internal audit system, and we sequence it alongside commissioning rather than after. The accreditation assessment itself is conducted by NABH-empanelled assessors, and we prepare the team for it.",
      },
      {
        question: "Is a diagnostic centre a safer first project?",
        answer:
          "Generally yes — lower capital, faster break-even, and it builds the referral network a hospital later depends on. The economics hinge on imaging utilisation and AERB compliance for radiology, both of which we model explicitly. A number of our hospital clients started exactly this way.",
      },
    ],
    seo: {
      title: "Healthcare Project Consultants India | Hospital Feasibility, DPR & Funding",
      description:
        "Hospital and diagnostic project consultants for tier-2 and tier-3 India: catchment studies, bed-mix modelling, DPR, term loan funding and accreditation readiness.",
      keywords: [
        "hospital project consultant India",
        "hospital feasibility study",
        "hospital project report DPR",
        "diagnostic centre project report",
        "healthcare project funding consultant",
      ],
    },
  },

  {
    slug: "hospitality",
    name: "Hospitality",
    eyebrow: "Industry practice",
    headline: "Hotels and resorts that survive a bad season",
    summary:
      "Feasibility, positioning, DPR and operating models for hotels, resorts, banquet properties and cloud kitchens — built around RevPAR reality and an honest view of seasonality.",
    marketContext:
      "Domestic leisure and religious tourism has broadened well beyond the metros, and mid-market and experiential properties in secondary destinations are genuinely attractive. But hospitality is unforgiving of optimistic occupancy assumptions, because the cost base is almost entirely fixed.",
    icon: "hospitality",
    visual: "revenue-bars",
    challenges: [
      {
        title: "Seasonality and fixed costs",
        description:
          "A property that works at 62% annual occupancy can fail at 48%. Fixed costs do not flex, so the model has to be built on the low season.",
      },
      {
        title: "Over-building the room product",
        description:
          "Capital spent on room size and finishes that the achievable ADR will never recover — the most common and least reversible error in the sector.",
      },
      {
        title: "F&B as an afterthought",
        description:
          "In Indian mid-market properties, food, beverage and banqueting often out-earn rooms. Designing them as a supporting function leaves the main revenue line under-built.",
      },
      {
        title: "Distribution dependence",
        description:
          "OTA commissions of 18–25% quietly cap profitability. A direct booking channel is a capital decision, not a marketing one.",
      },
      {
        title: "Brand versus independent",
        description:
          "Affiliation brings distribution and a fee load. The right answer depends on your location and ADR band, and it should be modelled, not assumed.",
      },
    ],
    playbook: [
      {
        title: "Market and RevPAR study",
        description:
          "Competitive set audit, achievable ADR and occupancy by season, demand segment mix and a defensible RevPAR build-up.",
      },
      {
        title: "Product sized to the ADR",
        description:
          "Room count, key mix, F&B and banquet capacity and public-area programme calibrated to what the market will actually pay.",
      },
      {
        title: "Operating model decision",
        description:
          "Independent, franchise, management contract or a hybrid — compared on net owner cash flow rather than headline fees.",
      },
      {
        title: "DPR and funding with a ramp reserve",
        description:
          "Project report and term loan structured with an explicit stabilisation reserve, plus a stress case at 70% of projected occupancy.",
      },
      {
        title: "Direct demand engine",
        description:
          "Property website, booking engine, metasearch presence and a retention programme that pulls the channel mix away from OTA dependence.",
      },
    ],
    benchmarks: [
      { label: "Capex per key", value: "₹28 – 70 lakh", detail: "Mid-market, secondary destination" },
      { label: "Break-even occupancy", value: "44 – 55%", detail: "Owner-operated mid-market" },
      { label: "F&B share of revenue", value: "35 – 55%", detail: "Indian mid-market properties" },
      { label: "Stabilisation period", value: "18 – 24 months", detail: "To mature occupancy" },
    ],
    schemes: [
      {
        name: "State tourism policy incentives",
        body: "State tourism department",
        benefit: "Capital subsidy, luxury tax and electricity duty concessions, and stamp duty relief for approved tourism projects.",
      },
      {
        name: "Swadesh Darshan / PRASHAD linkages",
        body: "Ministry of Tourism",
        benefit: "Public destination infrastructure that materially improves private project viability in religious and heritage circuits.",
      },
      {
        name: "CGTMSE",
        body: "Ministry of MSME",
        benefit: "Collateral-free credit guarantee for smaller hospitality and cloud kitchen ventures.",
      },
      {
        name: "SIDBI term loans",
        body: "SIDBI",
        benefit: "Longer-tenor term loans suited to hospitality's extended payback profile.",
      },
    ],
    services: ["project-funding-dpr", "business-growth-strategy", "branding-marketing", "technology-automation"],
    caseStudies: ["coastal-stay-resort-turnaround"],
    faqs: [
      {
        question: "How many keys make a resort viable?",
        answer:
          "Below about 20 keys the fixed cost of a professional operating team is hard to absorb; 30–60 keys is the sweet spot for most secondary destinations. The real determinant is the achievable ADR — a ₹6,000 ADR property needs materially more keys to carry the same overhead as a ₹14,000 one, and that calculation should precede the architecture.",
      },
      {
        question: "Should we affiliate with a hotel brand?",
        answer:
          "Model it both ways on net owner cash flow. Affiliation typically costs 8–12% of revenue across fees but can lift occupancy by 10–18 points and ADR by 12–20% in markets where the brand has genuine recall. In a destination driven by direct and repeat leisure demand, independent often wins.",
      },
      {
        question: "Is a cloud kitchen a lower-risk entry into hospitality?",
        answer:
          "Lower capital certainly — ₹25–60 lakh against several crore — but not lower risk. Aggregator commissions of 20–30% and discount expectations mean unit economics have to be right from day one, and the brands that work usually have a genuine kitchen advantage rather than just a delivery presence.",
      },
      {
        question: "How do you handle seasonality in the projections?",
        answer:
          "We build monthly, not annual, projections, with the low season modelled explicitly, and we test the debt service at 70% of projected occupancy. If the property cannot service its loan through a weak season, the structure changes — longer tenor, larger reserve, or a smaller phase one — before it goes to a lender.",
      },
    ],
    seo: {
      title: "Hotel & Resort Project Consultants India | Feasibility, DPR & Funding",
      description:
        "Hospitality consultants for hotels, resorts, banquet properties and cloud kitchens: market and RevPAR studies, product sizing, operating model selection, DPR and funding.",
      keywords: [
        "hotel project consultant India",
        "resort feasibility study",
        "hotel project report DPR",
        "cloud kitchen consultant India",
        "hospitality funding consultant",
      ],
    },
  },

  {
    slug: "retail-d2c",
    name: "Retail & D2C",
    eyebrow: "Industry practice",
    headline: "A second channel, built deliberately, before buyer concentration caps your value",
    summary:
      "Distribution design, franchise systems, modern trade readiness and D2C economics for manufacturers who need to own demand rather than rent it from two large buyers.",
    marketContext:
      "Manufacturers who sell only through a handful of large buyers are price-takers with capped valuations. Building a second channel — modern trade, franchise, institutional or D2C — is the most reliable way to change both, and it is an operating discipline rather than a marketing project.",
    icon: "retail",
    visual: "brand-system",
    challenges: [
      {
        title: "Buyer concentration",
        description:
          "When two buyers are most of your despatch, they set your price and your terms. Diversification is a valuation decision as much as a risk one.",
      },
      {
        title: "Channel conflict",
        description:
          "Launching D2C at the wrong price alienates the distributors who carry your volume today. Sequence and pricing architecture have to be designed together.",
      },
      {
        title: "D2C unit economics",
        description:
          "Blended CAC, shipping, returns and repeat rate decide whether D2C is a business or an expensive brand exercise. The break-even AOV is arithmetic, not optimism.",
      },
      {
        title: "Modern trade readiness",
        description:
          "Listing requires artwork compliance, barcoding, fill-rate discipline, a certified food safety system and the working capital to fund 60–90 day terms.",
      },
      {
        title: "Franchise governance",
        description:
          "A franchise system without documented SOPs, training and audits dilutes the brand faster than it grows it.",
      },
    ],
    playbook: [
      {
        title: "Channel economics model",
        description:
          "Landed contribution per unit by channel after all trade margins, freight, damages and scheme costs — so the channel decision is arithmetic rather than instinct.",
      },
      {
        title: "Pack-price architecture across channels",
        description:
          "Distinct pack sizes and price points per channel, so D2C, modern trade and general trade coexist without cannibalising each other.",
      },
      {
        title: "Distributor and franchise system",
        description:
          "Appointment criteria, territory design, ROI model for the partner, SOPs, training and an audit cadence that keeps standards intact.",
      },
      {
        title: "Modern trade entry plan",
        description:
          "Artwork and compliance readiness, barcoding, listing documentation, fill-rate discipline and the working capital plan for extended terms.",
      },
      {
        title: "D2C built on repeat, not discount",
        description:
          "Break-even AOV, contribution-positive acquisition, subscription and WhatsApp retention flows, and a reporting cadence that exposes CAC drift weekly.",
      },
    ],
    benchmarks: [
      { label: "Median CAC reduction", value: "-31%", detail: "First quarter of a structured programme" },
      { label: "Modern trade listings won", value: "38", detail: "Across 9 client brands" },
      { label: "Buyer concentration reduced", value: "70% → 38%", detail: "Median top-two share, 18 months" },
      { label: "D2C contribution positive by", value: "Month 5", detail: "Median across engagements" },
    ],
    schemes: [
      {
        name: "PMFME — Branding & Marketing",
        body: "Ministry of Food Processing Industries",
        benefit: "Support of up to 50% of branding and marketing cost for eligible groups, FPOs, SHGs and co-operatives.",
      },
      {
        name: "Market Access Initiative",
        body: "Ministry of Commerce & Industry",
        benefit: "Support for export market development, trade fair participation and buyer-seller meets.",
      },
      {
        name: "MSME Champions / ZED",
        body: "Ministry of MSME",
        benefit: "Certification subsidy and handholding that modern trade and institutional buyers increasingly ask for.",
      },
      {
        name: "State export and marketing incentives",
        body: "State industries / export promotion agency",
        benefit: "Reimbursement of certification, packaging development and trade fair costs.",
      },
    ],
    services: ["branding-marketing", "business-growth-strategy", "technology-automation", "subsidies-compliance"],
    caseStudies: ["kesar-mithai-brand-launch", "rangoli-spices-export-readiness"],
    faqs: [
      {
        question: "Will launching D2C upset our distributors?",
        answer:
          "It will, if you sell the same pack at a lower price. It will not, if D2C carries distinct pack sizes, bundles or variants at protected price points — which is why the pack-price architecture is designed before the store goes live. We usually brief the top distributors on the plan rather than letting them discover it, and that conversation goes better than founders expect.",
      },
      {
        question: "What does it take to get listed in modern trade?",
        answer:
          "Compliant artwork with correct declarations, GTIN barcodes, a certified food safety system, a fill-rate track record, agreed listing and visibility charges, and the working capital to fund 60–90 day payment terms. The listing itself is the easy part; sustaining fill rates and funding the terms is what separates brands that stay on shelf.",
      },
      {
        question: "Is a franchise model right for us?",
        answer:
          "Only if the product experience is reproducible and you are prepared to enforce standards. Franchising a food brand without documented SOPs, a training programme and a quarterly audit is a reliable way to dilute a good name. We build the governance first and the expansion plan second.",
      },
      {
        question: "How fast can D2C become profitable?",
        answer:
          "Across our engagements the median is month five to contribution positivity, with paid acquisition held at or below a break-even CAC from the start. Brands that buy growth at any CAC in months one to three usually take a year or more to recover, because the discounting also trains the wrong customer.",
      },
    ],
    seo: {
      title: "Retail, Distribution & D2C Consultants for Indian Manufacturers",
      description:
        "Channel economics, distributor and franchise systems, modern trade entry and D2C unit economics for Indian manufacturers reducing buyer concentration.",
      keywords: [
        "distribution consultant India",
        "D2C consultant India",
        "modern trade listing consultant",
        "franchise consultant India",
        "channel strategy consultant MSME",
      ],
    },
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}

export const industrySlugs = industries.map((industry) => industry.slug);
