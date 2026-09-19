import Link from "next/link";
import { ArrowRight } from "@/components/ui/Button";
import { LinkCard } from "@/components/ui/Card";
import { IconTile } from "@/components/ui/Icon";
import { Pill } from "@/components/ui/Text";
import { formatDate } from "@/lib/utils";
import type { Article, CaseStudy, Industry, Service } from "@/content/types";

export function ServiceCard({ service, tone = "light" }: { service: Service; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <LinkCard href={`/services/${service.slug}`} surface={dark ? "onDark" : "paper"} className="p-7">
      <IconTile name={service.icon} tone={dark ? "onDark" : "brand"} />
      <h3 className={`mt-6 text-xl ${dark ? "text-white" : "text-ink-900"}`}>{service.name}</h3>
      <p className={`mt-3 text-[0.95rem] leading-relaxed ${dark ? "text-mist-400" : "text-mist-600"}`}>
        {service.summary}
      </p>
      <p
        className={`mt-6 flex items-center gap-2 text-sm font-semibold ${dark ? "text-accent-300" : "text-brand-700"}`}
      >
        Explore the practice
        <ArrowRight />
      </p>
    </LinkCard>
  );
}

export function IndustryCard({ industry }: { industry: Industry }) {
  return (
    <LinkCard href={`/industries/${industry.slug}`} className="flex items-start gap-5 p-6">
      <IconTile name={industry.icon} />
      <div className="min-w-0">
        <h3 className="text-lg text-ink-900 group-hover:text-brand-700">{industry.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mist-600">{industry.headline}</p>
        <p className="mt-4 flex items-center gap-2 text-[0.82rem] font-semibold text-brand-700">
          Sector practice
          <ArrowRight />
        </p>
      </div>
    </LinkCard>
  );
}

export function CaseStudyCard({
  study,
  featured = false,
}: {
  study: CaseStudy;
  featured?: boolean;
}) {
  return (
    <LinkCard
      href={`/case-studies/${study.slug}`}
      className={`flex flex-col p-7 ${featured ? "lg:p-9" : ""}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone="brand">{study.industry}</Pill>
        <Pill>{study.duration}</Pill>
      </div>

      <h3
        className={`mt-5 text-ink-900 group-hover:text-brand-700 ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}
      >
        {study.title}
      </h3>

      <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-600">{study.challenge}</p>

      <div className="mt-6 flex items-baseline gap-3 border-t border-mist-200 pt-5">
        <span className="font-serif text-3xl leading-none text-brand-700">
          {study.headlineResult.value}
        </span>
        <span className="text-sm text-mist-600">{study.headlineResult.label}</span>
      </div>

      <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-700">
        Read the case study
        <ArrowRight />
      </p>
    </LinkCard>
  );
}

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  return (
    <LinkCard href={`/insights/${article.slug}`} className={compact ? "p-6" : "p-7"}>
      <div className="flex flex-wrap items-center gap-2">
        <Pill tone={article.type === "pillar" ? "accent" : "neutral"}>
          {article.type === "pillar" ? "Pillar guide" : article.category}
        </Pill>
        <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
          {article.readingMinutes} min read
        </span>
      </div>

      <h3
        className={`mt-4 text-ink-900 group-hover:text-brand-700 ${compact ? "text-lg" : "text-xl"}`}
      >
        {article.title}
      </h3>

      <p className="mt-3 text-[0.9rem] leading-relaxed text-mist-600">{article.excerpt}</p>

      <p className="mt-5 text-[0.78rem] text-mist-500">
        {article.author} · {formatDate(article.publishedAt)}
      </p>
    </LinkCard>
  );
}

export function QuietLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
    >
      {children}
      <ArrowRight />
    </Link>
  );
}
