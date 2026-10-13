import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  trend,
  trendTone = "positive",
  description
}: {
  label: string;
  value: string;
  trend: string;
  trendTone?: "positive" | "warning" | "critical";
  description?: string;
}) {
  const positive = trendTone === "positive";
  const toneClass = {
    positive: "text-app-positive bg-app-positiveBg",
    warning: "text-app-warning bg-app-warningBg",
    critical: "text-app-critical bg-app-criticalBg"
  }[trendTone];

  return (
    <div className="rounded-xl border border-app-border bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-app-secondary">{label}</p>
        <span className={cn("inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-xs font-semibold", toneClass)}>
          {positive ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /> : <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />}
          {trend}
        </span>
      </div>
      <p className="tabular mt-4 text-[28px] font-bold leading-8 tracking-[-0.02em] text-app-text">{value}</p>
      {description ? <p className="mt-3 text-xs text-app-muted">{description}</p> : null}
    </div>
  );
}
