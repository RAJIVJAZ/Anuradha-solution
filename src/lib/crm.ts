import type { LeadInput } from "@/lib/validation";

/**
 * CRM adapter.
 *
 * HubSpot is the system of record for the pipeline (docs/10-crm-integration.md).
 * Everything here is fire-and-forget from the request's point of view: if
 * HubSpot is down we still persist the lead and alert the team, because losing
 * an MSME enquiry costs far more than a missing CRM row.
 */

export interface CrmResult {
  ok: boolean;
  /** HubSpot contact id when the upsert succeeded. */
  contactId?: string;
  skipped?: boolean;
  error?: string;
}

/** Lead score drives routing: 60+ goes straight to a partner's calendar. */
export function scoreLead(lead: LeadInput): number {
  let score = 20;

  const revenueScore: Record<LeadInput["revenue"], number> = {
    "pre-revenue": 0,
    "under-1-cr": 5,
    "1-5-cr": 18,
    "5-25-cr": 28,
    "25-100-cr": 32,
    "above-100-cr": 24,
  };
  score += revenueScore[lead.revenue];

  const timelineScore: Record<LeadInput["timeline"], number> = {
    immediate: 25,
    "1-3-months": 18,
    "3-6-months": 8,
    exploring: 0,
  };
  score += timelineScore[lead.timeline];

  // Funding and factory work is where our win rate and ticket size are highest.
  if (lead.interest === "project-funding-dpr" || lead.interest === "factory-setup-operations") {
    score += 12;
  }
  if (lead.interest === "not-sure") score -= 6;

  if (lead.message && lead.message.length > 180) score += 6;
  if (lead.resourceSlug) score -= 4; // Content downloaders convert later.

  return Math.max(0, Math.min(100, score));
}

export function routeLead(score: number): { owner: string; sla: string; stage: string } {
  if (score >= 60) {
    return { owner: "partner-desk", sla: "4 business hours", stage: "discovery-scheduled" };
  }
  if (score >= 35) {
    return { owner: "engagement-manager", sla: "1 business day", stage: "qualifying" };
  }
  return { owner: "nurture-sequence", sla: "3 business days", stage: "marketing-qualified" };
}

const HUBSPOT_API = "https://api.hubapi.com";

export async function upsertHubspotContact(lead: LeadInput, score: number): Promise<CrmResult> {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) {
    // Local and preview environments run without CRM credentials on purpose.
    return { ok: true, skipped: true };
  }

  const { owner, stage } = routeLead(score);

  const properties = {
    email: lead.email,
    firstname: lead.name.split(" ")[0],
    lastname: lead.name.split(" ").slice(1).join(" ") || "-",
    phone: lead.phone,
    company: lead.company,
    city: lead.city,
    industry_segment: lead.industry,
    service_interest: lead.interest,
    revenue_band: lead.revenue,
    engagement_timeline: lead.timeline,
    lead_score: String(score),
    lifecyclestage: stage === "marketing-qualified" ? "marketingqualifiedlead" : "salesqualifiedlead",
    hs_lead_status: "NEW",
    assigned_desk: owner,
    utm_source: lead.source ?? "direct",
    utm_medium: lead.medium ?? "none",
    utm_campaign: lead.campaign ?? "none",
    first_landing_page: lead.landingPath ?? "/",
    gated_resource: lead.resourceSlug ?? "",
    enquiry_notes: lead.message ?? "",
  };

  try {
    const response = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ properties }),
      signal: AbortSignal.timeout(8000),
    });

    if (response.status === 409) {
      // Contact exists: HubSpot returns the id in the error message body.
      const body = (await response.json()) as { message?: string };
      const existingId = body.message?.match(/\d{4,}/)?.[0];
      if (!existingId) return { ok: false, error: "conflict-without-id" };

      const patch = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts/${existingId}`, {
        method: "PATCH",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ properties }),
        signal: AbortSignal.timeout(8000),
      });
      return patch.ok
        ? { ok: true, contactId: existingId }
        : { ok: false, error: `patch-${patch.status}` };
    }

    if (!response.ok) return { ok: false, error: `create-${response.status}` };

    const created = (await response.json()) as { id: string };
    return { ok: true, contactId: created.id };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : "unknown" };
  }
}

export async function notifyTeam(lead: LeadInput, score: number): Promise<void> {
  const webhook = process.env.SLACK_LEADS_WEBHOOK_URL;
  if (!webhook) return;

  const { owner, sla } = routeLead(score);

  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        text: [
          `*New enquiry — score ${score}/100 → ${owner} (respond within ${sla})*`,
          `${lead.name} · ${lead.company} · ${lead.city}`,
          `${lead.industry} · ${lead.interest} · ${lead.revenue} · ${lead.timeline}`,
          lead.message ? `> ${lead.message.slice(0, 400)}` : "",
          `${lead.email} · ${lead.phone}`,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // Never fail a lead submission because chat notification failed.
  }
}
