# 09 — Client portal

Route: `/portal` — noindex, and disallowed in `robots.txt`.

As with the admin panel, this build renders fixture data from
`src/content/workspace.ts` against the real layout so it can be signed off
before authentication lands. Shapes match `db/schema.sql`.

## Design thesis

**The client sees the same view we do, including what we owe them.**

Most professional-services portals are collection tools: they show the client
what the client owes, and hide everything else. That produces a portal nobody
logs into. This one shows project health honestly — including an `at-risk` badge
on our own subsidy claim — and splits tasks by owner so "waiting on you" and
"waiting on us" sit side by side.

An at-risk badge visible to the client is a deliberate, uncomfortable choice. It
is also the reason the portal gets opened, and it forces the monthly review to be
a real conversation.

## Layout

```
┌─ sidebar ─┬────────────────────────────────────────────────────┐
│ Logo      │ ⚠ demonstration-data notice                        │
│ PORTAL    │ Client since 11 Mar 2024                           │
│           │ Sahyadri Dairy Pvt Ltd     [Message] [Upload doc]  │
│ Overview  ├────────────────────────────────────────────────────┤
│ Projects 3│ ┌────────┬────────┬────────┬────────┐              │
│ Tasks   4 │ │ 3 proj │ 2 with │ 8 docs │ ₹7.1L  │              │
│ Documents │ │ 58% avg│ you    │ 2 rev. │ 1 late │              │
│ Meetings  │ └────────┴────────┴────────┴────────┘              │
│ Invoices  ├────────────────────────────────────────────────────┤
│           │ PROJECT PANELS ×3 — meta + progress | milestone    │
│ MP        │   timeline with done/active/upcoming nodes         │
│ ← website ├───────────────────────────────┬────────────────────┤
│           │ OPEN TASKS (owner split)      │ PLANT PERFORMANCE  │
│           ├───────────────────────────────┴────────────────────┤
│           │ DOCUMENT ROOM (7-column table, versions, status)   │
│           ├─────────────────────────┬──────────────────────────┤
│           │ MEETING NOTES           │ INVOICES                 │
│           │  decisions | actions    │                          │
└───────────┴─────────────────────────┴──────────────────────────┘
```

## Modules

### Summary tiles
Active projects with average completion; tasks with the client and the next due
date; document count with how many are in review; outstanding amount with the
overdue count. Four numbers that tell the client whether they need to do
anything today.

### Projects
One panel per engagement. Left column: practice, partner, stage, dates, a
milestone progress bar and the next milestone in a tinted strip. Right column:
the full milestone timeline with connected nodes — done (filled, tick), active
(ringed), upcoming (grey).

Reads `projects` + `milestones`, filtered to the client's `client_users` rows.

### Tasks
Every task for the client's projects, with a checkbox affordance, project and
assignee, status badge and due date. The panel header states the split: "2 with
you · 2 with us". Completed tasks stay visible, struck through, because a client
seeing what was finished is the point of a status view.

Reads `tasks` via `owner_side`.

### Plant performance
A `CapacityGauge` showing weighted commissioning readiness, with a component
breakdown beneath. Contextual: this panel changes by engagement type — a funding
engagement shows sanction progress, a brand engagement shows launch readiness.

### Document room
Seven columns: document, category, version, uploaded by, date, size, status.
Filtered to `documents.client_visible = true`, so internal working files never
appear. Versions come from the append-only `document_versions` table, and every
view or download writes to `document_access_log`.

### Meeting notes
Per meeting: title, date, attendees, then decisions and actions in two columns.
Reads `meetings` + `meeting_attendees` + `meeting_items`, filtered on
`client_visible`. Actions carry a `task_id`, so a minute cannot produce a
commitment nobody tracks.

### Invoices
Reference, description, due date, amount and status, with the outstanding total
in the panel header. Overdue is shown plainly rather than softened.

## To build before production

| Area | Requirement |
| --- | --- |
| Authentication | Magic-link email sign-in; no client passwords to reset or leak |
| Authorisation | Access via `client_users`; a user may hold several client entities and switches between them |
| Multi-entity | Entity switcher in the sidebar when `client_users` returns more than one row |
| Uploads | Pre-signed S3-compatible URLs; virus scan before the file becomes visible; `document_versions` row written on completion |
| Downloads | Short-lived signed URLs; every access logged |
| Notifications | Email on: new document, new task assigned to the client, meeting notes published, invoice issued. Weekly digest, opt-out per type |
| Task completion | Client can mark their own tasks done; we confirm. Never let a client close our task |
| Messaging | Threaded per project, mirrored into the partner's email so nothing is missed |
| Retention | Portal access continues for 12 months after engagement close, read-only |

## Access policy

Issued per client at engagement kick-off. One `owner` contact who can invite
colleagues as `editor` or `viewer`. Access is revoked 12 months after close,
with documents downloadable throughout that period — because a client who has
lost their DPR two years later will ask us for it, and the audit-ready evidence
file is exactly what they need.
