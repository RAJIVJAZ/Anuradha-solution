import type { ReactNode } from "react";

export function Eyebrow({
  children,
  tone = "brand",
  className = "",
}: {
  children: ReactNode;
  tone?: "brand" | "accent" | "onDark";
  className?: string;
}) {
  const tones = {
    brand: "text-brand-600",
    accent: "text-accent-600",
    onDark: "text-accent-300",
  } as const;

  return (
    <p
      className={`flex items-center gap-2.5 font-sans text-eyebrow font-semibold uppercase ${tones[tone]} ${className}`}
    >
      <span aria-hidden="true" className="h-px w-6 bg-current opacity-50" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  className = "",
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  action?: ReactNode;
}) {
  const dark = tone === "dark";
  const centred = align === "center";

  return (
    <div
      className={`${centred ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
      data-reveal
    >
      {eyebrow ? (
        <Eyebrow tone={dark ? "onDark" : "brand"} className={centred ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={`mt-4 text-display-sm sm:text-display-md ${dark ? "text-white" : "text-ink-900"}`}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={`mt-5 text-lg leading-relaxed ${dark ? "text-mist-300" : "text-mist-600"}`}
        >
          {lede}
        </p>
      ) : null}
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "accent" | "onDark";
}) {
  const tones = {
    neutral: "border-mist-300 bg-mist-50 text-mist-700",
    brand: "border-brand-200 bg-brand-50 text-brand-700",
    accent: "border-accent-200 bg-accent-50 text-accent-700",
    onDark: "border-white/20 bg-white/5 text-mist-200",
  } as const;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-sans text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/** Large figure + caption. Used in hero strips, results blocks and portals. */
export function StatBlock({
  value,
  label,
  detail,
  tone = "light",
}: {
  value: string;
  label: string;
  detail?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div>
      <p
        className={`font-serif text-4xl leading-none tracking-tight sm:text-5xl ${dark ? "text-accent-300" : "text-brand-700"}`}
      >
        {value}
      </p>
      <p className={`mt-3 text-sm font-semibold ${dark ? "text-white" : "text-ink-900"}`}>
        {label}
      </p>
      {detail ? (
        <p className={`mt-1 text-sm ${dark ? "text-mist-400" : "text-mist-600"}`}>{detail}</p>
      ) : null}
    </div>
  );
}
