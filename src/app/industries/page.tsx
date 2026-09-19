import type { Metadata } from "next";
import { IndustryCard } from "@/components/site/Cards";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Text";
import { industries } from "@/content/industries";
import { JsonLd, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export const metadata: Metadata = pageMetadata({
  title: "Industries — Dairy, Food Processing, Sweets, Agriculture, Healthcare, Hospitality, Retail",
  description:
    "Seven sector practices where we already know the unit economics, the machinery and the regulator: dairy, food processing, sweets and bakery, agriculture, healthcare, hospitality and retail.",
  path: "/industries",
  ogSubtitle: "Depth over breadth",
});

export default function IndustriesIndexPage() {
  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail)]} />

      <PageHero
        trail={trail}
        eyebrow="Industries"
        title="Seven sectors. We turn down work outside them."
        lede="A consultant who claims expertise in every industry has expertise in none. These are the sectors where we have commissioned the plants, filed the subsidies and argued with the regulator ourselves."
        actions={
          <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
            Discuss your sector
            <ArrowRight />
          </ButtonLink>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="What we do not do"
            title="The work we turn away, and why"
            lede="Saying this publicly costs us enquiries. It also means that when we say yes, you can believe it."
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Sectors we do not know",
                body: "Pharmaceuticals, heavy engineering, chemicals, IT services, real estate. We have no benchmark data and no operating experience in these, and advice without either is guesswork you can get cheaper elsewhere.",
              },
              {
                title: "Projects under ₹40 lakh",
                body: "Our fee structure does not make sense below that size, and a district MSME resource centre will serve you better. We will point you to the right one rather than take the engagement.",
              },
              {
                title: "Anything contingent on a relationship",
                body: "We do not offer to expedite a file through a personal contact, and we decline engagements where that is the expectation. If a scheme is not available on merit, we will tell you that instead.",
              },
              {
                title: "Work where we take a supplier margin",
                body: "No machinery commissions, no print margins, no lender referral fees, no equity in client businesses. Our independence is the only thing we actually sell.",
              },
            ].map((item, index) => (
              <Card key={item.title} className="p-7">
                <div
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                >
                  <h3 className="text-lg text-ink-900">{item.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-mist-600">{item.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Your sector"
        title="Not sure whether we cover what you do?"
        body="Tell us in two lines. If it is not our sector we will say so on the first call, and where we can we will name someone who does it properly."
      />
    </>
  );
}
