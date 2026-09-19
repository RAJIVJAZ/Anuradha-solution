import Link from "next/link";
import { site } from "@/content/site";

/**
 * Wordmark + monogram. The monogram is an upward step-chart inside a square —
 * it reads as "growth" at 24px, which is where it spends most of its life.
 */
export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${site.name} home`}>
      <span
        className={`grid size-9 place-items-center rounded-[0.35rem] transition-colors ${
          dark ? "bg-accent-300 text-ink-950" : "bg-ink-900 text-accent-300"
        }`}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 18h4V13h4V9h4V5" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`block font-serif text-[1.15rem] tracking-tight ${dark ? "text-white" : "text-ink-900"}`}
        >
          Anuradha
        </span>
        <span
          className={`block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-mist-400" : "text-mist-500"
          }`}
        >
          Solutions
        </span>
      </span>
    </Link>
  );
}
