# 15 — Implementation & deployment guide

## Stack

| Layer | Choice | Version | Why |
| --- | --- | --- | --- |
| Framework | Next.js App Router | 16.3 | Static generation for all public pages, route handlers for the four APIs |
| UI | React | 19.2 | — |
| Language | TypeScript, strict | 5.x | Content contracts are enforced at build time |
| Styling | Tailwind CSS | 4.x | `@theme` tokens are the design system's source of truth |
| Validation | Zod | 4.x | One schema shared by client and server |
| Database | PostgreSQL | 16 | `pg` directly; Prisma mirror available |
| Auth | `@supabase/server` | 1.x | User verification for API routes — see docs/17. Optional; needs Node ≥ 22 |
| Fonts | `next/font` | — | Self-hosted Source Serif 4, Inter, JetBrains Mono |
| Charts | Hand-authored SVG | — | No charting library; eight fixed charts, not arbitrary data |
| Hosting | Vercel | — | ap-south-1 for the functions |

**No UI component library, no animation library, no charting library.** Each was
considered and rejected: the component surface is small enough to own, the motion
system is 40 lines of CSS plus one observer, and a chart library would cost
40–120 KB for eight charts we draw once.

## Local setup

```bash
npm install
cp .env.example .env.local        # every value is optional
npm run dev                        # http://localhost:3000
```

The site runs fully with no environment configuration. Forms validate and respond;
database and CRM writes become no-ops. That is deliberate — the marketing site
must be reviewable before any infrastructure exists.

With a database:

```bash
createdb anuradha
psql "postgresql://localhost/anuradha" -f db/schema.sql
psql "postgresql://localhost/anuradha" -f db/seed.sql
# then set DATABASE_URL in .env.local
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run check` | typecheck → lint → build. Run before every push |

## Project layout

```
src/
  app/
    layout.tsx            Fonts, metadata, org JSON-LD, Header/Footer/Chat/Reveal
    page.tsx              Homepage — 9 bands
    globals.css           Design tokens, motion primitives, utilities
    sitemap.ts robots.ts  Generated from content
    not-found.tsx         404 with services + recent articles
    services/  industries/  case-studies/  insights/  resources/  careers/
    about/  team/  contact/  legal/[slug]/
    portal/  admin/       Authenticated-area UI (noindex)
    api/
      leads/  newsletter/  chat/  resources/[slug]/  og/
  components/
    site/    Header, Footer, Logo, PageHero, CTASection, Cards, ArticleBody, …
    ui/      Button, Container, Card, Text, Icon, Accordion
    viz/     8 charts + Counter + Visual dispatcher
    forms/   LeadForm, NewsletterForm, Field primitives
    chat/    ChatWidget
    app/     Shell for portal and admin
    motion/  ScrollReveal — one observer for the whole document
  content/   Typed content modules (see doc 14)
  lib/       seo.tsx, crm.ts, db.ts, validation.ts, chatFlow.ts, rateLimit.ts, utils.ts
db/          schema.sql, seed.sql
prisma/      schema.prisma (mirror)
docs/        This documentation set
```

## Server / client boundary

Only five client components exist:

| Component | Why it must be client |
| --- | --- |
| `Header` | Mega-panel state, scroll state, mobile drawer |
| `ScrollReveal` | IntersectionObserver — mounted once in the root layout |
| `Counter` | requestAnimationFrame count-up |
| `LeadForm` / `NewsletterForm` | Form state and submission |
| `ChatWidget` | Conversation state |
| `Accordion` | Disclosure state |

Everything else — every page, every chart, every card — is a server component.
This is why the charts animate with no JavaScript: the `data-reveal` /
`data-chart` contract in doc 05 lets a server component opt into motion
declaratively.

## Deployment to Vercel

1. Import the repository; framework is detected automatically.
2. Set the region to **ap-south-1 (Mumbai)** — almost all users and the database
   are in India.
3. Set environment variables per environment:

| Variable | Production | Preview |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://www.anuradhasolutions.in` | Leave unset |
| `DATABASE_URL` | Production Postgres | A separate preview database, never production |
| `HUBSPOT_PRIVATE_APP_TOKEN` | Set | Leave unset |
| `SLACK_LEADS_WEBHOOK_URL` | Set | Leave unset |
| `RESOURCE_ASSET_BASE_URL` | CDN base | Optional |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Set | Leave unset |
| `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` / `SUPABASE_JWKS_URL` | Set — see docs/17 | Separate project, never production's |
| `SUPABASE_SECRET_KEY` | Set only if something uses `ctx.supabaseAdmin` | Leave unset |

Also set the project's **Node.js Version to 22.x** (Project Settings → General)
— `@supabase/server` requires Node ≥ 22, stricter than Next.js's own ≥20.9.0.

`robots.ts` disallows all crawling unless `VERCEL_ENV === "production"`, so
previews cannot compete with production in search. Leaving CRM and analytics keys
unset on preview means test submissions never reach the real pipeline.

4. Point the apex domain and `www` at Vercel; redirect apex → `www` (or the
   reverse) and pick one canonically. `metadataBase` must match.
5. First deploy, then submit `/sitemap.xml` in Search Console.

## Pre-launch checklist

**Build and quality**
- [x] `npm run typecheck` clean
- [x] `npm run lint` clean
- [x] `npm run build` succeeds; all 58 public URLs prerender
- [x] All routes return 200; unknown routes return the custom 404
- [x] Internal link crawl — 65 pages, zero broken links
- [ ] Lighthouse ≥ 95 on performance and accessibility, run against production
- [ ] Manual keyboard pass: skip link, nav, accordions, forms, assistant
- [ ] Screen-reader pass on the homepage and one service page

**Data and integrations**
- [x] `db/schema.sql` applies cleanly to PostgreSQL 16 (22 tables, 3 views)
- [x] `db/seed.sql` applies and reports expected row counts
- [x] Prisma mirror validated and diffed against the live schema
- [x] `POST /api/leads` persists, scores and routes correctly
- [x] Invalid submissions return per-field errors
- [x] Honeypot returns success and stores nothing
- [x] Rate limit returns 429 with `Retry-After`
- [x] Newsletter and chat endpoints persist
- [ ] HubSpot custom properties created with matching internal values
- [ ] Slack `#leads` webhook live and tested
- [ ] Resource files uploaded; `RESOURCE_ASSET_BASE_URL` set

**SEO**
- [x] `/sitemap.xml` — 58 URLs, no private routes
- [x] `robots.txt` correct, previews disallowed
- [x] JSON-LD valid on every template
- [x] `noindex` on `/portal` and `/admin`
- [x] OG image route renders
- [ ] Search Console and Bing Webmaster verified
- [ ] GA4 and Clarity installed with IP anonymisation

**Content and legal**
- [ ] All eight case studies approved in writing by the client
- [ ] Every published benchmark re-checked against source engagements
- [ ] Legal pages reviewed by a lawyer against the final entity structure
- [ ] Professional indemnity policy in force before the first DPR is signed
- [ ] Placeholder identity replaced: phone, email, GSTIN, office addresses,
      social URLs, Calendly link, client names in `clientLogos`

## Known placeholders

This build ships with realistic but fictional firm data so the site can be
reviewed as a whole. Replace before launch:

* `src/content/site.ts` — phone, emails, addresses, social URLs, booking URL,
  `clientLogos`, and the four `proof` figures.
* `src/content/team.ts` — six consultant profiles.
* `src/content/case-studies.ts` — eight engagements. These must be real and
  client-approved; the results methodology on `/case-studies` commits us to it.
* `src/content/testimonials.ts` — six quotes, permission required.
* Benchmark figures throughout `industries.ts` and `insights.ts`.

## Post-launch operations

| Cadence | Task |
| --- | --- |
| Daily | Lead queue triaged; 60+ leads actioned within 4 business hours |
| Weekly | New article published; Search Console errors reviewed |
| Fortnightly | Growth Brief sent |
| Monthly | Funnel review against doc 11 targets; content report; Core Web Vitals |
| Quarterly | Benchmark figures re-verified against delivered engagements; case study added; dependency updates; access review |
| Annually | Legal pages reviewed; retention policy applied; design system audit |

## Performance budget

| Metric | Budget | How it is achieved |
| --- | --- | --- |
| LCP | < 2.0 s | Hero is text + inline SVG; no bitmap images anywhere |
| CLS | < 0.05 | `display: swap` with metric fallbacks; every SVG has a `viewBox` |
| INP | < 200 ms | Five client components; no long tasks on load |
| JS on `/` | < 100 KB gzipped | No UI, animation or charting library |
| Public pages rendered | Static | All 58 prerendered at build |
