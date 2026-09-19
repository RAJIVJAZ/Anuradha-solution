# 06 — SEO architecture

## 1. Strategy

Four pillar pages anchor four topic clusters. Each pillar is the complete answer
to a question a promoter actually types; supporting articles go deep on one
sub-question and link up. Service and industry pages carry commercial intent and
receive links from the cluster.

```
Cluster: DAIRY
  PILLAR   /insights/how-to-start-dairy-plant-india
    ├── /insights/dairy-plant-project-cost-india
    └── → /industries/dairy · /services/factory-setup-operations

Cluster: SUBSIDIES
  PILLAR   /insights/government-subsidies-food-processing
    ├── /insights/packaging-compliance-fssai-legal-metrology
    └── → /services/subsidies-compliance

Cluster: FUNDING
  PILLAR   /insights/how-to-prepare-bankable-dpr
    └── → /services/project-funding-dpr

Cluster: GROWTH
  PILLAR   /insights/msme-growth-1-crore-to-100-crore
    ├── /insights/unit-economics-food-manufacturing
    └── → /services/business-growth-strategy

Cluster: OPERATIONS
    ├── /insights/factory-automation-guide-msme
    └── /insights/erp-selection-msme-manufacturing

Cluster: BRAND
    └── /insights/branding-strategies-fmcg-india
```

At launch: 4 pillars, 6 supporting. The twelve-month plan is 100+ supporting
articles, which is what the architecture is built to absorb without becoming a
flat blog.

## 2. Keyword map

| Page | Primary target | Intent |
| --- | --- | --- |
| `/` | business consultant India MSME | Brand / navigational |
| `/services/project-funding-dpr` | DPR consultant India · detailed project report preparation | Commercial |
| `/services/factory-setup-operations` | factory setup consultant India | Commercial |
| `/services/subsidies-compliance` | subsidy consultant India · PMFME consultant | Commercial |
| `/services/business-growth-strategy` | business growth consultant India | Commercial |
| `/services/branding-marketing` | FMCG branding consultant India | Commercial |
| `/services/technology-automation` | ERP consultant India MSME | Commercial |
| `/industries/dairy` | dairy consultant India · dairy plant setup consultant | Commercial |
| `/industries/food-processing` | food processing consultant India | Commercial |
| `/insights/how-to-start-dairy-plant-india` | how to start dairy plant India | Informational, high volume |
| `/insights/government-subsidies-food-processing` | food processing subsidy India | Informational, high volume |
| `/insights/dairy-plant-project-cost-india` | dairy plant project cost | Informational, high conversion |
| `/insights/how-to-prepare-bankable-dpr` | bankable DPR preparation | Informational, high conversion |

Every target is Indian-market. No page competes for a global term, because a
₹700 lakh firm cannot win one and does not need to.

## 3. Metadata

Everything goes through `pageMetadata()` in `src/lib/seo.tsx`, so canonical URL,
OG image, title template and Twitter card can never drift between routes.

Per page it sets: title (≤ 60 chars where possible), description (150–160),
keywords, canonical, `og:*` including a generated image, `twitter:*`, and for
articles `article:published_time` / `modified_time`.

Root layout sets `metadataBase`, the `%s | Anuradha Solutions` template,
`robots` with `max-image-preview: large`, and `en_IN` locale.

`/portal` and `/admin` pass `noIndex: true`, which emits
`noindex, nofollow`, and are additionally disallowed in `robots.txt`.

## 4. Structured data

One connected `@graph` per page — Google resolves a single graph more reliably
than several disconnected blocks.

**Every page** (root layout): `ProfessionalService` (`@id` `#organisation`, with
`knowsAbout`, three `PostalAddress` entries, `sameAs`) + `WebSite` (with
`SearchAction`).

**Per page type:**

| Page | Added types |
| --- | --- |
| Service | `BreadcrumbList`, `Service` with `OfferCatalog` of engagement tiers, `FAQPage` |
| Industry | `BreadcrumbList`, `Service`, `FAQPage` |
| Case study | `BreadcrumbList`, `Article` |
| Article | `BreadcrumbList`, `Article` with `timeRequired`, `FAQPage` where present |
| Team | `BreadcrumbList`, one `Person` per consultant, linked to the org |
| Careers | `BreadcrumbList`, `JobPosting` per role with `jobLocation` |
| Contact | `BreadcrumbList`, `FAQPage` |

All nodes reference the organisation by `@id` rather than repeating it, which is
what makes it one graph.

Verified in this build: `/services/project-funding-dpr` emits
`[ProfessionalService, WebSite]` + `[BreadcrumbList, Service, FAQPage]`, both
valid JSON.

## 5. Open Graph images

`/api/og` generates 1200×630 cards from the design tokens with
`next/og`: ink background, monogram, serif headline, saffron rule, footer with
domain and sector line. Title and subtitle come from query parameters, so every
page gets a distinct, on-brand card without a design task per page.

## 6. Technical SEO

| Item | Implementation |
| --- | --- |
| Sitemap | `src/app/sitemap.ts` — 58 URLs, priority by commercial intent, `lastModified` from article dates |
| Robots | `src/app/robots.ts` — **disallows everything outside production** (`VERCEL_ENV !== "production"`), so previews never compete with production |
| Canonicals | Absolute, on every page, via `pageMetadata` |
| Trailing slashes | None, consistently |
| 404 | Custom, links six services and six recent articles |
| Redirects | Add to `next.config.ts`; slugs are treated as permanent |
| Internal links | Verified by crawl — 65 pages, zero broken |
| Images | No bitmap images at launch; all illustration is inline SVG |
| Fonts | `next/font` self-hosted, `display: swap` |
| Rendering | Fully static (SSG) for all 58 public URLs — no client-side rendering of content |

## 7. Content standards

These are the rules that make the content defensible, which is the only durable
SEO advantage a consulting firm has:

1. Every number traces to a delivered engagement or a named public source.
2. Every article carries key takeaways, so the answer is available in 20 seconds.
3. Every pillar carries an FAQ block with genuine questions, marked up as
   `FAQPage`.
4. Every benchmark article carries the "a note on the numbers" disclaimer with
   the price year — it is honest and it ages the content gracefully.
5. Publish the uncomfortable answer. "About one engagement in six concludes the
   client should not expand" is the sort of sentence competitors will not copy.

## 8. Measurement

| Metric | Tool | Target (month 12) |
| --- | --- | --- |
| Organic sessions | GA4 | 8,000 / month |
| Pillar keyword positions | Search Console | 4 pillars in top 10 |
| Enquiries by first landing page | `leads.landing_path` | Attribution on 100% |
| Engaged → enquiry | GA4 + `leads` | ≥ 2.5% |
| Core Web Vitals | Search Console | All "good" |
| Indexed pages | Search Console | 58 of 58 |

The `content_metrics_daily` table and the admin content report exist so that
"views" and "enquiries attributed to first landing page" sit side by side —
which is the only view that tells you whether an article is working
commercially rather than just being read.
