/**
 * Before/after comparison bars. Used on case studies and the operations page.
 * Each pair animates in sequence so the eye reads left to right.
 */

export interface BarDatum {
  label: string;
  before: number;
  after: number;
}

export function RevenueBars({
  data,
  unit = "",
  tone = "light",
  className = "",
  ariaLabel,
}: {
  data: BarDatum[];
  unit?: string;
  tone?: "light" | "dark";
  className?: string;
  ariaLabel: string;
}) {
  const W = 520;
  const H = 260;
  const PAD = { top: 24, right: 12, bottom: 44, left: 12 };
  const max = Math.max(...data.flatMap((datum) => [datum.before, datum.after])) * 1.18;
  const groupWidth = (W - PAD.left - PAD.right) / data.length;
  const barWidth = Math.min(38, groupWidth / 3.1);
  const dark = tone === "dark";

  const scale = (value: number) => ((H - PAD.top - PAD.bottom) * value) / max;

  return (
    <figure className={className} data-chart>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel} className="w-full">
        <line
          x1={PAD.left}
          x2={W - PAD.right}
          y1={H - PAD.bottom}
          y2={H - PAD.bottom}
          stroke="currentColor"
          strokeOpacity="0.18"
        />

        {data.map((datum, index) => {
          const centre = PAD.left + groupWidth * index + groupWidth / 2;
          const beforeHeight = scale(datum.before);
          const afterHeight = scale(datum.after);
          const baseY = H - PAD.bottom;

          return (
            <g key={datum.label}>
              <rect
                x={centre - barWidth - 3}
                y={baseY - beforeHeight}
                width={barWidth}
                height={beforeHeight}
                rx="2"
                fill="currentColor"
                fillOpacity={dark ? 0.22 : 0.16}
                data-bar
                style={{ "--bar-delay": `${index * 140}ms` } as React.CSSProperties}
              />
              <rect
                x={centre + 3}
                y={baseY - afterHeight}
                width={barWidth}
                height={afterHeight}
                rx="2"
                fill={dark ? "var(--color-accent-300)" : "var(--color-brand-600)"}
                data-bar
                style={{ "--bar-delay": `${index * 140 + 90}ms` } as React.CSSProperties}
              />

              <text
                x={centre + 3 + barWidth / 2}
                y={baseY - afterHeight - 8}
                textAnchor="middle"
                className="fill-current font-mono text-[10px] font-medium"
                data-fade
                style={{ "--fade-delay": `${index * 140 + 420}ms` } as React.CSSProperties}
              >
                {datum.after}
                {unit}
              </text>
              <text
                x={centre - barWidth / 2 - 3}
                y={baseY - beforeHeight - 8}
                textAnchor="middle"
                className="fill-current font-mono text-[10px] opacity-55"
                data-fade
                style={{ "--fade-delay": `${index * 140 + 340}ms` } as React.CSSProperties}
              >
                {datum.before}
                {unit}
              </text>

              <text
                x={centre}
                y={H - 22}
                textAnchor="middle"
                className="fill-current text-[10.5px] opacity-70"
              >
                {datum.label}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[0.68rem] uppercase tracking-wider opacity-70">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="size-2.5 rounded-sm bg-current opacity-25" />
          Before
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="size-2.5 rounded-sm"
            style={{ background: dark ? "var(--color-accent-300)" : "var(--color-brand-600)" }}
          />
          After
        </span>
      </figcaption>
    </figure>
  );
}
