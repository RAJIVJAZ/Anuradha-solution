import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Text";
import type { ReactNode } from "react";

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ trail, tone = "dark" }: { trail: Crumb[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem]">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span className={dark ? "text-mist-400" : "text-mist-500"} aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className={`transition-colors ${dark ? "text-mist-300 hover:text-accent-300" : "text-mist-600 hover:text-brand-700"}`}
                  >
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className={dark ? "text-mist-600" : "text-mist-400"}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Standard interior page header: dark band, breadcrumbs, eyebrow, H1, lede and
 * an optional visual on the right at large sizes.
 */
export function PageHero({
  trail,
  eyebrow,
  title,
  lede,
  meta,
  actions,
  aside,
}: {
  trail: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
  meta?: { label: string; value: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink-950 text-mist-200">
      <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -right-32 -top-40 size-96 rounded-full bg-brand-600/20 blur-3xl"
      />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <Breadcrumbs trail={trail} />

        <div className={`mt-8 gap-12 ${aside ? "lg:grid lg:grid-cols-12" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-3xl"} data-reveal>
            {eyebrow ? <Eyebrow tone="onDark">{eyebrow}</Eyebrow> : null}
            <h1 className="mt-4 text-display-sm text-white sm:text-display-md lg:text-display-lg">
              {title}
            </h1>
            {lede ? (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-300 sm:text-xl">
                {lede}
              </p>
            ) : null}

            {meta?.length ? (
              <dl className="mt-9 grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-white">{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
          </div>

          {aside ? (
            <div
              className="mt-12 lg:col-span-5 lg:mt-0"
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
