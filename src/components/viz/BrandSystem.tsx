/**
 * Brand architecture diagram: one master brand, three sub-brands, and the
 * touchpoints each one owns. Used on the branding service page.
 */

const children = [
  { label: "Core range", detail: "Volume, trade" },
  { label: "Premium", detail: "Modern trade" },
  { label: "Institutional", detail: "B2B, HoReCa" },
];

const touchpoints = ["Pack", "Shelf", "Website", "Social", "Trade kit", "Fleet"];

export function BrandSystem({ className = "" }: { className?: string }) {
  const W = 560;
  const H = 300;

  return (
    <figure className={className} data-chart>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Brand architecture: a master brand above three sub-brands — core range, premium and institutional — each expressed across six touchpoints."
        className="w-full"
      >
        <g data-fade style={{ "--fade-delay": "0ms" } as React.CSSProperties}>
          <rect x={W / 2 - 78} y={16} width="156" height="50" rx="6" fill="var(--color-ink-900)" />
          <text x={W / 2} y={38} textAnchor="middle" className="fill-white text-[11px] font-semibold">
            Master brand
          </text>
          <text x={W / 2} y={54} textAnchor="middle" className="fill-white text-[9px] opacity-70">
            Promise · voice · identity
          </text>
        </g>

        {children.map((child, index) => {
          const cx = 96 + index * 184;
          return (
            <g
              key={child.label}
              data-fade
              style={{ "--fade-delay": `${200 + index * 130}ms` } as React.CSSProperties}
            >
              <path
                d={`M${W / 2},66 V96 H${cx} V126`}
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />
              <rect x={cx - 70} y={126} width="140" height="46" rx="6" fill="var(--color-brand-600)" />
              <text x={cx} y={146} textAnchor="middle" className="fill-white text-[10.5px] font-semibold">
                {child.label}
              </text>
              <text x={cx} y={161} textAnchor="middle" className="fill-white text-[9px] opacity-75">
                {child.detail}
              </text>
            </g>
          );
        })}

        {touchpoints.map((touchpoint, index) => {
          const perRow = 6;
          const x = 30 + (index % perRow) * 84;
          const y = 216;
          return (
            <g
              key={touchpoint}
              data-fade
              style={{ "--fade-delay": `${620 + index * 70}ms` } as React.CSSProperties}
            >
              <rect
                x={x}
                y={y}
                width="72"
                height="34"
                rx="4"
                fill="none"
                stroke="var(--color-accent-400)"
                strokeWidth="1.25"
              />
              <text x={x + 36} y={y + 22} textAnchor="middle" className="fill-current text-[9.5px] font-medium">
                {touchpoint}
              </text>
            </g>
          );
        })}

        <text
          x={W / 2}
          y={282}
          textAnchor="middle"
          className="fill-current font-mono text-[9px] uppercase tracking-widest opacity-55"
          data-fade
          style={{ "--fade-delay": "1100ms" } as React.CSSProperties}
        >
          one system · six touchpoints · audited quarterly
        </text>
      </svg>
    </figure>
  );
}
