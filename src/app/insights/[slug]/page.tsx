import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleBody, ArticleToc } from "@/components/site/ArticleBody";
import { ArticleCard, QuietLink } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { Breadcrumbs } from "@/components/site/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading } from "@/components/ui/Text";
import { articleSlugs, articles, getArticle } from "@/content/insights";
import { getService } from "@/content/services";
import { formatDate } from "@/lib/utils";
import {
  JsonLd,
  articleGraph,
  breadcrumbGraph,
  faqGraph,
  pageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return pageMetadata({
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    ogSubtitle: article.cluster,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: article.title, path: `/insights/${article.slug}` },
  ];

  const relatedServices = article.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  // Same cluster first, then anything else, so internal links reinforce the
  // topic cluster rather than scattering authority.
  const sameCluster = articles.filter(
    (item) => item.cluster === article.cluster && item.slug !== article.slug,
  );
  const related = [
    ...sameCluster,
    ...articles.filter(
      (item) => item.cluster !== article.cluster && item.slug !== article.slug,
    ),
  ].slice(0, 3);

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbGraph(trail),
          articleGraph(article),
          ...(article.faqs?.length ? [faqGraph(article.faqs)] : []),
        ]}
      />

      {/* ============ Article header ================================= */}
      <Section tone="paper" size="tight" className="border-b border-mist-200">
        <Container>
          <Breadcrumbs trail={trail} tone="light" />

          <div className="mt-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone={article.type === "pillar" ? "accent" : "brand"}>
                {article.type === "pillar" ? "Pillar guide" : article.category}
              </Pill>
              <Pill>{article.cluster}</Pill>
              <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                {article.readingMinutes} min read
              </span>
            </div>

            <h1 className="mt-6 text-display-sm text-ink-900 sm:text-display-md">
              {article.title}
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-mist-600 sm:text-xl">
              {article.excerpt}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mist-600">
              <span>
                By <span className="font-semibold text-ink-900">{article.author}</span>
              </span>
              <span>Published {formatDate(article.publishedAt)}</span>
              {article.updatedAt ? <span>Updated {formatDate(article.updatedAt)}</span> : null}
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ Body =========================================== */}
      <Section size="base">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sidebar */}
            <aside className="space-y-6 lg:col-span-4 lg:order-2">
              <div className="lg:sticky lg:top-24 lg:space-y-6">
                <ArticleToc sections={article.sections} />

                <div className="rounded-panel border border-brand-200 bg-brand-50 p-6">
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-brand-700">
                    Key takeaways
                  </p>
                  <ul className="mt-4 space-y-3">
                    {article.keyTakeaways.map((takeaway) => (
                      <li
                        key={takeaway.slice(0, 30)}
                        className="flex gap-2.5 text-[0.86rem] leading-snug text-ink-800"
                      >
                        <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 size-3 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6.5 4.5 9 10 3" />
                        </svg>
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>

                {relatedServices.length ? (
                  <div className="rounded-panel border border-mist-200 p-6">
                    <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                      We do this work
                    </p>
                    <ul className="mt-4 space-y-2">
                      {relatedServices.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/services/${service.slug}`}
                            className="text-[0.88rem] font-medium text-brand-700 hover:text-brand-800"
                          >
                            {service.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ButtonLink href="/contact" size="sm" className="mt-5 w-full">
                      Book a discovery call
                    </ButtonLink>
                  </div>
                ) : null}
              </div>
            </aside>

            {/* Article */}
            <article className="lg:col-span-8 lg:order-1">
              <ArticleBody sections={article.sections} />

              {article.faqs?.length ? (
                <div className="mt-16 border-t border-mist-200 pt-10">
                  <h2 className="text-2xl text-ink-900">Frequently asked questions</h2>
                  <div className="mt-6">
                    <Accordion items={article.faqs} />
                  </div>
                </div>
              ) : null}

              <div className="mt-14 rounded-panel border border-mist-200 bg-mist-50 p-7">
                <p className="text-sm font-semibold text-ink-900">
                  A note on the numbers in this article
                </p>
                <p className="mt-2 text-[0.88rem] leading-relaxed text-mist-600">
                  Benchmarks come from engagements we have delivered and are indicative at 2025–26
                  prices. Scheme details, rates and eligibility change with each policy cycle — verify
                  the current position before you commit capital. Nothing here is legal, tax or
                  investment advice.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* ============ Related ======================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Keep reading"
            title={`More on ${article.cluster.toLowerCase()} and adjacent topics`}
            action={<QuietLink href="/insights">Insights hub</QuietLink>}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {related.map((item, index) => (
              <div
                key={item.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <ArticleCard article={item} compact />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="From reading to doing"
        title="Want this applied to your own numbers?"
        body="Send us your project and we will tell you which of the benchmarks above apply and where your situation differs. No obligation, and no deck."
        secondary={{ label: "Download the templates", href: "/resources" }}
      />
    </>
  );
}
