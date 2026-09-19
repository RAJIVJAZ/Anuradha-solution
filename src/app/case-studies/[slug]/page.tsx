import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CaseStudyCard, QuietLink } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading, StatBlock } from "@/components/ui/Text";
import { Visual } from "@/components/viz/Visual";
import { caseStudies, caseStudySlugs, getCaseStudy } from "@/content/case-studies";
import { getService } from "@/content/services";
import { JsonLd, breadcrumbGraph, caseStudyGraph, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return pageMetadata({
    title: study.seo.title,
    description: study.seo.description,
    keywords: study.seo.keywords,
    path: `/case-studies/${study.slug}`,
    type: "article",
    ogSubtitle: `${study.headlineResult.value} · ${study.headlineResult.label}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" },
    { name: study.client, path: `/case-studies/${study.slug}` },
  ];

  const engagedServices = study.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const others = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 2);

  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail), caseStudyGraph(study)]} />

      <PageHero
        trail={trail}
        eyebrow={`${study.industry} · Case study`}
        title={study.title}
        lede={study.challenge}
        meta={[
          { label: "Client", value: study.anonymised ? "Name withheld" : study.client },
          { label: "Location", value: study.location },
          { label: "Duration", value: study.duration },
          { label: "Engagement", value: study.engagementModel },
        ]}
        actions={
          <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
            Discuss a similar project
            <ArrowRight />
          </ButtonLink>
        }
        aside={
          <div className="rounded-panel border border-accent-300/25 bg-accent-300/[0.07] p-7">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-accent-300">
              Headline result
            </p>
            <p className="mt-4 font-serif text-5xl leading-none text-white">
              {study.headlineResult.value}
            </p>
            <p className="mt-4 text-sm font-semibold text-white">{study.headlineResult.label}</p>
            {study.headlineResult.detail ? (
              <p className="mt-1 text-sm text-mist-400">{study.headlineResult.detail}</p>
            ) : null}
          </div>
        }
      />

      {/* ============ Context ========================================== */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="The situation" title="What we walked into" />
              <div className="mt-8 flex flex-wrap gap-2">
                {engagedServices.map((service) => (
                  <Link key={service.slug} href={`/services/${service.slug}`}>
                    <Pill tone="brand">{service.name}</Pill>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-5 lg:col-span-8">
              {study.context.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[1.05rem] leading-relaxed text-mist-700"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ Approach ========================================= */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="What we did"
            title="The engagement, phase by phase"
            lede="Including the phase the client least enjoyed, which in most of our case studies is the second one."
          />

          <ol className="mt-14 space-y-5">
            {study.approach.map((phase, index) => (
              <li key={phase.phase}>
                <Card className="p-7 lg:p-8">
                  <div
                    className="grid gap-5 lg:grid-cols-12 lg:gap-10"
                    data-reveal
                    style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                  >
                    <div className="lg:col-span-4">
                      <p className="font-mono text-[0.68rem] uppercase tracking-wider text-brand-600">
                        {phase.phase}
                      </p>
                      <h3 className="mt-3 text-xl text-ink-900">{phase.title}</h3>
                    </div>
                    <p className="text-[1rem] leading-relaxed text-mist-700 lg:col-span-8">
                      {phase.detail}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============ Results ========================================== */}
      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="Measured outcome"
            title="The numbers, with their baselines"
            lede="These are the metrics written into the engagement letter before work started."
          />

          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {study.results.map((result, index) => (
              <div
                key={result.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <StatBlock
                  tone="dark"
                  value={result.value}
                  label={result.label}
                  detail={result.detail}
                />
              </div>
            ))}
          </dl>

          <div className="mt-16 rounded-panel border border-white/10 bg-white/[0.03] p-7">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
              Engagement visual
            </p>
            <Visual name={study.visual} tone="dark" className="mt-6 text-mist-300" />
          </div>
        </Container>
      </Section>

      {/* ============ Quote ============================================ */}
      <Section>
        <Container>
          <figure className="mx-auto max-w-3xl text-center" data-reveal>
            <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-auto size-8 text-accent-400" fill="currentColor">
              <path d="M9.5 6C6.5 7.5 5 10 5 13v5h5v-5H7.5c0-2 .8-3.5 2.5-4.5L9.5 6Zm9 0C15.5 7.5 14 10 14 13v5h5v-5h-2.5c0-2 .8-3.5 2.5-4.5L18.5 6Z" />
            </svg>
            <blockquote className="mt-7 font-serif text-2xl leading-snug text-ink-900 sm:text-3xl">
              {study.quote.text}
            </blockquote>
            <figcaption className="mt-7 text-sm text-mist-600">
              <span className="font-semibold text-ink-900">{study.quote.author}</span> ·{" "}
              {study.quote.role}
            </figcaption>
          </figure>
        </Container>
      </Section>

      {/* ============ Related ========================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="More engagements"
            title="Other case studies"
            action={<QuietLink href="/case-studies">All case studies</QuietLink>}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {others.map((other, index) => (
              <div
                key={other.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <CaseStudyCard study={other} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow={study.industry}
        title="Bring us the version of this problem you have"
        body="We will tell you on the first call whether it looks like the engagement above, and roughly what the equivalent work would cost."
        secondary={{ label: "See the practices involved", href: "/services" }}
      />
    </>
  );
}
