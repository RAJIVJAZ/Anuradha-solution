# 03 — UX flows

Five journeys the site is designed around. Each is written as the visitor's real
sequence, with the page that serves each step.

## Flow A — High-intent funding enquiry (the money flow)

```
Google: "dairy plant project report consultant"
   ↓
/insights/how-to-start-dairy-plant-india        Pillar guide, 18 min
   │  sidebar: key takeaways · "We do this work" · CTA
   ↓
/services/project-funding-dpr                   Problems → approach → fees
   │  reads published fee ranges — the main friction point removed
   ↓
/case-studies/sahyadri-dairy-expansion          Proof in their own sector
   ↓
/contact                                        Lead form, 11 fields
   ↓
POST /api/leads → score 82 → partner-desk → 4h SLA
   ↓
Calendar link by email, partner call within 1 business day
```

Design decisions that serve this flow:
* Fees are published. The single most common drop-off in consulting enquiry is
  "they wouldn't tell me the price".
* The lead form asks revenue band and timeline, because those two fields are 57
  of the 100 available lead-score points and decide routing.
* Response-time commitment ("median 5h 40m") appears under the submit button,
  which is where the anxiety actually is.

## Flow B — Problem-aware, solution-unaware

```
Google: "my factory is at full capacity"  /  a peer's recommendation
   ↓
/                                Hero names the outcome, not the service
   ↓
/industries/dairy                Sector-specific: "five things that break
   │                             dairy projects" — self-diagnosis
   ↓
Assistant nudge at 22 s          "Looking for funding, a plant, or a subsidy?"
   ↓
Assistant: growth → capacity     Answer: "most plants run 55–68% true OEE,
   │                             so a third of the capacity you need is
   │                             already paid for"
   ↓
/case-studies/veerbhadra-oee-turnaround
   ↓
/contact
```

The assistant earns its place here, not on the high-intent flow. Its job is to
reframe a capex question as a measurement question — which is a genuinely
different conversation, and one a static page struggles to start.

## Flow C — Research, not ready (the long game)

```
Google: "PMFME subsidy eligibility"
   ↓
/insights/government-subsidies-food-processing
   ↓
/resources/subsidy-eligibility-matrix      Gated: email for the model
   ↓
POST /api/leads (resourceSlug set) → score 31 → nurture-sequence
   ↓
Growth Brief, fortnightly
   ↓
[3–9 months]
   ↓
Returns directly to /contact when capex is actually approved
```

Key decision: gated-resource leads are scored **down** by 4 points and routed to
nurture, not to a partner. A content downloader who gets a partner call is a
wasted partner hour and an annoyed reader.

## Flow D — Existing client

```
/portal  (bookmarked, authenticated)
   ↓
Overview: 4 tiles — active projects, tasks with you, documents, outstanding
   ↓
Projects: milestone timeline per engagement, health badge, next milestone
   ↓
Tasks: split by owner — "with you" vs "with us", which is the whole point
   ↓
Documents · Meetings · Invoices
```

The portal's design thesis: the client should see **the same view we do**,
including tasks we owe them. Portals that only show what the client owes feel
like a collections tool.

## Flow E — Candidate

```
LinkedIn post  /  /about → /team
   ↓
/careers                        Four cultural claims, then five roles
   ↓
/careers/engagement-manager-project-finance
   ↓
mailto: with a pre-filled subject
```

Deliberate friction: applications go to email with a required paragraph about a
problem the candidate has actually solved. An application form would produce
more applications and worse ones.

## Cross-cutting interaction rules

| Situation | Behaviour |
| --- | --- |
| Assistant nudge | Once per browser session, after 22 s, never on `/contact` |
| Route change | Mega-panel and mobile drawer close in the same render pass |
| Reduced motion | All entrance animation and count-ups disabled; charts render final state |
| Form error | Inline, under the field, `aria-invalid` set, focus not stolen |
| Form success | Replaces the form in place with a reference number, never a redirect |
| 404 | Offers all six services and six recent articles, plus "report a broken link" |
| Escape key | Closes any open panel or drawer |

## Accessibility commitments

* Skip link as the first focusable element.
* Single `<h1>` per page; heading levels never skip.
* Every SVG chart has a descriptive `role="img"` + `aria-label` stating the
  actual figures, so the data is available to a screen reader — not just a
  label saying "chart".
* Colour is never the only carrier of meaning: status badges pair colour with
  text, chart series pair colour with a legend and direct labels.
* Focus ring is a 2px brand outline with 3px offset, never removed.
* Accordions and the assistant are keyboard-operable with correct
  `aria-expanded` / `aria-controls`.
* Text contrast: body text on paper is `#41505e` on `#ffffff` (8.6:1); on ink
  bands, `#d0d9e2` on `#04101c` (13.9:1).
