/**
 * Legal pages. Plain-language summaries of the firm's actual practice, written
 * to be read rather than to be defensible in isolation — a lawyer should review
 * these against your final entity structure before launch.
 */

export interface LegalPage {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy policy",
    updated: "2026-09-01",
    intro:
      "This policy explains what we collect through this website, why, and what we will never do with it. It applies to anuradhasolutions.in and to the enquiry and newsletter forms on it.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "From the enquiry form: your name, company, email, mobile number, city, industry, the service you are interested in, your revenue band, your timeline and anything you write in the message field.",
          "From the newsletter form: your email address and which page you subscribed from.",
          "Automatically: pages viewed, referring source, UTM parameters where present, approximate location derived from IP, and device and browser type. We use GA4 and Microsoft Clarity for this. Clarity records session replays with all form fields masked.",
          "From the assistant: which options you selected in the scripted flow, so we can see where visitors drop out. The assistant does not read anything you type elsewhere on the site.",
        ],
      },
      {
        heading: "Why we collect it",
        body: [
          "To respond to your enquiry and to decide which partner should handle it.",
          "To send the resource you asked for, and the fortnightly Growth Brief if you subscribed.",
          "To understand which pages and topics actually help people, so we write more of those.",
          "To meet our own record-keeping obligations where an engagement follows.",
        ],
      },
      {
        heading: "What we will never do",
        body: [
          "We do not sell your data. We do not share your enquiry with lenders, machinery suppliers, equipment vendors or any other third party without your explicit written consent for a specific purpose.",
          "We do not put you into an automated calling sequence.",
          "We do not use your business information in a case study, on this website or anywhere else, without written permission.",
        ],
      },
      {
        heading: "Who processes it",
        body: [
          "Our systems of record are a PostgreSQL database hosted in India or Singapore, and HubSpot CRM. Email is sent through a transactional email provider. Analytics are processed by Google and Microsoft under their own terms.",
          "Our staff and contracted associates access your data only where it is needed to respond to you or deliver an engagement. Everyone is bound by a confidentiality agreement.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Enquiries that do not become engagements: 24 months, then deleted.",
          "Newsletter subscriptions: until you unsubscribe, plus 90 days.",
          "Engagement records: as long as required by law and professional obligation, generally eight years from the end of the engagement.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Write to engage@anuradhasolutions.in and we will respond within thirty days. Deletion requests are honoured unless we are legally required to retain a record.",
          "You can unsubscribe from the Growth Brief with the link in every email. It takes effect immediately.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "We use essential cookies to make the site work, and analytics cookies from GA4 and Microsoft Clarity to understand usage. We do not run advertising or retargeting pixels on this site.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of engagement",
    updated: "2026-09-01",
    intro:
      "These terms govern use of this website. The terms governing an actual engagement are set out in the engagement letter you sign, which takes precedence over anything on this site.",
    sections: [
      {
        heading: "Nothing here is advice",
        body: [
          "The benchmarks, cost ranges, scheme summaries, templates and articles on this site are general information published in good faith. They are not financial, legal, tax, engineering or investment advice, and they do not account for your specific circumstances.",
          "Scheme rates, eligibility criteria and statutory requirements change with each policy cycle. Verify the current position before committing capital. We update this site periodically but make no guarantee that every figure is current on the day you read it.",
        ],
      },
      {
        heading: "Benchmark figures",
        body: [
          "Capital cost ranges, margin bands and timelines published here are drawn from engagements we have delivered, at the price levels stated. They are published so you can sanity-check a quotation. They are not a budget, a quotation or a commitment.",
        ],
      },
      {
        heading: "Case studies and results",
        body: [
          "Case studies describe work actually performed, with metrics agreed with the client before the engagement began and published with written permission. Where permission was limited, the client is identified only by sector and the page says so.",
          "Past results do not predict future outcomes. Every project depends on factors outside our control, including market conditions, promoter execution and regulatory decisions.",
        ],
      },
      {
        heading: "Engagements",
        body: [
          "No engagement exists until both parties sign an engagement letter. Enquiries, discovery calls and scoping notes create no obligation on either side.",
          "Fees, scope, deliverables, timelines and payment terms are set out in the engagement letter. Where a scope can be fixed, we fix the fee.",
          "We do not guarantee loan sanction, subsidy approval or any regulatory outcome. We guarantee the quality and completeness of the work we perform.",
        ],
      },
      {
        heading: "Confidentiality",
        body: [
          "Client information is confidential and covered by a mutual NDA signed before any substantive work begins. We do not disclose that a company is a client without permission.",
        ],
      },
      {
        heading: "Resources and templates",
        body: [
          "Templates and models are provided as-is for your own use. They are simplified versions of internal tools and contain indicative assumptions. You remain responsible for the decisions you make using them.",
        ],
      },
    ],
  },
  {
    slug: "disclosure",
    title: "Fee & disclosure policy",
    updated: "2026-09-01",
    intro:
      "Our independence is the only thing we actually sell, so it is worth being explicit about how we are paid and what we refuse. This page is a summary of clauses that appear in every engagement letter.",
    sections: [
      {
        heading: "We take no supplier commissions",
        body: [
          "We accept no commission, referral fee, rebate, discount or benefit of any kind from machinery suppliers, equipment vendors, printers, converters, software vendors, implementation partners, contractors or lenders.",
          "This is written into every engagement letter. If you ever have reason to believe it has been breached, write to the founder directly and we will refund the engagement fee in full.",
        ],
      },
      {
        heading: "We do not take equity in clients",
        body: [
          "A consultant holding equity cannot honestly advise a client not to expand. We are paid in fees, and nothing else.",
        ],
      },
      {
        heading: "Success fees, where they apply",
        body: [
          "On project funding work we offer an optional structure of a reduced upfront fee plus 0.75–1.5% of the sanctioned amount, payable on disbursement. On subsidy work the equivalent is 2–4% of sanctioned subsidy.",
          "Where a success fee applies it is stated in the engagement letter before work begins, with the exact percentage and the trigger event. There are no undisclosed contingent fees.",
        ],
      },
      {
        heading: "What we decline",
        body: [
          "Engagements contingent on a relationship with an official, or where expediting a file through a personal contact is the expectation.",
          "Work in sectors where we have no operating experience or benchmark data.",
          "Projects below approximately ₹40 lakh, where our fee structure does not serve the client. We will name a district resource centre instead.",
          "Any arrangement in which we would earn from a decision we also advised on.",
        ],
      },
      {
        heading: "Fee transparency",
        body: [
          "Indicative fee ranges are published on every service page. Final fees are fixed in the engagement letter before work starts. We do not bill by the hour, and there are no expenses beyond travel and statutory fees, which are billed at cost with receipts.",
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((page) => page.slug === slug);
}

export const legalSlugs = legalPages.map((page) => page.slug);
