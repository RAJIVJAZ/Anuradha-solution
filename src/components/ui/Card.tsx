import Link from "next/link";
import type { ReactNode } from "react";

const surfaces = {
  paper: "border-mist-200 bg-paper",
  mist: "border-mist-200 bg-mist-50",
  onDark: "border-white/10 bg-white/[0.04]",
} as const;

export function Card({
  surface = "paper",
  className = "",
  children,
}: {
  surface?: keyof typeof surfaces;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`rounded-panel border ${surfaces[surface]} ${className}`}>{children}</div>
  );
}

/** Whole-card link target with the standard hover lift. */
export function LinkCard({
  href,
  surface = "paper",
  className = "",
  children,
}: {
  href: string;
  surface?: keyof typeof surfaces;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative block rounded-panel border transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 ${surfaces[surface]} ${
        surface === "onDark"
          ? "hover:border-white/25 hover:bg-white/[0.07]"
          : "hover:border-brand-200 hover:shadow-lift"
      } ${className}`}
    >
      {children}
    </Link>
  );
}
