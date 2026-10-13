"use client";

import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/ui/KpiCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { ChartSkeleton, KpiSkeleton } from "@/components/ui/Skeleton";
import { SelectControl } from "@/components/ui/SelectControl";
import { AccountDrawer } from "@/components/account/AccountDrawer";
import { HealthBadge } from "@/components/ui/Badge";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { accounts, healthDistribution, recentActivity, revenueOverview } from "@/lib/data";
import { getHealthBand, getUsageLabel } from "@/lib/account";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";
import type { Account } from "@/types";

type RevenueMetric = "MRR" | "ARR" | "Expansion";

export default function OverviewPage() {
  const [loading, setLoading] = useState(true);
  const [metric, setMetric] = useState<RevenueMetric>("MRR");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [comparison, setComparison] = useState("Previous period");
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const { notify } = useToast();

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timeout);
  }, []);

  const chartConfig = useMemo(() => {
    if (metric === "ARR") return { key: "arr", previousKey: "previous", valueType: "currency" as const };
    if (metric === "Expansion") return { key: "expansion", previousKey: "previous", valueType: "currency" as const };
    return { key: "mrr", previousKey: "previous", valueType: "currency" as const };
  }, [metric]);

  const attentionAccounts = accounts.slice(0, 5);

  return (
    <>
      <PageHeader
        title="Overview"
        description="Monitor revenue, customer health and product activity across your portfolio."
        controls={
          <>
            <SelectControl label="Date range" value={dateRange} onChange={setDateRange} options={["Last 30 days", "Last 90 days", "Year to date"]} />
            <SelectControl label="Compare" value={comparison} onChange={setComparison} options={["Previous period", "Previous year", "No comparison"]} />
          </>
        }
        primaryAction={{
          label: "Export report",
          icon: <Download className="h-4 w-4" aria-hidden />,
          onClick: () => notify("Report export started")
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
            <KpiCard label="Monthly recurring revenue" value="$428,620" trend="+8.4%" description="Current active portfolio MRR" />
            <KpiCard label="Active accounts" value="1,248" trend="+3.1%" description="Paying and trial accounts" />
            <KpiCard label="Net revenue retention" value="112.6%" trend="+2.8%" description="Expansion net of contraction" />
            <KpiCard label="Accounts at risk" value="37" trend="-6" trendTone="positive" description="Compared with previous period" />
          </div>
        )}

        <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
          {loading ? (
            <>
              <ChartSkeleton />
              <ChartSkeleton />
            </>
          ) : (
            <>
              <Card>
                <CardHeader
                  title="Revenue overview"
                  description="MRR over the last 12 months with previous period comparison."
                  action={
                    <div className="grid w-full grid-cols-3 rounded-lg border border-app-border bg-app-subtle p-1 sm:flex sm:w-auto">
                      {(["MRR", "ARR", "Expansion"] as RevenueMetric[]).map((item) => (
                        <button
                          key={item}
                          type="button"
                          className={`h-7 rounded-md px-3 text-xs font-semibold transition-colors ${
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
                    <AreaChart data={revenueOverview} margin={{ left: 12, right: 20, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.18} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#EEF0F3" vertical={false} />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        width={74}
                        tick={{ fill: "#667085", fontSize: 12 }}
                        tickFormatter={(value) => `$${Math.round(Number(value) / 1000)}k`}
                      />
                      <Tooltip content={<ChartTooltip valueType={chartConfig.valueType} />} />
                      <Line
                        type="monotone"
                        dataKey={chartConfig.previousKey}
                        name="Previous"
                        stroke="#94A3B8"
                        strokeWidth={2}
                        dot={false}
                        strokeDasharray="5 5"
                      />
                      <Area
                        type="monotone"
                        dataKey={chartConfig.key}
                        name={metric}
                        stroke="#2563EB"
                        strokeWidth={2.5}
                        fill="url(#mrrFill)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <CardHeader title="Customer health distribution" description="Portfolio health by account count." />
                <div className="px-5 pb-5 pt-4">
                  <div className="h-[160px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={healthDistribution} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis type="category" dataKey="label" width={118} axisLine={false} tickLine={false} tick={{ fill: "#667085", fontSize: 12 }} />
                        <Tooltip content={<ChartTooltip valueType="number" />} />
                        <Bar dataKey="value" name="Accounts" radius={[0, 6, 6, 0]} barSize={16}>
                          {healthDistribution.map((entry) => (
                            <Cell key={entry.label} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 space-y-3">
                    {healthDistribution.map((segment) => (
                      <div key={segment.label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-app-secondary">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
                          {segment.label}
                        </span>
                        <span className="tabular font-semibold text-app-text">{segment.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.75fr)]">
          <Card>
            <CardHeader title="Accounts requiring attention" description="Priority accounts based on health, usage and renewal signals." />
            <div className="hidden overflow-x-auto thin-scrollbar md:block">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-app-subtle text-[11px] uppercase tracking-[0.04em] text-app-muted">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Company</th>
                    <th className="px-5 py-3 font-semibold">Health score</th>
                    <th className="px-5 py-3 font-semibold">MRR</th>
                    <th className="px-5 py-3 font-semibold">Usage trend</th>
                    <th className="px-5 py-3 font-semibold">Risk</th>
                    <th className="px-5 py-3 font-semibold">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-app-separator">
                  {attentionAccounts.map((account) => (
                    <tr
                      key={account.id}
                      className="cursor-pointer transition-colors hover:bg-app-subtle"
                      onClick={() => setSelectedAccount(account)}
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") setSelectedAccount(account);
                      }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-app-text">{account.name}</div>
                        <div className="text-xs text-app-secondary">{account.domain}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-20 rounded-full bg-slate-100">
                            <div className="h-1.5 rounded-full bg-app-primary" style={{ width: `${account.healthScore}%` }} />
                          </div>
                          <span className="tabular text-sm font-semibold text-app-text">{account.healthScore}</span>
                        </div>
                      </td>
                      <td className="tabular px-5 py-3.5 text-sm font-medium text-app-text">{formatCurrency(account.mrr)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 text-sm font-medium ${account.usageTrend === "down" ? "text-app-critical" : "text-app-positive"}`}>
                          {account.usageTrend === "down" ? <TrendingDown className="h-4 w-4" aria-hidden /> : <TrendingUp className="h-4 w-4" aria-hidden />}
                          {getUsageLabel(account)}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <HealthBadge health={getHealthBand(account.healthScore)} />
                      </td>
                      <td className="px-5 py-3.5 text-sm text-app-secondary">{account.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="divide-y divide-app-separator md:hidden">
              {attentionAccounts.map((account) => (
                <button
                  key={account.id}
                  type="button"
                  className="block w-full px-5 py-4 text-left transition-colors hover:bg-app-subtle focus:bg-app-subtle"
                  onClick={() => setSelectedAccount(account)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-app-text">{account.name}</p>
                      <p className="mt-1 truncate text-xs text-app-secondary">{account.domain}</p>
                    </div>
                    <HealthBadge health={getHealthBand(account.healthScore)} />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-app-muted">Health score</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                          <div className="h-1.5 rounded-full bg-app-primary" style={{ width: `${account.healthScore}%` }} />
                        </div>
                        <span className="tabular text-xs font-semibold text-app-text">{account.healthScore}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-app-muted">MRR</p>
                      <p className="tabular mt-1 font-semibold text-app-text">{formatCurrency(account.mrr)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-app-muted">Usage trend</p>
                      <p className={`mt-1 inline-flex items-center gap-1 font-semibold ${account.usageTrend === "down" ? "text-app-critical" : "text-app-positive"}`}>
                        {account.usageTrend === "down" ? <TrendingDown className="h-4 w-4" aria-hidden /> : <TrendingUp className="h-4 w-4" aria-hidden />}
                        {getUsageLabel(account)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-app-muted">Owner</p>
                      <p className="mt-1 font-medium text-app-text">{account.owner}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Recent activity" description="Operational signals from accounts and billing." />
            <div className="divide-y divide-app-separator">
              {recentActivity.map((activity) => (
                <div key={`${activity.account}-${activity.time}`} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-app-text">{activity.type}</p>
                      <p className="mt-1 text-sm text-app-secondary">{activity.account}</p>
                    </div>
                    <span className="tabular text-xs text-app-muted">{activity.time}</span>
                  </div>
                  <p className="mt-2 text-sm text-app-secondary">{activity.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <AccountDrawer account={selectedAccount} open={Boolean(selectedAccount)} onClose={() => setSelectedAccount(null)} />
    </>
  );
}
