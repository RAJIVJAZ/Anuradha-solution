/**
 * OEE gauge. A 240° arc rather than a full circle: the eye reads the gap to
 * 100% far more accurately when the scale has visible ends.
 */

export function CapacityGauge({
  value,
  target,
  label,
  caption,
  className = "",
  tone = "light",
}: {
  value: number;
  target: number;
  label: string;
  caption?: string;
  className?: string;
  tone?: "light" | "dark";
}) {
  const size = 220;
  const centre = size / 2;
  const radius = 84;
  const startAngle = 150;
  const sweep = 240;
  const dark = tone === "dark";

  const point = (angle: number, r: number) => {
    const radians = (angle * Math.PI) / 180;
    return [centre + r * Math.cos(radians), centre + r * Math.sin(radians)] as const;
  };

  const arc = (fromValue: number, toValue: number, r: number) => {
    const a1 = startAngle + (sweep * fromValue) / 100;
    const a2 = startAngle + (sweep * toValue) / 100;
    const [x1, y1] = point(a1, r);
    const [x2, y2] = point(a2, r);
    const large = a2 - a1 > 180 ? 1 : 0;
    return `M${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2}`;
  };

  const [targetX, targetY] = point(startAngle + (sweep * target) / 100, radius);
  const [targetOuterX, targetOuterY] = point(startAngle + (sweep * target) / 100, radius + 13);

  return (
    <figure className={className} data-chart>
      <svg
        viewBox={`0 0 ${size} ${size - 24}`}
        role="img"
        aria-label={`${label}: ${value}% against a target of ${target}%.`}
        className="w-full max-w-56"
      >
        <path
          d={arc(0, 100, radius)}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={arc(0, value, radius)}
          fill="none"
          stroke={dark ? "var(--color-accent-300)" : "var(--color-brand-600)"}
          strokeWidth="14"
          strokeLinecap="round"
          data-draw
          style={{ "--draw-length": 420 } as React.CSSProperties}
        />

        <line
          x1={targetX}
          y1={targetY}
          x2={targetOuterX}
          y2={targetOuterY}
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.55"
          data-fade
          style={{ "--fade-delay": "700ms" } as React.CSSProperties}
        />

        <text
          x={centre}
          y={centre + 4}
          textAnchor="middle"
          className="fill-current font-serif text-[2.6rem]"
          data-fade
          style={{ "--fade-delay": "420ms" } as React.CSSProperties}
        >
          {value}%
        </text>
        <text
          x={centre}
          y={centre + 26}
          textAnchor="middle"
          className="fill-current font-mono text-[9.5px] uppercase tracking-wider opacity-60"
          data-fade
          style={{ "--fade-delay": "560ms" } as React.CSSProperties}
        >
          target {target}%
        </text>
      </svg>
      <figcaption className="mt-1 text-sm font-semibold">
        {label}
        {caption ? <span className="mt-0.5 block text-xs font-normal opacity-65">{caption}</span> : null}
      </figcaption>
    </figure>
  );
}
