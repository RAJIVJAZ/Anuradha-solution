import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Text";
import { careersIntro, getJobOpening, jobOpenings, jobSlugs } from "@/content/careers";
import { site } from "@/content/site";
import { JsonLd, ORG_ID, absoluteUrl, breadcrumbGraph, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return jobSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobOpening(slug);
  if (!job) return {};

  return pageMetadata({
    title: `${job.title} — ${job.location}`,
    description: job.summary,
    path: `/careers/${job.slug}`,
    ogSubtitle: `${job.type} · ${job.experience}`,
  });
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xl text-ink-900">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.slice(0, 40)} className="flex gap-3 text-[0.98rem] leading-relaxed text-mist-700">
            <svg viewBox="0 0 12 12" aria-hidden="true" className="mt-1.5 size-3 shrink-0 text-brand-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6.5 4.5 9 10 3" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJobOpening(slug);
  if (!job) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
    { name: job.title, path: `/careers/${job.slug}` },
  ];

  const applyHref = `mailto:${site.careersEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
  const others = jobOpenings.filter((item) => item.slug !== job.slug);

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbGraph(trail),
          {
            "@type": "JobPosting",
            "@id": absoluteUrl(`/careers/${job.slug}#job`),
            title: job.title,
            description: job.summary,
            employmentType: job.type.toUpperCase().replace("-", "_"),
            hiringOrganization: { "@id": ORG_ID },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: job.location,
                addressCountry: "IN",
              },
            },
            experienceRequirements: job.experience,
            qualifications: job.requirements.join(" "),
            responsibilities: job.responsibilities.join(" "),
            directApply: true,
          },
        ]}
      />

      <PageHero
        trail={trail}
        eyebrow={`${job.discipline} · ${job.type}`}
        title={job.title}
        lede={job.summary}
        meta={[
          { label: "Location", value: job.location },
          { label: "Experience", value: job.experience },
          { label: "Compensation", value: job.compensation },
          { label: "Apply to", value: site.careersEmail },
        ]}
        actions={
          <ButtonLink href={applyHref} variant="onDark" size="lg" className="group">
            Apply for this role
            <ArrowRight />
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-12 lg:col-span-8">
              <List title="What you will do" items={job.responsibilities} />
              <List title="What we need from you" items={job.requirements} />
              <List title="Nice to have" items={job.niceToHave} />

              <div className="rounded-panel border border-mist-200 bg-mist-50 p-7">
                <h2 className="text-lg text-ink-900">How to apply</h2>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-600">
                  Email your CV to{" "}
                  <a href={applyHref} className="text-brand-700 underline underline-offset-2">
                    {site.careersEmail}
                  </a>{" "}
                  with one paragraph describing a business problem you have actually solved — what the
                  number was before, what you did, and what it was afterwards. We care far more about
                  that paragraph than about the CV.
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-600">
                  Process: a 30-minute call, a paid half-day case exercise based on a real (anonymised)
                  engagement, and a conversation with two partners. Three weeks end to end, and we tell
                  everyone the outcome either way.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 lg:space-y-6">
                <div className="rounded-panel border border-brand-200 bg-brand-50 p-6">
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-brand-700">
                    What we offer
                  </p>
                  <ul className="mt-4 space-y-3">
                    {careersIntro.benefits.map((benefit) => (
                      <li key={benefit.slice(0, 30)} className="text-[0.86rem] leading-snug text-ink-800">
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={applyHref} className="mt-6 w-full">
                    Apply now
                  </ButtonLink>
                </div>

                <div className="mt-6 rounded-panel border border-mist-200 p-6 lg:mt-0">
                  <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                    Other openings
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {others.map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/careers/${other.slug}`}
                          className="text-[0.88rem] font-medium text-brand-700 hover:text-brand-800"
                        >
                          {other.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="mist" size="tight">
        <Container>
          <SectionHeading
            eyebrow="Before you apply"
            title="This role involves travel and factory floors"
            lede="If spending a day a week in a processing plant sounds like the wrong job, it probably is — and we would rather you knew that now than in month three."
          />
        </Container>
      </Section>

      <CTASection
        eyebrow="Questions about the role"
        title="Write to us before applying if you want"
        body="We would rather answer an honest question about the job than read an application written around a guess."
        primary={{ label: `Email ${site.careersEmail}`, href: `mailto:${site.careersEmail}` }}
        secondary={{ label: "All open roles", href: "/careers" }}
      />
    </>
  );
}
