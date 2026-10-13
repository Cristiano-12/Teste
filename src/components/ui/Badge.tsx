import { cn } from "@/lib/utils";
import type { AccountStatus, HealthBand } from "@/types";

const statusStyles: Record<AccountStatus, string> = {
  Active: "bg-app-positiveBg text-app-positive border-green-200",
  Trial: "bg-app-blueSoft text-app-primary border-blue-200",
  "At risk": "bg-app-warningBg text-app-warning border-amber-200",
  "Past due": "bg-app-criticalBg text-app-critical border-red-200",
  Churned: "bg-slate-100 text-app-neutral border-slate-200"
};

const healthStyles: Record<HealthBand, string> = {
  Healthy: "bg-app-positiveBg text-app-positive border-green-200",
  "Needs attention": "bg-app-warningBg text-app-warning border-amber-200",
  "At risk": "bg-app-warningBg text-app-warning border-amber-200",
  Critical: "bg-app-criticalBg text-app-critical border-red-200"
};

export function Badge({
  children,
  tone = "neutral",
  className
}: {
  children: React.ReactNode;
  tone?: "positive" | "warning" | "critical" | "neutral" | "blue";
  className?: string;
}) {
  const tones = {
    positive: "bg-app-positiveBg text-app-positive border-green-200",
    warning: "bg-app-warningBg text-app-warning border-amber-200",
    critical: "bg-app-criticalBg text-app-critical border-red-200",
    neutral: "bg-slate-100 text-app-neutral border-slate-200",
    blue: "bg-app-blueSoft text-app-primary border-blue-200"
  };

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2 text-xs font-medium leading-none",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: AccountStatus }) {
  return <span className={cn("inline-flex h-6 items-center rounded-md border px-2 text-xs font-medium", statusStyles[status])}>{status}</span>;
}

export function HealthBadge({ health }: { health: HealthBand }) {
  return <span className={cn("inline-flex h-6 items-center rounded-md border px-2 text-xs font-medium", healthStyles[health])}>{health}</span>;
}
