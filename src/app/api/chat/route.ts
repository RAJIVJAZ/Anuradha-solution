import { NextResponse } from "next/server";
import { getNode } from "@/lib/chatFlow";
import { recordChatTurn } from "@/lib/db";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { chatTurnSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Serves one node of the qualification flow. The tree lives on the server so
 * copy changes ship without a client bundle rebuild, and so the full script
 * isn't handed to scrapers in one request.
 */
export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`chat:${ip ?? "unknown"}`, { limit: 60, windowMs: 10 * 60 * 1000 });

  if (!limit.ok) {
    return NextResponse.json({ ok: false, error: "Slow down a moment." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = chatTurnSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid turn" }, { status: 422 });
  }

  const node = getNode(parsed.data.node);
  if (!node) {
    return NextResponse.json({ ok: false, error: "Unknown step" }, { status: 404 });
  }

  const sessionId = request.headers.get("x-as-chat-session") ?? "anonymous";
  try {
    await recordChatTurn(sessionId, node.id, parsed.data.choice ?? null);
  } catch (error) {
    console.error("[chat] analytics write failed", error);
  }

  return NextResponse.json({ ok: true, node });
}
