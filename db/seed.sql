-- ===========================================================================
-- Anuradha Solutions — development seed
--
-- Apply after db/schema.sql:
--   psql "$DATABASE_URL" -f db/seed.sql
--
-- Mirrors src/content/workspace.ts so the portal and admin screens show the
-- same data whether they are reading fixtures or the database. Safe to re-run:
-- it truncates the tables it owns first.
-- ===========================================================================

begin;

truncate table
  audit_log, document_access_log, document_versions, documents,
  meeting_items, meeting_attendees, meetings,
  proposal_views, proposals, invoices,
  tasks, milestones, projects,
  client_users, clients,
  chat_events, resource_downloads, newsletter_subscribers, leads,
  content_metrics_daily, content_entries, users
restart identity cascade;

-- ---------------------------------------------------------------------------
-- Users
-- ---------------------------------------------------------------------------
insert into users (id, email, name, role, avatar_initials, phone) values
  ('11111111-1111-4111-8111-111111111101', 'rajiv@anuradhasolutions.in',  'Rajiv Deshpande', 'owner',      'RD', '+919876543211'),
  ('11111111-1111-4111-8111-111111111102', 'anita@anuradhasolutions.in',  'Anita Kulkarni',  'partner',    'AK', '+919876543212'),
  ('11111111-1111-4111-8111-111111111103', 'sameer@anuradhasolutions.in', 'Sameer Joshi',    'partner',    'SJ', '+919876543213'),
  ('11111111-1111-4111-8111-111111111104', 'priya@anuradhasolutions.in',  'Priya Nair',      'consultant', 'PN', '+919876543214'),
  ('11111111-1111-4111-8111-111111111105', 'meera@anuradhasolutions.in',  'Meera Raghavan',  'consultant', 'MR', '+919876543215'),
  ('11111111-1111-4111-8111-111111111106', 'vikram@anuradhasolutions.in', 'Vikram Shetty',   'analyst',    'VS', '+919876543216'),
  ('11111111-1111-4111-8111-111111111107', 'mahesh@sahyadridairy.in',     'Mahesh Patil',    'client',     'MP', '+919812345678');

-- ---------------------------------------------------------------------------
-- Leads (the admin lead queue)
-- ---------------------------------------------------------------------------
insert into leads (reference, name, company, email, phone, city, industry, interest,
                   revenue_band, timeline, message, utm_source, utm_medium, landing_path,
                   score, assigned_desk, stage, created_at, first_response_at)
values
  ('AS-8K2QF1','Girish Kulkarni','Nandini Cold Chain','girish@nandinicoldchain.in','+919845012301','Belagavi','Dairy','project-funding-dpr','5-25-cr','immediate',
   'Applied twice for the PMKSY cold chain grant and withdrew both times. Need a project configuration that will actually survive appraisal.',
   'google','organic','/insights/dairy-plant-project-cost-india', 82,'partner-desk','discovery-scheduled', now() - interval '1 day', now() - interval '21 hours'),

  ('AS-8K1M7P','Fatima Sheikh','Zaiqa Foods','fatima@zaiqafoods.in','+919845012302','Hyderabad','Food processing','factory-setup-operations','1-5-cr','1-3-months',
   'Planning a 1 TPH RTE line. Two machinery suppliers have quoted and the designs are completely different.',
   'google','organic','/services/factory-setup-operations', 58,'engagement-manager','qualifying', now() - interval '1 day', now() - interval '18 hours'),

  ('AS-8JZ4RR','Harpreet Singh','Malwa Agro FPO','harpreet@malwaagro.in','+919845012303','Bathinda','Agriculture / FPO','subsidies-compliance','under-1-cr','3-6-months',
   'Downloaded the eligibility matrix. We have 900 members and no infrastructure yet.',
   'direct','none','/resources/subsidy-eligibility-matrix', 31,'nurture-sequence','marketing-qualified', now() - interval '2 days', now() - interval '2 days' + interval '6 hours'),

  ('AS-8JY9TC','Ravindra Shetty','Konkan Resorts LLP','ravindra@konkanresorts.in','+919845012304','Ratnagiri','Hospitality','business-growth-strategy','5-25-cr','immediate',
   'Occupancy stuck at 46% and we are discounting harder every season. Referred by Coastal Stay.',
   'referral','referral','/case-studies/coastal-stay-resort-turnaround', 71,'partner-desk','discovery-scheduled', now() - interval '2 days', now() - interval '2 days' + interval '3 hours'),

  ('AS-8JX2LK','Neelam Agarwal','Shree Namkeen','neelam@shreenamkeen.in','+919845012305','Indore','Sweets & bakery','branding-marketing','1-5-cr','1-3-months',
   'Modern trade rejected our listing on artwork. Need to understand what went wrong before reprinting.',
   'linkedin','organic','/insights/packaging-compliance-fssai-legal-metrology', 49,'engagement-manager','qualifying', now() - interval '2 days', now() - interval '2 days' + interval '5 hours'),

  ('AS-8JW6HB','Anjali Rao','Sanjeevani Diagnostics','anjali@sanjeevanidx.in','+919845012306','Hubballi','Healthcare','project-funding-dpr','1-5-cr','1-3-months',
   'Adding a CT scanner and a second branch. Need a DPR and AERB guidance.',
   'google','organic','/industries/healthcare', 64,'partner-desk','discovery-scheduled', now() - interval '3 days', now() - interval '3 days' + interval '4 hours'),

  ('AS-8JV1ND','Suresh Menon','Coastal Spice Co','suresh@coastalspice.in','+919845012307','Kochi','Food processing','not-sure','under-1-cr','exploring',
   'Reading the newsletter for a while. Not sure where to start.',
   'newsletter','email','/insights/unit-economics-food-manufacturing', 18,'nurture-sequence','marketing-qualified', now() - interval '3 days', now() - interval '3 days' + interval '30 hours'),

  ('AS-8JU8XS','Vandana Joshi','Sahyadri Farms Collective','vandana@sahyadrifarms.in','+919845012308','Satara','Dairy','factory-setup-operations','25-100-cr','1-3-months',
   'Existing 80,000 LPD plant running at roughly 60%. Want a capacity study before committing to expansion.',
   'google','organic','/insights/factory-automation-guide-msme', 78,'partner-desk','discovery-scheduled', now() - interval '4 days', now() - interval '4 days' + interval '2 hours');

-- ---------------------------------------------------------------------------
-- Client and portal user
-- ---------------------------------------------------------------------------
insert into clients (id, company, legal_name, industry, city, state, partner_id, onboarded_on) values
  ('22222222-2222-4222-8222-222222222201', 'Sahyadri Dairy Pvt Ltd', 'Sahyadri Dairy Private Limited',
   'Dairy', 'Kolhapur', 'Maharashtra', '11111111-1111-4111-8111-111111111101', date '2024-03-11');

insert into client_users (client_id, user_id, access, accepted_at) values
  ('22222222-2222-4222-8222-222222222201', '11111111-1111-4111-8111-111111111107', 'owner', now() - interval '18 months');

-- ---------------------------------------------------------------------------
-- Projects
-- ---------------------------------------------------------------------------
insert into projects (id, client_id, name, service_slug, partner_id, engagement_model,
                      fee_amount_paise, fee_success_bps, stage, health, progress, started_on, target_date)
values
  ('33333333-3333-4333-8333-333333333301','22222222-2222-4222-8222-222222222201',
   'Value-added plant — funding & commissioning','project-funding-dpr','11111111-1111-4111-8111-111111111101',
   'hybrid', 40000000, 100, 'Commissioning','on-track', 78, date '2024-03-18', date '2026-11-30'),

  ('33333333-3333-4333-8333-333333333302','22222222-2222-4222-8222-222222222201',
   'AHIDF interest subvention claim','subsidies-compliance','11111111-1111-4111-8111-111111111104',
   'success-fee', 5000000, 300, 'Claim filing','at-risk', 61, date '2024-05-02', date '2026-12-20'),

  ('33333333-3333-4333-8333-333333333303','22222222-2222-4222-8222-222222222201',
   'Brand launch — chilled retail range','branding-marketing','11111111-1111-4111-8111-111111111105',
   'project', 98000000, null, 'Packaging design','on-track', 34, date '2026-06-09', date '2027-02-28');

insert into milestones (project_id, name, sequence, due_on, status) values
  ('33333333-3333-4333-8333-333333333301','Pre-feasibility note',      1, date '2024-04-05','done'),
  ('33333333-3333-4333-8333-333333333301','Site reappraisal',          2, date '2024-05-17','done'),
  ('33333333-3333-4333-8333-333333333301','DPR submission',            3, date '2024-06-28','done'),
  ('33333333-3333-4333-8333-333333333301','Term loan sanction',        4, date '2024-10-02','done'),
  ('33333333-3333-4333-8333-333333333301','Machinery tender award',    5, date '2025-01-24','done'),
  ('33333333-3333-4333-8333-333333333301','Civil completion',          6, date '2026-06-30','done'),
  ('33333333-3333-4333-8333-333333333301','Equipment installation',    7, date '2026-09-15','active'),
  ('33333333-3333-4333-8333-333333333301','Trial production',          8, date '2026-11-30','upcoming'),

  ('33333333-3333-4333-8333-333333333302','Eligibility report',        1, date '2024-05-20','done'),
  ('33333333-3333-4333-8333-333333333302','Application filed',         2, date '2024-06-14','done'),
  ('33333333-3333-4333-8333-333333333302','Departmental queries closed',3, date '2024-09-30','done'),
  ('33333333-3333-4333-8333-333333333302','Evidence file assembly',    4, date '2026-10-15','active'),
  ('33333333-3333-4333-8333-333333333302','Claim submission',          5, date '2026-12-20','upcoming'),

  ('33333333-3333-4333-8333-333333333303','Category and shelf audit',  1, date '2026-07-04','done'),
  ('33333333-3333-4333-8333-333333333303','Positioning sign-off',      2, date '2026-08-01','done'),
  ('33333333-3333-4333-8333-333333333303','Identity system',           3, date '2026-09-26','active'),
  ('33333333-3333-4333-8333-333333333303','Packaging artwork',         4, date '2026-11-14','upcoming'),
  ('33333333-3333-4333-8333-333333333303','First print run',           5, date '2027-01-16','upcoming');

-- ---------------------------------------------------------------------------
-- Tasks
-- ---------------------------------------------------------------------------
insert into tasks (project_id, title, owner_side, assignee_id, due_on, status, blocked_reason) values
  ('33333333-3333-4333-8333-333333333302','Share installation certificates for pasteuriser, homogeniser and CIP skid','client','11111111-1111-4111-8111-111111111107', date '2026-09-26','open', null),
  ('33333333-3333-4333-8333-333333333301','Close punch list items 14–22 with civil contractor','firm','11111111-1111-4111-8111-111111111103', date '2026-09-30','in-progress', null),
  ('33333333-3333-4333-8333-333333333303','Confirm final SKU list for artwork (6 or 8 SKUs)','client','11111111-1111-4111-8111-111111111107', date '2026-10-03','blocked','Awaiting distributor feedback on the shrikhand SKU'),
  ('33333333-3333-4333-8333-333333333301','Submit revised commissioning schedule to lender','firm','11111111-1111-4111-8111-111111111101', date '2026-10-08','open', null),
  ('33333333-3333-4333-8333-333333333301','Water trial protocol sign-off','firm','11111111-1111-4111-8111-111111111103', date '2026-09-19','done', null),
  ('33333333-3333-4333-8333-333333333302','Upload GST returns for Apr–Jun quarter','client','11111111-1111-4111-8111-111111111107', date '2026-09-15','done', null);

-- ---------------------------------------------------------------------------
-- Documents (with one version each)
-- ---------------------------------------------------------------------------
with inserted as (
  insert into documents (id, project_id, name, category, status, current_version, created_by)
  values
    ('44444444-4444-4444-8444-444444444401','33333333-3333-4333-8333-333333333301','Detailed Project Report — final submitted','DPR','final',4,'11111111-1111-4111-8111-111111111106'),
    ('44444444-4444-4444-8444-444444444402','33333333-3333-4333-8333-333333333301','CMA data — Forms I to VI','Financials','final',2,'11111111-1111-4111-8111-111111111106'),
    ('44444444-4444-4444-8444-444444444403','33333333-3333-4333-8333-333333333301','Equipment layout — issued for construction','Layout','final',3,'11111111-1111-4111-8111-111111111103'),
    ('44444444-4444-4444-8444-444444444404','33333333-3333-4333-8333-333333333301','Consent to Establish — MPCB','Statutory','final',1,'11111111-1111-4111-8111-111111111104'),
    ('44444444-4444-4444-8444-444444444405','33333333-3333-4333-8333-333333333302','AHIDF evidence file — index and annexures','Statutory','in-review',1,'11111111-1111-4111-8111-111111111104'),
    ('44444444-4444-4444-8444-444444444406','33333333-3333-4333-8333-333333333301','Commissioning protocol and acceptance criteria','Report','in-review',1,'11111111-1111-4111-8111-111111111103'),
    ('44444444-4444-4444-8444-444444444407','33333333-3333-4333-8333-333333333303','Brand positioning deck','Report','final',2,'11111111-1111-4111-8111-111111111105'),
    ('44444444-4444-4444-8444-444444444408','33333333-3333-4333-8333-333333333301','Lender correspondence — schedule revision','Correspondence','draft',1,'11111111-1111-4111-8111-111111111101')
  returning id, current_version, created_by
)
insert into document_versions (document_id, version, label, storage_key, mime_type, size_bytes, uploaded_by)
select
  id,
  current_version,
  'v' || current_version || '.0',
  'documents/' || id || '/v' || current_version,
  'application/pdf',
  (1024 * 1024 * (1 + (random() * 30)))::bigint,
  created_by
from inserted;

-- ---------------------------------------------------------------------------
-- Meetings
-- ---------------------------------------------------------------------------
insert into meetings (id, project_id, title, held_on, location, created_by) values
  ('55555555-5555-4555-8555-555555555501','33333333-3333-4333-8333-333333333301','Monthly project review — September', date '2026-09-12','Site, Kolhapur','11111111-1111-4111-8111-111111111101'),
  ('55555555-5555-4555-8555-555555555502','33333333-3333-4333-8333-333333333303','Brand positioning sign-off', date '2026-08-01','Video call','11111111-1111-4111-8111-111111111105'),
  ('55555555-5555-4555-8555-555555555503','33333333-3333-4333-8333-333333333302','AHIDF claim readiness check', date '2026-07-22','Video call','11111111-1111-4111-8111-111111111104');

insert into meeting_attendees (meeting_id, name, user_id) values
  ('55555555-5555-4555-8555-555555555501','Mahesh Patil','11111111-1111-4111-8111-111111111107'),
  ('55555555-5555-4555-8555-555555555501','Rajiv Deshpande','11111111-1111-4111-8111-111111111101'),
  ('55555555-5555-4555-8555-555555555501','Sameer Joshi','11111111-1111-4111-8111-111111111103'),
  ('55555555-5555-4555-8555-555555555501','Plant manager', null),
  ('55555555-5555-4555-8555-555555555502','Mahesh Patil','11111111-1111-4111-8111-111111111107'),
  ('55555555-5555-4555-8555-555555555502','Meera Raghavan','11111111-1111-4111-8111-111111111105'),
  ('55555555-5555-4555-8555-555555555502','Sales head', null),
  ('55555555-5555-4555-8555-555555555503','Mahesh Patil','11111111-1111-4111-8111-111111111107'),
  ('55555555-5555-4555-8555-555555555503','Priya Nair','11111111-1111-4111-8111-111111111104'),
  ('55555555-5555-4555-8555-555555555503','Finance team', null);

insert into meeting_items (meeting_id, kind, body, sequence) values
  ('55555555-5555-4555-8555-555555555501','decision','Trial production target moved from 15 to 30 November to allow full CIP validation.',1),
  ('55555555-5555-4555-8555-555555555501','decision','Paneer line commissioned before ghee line, reversing the earlier sequence.',2),
  ('55555555-5555-4555-8555-555555555501','decision','Two additional crate washers approved within the existing contingency.',3),
  ('55555555-5555-4555-8555-555555555501','action','Revised schedule to lender by 8 October (Rajiv).',1),
  ('55555555-5555-4555-8555-555555555501','action','Punch list 14–22 closed with contractor by 30 September (Sameer).',2),
  ('55555555-5555-4555-8555-555555555501','action','Installation certificates collected from three suppliers (Client).',3),
  ('55555555-5555-4555-8555-555555555502','decision','Positioning locked on district provenance and same-day chilling, not ''premium''.',1),
  ('55555555-5555-4555-8555-555555555502','decision','Launch range capped at six SKUs; shrikhand deferred to phase two.',2),
  ('55555555-5555-4555-8555-555555555502','action','Identity system draft by 26 September (Meera).',1),
  ('55555555-5555-4555-8555-555555555503','decision','Evidence file structured by asset rather than by invoice date.',1),
  ('55555555-5555-4555-8555-555555555503','action','Evidence index circulated (Priya).',1);

-- ---------------------------------------------------------------------------
-- Proposals and invoices (amounts in paise)
-- ---------------------------------------------------------------------------
insert into proposals (reference, service_slug, title, value_paise, engagement_model, owner_id, status, sent_at, valid_until)
values
  ('PR-2026-041','project-funding-dpr','Cold chain expansion — DPR and PMKSY filing',           48000000,'hybrid',     '11111111-1111-4111-8111-111111111101','sent',         now() - interval '3 days', current_date + 21),
  ('PR-2026-040','business-growth-strategy','Occupancy and channel diagnostic',                 65000000,'project',    '11111111-1111-4111-8111-111111111102','viewed',       now() - interval '5 days', current_date + 19),
  ('PR-2026-039','branding-marketing','Namkeen range relaunch and compliance rebuild',          72000000,'project',    '11111111-1111-4111-8111-111111111105','negotiating',  now() - interval '11 days', current_date + 13),
  ('PR-2026-038','project-funding-dpr','Diagnostics expansion — DPR and AERB path',             31000000,'project',    '11111111-1111-4111-8111-111111111101','won',          now() - interval '17 days', current_date + 7),
  ('PR-2026-037','subsidies-compliance','FPO infrastructure — eligibility and filing',          16500000,'success-fee','11111111-1111-4111-8111-111111111104','lost',         now() - interval '22 days', current_date - 1);

insert into invoices (reference, client_id, project_id, description, amount_paise, gst_paise, issued_on, due_on, paid_on, status)
values
  ('AS/2024/0112','22222222-2222-4222-8222-222222222201','33333333-3333-4333-8333-333333333301','DPR — Comprehensive, milestone 1',       18000000, 3240000, date '2024-03-22', date '2024-04-06', date '2024-04-02','paid'),
  ('AS/2024/0186','22222222-2222-4222-8222-222222222201','33333333-3333-4333-8333-333333333301','DPR — Comprehensive, milestone 2',       22000000, 3960000, date '2024-06-30', date '2024-07-15', date '2024-07-11','paid'),
  ('AS/2024/0241','22222222-2222-4222-8222-222222222201','33333333-3333-4333-8333-333333333301','Success fee — term loan sanction (1.0%)',114000000,20520000, date '2024-10-09', date '2024-10-24', date '2024-10-22','paid'),
  ('AS/2026/0094','22222222-2222-4222-8222-222222222201','33333333-3333-4333-8333-333333333301','Project management retainer — August',   26500000, 4770000, date '2026-09-01', date '2026-09-16', date '2026-09-11','paid'),
  ('AS/2026/0108','22222222-2222-4222-8222-222222222201','33333333-3333-4333-8333-333333333301','Project management retainer — September',26500000, 4770000, date '2026-09-15', date '2026-09-30', null,'due'),
  ('AS/2026/0079','22222222-2222-4222-8222-222222222201','33333333-3333-4333-8333-333333333303','Brand launch — milestone 1',             34000000, 6120000, date '2026-08-04', date '2026-08-19', null,'overdue');

-- ---------------------------------------------------------------------------
-- Content performance rollup (admin content report)
-- ---------------------------------------------------------------------------
insert into content_metrics_daily (path, day, views, enquiries, avg_position) values
  ('/insights/how-to-start-dairy-plant-india',        current_date - 1, 168, 1, 3.1),
  ('/insights/government-subsidies-food-processing',  current_date - 1, 121, 0, 4.7),
  ('/services/project-funding-dpr',                   current_date - 1,  97, 2, 6.2),
  ('/insights/dairy-plant-project-cost-india',        current_date - 1,  84, 1, 2.4),
  ('/industries/dairy',                               current_date - 1,  66, 1, 5.8),
  ('/insights/how-to-prepare-bankable-dpr',           current_date - 1,  54, 0, 8.3);

commit;

-- Sanity output
select 'leads' as table_name, count(*) from leads
union all select 'projects', count(*) from projects
union all select 'milestones', count(*) from milestones
union all select 'tasks', count(*) from tasks
union all select 'documents', count(*) from documents
union all select 'document_versions', count(*) from document_versions
union all select 'meetings', count(*) from meetings
union all select 'meeting_items', count(*) from meeting_items
union all select 'proposals', count(*) from proposals
union all select 'invoices', count(*) from invoices
order by table_name;
