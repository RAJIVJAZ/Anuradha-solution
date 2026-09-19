import type { Metadata } from "next";
import { AppHeader, AppShell, DemoNotice, Panel, StatusBadge } from "@/components/app/Shell";
import { Button } from "@/components/ui/Button";
import {
  adminContentPerformance,
  adminFunnel,
  adminLeads,
  adminProposals,
  portalProjects,
} from "@/content/workspace";
import { formatInr } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Admin",
  description: "Internal console: lead pipeline, proposals, engagements and content performance.",
  path: "/admin",
  noIndex: true,
});

const nav = [
  { label: "Dashboard", href: "/admin" },
  { label: "Leads", href: "/admin#leads", badge: String(adminLeads.length) },
  { label: "Proposals", href: "/admin#proposals", badge: String(adminProposals.length) },
  { label: "Funnel", href: "/admin#funnel" },
  { label: "Content", href: "/admin#content" },
  { label: "Engagements", href: "/admin#engagements" },
];

const deskLabels: Record<string, string> = {
  "partner-desk": "Partner desk",
  "engagement-manager": "Engagement manager",
  "nurture-sequence": "Nurture",
};

function timeAgo(iso: string): string {
  const hours = Math.round((Date.parse("2026-09-19T12:00:00+05:30") - Date.parse(iso)) / 3_600_000);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export default function AdminPage() {
  const hotLeads = adminLeads.filter((lead) => lead.score >= 60);
  const pipelineValue = adminProposals
    .filter((proposal) => !["won", "lost"].includes(proposal.status))
    .reduce((sum, proposal) => sum + proposal.value, 0);
  const maxFunnel = adminFunnel[0]!.count;

  return (
    <AppShell
      area="Admin"
      nav={nav}
      user={{ name: "Rajiv Deshpande", detail: "Founder · Partner desk", initials: "RD" }}
    >
      <DemoNotice area="console" doc="docs/08-admin-panel.md" />

      <AppHeader
        eyebrow="Week 38 · FY 2026–27"
        title="Pipeline dashboard"
        lede="Leads, proposals and content performance in one view. Refreshed nightly from Postgres, with HubSpot as the system of record for the sales pipeline."
        actions={
          <>
            <Button size="sm" variant="secondary">
              Export CSV
            </Button>
            <Button size="sm">New proposal</Button>
          </>
        }
      />

      {/* ============ KPI tiles ====================================== */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "New enquiries (7d)", value: String(adminLeads.length), detail: `${hotLeads.length} scored 60+` },
          { label: "Open pipeline", value: formatInr(pipelineValue), detail: `${adminProposals.filter((p) => !["won", "lost"].includes(p.status)).length} live proposals` },
          { label: "Enquiry → call", value: "43.3%", detail: "Rolling 90 days" },
          { label: "Median first response", value: "5h 40m", detail: "Target: 8 business hours" },
        ].map((tile) => (
          <div key={tile.label} className="rounded-panel border border-mist-200 bg-paper p-5">
            <p className="font-mono text-[0.65rem] uppercase tracking-wider text-mist-500">
              {tile.label}
            </p>
            <p className="mt-2 font-serif text-2xl text-ink-900">{tile.value}</p>
            <p className="mt-1 text-[0.78rem] text-mist-600">{tile.detail}</p>
          </div>
        ))}
      </div>

      {/* ============ Leads ========================================== */}
      <div id="leads" className="mt-8 scroll-mt-8">
        <Panel
          title="Lead queue"
          action={
            <span className="font-mono text-[0.72rem] text-mist-500">
              Sorted by score · routed automatically
            </span>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-4xl text-left text-[0.85rem]">
              <thead className="border-b border-mist-200 bg-mist-50">
                <tr>
                  {["Score", "Reference", "Contact", "Sector & interest", "Band", "Timeline", "Desk", "Source", "Age"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-4 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-mist-600"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-200">
                {[...adminLeads]
                  .sort((a, b) => b.score - a.score)
                  .map((lead) => (
                    <tr key={lead.id} className="transition-colors hover:bg-mist-50">
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex size-8 items-center justify-center rounded-full font-mono text-[0.75rem] font-medium ${
                            lead.score >= 60
                              ? "bg-positive/12 text-positive"
                              : lead.score >= 35
                                ? "bg-caution/12 text-caution"
                                : "bg-mist-100 text-mist-600"
                          }`}
                        >
                          {lead.score}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[0.76rem] text-mist-600">
                        {lead.reference}
                      </td>
                      <th scope="row" className="px-4 py-3.5 font-medium text-ink-900">
                        {lead.name}
                        <span className="mt-0.5 block text-[0.74rem] font-normal text-mist-500">
                          {lead.company} · {lead.city}
                        </span>
                      </th>
                      <td className="px-4 py-3.5 text-mist-700">
                        {lead.industry}
                        <span className="mt-0.5 block text-[0.74rem] text-mist-500">
                          {lead.interest.replace(/-/g, " ")}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[0.76rem] text-mist-600">
                        {lead.revenue.replace(/-/g, " ")}
                      </td>
                      <td className="px-4 py-3.5 text-mist-600">
                        {lead.timeline.replace(/-/g, " ")}
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-[0.78rem] text-ink-800">{deskLabels[lead.desk]}</span>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[0.74rem] text-mist-500">
                        {lead.source}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-[0.74rem] text-mist-500">
                        {timeAgo(lead.receivedAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* ============ Funnel + proposals ============================= */}
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div id="funnel" className="scroll-mt-8 lg:col-span-5">
          <Panel title="Acquisition funnel — last 90 days">
            <ul className="space-y-4 p-5">
              {adminFunnel.map((stage) => (
                <li key={stage.stage}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[0.85rem] font-medium text-ink-900">{stage.stage}</span>
                    <span className="font-mono text-[0.8rem] text-ink-900">
                      {stage.count.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-mist-100">
                    <div
                      className="h-full rounded-full bg-brand-600"
                      style={{ width: `${Math.max(2, (stage.count / maxFunnel) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1 text-[0.72rem] text-mist-500">{stage.note}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div id="proposals" className="scroll-mt-8 lg:col-span-7">
          <Panel
            title="Proposals"
            action={
              <span className="font-mono text-[0.72rem] text-mist-500">
                {formatInr(pipelineValue)} open
              </span>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-2xl text-left text-[0.85rem]">
                <thead className="border-b border-mist-200 bg-mist-50">
                  <tr>
                    {["Reference", "Client", "Practice", "Value", "Model", "Owner", "Status"].map(
                      (heading) => (
                        <th
                          key={heading}
                          scope="col"
                          className="px-4 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-mist-600"
                        >
                          {heading}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist-200">
                  {adminProposals.map((proposal) => (
                    <tr key={proposal.id} className="transition-colors hover:bg-mist-50">
                      <th scope="row" className="px-4 py-3.5 font-mono text-[0.76rem] font-normal text-mist-600">
                        {proposal.reference}
                      </th>
                      <td className="px-4 py-3.5 font-medium text-ink-900">{proposal.client}</td>
                      <td className="px-4 py-3.5 text-mist-600">{proposal.service}</td>
                      <td className="px-4 py-3.5 font-mono text-[0.8rem] text-ink-900">
                        {formatInr(proposal.value)}
                      </td>
                      <td className="px-4 py-3.5 text-[0.78rem] text-mist-600">{proposal.model}</td>
                      <td className="px-4 py-3.5 text-[0.78rem] text-mist-600">{proposal.owner}</td>
                      <td className="px-4 py-3.5">
                        <StatusBadge status={proposal.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>

      {/* ============ Content + engagements ========================== */}
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div id="content" className="scroll-mt-8 lg:col-span-7">
          <Panel
            title="Content performance"
            action={
              <span className="font-mono text-[0.72rem] text-mist-500">
                Enquiries attributed to first landing page
              </span>
            }
          >
            <ul className="divide-y divide-mist-200">
              {adminContentPerformance.map((row) => (
                <li key={row.path} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-[0.78rem] text-ink-900">{row.path}</p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist-100">
                      <div
                        className="h-full rounded-full bg-accent-400"
                        style={{ width: `${(row.views / adminContentPerformance[0]!.views) * 100}%` }}
                      />
                    </div>
                  </div>
                  <dl className="flex shrink-0 gap-5 text-right">
                    <div>
                      <dt className="font-mono text-[0.62rem] uppercase text-mist-500">Views</dt>
                      <dd className="font-mono text-[0.8rem] text-ink-900">
                        {row.views.toLocaleString("en-IN")}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.62rem] uppercase text-mist-500">Enq.</dt>
                      <dd className="font-mono text-[0.8rem] text-ink-900">{row.enquiries}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.62rem] uppercase text-mist-500">Pos.</dt>
                      <dd className="font-mono text-[0.8rem] text-ink-900">{row.position}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div id="engagements" className="scroll-mt-8 lg:col-span-5">
          <Panel title="Live engagements">
            <ul className="divide-y divide-mist-200">
              {portalProjects.map((project) => (
                <li key={project.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[0.86rem] font-medium text-ink-900">{project.name}</p>
                      <p className="mt-0.5 text-[0.74rem] text-mist-500">
                        {project.client} · {project.partner}
                      </p>
                    </div>
                    <StatusBadge status={project.health} />
                  </div>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist-100">
                    <div
                      className="h-full rounded-full bg-brand-600"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <p className="mt-8 pb-4 text-[0.78rem] text-mist-500">
        Access is restricted to firm staff. Role-based permissions, audit logging and SSO are
        specified in docs/08-admin-panel.md.
      </p>
    </AppShell>
  );
}
