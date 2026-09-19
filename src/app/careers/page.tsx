import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading } from "@/components/ui/Text";
import { careersIntro, jobOpenings } from "@/content/careers";
import { site } from "@/content/site";
import { JsonLd, ORG_ID, absoluteUrl, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers" },
];

export const metadata: Metadata = pageMetadata({
  title: "Careers — Consulting Roles in Project Finance, Operations & Compliance",
  description:
    "Five open roles across project finance, plant operations, subsidy and compliance, brand strategy and a graduate analyst programme. Pune, Nashik, Ahmedabad and New Delhi.",
  path: "/careers",
  ogSubtitle: "A small firm where you own the work",
});

export default function CareersPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbGraph(trail),
          ...jobOpenings.map((job) => ({
            "@type": "JobPosting",
            "@id": absoluteUrl(`/careers/${job.slug}#job`),
            title: job.title,
            description: job.summary,
            employmentType: job.type.toUpperCase().replace("-", "_"),
            hiringOrganization: { "@id": ORG_ID },
            jobLocation: {
              "@type": "Place",
              address: { "@type": "PostalAddress", addressLocality: job.location, addressCountry: "IN" },
            },
            experienceRequirements: job.experience,
            directApply: true,
          })),
        ]}
      />

      <PageHero
        trail={trail}
        eyebrow="Careers"
        title={careersIntro.headline}
        lede={careersIntro.lede}
        meta={[
          { label: "Open roles", value: String(jobOpenings.length) },
          { label: "Locations", value: "Pune, Nashik, Ahmedabad, Delhi" },
          { label: "Team size", value: "6 + associates" },
          { label: "Apply to", value: site.careersEmail },
        ]}
        actions={
          <ButtonLink href="#openings" variant="onDark" size="lg" className="group">
            See open roles
            <ArrowRight />
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="What it is like"
            title="Four things that are true here and unusual elsewhere"
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {careersIntro.principles.map((principle, index) => (
              <Card key={principle.title} className="p-7">
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <h3 className="text-lg text-ink-900">{principle.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-mist-600">
                    {principle.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 rounded-panel border border-mist-200 bg-mist-50 p-7">
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
              What we offer
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {careersIntro.benefits.map((benefit) => (
                <li key={benefit} className="flex gap-2.5 text-[0.9rem] leading-snug text-ink-800">
                  <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1 size-3 shrink-0 text-brand-600" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 6.5 4.5 9 10 3" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="openings" tone="mist">
        <Container>
          <SectionHeading eyebrow="Open roles" title="Five positions, all senior enough to matter" />

          <ul className="mt-14 space-y-4">
            {jobOpenings.map((job, index) => (
              <li key={job.slug}>
                <Link
                  href={`/careers/${job.slug}`}
                  className="group block rounded-panel border border-mist-200 bg-paper p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
                >
                  <div
                    className="grid gap-5 lg:grid-cols-12 lg:items-center"
                    data-reveal
                    style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                  >
                    <div className="lg:col-span-6">
                      <div className="flex flex-wrap items-center gap-2">
                        <Pill tone="brand">{job.discipline}</Pill>
                        <Pill>{job.type}</Pill>
                      </div>
                      <h3 className="mt-3 text-xl text-ink-900 group-hover:text-brand-700">
                        {job.title}
                      </h3>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-mist-600">
                        {job.summary}
                      </p>
                    </div>

                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 lg:col-span-5 lg:grid-cols-3">
                      <div>
                        <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-mist-500">
                          Location
                        </dt>
                        <dd className="mt-1 text-[0.85rem] text-ink-800">{job.location}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-mist-500">
                          Experience
                        </dt>
                        <dd className="mt-1 text-[0.85rem] text-ink-800">{job.experience}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.65rem] uppercase tracking-wider text-mist-500">
                          Compensation
                        </dt>
                        <dd className="mt-1 text-[0.85rem] text-ink-800">{job.compensation}</dd>
                      </div>
                    </dl>

                    <div className="lg:col-span-1 lg:justify-self-end">
                      <ArrowRight className="text-brand-600" />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        eyebrow="No role that fits?"
        title="Write to us anyway"
        body={`Send your CV and one paragraph on a business problem you have actually solved to ${site.careersEmail}. We read everything and reply to most.`}
        primary={{ label: `Email ${site.careersEmail}`, href: `mailto:${site.careersEmail}` }}
        secondary={{ label: "Meet the team", href: "/team" }}
      />
    </>
  );
}
