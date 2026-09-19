# Anuradha Solutions

A production-ready consulting firm website for a niche Indian business advisory
practice serving MSMEs in manufacturing, dairy, food processing, healthcare and
hospitality.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and
PostgreSQL. All 58 public pages are statically generated; there is no UI
component library, no animation library and no charting library.

```bash
npm install
npm run dev          # http://localhost:3000 — runs fully with no configuration
npm run check        # typecheck → lint → build
```

## What is here

**Marketing site** — homepage, 6 service pages, 7 industry pages, 8 case
studies, 10 insight articles across 6 topic clusters, 9 resources, team, about,
careers with 5 roles, contact, and 3 legal pages. Every page is a server
component; content is typed TypeScript in `src/content`.

**Lead funnel** — an 11-field lead form sharing one Zod schema with its API
route, lead scoring and desk routing, a HubSpot adapter, Slack notification,
attribution capture, a honeypot and an in-memory rate limiter.

**Assistant** — a 28-node scripted qualification flow served one node per
request, with per-turn analytics. Deliberately not an LLM; the reasoning is in
`docs/12-chatbot-flow.md`.

**Data visualisation** — 8 hand-authored SVG charts that animate on scroll with
no client JavaScript, via a `data-reveal` / `data-chart` contract and one
IntersectionObserver mounted in the root layout.

**Client portal and admin console** — fully designed, working UI at `/portal`
and `/admin`, rendering fixture data whose shapes match the database schema, so
layouts can be signed off before authentication is wired in.

**Database** — `db/schema.sql`: 22 tables, 3 reporting views, CHECK constraints,
partial indexes, append-only document versioning and an audit log. `db/seed.sql`
for development. `prisma/schema.prisma` mirrors it for teams preferring Prisma.

**SEO** — per-page metadata through one helper, a single JSON-LD `@graph` per
page, generated sitemap and robots (previews are disallowed from indexing), and
an OG image route built from the design tokens.

## Verified in this build

| Check | Result |
| --- | --- |
| `tsc --noEmit` | Clean |
| `eslint` | Clean |
| `next build` | 58 public URLs prerendered |
| Route smoke test | All 200; unknown paths return the custom 404 |
| Internal link crawl | 65 pages, 0 broken links |
| `db/schema.sql` on PostgreSQL 16 | Applies cleanly; 22 tables, 3 views |
| `db/seed.sql` | Applies; row counts as expected |
| Reporting views | All 3 return correct data against seeded rows |
| Prisma mirror | Validated; `migrate diff` shows no structural drift |
| `POST /api/leads` | Persists, scores, routes; `AS-001000` style reference from the DB sequence |
| Invalid submission | Per-field errors, HTTP 422 |
| Honeypot | Returns success, stores nothing |
| Rate limit | HTTP 429 with `Retry-After` |
| Newsletter / chat / resource APIs | Persist and behave as specified |
| Structured data | Valid JSON, correct types per template |
| `noindex` on `/portal`, `/admin` | Present, and disallowed in `robots.txt` |

## Documentation

Sixteen specifications in `docs/`, detailed enough for a design team and a
development team to continue without further planning.

| | Document | Covers |
| --- | --- | --- |
| 00 | Business blueprint | Positioning, legal form, team, revenue model, indicative P&L, 12-month sequence |
| 01 | Sitemap | 58 URLs, crawl priority, navigation, cross-linking rules |
| 02 | Homepage wireframe | Nine bands, section-by-section, responsive behaviour, performance budget |
| 03 | UX flows | Five journeys, interaction rules, accessibility commitments |
| 04 | Design system | Full token reference, type scale, components, Figma setup |
| 05 | Motion & data visualisation | Motion tokens, the animation contract, all 8 charts, chart design rules |
| 06 | SEO architecture | Cluster model, keyword map, metadata, structured data, measurement |
| 07 | Database schema | 22 tables explained, conventions and their reasons, views, migration path |
| 08 | Admin panel | Purpose, modules, queries, what to build before production |
| 09 | Client portal | Design thesis, modules, access policy |
| 10 | CRM integration | Scoring weights and why, routing, HubSpot mapping, setup checklist |
| 11 | Lead funnel | Conversion surfaces, form design, anti-spam, funnel targets |
| 12 | Assistant flow | All 28 nodes, copy rules, analytics, optional LLM fallback |
| 13 | Booking, proposals, DMS | Event design, proposal block model, document storage and retention |
| 14 | Content architecture | Content types, editorial standards, cadence, CMS migration |
| 15 | Implementation guide | Stack reasoning, setup, deployment, pre-launch checklist |
| 16 | Copy deck | Voice rules, every page template's copy, microcopy |

## Placeholders to replace before launch

The firm's identity data is realistic but fictional, so the site can be reviewed
as a whole. `docs/15-implementation-guide.md` lists these in full; the important
ones are `src/content/site.ts` (contact details, offices, client names, headline
figures), `src/content/team.ts`, `src/content/case-studies.ts` and
`src/content/testimonials.ts`.

Case studies and testimonials must be real and client-approved: the results
methodology published on `/case-studies` commits the firm to it.

## Licence

Proprietary. All rights reserved.
