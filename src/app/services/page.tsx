import type { Metadata } from "next";
import { ServiceCard } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Text";
import { services } from "@/content/services";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export const metadata: Metadata = pageMetadata({
  title: "Services — Strategy, Funding, Factory Setup, Brand, Technology, Subsidy",
  description:
    "Six consulting practices for Indian MSMEs: growth strategy, project funding and DPR, factory setup and operations, branding, technology and automation, subsidies and compliance.",
  path: "/services",
  ogSubtitle: "Six practices, priced to stand alone",
});

export default function ServicesIndexPage() {
  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="Services"
        title="Six practices, built to be bought one at a time"
        lede="Most firms sell you a transformation programme. We sell the one piece of work that removes your binding constraint, and tell you when the next piece is worth doing."
        actions={
          <>
            <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
              Book a discovery call
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/case-studies" variant="onDarkGhost" size="lg">
              See measured outcomes
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Engagement model comparison — the question every prospect asks. */}
      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Three ways to work with us, and what each is actually for"
            lede="We publish indicative fees because a consulting firm that will not discuss price until meeting three is wasting your time and ours."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {[
              {
                name: "Project",
                price: "₹35,000 – ₹14 lakh",
                body: "A defined deliverable with a fixed fee and a fixed date. DPRs, diagnostics, plant layouts, brand launches, eligibility reports. Most first engagements are project work, because it lets you judge us on something finite.",
                points: ["Fixed scope and fee", "3 – 12 week delivery", "Deliverables listed in the engagement letter"],
              },
              {
                name: "Retainer",
                price: "₹60,000 – ₹4 lakh / month",
                body: "A senior consultant embedded in your monthly rhythm — growth partner, operations excellence, technology partner or marketing. Minimum three months, then cancellable with thirty days' notice.",
                points: ["Monthly management review", "Named consultant, not a pool", "30-day exit after month three"],
              },
              {
                name: "Success fee",
                price: "0.75 – 4% of outcome",
                body: "Available on funding and subsidy work, where the outcome is measurable and attributable. Reduces the upfront fee and is always disclosed in writing before engagement. We never take equity.",
                points: ["Lower upfront fee", "Payable on disbursement", "Disclosed before engagement"],
              },
            ].map((tier, index) => (
              <Card
                key={tier.name}
                className="p-7"
              >
                <div data-reveal style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}>
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-brand-600">
                    {tier.name}
                  </p>
                  <p className="mt-3 font-serif text-2xl text-ink-900">{tier.price}</p>
                  <p className="mt-4 text-[0.92rem] leading-relaxed text-mist-600">{tier.body}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-mist-200 pt-5">
                    {tier.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-ink-800">
                        <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 size-3 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 6.5 4.5 9 10 3" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
        <Container className="relative">
          <SectionHeading
            tone="dark"
            eyebrow="How an engagement runs"
            title="From first call to measured handover"
          />
          <div className="mt-14">
            <ProcessTimeline tone="dark" />
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Not sure which practice"
        title="Describe the problem and we will tell you which one it is"
        body="You do not need to pick a service. Tell us what is not working and a partner will tell you which practice applies — or that none of them do."
      />
    </>
  );
}
