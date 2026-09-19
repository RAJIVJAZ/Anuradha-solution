import { Pool, type QueryResultRow } from "pg";
import type { LeadInput } from "@/lib/validation";

/**
 * PostgreSQL access.
 *
 * The pool is created lazily and cached on globalThis so Next's dev-time module
 * reloading doesn't open a new pool on every edit. When DATABASE_URL is absent
 * (local UI work, preview builds, this repo's CI) every write degrades to a
 * no-op instead of throwing — see `dbEnabled`.
 *
 * Schema: db/schema.sql — mirrored in prisma/schema.prisma for teams that
 * prefer the Prisma client.
 */

const globalForDb = globalThis as unknown as { asPool?: Pool };

export const dbEnabled = Boolean(process.env.DATABASE_URL);

export function getPool(): Pool | null {
  if (!dbEnabled) return null;

  if (!globalForDb.asPool) {
    globalForDb.asPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 8_000,
      ssl:
        process.env.DATABASE_SSL === "disable"
          ? undefined
          : { rejectUnauthorized: false },
    });
  }

  return globalForDb.asPool;
}

export async function query<T extends QueryResultRow>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const pool = getPool();
  if (!pool) return [];
  const result = await pool.query<T>(sql, params);
  return result.rows;
}

export interface StoredLead {
  id: string;
  reference: string;
}

/**
 * Persist a lead. Returns null when no database is configured so callers can
 * still complete the request (CRM + notification) and report success.
 */
export async function insertLead(
  lead: LeadInput,
  meta: { score: number; owner: string; stage: string; ip: string | null; userAgent: string | null },
): Promise<StoredLead | null> {
  if (!dbEnabled) return null;

  const rows = await query<StoredLead>(
    `insert into leads (
       name, company, email, phone, city, industry, interest,
       revenue_band, timeline, message, utm_source, utm_medium, utm_campaign,
       landing_path, resource_slug, score, assigned_desk, stage,
       ip_address, user_agent
     ) values (
       $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20
     )
     returning id, reference`,
    [
      lead.name,
      lead.company,
      lead.email,
      lead.phone,
      lead.city,
      lead.industry,
      lead.interest,
      lead.revenue,
      lead.timeline,
      lead.message || null,
      lead.source ?? "direct",
      lead.medium ?? "none",
      lead.campaign ?? "none",
      lead.landingPath ?? "/",
      lead.resourceSlug || null,
      meta.score,
      meta.owner,
      meta.stage,
      meta.ip,
      meta.userAgent,
    ],
  );

  return rows[0] ?? null;
}

export async function insertSubscriber(email: string, source: string): Promise<void> {
  if (!dbEnabled) return;
  await query(
    `insert into newsletter_subscribers (email, source)
     values ($1, $2)
     on conflict (email) do update set source = excluded.source, resubscribed_at = now()`,
    [email, source],
  );
}

export async function recordChatTurn(
  sessionId: string,
  node: string,
  choice: string | null,
): Promise<void> {
  if (!dbEnabled) return;
  await query(
    `insert into chat_events (session_id, node, choice) values ($1, $2, $3)`,
    [sessionId, node, choice],
  );
}
