import type { IconName } from "@/content/types";

/**
 * A single stroke-based icon family. 24px grid, 1.5 stroke, round caps —
 * every glyph is drawn on the same skeleton so mixed rows stay optically even.
 * See docs/04-design-system.md for the construction rules.
 */
const paths: Record<IconName, string> = {
  strategy: "M4 20V8m0 0 5-4 5 3 6-4M4 20h16M9 20v-7m5 7v-9m5 9V9",
  finance: "M12 3v18M8.5 7.5h6.2a2.8 2.8 0 0 1 0 5.6H9a2.8 2.8 0 0 0 0 5.6h6.5",
  operations:
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm8 3a8 8 0 0 0-.2-1.7l2-1.5-2-3.4-2.3 1a8 8 0 0 0-2.9-1.7L14.3 2H9.7l-.3 2.7a8 8 0 0 0-2.9 1.7l-2.3-1-2 3.4 2 1.5A8 8 0 0 0 4 12c0 .6.1 1.1.2 1.7l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 2.9 1.7l.3 2.7h4.6l.3-2.7a8 8 0 0 0 2.9-1.7l2.3 1 2-3.4-2-1.5c.1-.6.2-1.1.2-1.7Z",
  brand: "M12 3 4 7v6c0 5 3.4 7.3 8 8 4.6-.7 8-3 8-8V7l-8-4Zm-3 9 2.2 2.2L15.5 10",
  technology:
    "M4 6h16v10H4zM9 20h6M12 16v4M8 10h2.5M13.5 10H16M8 13h8",
  compliance:
    "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5M10 8h2",
  dairy: "M9 3h6l-1 3 2 4v11H8V10l2-4-1-3Zm-1 9h8",
  food: "M6 3v7a3 3 0 0 0 6 0V3M9 13v8M17 3c1.8 1.4 2.5 3.4 2.5 6S18.8 14 17 15v6",
  sweets: "M12 4a5 5 0 0 1 5 5c0 3-2 4-2 6H9c0-2-2-3-2-6a5 5 0 0 1 5-5Zm-4 15h8",
  agriculture: "M12 21V9m0 0c0-3 2-5 5-5 0 3-2 5-5 5Zm0 0c0-3-2-5-5-5 0 3 2 5 5 5Zm-7 12h14",
  healthcare: "M12 5v14M5 12h14M4 4h16v16H4z",
  hospitality: "M3 21h18M5 21V8l7-4 7 4v13M10 21v-6h4v6M9 11h1.5M13.5 11H15",
  retail: "M4 8h16l-1.3 12H5.3L4 8Zm4 0V6a4 4 0 0 1 8 0v2",
  factory: "M3 21h18M4 21V11l5 3V11l5 3V7l5 3v11M8 17h1.5M13 17h1.5",
  growth: "M4 19 10 12l3.5 3L20 6m0 0h-5m5 0v5",
  document: "M7 3h7l4 4v14H7zM14 3v4h4M10 13h5M10 17h3",
  shield: "M12 3 5 6v6c0 4.5 3 7.6 7 9 4-1.4 7-4.5 7-9V6l-7-3Z",
  spark: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.6 2.6M15.4 15.4 18 18M18 6l-2.6 2.6M8.6 15.4 6 18",
};

export function Icon({
  name,
  className = "",
  strokeWidth = 1.5,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`size-6 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

/** Icon inside the standard tinted tile used on service and industry cards. */
export function IconTile({
  name,
  tone = "brand",
  className = "",
}: {
  name: IconName;
  tone?: "brand" | "accent" | "onDark";
  className?: string;
}) {
  const tones = {
    brand: "bg-brand-50 text-brand-600 ring-brand-100",
    accent: "bg-accent-50 text-accent-600 ring-accent-100",
    onDark: "bg-white/10 text-accent-200 ring-white/15",
  } as const;

  return (
    <span
      className={`inline-flex size-11 items-center justify-center rounded-card ring-1 ${tones[tone]} ${className}`}
    >
      <Icon name={name} />
    </span>
  );
}
