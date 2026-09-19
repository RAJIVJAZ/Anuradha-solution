import type { Metadata } from "next";
import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { Pill, SectionHeading } from "@/components/ui/Text";
import { team } from "@/content/team";
import { JsonLd, ORG_ID, absoluteUrl, breadcrumbGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Team", path: "/team" },
];

export const metadata: Metadata = pageMetadata({
  title: "Team — The Consultants Who Will Be on Your Project",
  description:
    "Six senior consultants across strategy, project finance, operations, compliance and brand. No pyramid — the partner who scopes your engagement delivers it.",
  path: "/team",
  ogSubtitle: "Who will actually be in the room",
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbGraph(trail),
          ...team.map((member) => ({
            "@type": "Person",
            "@id": absoluteUrl(`/team#${member.slug}`),
            name: member.name,
            jobTitle: member.role,
            worksFor: { "@id": ORG_ID },
            knowsAbout: member.focus,
            ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
          })),
        ]}
      />

      <PageHero
        trail={trail}
        eyebrow="The team"
        title="Six people. The one who sells the work also does it."
        lede="We have no analysts preparing slides for a partner who has not read them. If a name below is on your engagement letter, that person is in your plant and in your credit committee meeting."
        actions={
          <>
            <ButtonLink href="/contact" variant="onDark" size="lg" className="group">
              Book a call with a partner
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/careers" variant="onDarkGhost" size="lg">
              Join the team
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container>
          <div className="space-y-5">
            {team.map((member, index) => (
              <Card key={member.slug} className="p-7 lg:p-9">
                <div
                  id={member.slug}
                  className="grid gap-8 scroll-mt-28 lg:grid-cols-12 lg:gap-12"
                  data-reveal
                  style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-start gap-5">
                      <span className="grid size-16 shrink-0 place-items-center rounded-panel bg-ink-900 font-serif text-xl text-accent-300">
                        {member.initials}
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-xl text-ink-900">{member.name}</h2>
                        <p className="mt-1 text-sm font-semibold text-brand-700">{member.role}</p>
                        <p className="mt-1 text-[0.82rem] text-mist-500">{member.location}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      <Pill tone="brand">{member.discipline}</Pill>
                    </div>

                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
                      >
                        LinkedIn
                        <ArrowRight />
                      </a>
                    ) : null}
                  </div>

                  <div className="lg:col-span-8">
                    <p className="text-[1rem] leading-relaxed text-mist-700">{member.bio}</p>

                    <div className="mt-7 grid gap-7 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                          Focus
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {member.focus.map((item) => (
                            <li key={item} className="text-[0.88rem] text-ink-800">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                          Credentials
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {member.credentials.map((item) => (
                            <li key={item} className="text-[0.88rem] text-mist-600">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="How we staff"
            title="Why the firm stays this size"
            lede="We deliberately cap the number of live engagements rather than hiring to meet demand."
          />

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                value: "15 – 20",
                label: "Engagements a year",
                body: "Capped deliberately. A larger book would mean juniors doing partner work, which is the model we left.",
              },
              {
                value: "1 in 4",
                label: "Discovery calls declined",
                body: "Wrong sector, too small, or an expectation we cannot meet. Saying no early is cheaper for both sides.",
              },
              {
                value: "100%",
                label: "Partner-delivered",
                body: "Every engagement has a named partner accountable for the outcome, from scoping through handover.",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                data-reveal
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              >
                <p className="font-serif text-4xl leading-none text-brand-700">{stat.value}</p>
                <p className="mt-3 text-sm font-semibold text-ink-900">{stat.label}</p>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-mist-600">{stat.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Talk to a partner"
        title="Pick the person whose practice fits your problem"
        body="Tell us what you are trying to do and we will put the right partner on the call. There is no account manager layer to get through."
        secondary={{ label: "See open roles", href: "/careers" }}
      />
    </>
  );
}
