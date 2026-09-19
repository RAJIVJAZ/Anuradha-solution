/**
 * Demonstration data for the client portal and admin panel.
 *
 * These screens ship as fully designed, working UI backed by fixture data so
 * the layouts, states and interactions can be reviewed and signed off before
 * authentication and live queries are wired in. Every shape here matches a
 * table in db/schema.sql — swapping the import for a query is the whole
 * integration (docs/08-admin-panel.md, docs/09-client-portal.md).
 */

export interface PortalProject {
  id: string;
  name: string;
  client: string;
  service: string;
  partner: string;
  stage: string;
  startedOn: string;
  targetDate: string;
  health: "on-track" | "at-risk" | "blocked";
  progress: number;
  nextMilestone: string;
  milestones: { name: string; due: string; status: "done" | "active" | "upcoming" }[];
}

export interface PortalTask {
  id: string;
  title: string;
  owner: "Anuradha" | "Client";
  assignee: string;
  due: string;
  status: "open" | "in-progress" | "blocked" | "done";
  project: string;
}

export interface PortalDocument {
  id: string;
  name: string;
  category: "DPR" | "Financials" | "Statutory" | "Layout" | "Correspondence" | "Report";
  version: string;
  uploadedBy: string;
  uploadedOn: string;
  size: string;
  status: "draft" | "in-review" | "final";
}

export interface PortalMeeting {
  id: string;
  title: string;
  date: string;
  attendees: string[];
  decisions: string[];
  actions: string[];
}

export interface PortalInvoice {
  id: string;
  reference: string;
  description: string;
  amount: number;
  issuedOn: string;
  dueOn: string;
  status: "paid" | "due" | "overdue";
}

export const portalClient = {
  company: "Sahyadri Dairy Pvt Ltd",
  contact: "Mahesh Patil",
  role: "Managing Director",
  initials: "MP",
  partner: "Rajiv Deshpande",
  since: "2024-03-11",
};

export const portalProjects: PortalProject[] = [
  {
    id: "proj-1",
    name: "Value-added plant — funding & commissioning",
    client: "Sahyadri Dairy Pvt Ltd",
    service: "Project Funding & DPR",
    partner: "Rajiv Deshpande",
    stage: "Commissioning",
    startedOn: "2024-03-18",
    targetDate: "2026-11-30",
    health: "on-track",
    progress: 78,
    nextMilestone: "Product trial runs — paneer line",
    milestones: [
      { name: "Pre-feasibility note", due: "2024-04-05", status: "done" },
      { name: "Site reappraisal", due: "2024-05-17", status: "done" },
      { name: "DPR submission", due: "2024-06-28", status: "done" },
      { name: "Term loan sanction", due: "2024-10-02", status: "done" },
      { name: "Machinery tender award", due: "2025-01-24", status: "done" },
      { name: "Civil completion", due: "2026-06-30", status: "done" },
      { name: "Equipment installation", due: "2026-09-15", status: "active" },
      { name: "Trial production", due: "2026-11-30", status: "upcoming" },
    ],
  },
  {
    id: "proj-2",
    name: "AHIDF interest subvention claim",
    client: "Sahyadri Dairy Pvt Ltd",
    service: "Subsidies & Compliance",
    partner: "Priya Nair",
    stage: "Claim filing",
    startedOn: "2024-05-02",
    targetDate: "2026-12-20",
    health: "at-risk",
    progress: 61,
    nextMilestone: "Installation certificates from three suppliers",
    milestones: [
      { name: "Eligibility report", due: "2024-05-20", status: "done" },
      { name: "Application filed", due: "2024-06-14", status: "done" },
      { name: "Departmental queries closed", due: "2024-09-30", status: "done" },
      { name: "Evidence file assembly", due: "2026-10-15", status: "active" },
      { name: "Claim submission", due: "2026-12-20", status: "upcoming" },
    ],
  },
  {
    id: "proj-3",
    name: "Brand launch — chilled retail range",
    client: "Sahyadri Dairy Pvt Ltd",
    service: "Branding & Marketing",
    partner: "Meera Raghavan",
    stage: "Packaging design",
    startedOn: "2026-06-09",
    targetDate: "2027-02-28",
    health: "on-track",
    progress: 34,
    nextMilestone: "Pre-press compliance review",
    milestones: [
      { name: "Category and shelf audit", due: "2026-07-04", status: "done" },
      { name: "Positioning sign-off", due: "2026-08-01", status: "done" },
      { name: "Identity system", due: "2026-09-26", status: "active" },
      { name: "Packaging artwork", due: "2026-11-14", status: "upcoming" },
      { name: "First print run", due: "2027-01-16", status: "upcoming" },
    ],
  },
];

export const portalTasks: PortalTask[] = [
  {
    id: "task-1",
    title: "Share installation certificates for pasteuriser, homogeniser and CIP skid",
    owner: "Client",
    assignee: "Mahesh Patil",
    due: "2026-09-26",
    status: "open",
    project: "AHIDF interest subvention claim",
  },
  {
    id: "task-2",
    title: "Close punch list items 14–22 with civil contractor",
    owner: "Anuradha",
    assignee: "Sameer Joshi",
    due: "2026-09-30",
    status: "in-progress",
    project: "Value-added plant — funding & commissioning",
  },
  {
    id: "task-3",
    title: "Confirm final SKU list for artwork (6 or 8 SKUs)",
    owner: "Client",
    assignee: "Mahesh Patil",
    due: "2026-10-03",
    status: "blocked",
    project: "Brand launch — chilled retail range",
  },
  {
    id: "task-4",
    title: "Submit revised commissioning schedule to lender",
    owner: "Anuradha",
    assignee: "Rajiv Deshpande",
    due: "2026-10-08",
    status: "open",
    project: "Value-added plant — funding & commissioning",
  },
  {
    id: "task-5",
    title: "Water trial protocol sign-off",
    owner: "Anuradha",
    assignee: "Sameer Joshi",
    due: "2026-09-19",
    status: "done",
    project: "Value-added plant — funding & commissioning",
  },
  {
    id: "task-6",
    title: "Upload GST returns for Apr–Jun quarter",
    owner: "Client",
    assignee: "Finance team",
    due: "2026-09-15",
    status: "done",
    project: "AHIDF interest subvention claim",
  },
];

export const portalDocuments: PortalDocument[] = [
  { id: "doc-1", name: "Detailed Project Report — final submitted", category: "DPR", version: "v4.2", uploadedBy: "Vikram Shetty", uploadedOn: "2024-06-28", size: "14.2 MB", status: "final" },
  { id: "doc-2", name: "CMA data — Forms I to VI", category: "Financials", version: "v2.1", uploadedBy: "Vikram Shetty", uploadedOn: "2024-06-28", size: "1.8 MB", status: "final" },
  { id: "doc-3", name: "Equipment layout — issued for construction", category: "Layout", version: "v3.0", uploadedBy: "Sameer Joshi", uploadedOn: "2025-02-11", size: "22.7 MB", status: "final" },
  { id: "doc-4", name: "Consent to Establish — MPCB", category: "Statutory", version: "v1.0", uploadedBy: "Priya Nair", uploadedOn: "2024-08-19", size: "0.9 MB", status: "final" },
  { id: "doc-5", name: "AHIDF evidence file — index and annexures", category: "Statutory", version: "v0.7", uploadedBy: "Priya Nair", uploadedOn: "2026-09-12", size: "38.4 MB", status: "in-review" },
  { id: "doc-6", name: "Commissioning protocol and acceptance criteria", category: "Report", version: "v1.3", uploadedBy: "Sameer Joshi", uploadedOn: "2026-09-08", size: "2.2 MB", status: "in-review" },
  { id: "doc-7", name: "Brand positioning deck", category: "Report", version: "v2.0", uploadedBy: "Meera Raghavan", uploadedOn: "2026-08-01", size: "8.6 MB", status: "final" },
  { id: "doc-8", name: "Lender correspondence — schedule revision", category: "Correspondence", version: "v1.0", uploadedBy: "Rajiv Deshpande", uploadedOn: "2026-09-14", size: "0.3 MB", status: "draft" },
];

export const portalMeetings: PortalMeeting[] = [
  {
    id: "mtg-1",
    title: "Monthly project review — September",
    date: "2026-09-12",
    attendees: ["Mahesh Patil", "Rajiv Deshpande", "Sameer Joshi", "Plant manager"],
    decisions: [
      "Trial production target moved from 15 to 30 November to allow full CIP validation.",
      "Paneer line commissioned before ghee line, reversing the earlier sequence.",
      "Two additional crate washers approved within the existing contingency.",
    ],
    actions: [
      "Revised schedule to lender by 8 October (Rajiv).",
      "Punch list 14–22 closed with contractor by 30 September (Sameer).",
      "Installation certificates collected from three suppliers (Client).",
    ],
  },
  {
    id: "mtg-2",
    title: "Brand positioning sign-off",
    date: "2026-08-01",
    attendees: ["Mahesh Patil", "Meera Raghavan", "Sales head"],
    decisions: [
      "Positioning locked on district provenance and same-day chilling, not 'premium'.",
      "Launch range capped at six SKUs; shrikhand deferred to phase two.",
      "Price ladder set 8% above the incumbent regional brand.",
    ],
    actions: [
      "Identity system draft by 26 September (Meera).",
      "Final SKU list confirmed in writing (Client).",
    ],
  },
  {
    id: "mtg-3",
    title: "AHIDF claim readiness check",
    date: "2026-07-22",
    attendees: ["Mahesh Patil", "Priya Nair", "Finance team"],
    decisions: [
      "Evidence file structured by asset rather than by invoice date.",
      "Claim to be filed after trial production, not after installation.",
    ],
    actions: [
      "Evidence index circulated (Priya).",
      "GST returns for the quarter uploaded (Client).",
    ],
  },
];

export const portalInvoices: PortalInvoice[] = [
  { id: "inv-1", reference: "AS/2024/0112", description: "DPR — Comprehensive, milestone 1", amount: 180000, issuedOn: "2024-03-22", dueOn: "2024-04-06", status: "paid" },
  { id: "inv-2", reference: "AS/2024/0186", description: "DPR — Comprehensive, milestone 2", amount: 220000, issuedOn: "2024-06-30", dueOn: "2024-07-15", status: "paid" },
  { id: "inv-3", reference: "AS/2024/0241", description: "Success fee — term loan sanction (1.0%)", amount: 1140000, issuedOn: "2024-10-09", dueOn: "2024-10-24", status: "paid" },
  { id: "inv-4", reference: "AS/2026/0094", description: "Project management retainer — August", amount: 265000, issuedOn: "2026-09-01", dueOn: "2026-09-16", status: "paid" },
  { id: "inv-5", reference: "AS/2026/0108", description: "Project management retainer — September", amount: 265000, issuedOn: "2026-09-15", dueOn: "2026-09-30", status: "due" },
  { id: "inv-6", reference: "AS/2026/0079", description: "Brand launch — milestone 1", amount: 340000, issuedOn: "2026-08-04", dueOn: "2026-08-19", status: "overdue" },
];

/* ------------------------------------------------------------------------ */
/* Admin panel fixtures                                                      */
/* ------------------------------------------------------------------------ */

export interface AdminLead {
  id: string;
  reference: string;
  name: string;
  company: string;
  city: string;
  industry: string;
  interest: string;
  revenue: string;
  timeline: string;
  score: number;
  desk: "partner-desk" | "engagement-manager" | "nurture-sequence";
  stage: string;
  source: string;
  receivedAt: string;
}

export const adminLeads: AdminLead[] = [
  { id: "ld-1", reference: "AS-8K2QF1", name: "Girish Kulkarni", company: "Nandini Cold Chain", city: "Belagavi", industry: "Dairy", interest: "project-funding-dpr", revenue: "5-25-cr", timeline: "immediate", score: 82, desk: "partner-desk", stage: "discovery-scheduled", source: "organic/google", receivedAt: "2026-09-18T09:14:00+05:30" },
  { id: "ld-2", reference: "AS-8K1M7P", name: "Fatima Sheikh", company: "Zaiqa Foods", city: "Hyderabad", industry: "Food processing", interest: "factory-setup-operations", revenue: "1-5-cr", timeline: "1-3-months", score: 58, desk: "engagement-manager", stage: "qualifying", source: "organic/google", receivedAt: "2026-09-18T07:42:00+05:30" },
  { id: "ld-3", reference: "AS-8JZ4RR", name: "Harpreet Singh", company: "Malwa Agro FPO", city: "Bathinda", industry: "Agriculture / FPO", interest: "subsidies-compliance", revenue: "under-1-cr", timeline: "3-6-months", score: 31, desk: "nurture-sequence", stage: "marketing-qualified", source: "resource/subsidy-eligibility-matrix", receivedAt: "2026-09-17T18:05:00+05:30" },
  { id: "ld-4", reference: "AS-8JY9TC", name: "Ravindra Shetty", company: "Konkan Resorts LLP", city: "Ratnagiri", industry: "Hospitality", interest: "business-growth-strategy", revenue: "5-25-cr", timeline: "immediate", score: 71, desk: "partner-desk", stage: "discovery-scheduled", source: "referral/client", receivedAt: "2026-09-17T14:30:00+05:30" },
  { id: "ld-5", reference: "AS-8JX2LK", name: "Neelam Agarwal", company: "Shree Namkeen", city: "Indore", industry: "Sweets & bakery", interest: "branding-marketing", revenue: "1-5-cr", timeline: "1-3-months", score: 49, desk: "engagement-manager", stage: "qualifying", source: "linkedin/organic", receivedAt: "2026-09-17T11:22:00+05:30" },
  { id: "ld-6", reference: "AS-8JW6HB", name: "Dr. Anjali Rao", company: "Sanjeevani Diagnostics", city: "Hubballi", industry: "Healthcare", interest: "project-funding-dpr", revenue: "1-5-cr", timeline: "1-3-months", score: 64, desk: "partner-desk", stage: "discovery-scheduled", source: "organic/google", receivedAt: "2026-09-16T16:48:00+05:30" },
  { id: "ld-7", reference: "AS-8JV1ND", name: "Suresh Menon", company: "Coastal Spice Co", city: "Kochi", industry: "Food processing", interest: "not-sure", revenue: "under-1-cr", timeline: "exploring", score: 18, desk: "nurture-sequence", stage: "marketing-qualified", source: "newsletter", receivedAt: "2026-09-16T10:03:00+05:30" },
  { id: "ld-8", reference: "AS-8JU8XS", name: "Vandana Joshi", company: "Sahyadri Farms Collective", city: "Satara", industry: "Dairy", interest: "factory-setup-operations", revenue: "25-100-cr", timeline: "1-3-months", score: 78, desk: "partner-desk", stage: "discovery-scheduled", source: "organic/google", receivedAt: "2026-09-15T15:37:00+05:30" },
];

export const adminFunnel = [
  { stage: "Visitors", count: 18420, note: "Organic 71%, direct 18%, referral 11%" },
  { stage: "Engaged (>60s or 2 pages)", count: 5120, note: "27.8% of visitors" },
  { stage: "Resource downloads", count: 641, note: "12.5% of engaged" },
  { stage: "Enquiries", count: 134, note: "2.6% of engaged" },
  { stage: "Discovery calls held", count: 58, note: "43.3% of enquiries" },
  { stage: "Proposals issued", count: 31, note: "53.4% of calls" },
  { stage: "Engagements won", count: 17, note: "54.8% of proposals" },
];

export const adminProposals = [
  { id: "pr-1", reference: "PR-2026-041", client: "Nandini Cold Chain", service: "Project Funding & DPR", value: 480000, model: "Project + success fee", status: "sent", sentOn: "2026-09-16", owner: "Rajiv Deshpande" },
  { id: "pr-2", reference: "PR-2026-040", client: "Konkan Resorts LLP", service: "Business & Growth Strategy", value: 650000, model: "Project", status: "viewed", sentOn: "2026-09-14", owner: "Anita Kulkarni" },
  { id: "pr-3", reference: "PR-2026-039", client: "Shree Namkeen", service: "Branding & Marketing", value: 720000, model: "Project", status: "negotiating", sentOn: "2026-09-08", owner: "Meera Raghavan" },
  { id: "pr-4", reference: "PR-2026-038", client: "Sanjeevani Diagnostics", service: "Project Funding & DPR", value: 310000, model: "Project", status: "won", sentOn: "2026-09-02", owner: "Rajiv Deshpande" },
  { id: "pr-5", reference: "PR-2026-037", client: "Malwa Agro FPO", service: "Subsidies & Compliance", value: 165000, model: "Success fee", status: "lost", sentOn: "2026-08-28", owner: "Priya Nair" },
];

export const adminContentPerformance = [
  { path: "/insights/how-to-start-dairy-plant-india", views: 4820, enquiries: 19, position: 3.1 },
  { path: "/insights/government-subsidies-food-processing", views: 3640, enquiries: 14, position: 4.7 },
  { path: "/services/project-funding-dpr", views: 2910, enquiries: 26, position: 6.2 },
  { path: "/insights/dairy-plant-project-cost-india", views: 2480, enquiries: 11, position: 2.4 },
  { path: "/industries/dairy", views: 1970, enquiries: 17, position: 5.8 },
  { path: "/insights/how-to-prepare-bankable-dpr", views: 1610, enquiries: 8, position: 8.3 },
];
