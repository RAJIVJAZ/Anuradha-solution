import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/forms/LeadForm";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading } from "@/components/ui/Text";
import { getResource, resourceSlugs, resources } from "@/content/resources";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return resourceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};

  return pageMetadata({
    title: `${resource.title} — Free ${resource.format} for Indian MSMEs`,
    description: resource.summary,
    path: `/resources/${resource.slug}`,
    ogSubtitle: `${resource.format} · ${resource.pages}`,
  });
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: resource.title, path: `/resources/${resource.slug}` },
  ];

  const others = resources.filter((item) => item.slug !== resource.slug).slice(0, 4);

  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <PageHero
        trail={trail}
        eyebrow={`${resource.format} · ${resource.pages}`}
        title={resource.title}
        lede={resource.summary}
        meta={[
          { label: "Format", value: resource.format },
          { label: "Length", value: resource.pages },
          { label: "Written for", value: resource.audience },
          { label: "Access", value: resource.gated ? "Email required" : "No form required" },
        ]}
        actions={
          resource.gated ? (
            <ButtonLink href="#get-it" variant="onDark" size="lg" className="group">
              Get the file
              <ArrowRight />
            </ButtonLink>
          ) : (
            <ButtonLink
              href={`/api/resources/${resource.slug}`}
              variant="onDark"
              size="lg"
              className="group"
            >
              Download now
              <ArrowRight />
            </ButtonLink>
          )
        }
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl text-ink-900">What is inside</h2>
              <ul className="mt-6 space-y-4">
                {resource.includes.map((item, index) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-mist-200 pb-4 last:border-0"
                    data-reveal
                    style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                  >
                    <span className="mt-0.5 font-mono text-xs text-mist-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[1rem] leading-relaxed text-ink-800">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-2">
                {resource.industries.map((industry) => (
                  <Pill key={industry}>{industry}</Pill>
                ))}
              </div>

              <div className="mt-10 rounded-panel border border-mist-200 bg-mist-50 p-7">
                <p className="text-sm font-semibold text-ink-900">Honest limitations</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-mist-600">
                  This is a simplified version of a tool we run inside engagements. It uses indicative
                  benchmark ranges at 2025–26 prices and will not know anything about your specific site,
                  procurement or state policy. Treat the output as a sanity check, not a decision.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div id="get-it" className="scroll-mt-28 lg:sticky lg:top-24">
                {resource.gated ? (
                  <div className="rounded-panel border border-mist-200 bg-paper p-7">
                    <h2 className="text-xl text-ink-900">Send me the file</h2>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-mist-600">
                      One email with the download link. We will also add you to the fortnightly Growth
                      Brief, which you can leave in one click.
                    </p>
                    <div className="mt-6">
                      <LeadForm
                        resourceSlug={resource.slug}
                        submitLabel="Email me the file"
                        compact
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-panel border border-brand-200 bg-brand-50 p-7">
                    <h2 className="text-xl text-ink-900">No form, no email</h2>
                    <p className="mt-2 text-[0.9rem] leading-relaxed text-mist-700">
                      Download it directly. If you find an error in it, tell us and we will fix it and
                      credit you.
                    </p>
                    <ButtonLink
                      href={`/api/resources/${resource.slug}`}
                      size="lg"
                      className="mt-6 w-full"
                    >
                      Download {resource.format.toLowerCase()}
                    </ButtonLink>
                    <ButtonLink href="/contact" variant="secondary" className="mt-3 w-full">
                      Ask us about it instead
                    </ButtonLink>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading eyebrow="More tools" title="Other resources in the library" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/resources/${other.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-card border border-mist-200 bg-paper px-6 py-5 transition-colors hover:border-brand-300"
                >
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-semibold text-ink-900 group-hover:text-brand-700">
                      {other.title}
                    </span>
                    <span className="mt-0.5 block text-[0.8rem] text-mist-500">
                      {other.format} · {other.pages} · {other.gated ? "Email required" : "Free"}
                    </span>
                  </span>
                  <ArrowRight className="text-brand-600" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        eyebrow="Beyond the template"
        title="Want us to run your actual numbers?"
        body="Bring the filled-in file to a discovery call. We will tell you which assumptions are doing the heavy lifting and where the real risk sits."
        secondary={{ label: "All resources", href: "/resources" }}
      />
    </>
  );
}
