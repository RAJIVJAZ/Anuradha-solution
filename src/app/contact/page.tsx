import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/LeadForm";
import { PageHero } from "@/components/site/PageHero";
import { Card } from "@/components/ui/Card";
import { Container, Section } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Text";
import { site } from "@/content/site";
import { JsonLd, breadcrumbGraph, faqGraph, pageMetadata } from "@/lib/seo";

const trail = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata: Metadata = pageMetadata({
  title: "Contact — Book a Discovery Call with a Partner",
  description:
    "Tell us what you are trying to build. A partner reads every enquiry and replies within one business day with a calendar link or an honest no. Pune, Ahmedabad and New Delhi.",
  path: "/contact",
  ogSubtitle: "A partner reads every enquiry",
});

const faqs = [
  {
    question: "What happens on the discovery call?",
    answer:
      "Forty-five minutes with a partner, not a salesperson. We ask what you are trying to build, what you have already tried, and what your numbers look like. You will leave knowing whether this is work we should do and roughly what it would cost. There is no deck.",
  },
  {
    question: "Is the first call chargeable?",
    answer:
      "No. Nor is the scoping note that follows it. We start charging when work starts, and the fee is fixed in the engagement letter before that.",
  },
  {
    question: "How quickly will you respond?",
    answer:
      "Median response time last quarter was 5 hours 40 minutes in business hours. Every enquiry gets a human reply, including the ones we decline — and about one in four is declined.",
  },
  {
    question: "Do you work outside Maharashtra and Gujarat?",
    answer:
      "Yes. We work directly across Maharashtra, Gujarat, Karnataka, Madhya Pradesh and Rajasthan, and elsewhere in India through vetted local associates for liaison work. We tell you which arrangement applies before you engage.",
  },
  {
    question: "What if we just want a quote?",
    answer:
      "Tell us the scope in the form and we will send an indicative range by email without a call, provided the scope is clear enough to price. For anything involving a plant or a project report, a call saves both of us a wrong number.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd graph={[breadcrumbGraph(trail), faqGraph(faqs)]} />

      <PageHero
        trail={trail}
        eyebrow="Contact"
        title="Tell us what you are trying to build"
        lede="A partner reads every enquiry personally. You will hear back within one business day with either a calendar link or a straight answer that we are not the right firm for this."
        meta={[
          { label: "Median response", value: "5h 40m" },
          { label: "First call", value: "Free, 45 minutes" },
          { label: "Enquiries declined", value: "About 1 in 4" },
          { label: "Phone", value: site.phone },
        ]}
      />

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-2xl text-ink-900">Send us a brief</h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-mist-600">
                The more you tell us, the more useful our first reply will be. Capacity, location,
                machinery, funding gap — whatever you already know.
              </p>
              <div className="mt-8">
                <LeadForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="space-y-5 lg:sticky lg:top-24">
                <Card surface="mist" className="p-7">
                  <h2 className="text-lg text-ink-900">Prefer to talk first?</h2>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                        Phone
                      </dt>
                      <dd className="mt-1">
                        <a href={`tel:${site.phoneHref}`} className="text-[1.05rem] font-semibold text-ink-900 hover:text-brand-700">
                          {site.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                        Email
                      </dt>
                      <dd className="mt-1">
                        <a href={`mailto:${site.email}`} className="text-[1.05rem] font-semibold text-ink-900 hover:text-brand-700">
                          {site.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-mist-500">
                        Hours
                      </dt>
                      <dd className="mt-1 text-mist-700">
                        Monday to Saturday, 9:30am – 7:00pm IST
                      </dd>
                    </div>
                  </dl>
                  <ButtonLink
                    href={site.bookingUrl}
                    variant="secondary"
                    className="mt-6 w-full"
                  >
                    Book directly in a partner&apos;s calendar
                  </ButtonLink>
                </Card>

                <Card className="p-7">
                  <h2 className="text-lg text-ink-900">Our offices</h2>
                  <div className="mt-5 space-y-5">
                    {site.offices.map((office) => (
                      <div key={office.city}>
                        <p className="text-sm font-semibold text-ink-900">
                          {office.city}
                          <span className="ml-2 font-normal text-mist-500">{office.role}</span>
                        </p>
                        <address className="mt-1 not-italic text-[0.85rem] leading-relaxed text-mist-600">
                          {office.lines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card surface="mist" className="p-7">
                  <h2 className="text-lg text-ink-900">What we will not do</h2>
                  <ul className="mt-4 space-y-2.5 text-[0.88rem] leading-relaxed text-mist-600">
                    <li>Sell your details to a lender or a machinery supplier.</li>
                    <li>Put you into an automated call sequence.</li>
                    <li>Quote a fee before we understand the scope.</li>
                    <li>Take the work if it is not ours to take.</li>
                  </ul>
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="mist">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Before you write" title="Questions we get first" />
            </div>
            <dl className="divide-y divide-mist-300 lg:col-span-8">
              {faqs.map((faq) => (
                <div key={faq.question} className="py-6 first:pt-0 last:pb-0">
                  <dt className="text-base font-semibold text-ink-900">{faq.question}</dt>
                  <dd className="mt-3 text-[0.95rem] leading-relaxed text-mist-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>
    </>
  );
}
