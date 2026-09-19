"use client";

import { useState } from "react";

type State = "idle" | "loading" | "done" | "error";

export function NewsletterForm({ className = "" }: { className?: string }) {
  const [state, setState] = useState<State>("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const body = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !body.ok) throw new Error(body.error ?? "Subscription failed");
      setState("done");
      setEmail("");
    } catch (cause) {
      setState("error");
      setError(cause instanceof Error ? cause.message : "Something went wrong");
    }
  }

  if (state === "done") {
    return (
      <p className={`rounded-card border border-accent-300/40 bg-accent-300/10 px-4 py-3 text-sm text-accent-100 ${className}`}>
        You&apos;re in. The next Growth Brief lands on the first Tuesday of the fortnight.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className} noValidate>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Work email
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.in"
          className="h-11 w-full min-w-0 rounded-card border border-white/15 bg-white/5 px-3.5 text-sm text-white placeholder:text-mist-500 focus:border-accent-300 focus:outline-none"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="h-11 shrink-0 rounded-card bg-accent-300 px-4 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-200 disabled:opacity-60"
        >
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs text-accent-200">
          {error}
        </p>
      ) : null}
      <p className="mt-2 text-[0.72rem] leading-relaxed text-mist-500">
        No pitches. Unsubscribe in one click.
      </p>
    </form>
  );
}
