# 10 — CRM integration

Implementation: `src/lib/crm.ts`, called from `src/app/api/leads/route.ts`.

## Architecture

```
Browser                Next.js route            Postgres        HubSpot      Slack
   │  POST /api/leads       │                        │              │          │
   ├───────────────────────►│                        │              │          │
   │                   rate limit (6/10min/IP)       │              │          │
   │                   zod validate                  │              │          │
   │                   honeypot check                │              │          │
   │                   score + route                 │              │          │
   │                        ├── insert lead ────────►│              │          │
   │                        │◄── id, reference ──────┤              │          │
   │                        ├── upsert contact ──────────────────► │          │
   │                        ├── notify ─────────────────────────────────────►  │
   │◄── {ok, reference} ────┤                        │              │          │
```

**Order is the design.** Persistence is the only step allowed to fail the
request. A lead in Postgres can always be replayed into HubSpot; a lead that only
reached HubSpot and was lost in transit cannot be recovered. The
`leads_resync_idx` partial index (`where crm_contact_id is null`) exists exactly
so a nightly job can find those rows.

CRM and Slack calls run in `Promise.all` with 8s and 5s timeouts. Both failures
are logged and swallowed — a HubSpot outage must never cost us an enquiry.

## Lead scoring

Base 20, capped 0–100. The weights come from our own win-rate data, not from a
HubSpot template.

| Factor | Points |
| --- | --- |
| Revenue: pre-revenue / under ₹1 Cr | 0 / 5 |
| Revenue: ₹1–5 Cr / ₹5–25 Cr | 18 / 28 |
| Revenue: ₹25–100 Cr / above ₹100 Cr | 32 / 24 |
| Timeline: immediate / 1–3 months | 25 / 18 |
| Timeline: 3–6 months / exploring | 8 / 0 |
| Interest is funding or factory setup | +12 |
| Interest is "not sure" | −6 |
| Message longer than 180 characters | +6 |
| Arrived via a gated resource | −4 |

Two non-obvious weights:

* **Above ₹100 Cr scores lower than ₹25–100 Cr (24 vs 32).** Businesses that size
  usually have in-house capability or a Big Four relationship; our win rate there
  is materially worse, and a partner hour is better spent on the band below.
* **A gated-resource lead loses 4 points.** Downloaders convert on a 3–9 month
  horizon. Routing them to a partner wastes the partner's time and annoys a reader
  who only wanted a spreadsheet.

## Routing

| Score | Desk | SLA | HubSpot stage |
| --- | --- | --- | --- |
| ≥ 60 | `partner-desk` | 4 business hours | `discovery-scheduled` / SQL |
| 35–59 | `engagement-manager` | 1 business day | `qualifying` / SQL |
| < 35 | `nurture-sequence` | 3 business days | `marketing-qualified` / MQL |

## HubSpot mapping

Upsert against `crm/v3/objects/contacts`. A 409 is treated as "exists": the id is
extracted from the conflict body and the record is PATCHed. This avoids a
search-then-write round trip and the race that comes with it.

| HubSpot property | Source |
| --- | --- |
| `email`, `firstname`, `lastname`, `phone`, `company`, `city` | Form fields |
| `industry_segment` | `lead.industry` |
| `service_interest` | `lead.interest` |
| `revenue_band` | `lead.revenue` |
| `engagement_timeline` | `lead.timeline` |
| `lead_score` | Computed |
| `assigned_desk` | Computed route |
| `lifecyclestage` | MQL below 35, SQL at or above |
| `hs_lead_status` | `NEW` |
| `utm_source` / `utm_medium` / `utm_campaign` | Client-captured attribution |
| `first_landing_page` | `lead.landingPath` |
| `gated_resource` | `lead.resourceSlug` |
| `enquiry_notes` | `lead.message` |

Create these as custom properties in HubSpot before go-live. The five
enumerations must use the same internal values as the Zod enums in
`src/lib/validation.ts` and the CHECK constraints in `db/schema.sql`, or
reporting will silently split across spellings.

## Attribution capture

`LeadForm` reads attribution **once, on mount**, into a ref — before any
client-side navigation rewrites the URL or the referrer is lost. It takes
`utm_source` from the query string, falls back to the referrer hostname
(`internal` for same-origin), and records the landing pathname.

## Setup checklist

1. Create a HubSpot private app with `crm.objects.contacts` read and write.
2. Set `HUBSPOT_PRIVATE_APP_TOKEN`.
3. Create the 14 custom properties above, matching internal values exactly.
4. Create a Slack incoming webhook for `#leads`; set `SLACK_LEADS_WEBHOOK_URL`.
5. Create three HubSpot views: partner desk unactioned, engagement-manager queue,
   nurture.
6. Create the nurture sequence — the fortnightly Growth Brief, not a sales drip.
7. Build the nightly replay job over `leads_resync_idx`.
8. Add a workflow that writes `first_response_at` back when the first email or
   call is logged, so the SLA metric reflects reality rather than intention.

## Local and preview behaviour

With no `HUBSPOT_PRIVATE_APP_TOKEN`, `upsertHubspotContact` returns
`{ ok: true, skipped: true }` and the request succeeds. With no
`SLACK_LEADS_WEBHOOK_URL`, `notifyTeam` returns immediately. With no
`DATABASE_URL`, `insertLead` returns null and the route falls back to a
timestamp-derived reference. The form is therefore fully testable with zero
configuration — which is how it was verified in this build.
