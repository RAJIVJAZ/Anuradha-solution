import type { MetadataRoute } from "next";
import { articles } from "@/content/insights";
import { caseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { jobOpenings } from "@/content/careers";
import { legalPages } from "@/content/legal";
import { resources } from "@/content/resources";
import { services } from "@/content/services";
import { site } from "@/content/site";

/**
 * Priorities reflect commercial intent, not page count: service and industry
 * pages convert, pillar guides acquire, everything else supports.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).toString();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/industries"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: url("/case-studies"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/resources"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/team"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/careers"), lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.9 },
  ];

  return [
    ...staticRoutes,
    ...services.map((service) => ({
      url: url(`/services/${service.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...industries.map((industry) => ({
      url: url(`/industries/${industry.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...caseStudies.map((study) => ({
      url: url(`/case-studies/${study.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: url(`/insights/${article.slug}`),
      lastModified: new Date(article.updatedAt ?? article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: article.type === "pillar" ? 0.8 : 0.6,
    })),
    ...resources.map((resource) => ({
      url: url(`/resources/${resource.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...jobOpenings.map((job) => ({
      url: url(`/careers/${job.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
    ...legalPages.map((page) => ({
      url: url(`/legal/${page.slug}`),
      lastModified: new Date(page.updated),
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
