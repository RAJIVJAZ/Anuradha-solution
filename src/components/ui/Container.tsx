import type { ElementType, ReactNode } from "react";

export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`shell ${className}`}>{children}</Tag>;
}

/** Vertical rhythm wrapper. `tone` swaps the whole band's palette. */
export function Section({
  id,
  tone = "paper",
  size = "base",
  className = "",
  children,
}: {
  id?: string;
  tone?: "paper" | "mist" | "ink" | "brand";
  size?: "tight" | "base" | "loose";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    paper: "bg-paper text-ink-900",
    mist: "bg-mist-50 text-ink-900",
    ink: "bg-ink-950 text-mist-100",
    brand: "bg-brand-800 text-brand-50",
  } as const;

  const sizes = {
    tight: "py-14 sm:py-16",
    base: "py-16 sm:py-24",
    loose: "py-20 sm:py-32",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} ${sizes[size]} ${className}`}>
      {children}
    </section>
  );
}
