# 07 — Database schema

Full DDL: `db/schema.sql` (22 tables, 3 views). Dev fixtures: `db/seed.sql`.
Prisma mirror for teams that prefer it: `prisma/schema.prisma`.

Both files were applied to PostgreSQL 16 during development and verified; the
seed reports its row counts on completion. The Prisma mirror was checked against
the same database with `prisma migrate diff`, which reports no structural
difference (see the header comment in `prisma/schema.prisma` for what the mirror
cannot express).

```bash
psql "$DATABASE_URL" -f db/schema.sql
psql "$DATABASE_URL" -f db/seed.sql     # development only
```

## Conventions and why

| Decision | Reason |
| --- | --- |
| UUID primary keys, `gen_random_uuid()` | IDs appear in client-facing URLs; sequential integers leak volume |
| `CHECK` constraints instead of PostgreSQL `ENUM` | Adding a value to an enum type needs a migration with a lock; these lists change with the business |
| Money as `bigint` paise | Never floats for money. `fee_success_bps` is basis points for the same reason |
| `citext` for email | Case-insensitive uniqueness without `lower()` everywhere |
| `updated_at` via a shared trigger | An application that forgets to set it cannot corrupt the audit trail |
| Append-only `document_versions` | Subsidy claims are audited years later; we must show what was submitted on a date |
| Partial indexes on open records | `where status in ('due','overdue')` keeps the hot index small |

## Domains

### 1. Marketing & acquisition

**`leads`** — the central table. Identity and enquiry fields, attribution
(`utm_source/medium/campaign`, `landing_path`, `resource_slug`), scoring and
routing (`score`, `assigned_desk`, `stage`), CRM sync state, and
`first_response_at` for the SLA metric.

`reference` is generated in the database from `lead_reference_seq` as
`AS-001000`, so the visitor always gets a quotable reference even if the
application layer is mid-deploy. The API falls back to a timestamp-derived
reference only when no database is configured.

The `leads_resync_idx` partial index (`where crm_contact_id is null`) exists so
a nightly job can find and replay leads that failed to reach HubSpot. This is
the reason persistence happens *before* the CRM call.

**`newsletter_subscribers`** — unique on email, with `unsubscribed_at` and
`resubscribed_at` rather than deletion, so a re-subscribe is auditable.

**`resource_downloads`** — one row per download, optionally linked to the lead
that unlocked it. Powers the resource performance report.

**`chat_events`** — one row per assistant turn (`session_id`, `node`, `choice`).
Indexed by node so drop-off per question is a single group-by.

### 2. People & access

**`users`** — one table for staff and client contacts, separated by `role`
(`owner`/`partner`/`consultant`/`analyst`/`client`). `password_hash` is nullable
for SSO-only accounts.

**`clients`** — the client entity, with `partner_id` and `source_lead_id` so
attribution survives from first enquiry to engagement.

**`client_users`** — a join table, not a column, because a client contact may
hold access to several group companies.

### 3. Engagements

**`projects`** — `engagement_model` (`project`/`retainer`/`success-fee`/`hybrid`),
`fee_amount_paise`, `fee_success_bps`, `health`, `progress`, dates.

**`milestones`** — unique on `(project_id, sequence)` so ordering cannot be
ambiguous. `slipped` is a distinct status from `upcoming`.

**`tasks`** — `owner_side` is `firm` or `client`. This single column is what lets
the portal show "waiting on you" versus "waiting on us", which is the portal's
main design idea.

### 4. Documents

**`documents`** holds identity and current version; **`document_versions`** is
append-only with `storage_key`, `checksum_sha256` and `size_bytes`;
**`document_access_log`** records every view, download, upload, delete and share
with user and IP.

`client_visible` on `documents` and `meetings` separates internal working files
from what appears in the portal. Default is visible — a portal that hides most
of the project is not a portal.

### 5. Meetings

**`meetings`** + **`meeting_attendees`** + **`meeting_items`**. Items are
typed `decision` / `action` / `risk`, and an action carries an optional
`task_id`, so a minute can never produce an orphaned commitment.

### 6. Proposals & billing

**`proposals`** — `body jsonb` holds the assembled block structure (doc 13),
`share_token` is the unguessable client-view link, and `first_viewed_at` is set
by the first row in **`proposal_views`**. Knowing a proposal was opened and for
how long changes the follow-up call.

**`invoices`** — amount and GST stored separately, both in paise.

### 7. Editorial

**`content_entries`** — the target when content migrates out of
`src/content` into a CMS. `kind` + `slug` unique, `body`/`seo` as JSONB matching
the TypeScript interfaces in `src/content/types.ts`.

**`content_metrics_daily`** — a `(path, day)` rollup written nightly from GA4 and
the `leads` table, so the admin content report never queries GA4 at request time.

### 8. Audit

**`audit_log`** — `bigserial`, actor, action, entity, before/after JSONB, IP.
Written for every mutation in the admin panel.

## Views

| View | Answers |
| --- | --- |
| `lead_funnel_daily` | Enquiries, partner-desk count, calls scheduled, wins, average score and average response hours, by day |
| `project_health` | Open engagements with open/blocked task counts and how many tasks are waiting on the client |
| `receivables` | Outstanding by client, in paise, with the oldest due date and overdue count |

All three were executed against seeded data during development and return
correct results.

## Migration path

The application reads `DATABASE_URL`; when it is absent every write degrades to a
no-op and the request still succeeds (`dbEnabled` in `src/lib/db.ts`). That is
deliberate: the marketing site must be deployable and reviewable before the
database exists.

For schema evolution, adopt a migration tool before the second production
change — `db/schema.sql` is a bootstrap file, not a migration history. Prisma
Migrate or Atlas both work against this schema; the Prisma mirror in
`prisma/schema.prisma` exists to make the former a one-command adoption.
