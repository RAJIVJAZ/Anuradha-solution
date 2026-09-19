/**
 * Approvals timeline. Bars are weeks from project kick-off; the point is that
 * these run in parallel, not in series — that's the whole argument of the
 * compliance practice.
 */

const approvals = [
  { name: "Company / MSME registration", start: 0, weeks: 2, tone: "var(--color-brand-600)" },
  { name: "Land use & NA order", start: 0, weeks: 8, tone: "var(--color-ink-700)" },
  { name: "Consent to Establish (MPCB)", start: 2, weeks: 10, tone: "var(--color-viz-3)" },
  { name: "Factory plan approval", start: 4, weeks: 7, tone: "var(--color-viz-4)" },
  { name: "FSSAI central licence", start: 6, weeks: 8, tone: "var(--color-accent-400)" },
  { name: "Fire NOC", start: 10, weeks: 5, tone: "var(--color-viz-5)" },
  { name: "Boiler registration", start: 14, weeks: 4, tone: "var(--color-viz-6)" },
  { name: "Consent to Operate", start: 18, weeks: 6, tone: "var(--color-brand-400)" },
];

const TOTAL_WEEKS = 26;

export function ComplianceGrid({ className = "" }: { className?: string }) {
  const W = 620;
  const rowHeight = 26;
  const H = approvals.length * rowHeight + 44;
  const labelWidth = 200;
  const trackWidth = W - labelWidth - 20;

  return (
    <figure className={className} data-chart>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Gantt chart of eight statutory approvals for a food plant, running in parallel across 26 weeks from kick-off to Consent to Operate."
        className="w-full"
      >
        {[0, 4, 8, 12, 16, 20, 24].map((week) => {
          const x = labelWidth + (week / TOTAL_WEEKS) * trackWidth;
          return (
            <g key={week}>
              <line x1={x} x2={x} y1={14} y2={H - 30} stroke="currentColor" strokeOpacity="0.1" />
              <text x={x} y={H - 14} textAnchor="middle" className="fill-current font-mono text-[9px] opacity-55">
                W{week}
              </text>
            </g>
          );
        })}

        {approvals.map((approval, index) => {
          const y = 18 + index * rowHeight;
          const x = labelWidth + (approval.start / TOTAL_WEEKS) * trackWidth;
          const width = (approval.weeks / TOTAL_WEEKS) * trackWidth;

          return (
            <g
              key={approval.name}
              data-fade
              style={{ "--fade-delay": `${index * 90}ms` } as React.CSSProperties}
            >
              <text x={labelWidth - 12} y={y + 13} textAnchor="end" className="fill-current text-[10px]">
                {approval.name}
              </text>
              <rect x={x} y={y + 3} width={width} height="14" rx="3" fill={approval.tone} />
              <text
                x={x + width + 6}
                y={y + 14}
                className="fill-current font-mono text-[8.5px] opacity-60"
              >
                {approval.weeks}w
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
