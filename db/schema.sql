-- ===========================================================================
-- Anuradha Solutions — PostgreSQL schema
--
-- Apply with:  psql "$DATABASE_URL" -f db/schema.sql
-- Then seed:   psql "$DATABASE_URL" -f db/seed.sql
--
-- Conventions
--   * UUID primary keys, generated in the database.
--   * created_at / updated_at on every mutable table, maintained by trigger.
--   * Enumerated values are CHECK constraints rather than PostgreSQL enums,
--     because adding a value to an enum type requires a migration with a lock
--     and these lists change with the business.
--   * Money is stored in paise (bigint). Never floats.
--   * Soft deletes only where an audit trail is legally required; otherwise
--     rows are deleted.
-- ===========================================================================

create extension if not exists "pgcrypto";
create extension if not exists "citext";

-- ---------------------------------------------------------------------------
-- Shared trigger: keep updated_at honest.
-- ---------------------------------------------------------------------------
create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- Reference sequence for human-readable enquiry references (AS-000123).
-- ---------------------------------------------------------------------------
create sequence if not exists lead_reference_seq start 1000;

-- ===========================================================================
-- 1. Marketing & acquisition
-- ===========================================================================

create table if not exists leads (
  id                uuid primary key default gen_random_uuid(),
  reference         text not null unique
                      default 'AS-' || lpad(nextval('lead_reference_seq')::text, 6, '0'),

  name              text not null,
  company           text not null,
  email             citext not null,
  phone             text not null,
  city              text not null,
  industry          text not null,

  interest          text not null check (interest in (
                      'business-growth-strategy','project-funding-dpr',
                      'factory-setup-operations','branding-marketing',
                      'technology-automation','subsidies-compliance','not-sure')),
  revenue_band      text not null check (revenue_band in (
                      'pre-revenue','under-1-cr','1-5-cr','5-25-cr',
                      '25-100-cr','above-100-cr')),
  timeline          text not null check (timeline in (
                      'immediate','1-3-months','3-6-months','exploring')),
  message           text,

  -- Attribution, captured client-side on first render of the form.
  utm_source        text not null default 'direct',
  utm_medium        text not null default 'none',
  utm_campaign      text not null default 'none',
  landing_path      text not null default '/',
  resource_slug     text,

  -- Scoring and routing (src/lib/crm.ts).
  score             integer not null default 0 check (score between 0 and 100),
  assigned_desk     text not null default 'nurture-sequence'
                      check (assigned_desk in ('partner-desk','engagement-manager','nurture-sequence')),
  stage             text not null default 'marketing-qualified'
                      check (stage in ('marketing-qualified','qualifying','discovery-scheduled',
                                       'proposal-issued','won','lost','disqualified')),
  lost_reason       text,

  -- Sync state. Null crm_contact_id with a non-null crm_error means the row
  -- needs replaying into HubSpot.
  crm_contact_id    text,
  crm_synced_at     timestamptz,
  crm_error         text,

  first_response_at timestamptz,
  ip_address        inet,
  user_agent        text,

  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists leads_created_idx       on leads (created_at desc);
create index if not exists leads_score_idx         on leads (score desc) where stage not in ('won','lost','disqualified');
create index if not exists leads_desk_stage_idx    on leads (assigned_desk, stage);
create index if not exists leads_email_idx         on leads (email);
create index if not exists leads_resync_idx        on leads (created_at) where crm_contact_id is null;

create trigger leads_updated_at before update on leads
  for each row execute function set_updated_at();

create table if not exists newsletter_subscribers (
  id               uuid primary key default gen_random_uuid(),
  email            citext not null unique,
  source           text not null default 'site',
  confirmed        boolean not null default false,
  confirmed_at     timestamptz,
  unsubscribed_at  timestamptz,
  resubscribed_at  timestamptz,
  created_at       timestamptz not null default now()
);

create index if not exists newsletter_active_idx
  on newsletter_subscribers (created_at desc) where unsubscribed_at is null;

create table if not exists resource_downloads (
  id             uuid primary key default gen_random_uuid(),
  resource_slug  text not null,
  lead_id        uuid references leads (id) on delete set null,
  ip_address     inet,
  referrer       text,
  created_at     timestamptz not null default now()
);

create index if not exists resource_downloads_slug_idx on resource_downloads (resource_slug, created_at desc);

create table if not exists chat_events (
  id          uuid primary key default gen_random_uuid(),
  session_id  text not null,
  node        text not null,
  choice      text,
  lead_id     uuid references leads (id) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists chat_events_session_idx on chat_events (session_id, created_at);
create index if not exists chat_events_node_idx    on chat_events (node, created_at desc);

-- ===========================================================================
-- 2. People & access
-- ===========================================================================

create table if not exists users (
  id             uuid primary key default gen_random_uuid(),
  email          citext not null unique,
  name           text not null,
  role           text not null check (role in ('owner','partner','consultant','analyst','client')),
  -- Null for SSO-only accounts.
  password_hash  text,
  phone          text,
  avatar_initials text,
  is_active      boolean not null default true,
  last_login_at  timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create trigger users_updated_at before update on users
  for each row execute function set_updated_at();

create table if not exists clients (
  id              uuid primary key default gen_random_uuid(),
  company         text not null,
  legal_name      text,
  gstin           text,
  industry        text not null,
  city            text not null,
  state           text,
  website         text,
  partner_id      uuid references users (id) on delete set null,
  source_lead_id  uuid references leads (id) on delete set null,
  onboarded_on    date not null default current_date,
  is_active       boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists clients_partner_idx on clients (partner_id) where is_active;

create trigger clients_updated_at before update on clients
  for each row execute function set_updated_at();

-- A client user may hold access to more than one client entity (group
-- companies), so this is a join table rather than a column on users.
create table if not exists client_users (
  client_id   uuid not null references clients (id) on delete cascade,
  user_id     uuid not null references users (id) on delete cascade,
  access      text not null default 'viewer' check (access in ('owner','editor','viewer')),
  invited_at  timestamptz not null default now(),
  accepted_at timestamptz,
  primary key (client_id, user_id)
);

-- ===========================================================================
-- 3. Engagements
-- ===========================================================================

create table if not exists projects (
  id               uuid primary key default gen_random_uuid(),
  client_id        uuid not null references clients (id) on delete cascade,
  name             text not null,
  service_slug     text not null,
  partner_id       uuid references users (id) on delete set null,

  engagement_model text not null check (engagement_model in ('project','retainer','success-fee','hybrid')),
  -- Paise. fee_success_pct is basis points to avoid float arithmetic.
  fee_amount_paise      bigint check (fee_amount_paise >= 0),
  fee_success_bps       integer check (fee_success_bps between 0 and 10000),

  stage            text not null default 'scoping',
  health           text not null default 'on-track' check (health in ('on-track','at-risk','blocked')),
  progress         integer not null default 0 check (progress between 0 and 100),

  started_on       date not null default current_date,
  target_date      date,
  closed_on        date,

  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists projects_client_idx on projects (client_id, started_on desc);
create index if not exists projects_open_idx   on projects (health, target_date) where closed_on is null;

create trigger projects_updated_at before update on projects
  for each row execute function set_updated_at();

create table if not exists milestones (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects (id) on delete cascade,
  name         text not null,
  sequence     integer not null,
  due_on       date not null,
  status       text not null default 'upcoming' check (status in ('upcoming','active','done','slipped')),
  completed_on date,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (project_id, sequence)
);

create trigger milestones_updated_at before update on milestones
  for each row execute function set_updated_at();

create table if not exists tasks (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references projects (id) on delete cascade,
  title       text not null,
  detail      text,
  -- 'firm' tasks belong to us, 'client' tasks are what we are waiting on.
  owner_side  text not null check (owner_side in ('firm','client')),
  assignee_id uuid references users (id) on delete set null,
  due_on      date,
  status      text not null default 'open' check (status in ('open','in-progress','blocked','done','cancelled')),
  blocked_reason text,
  completed_at timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists tasks_project_idx on tasks (project_id, status);
create index if not exists tasks_due_idx     on tasks (due_on) where status in ('open','in-progress','blocked');

create trigger tasks_updated_at before update on tasks
  for each row execute function set_updated_at();

-- ===========================================================================
-- 4. Document management
-- ===========================================================================

create table if not exists documents (
  id             uuid primary key default gen_random_uuid(),
  project_id     uuid not null references projects (id) on delete cascade,
  name           text not null,
  category       text not null check (category in ('DPR','Financials','Statutory','Layout','Correspondence','Report','Other')),
  status         text not null default 'draft' check (status in ('draft','in-review','final','superseded')),
  -- Visible to the client in the portal. Internal working files are not.
  client_visible boolean not null default true,
  current_version integer not null default 1,
  created_by     uuid references users (id) on delete set null,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists documents_project_idx on documents (project_id, category);

create trigger documents_updated_at before update on documents
  for each row execute function set_updated_at();

-- Versions are append-only. A "new version" never overwrites a row, because
-- subsidy claims get audited years later and we must be able to show what was
-- submitted on a given date.
create table if not exists document_versions (
  id            uuid primary key default gen_random_uuid(),
  document_id   uuid not null references documents (id) on delete cascade,
  version       integer not null,
  label         text not null default 'v1.0',
  storage_key   text not null,
  mime_type     text not null,
  size_bytes    bigint not null check (size_bytes >= 0),
  checksum_sha256 text,
  uploaded_by   uuid references users (id) on delete set null,
  note          text,
  created_at    timestamptz not null default now(),
  unique (document_id, version)
);

create table if not exists document_access_log (
  id           uuid primary key default gen_random_uuid(),
  document_id  uuid not null references documents (id) on delete cascade,
  version_id   uuid references document_versions (id) on delete set null,
  user_id      uuid references users (id) on delete set null,
  action       text not null check (action in ('view','download','upload','delete','share')),
  ip_address   inet,
  created_at   timestamptz not null default now()
);

create index if not exists document_access_log_doc_idx on document_access_log (document_id, created_at desc);

-- ===========================================================================
-- 5. Meetings
-- ===========================================================================

create table if not exists meetings (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references projects (id) on delete cascade,
  title       text not null,
  held_on     date not null,
  location    text,
  minutes     text,
  client_visible boolean not null default true,
  created_by  uuid references users (id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger meetings_updated_at before update on meetings
  for each row execute function set_updated_at();

create table if not exists meeting_attendees (
  meeting_id uuid not null references meetings (id) on delete cascade,
  name       text not null,
  user_id    uuid references users (id) on delete set null,
  primary key (meeting_id, name)
);

create table if not exists meeting_items (
  id         uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references meetings (id) on delete cascade,
  kind       text not null check (kind in ('decision','action','risk')),
  body       text not null,
  -- Actions become tasks; this keeps the link so a minute is never orphaned.
  task_id    uuid references tasks (id) on delete set null,
  sequence   integer not null default 0
);

create index if not exists meeting_items_meeting_idx on meeting_items (meeting_id, kind, sequence);

-- ===========================================================================
-- 6. Proposals & billing
-- ===========================================================================

create table if not exists proposals (
  id              uuid primary key default gen_random_uuid(),
  reference       text not null unique,
  lead_id         uuid references leads (id) on delete set null,
  client_id       uuid references clients (id) on delete set null,
  service_slug    text not null,
  title           text not null,
  -- The generated proposal body, assembled from blocks (docs/13-*.md).
  body            jsonb not null default '{}'::jsonb,
  value_paise     bigint not null check (value_paise >= 0),
  engagement_model text not null check (engagement_model in ('project','retainer','success-fee','hybrid')),
  owner_id        uuid references users (id) on delete set null,
  status          text not null default 'draft'
                    check (status in ('draft','sent','viewed','negotiating','won','lost','expired')),
  -- Unguessable token for the client-facing view link.
  share_token     text unique,
  valid_until     date,
  sent_at         timestamptz,
  first_viewed_at timestamptz,
  decided_at      timestamptz,
  lost_reason     text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists proposals_status_idx on proposals (status, sent_at desc);

create trigger proposals_updated_at before update on proposals
  for each row execute function set_updated_at();

create table if not exists proposal_views (
  id          uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references proposals (id) on delete cascade,
  ip_address  inet,
  user_agent  text,
  seconds_on_page integer,
  created_at  timestamptz not null default now()
);

create table if not exists invoices (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null unique,
  client_id     uuid not null references clients (id) on delete restrict,
  project_id    uuid references projects (id) on delete set null,
  description   text not null,
  amount_paise  bigint not null check (amount_paise >= 0),
  gst_paise     bigint not null default 0 check (gst_paise >= 0),
  issued_on     date not null default current_date,
  due_on        date not null,
  paid_on       date,
  status        text not null default 'due' check (status in ('draft','due','paid','overdue','written-off')),
  payment_reference text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists invoices_client_idx on invoices (client_id, issued_on desc);
create index if not exists invoices_open_idx   on invoices (due_on) where status in ('due','overdue');

create trigger invoices_updated_at before update on invoices
  for each row execute function set_updated_at();

-- ===========================================================================
-- 7. Editorial (when content moves from the repo to the CMS)
-- ===========================================================================

create table if not exists content_entries (
  id            uuid primary key default gen_random_uuid(),
  kind          text not null check (kind in ('article','case-study','service','industry','resource','job')),
  slug          text not null,
  title         text not null,
  status        text not null default 'draft' check (status in ('draft','in-review','published','archived')),
  cluster       text,
  author_id     uuid references users (id) on delete set null,
  body          jsonb not null default '{}'::jsonb,
  seo           jsonb not null default '{}'::jsonb,
  published_at  timestamptz,
  updated_at    timestamptz not null default now(),
  created_at    timestamptz not null default now(),
  unique (kind, slug)
);

create index if not exists content_published_idx on content_entries (kind, published_at desc)
  where status = 'published';

create trigger content_entries_updated_at before update on content_entries
  for each row execute function set_updated_at();

-- Daily rollup written by the analytics job; powers the admin content report
-- without querying GA4 at request time.
create table if not exists content_metrics_daily (
  path          text not null,
  day           date not null,
  views         integer not null default 0,
  enquiries     integer not null default 0,
  avg_position  numeric(4,1),
  primary key (path, day)
);

-- ===========================================================================
-- 8. Audit
-- ===========================================================================

create table if not exists audit_log (
  id           bigserial primary key,
  actor_id     uuid references users (id) on delete set null,
  action       text not null,
  entity       text not null,
  entity_id    uuid,
  before       jsonb,
  after        jsonb,
  ip_address   inet,
  created_at   timestamptz not null default now()
);

create index if not exists audit_log_entity_idx on audit_log (entity, entity_id, created_at desc);
create index if not exists audit_log_actor_idx  on audit_log (actor_id, created_at desc);

-- ===========================================================================
-- 9. Reporting views
-- ===========================================================================

create or replace view lead_funnel_daily as
select
  date_trunc('day', created_at)::date                       as day,
  count(*)                                                  as enquiries,
  count(*) filter (where score >= 60)                       as partner_desk,
  count(*) filter (where stage = 'discovery-scheduled')     as calls_scheduled,
  count(*) filter (where stage = 'won')                     as won,
  round(avg(score), 1)                                      as avg_score,
  round(avg(extract(epoch from (first_response_at - created_at)) / 3600)::numeric, 1)
                                                            as avg_response_hours
from leads
group by 1
order by 1 desc;

create or replace view project_health as
select
  p.id,
  p.name,
  c.company,
  u.name                                                    as partner,
  p.stage,
  p.health,
  p.progress,
  p.target_date,
  count(t.id) filter (where t.status in ('open','in-progress','blocked'))  as open_tasks,
  count(t.id) filter (where t.status = 'blocked')                          as blocked_tasks,
  count(t.id) filter (where t.owner_side = 'client'
                        and t.status in ('open','in-progress','blocked'))  as waiting_on_client
from projects p
join clients c on c.id = p.client_id
left join users u on u.id = p.partner_id
left join tasks t on t.project_id = p.id
where p.closed_on is null
group by p.id, p.name, c.company, u.name, p.stage, p.health, p.progress, p.target_date;

create or replace view receivables as
select
  c.company,
  count(*)                                                  as open_invoices,
  sum(i.amount_paise + i.gst_paise)                         as outstanding_paise,
  min(i.due_on)                                             as oldest_due,
  count(*) filter (where i.due_on < current_date)           as overdue_count
from invoices i
join clients c on c.id = i.client_id
where i.status in ('due','overdue')
group by c.company
order by outstanding_paise desc;
