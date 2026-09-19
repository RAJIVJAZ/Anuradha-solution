# 13 — Booking, proposal generator & document management

Three operational systems that sit behind the website. The booking integration is
live; the other two are specified against the schema that already supports them.

## 1. Appointment booking

### Current implementation
`site.bookingUrl` points to a Calendly discovery event, linked from `/contact`
("Book directly in a partner's calendar") and from the mega-nav feature card.
Calendly is deliberate rather than a stopgap: a custom scheduler for six
consultants is a month of work that produces nothing a client values.

### Event design

| Event | Duration | Who | Buffer | Notice |
| --- | --- | --- | --- | --- |
| Discovery call | 45 min | Round-robin across partners by practice | 15 min after | 4 hours |
| Plant scoping call | 60 min | Operations partner | 30 min after | 1 day |
| Proposal walkthrough | 30 min | Engagement owner | 15 min | 4 hours |
| Monthly review | 60 min | Named partner | 15 min | Recurring |

Availability is capped at four discovery calls a week per partner. The capacity
cap in doc 00 is only real if the calendar enforces it.

### Booking questions
Company, city, sector, and "what are you trying to build, in two lines". The last
one lets the partner walk in prepared, which is the difference between a
discovery call and a discovery call that converts.

### Routing
Practice is chosen on the form and maps to a round-robin pool:

| Practice | Pool |
| --- | --- |
| Funding, DPR | Founder, Engagement Manager |
| Factory, operations, technology | Operations partner |
| Growth, strategy | Growth partner |
| Subsidy, compliance | Compliance director |
| Brand | Brand director |
| Not sure | Founder |

### Confirmation sequence
Immediate confirmation with a calendar file and an agenda; 24-hour reminder
asking for three years of financials if the call is about funding; 1-hour
reminder with the video link; post-call scoping note within two business days.

Calendly webhook → `leads.stage = 'discovery-scheduled'` and
`first_response_at` if not already set.

### When to build in-house
Only when round-robin routing by practice, capacity caps and portal integration
genuinely cannot be expressed in Calendly. `bookings` would then be one table
with availability derived from Google Calendar free/busy.

## 2. Proposal generator

Schema already in place: `proposals` (with `body jsonb`, `share_token`,
`valid_until`, `first_viewed_at`) and `proposal_views`.

### Purpose
A partner produces a proposal in 20 minutes instead of 2 hours, and every
proposal carries the same commercial terms — which matters more, because
inconsistent terms are how a firm ends up with an engagement it cannot deliver
profitably.

### Block model
`proposals.body` holds an ordered array of typed blocks. Each is populated from
`src/content` so a proposal cannot contradict the website.

| Block | Source | Editable |
| --- | --- | --- |
| `cover` | Client name, practice, date, reference | Title only |
| `understanding` | Written per proposal | Yes — the only block that must be |
| `scope` | `service.deliverables` for the chosen practice | Select and reorder |
| `approach` | `service.approach` | Select |
| `timeline` | Derived from deliverable timelines | Dates adjustable |
| `team` | `src/content/team.ts` | Select |
| `proof` | `src/content/case-studies.ts`, filtered by sector | Select up to 3 |
| `commercials` | `service.tiers` | Amount and milestones |
| `assumptions` | Standard library + per-proposal | Yes |
| `terms` | Fixed from `/legal/terms` and the disclosure policy | **No** |

`terms` is not editable by design. Bespoke terms per proposal is how a small firm
acquires liabilities it has not read.

### Generation flow
```
Admin → New proposal → pick lead/client → pick practice → tier
  → blocks pre-filled from src/content
  → partner writes `understanding`, selects proof, sets commercials
  → preview (client-facing render)
  → send: share_token minted, status 'sent', sent_at stamped, email dispatched
  → client opens: proposal_views row; first_viewed_at set once
  → accept: status 'won' → create client + project + milestones from the timeline
```

The final step matters: acceptance should create the engagement, not prompt
someone to re-type it.

### Client-facing view
`/proposals/[token]` — unguessable token, noindex, no login. Expires at
`valid_until`. A "Download PDF" print stylesheet rather than a generated PDF,
which keeps one source of truth for the layout.

### Read-receipt discipline
`first_viewed_at` plus `seconds_on_page` changes the follow-up. Build the "viewed,
not decided in five days" filter first; it is the single most useful thing in the
whole module.

## 3. Document management

Schema in place: `documents`, `document_versions` (append-only),
`document_access_log`.

### Principles

1. **Versions are never overwritten.** A subsidy claim is audited years later and
   we must be able to produce exactly what was submitted on a given date. A new
   version is a new row; the old `storage_key` is never touched.
2. **Every access is logged** — view, download, upload, delete, share — with user
   and IP.
3. **`client_visible` defaults to true.** Internal working files are the
   exception, not the rule. A portal showing a tenth of the project is not a
   portal.
4. **Checksums on every version.** `checksum_sha256` is what lets us assert, in
   an audit, that the file is the file.

### Storage
S3-compatible object storage, ap-south-1, private bucket. Keys:
`documents/{document_id}/v{version}`. Uploads via pre-signed PUT; downloads via
short-lived signed GET. Object metadata carries the project and client id so a
leaked key is still traceable.

### Upload pipeline
```
Client/staff requests upload → pre-signed PUT (10 min, size capped)
  → browser uploads directly to storage
  → completion callback: virus scan
  → clean: document_versions row written, current_version bumped, notify
  → infected: object deleted, uploader notified, audit_log row written
```

The version row is written **after** the scan, so an infected file never becomes
visible.

### Categories
`DPR` · `Financials` · `Statutory` · `Layout` · `Correspondence` · `Report` ·
`Other`. Deliberately short — a taxonomy nobody can hold in their head is a
taxonomy nobody uses.

### The claim evidence file
The one document set with a hard requirement. For every subsidy claim, an indexed
pack of invoices, payment proofs, installation certificates and photographs,
retained for at least eight years. It is a `Statutory` document whose versions are
never pruned by any retention job, and it is the specific reason the versions
table is append-only.

### Retention

| Class | Retention |
| --- | --- |
| Subsidy claim evidence | 8 years minimum, never auto-pruned |
| DPR and financials | 8 years from engagement close |
| Statutory approvals | Life of the asset |
| Correspondence | 3 years |
| Internal working files | 1 year after close |
| Access logs | 3 years |

### Search
Postgres full-text over document names, categories and version notes is
sufficient at this scale. Full-text extraction from PDFs is explicitly out of
scope until a client asks for it — it is a large amount of work for a firm with
eight documents per engagement.
