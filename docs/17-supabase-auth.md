# 17 — Supabase Auth integration

What is actually wired up, what is deliberately not, and how to use it.

## What this is for

Docs 08 and 09 each flag the same gap: the admin console and client portal
render real layouts against fixture data, with authentication listed as
"to build before production." This is that foundation — a way for any Route
Handler to verify who is calling — not the finished login flow for either
surface. See **Scope** below for exactly where the line sits.

## What was set up

**Project.** A Supabase project ("service", `qpjevyoqgugsztwzjfyw`,
ap-southeast-1, Postgres 17) — created separately from this codebase, fresh
and empty (zero tables) at the time of writing.

**Packages.** `@supabase/server` (server-side auth verification and client
creation) and its required peer `@supabase/supabase-js`. `pg`, the other peer,
was already a dependency.

`@supabase/server` requires **Node ≥ 22** — stricter than Next.js's own
`>=20.9.0`. `package.json` now declares `"engines": { "node": ">=22.0.0" }`.
**Set your Vercel project's Node.js Version to 22.x** (Project Settings →
General → Node.js Version) or the install will run against the wrong runtime.

**Environment variables** — `.env.example` documents four, all optional (the
app runs fully without them, same as every other integration on this site):

| Variable | Needed for | Notes |
| --- | --- | --- |
| `SUPABASE_URL` | Anything | The only hard requirement if you use this at all |
| `SUPABASE_PUBLISHABLE_KEY` | The `supabase` client on a verified request | Safe to expose; it's what RLS is for |
| `SUPABASE_JWKS_URL` | Verifying a JWT without a round trip to the auth server | Optional — derived from `SUPABASE_URL` as `{url}/auth/v1/.well-known/jwks.json` when unset. Both resolved to the same value in testing, so it's set explicitly only for clarity |
| `SUPABASE_SECRET_KEY` | `ctx.supabaseAdmin` (bypasses RLS) — **and**, surprisingly, `optionalUser()` below even on its no-credential path | Never required just to verify a signed-in user via `requireUser()`. Keep it out of `NEXT_PUBLIC_*` |

`.env.local` (gitignored, never committed) has real values for the first
three, verified against the live project via the Supabase MCP connection
(`get_project_url`, `get_publishable_keys` both matched exactly). The secret
key was shown redacted wherever it came from, so only you have the real
value — paste it into `.env.local` yourself if something ends up needing it.

**`src/lib/supabase.ts`.** Two functions, matching how `src/lib/crm.ts` and
`src/lib/db.ts` each own one integration:

```ts
import { requireUser } from "@/lib/supabase";

export async function GET(request: Request) {
  const auth = await requireUser(request);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.message }, { status: auth.status });
  }
  const { data } = await auth.supabase.from("projects").select();
  return NextResponse.json({ ok: true, data });
}
```

`requireUser(request)` verifies the `Authorization: Bearer <token>` header
against the project's JWKS and returns either `{ ok: true, user, supabase }`
(`user` is the JWT-derived identity; `supabase` is a client scoped to that
user — RLS applies) or `{ ok: false, status, message, code }` for the route to
mirror straight into its response. `optionalUser(request)` is the same check
with a missing token treated as `user: null` rather than a rejection, for a
route that personalises for a signed-in caller and still serves anonymous
ones — see the quirk below before reaching for it.

Next.js Route Handlers already speak the standard Web `Request`/`Response`
these functions are built on, so there is no adapter layer.

**Skill.** `npx skills add supabase/server` installed
`.agents/skills/supabase-server/SKILL.md` (symlinked at
`.claude/skills/supabase-server`), tracked by `skills-lock.json`. It carries
the package's own usage conventions — `auth`, not the deprecated `allow`;
`'user'`/`'none'`, not the removed `'always'`/`'public'`; the new
`sb_publishable_*`/`sb_secret_*` key format, never the legacy
`SUPABASE_ANON_KEY`/`SUPABASE_SERVICE_ROLE_KEY` — so a future session touching
this integration picks up the current API rather than an older one it might
otherwise recall.

## A real quirk, found by testing

`optionalUser()` — the `auth: ['user', 'none']` mode — throws
`MISSING_DEFAULT_SECRET_KEY` on its no-credential path when
`SUPABASE_SECRET_KEY` is unset, even though that path never uses a secret key.
Confirmed both ways: identical call, only the presence of *some* secret key
value differs.

```
No SUPABASE_SECRET_KEY set:
  requireUser(no-auth-header)   → 401 MISSING_CREDENTIALS   (correct)
  requireUser(garbage token)    → 401 INVALID_JWT             (correct)
  optionalUser(no-auth-header)  → 500 MISSING_DEFAULT_SECRET_KEY  (surprising)

Any SUPABASE_SECRET_KEY set:
  optionalUser(no-auth-header)  → 200 { user: null, authMode: "none" }
```

`requireUser` has no such requirement — it was exercised extensively above
with zero secret key configured and behaved correctly throughout. This is
documented inline in `src/lib/supabase.ts` on `optionalUser` itself, so it
surfaces at the call site rather than only here.

## Scope — what this is not

Deliberately stopped short of:

- **Wiring auth into `/portal` or `/admin`.** Those pages still render fixture
  data unauthenticated, exactly as before. `@supabase/server` verifies a
  `Bearer` token on an API route (the "backend" the setup instructions named);
  gating a page rendered by a Server Component needs session cookies, which is
  `@supabase/ssr`'s job, not this package's — a different library with a
  different integration point, not requested here.
- **A login UI.** Magic-link vs password vs OAuth provider, and which one for
  staff versus clients, are product decisions, not implementation details.
- **Migrating `db/schema.sql` onto this Supabase project**, or moving
  `src/lib/db.ts` off its own `pg`/`DATABASE_URL` connection onto Supabase's
  RLS-scoped Postgres access (`ctx.supabase` / `withPostgresClient` — see that
  package's `docs/postgres.md`). That path exists and fits this schema's
  shape well, but committing to it means writing an RLS policy for every one
  of the 22 tables first, and doing that well needs per-table decisions this
  doc shouldn't make silently.
- **Applying any migration** to the Supabase project. It remains exactly as
  created: empty, zero tables.

## Natural next step

When the admin/portal auth story is actually built: decide the identity
provider(s) in Supabase Auth, add a `public.users.id → auth.users.id`
foreign key (replacing the placeholder `password_hash` column in
`db/schema.sql`, which predates this integration and assumed a
self-managed credential store), and pick — per docs 08/09 — whether the
live data those pages read stays on `src/lib/db.ts`'s trusted `pg`
connection with authorization in the application layer, or moves onto
Supabase's RLS-scoped access. Both are legitimate; the schema was written
before this integration existed and does not yet assume either.
