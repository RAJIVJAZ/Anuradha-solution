import type { VisualName } from "@/content/types";
import { AutomationRadar } from "@/components/viz/AutomationRadar";
import { BrandSystem } from "@/components/viz/BrandSystem";
import { CapacityGauge } from "@/components/viz/CapacityGauge";
import { ComplianceGrid } from "@/components/viz/ComplianceGrid";
import { FactoryFlow } from "@/components/viz/FactoryFlow";
import { FundingWaterfall } from "@/components/viz/FundingWaterfall";
import { GrowthCurve } from "@/components/viz/GrowthCurve";
import { RevenueBars } from "@/components/viz/RevenueBars";

/**
 * Maps a content entry's `visual` field to a chart, so authors pick a visual by
 * name in `src/content` and never import a component.
 */
export function Visual({
  name,
  tone = "light",
  className = "",
}: {
  name: VisualName;
  tone?: "light" | "dark";
  className?: string;
}) {
  switch (name) {
    case "growth-curve":
      return <GrowthCurve className={className} />;
    case "revenue-bars":
      return (
        <RevenueBars
          className={className}
          tone={tone}
          ariaLabel="Before and after comparison across revenue, gross margin, capacity utilisation and despatch reliability."
          data={[
            { label: "Revenue (₹ Cr)", before: 11, after: 34 },
            { label: "Gross margin (%)", before: 19, after: 28 },
            { label: "Utilisation (%)", before: 58, after: 86 },
            { label: "On-time despatch (%)", before: 71, after: 96 },
          ]}
        />
      );
    case "factory-flow":
      return <FactoryFlow className={className} tone={tone} />;
    case "funding-waterfall":
      return <FundingWaterfall className={className} />;
    case "capacity-gauge":
      return (
        <CapacityGauge
          className={className}
          tone={tone}
          value={86}
          target={90}
          label="Overall equipment effectiveness"
          caption="Measured on the primary line, post-engagement"
        />
      );
    case "automation-radar":
      return <AutomationRadar className={className} tone={tone} />;
    case "brand-system":
      return <BrandSystem className={className} />;
    case "compliance-grid":
      return <ComplianceGrid className={className} />;
  }
}
