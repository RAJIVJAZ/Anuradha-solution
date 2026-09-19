# 00 — Business blueprint

The commercial model the website is built to serve. Read this first: every
later document assumes these choices.

## 1. Positioning

**Anuradha Solutions** is a niche business advisory firm for Indian MSMEs in
manufacturing, dairy and food processing.

> Helping manufacturing and food businesses scale from ₹1 crore to ₹100 crore.
> Strategy. Funding. Factory setup. Branding.

The strategic decision behind the whole site is **narrow, not broad**. A
generic management consultancy competes with every CA firm and every ex-banker
in the district on price. A firm that has commissioned nineteen dairy plants
competes with almost nobody, can publish benchmark data no generalist has, and
can charge for judgement rather than hours.

Three differentiators, each of which costs money and is therefore credible:

| Differentiator | What it costs us | Why it wins work |
| --- | --- | --- |
| No supplier commissions, ever | A material revenue stream most Indian consultants rely on | It is the only reason a promoter can trust "build the smaller plant" |
| No equity in clients | Upside on the best engagements | We can advise against expansion |
| Published fees | Negotiating leverage | Removes the biggest friction in MSME buying |

## 2. Service architecture

Six practices, each saleable alone, each with a natural next step.

| Practice | Entry price | Typical engagement | Natural follow-on |
| --- | --- | --- | --- |
| Business & Growth Strategy | ₹2.5 L | 3-week diagnostic | Everything else |
| Project Funding & DPR | ₹55 K | DPR + CMA + sanction support | Factory setup, subsidy |
| Factory Setup & Operations | ₹1.5 L | Layout → commissioning | Technology, operations retainer |
| Branding & Marketing | ₹1.2 L | Positioning → demand engine | Growth marketing retainer |
| Technology & Automation | ₹85 K | Digital diagnostic | ERP implementation |
| Subsidies & Compliance | ₹35 K | Eligibility + filing | Funding |

The low entry prices are deliberate. A ₹35,000 eligibility report is a
loss-leader that qualifies a ₹6 lakh funding engagement, and it is genuinely
useful on its own — which is what makes the sequence work rather than feel like
a bait.

## 3. Industry focus

Seven sectors, and we publish what we turn away (see `/industries`).

**Core:** Dairy · Food processing · Sweets & bakery
**Adjacent:** Agriculture & FPOs · Healthcare projects · Hospitality · Retail & D2C

Selection test for a new sector: do we have (a) operating experience,
(b) benchmark cost data, and (c) a relationship with the relevant regulator? Two
out of three is not enough.

## 4. Legal structure

**Recommended: Private Limited Company.**

| | Private Limited | LLP |
| --- | --- | --- |
| Perceived credibility with lenders | Higher | Adequate |
| Ability to hire senior consultants on ESOPs | Yes | No |
| Compliance burden | Higher | Lower |
| Distribution of profit | Dividend (taxed twice) | Efficient |
| Suitability if raising outside capital | Yes | Poor |

For a consulting firm whose clients are applying for bank finance, the Private
Limited form matters more than its tax cost: credit officers read the consultant's
own constitution. An LLP is a legitimate alternative if the partners have no
intention of hiring at senior level with equity.

Registrations required: Incorporation and PAN/TAN, GST, Udyam (MSME),
professional tax where applicable, and a professional indemnity policy —
which is not legally required and is commercially essential the moment you sign
a DPR.

## 5. Team structure

Deliberately flat. The person who sells the work does it.

| Role | Count at launch | Utilisation target | Notes |
| --- | --- | --- | --- |
| Founder / Principal Consultant | 1 | 55% billable | Owns funding practice and all pricing |
| Partner — Growth | 1 | 65% | Diagnostics, costing |
| Partner — Operations & Technology | 1 | 70% | Most site time |
| Director — Government & Compliance | 1 | 75% | Highest volume, lowest ticket |
| Director — Brand & Demand | 1 | 70% | Often remote |
| Engagement Manager — Modelling | 1 | 80% | DPR quality gate |
| Analysts | 2 | 85% | Two-year rotation |

**Outsource at launch:** legal and IP filings, structural and MEP engineering
drawings, NABL lab testing, graphic production, web development beyond this
codebase, and out-of-state liaison. Keep in-house: anything the client is buying
our judgement on.

Capacity: 15–20 engagements a year, capped deliberately. The cap is the product.

## 6. Revenue model

Three structures, disclosed on every service page.

**Project** — ₹35,000 to ₹14 lakh. Fixed fee, fixed date. ~60% of revenue.
**Retainer** — ₹60,000 to ₹4 lakh a month, three-month minimum then 30-day exit. ~28%.
**Success fee** — 0.75–1.5% of sanction on funding, 2–4% of sanctioned subsidy. ~12%.

Never: equity, supplier commissions, lender referral fees, or an undisclosed
contingent fee.

### Indicative year-three P&L (₹ lakh)

| Line | Amount | Note |
| --- | --- | --- |
| Project fees | 420 | ~55 engagements |
| Retainers | 196 | 6–8 concurrent |
| Success fees | 84 | Lumpy by nature |
| **Revenue** | **700** | |
| Consultant cost | (322) | 46% — the number to watch |
| Travel and delivery | (56) | 8% |
| Marketing and content | (42) | 6%, mostly the insights engine |
| Technology and tools | (21) | 3% |
| Office and admin | (63) | 9% |
| **EBITDA** | **196** | 28% |

The sensitivity that matters is consultant cost as a share of revenue. Above
55% the model stops funding growth; below 40% the firm is almost certainly
under-investing in senior capability.

## 7. What the website is for

The site is a **lead-generation and authority engine**, not a brochure. It has
three jobs, in priority order:

1. **Convert** a visitor with intent into a discovery call (service pages,
   case studies, contact).
2. **Acquire** visitors with a problem but no firm in mind (insights pillars).
3. **Qualify** — filter out work we do not want, publicly and early, so partner
   time is spent on the right calls.

Success metrics, reviewed monthly:

| Metric | Target | Where measured |
| --- | --- | --- |
| Organic sessions | 8,000 / month by month 12 | GA4 |
| Engaged → enquiry | ≥ 2.5% | GA4 + `leads` table |
| Enquiry → discovery call | ≥ 40% | `lead_funnel_daily` view |
| Proposal → win | ≥ 50% | `proposals` table |
| Median first response | < 8 business hours | `leads.first_response_at` |
| Cost per engagement won | < ₹35,000 | Marketing spend ÷ wins |

## 8. Twelve-month sequence

| Phase | Months | Focus |
| --- | --- | --- |
| Foundation | 0–2 | Incorporate, this website live, four pillar guides published, HubSpot configured |
| Proof | 2–5 | Six case studies documented and approved, resource library live, first retainer signed |
| Authority | 5–9 | 40+ supporting articles, two pillar clusters ranking top 10, newsletter to 2,000 |
| Scale | 9–12 | Client portal live with real clients, two hires, referral programme formalised |

