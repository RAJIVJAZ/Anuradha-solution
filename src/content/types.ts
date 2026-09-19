/**
 * Shared content contracts.
 *
 * Every entry carries its own SEO block so page metadata is authored next to
 * the copy it describes. When the Sanity CMS is switched on (see
 * docs/14-content-architecture.md) these interfaces become the GROQ
 * projection targets, so the page components never change.
 */

export interface Seo {
  title: string;
  description: string;
  keywords?: string[];
}

export interface Metric {
  label: string;
  value: string;
  detail?: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Deliverable {
  title: string;
  description: string;
  timeline: string;
}

export interface EngagementTier {
  name: string;
  model: "Project" | "Retainer" | "Success fee";
  price: string;
  bestFor: string;
  includes: string[];
}

export interface Service {
  slug: string;
  name: string;
  navLabel: string;
  eyebrow: string;
  headline: string;
  summary: string;
  /** One-line value promise used on cards and in the mega-nav. */
  promise: string;
  icon: IconName;
  visual: VisualName;
  problems: string[];
  approach: { step: string; title: string; description: string }[];
  deliverables: Deliverable[];
  outcomes: Metric[];
  tiers: EngagementTier[];
  industries: string[];
  faqs: Faq[];
  relatedInsights: string[];
  seo: Seo;
}

export interface Industry {
  slug: string;
  name: string;
  eyebrow: string;
  headline: string;
  summary: string;
  marketContext: string;
  icon: IconName;
  visual: VisualName;
  challenges: { title: string; description: string }[];
  playbook: { title: string; description: string }[];
  benchmarks: Metric[];
  schemes: { name: string; body: string; benefit: string }[];
  services: string[];
  caseStudies: string[];
  faqs: Faq[];
  seo: Seo;
}

export interface CaseStudy {
  slug: string;
  client: string;
  anonymised: boolean;
  title: string;
  industry: string;
  services: string[];
  location: string;
  duration: string;
  engagementModel: string;
  challenge: string;
  context: string[];
  approach: { phase: string; title: string; detail: string }[];
  results: Metric[];
  headlineResult: Metric;
  quote: { text: string; author: string; role: string };
  visual: VisualName;
  seo: Seo;
}

export interface ArticleSection {
  heading?: string;
  /** Paragraphs, bullet lists and pull-quotes render in document order. */
  body?: string[];
  bullets?: string[];
  numbered?: string[];
  quote?: string;
  table?: { columns: string[]; rows: string[][] };
}

export interface Article {
  slug: string;
  title: string;
  /** Pillar pages anchor a topic cluster; supporting posts link up to one. */
  type: "pillar" | "supporting";
  cluster: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  author: string;
  industries: string[];
  services: string[];
  keyTakeaways: string[];
  sections: ArticleSection[];
  faqs?: Faq[];
  seo: Seo;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  discipline: string;
  initials: string;
  location: string;
  bio: string;
  focus: string[];
  credentials: string[];
  linkedin?: string;
}

export interface JobOpening {
  slug: string;
  title: string;
  discipline: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  experience: string;
  compensation: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
}

export interface Resource {
  slug: string;
  title: string;
  format: "Template" | "Checklist" | "Model" | "Report" | "Calculator" | "Guide";
  pages: string;
  summary: string;
  /** Gated resources trigger the lead form before the download unlocks. */
  gated: boolean;
  audience: string;
  includes: string[];
  industries: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
  industry: string;
  metric?: string;
}

export type IconName =
  | "strategy"
  | "finance"
  | "operations"
  | "brand"
  | "technology"
  | "compliance"
  | "dairy"
  | "food"
  | "sweets"
  | "agriculture"
  | "healthcare"
  | "hospitality"
  | "retail"
  | "factory"
  | "growth"
  | "document"
  | "shield"
  | "spark";

export type VisualName =
  | "growth-curve"
  | "revenue-bars"
  | "factory-flow"
  | "funding-waterfall"
  | "capacity-gauge"
  | "automation-radar"
  | "brand-system"
  | "compliance-grid";
