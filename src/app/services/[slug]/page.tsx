import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArticleCard, IndustryCard, QuietLink } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading, StatBlock } from "@/components/ui/Text";
import { Visual } from "@/components/viz/Visual";
import { getArticle } from "@/content/insights";
import { industries } from "@/content/industries";
import { getService, services, serviceSlugs } from "@/content/services";
import {
  JsonLd,
  breadcrumbGraph,
  faqGraph,
  pageMetadata,
  serviceGraph,
} from "@/lib/seo";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.seo.title,
    description: service.seo.description,
    keywords: service.seo.keywords,
    path: `/services/${service.slug}`,
    ogSubtitle: service.promise,
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];

  const relatedIndustries = industries.filter((industry) =>
    service.industries.includes(industry.name),
  );
  const relatedArticles = service.relatedInsights
    .map((articleSlug) => getArticle(articleSlug))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        graph={[breadcrumbGraph(trail), serviceGraph(service), faqGraph(service.faqs)]}
      />

      <PageHero
        trail={trail}
        eyebrow={service.eyebrow}
        title={service.headline}
        lede={service.summary}
        actions={
          <>
            <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
              Book a discovery call
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#engagement-models" variant="onDarkGhost" size="lg">
              See fees
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
              Typical outcome profile
            </p>
            <Visual name={service.visual} tone="dark" className="mt-5 text-mist-300" />
          </div>
        }
      />

      {/* ============ Problems we are called about ====================== */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="You are probably here because"
                title="One of these sounds familiar"
              />
            </div>
            <ul className="space-y-4 lg:col-span-7">
              {service.problems.map((problem, index) => (
                <li
                  key={problem}
                  className="flex gap-4 border-b border-mist-200 pb-4 last:border-0"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <span className="mt-1 font-mono text-xs text-mist-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[1.02rem] leading-relaxed text-ink-800">{problem}</p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ============ Approach ========================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Our approach"
            title="How we actually do this work"
            lede="Not a methodology diagram. This is the sequence, in order, with the uncomfortable parts left in."
          />

          <ol className="mt-14 space-y-px overflow-hidden rounded-panel border border-mist-200 bg-paper">
            {service.approach.map((step, index) => (
              <li
                key={step.step}
                className="grid gap-4 border-b border-mist-200 p-7 last:border-0 sm:grid-cols-12 sm:gap-8"
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <div className="sm:col-span-3">
                  <span className="font-mono text-sm text-brand-600">{step.step}</span>
                  <h3 className="mt-2 text-lg text-ink-900">{step.title}</h3>
                </div>
                <p className="text-[0.98rem] leading-relaxed text-mist-600 sm:col-span-9">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============ Deliverables ====================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What you receive"
            title="Deliverables, with the week they land"
            lede="Every item below appears in the engagement letter with a date against it. If a date slips, you hear it from us first."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {service.deliverables.map((deliverable, index) => (
              <Card key={deliverable.title} className="p-7">
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg text-ink-900">{deliverable.title}</h3>
                    <Pill tone="brand">{deliverable.timeline}</Pill>
                  </div>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-mist-600">
                    {deliverable.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ Outcomes ========================================== */}
      <Section tone="ink" size="tight" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <h2 className="text-display-sm text-white">Measured results</h2>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-mist-400">
                Medians across delivered engagements in this practice, not best cases. Our full
                methodology is in the{" "}
                <Link href="/about" className="text-accent-300 underline underline-offset-2">
                  about page
                </Link>
                .
              </p>
            </div>
            <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-8">
              {service.outcomes.map((outcome, index) => (
                <div
                  key={outcome.label}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                >
                  <StatBlock
                    tone="dark"
                    value={outcome.value}
                    label={outcome.label}
                    detail={outcome.detail}
                  />
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* ============ Engagement models ================================= */}
      <Section id="engagement-models" tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Indicative fees, published"
            lede="Final fees depend on scope, travel and project size, and are fixed in the engagement letter before work starts. There are no hourly surprises."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {service.tiers.map((tier, index) => (
              <Card
                key={tier.name}
                className={`flex flex-col p-7 ${index === 1 ? "ring-2 ring-brand-500" : ""}`}
              >
                <div
                  className="flex flex-1 flex-col"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg text-ink-900">{tier.name}</h3>
                    <Pill tone={tier.model === "Success fee" ? "accent" : "neutral"}>
                      {tier.model}
                    </Pill>
                  </div>
                  <p className="mt-4 font-serif text-2xl text-brand-700">{tier.price}</p>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-mist-600">{tier.bestFor}</p>
                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-mist-200 pt-5">
                    {tier.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink-800">
                        <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 size-3 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6.5 4.5 9 10 3" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink
                    href="/contact"
                    variant={index === 1 ? "primary" : "secondary"}
                    className="mt-7 w-full"
                  >
                    Discuss this scope
                  </ButtonLink>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ Industries served ================================= */}
      {relatedIndustries.length ? (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Where we apply it"
              title={`${service.name} in the sectors we know`}
              action={<QuietLink href="/industries">All industry practices</QuietLink>}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedIndustries.map((industry, index) => (
                <div
                  key={industry.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <IndustryCard industry={industry} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ============ FAQs ============================================== */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Questions"
                title="What clients ask before engaging"
                lede="If your question is not here, ask it on the call. We answer pricing and scope questions directly."
              />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={service.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ Related reading =================================== */}
      {relatedArticles.length ? (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Related reading"
              title="Before you engage anyone, read these"
              action={<QuietLink href="/insights">Insights hub</QuietLink>}
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {relatedArticles.map((article, index) => (
                <div
                  key={article.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <ArticleCard article={article} compact />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ============ Other practices =================================== */}
      <Section tone="mist" size="tight">
        <Container>
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
            Other practices
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {otherServices.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-card border border-mist-200 bg-paper px-5 py-4 transition-colors hover:border-brand-300"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink-900 group-hover:text-brand-700">
                      {other.name}
                    </span>
                    <span className="mt-0.5 block text-[0.78rem] text-mist-500">{other.promise}</span>
                  </span>
                  <ArrowRight className="text-brand-600" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        eyebrow={service.eyebrow}
        title={`Talk to the partner who runs ${service.name.toLowerCase()}`}
        body="Forty-five minutes, no deck, no junior. You will leave the call knowing whether this is the right work for you and roughly what it costs."
        secondary={{ label: "See case studies", href: "/case-studies" }}
      />
    </>
  );
}
