import { NextResponse } from "next/server";
import { insertSubscriber } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { newsletterSchema } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`newsletter:${ip ?? "unknown"}`, { limit: 5, windowMs: 60 * 60 * 1000 });

  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: "Please try again later." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 422 });
  }

  try {
    await insertSubscriber(parsed.data.email, parsed.data.source ?? "site");
  } catch (error) {
    console.error("[newsletter] persistence failed", error);
    return NextResponse.json({ ok: false, error: "Subscription failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
