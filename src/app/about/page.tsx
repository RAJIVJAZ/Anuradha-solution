import type { Metadata } from "next";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Text";
import { Counter } from "@/components/viz/Counter";
import { site } from "@/content/site";
import { team } from "@/content/team";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata: Metadata = pageMetadata({
  title: "About — How We Work and What We Refuse",
  description:
    "Anuradha Solutions is a niche advisory firm for Indian MSMEs in manufacturing, dairy and food processing. No supplier commissions, no equity, no pyramid — and we publish what we turn down.",
  path: "/about",
  ogSubtitle: "Independence is the product",
});

const principles = [
  {
    title: "No supplier commissions. Ever.",
    body: "We take no margin from machinery vendors, printers, software resellers or lenders, and it is written into every engagement letter. Supplier commissions are the single biggest reason Indian MSME plants are over-specified, and refusing them is what lets us recommend the ₹40 lakh line over the ₹90 lakh one.",
  },
  {
    title: "We do not take equity in clients",
    body: "A consultant with equity cannot honestly advise you not to expand. We charge fees, and on funding work a disclosed success fee tied to sanction. That is the whole commercial model.",
  },
  {
    title: "A partner does the work",
    body: "There is no pyramid here. The person who scopes your engagement writes the report, presents to your board and sits in the credit committee meeting. It is why we run fifteen to twenty engagements a year rather than a hundred.",
  },
  {
    title: "We say no, in writing",
    body: "About one discovery call in four ends with us declining — wrong sector, too small, or an expectation we cannot meet. Roughly one diagnostic in six concludes that the client should not expand at all, and we put that in the report.",
  },
  {
    title: "Fees are published",
    body: "Indicative ranges are on every service page. A firm that will not discuss price until the third meeting is managing your commitment, not your project.",
  },
  {
    title: "Results are measured against a baseline",
    body: "The metrics we report are agreed before work starts and stated with their starting point. We will put you in touch with the client behind any case study on this site.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="The firm"
        title="A small senior firm for businesses that build things"
        lede="Anuradha Solutions was started in 2016 by a dairy plant manager who had watched too many good MSME projects fail for reasons nobody had modelled. We have stayed deliberately small, senior and narrow since."
        meta={[
          { label: "Founded", value: site.founded },
          { label: "Engagements", value: "310+" },
          { label: "Consultants", value: String(team.length) },
          { label: "Offices", value: String(site.offices.length) },
        ]}
        actions={
          <>
            <ButtonLink href="/team" variant="onDark" size="lg" className="group">
              Meet the team
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/careers" variant="onDarkGhost" size="lg">
              Open roles
            </ButtonLink>
          </>
        }
      />

      {/* ============ Story ========================================== */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Why the firm exists" title="It started with a bad plant" />
            </div>
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-mist-700 lg:col-span-8">
              <p data-reveal>
                In 2014 our founder was commissioning a dairy plant in western Maharashtra that had
                been designed by the company selling the equipment. It had capacity for eight products,
                a procurement base that could support three, and an effluent treatment plant sized for a
                site it was no longer on. The promoters had spent eleven crore. They never recovered it.
              </p>
              <p data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
                Nothing about that failure was exotic. Every decision that killed it had been made
                before a single brick was laid, by people who were not independent of the outcome. The
                firm exists to be the party in the room with no interest in how big the project is.
              </p>
              <p data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
                Ten years on, we have commissioned 42 plants, arranged ₹640 crore of project finance
                and told roughly fifty promoters that the thing they wanted to build should be smaller
                or should not be built at all. The second number matters more to us than the first.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ Numbers ======================================== */}
      <Section tone="ink" size="tight" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
        <Container className="relative">
          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {site.proof.map((item, index) => (
              <div
                key={item.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <dd className="font-serif text-4xl leading-none tracking-tight text-accent-300 sm:text-5xl">
                  <Counter value={item.value} />
                </dd>
                <dt className="mt-3 text-sm font-semibold text-white">{item.label}</dt>
                <p className="mt-1 text-sm text-mist-400">{item.detail}</p>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* ============ Principles ===================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Six commitments, and the cost of each"
            lede="These are in our engagement letters, not just on this page. Each one costs us money, which is the only reason they are worth stating."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Card key={principle.title} className="p-7">
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <span className="font-mono text-xs text-mist-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-lg text-ink-900">{principle.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mist-600">
                    {principle.body}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ Process ======================================== */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="How an engagement runs"
            title="From first call to measured handover"
            lede="Six stages. You can stop after any of them, and the first one is free."
          />
          <div className="mt-14">
            <ProcessTimeline />
          </div>
        </Container>
      </Section>

      {/* ============ Offices ======================================== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Where we are"
            title="Three desks, and a lot of time on site"
            lede="Most of our work happens in your plant, not our office. The addresses matter mainly for the departments we have to visit."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {site.offices.map((office, index) => (
              <Card key={office.city} className="p-7">
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-brand-600">
                    {office.role}
                  </p>
                  <h3 className="mt-3 text-xl text-ink-900">{office.city}</h3>
                  <address className="mt-3 not-italic text-[0.92rem] leading-relaxed text-mist-600">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Work with us"
        title="Or find out quickly that we are not the right firm"
        body="A discovery call is forty-five minutes with a partner. About one in four ends with us saying no, which is the outcome we are proudest of."
        secondary={{ label: "See the team", href: "/team" }}
      />
    </>
  );
}
