/**
 * Process flow for a processing plant: intake → treatment → packing → despatch.
 * The moving dot is the only looping animation on the page, and it pauses for
 * reduced-motion users via the global keyframe override.
 */

const stages = [
  { id: "intake", label: "Raw intake", detail: "Weighbridge, QC, chilling" },
  { id: "process", label: "Processing", detail: "Pasteurise, separate, blend" },
  { id: "pack", label: "Packing", detail: "Fill, seal, code, carton" },
  { id: "store", label: "Cold store", detail: "Batch hold, FEFO" },
  { id: "dispatch", label: "Despatch", detail: "Route load, e-way bill" },
];

export function FactoryFlow({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  const W = 720;
  const H = 180;
  const gap = (W - 80) / (stages.length - 1);
  const cy = 74;

  return (
    <figure className={className} data-chart>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Plant process flow: raw intake, processing, packing, cold store, despatch, with quality gates between each stage."
        className="w-full"
      >
        <line
          x1={40}
          x2={W - 40}
          y1={cy}
          y2={cy}
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth="2"
        />

        <path
          d={`M40,${cy} L${W - 40},${cy}`}
          stroke={dark ? "var(--color-accent-300)" : "var(--color-brand-500)"}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          data-draw
          style={{ "--draw-length": 700 } as React.CSSProperties}
        />

        {stages.map((stage, index) => {
          const cx = 40 + gap * index;
          return (
            <g
              key={stage.id}
              data-fade
              style={{ "--fade-delay": `${240 + index * 150}ms` } as React.CSSProperties}
            >
              <circle
                cx={cx}
                cy={cy}
                r="15"
                fill={dark ? "var(--color-ink-900)" : "var(--color-paper)"}
                stroke={dark ? "var(--color-accent-300)" : "var(--color-brand-500)"}
                strokeWidth="2"
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                className="fill-current font-mono text-[10px] font-medium"
              >
                {index + 1}
              </text>
              <text x={cx} y={cy + 38} textAnchor="middle" className="fill-current text-[11px] font-semibold">
                {stage.label}
              </text>
              <text x={cx} y={cy + 54} textAnchor="middle" className="fill-current text-[9.5px] opacity-60">
                {stage.detail}
              </text>
              <text x={cx} y={cy - 28} textAnchor="middle" className="fill-current font-mono text-[8.5px] uppercase tracking-wider opacity-50">
                QC {index + 1}
              </text>
            </g>
          );
        })}

        {/* Material moving through the line. */}
        <circle
          r="4.5"
          fill={dark ? "var(--color-accent-200)" : "var(--color-brand-600)"}
          data-fade
          style={{ "--fade-delay": "900ms" } as React.CSSProperties}
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path={`M40,${cy} L${W - 40},${cy}`}
            keyPoints="0;1"
            keyTimes="0;1"
            calcMode="linear"
          />
        </circle>
      </svg>
    </figure>
  );
}
