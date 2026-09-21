import { createSupabaseContext, type UserClaims } from "@supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase-backed user verification for Next.js Route Handlers.
 *
 * Next's App Router route handlers already speak the standard Web
 * `Request`/`Response` that `@supabase/server` is built on
 * (`export async function POST(request: Request)`), so `createSupabaseContext`
 * drops in directly — no adapter needed. This file exists so a route only
 * imports `requireUser` (or `optionalUser`) rather than reaching for
 * `createSupabaseContext` itself, matching how `src/lib/crm.ts` and
 * `src/lib/db.ts` each own one integration.
 *
 * Scope, deliberately: this verifies *who is calling*, nothing more. It does
 * not touch the Postgres layer in `src/lib/db.ts` — that stays a trusted
 * server-side `pg` connection with authorization in the application layer,
 * not Row-Level Security. Routing live data through Supabase's RLS-scoped
 * `ctx.supabase` / `ctx.postgres` (see `@supabase/server`'s postgres
 * middleware) is a real option for the admin and client-portal APIs docs
 * 08/09 call out as still-fixture-backed, but it needs RLS policies designed
 * per table first — that's a deliberate follow-up, not bundled in here.
 *
 * Verifying a user needs only `SUPABASE_URL` and a JWKS source
 * (`SUPABASE_JWKS_URL`, which defaults to `{SUPABASE_URL}/auth/v1/.well-known/jwks.json`
 * when unset). `SUPABASE_SECRET_KEY` is not required for this — only for
 * `ctx.supabaseAdmin` operations that bypass RLS.
 */

export const supabaseAvailable = Boolean(process.env.SUPABASE_URL);

export interface AuthedRequest {
  ok: true;
  /** JWT-derived identity: id, email, role, appMetadata, userMetadata. */
  user: UserClaims;
  /** Client scoped to this user's permissions — RLS applies. */
  supabase: SupabaseClient;
}

export interface UnauthenticatedRequest {
  ok: false;
  /** HTTP status to mirror in the route's response. */
  status: number;
  message: string;
  /** Machine-readable error code from @supabase/server, e.g. "INVALID_JWT". */
  code: string;
}

/**
 * Verifies the caller's `Authorization: Bearer <token>` JWT against the
 * project's JWKS. Use at the top of any route that must know who is calling:
 *
 * ```ts
 * export async function GET(request: Request) {
 *   const auth = await requireUser(request);
 *   if (!auth.ok) {
 *     return NextResponse.json({ ok: false, error: auth.message }, { status: auth.status });
 *   }
 *   const { data } = await auth.supabase.from("projects").select();
 *   return NextResponse.json({ ok: true, data });
 * }
 * ```
 *
 * A present-but-invalid token (expired, malformed, wrong signature) is
 * rejected outright rather than treated as anonymous — see
 * `@supabase/server`'s auth-modes docs on fallthrough vs rejection.
 */
export async function requireUser(request: Request): Promise<AuthedRequest | UnauthenticatedRequest> {
  const { data: ctx, error } = await createSupabaseContext(request, { auth: "user" });

  if (error) {
    return { ok: false, status: error.status, message: error.message, code: error.code };
  }

  // `auth: "user"` guarantees userClaims is non-null; the `!` documents that
  // contract rather than papering over a real possibility of null.
  return { ok: true, user: ctx.userClaims!, supabase: ctx.supabase };
}

/**
 * Same verification, but a missing token is not an error — useful for a
 * route that personalises its response for a signed-in caller and still
 * serves anonymous ones. A *present but invalid* token still fails, matching
 * `requireUser`; only the "nothing was sent" case becomes `user: null`.
 *
 * Needs `SUPABASE_SECRET_KEY` set to *something*, even though the `'none'`
 * path never uses it — confirmed by testing: with no secret key configured
 * at all, this throws `MISSING_DEFAULT_SECRET_KEY` even for a request with no
 * credentials; the identical call succeeds the moment any secret key value
 * is present. `requireUser` above has no such requirement. If this route
 * 500s locally, that omitted key — not a real auth failure — is why.
 */
export async function optionalUser(
  request: Request,
): Promise<{ ok: true; user: UserClaims | null; supabase: SupabaseClient } | UnauthenticatedRequest> {
  const { data: ctx, error } = await createSupabaseContext(request, { auth: ["user", "none"] });

  if (error) {
    return { ok: false, status: error.status, message: error.message, code: error.code };
  }

  return { ok: true, user: ctx.userClaims, supabase: ctx.supabase };
}
