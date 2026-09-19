"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/types";

/**
 * FAQ accordion. Single-open by default because these answers are long and
 * two open panels push the CTA below the fold on mobile.
 */
export function Accordion({ items, tone = "light" }: { items: Faq[]; tone?: "light" | "dark" }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  const dark = tone === "dark";

  return (
    <div className={`divide-y ${dark ? "divide-white/10" : "divide-mist-200"}`}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className={`flex w-full items-start justify-between gap-6 py-5 text-left font-sans text-base font-semibold transition-colors ${
                  dark ? "text-white hover:text-accent-200" : "text-ink-900 hover:text-brand-700"
                }`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-transform duration-[220ms] ${
                    dark ? "border-white/25" : "border-mist-300"
                  } ${isOpen ? "rotate-45" : ""}`}
                >
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M6 1.5v9M1.5 6h9" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`${id}-panel-${index}`}
              hidden={!isOpen}
              className={`pb-6 pr-10 text-[0.95rem] leading-relaxed ${dark ? "text-mist-300" : "text-mist-600"}`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
