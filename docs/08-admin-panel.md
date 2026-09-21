# 08 — Admin panel

Route: `/admin` — noindex, and disallowed in `robots.txt`.

The screen in this build renders fixture data from `src/content/workspace.ts` so
the layout, density and states can be reviewed and signed off before
authentication and live queries are wired in. Every fixture shape matches a
table in `db/schema.sql`; swapping the import for a query is the integration.

## Purpose

One screen a partner opens each morning that answers: who enquired, who has not
been called yet, what is out for decision, and which content is actually
producing enquiries. It is deliberately not a CRM — HubSpot is the system of
record for the pipeline. This is the operational view HubSpot does not give us,
because it joins the pipeline to content performance.

## Layout

Persistent 256px sidebar (logo, area label, nav with counts, user, exit link) and
a fluid content column at `max-w-[92rem]`. Denser than the marketing site: 0.85rem
base, tighter row height, mono for all figures.

```
┌─ sidebar ─┬──────────────────────────────────────────────────┐
│ Logo      │ Week 38 · FY 2026–27                             │
│ ADMIN     │ Pipeline dashboard          [Export CSV] [New +] │
│           ├──────────────────────────────────────────────────┤
│ Dashboard │ ┌────────┬────────┬────────┬────────┐            │
│ Leads   8 │ │ New 8  │ ₹18.5L │ 43.3%  │ 5h 40m │  KPI tiles │
│ Proposals │ └────────┴────────┴────────┴────────┘            │
│ Funnel    ├──────────────────────────────────────────────────┤
│ Content   │ LEAD QUEUE — sorted by score, routed             │
│ Engagemts │ score│ref│contact│sector│band│timeline│desk│src   │
│           ├──────────────────────┬───────────────────────────┤
│ RD        │ FUNNEL (7 stages)    │ PROPOSALS (value, status) │
│ ← website ├──────────────────────┼───────────────────────────┤
│           │ CONTENT PERFORMANCE  │ LIVE ENGAGEMENTS          │
└───────────┴──────────────────────┴───────────────────────────┘
```

## Modules

### KPI tiles
New enquiries (7 days) with the count scoring 60+; open pipeline value; enquiry →
call conversion on a rolling 90 days; median first response against the 8-hour
target.

### Lead queue
Sorted by score descending, not by recency — the whole point is that a 82-score
lead from yesterday outranks a 18-score lead from an hour ago. Score is rendered
as a coloured chip (green ≥ 60, amber ≥ 35, grey below). Columns: score,
reference, contact with company and city, sector and interest, revenue band,
timeline, routed desk, source, age.

Query: `select … from leads where stage not in ('won','lost','disqualified')
order by score desc, created_at desc limit 50`, served by the
`leads_score_idx` partial index.

Row actions to build: assign, log first response (sets `first_response_at`),
change stage, disqualify with reason, open in HubSpot, create proposal.

### Acquisition funnel
Seven stages from visitors to engagements won, each with a bar scaled to the top
stage and a conversion note. Sourced from `content_metrics_daily` for the top two
stages and `lead_funnel_daily` for the rest.

### Proposals
Reference, client, practice, value, model, owner, status. Status colours are
shared with the portal via `StatusBadge`. `first_viewed_at` from `proposal_views`
is what makes the follow-up call informed — build a "viewed, not decided in 5
days" filter early.

### Content performance
Path, views, attributed enquiries, average Search Console position, with a bar
for relative views. The join of views to enquiries is the point: an article with
4,820 views and 19 enquiries is working; one with 3,000 views and 0 is not, and
that is invisible in GA4 alone.

### Live engagements
Reads the `project_health` view. Health badge, progress bar, partner. Amber when
a task has been waiting on the client for more than 14 days.

## To build before production

| Area | Requirement |
| --- | --- |
| Authentication | Supabase Auth — see docs/17-supabase-auth.md. Google Workspace OAuth with an email-domain allowlist is the natural provider choice for staff; `src/lib/supabase.ts` verifies the resulting JWT server-side |
| Authorisation | `users.role` drives access. `owner`/`partner` see everything; `consultant`/`analyst` see their own engagements and the full lead queue; `client` role is rejected here outright |
| Audit | Every mutation writes to `audit_log` with actor, before and after |
| PII | Lead email and phone masked for `analyst` role until a lead is assigned to them |
| Rate limiting | Export endpoints capped; CSV export writes an audit row |
| Nightly jobs | GA4 → `content_metrics_daily`; HubSpot replay for `crm_contact_id is null`; invoice status transition `due` → `overdue` |
| Alerts | Slack when a 60+ lead is unactioned for 4 business hours |

## What this panel deliberately does not do

* It is not a CRM. Deal notes, email threads and sequences stay in HubSpot.
* It is not an accounting system. Invoices are tracked here and raised in Tally.
* It has no bulk email. A firm of six sending bulk mail from its own admin panel
  is how domains get blocked.
