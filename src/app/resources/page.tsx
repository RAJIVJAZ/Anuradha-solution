import type { Metadata } from "next";
import Link from "next/link";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading } from "@/components/ui/Text";
import { resources } from "@/content/resources";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
];

export const metadata: Metadata = pageMetadata({
  title: "Resource Library — Models, Templates and Checklists for MSMEs",
  description:
    "Free and gated tools: DPR readiness checklist, dairy plant cost model, subsidy eligibility matrix, OEE measurement pack, packaging compliance checklist, ERP scoring template.",
  path: "/resources",
  ogSubtitle: "The working files from our engagements",
});

export default function ResourcesIndexPage() {
  const free = resources.filter((resource) => !resource.gated);
  const gated = resources.filter((resource) => resource.gated);

  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="Resource library"
        title="The working files we use, cleaned up and given away"
        lede="These are not lead magnets dressed as tools. They are simplified versions of the actual models, checklists and trackers we run inside engagements — which is why some of them will tell you not to spend money."
        meta={[
          { label: "Resources", value: String(resources.length) },
          { label: "Free, no form", value: String(free.length) },
          { label: "Email required", value: String(gated.length) },
          { label: "Formats", value: "Excel, PDF" },
        ]}
      />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="No form required"
            title="Download these without giving us anything"
            lede="If a tool is genuinely useful on its own, gating it just makes it less useful."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {free.map((resource, index) => (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="group flex flex-col rounded-panel border border-mist-200 bg-paper p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
              >
                <div
                  className="flex flex-1 flex-col"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="brand">{resource.format}</Pill>
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                      {resource.pages}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg text-ink-900 group-hover:text-brand-700">
                    {resource.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-mist-600">
                    {resource.summary}
                  </p>
                  <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Open resource
                    <ArrowRight />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Email required"
            title="Models we would rather discuss with you"
            lede="These are financial models where a wrong input produces a confidently wrong answer. We ask for an email so we can send the file and answer questions about it — not so a salesperson can call you."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {gated.map((resource, index) => (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="group flex flex-col rounded-panel border border-mist-200 bg-paper p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
              >
                <div
                  className="flex flex-1 flex-col"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="accent">{resource.format}</Pill>
                    <span className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                      {resource.pages}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg text-ink-900 group-hover:text-brand-700">
                    {resource.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-mist-600">
                    {resource.summary}
                  </p>
                  <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-brand-700">
                    Get the file
                    <ArrowRight />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Using one of these"
        title="Send us your filled-in model and we will sanity-check it"
        body="No charge and no pitch. If the numbers look wrong we will tell you which assumption is doing the damage."
        secondary={{ label: "Read the guides", href: "/insights" }}
      />
    </>
  );
}
