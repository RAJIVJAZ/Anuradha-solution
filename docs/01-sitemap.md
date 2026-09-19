# 01 — Sitemap & information architecture

58 indexable URLs at launch, all generated from `src/content` and emitted into
`/sitemap.xml` by `src/app/sitemap.ts`.

## Tree

```
/                                     Homepage
│
├── /services                         Practice index + engagement models
│   ├── /business-growth-strategy
│   ├── /project-funding-dpr
│   ├── /factory-setup-operations
│   ├── /branding-marketing
│   ├── /technology-automation
│   └── /subsidies-compliance
│
├── /industries                       Sector index + what we decline
│   ├── /dairy
│   ├── /food-processing
│   ├── /sweets-bakery
│   ├── /agriculture
│   ├── /healthcare
│   ├── /hospitality
│   └── /retail-d2c
│
├── /case-studies                     Featured + grid, results methodology
│   └── /[8 engagements]
│
├── /insights                         Hub: 4 pillars, then by cluster
│   └── /[10 articles]
│
├── /resources                        Split: ungated / email-gated
│   └── /[9 resources]
│
├── /about                            Story, principles, process, offices
├── /team                             6 consultants, staffing philosophy
├── /careers                          Culture + 5 openings
│   └── /[5 roles]
├── /contact                          Lead form, offices, FAQ
│
├── /legal/privacy
├── /legal/terms
├── /legal/disclosure
│
├── /portal                           Client portal (noindex)
├── /admin                            Internal console (noindex)
│
├── /sitemap.xml
├── /robots.txt
└── /api
    ├── /leads          POST   Lead intake
    ├── /newsletter     POST   Subscribe
    ├── /chat           POST   Assistant turn
    ├── /resources/[slug] GET  Download + logging
    └── /og             GET    OG image generation
```

## Depth rule

No commercially important page is more than **two clicks from the homepage**.
Service and industry pages are reachable from the header mega-panel on every
page; case studies and insights are one click from their hub, which is itself in
the header.

## Crawl priority

Set in `src/app/sitemap.ts`, reflecting commercial intent rather than page count:

| Priority | Pages | Rationale |
| --- | --- | --- |
| 1.0 | Homepage | — |
| 0.9 | Service pages, industry pages, `/contact` | Highest conversion intent |
| 0.8 | Pillar articles, `/case-studies`, `/insights` | Acquisition and proof |
| 0.7 | Case studies, `/resources` | Supporting proof |
| 0.6 | Supporting articles, resources, `/about`, `/team` | Cluster support |
| 0.4–0.5 | Careers | Not a commercial priority |
| 0.2 | Legal | Required, not promoted |

## Navigation

**Header** — mega-panels on Services, Industries and Firm; flat links for Case
Studies and Insights. Each panel carries a heading, a blurb, two columns of
links with one-line descriptions, and a dark feature card. Phone number and a
primary CTA sit to the right at all times.

Mobile collapses to a full-height drawer with `<details>` accordions — native
disclosure, so it works before hydration.

**Footer** — four columns (Services, Industries, Firm, Resources), newsletter
capture, three office addresses, and the legal row. The footer is the safety net
for anything not in the header.

## Cross-linking rules

These are what make the topic clusters work, and they are enforced by the page
templates rather than left to authors:

1. Every **service page** links to its related industries, its related insight
   articles, and three sibling practices.
2. Every **industry page** links to the four practices that serve it, its own
   case studies, and every sibling sector.
3. Every **case study** links to the practices engaged and two further cases.
4. Every **article** links to its cluster siblings first, then the practices
   that do the work, and carries a sidebar CTA.
5. Every **resource** links to four siblings.
6. Every page ends with a `CTASection` whose copy is contextual to that page.

## URL conventions

* Lower-case, hyphenated, no trailing slash, no dates in paths.
* Nouns for sections, full question phrases for articles where that matches
  search intent (`/insights/how-to-start-dairy-plant-india`).
* `/industries/agriculture` rather than `/industries/agriculture-agri-tech` —
  shorter wins when the display name is already on the page.
* Slugs are permanent. A rename requires a 301 in `next.config.ts`, never a
  silent change, because these URLs will be cited in PDFs we do not control.
