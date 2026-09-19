import { z } from "zod";

/**
 * One schema per form, shared by the client component and the API route, so a
 * field can never be validated in the browser and then silently accepted (or
 * rejected) on the server.
 */

const phone = z
  .string()
  .trim()
  .regex(/^(\+?91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number");

export const serviceInterests = [
  "business-growth-strategy",
  "project-funding-dpr",
  "factory-setup-operations",
  "branding-marketing",
  "technology-automation",
  "subsidies-compliance",
  "not-sure",
] as const;

export const revenueBands = [
  "pre-revenue",
  "under-1-cr",
  "1-5-cr",
  "5-25-cr",
  "25-100-cr",
  "above-100-cr",
] as const;

export const timelines = ["immediate", "1-3-months", "3-6-months", "exploring"] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(120),
  company: z.string().trim().min(2, "Company or project name is required").max(160),
  email: z.string().trim().toLowerCase().email("Enter a valid work email"),
  phone,
  city: z.string().trim().min(2, "City helps us route you to the right desk").max(80),
  industry: z.string().trim().min(2).max(80),
  interest: z.enum(serviceInterests, { message: "Select the practice you need" }),
  revenue: z.enum(revenueBands, { message: "Select your revenue band" }),
  timeline: z.enum(timelines, { message: "Select a timeline" }),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Marketing attribution, filled in by the client from the URL + referrer. */
  source: z.string().trim().max(120).optional(),
  medium: z.string().trim().max(120).optional(),
  campaign: z.string().trim().max(160).optional(),
  landingPath: z.string().trim().max(300).optional(),
  /** Which gated resource (if any) triggered the form. */
  resourceSlug: z.string().trim().max(120).optional(),
  consent: z.literal(true, { message: "Please accept the privacy policy to continue" }),
  /**
   * Honeypot. Accepts any value on purpose: rejecting it here would return a
   * validation error that tells the bot it was caught. The route inspects this
   * field after a successful parse and silently discards the submission.
   */
  companyWebsite: z.string().max(300).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  source: z.string().trim().max(120).optional(),
});

export const chatTurnSchema = z.object({
  /** Node id the visitor is answering, or "start" for the opening message. */
  node: z.string().trim().min(1).max(64),
  choice: z.string().trim().max(200).optional(),
  contact: z
    .object({
      name: z.string().trim().max(120).optional(),
      email: z.string().trim().max(160).optional(),
      phone: z.string().trim().max(24).optional(),
    })
    .optional(),
});

/** Flatten a ZodError into `{ field: message }` for inline form errors. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
