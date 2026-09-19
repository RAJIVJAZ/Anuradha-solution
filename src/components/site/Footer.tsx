import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { footerNav, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-mist-300">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="dark" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-mist-400">
              {site.shortDescription}
            </p>

            <div className="mt-8 space-y-1.5 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="block text-mist-200 transition-colors hover:text-accent-300"
              >
                {site.email}
              </a>
              <a
                href={`tel:${site.phoneHref}`}
                className="block text-mist-200 transition-colors hover:text-accent-300"
              >
                {site.phone}
              </a>
            </div>

            <ul className="mt-8 flex gap-4 text-sm">
              <li>
                <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="text-mist-400 transition-colors hover:text-accent-300">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.social.youtube} target="_blank" rel="noreferrer" className="text-mist-400 transition-colors hover:text-accent-300">
                  YouTube
                </a>
              </li>
              <li>
                <a href={site.social.x} target="_blank" rel="noreferrer" className="text-mist-400 transition-colors hover:text-accent-300">
                  X
                </a>
              </li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            {footerNav.map((column) => (
              <div key={column.title}>
                <p className="font-sans text-eyebrow font-semibold uppercase text-mist-500">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.9rem] text-mist-300 transition-colors hover:text-accent-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <p className="font-sans text-eyebrow font-semibold uppercase text-mist-500">
              The Growth Brief
            </p>
            <p className="mt-4 text-[0.9rem] leading-relaxed text-mist-400">
              One email a fortnight: a scheme deadline, a plant cost benchmark, and one thing we got
              wrong. Read by 4,200+ MSME founders.
            </p>
            <NewsletterForm className="mt-5" />

            <div className="mt-10 space-y-5">
              {site.offices.map((office) => (
                <div key={office.city}>
                  <p className="text-sm font-semibold text-white">
                    {office.city}
                    <span className="ml-2 font-normal text-mist-500">{office.role}</span>
                  </p>
                  {office.lines.map((line) => (
                    <p key={line} className="text-[0.82rem] leading-relaxed text-mist-400">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.82rem] text-mist-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/legal/privacy" className="transition-colors hover:text-accent-300">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="transition-colors hover:text-accent-300">
                Terms of engagement
              </Link>
            </li>
            <li>
              <Link href="/legal/disclosure" className="transition-colors hover:text-accent-300">
                Fee & disclosure policy
              </Link>
            </li>
            <li>
              <Link href="/sitemap.xml" className="transition-colors hover:text-accent-300">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
