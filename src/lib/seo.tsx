import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Article, CaseStudy, Faq, Industry, Service } from "@/content/types";

/**
 * Metadata + structured data helpers.
 *
 * Every page builds its metadata through `pageMetadata` so canonical URLs, OG
 * images and title templates can never drift between routes. Structured data
 * is emitted as a single `@graph` per page — Google prefers one connected graph
 * over several disconnected blocks. See docs/06-seo-architecture.md.
 */

export const ORG_ID = `${site.url}/#organisation`;
export const WEBSITE_ID = `${site.url}/#website`;

export function absoluteUrl(path = "/"): string {
  return new URL(path, site.url).toString();
}

export function ogImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  return `${site.url}/api/og?${params.toString()}`;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedAt,
  updatedAt,
  ogSubtitle,
  noIndex,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  ogSubtitle?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  const image = ogImageUrl(title, ogSubtitle);

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "en_IN",
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article" && publishedAt
        ? { publishedTime: publishedAt, modifiedTime: updatedAt ?? publishedAt }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/* ------------------------------------------------------------------------- */
/* Structured data                                                           */
/* ------------------------------------------------------------------------- */

type Json = Record<string, unknown>;

export function organisationGraph(): Json[] {
  return [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
      description: site.shortDescription,
      foundingDate: site.founded,
      email: site.email,
      telephone: site.phone,
      areaServed: { "@type": "Country", name: "India" },
      knowsAbout: [
        "Detailed Project Report preparation",
        "MSME project finance",
        "Dairy plant setup",
        "Food processing plant design",
        "PMFME subsidy",
        "FSSAI compliance",
        "Brand positioning for FMCG",
      ],
      address: site.offices.map((office) => ({
        "@type": "PostalAddress",
        addressLocality: office.city,
        addressCountry: "IN",
        streetAddress: office.lines[0],
      })),
      sameAs: [site.social.linkedin, site.social.youtube, site.social.x],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: site.url,
      name: site.name,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-IN",
      potentialAction: {
        "@type": "SearchAction",
        target: `${site.url}/insights?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

export function breadcrumbGraph(trail: { name: string; path: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function faqGraph(faqs: Faq[]): Json {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceGraph(service: Service): Json {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "India" },
    audience: service.industries.map((industry) => ({
      "@type": "BusinessAudience",
      name: industry,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} engagement models`,
      itemListElement: service.tiers.map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        price: tier.price,
        priceCurrency: "INR",
        description: tier.bestFor,
      })),
    },
  };
}

export function industryGraph(industry: Industry): Json {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/industries/${industry.slug}#service`),
    name: `${industry.name} consulting`,
    description: industry.summary,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "India" },
  };
}

export function articleGraph(article: Article): Json {
  return {
    "@type": "Article",
    "@id": absoluteUrl(`/insights/${article.slug}#article`),
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { "@type": "Person", name: article.author, worksFor: { "@id": ORG_ID } },
    publisher: { "@id": ORG_ID },
    articleSection: article.category,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    timeRequired: `PT${article.readingMinutes}M`,
  };
}

export function caseStudyGraph(study: CaseStudy): Json {
  return {
    "@type": "Article",
    "@id": absoluteUrl(`/case-studies/${study.slug}#case-study`),
    headline: study.title,
    description: study.challenge,
    about: { "@type": "Thing", name: study.industry },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

/** Renders one `@graph` script tag. Call once per page, near the top. */
export function JsonLd({ graph }: { graph: Json[] }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is authored in this repo, never user input.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }),
      }}
    />
  );
}
