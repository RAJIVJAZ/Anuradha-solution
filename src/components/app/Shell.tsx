import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/site/Logo";

export interface AppNavItem {
  label: string;
  href: string;
  badge?: string;
}

/**
 * Shared chrome for the two authenticated-area surfaces. Deliberately distinct
 * from the marketing site: denser type, a persistent sidebar, and no marketing
 * navigation — the visitor here is working, not evaluating.
 */
export function AppShell({
  area,
  nav,
  user,
  children,
}: {
  area: "Client portal" | "Admin";
  nav: AppNavItem[];
  user: { name: string; detail: string; initials: string };
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mist-100">
      <div className="mx-auto flex max-w-[92rem] gap-0 px-0 lg:gap-8 lg:px-8 lg:py-8">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-8 rounded-panel border border-mist-200 bg-paper p-5">
            <Logo />
            <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-mist-500">
              {area}
            </p>

            <nav aria-label={`${area} navigation`} className="mt-4">
              <ul className="space-y-0.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center justify-between gap-2 rounded-card px-3 py-2 text-[0.88rem] font-medium text-ink-800 transition-colors hover:bg-mist-100 hover:text-brand-700"
                    >
                      {item.label}
                      {item.badge ? (
                        <span className="rounded-full bg-brand-50 px-1.5 py-0.5 font-mono text-[0.65rem] text-brand-700">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 border-t border-mist-200 pt-5">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-900 font-mono text-[0.7rem] text-accent-300">
                  {user.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[0.82rem] font-semibold text-ink-900">{user.name}</p>
                  <p className="truncate text-[0.72rem] text-mist-500">{user.detail}</p>
                </div>
              </div>
              <Link
                href="/"
                className="mt-4 block text-[0.78rem] text-mist-500 transition-colors hover:text-brand-700"
              >
                ← Back to the website
              </Link>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-0 lg:py-0">{children}</main>
      </div>
    </div>
  );
}

export function AppHeader({
  eyebrow,
  title,
  lede,
  actions,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5 border-b border-mist-200 pb-6">
      <div>
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brand-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-2xl text-ink-900 sm:text-3xl">{title}</h1>
        {lede ? <p className="mt-2 max-w-2xl text-[0.92rem] text-mist-600">{lede}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-panel border border-mist-200 bg-paper ${className}`}>
      <header className="flex items-center justify-between gap-4 border-b border-mist-200 px-5 py-3.5">
        <h2 className="text-[0.92rem] font-semibold text-ink-900">{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}

const statusTones: Record<string, string> = {
  "on-track": "bg-positive/10 text-positive ring-positive/20",
  "at-risk": "bg-caution/10 text-caution ring-caution/20",
  blocked: "bg-critical/10 text-critical ring-critical/20",
  done: "bg-positive/10 text-positive ring-positive/20",
  paid: "bg-positive/10 text-positive ring-positive/20",
  final: "bg-positive/10 text-positive ring-positive/20",
  won: "bg-positive/10 text-positive ring-positive/20",
  due: "bg-caution/10 text-caution ring-caution/20",
  open: "bg-mist-100 text-mist-700 ring-mist-300",
  upcoming: "bg-mist-100 text-mist-600 ring-mist-300",
  draft: "bg-mist-100 text-mist-600 ring-mist-300",
  sent: "bg-mist-100 text-mist-700 ring-mist-300",
  "in-progress": "bg-brand-50 text-brand-700 ring-brand-200",
  active: "bg-brand-50 text-brand-700 ring-brand-200",
  "in-review": "bg-brand-50 text-brand-700 ring-brand-200",
  viewed: "bg-brand-50 text-brand-700 ring-brand-200",
  negotiating: "bg-accent-50 text-accent-700 ring-accent-200",
  overdue: "bg-critical/10 text-critical ring-critical/20",
  lost: "bg-critical/10 text-critical ring-critical/20",
};

export function StatusBadge({ status }: { status: string }) {
  const tone = statusTones[status] ?? "bg-mist-100 text-mist-700 ring-mist-300";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.7rem] font-medium capitalize ring-1 ${tone}`}
    >
      {status.replace(/-/g, " ")}
    </span>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[0.72rem] text-mist-600">
        <span>{label ?? "Progress"}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist-200">
        <div
          className="h-full rounded-full bg-brand-600 transition-[width] duration-700 ease-out"
          style={{ width: `${value}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? "Progress"}
        />
      </div>
    </div>
  );
}

export function DemoNotice({ area, doc }: { area: string; doc: string }) {
  return (
    <div className="mb-6 rounded-card border border-accent-200 bg-accent-50 px-4 py-3">
      <p className="text-[0.82rem] leading-relaxed text-accent-700">
        <strong className="font-semibold">Demonstration data.</strong> This {area} renders fixture
        data so the layouts and states can be signed off before authentication and live queries are
        connected. The data shapes match <code className="font-mono text-[0.78rem]">db/schema.sql</code>;
        the integration steps are in <code className="font-mono text-[0.78rem]">{doc}</code>.
      </p>
    </div>
  );
}
