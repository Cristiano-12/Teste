"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SelectControl } from "@/components/ui/SelectControl";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { ChartSkeleton, KpiSkeleton } from "@/components/ui/Skeleton";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { analyticsRevenue, productAdoption, retentionCohorts, revenueByPlan } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

type GrowthMetric = "Revenue" | "Expansion" | "Contraction";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState<GrowthMetric>("Revenue");
  const [dateRange, setDateRange] = useState("Last 12 months");
  const [segment, setSegment] = useState("All segments");
  const [comparison, setComparison] = useState("Compare to previous period");
  const { notify } = useToast();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timeout);
  }, []);

  const metricKey = metric === "Revenue" ? "revenue" : metric === "Expansion" ? "expansion" : "contraction";

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Understand revenue performance, retention and product adoption."
        controls={
          <>
            <SelectControl label="Date range" value={dateRange} onChange={setDateRange} options={["Last 12 months", "Year to date", "Last 6 months"]} />
            <SelectControl label="Segment" value={segment} onChange={setSegment} options={["All segments", "Enterprise", "Business", "Growth"]} />
            <SelectControl label="Comparison" value={comparison} onChange={setComparison} options={["Compare to previous period", "No comparison"]} />
          </>
        }
        primaryAction={{
          label: "Export analysis",
          icon: <Download className="h-4 w-4" aria-hidden />,
          onClick: () => notify("Analytics export started")
        }}
      />

      <div className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <KpiSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <KpiCard label="ARR" value="$5.14M" trend="+8.4%" description="Annualized recurring revenue" />
            <KpiCard label="Expansion revenue" value="$482K" trend="+12.1%" description="From existing customers" />
            <KpiCard label="Gross retention" value="94.8%" trend="+1.3%" description="Logo-adjusted portfolio retention" />
            <KpiCard label="Average revenue/account" value="$4,122" trend="+4.6%" description="Across active accounts" />
          </div>
        )}

        <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(360px,0.85fr)]">
          {loading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardHeader
                  title="Revenue growth"
                  description="12-month revenue trend with selected performance layer."
                  action={
                    <div className="grid w-full grid-cols-3 rounded-lg border border-app-border bg-app-subtle p-1 sm:flex sm:w-auto">
                      {(["Revenue", "Expansion", "Contraction"] as GrowthMetric[]).map((item) => (
                        <button
                          type="button"
                          key={item}
                          className={`h-7 rounded-md px-2 text-xs font-semibold transition-colors sm:px-3 ${
                            metric === item ? "bg-white text-app-text shadow-soft" : "text-app-secondary hover:text-app-text"
                          }`}
                          onClick={() => setMetric(item)}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  }
                />
                <div className="h-[280px] px-1 pb-4 pt-5 sm:h-[330px] sm:px-3">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsRevenue} margin={{ left: 12, right: 20, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#EEF0F3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        width={54}
                        tick={{ fill: "#667085", fontSize: 12 }}
                        tickFormatter={(value) => `$${Number(value).toFixed(1)}M`}
                      />
                      <Tooltip content={<ChartTooltip valueType="millions" />} />
                      <Area
                        type="monotone"
                        dataKey={metricKey}
                        name={metric}
                        stroke={metric === "Contraction" ? "#F59E0B" : "#14B8A6"}
                        strokeWidth={2.5}
                        fill="url(#analyticsFill)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <CardHeader title="Revenue by plan" description="Annual recurring revenue contribution by plan." />
                <div className="h-[280px] px-2 pb-4 pt-5 sm:h-[330px] sm:px-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueByPlan} layout="vertical" margin={{ left: 10, right: 28, top: 8, bottom: 4 }}>
                      <CartesianGrid stroke="#EEF0F3" horizontal={false} />
                      <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} tickFormatter={(value) => `$${Number(value) / 1000000}M`} />
                      <YAxis type="category" dataKey="plan" width={82} axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                      <Tooltip content={<ChartTooltip />} />
                      <Bar dataKey="revenue" name="ARR" fill="#2563EB" radius={[0, 6, 6, 0]} barSize={22} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </>
          )}
        </div>

        <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
          <Card>
            <CardHeader title="Retention by cohort" description="Monthly account retention by activation cohort." />
            <div className="hidden overflow-x-auto thin-scrollbar px-5 py-4 md:block">
              <table className="w-full min-w-[700px] text-left">
                <thead>
                  <tr className="text-[11px] uppercase tracking-[0.04em] text-app-muted">
                    <th className="w-28 py-2 font-semibold">Cohort</th>
                    {["Month 0", "M1", "M2", "M3", "M4", "M5", "M6"].map((month) => (
                      <th key={month} className="px-2 py-2 text-center font-semibold">
                        {month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-separator">
                  {retentionCohorts.map((row) => (
                    <tr key={row.cohort}>
                      <th className="py-2.5 pr-3 text-sm font-medium text-app-text">{row.cohort}</th>
                      {row.values.map((value, index) => {
                        const opacity = value ? Math.max(0.12, (value - 88) / 20) : 0;
                        return (
                          <td key={`${row.cohort}-${index}`} className="px-2 py-2 text-center">
                            <span
                              className="tabular inline-flex h-8 w-full items-center justify-center rounded-md text-xs font-semibold"
                              style={{
                                backgroundColor: value ? `rgba(37, 99, 235, ${opacity})` : "#F9FAFC",
                                color: value && opacity > 0.45 ? "#FFFFFF" : "#111827"
                              }}
                            >
                              {value ? `${value}%` : "-"}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-app-separator md:hidden">
              {retentionCohorts.map((row) => (
                <div key={row.cohort} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-app-text">{row.cohort}</h3>
                    <span className="text-xs font-medium text-app-muted">Activation cohort</span>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {["M0", "M1", "M2", "M3", "M4", "M5", "M6"].map((month, index) => {
                      const value = row.values[index];
                      const opacity = value ? Math.max(0.12, (value - 88) / 20) : 0;
                      return (
                        <div key={`${row.cohort}-${month}`} className="rounded-lg border border-app-separator bg-app-subtle p-2">
                          <p className="text-[11px] font-semibold text-app-muted">{month}</p>
                          <p
                            className="tabular mt-1 rounded-md px-1.5 py-1 text-center text-xs font-semibold"
                            style={{
                              backgroundColor: value ? `rgba(37, 99, 235, ${opacity})` : "#FFFFFF",
                              color: value && opacity > 0.45 ? "#FFFFFF" : "#111827"
                            }}
                          >
                            {value ? `${value}%` : "-"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Product adoption" description="Feature adoption across active accounts." />
            <div className="divide-y divide-app-separator">
              {productAdoption.map((feature) => (
                <div key={feature.feature} className="px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-app-text">{feature.feature}</p>
                      <p className="mt-1 text-xs text-app-secondary">{formatNumber(feature.activeAccounts)} active accounts</p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-app-positive">
                      <TrendingUp className="h-4 w-4" aria-hidden />
                      +{feature.trend.toFixed(1)}%
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-app-primary" style={{ width: `${feature.adoption}%` }} />
                    </div>
                    <span className="tabular w-12 text-right text-sm font-semibold text-app-text">{feature.adoption}%</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
