import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading } from "@/components/ui/Text";
import { articlesByCluster, articlesByDate, pillarArticles } from "@/content/insights";
import { formatDate } from "@/lib/utils";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export const metadata: Metadata = pageMetadata({
  title: "Insights — Benchmarks and Guides for Indian MSMEs",
  description:
    "Capital cost benchmarks, subsidy sequencing, DPR structure, unit economics, automation and branding guides for Indian manufacturing, dairy and food processing businesses.",
  path: "/insights",
  ogSubtitle: "Written from engagements, not content briefs",
});

export default function InsightsIndexPage() {
  const clusters = Object.entries(articlesByCluster).sort(([a], [b]) => a.localeCompare(b));

  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="Insights"
        title="The benchmarks we wish someone had published"
        lede="Capital cost ranges, subsidy sequencing, DPR structure and costing method — taken from delivered engagements. If a number here is wrong for your project, tell us and we will correct it."
        meta={[
          { label: "Articles", value: String(articlesByDate.length) },
          { label: "Pillar guides", value: String(pillarArticles.length) },
          { label: "Topic clusters", value: String(clusters.length) },
          { label: "Updated", value: formatDate(articlesByDate[0]!.updatedAt ?? articlesByDate[0]!.publishedAt) },
        ]}
      />

      {/* ============ Pillar guides =================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Start here"
            title="Four pillar guides"
            lede="Each one is the complete answer to a question we get asked weekly, and each anchors a cluster of supporting articles."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {pillarArticles.map((article, index) => (
              <Card key={article.slug} className="p-8">
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="accent">Pillar guide</Pill>
                    <Pill>{article.cluster}</Pill>
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                      {article.readingMinutes} min
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl text-ink-900">
                    <Link href={`/insights/${article.slug}`} className="hover:text-brand-700">
                      {article.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-600">
                    {article.excerpt}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-mist-200 pt-5">
                    {article.keyTakeaways.slice(0, 3).map((takeaway) => (
                      <li key={takeaway.slice(0, 30)} className="flex gap-2.5 text-[0.86rem] leading-snug text-mist-700">
                        <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 size-3 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6.5 4.5 9 10 3" />
                        </svg>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ By cluster ===================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="By topic"
            title="Everything, grouped by cluster"
            lede="Clusters mirror how we work: dairy, funding, subsidies, operations, growth and brand."
          />

          <div className="mt-14 space-y-16">
            {clusters.map(([cluster, clusterArticles]) => (
              <div key={cluster}>
                <div className="flex items-baseline justify-between gap-4 border-b border-mist-300 pb-4">
                  <h3 className="text-xl text-ink-900">{cluster}</h3>
                  <span className="font-mono text-[0.72rem] text-mist-500">
                    {clusterArticles.length} article{clusterArticles.length === 1 ? "" : "s"}
                  </span>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {clusterArticles.map((article, index) => (
                    <div
                      key={article.slug}
                      data-reveal
                      style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                    >
                      <ArticleCard article={article} compact />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Ask us directly"
        title="Is there a benchmark you need that we have not published?"
        body="Tell us what number you are trying to sanity-check. If we have it, we will send it; if we do not, we will say so rather than guess."
        secondary={{ label: "Resource library", href: "/resources" }}
      />
    </>
  );
}
