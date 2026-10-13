import { formatCurrency } from "@/lib/utils";

type TooltipPayload = {
  color?: string;
  dataKey?: string;
  name?: string;
  value?: number;
};

export function ChartTooltip({
  active,
  label,
  payload,
  valueType = "currency"
}: {
  active?: boolean;
  label?: string;
  payload?: TooltipPayload[];
  valueType?: "currency" | "number" | "millions";
}) {
  if (!active || !payload?.length) return null;

  const formatValue = (value?: number) => {
    if (typeof value !== "number") return "-";
    if (valueType === "millions") return `$${value.toFixed(2)}M`;
    if (valueType === "number") return new Intl.NumberFormat("en-US").format(value);
    return formatCurrency(value);
  };

  return (
    <div className="min-w-[180px] rounded-lg border border-app-border bg-white px-3 py-2 text-xs shadow-drawer">
      <p className="mb-2 font-semibold text-app-text">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div key={`${entry.dataKey}-${entry.name}`} className="flex items-center justify-between gap-5">
            <span className="flex items-center gap-2 text-app-secondary">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}
            </span>
            <span className="tabular font-semibold text-app-text">{formatValue(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
