/**
 * Digital-maturity radar across the six systems we assess in a technology
 * diagnostic. Two polygons: where the client is now, and where the roadmap
 * takes them in 12 months.
 */

const axes = [
  { label: "ERP", now: 2, target: 4 },
  { label: "Production", now: 1, target: 4 },
  { label: "Quality", now: 2, target: 5 },
  { label: "Sales / CRM", now: 1, target: 4 },
  { label: "Finance MIS", now: 3, target: 5 },
  { label: "Automation", now: 1, target: 3 },
];

const LEVELS = 5;

export function AutomationRadar({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const size = 320;
  const centre = size / 2;
  const radius = 108;
  const dark = tone === "dark";

  const point = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const r = (radius * value) / LEVELS;
    return [centre + r * Math.cos(angle), centre + r * Math.sin(angle)] as const;
  };

  const polygon = (key: "now" | "target") =>
    axes.map((axis, index) => point(index, axis[key]).join(",")).join(" ");

  return (
    <figure className={className} data-chart>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label="Radar chart of digital maturity across ERP, production, quality, CRM, finance MIS and automation, comparing current state with the twelve-month target."
        className="w-full max-w-80"
      >
        {Array.from({ length: LEVELS }, (_, level) => (
          <polygon
            key={level}
            points={axes.map((_, index) => point(index, level + 1).join(",")).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeOpacity={level === LEVELS - 1 ? 0.24 : 0.1}
          />
        ))}

        {axes.map((axis, index) => {
          const [x, y] = point(index, LEVELS);
          const [lx, ly] = point(index, LEVELS + 0.72);
          return (
            <g key={axis.label}>
              <line x1={centre} y1={centre} x2={x} y2={y} stroke="currentColor" strokeOpacity="0.1" />
              <text
                x={lx}
                y={ly + 3}
                textAnchor={lx > centre + 6 ? "start" : lx < centre - 6 ? "end" : "middle"}
                className="fill-current text-[10.5px] font-medium opacity-80"
              >
                {axis.label}
              </text>
            </g>
          );
        })}

        <polygon
          points={polygon("target")}
          fill={dark ? "var(--color-accent-300)" : "var(--color-brand-500)"}
          fillOpacity="0.14"
          stroke={dark ? "var(--color-accent-300)" : "var(--color-brand-500)"}
          strokeWidth="1.75"
          strokeDasharray="4 3"
          data-fade
          style={{ "--fade-delay": "260ms" } as React.CSSProperties}
        />
        <polygon
          points={polygon("now")}
          fill={dark ? "var(--color-viz-3)" : "var(--color-ink-700)"}
          fillOpacity="0.3"
          stroke={dark ? "var(--color-mist-200)" : "var(--color-ink-700)"}
          strokeWidth="2"
          data-fade
          style={{ "--fade-delay": "520ms" } as React.CSSProperties}
        />
      </svg>

      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.68rem] uppercase tracking-wider opacity-70">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2.5 rounded-sm bg-current opacity-60" />
          Today
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-sm"
            style={{ background: dark ? "var(--color-accent-300)" : "var(--color-brand-500)" }}
          />
          12-month target
        </span>
      </figcaption>
    </figure>
  );
}
