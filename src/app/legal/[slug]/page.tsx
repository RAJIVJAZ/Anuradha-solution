import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/PageHero";
import { Container, Section } from "@/components/ui/Container";
import { getLegalPage, legalPages, legalSlugs } from "@/content/legal";
import { formatDate } from "@/lib/utils";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return {};

  return pageMetadata({
    title: page.title,
    description: page.intro,
    path: `/legal/${page.slug}`,
  });
}

export default async function LegalPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  const trail = [
    { name: "Home", path: "/" },
    { name: page.title, path: `/legal/${page.slug}` },
  ];

  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <Section size="tight" className="border-b border-mist-200">
        <Container>
          <Breadcrumbs trail={trail} tone="light" />
          <h1 className="mt-8 text-display-sm text-ink-900">{page.title}</h1>
          <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-wider text-mist-500">
            Last updated {formatDate(page.updated)}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-600">{page.intro}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <nav aria-label="On this page" className="lg:col-span-4 lg:order-2">
              <div className="rounded-panel border border-mist-200 bg-mist-50 p-6 lg:sticky lg:top-24">
                <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                  Sections
                </p>
                <ol className="mt-4 space-y-2.5">
                  {page.sections.map((section) => (
                    <li key={section.heading}>
                      <a
                        href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="text-[0.88rem] text-mist-700 hover:text-brand-700"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>

                <p className="mt-6 border-t border-mist-300 pt-5 font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                  Other policies
                </p>
                <ul className="mt-3 space-y-2">
                  {legalPages
                    .filter((other) => other.slug !== page.slug)
                    .map((other) => (
                      <li key={other.slug}>
                        <Link
                          href={`/legal/${other.slug}`}
                          className="text-[0.88rem] font-medium text-brand-700 hover:text-brand-800"
                        >
                          {other.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </nav>

            <article className="prose-editorial max-w-none lg:col-span-8 lg:order-1">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2
                    id={section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                    className="scroll-mt-28"
                  >
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </section>
              ))}

              <p className="mt-12 border-t border-mist-200 pt-8 text-sm text-mist-500">
                Questions about this policy? Write to{" "}
                <a href="mailto:engage@anuradhasolutions.in">engage@anuradhasolutions.in</a>.
              </p>
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
