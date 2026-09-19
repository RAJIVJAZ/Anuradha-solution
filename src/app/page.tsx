import type { Metadata } from "next";
import {
  ArticleCard,
  CaseStudyCard,
  IndustryCard,
  QuietLink,
  ServiceCard,
} from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow, Pill, SectionHeading } from "@/components/ui/Text";
import { Counter } from "@/components/viz/Counter";
import { GrowthCurve } from "@/components/viz/GrowthCurve";
import { articlesByDate } from "@/content/insights";
import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Growth, Factory Setup, Funding & Branding for Indian MSMEs`,
  description:
    "Niche advisory for Indian MSMEs in manufacturing, dairy and food processing. ₹640 Cr funded, 42 plants commissioned, median 3.1x revenue growth. Strategy, DPR, factory setup, subsidy and brand.",
  path: "/",
  ogSubtitle: site.tagline,
  keywords: [
    "business consultant India MSME",
    "dairy consultant India",
    "food processing consultant",
    "DPR consultant",
    "factory setup consultant",
    "subsidy consultant India",
  ],
});

export default function HomePage() {
  const featuredCases = caseStudies.slice(0, 3);
  const featuredArticles = articlesByDate.slice(0, 3);

  return (
    <>
      <JsonLd graph={[breadcrumbGraph([{ name: "Home", path: "/" }])]} />

      {/* ================= Hero ========================================== */}
      <section className="relative overflow-hidden bg-ink-950 text-mist-200">
        <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-40" />
        <div
          aria-hidden="true"
          className="absolute -left-40 top-1/4 size-[30rem] rounded-full bg-brand-600/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-20 -top-32 size-[26rem] rounded-full bg-accent-500/10 blur-3xl"
        />

        <Container className="relative py-16 sm:py-24 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6" data-reveal>
              <Eyebrow tone="onDark">MSME · Manufacturing · Dairy · Food processing</Eyebrow>

              <h1 className="mt-6 text-display-md text-white sm:text-display-lg lg:text-display-xl">
                Helping manufacturing and food businesses scale from{" "}
                <span className="text-accent-300">₹1 crore to ₹100 crore</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist-300 sm:text-xl">
                Strategy. Funding. Factory setup. Branding. We take no commissions from machinery
                suppliers or lenders, which is why we can tell you when a project is too big.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
                  Book a consultation
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/case-studies" variant="onDarkGhost" size="lg">
                  View case studies
                </ButtonLink>
              </div>

              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.82rem] text-mist-400">
                {site.credentials.map((credential) => (
                  <li key={credential} className="flex items-center gap-2">
                    <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 text-brand-400" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 6.5 4.5 9 10 3" />
                    </svg>
                    {credential}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="lg:col-span-6"
              data-reveal
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              <div className="rounded-panel border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                      Portfolio outcome
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      Median client revenue path
                    </p>
                  </div>
                  <Pill tone="onDark">n = 41 engagements</Pill>
                </div>
                <GrowthCurve className="mt-6 text-mist-300" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= Proof strip =================================== */}
      <Section tone="mist" size="tight">
        <Container>
          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {site.proof.map((item, index) => (
              <div
                key={item.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <dd className="font-serif text-4xl leading-none tracking-tight text-brand-700 sm:text-5xl">
                  <Counter value={item.value} />
                </dd>
                <dt className="mt-3 text-sm font-semibold text-ink-900">{item.label}</dt>
                <p className="mt-1 text-sm text-mist-600">{item.detail}</p>
              </div>
            ))}
          </dl>

          <div className="mt-14 border-t border-mist-200 pt-10">
            <p className="mb-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.18em] text-mist-500">
              Selected clients
            </p>
            <LogoMarquee />
          </div>
        </Container>
      </Section>

      {/* ================= Industries ==================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Industries served"
            title="We only take work in sectors where we already know the machinery and the regulator"
            lede="Depth beats breadth in MSME advisory. We turn away work outside these seven sectors, because generic advice is worth roughly what it costs."
            action={<QuietLink href="/industries">All industry practices</QuietLink>}
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
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

      {/* ================= Services ====================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Six practices that plug into each other"
            lede="Most clients start with one — usually funding or a growth diagnostic — and layer the rest as the business gets bigger. Each practice is priced and scoped so it can stand alone."
            action={<QuietLink href="/services">Compare all services</QuietLink>}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
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

      {/* ================= Process ======================================= */}
      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="How an engagement runs"
            title="Six stages, and a partner in the room at every one"
            lede="No pyramid. The person who scopes your engagement is the person who presents the recommendation and sits in the credit committee meeting."
          />
          <div className="mt-14">
            <ProcessTimeline tone="dark" />
          </div>
        </Container>
      </Section>

      {/* ================= Case studies ================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Case studies"
            title="Measured outcomes, including the ones where we said no"
            lede="Every case study below states the numbers we were held to. Three of them involve us recommending a smaller project than the client wanted."
            action={<QuietLink href="/case-studies">All case studies</QuietLink>}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featuredCases.map((study, index) => (
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

      {/* ================= Testimonials ================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="In their words"
            title="What clients say when we are not in the room"
            lede="Collected at engagement close, published with written permission, and not edited for flattery."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.author}
                className="flex flex-col p-7"
              >
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                  className="flex flex-1 flex-col"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 text-accent-300" fill="currentColor">
                    <path d="M9.5 6C6.5 7.5 5 10 5 13v5h5v-5H7.5c0-2 .8-3.5 2.5-4.5L9.5 6Zm9 0C15.5 7.5 14 10 14 13v5h5v-5h-2.5c0-2 .8-3.5 2.5-4.5L18.5 6Z" />
                  </svg>
                  <blockquote className="mt-5 flex-1 font-serif text-lg leading-snug text-ink-900">
                    {testimonial.quote}
                  </blockquote>
                  <footer className="mt-6 flex items-center gap-3 border-t border-mist-200 pt-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink-900 font-mono text-xs text-accent-300">
                      {testimonial.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-ink-900">{testimonial.author}</p>
                      <p className="text-[0.8rem] text-mist-600">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                    {testimonial.metric ? (
                      <span className="ml-auto shrink-0 font-mono text-[0.7rem] text-brand-700">
                        {testimonial.metric}
                      </span>
                    ) : null}
                  </footer>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= Insights ====================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Insights"
            title="The benchmarks and guides we wish someone had given us"
            lede="Capital cost data, subsidy sequencing, DPR structure and costing method — written from engagements, not from a content brief."
            action={<QuietLink href="/insights">Visit the insights hub</QuietLink>}
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {featuredArticles.map((article, index) => (
              <div
                key={article.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        secondary={{ label: "Browse the resource library", href: "/resources" }}
      />
    </>
  );
}
