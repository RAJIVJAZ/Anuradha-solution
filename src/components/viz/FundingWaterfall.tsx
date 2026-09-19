/**
 * Means-of-finance waterfall for a typical ₹14.2 crore food processing project.
 * Reading it top to bottom answers the founder's real question: "how much of
 * this do I have to put in?"
 */

const segments = [
  { label: "Promoter equity", value: 3.1, tone: "var(--color-ink-700)" },
  { label: "Term loan", value: 7.8, tone: "var(--color-brand-600)" },
  { label: "Capital subsidy", value: 2.4, tone: "var(--color-accent-400)" },
  { label: "Working capital", value: 0.9, tone: "var(--color-viz-3)" },
];

export function FundingWaterfall({ className = "" }: { className?: string }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const W = 520;
  const barHeight = 46;
  const gap = 14;
  const H = segments.length * (barHeight + gap) + 54;
  const trackWidth = W - 160;

  // Offsets are computed up front so the render callback stays pure — a
  // running total mutated inside .map() is reassigned after render completes.
  const laid = segments.reduce<{ segment: (typeof segments)[number]; offset: number }[]>(
    (acc, segment) => {
      const previous = acc[acc.length - 1];
      const offset = previous ? previous.offset + previous.segment.value : 0;
      return [...acc, { segment, offset }];
    },
    [],
  );

  return (
    <figure className={className} data-chart>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Means of finance for a ₹${total.toFixed(1)} crore project: promoter equity ₹3.1 crore, term loan ₹7.8 crore, capital subsidy ₹2.4 crore, working capital ₹0.9 crore.`}
        className="w-full"
      >
        {laid.map(({ segment, offset }, index) => {
          const width = (segment.value / total) * trackWidth;
          const x = 132 + (offset / total) * trackWidth;
          const yPos = index * (barHeight + gap) + 8;

          return (
            <g key={segment.label}>
              <text
                x={122}
                y={yPos + barHeight / 2 + 4}
                textAnchor="end"
                className="fill-current text-[11px] font-medium"
              >
                {segment.label}
              </text>

              <rect
                x={132}
                y={yPos}
                width={trackWidth}
                height={barHeight}
                rx="3"
                fill="currentColor"
                fillOpacity="0.06"
              />

              <rect
                x={x}
                y={yPos}
                width={width}
                height={barHeight}
                rx="3"
                fill={segment.tone}
                style={
                  {
                    transformOrigin: `${x}px 0`,
                    animation: "none",
                    "--fade-delay": `${index * 170}ms`,
                  } as React.CSSProperties
                }
                data-fade
              />

              <text
                x={x + width + 10}
                y={yPos + barHeight / 2 + 4}
                className="fill-current font-mono text-[11px] font-medium"
                data-fade
                style={{ "--fade-delay": `${index * 170 + 220}ms` } as React.CSSProperties}
              >
                ₹{segment.value.toFixed(1)} Cr
              </text>
            </g>
          );
        })}

        <line
          x1={132}
          x2={W - 20}
          y1={H - 34}
          y2={H - 34}
          stroke="currentColor"
          strokeOpacity="0.18"
        />
        <text x={122} y={H - 12} textAnchor="end" className="fill-current text-[11px] font-semibold">
          Total project cost
        </text>
        <text x={132} y={H - 12} className="fill-current font-mono text-[12px] font-semibold">
          ₹{total.toFixed(1)} Cr
        </text>
        <text x={W - 20} y={H - 12} textAnchor="end" className="fill-current font-mono text-[10px] opacity-60">
          Promoter contribution 22%
        </text>
      </svg>
    </figure>
  );
}
