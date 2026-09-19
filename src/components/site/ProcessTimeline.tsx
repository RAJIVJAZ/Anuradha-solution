import { Eyebrow } from "@/components/ui/Text";

const phases = [
  {
    step: "01",
    week: "Week 0",
    title: "Discovery call",
    detail:
      "Forty-five minutes with a partner, not a salesperson. We ask what you are trying to build and tell you whether we are the right firm. About one conversation in four ends with us saying no.",
  },
  {
    step: "02",
    week: "Week 1",
    title: "Scoping note",
    detail:
      "A two-page note: what we would do, what you would get, what it costs, and what we need from you. Fixed fee wherever the scope can be fixed. No slide deck, no retainer you cannot exit.",
  },
  {
    step: "03",
    week: "Weeks 2–4",
    title: "Diagnostic",
    detail:
      "We rebuild your numbers and walk your plant. This stage is deliberately uncomfortable — it is where we find the constraint that is actually binding rather than the one everybody talks about.",
  },
  {
    step: "04",
    week: "Weeks 4–8",
    title: "Recommendation",
    detail:
      "Options with full financial models, a ranked recommendation, and the downside case at 70% of plan. Presented to you and, where relevant, to your board or your lender.",
  },
  {
    step: "05",
    week: "Months 2–18",
    title: "Execution",
    detail:
      "We stay on the file. Filings, tenders, site reviews, credit committee meetings, commissioning. Our work is not complete at the report — it is complete at the outcome we agreed to measure.",
  },
  {
    step: "06",
    week: "Month 12+",
    title: "Measured handover",
    detail:
      "SOPs, dashboards and a trained internal owner, then a review against the three numbers we agreed at the start. If they have not moved, we say so before you do.",
  },
];

export function ProcessTimeline({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {phases.map((phase, index) => (
        <div
          key={phase.step}
          className="relative"
          data-reveal
          style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
        >
          <div className="flex items-center gap-3">
            <span
              className={`font-mono text-sm font-medium ${dark ? "text-accent-300" : "text-brand-600"}`}
            >
              {phase.step}
            </span>
            <span
              aria-hidden="true"
              className={`h-px flex-1 ${dark ? "bg-white/15" : "bg-mist-200"}`}
            />
            <span className={`font-mono text-[0.68rem] uppercase tracking-wider ${dark ? "text-mist-500" : "text-mist-500"}`}>
              {phase.week}
            </span>
          </div>
          <h3 className={`mt-5 text-lg ${dark ? "text-white" : "text-ink-900"}`}>{phase.title}</h3>
          <p className={`mt-3 text-[0.9rem] leading-relaxed ${dark ? "text-mist-400" : "text-mist-600"}`}>
            {phase.detail}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProcessHeading({ tone = "light" }: { tone?: "light" | "dark" }) {
  return <Eyebrow tone={tone === "dark" ? "onDark" : "brand"}>How an engagement runs</Eyebrow>;
}
