"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ChatNode } from "@/lib/chatFlow";

interface Turn {
  role: "bot" | "visitor";
  lines: string[];
  node?: ChatNode;
}

const OPEN_DELAY_MS = 22_000;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [nudged, setNudged] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  // A single gentle nudge, once per browser session, and never on the contact
  // page where the visitor is already converting.
  useEffect(() => {
    if (window.location.pathname.startsWith("/contact")) return;
    try {
      if (sessionStorage.getItem("as:chat-nudged") === "1") return;
    } catch {
      /* private mode — fall through and nudge once */
    }
    const timer = window.setTimeout(() => {
      setNudged(true);
      try {
        sessionStorage.setItem("as:chat-nudged", "1");
      } catch {
        /* ignore */
      }
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, loading]);

  async function send(nodeId: string, choiceLabel?: string) {
    setLoading(true);
    if (choiceLabel) {
      setTurns((current) => [...current, { role: "visitor", lines: [choiceLabel] }]);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json", "x-as-chat-session": sessionId },
        body: JSON.stringify({ node: nodeId, choice: choiceLabel }),
      });
      const body = (await response.json()) as { ok: boolean; node?: ChatNode };
      if (!body.ok || !body.node) throw new Error("bad turn");
      setTurns((current) => [
        ...current,
        { role: "bot", lines: body.node!.message, node: body.node },
      ]);
    } catch {
      setTurns((current) => [
        ...current,
        {
          role: "bot",
          lines: [
            "Something went wrong on my side. Email engage@anuradhasolutions.in and a consultant will pick it up directly.",
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function openPanel() {
    setOpen(true);
    setNudged(false);
    if (!started.current) {
      started.current = true;
      void send("start");
    }
  }

  const lastNode = [...turns].reverse().find((turn) => turn.node)?.node;

  return (
    <>
      {/* --- Launcher ----------------------------------------------------- */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
        {nudged && !open ? (
          <div
            className="max-w-68 rounded-panel border border-mist-200 bg-paper p-4 shadow-lift"
            style={{ animation: "as-rise 420ms var(--ease-entrance) both" }}
          >
            <p className="text-sm leading-relaxed text-ink-800">
              Looking for funding, a plant, or a subsidy? I can point you to the right place in four
              questions.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={openPanel}
                className="rounded-card bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white"
              >
                Start
              </button>
              <button
                type="button"
                onClick={() => setNudged(false)}
                className="rounded-card px-3 py-1.5 text-xs font-medium text-mist-600"
              >
                No thanks
              </button>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openPanel())}
          aria-expanded={open}
          aria-label={open ? "Close the assistant" : "Open the assistant"}
          className="relative grid size-14 place-items-center rounded-full bg-ink-900 text-white shadow-lift transition-transform hover:scale-105"
        >
          {!open ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full bg-brand-400"
              style={{ animation: "as-pulse-ring 2.8s var(--ease-standard) infinite" }}
            />
          ) : null}
          <svg viewBox="0 0 24 24" aria-hidden="true" className="relative size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" />
            ) : (
              <path d="M21 12a8 8 0 0 1-8 8H8l-4 3v-5.5A8 8 0 0 1 13 4a8 8 0 0 1 8 8Z" />
            )}
          </svg>
        </button>
      </div>

      {/* --- Panel -------------------------------------------------------- */}
      {open ? (
        <div
          role="dialog"
          aria-label="Anuradha Solutions assistant"
          className="fixed inset-x-3 bottom-24 z-50 flex max-h-[min(34rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-panel border border-mist-200 bg-paper shadow-lift sm:inset-x-auto sm:right-5 sm:w-96 print:hidden"
          style={{ animation: "as-rise 320ms var(--ease-entrance) both" }}
        >
          <div className="flex items-center gap-3 border-b border-mist-200 bg-ink-950 px-4 py-3.5">
            <span className="grid size-9 place-items-center rounded-full bg-accent-300 font-serif text-sm text-ink-950">
              A
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Anu · Anuradha Solutions</p>
              <p className="text-[0.72rem] text-mist-400">
                Scripted assistant — a consultant reviews every answer
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
            {turns.map((turn, index) => (
              <div key={index} className={turn.role === "visitor" ? "flex justify-end" : ""}>
                {turn.role === "visitor" ? (
                  <p className="max-w-[85%] rounded-panel rounded-br-sm bg-brand-600 px-3.5 py-2.5 text-sm text-white">
                    {turn.lines[0]}
                  </p>
                ) : (
                  <div className="max-w-[92%] space-y-2">
                    {turn.lines.map((line) => (
                      <p
                        key={line}
                        className="rounded-panel rounded-bl-sm bg-mist-100 px-3.5 py-2.5 text-sm leading-relaxed text-ink-800"
                      >
                        {line}
                      </p>
                    ))}

                    {turn.node?.recommend ? (
                      <ul className="space-y-1.5 pt-1">
                        {turn.node.recommend.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-between gap-3 rounded-card border border-mist-200 px-3 py-2 text-[0.82rem] font-medium text-ink-800 transition-colors hover:border-brand-300 hover:text-brand-700"
                            >
                              {item.label}
                              <span aria-hidden="true">→</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                )}
              </div>
            ))}

            {loading ? (
              <p className="flex gap-1 px-1" aria-label="Anu is typing">
                {[0, 140, 280].map((delay) => (
                  <span
                    key={delay}
                    className="size-1.5 rounded-full bg-mist-400"
                    style={{ animation: `as-drift 900ms ${delay}ms ease-in-out infinite` }}
                  />
                ))}
              </p>
            ) : null}
          </div>

          {lastNode?.options?.length ? (
            <div className="border-t border-mist-200 bg-mist-50 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {lastNode.options.map((option) => (
                  <button
                    key={option.next + option.label}
                    type="button"
                    disabled={loading}
                    onClick={() => void send(option.next, option.label)}
                    className="rounded-full border border-mist-300 bg-paper px-3 py-1.5 text-[0.8rem] font-medium text-ink-800 transition-colors hover:border-brand-400 hover:text-brand-700 disabled:opacity-50"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ) : lastNode?.cta ? (
            <div className="border-t border-mist-200 bg-mist-50 px-4 py-3">
              <Link
                href={lastNode.cta.href}
                onClick={() => setOpen(false)}
                className="flex h-10 items-center justify-center rounded-card bg-brand-600 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
              >
                {lastNode.cta.label}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setTurns([]);
                  started.current = false;
                  void send("start");
                  started.current = true;
                }}
                className="mt-2 w-full text-center text-[0.75rem] text-mist-500 underline underline-offset-2"
              >
                Start over
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
