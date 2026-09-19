"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/site/Logo";
import { primaryNav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Route change closes everything; without this the mega-panel survives a
  // click on one of its own links. Done as a render-time adjustment rather
  // than an effect so the closed state is rendered in the same pass as the new
  // route, with no flash of an open panel.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenPanel(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || openPanel
          ? "border-mist-200 bg-paper/95 backdrop-blur-md"
          : "border-transparent bg-paper"
      }`}
      onMouseLeave={() => setOpenPanel(null)}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-card focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <div className="shell flex h-18 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <div key={item.label} onMouseEnter={() => setOpenPanel(item.panel ? item.label : null)}>
              <Link
                href={item.href}
                aria-expanded={item.panel ? openPanel === item.label : undefined}
                className={`inline-flex items-center gap-1.5 rounded-card px-3 py-2 text-[0.92rem] font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-brand-700"
                    : "text-ink-800 hover:text-brand-700"
                }`}
              >
                {item.label}
                {item.panel ? (
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className={`size-3 text-mist-400 transition-transform duration-200 ${
                      openPanel === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" />
                  </svg>
                ) : null}
              </Link>
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="text-sm font-medium text-mist-600 transition-colors hover:text-brand-700"
          >
            {site.phone}
          </a>
          <ButtonLink href="/contact" size="sm" className="group">
            Book a consultation
            <ArrowRight />
          </ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="grid size-10 place-items-center rounded-card border border-mist-200 text-ink-900 lg:hidden"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            {mobileOpen ? <path d="M5 5l10 10M15 5 5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      {/* --- Desktop mega-panel ------------------------------------------- */}
      {primaryNav.map((item) =>
        item.panel && openPanel === item.label ? (
          <div
            key={`${item.label}-panel`}
            className="absolute inset-x-0 top-full hidden border-b border-mist-200 bg-paper shadow-lift lg:block"
            style={{ animation: "as-fade 160ms var(--ease-standard) both" }}
          >
            <div className="shell grid grid-cols-12 gap-10 py-10">
              <div className="col-span-3">
                <h2 className="text-xl text-ink-900">{item.panel.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist-600">{item.panel.blurb}</p>
                <Link
                  href={item.href}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"
                >
                  All {item.label.toLowerCase()}
                  <ArrowRight />
                </Link>
              </div>

              {item.panel.columns.map((column) => (
                <div key={column.title} className="col-span-3">
                  <p className="font-sans text-eyebrow font-semibold uppercase text-mist-500">
                    {column.title}
                  </p>
                  <ul className="mt-4 space-y-1">
                    {column.items.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="group block rounded-card px-3 py-2.5 transition-colors hover:bg-mist-50"
                        >
                          <span className="block text-[0.93rem] font-semibold text-ink-900 group-hover:text-brand-700">
                            {child.label}
                          </span>
                          {child.description ? (
                            <span className="mt-0.5 block text-[0.8rem] leading-snug text-mist-500">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {item.panel.feature ? (
                <div className="col-span-3">
                  <div className="rounded-panel bg-ink-950 p-6 text-mist-200">
                    <p className="font-sans text-eyebrow font-semibold uppercase text-accent-300">
                      {item.panel.feature.eyebrow}
                    </p>
                    <p className="mt-3 font-serif text-lg leading-snug text-white">
                      {item.panel.feature.title}
                    </p>
                    <ButtonLink
                      href={item.panel.feature.href}
                      variant="onDark"
                      size="sm"
                      className="group mt-5"
                    >
                      {item.panel.feature.cta}
                      <ArrowRight />
                    </ButtonLink>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null,
      )}

      {/* --- Mobile drawer ------------------------------------------------ */}
      {mobileOpen ? (
        <div className="fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto border-t border-mist-200 bg-paper lg:hidden">
          <div className="shell py-6">
            <ul className="divide-y divide-mist-200">
              {primaryNav.map((item) => (
                <li key={item.label} className="py-2">
                  {item.panel ? (
                    <details>
                      <summary className="flex cursor-pointer list-none items-center justify-between py-2.5 text-base font-semibold text-ink-900">
                        {item.label}
                        <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3.5 text-mist-400" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                          <path d="M2.5 4.5 6 8l3.5-3.5" />
                        </svg>
                      </summary>
                      <div className="pb-3">
                        <Link href={item.href} className="block py-2 text-sm font-medium text-brand-700">
                          All {item.label.toLowerCase()}
                        </Link>
                        {item.panel.columns.flatMap((column) => column.items).map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-sm text-mist-700"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link href={item.href} className="block py-3 text-base font-semibold text-ink-900">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <ButtonLink href="/contact" size="lg" className="w-full">
                Book a consultation
              </ButtonLink>
              <ButtonLink href={`tel:${site.phoneHref}`} variant="secondary" size="lg" className="w-full">
                Call {site.phone}
              </ButtonLink>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
