"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up figure. Parses the numeric part out of strings like "₹640 Cr" or
 * "3.1x" so the prefix and suffix survive, and animates only once, on entry.
 */
export function Counter({
  value,
  className = "",
  durationMs = 1400,
}: {
  value: string;
  className?: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix = "", rawNumber = "0", suffix = ""] = match;
    const decimals = rawNumber.includes(".") ? rawNumber.split(".")[1]!.length : 0;
    const target = Number(rawNumber.replace(/,/g, ""));
    if (!Number.isFinite(target)) return;

    const render = (current: number) =>
      `${prefix}${current.toLocaleString("en-IN", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    // No zeroing setState here: the first animation frame already renders a
    // value at progress ~0, so the count-up starts from zero on its own and the
    // server-rendered figure stays in the HTML until the element is in view.
    let frame = 0;
    let start: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const tick = (now: number) => {
          start ??= now;
          const progress = Math.min(1, (now - start) / durationMs);
          // Ease-out cubic: fast start reads as responsive, slow end as precise.
          const eased = 1 - (1 - progress) ** 3;
          setDisplay(render(target * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
          else setDisplay(value);
        };

        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
