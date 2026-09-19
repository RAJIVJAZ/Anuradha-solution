/**
 * Revenue trajectory: actual vs. plan.
 *
 * Pure SVG, no client JS — the path draw and label fades are CSS animations
 * triggered by the `data-chart` / `data-shown` contract in globals.css. That
 * keeps the hero at zero hydration cost while still animating on scroll.
 */

const actual = [
  { year: "Yr 0", value: 8 },
  { year: "Yr 1", value: 14 },
  { year: "Yr 2", value: 26 },
  { year: "Yr 3", value: 47 },
  { year: "Yr 4", value: 72 },
  { year: "Yr 5", value: 104 },
];

const baseline = [8, 10, 13, 16, 19, 23];

const W = 560;
const H = 300;
const PAD = { top: 28, right: 52, bottom: 34, left: 44 };
const maxValue = 110;

function x(index: number) {
  return PAD.left + (index * (W - PAD.left - PAD.right)) / (actual.length - 1);
}

function y(value: number) {
  return H - PAD.bottom - (value / maxValue) * (H - PAD.top - PAD.bottom);
}

function line(values: number[]) {
  return values.map((value, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(value)}`).join(" ");
}

export function GrowthCurve({
  className = "",
  caption = "Median client revenue path (₹ crore)",
}: {
  className?: string;
  caption?: string;
}) {
  const actualPath = line(actual.map((point) => point.value));
  const baselinePath = line(baseline);
  const areaPath = `${actualPath} L${x(actual.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;

  return (
    <figure className={className} data-chart>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Line chart comparing the median client revenue path, rising from ₹8 crore to ₹104 crore over five years, against a ₹23 crore do-nothing baseline."
        className="w-full"
      >
        <defs>
          <linearGradient id="gc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-300)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-accent-300)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Gridlines + y labels */}
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(tick)}
              y2={y(tick)}
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 10}
              y={y(tick) + 4}
              textAnchor="end"
              className="fill-current font-mono text-[10px] opacity-45"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* x labels */}
        {actual.map((point, index) => (
          <text
            key={point.year}
            x={x(index)}
            y={H - 12}
            textAnchor="middle"
            className="fill-current font-mono text-[10px] opacity-45"
          >
            {point.year}
          </text>
        ))}

        <path d={areaPath} fill="url(#gc-fill)" data-fade style={{ "--fade-delay": "700ms" } as React.CSSProperties} />

        <path
          d={baselinePath}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          data-fade
          style={{ "--fade-delay": "260ms" } as React.CSSProperties}
        />

        <path
          d={actualPath}
          fill="none"
          stroke="var(--color-accent-300)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          data-draw
          style={{ "--draw-length": 1400 } as React.CSSProperties}
        />

        {actual.map((point, index) => (
          <g
            key={`dot-${point.year}`}
            data-fade
            style={{ "--fade-delay": `${420 + index * 130}ms` } as React.CSSProperties}
          >
            <circle cx={x(index)} cy={y(point.value)} r="4.5" fill="var(--color-accent-300)" />
            <circle cx={x(index)} cy={y(point.value)} r="1.75" fill="var(--color-ink-950)" />
          </g>
        ))}

        <g data-fade style={{ "--fade-delay": "1250ms" } as React.CSSProperties}>
          <text
            x={x(actual.length - 1) + 8}
            y={y(104) + 4}
            className="fill-current font-mono text-[11px] font-medium"
            style={{ fill: "var(--color-accent-300)" }}
          >
            ₹104 Cr
          </text>
          <text
            x={x(actual.length - 1) + 8}
            y={y(23) + 4}
            className="fill-current font-mono text-[11px] opacity-55"
          >
            ₹23 Cr
          </text>
        </g>
      </svg>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-mono text-[0.68rem] uppercase tracking-wider opacity-70">
        <span className="flex items-center gap-2">
          <span aria-hidden="true" className="h-0.5 w-5 rounded" style={{ background: "var(--color-accent-300)" }} />
          With an engagement
        </span>
        <span className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="h-0.5 w-5 rounded opacity-40"
            style={{ background: "currentColor" }}
          />
          Do-nothing baseline
        </span>
        <span className="opacity-60">{caption}</span>
      </figcaption>
    </figure>
  );
}
