import { NextResponse } from "next/server";
import { notifyTeam, routeLead, scoreLead, upsertHubspotContact } from "@/lib/crm";
import { insertLead } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { fieldErrors, leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Lead intake.
 *
 * Order matters: validate → persist → CRM → notify. Persistence is the only
 * step allowed to fail the request, because a lead in Postgres can always be
 * replayed into HubSpot, never the other way round.
 */
export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`leads:${ip ?? "unknown"}`, { limit: 6, windowMs: 10 * 60 * 1000 });

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const lead = parsed.data;

  // Honeypot filled → silently accept so the bot doesn't learn it was caught.
  if (lead.companyWebsite) {
    return NextResponse.json({ ok: true, reference: "AS-0000" });
  }

  const score = scoreLead(lead);
  const { owner, stage } = routeLead(score);

  let reference = `AS-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  try {
    const stored = await insertLead(lead, {
      score,
      owner,
      stage,
      ip,
      userAgent: request.headers.get("user-agent"),
    });
    if (stored) reference = stored.reference;
  } catch (error) {
    console.error("[leads] persistence failed", error);
    return NextResponse.json(
      { ok: false, error: "We could not save your enquiry. Please email engage@anuradhasolutions.in." },
      { status: 500 },
    );
  }

  const [crm] = await Promise.all([upsertHubspotContact(lead, score), notifyTeam(lead, score)]);
  if (!crm.ok) console.error("[leads] CRM sync failed", crm.error);

  return NextResponse.json({ ok: true, reference, score, desk: owner });
}
