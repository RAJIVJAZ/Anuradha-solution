# 14 — Content architecture

## Where content lives now

`src/content/*.ts` — typed TypeScript modules, contracts in `types.ts`.

This is a deliberate choice for launch, not an absence of a CMS:

* **Type safety.** A missing FAQ answer or a mistyped `visual` name is a build
  failure, not a broken page in production.
* **Review through pull requests.** A benchmark number changing should be
  reviewed by the partner who owns it, with a diff.
* **Fully static output.** All 58 public URLs prerender; no request-time content
  fetch, no CMS outage that takes the site down.
* **Zero cost and zero latency** until the editorial volume justifies otherwise.

## Content types

| Type | File | Count | Route |
| --- | --- | --- | --- |
| Service | `services.ts` | 6 | `/services/[slug]` |
| Industry | `industries.ts` | 7 | `/industries/[slug]` |
| Case study | `case-studies.ts` | 8 | `/case-studies/[slug]` |
| Article | `insights.ts` | 10 | `/insights/[slug]` |
| Resource | `resources.ts` | 9 | `/resources/[slug]` |
| Team member | `team.ts` | 6 | `/team` |
| Job opening | `careers.ts` | 5 | `/careers/[slug]` |
| Testimonial | `testimonials.ts` | 6 | Homepage |
| Legal page | `legal.ts` | 3 | `/legal/[slug]` |
| Site config | `site.ts` | — | Global |
| Workspace fixtures | `workspace.ts` | — | Portal, admin |

Every entry carries its own `seo: { title, description, keywords }`, so metadata
is authored next to the copy it describes and cannot drift.

## Service page structure

```
eyebrow · headline · summary · promise · icon · visual
problems[]            5 first-person symptoms — "you are here because"
approach[]            4–5 numbered steps with the uncomfortable parts kept
deliverables[]        title, description, week it lands
outcomes[]            3 medians with their basis stated
tiers[]               3 engagement models with published price ranges
industries[]          Cross-links
faqs[]                4 questions including the awkward ones
relatedInsights[]     3 article slugs
```

The `problems[]` array is the most important field. It is written in the
promoter's own words ("Your file has been 'under process' at the branch for five
months") because recognition beats description.

## Industry page structure

```
marketContext         One honest paragraph — opportunity AND trap
challenges[]          5 specific failure modes we have been called to fix
playbook[]            5 steps, sector-specific
benchmarks[]          4 figures with basis and price year
schemes[]             Name, administering body, indicative benefit
services[] caseStudies[] faqs[]
```

## Case study structure

Challenge → context → approach → measured result. The rules that make them
credible, published on `/case-studies`:

1. Metrics agreed **before** work started, written into the engagement letter.
2. Every result states its baseline (`5% → 24%`, never "improved margins").
3. Client-verified in writing; `anonymised: true` where permission was limited,
   and the page says so.
4. Engagements where we recommended **less** are published. Four of eight are.

`headlineResult` is separated from `results[]` so the card and hero can lead with
one number.

## Article structure

```
type: "pillar" | "supporting"
cluster               Dairy | Subsidies | Funding | Growth | Operations | Brand
keyTakeaways[]        3–5 — the answer in 20 seconds
sections[]            heading + body[] | bullets[] | numbered[] | quote | table
faqs[]                Marked up as FAQPage
```

`sections[]` uses a **fixed block vocabulary** (`ArticleBody.tsx`): paragraphs,
bullets, numbered steps, one pull-quote style, one table style. An editorial
system with unlimited block types produces inconsistent pages; five blocks
produce a house style.

## Editorial standards

1. Every number traces to a delivered engagement or a named public source.
2. Benchmarks state their price year; every benchmark article carries the "a note
   on the numbers" disclaimer.
3. Publish the uncomfortable answer. It is not copyable by competitors.
4. Indian English, Indian numbering (₹, lakh, crore, `12,34,567`).
5. No superlatives without a figure. "India's leading" is banned.
6. Scheme details always carry "verify the current position" — policy changes
   each cycle and an unqualified claim ages into a liability.

## Publishing cadence

| Quarter | Pillars | Supporting | Case studies |
| --- | --- | --- | --- |
| Q1 | 4 (done) | 6 (done) | 8 (done) |
| Q2 | 2 | 14 | 3 |
| Q3 | 1 | 18 | 3 |
| Q4 | 1 | 20 | 3 |

Target by month 12: 8 pillars, 58 supporting, 17 case studies. Each cluster
should reach 6–10 supporting articles before a new cluster is opened — a cluster
with two articles has no internal link equity to distribute.

## Migration to Sanity CMS

Trigger: when non-technical staff need to publish without a pull request, or when
article count passes roughly 60.

The interfaces in `src/content/types.ts` become the Sanity schema types directly,
and `content_entries` in `db/schema.sql` is the alternative target for a
self-hosted route. Because pages only ever read through `getService()`,
`getArticle()` and the other accessors, **the page components do not change** —
only the bodies of those functions.

Migration order:
1. Articles — highest volume, lowest coupling.
2. Case studies — needs an approval workflow for client sign-off.
3. Resources.
4. Services and industries **last**, or preferably never. These are commercial
   positioning documents that should go through partner review, and a pull
   request is the right friction.

Keep `site.ts` in code permanently. Navigation structure is an engineering
concern.

## Localisation

Not at launch. When it comes, Marathi and Gujarati first — the two states where
we work directly — and only for the four pillar guides and the six service pages,
not the whole site. `en-IN` is already set on `<html>` and in all metadata, and
the `Seo` interface is per-entry, so adding a locale dimension is additive.
