import { NextResponse } from "next/server";
import { getResource } from "@/content/resources";
import { query } from "@/lib/db";
import { clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const EXTENSIONS: Record<string, string> = {
  Template: "xlsx",
  Checklist: "pdf",
  Model: "xlsx",
  Report: "pdf",
  Calculator: "xlsx",
  Guide: "pdf",
};

/**
 * Resource download.
 *
 * Files live in object storage rather than the repo so they can be updated
 * without a deploy. The route records the download (for the resource
 * performance report in the admin panel) and then redirects to the signed CDN
 * URL. Gated resources are still served here — the gate is the lead form that
 * emails this link, not this endpoint.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const resource = getResource(slug);

  if (!resource) {
    return NextResponse.json({ ok: false, error: "Unknown resource" }, { status: 404 });
  }

  try {
    await query(
      `insert into resource_downloads (resource_slug, ip_address, referrer)
       values ($1, $2, $3)`,
      [slug, clientIp(request.headers), request.headers.get("referer")],
    );
  } catch (error) {
    console.error("[resources] download logging failed", error);
  }

  const base = process.env.RESOURCE_ASSET_BASE_URL;
  if (!base) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Downloads are not configured in this environment. Set RESOURCE_ASSET_BASE_URL, or email engage@anuradhasolutions.in and we will send the file.",
      },
      { status: 503 },
    );
  }

  const extension = EXTENSIONS[resource.format] ?? "pdf";
  return NextResponse.redirect(`${base.replace(/\/$/, "")}/${slug}.${extension}`, 302);
}
