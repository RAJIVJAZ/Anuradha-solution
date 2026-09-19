import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Text";
import { caseStudies } from "@/content/case-studies";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Case studies", path: "/case-studies" },
];

export const metadata: Metadata = pageMetadata({
  title: "Case Studies — Measured Outcomes for Indian MSMEs",
  description:
    "Eight client engagements with the numbers: ₹18 Cr dairy expansion funded, 3x output without new capex, sweet shop to four-state brand, FPO warehouse funded, hospital right-sized.",
  path: "/case-studies",
  ogSubtitle: "Including the projects we made smaller",
});

export default function CaseStudiesIndexPage() {
  const [featured, ...rest] = caseStudies;
  const industriesCovered = [...new Set(caseStudies.map((study) => study.industry))];

  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="Case studies"
        title="What actually happened, including where we recommended less"
        lede="Every engagement below states the metrics we agreed to be measured on. Four of them involve us telling a client their project was too big — which is the recommendation that earns us the least and saves them the most."
        meta={[
          { label: "Engagements shown", value: String(caseStudies.length) },
          { label: "Sectors covered", value: String(industriesCovered.length) },
          { label: "Capital funded", value: "₹640 Cr" },
          { label: "Median growth", value: "3.1x" },
        ]}
        actions={
          <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
            Discuss your project
            <ArrowRight />
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          {featured ? (
            <div data-reveal>
              <CaseStudyCard study={featured} featured />
            </div>
          ) : null}

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {rest.map((study, index) => (
              <div
                key={study.slug}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
              >
                <CaseStudyCard study={study} />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="How we report results"
            title="Why these numbers can be checked"
            lede="Consulting case studies are usually unfalsifiable. Ours follow four rules, and we will put you in touch with the client on request."
          />

          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Metrics agreed upfront",
                body: "The numbers reported are the ones written into the engagement letter before work started, not ones selected afterwards because they looked good.",
              },
              {
                title: "Baselines are stated",
                body: "Every result shows where it started. A 3x improvement from an unstated base is a marketing claim, not a result.",
              },
              {
                title: "Client-verified",
                body: "Each case study and quote is approved in writing by the client. Where permission was limited we mask the name and say so on the page.",
              },
              {
                title: "Failures included",
                body: "We publish engagements where our recommendation reduced the client's project, and we will discuss the engagements that did not work on a call.",
              },
            ].map((rule, index) => (
              <li
                key={rule.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <span className="font-mono text-sm text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg text-ink-900">{rule.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-mist-600">{rule.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CTASection
        eyebrow="Your project"
        title="Ask us for a reference in your sector"
        body="On a discovery call we will name a client in your sector who agreed to take reference calls. Talk to them before you talk to us again."
        secondary={{ label: "See our services", href: "/services" }}
      />
    </>
  );
}
