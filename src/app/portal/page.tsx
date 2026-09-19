import type { Metadata } from "next";
import { AppHeader, AppShell, DemoNotice, Panel, ProgressBar, StatusBadge } from "@/components/app/Shell";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CapacityGauge } from "@/components/viz/CapacityGauge";
import {
  portalClient,
  portalDocuments,
  portalInvoices,
  portalMeetings,
  portalProjects,
  portalTasks,
} from "@/content/workspace";
import { formatDate, formatInr } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Client Portal",
  description:
    "Live project tracking, document management, tasks, meeting notes and invoices for Anuradha Solutions clients.",
  path: "/portal",
  noIndex: true,
});

const nav = [
  { label: "Overview", href: "/portal" },
  { label: "Projects", href: "/portal#projects", badge: String(portalProjects.length) },
  { label: "Tasks", href: "/portal#tasks", badge: String(portalTasks.filter((t) => t.status !== "done").length) },
  { label: "Documents", href: "/portal#documents" },
  { label: "Meetings", href: "/portal#meetings" },
  { label: "Invoices", href: "/portal#invoices" },
];

export default function PortalPage() {
  const openTasks = portalTasks.filter((task) => task.status !== "done");
  const clientTasks = openTasks.filter((task) => task.owner === "Client");
  const outstanding = portalInvoices
    .filter((invoice) => invoice.status !== "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const averageProgress = Math.round(
    portalProjects.reduce((sum, project) => sum + project.progress, 0) / portalProjects.length,
  );

  return (
    <AppShell
      area="Client portal"
      nav={nav}
      user={{ name: portalClient.contact, detail: portalClient.company, initials: portalClient.initials }}
    >
      <DemoNotice area="portal" doc="docs/09-client-portal.md" />

      <AppHeader
        eyebrow={`Client since ${formatDate(portalClient.since)}`}
        title={portalClient.company}
        lede={`Engagement partner: ${portalClient.partner}. Everything below updates as we work — you are seeing the same view we do.`}
        actions={
          <>
            <ButtonLink href="/contact" size="sm" variant="secondary">
              Message the team
            </ButtonLink>
            <Button size="sm">Upload a document</Button>
          </>
        }
      />

      {/* ============ Summary tiles ================================== */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Active projects", value: String(portalProjects.length), detail: `${averageProgress}% average completion` },
          { label: "Tasks with you", value: String(clientTasks.length), detail: clientTasks.length ? `Next due ${formatDate(clientTasks[0]!.due)}` : "Nothing pending" },
          { label: "Documents", value: String(portalDocuments.length), detail: `${portalDocuments.filter((d) => d.status === "in-review").length} in review` },
          { label: "Outstanding", value: formatInr(outstanding), detail: `${portalInvoices.filter((i) => i.status === "overdue").length} overdue` },
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

      {/* ============ Projects ======================================= */}
      <div id="projects" className="mt-8 scroll-mt-8 space-y-4">
        {portalProjects.map((project) => (
          <Panel
            key={project.id}
            title={project.name}
            action={<StatusBadge status={project.health} />}
          >
            <div className="grid gap-6 p-5 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <dl className="space-y-3 text-[0.82rem]">
                  {[
                    ["Practice", project.service],
                    ["Partner", project.partner],
                    ["Stage", project.stage],
                    ["Started", formatDate(project.startedOn)],
                    ["Target", formatDate(project.targetDate)],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-3">
                      <dt className="w-20 shrink-0 text-mist-500">{label}</dt>
                      <dd className="font-medium text-ink-800">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5">
                  <ProgressBar value={project.progress} label="Milestones complete" />
                </div>
                <p className="mt-4 rounded-card bg-mist-50 px-3 py-2.5 text-[0.8rem] text-mist-700">
                  <span className="font-semibold text-ink-900">Next: </span>
                  {project.nextMilestone}
                </p>
              </div>

              <ol className="lg:col-span-8">
                {project.milestones.map((milestone, index) => (
                  <li key={milestone.name} className="relative flex gap-4 pb-5 last:pb-0">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid size-5 shrink-0 place-items-center rounded-full ring-2 ${
                          milestone.status === "done"
                            ? "bg-brand-600 text-white ring-brand-600"
                            : milestone.status === "active"
                              ? "bg-paper text-brand-600 ring-brand-500"
                              : "bg-paper text-mist-400 ring-mist-300"
                        }`}
                      >
                        {milestone.status === "done" ? (
                          <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 6.5 4.5 9 10 3" />
                          </svg>
                        ) : (
                          <span className="size-1.5 rounded-full bg-current" />
                        )}
                      </span>
                      {index < project.milestones.length - 1 ? (
                        <span
                          aria-hidden="true"
                          className={`mt-1 w-px flex-1 ${milestone.status === "done" ? "bg-brand-300" : "bg-mist-200"}`}
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1 pb-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p
                          className={`text-[0.88rem] ${milestone.status === "upcoming" ? "text-mist-500" : "font-medium text-ink-900"}`}
                        >
                          {milestone.name}
                        </p>
                        <span className="font-mono text-[0.72rem] text-mist-500">
                          {formatDate(milestone.due)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Panel>
        ))}
      </div>

      {/* ============ Tasks + gauge ================================== */}
      <div id="tasks" className="mt-8 grid scroll-mt-8 gap-4 lg:grid-cols-12">
        <Panel
          title="Open tasks"
          className="lg:col-span-8"
          action={
            <span className="font-mono text-[0.72rem] text-mist-500">
              {clientTasks.length} with you · {openTasks.length - clientTasks.length} with us
            </span>
          }
        >
          <ul className="divide-y divide-mist-200">
            {portalTasks.map((task) => (
              <li key={task.id} className="flex items-start gap-4 px-5 py-4">
                <span
                  className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded border ${
                    task.status === "done"
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-mist-300 bg-paper"
                  }`}
                  aria-hidden="true"
                >
                  {task.status === "done" ? (
                    <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6.5 4.5 9 10 3" />
                    </svg>
                  ) : null}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-[0.88rem] ${task.status === "done" ? "text-mist-500 line-through" : "text-ink-900"}`}
                  >
                    {task.title}
                  </p>
                  <p className="mt-1 text-[0.75rem] text-mist-500">
                    {task.project} · {task.assignee}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <StatusBadge status={task.status} />
                  <span className="font-mono text-[0.72rem] text-mist-500">
                    {formatDate(task.due)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Plant performance" className="lg:col-span-4">
          <div className="p-5">
            <CapacityGauge
              value={72}
              target={86}
              label="Commissioning readiness"
              caption="Weighted across civil, utilities and equipment"
              className="mx-auto text-ink-800"
            />
            <dl className="mt-6 space-y-2.5 border-t border-mist-200 pt-5 text-[0.8rem]">
              {[
                ["Civil", "100%"],
                ["Utilities", "88%"],
                ["Equipment installed", "61%"],
                ["Statutory clearances", "75%"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-mist-600">{label}</dt>
                  <dd className="font-mono font-medium text-ink-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>
      </div>

      {/* ============ Documents ====================================== */}
      <div id="documents" className="mt-8 scroll-mt-8">
        <Panel
          title="Document room"
          action={<Button size="sm" variant="secondary">Upload</Button>}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-3xl text-left text-[0.85rem]">
              <thead className="border-b border-mist-200 bg-mist-50">
                <tr>
                  {["Document", "Category", "Version", "Uploaded by", "Date", "Size", "Status"].map(
                    (heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-3 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-mist-600"
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-200">
                {portalDocuments.map((doc) => (
                  <tr key={doc.id} className="transition-colors hover:bg-mist-50">
                    <th scope="row" className="px-5 py-3.5 font-medium text-ink-900">
                      {doc.name}
                    </th>
                    <td className="px-5 py-3.5 text-mist-600">{doc.category}</td>
                    <td className="px-5 py-3.5 font-mono text-[0.78rem] text-mist-600">
                      {doc.version}
                    </td>
                    <td className="px-5 py-3.5 text-mist-600">{doc.uploadedBy}</td>
                    <td className="px-5 py-3.5 font-mono text-[0.78rem] text-mist-600">
                      {formatDate(doc.uploadedOn)}
                    </td>
                    <td className="px-5 py-3.5 text-mist-600">{doc.size}</td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={doc.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* ============ Meetings + invoices ============================ */}
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div id="meetings" className="scroll-mt-8 lg:col-span-7">
          <Panel title="Meeting notes">
            <ul className="divide-y divide-mist-200">
              {portalMeetings.map((meeting) => (
                <li key={meeting.id} className="px-5 py-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[0.92rem] font-semibold text-ink-900">{meeting.title}</h3>
                    <span className="font-mono text-[0.72rem] text-mist-500">
                      {formatDate(meeting.date)}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.75rem] text-mist-500">
                    {meeting.attendees.join(" · ")}
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-wider text-brand-600">
                        Decisions
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {meeting.decisions.map((decision) => (
                          <li key={decision.slice(0, 30)} className="text-[0.8rem] leading-snug text-mist-700">
                            {decision}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[0.62rem] uppercase tracking-wider text-accent-600">
                        Actions
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {meeting.actions.map((action) => (
                          <li key={action.slice(0, 30)} className="text-[0.8rem] leading-snug text-mist-700">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div id="invoices" className="scroll-mt-8 lg:col-span-5">
          <Panel
            title="Invoices"
            action={
              <span className="font-mono text-[0.72rem] text-mist-500">
                {formatInr(outstanding)} outstanding
              </span>
            }
          >
            <ul className="divide-y divide-mist-200">
              {portalInvoices.map((invoice) => (
                <li key={invoice.id} className="flex items-start justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="font-mono text-[0.78rem] text-mist-500">{invoice.reference}</p>
                    <p className="mt-0.5 text-[0.86rem] text-ink-900">{invoice.description}</p>
                    <p className="mt-1 text-[0.74rem] text-mist-500">
                      Due {formatDate(invoice.dueOn)}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="font-mono text-[0.88rem] font-medium text-ink-900">
                      {formatInr(invoice.amount)}
                    </p>
                    <div className="mt-1.5">
                      <StatusBadge status={invoice.status} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>

      <p className="mt-8 pb-4 text-[0.78rem] text-mist-500">
        Portal access is issued per client at engagement kick-off. Lost your login? Email{" "}
        <a href="mailto:engage@anuradhasolutions.in" className="text-brand-700 underline underline-offset-2">
          engage@anuradhasolutions.in
        </a>
        .
      </p>
    </AppShell>
  );
}
