/**
 * In-memory fixed-window rate limiter.
 *
 * Good enough to stop a single bot hammering the lead endpoint from one IP on a
 * single Vercel instance. For multi-region production, swap the Map for Upstash
 * Redis — the interface stays the same (docs/11-lead-funnel.md).
 */

interface Window {
  count: number;
  resetAt: number;
}

const globalForLimit = globalThis as unknown as { asRateLimit?: Map<string, Window> };
const buckets = (globalForLimit.asRateLimit ??= new Map<string, Window>());

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSeconds: 0 };
  }

  existing.count += 1;

  if (existing.count > limit) {
    return { ok: false, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
  }

  // Opportunistic cleanup keeps the Map from growing without bound.
  if (buckets.size > 5000) {
    for (const [bucketKey, window] of buckets) {
      if (window.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  return { ok: true, retryAfterSeconds: 0 };
}

export function clientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip");
}
