import { ArrowRight, ButtonLink } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Text";
import { site } from "@/content/site";

/**
 * The closing conversion band. Every page ends with one, and the copy changes
 * with context so a service page does not end with the same sentence as a blog
 * post (docs/11-lead-funnel.md).
 */
export function CTASection({
  eyebrow = "Next step",
  title = "Tell us what you are trying to build",
  body = "A partner reads every enquiry. You will get either a calendar link within one business day, or a straight answer that we are not the right firm for this.",
  primary = { label: "Book a discovery call", href: "/contact" },
  secondary,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section tone="ink" size="base" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 rule-grid opacity-30" />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 left-1/2 size-[32rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <Eyebrow tone="onDark">{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-display-sm text-white sm:text-display-md">{title}</h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-300">{body}</p>
          </div>

          <div
            className="lg:col-span-5"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={primary.href} variant="onDark" size="lg" className="group">
                {primary.label}
                <ArrowRight />
              </ButtonLink>
              {secondary ? (
                <ButtonLink href={secondary.href} variant="onDarkGhost" size="lg">
                  {secondary.label}
                </ButtonLink>
              ) : null}
            </div>
            <dl className="mt-8 space-y-2 text-sm">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-mist-500">Call</dt>
                <dd>
                  <a href={`tel:${site.phoneHref}`} className="text-mist-200 hover:text-accent-300">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-mist-500">Email</dt>
                <dd>
                  <a href={`mailto:${site.email}`} className="text-mist-200 hover:text-accent-300">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-mist-500">Response</dt>
                <dd className="text-mist-200">Median 5h 40m in business hours</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}
