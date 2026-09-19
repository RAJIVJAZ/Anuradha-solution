import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CaseStudyCard, QuietLink, ServiceCard } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading, StatBlock } from "@/components/ui/Text";
import { Counter } from "@/components/viz/Counter";
import { Visual } from "@/components/viz/Visual";
import { getCaseStudy } from "@/content/case-studies";
import { getIndustry, industries, industrySlugs } from "@/content/industries";
import { getService } from "@/content/services";
import {
  JsonLd,
  breadcrumbGraph,
  faqGraph,
  industryGraph,
  pageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};

  return pageMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    keywords: industry.seo.keywords,
    path: `/industries/${industry.slug}`,
    ogSubtitle: `${industry.name} practice`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  const relatedServices = industry.services
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const relatedCases = industry.caseStudies
    .map((caseSlug) => getCaseStudy(caseSlug))
    .filter((study): study is NonNullable<typeof study> => Boolean(study));

  const otherIndustries = industries.filter((item) => item.slug !== industry.slug);

  return (
    <>
      <JsonLd
        graph={[breadcrumbGraph(trail), industryGraph(industry), faqGraph(industry.faqs)]}
      />

      <PageHero
        trail={trail}
        eyebrow={industry.eyebrow}
        title={industry.headline}
        lede={industry.summary}
        actions={
          <>
            <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
              Talk to the {industry.name.toLowerCase()} desk
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="#benchmarks" variant="onDarkGhost" size="lg">
              See benchmarks
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
              Sector visual
            </p>
            <Visual name={industry.visual} tone="dark" className="mt-5 text-mist-300" />
          </div>
        }
      />

      {/* ============ Market context =================================== */}
      <Section size="tight">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-brand-600 lg:col-span-3">
              The opportunity, honestly
            </p>
            <p className="text-xl leading-relaxed text-ink-800 lg:col-span-9 sm:text-2xl" data-reveal>
              {industry.marketContext}
            </p>
          </div>
        </Container>
      </Section>

      {/* ============ Benchmarks ======================================= */}
      <Section id="benchmarks" tone="ink" size="tight" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
        <Container className="relative">
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-accent-300">
            {industry.name} benchmarks
          </p>
          <dl className="mt-9 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {industry.benchmarks.map((benchmark, index) => (
              <div
                key={benchmark.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <dd className="font-serif text-3xl leading-none tracking-tight text-accent-300 sm:text-4xl">
                  <Counter value={benchmark.value} />
                </dd>
                <dt className="mt-3 text-sm font-semibold text-white">{benchmark.label}</dt>
                {benchmark.detail ? (
                  <p className="mt-1 text-[0.82rem] text-mist-400">{benchmark.detail}</p>
                ) : null}
              </div>
            ))}
          </dl>
          <p className="mt-10 max-w-2xl text-[0.82rem] text-mist-500">
            Indicative ranges from our own delivered engagements at 2025–26 prices. They are
            published so you can sanity-check a quotation, not so you can budget a project.
          </p>
        </Container>
      </Section>

      {/* ============ Challenges ====================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What makes this sector hard"
            title={`The five things that break ${industry.name.toLowerCase()} projects`}
            lede="Not a risk register. These are the specific failures we have been called in to fix, more than once each."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industry.challenges.map((challenge, index) => (
              <Card key={challenge.title} className="p-7">
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <span className="font-mono text-xs text-mist-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg text-ink-900">{challenge.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mist-600">
                    {challenge.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ Playbook ======================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Our playbook"
            title={`How we approach a ${industry.name.toLowerCase()} engagement`}
          />

          <ol className="mt-14 space-y-px overflow-hidden rounded-panel border border-mist-200 bg-paper">
            {industry.playbook.map((item, index) => (
              <li
                key={item.title}
                className="grid gap-4 border-b border-mist-200 p-7 last:border-0 sm:grid-cols-12 sm:gap-8"
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <div className="sm:col-span-4">
                  <span className="font-mono text-sm text-brand-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg text-ink-900">{item.title}</h3>
                </div>
                <p className="text-[0.98rem] leading-relaxed text-mist-600 sm:col-span-8">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============ Schemes ========================================= */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Funding & schemes"
            title={`What ${industry.name.toLowerCase()} projects can actually claim`}
            lede="Indicative only — eligibility, quantum and windows change with each policy cycle, and sequence matters more than eligibility."
            action={<QuietLink href="/services/subsidies-compliance">Subsidies & compliance practice</QuietLink>}
          />

          <div className="mt-14 overflow-hidden rounded-panel border border-mist-200">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">
                Funding schemes relevant to {industry.name} projects
              </caption>
              <thead className="bg-mist-50">
                <tr>
                  <th scope="col" className="px-6 py-4 font-sans text-[0.68rem] uppercase tracking-wider text-mist-600">
                    Scheme
                  </th>
                  <th scope="col" className="px-6 py-4 font-sans text-[0.68rem] uppercase tracking-wider text-mist-600">
                    Administering body
                  </th>
                  <th scope="col" className="px-6 py-4 font-sans text-[0.68rem] uppercase tracking-wider text-mist-600">
                    Indicative benefit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-200 bg-paper">
                {industry.schemes.map((scheme) => (
                  <tr key={scheme.name}>
                    <th scope="row" className="px-6 py-5 align-top font-semibold text-ink-900">
                      {scheme.name}
                    </th>
                    <td className="px-6 py-5 align-top text-mist-600">{scheme.body}</td>
                    <td className="px-6 py-5 align-top leading-relaxed text-mist-700">
                      {scheme.benefit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ============ Services applied ================================ */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Services we apply here"
            title={`The practices that do ${industry.name.toLowerCase()} work`}
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((service, index) => (
              <div
                key={service.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ Case studies ==================================== */}
      {relatedCases.length ? (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="Proof in this sector"
              title={`${industry.name} engagements, with the numbers`}
              action={<QuietLink href="/case-studies">All case studies</QuietLink>}
            />
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {relatedCases.map((study, index) => (
                <div
                  key={study.slug}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                >
                  <CaseStudyCard study={study} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ============ FAQs =========================================== */}
      <Section tone="mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow="Sector questions"
                title={`${industry.name}: what promoters ask us`}
              />
              <div className="mt-8 rounded-panel border border-mist-200 bg-paper p-6">
                <StatBlock
                  value={industry.benchmarks[0]?.value ?? "—"}
                  label={industry.benchmarks[0]?.label ?? ""}
                  detail={industry.benchmarks[0]?.detail}
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={industry.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ Other sectors ================================== */}
      <Section size="tight">
        <Container>
          <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
            Other industry practices
          </p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {otherIndustries.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/industries/${other.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-mist-200 px-4 py-2 text-sm text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {other.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        eyebrow={`${industry.name} practice`}
        title={`Bring us a ${industry.name.toLowerCase()} project`}
        body="Forty-five minutes with the partner who runs this sector. You will get a view on feasibility, an indicative capital range and an honest read on whether the timing is right."
        secondary={{ label: "Read the sector guides", href: "/insights" }}
      />
    </>
  );
}
