import Link from "next/link";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { articlesByDate } from "@/content/insights";
import { services } from "@/content/services";

export default function NotFound() {
  return (
    <Section tone="ink" size="loose" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
      <Container className="relative">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-accent-300">
          404 — page not found
        </p>
        <h1 className="mt-5 max-w-2xl text-display-sm text-white sm:text-display-md">
          That page does not exist, or it moved when we rebuilt the site
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-300">
          Here are the pages people usually want. If you arrived from a link somewhere, tell us where
          and we will fix it.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="onDark" size="lg" className="group">
            Go to the homepage
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/contact" variant="onDarkGhost" size="lg">
            Report a broken link
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
              Services
            </p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-[0.92rem] text-mist-300 transition-colors hover:text-accent-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
              Recent insights
            </p>
            <ul className="mt-4 space-y-2">
              {articlesByDate.slice(0, 6).map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="text-[0.92rem] text-mist-300 transition-colors hover:text-accent-300"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
