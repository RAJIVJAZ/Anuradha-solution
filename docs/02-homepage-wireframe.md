# 02 — Homepage wireframe & section specification

Implemented in `src/app/page.tsx`. Nine bands, alternating tone so the page has
rhythm on a long scroll.

## Band sequence

```
┌──────────────────────────────────────────────────────────────┐
│ 1  HERO                                        tone: ink     │
│ ┌────────────────────────────┬─────────────────────────────┐ │
│ │ eyebrow: MSME · Mfg · …    │  ┌───────────────────────┐  │ │
│ │                            │  │ Portfolio outcome     │  │ │
│ │ H1 (display-xl)            │  │ n = 41 engagements    │  │ │
│ │ "…₹1 crore to ₹100 crore"  │  │                       │  │ │
│ │  (₹100 crore in accent)    │  │  GrowthCurve          │  │ │
│ │                            │  │  animated line chart  │  │ │
│ │ lede, 2 lines              │  │  actual vs baseline   │  │ │
│ │                            │  └───────────────────────┘  │ │
│ │ [Book a consultation] [View case studies]              │ │
│ │ ✓ 4 credential chips       │                             │ │
│ └────────────────────────────┴─────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│ 2  PROOF STRIP                                 tone: mist    │
│    4 animated counters · ₹640 Cr · 310+ · 42 · 3.1x          │
│    ── divider ──                                             │
│    Client logo marquee (CSS, pauses on hover)                │
├──────────────────────────────────────────────────────────────┤
│ 3  INDUSTRIES                                  tone: paper   │
│    Heading + lede + "All industry practices" →               │
│    7 IndustryCards, 3-up grid, icon + headline               │
├──────────────────────────────────────────────────────────────┤
│ 4  SERVICES                                    tone: mist    │
│    6 ServiceCards, 3-up grid, icon tile + summary            │
├──────────────────────────────────────────────────────────────┤
│ 5  PROCESS                                     tone: ink     │
│    6-stage ProcessTimeline, 3-up, numbered with week labels  │
├──────────────────────────────────────────────────────────────┤
│ 6  CASE STUDIES                                tone: paper   │
│    3 CaseStudyCards with the headline metric pulled out      │
├──────────────────────────────────────────────────────────────┤
│ 7  TESTIMONIALS                                tone: mist    │
│    6 quote cards, serif quote, avatar + metric               │
├──────────────────────────────────────────────────────────────┤
│ 8  INSIGHTS                                    tone: paper   │
│    3 newest ArticleCards                                     │
├──────────────────────────────────────────────────────────────┤
│ 9  CTA                                         tone: ink     │
│    Heading + body | CTAs + phone/email/response-time list    │
└──────────────────────────────────────────────────────────────┘
```

## Why this order

The sequence answers a visitor's questions in the order they actually ask them:

1. **What do you do, and for whom?** (hero)
2. **Are you real?** (proof, logos)
3. **Do you know my industry?** (industries before services — deliberate; MSME
   promoters self-identify by sector, not by consulting discipline)
4. **What would you do for me?** (services)
5. **What is it like to work with you?** (process)
6. **Has it worked?** (case studies, testimonials)
7. **Do you actually know anything?** (insights)
8. **How do I start?** (CTA)

Industries before services is the one non-obvious call. Tested reasoning: a
dairy promoter searching for help does not know whether they need "operations
consulting" or "project finance"; they know they run a dairy.

## Responsive behaviour

| Breakpoint | Hero | Card grids | Process |
| --- | --- | --- | --- |
| < 640 | Stacked, chart below copy, H1 at `display-md` | 1 column | 1 column |
| 640–1024 | Stacked, H1 at `display-lg` | 2 columns | 2 columns |
| ≥ 1024 | 6/6 split, H1 at `display-xl` | 3 columns | 3 columns |

Chart SVGs are `viewBox`-scaled with no fixed width, so they reflow without
media queries.

## Copy constraints

* H1: ≤ 12 words. One accent-coloured phrase, never two.
* Lede: ≤ 30 words, must name the four practices.
* Section headings: sentence case, no colons, ≤ 14 words.
* Every number on the page must be traceable to `src/content` and defensible.
* No superlatives without a figure attached. "India's leading" is banned.

## Performance budget

| Metric | Budget | How it is met |
| --- | --- | --- |
| LCP | < 2.0 s | Hero is text + inline SVG; no hero image, no video |
| CLS | < 0.05 | Fonts use `display: swap` with metric-compatible fallbacks; all SVGs have `viewBox` |
| Client JS on `/` | < 100 KB gzipped | Only Header, ScrollReveal, Counter and ChatWidget are client components |
| Requests above the fold | < 8 | No third-party embeds in the hero |

The hero deliberately has no bitmap image. It is the single biggest LCP lever
available and it also removes the need for a stock-photography decision that
would cheapen the page.
