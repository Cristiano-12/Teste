import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/70", className)} />;
}

export function KpiSkeleton() {
  return (
    <div className="rounded-xl border border-app-border bg-white p-5 shadow-soft">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="mt-5 h-8 w-32" />
      <Skeleton className="mt-4 h-3 w-24" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-app-border bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-36" />
      </div>
      <Skeleton className="mt-8 h-[260px] w-full" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="rounded-xl border border-app-border bg-white shadow-soft">
      <div className="border-b border-app-separator p-4">
        <Skeleton className="h-9 w-full max-w-xl" />
      </div>
      <div className="space-y-3 p-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    </div>
  );
}
