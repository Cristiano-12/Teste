"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { ExternalLink, MoreHorizontal, X } from "lucide-react";
import type { Account } from "@/types";
import { Button } from "@/components/ui/Button";
import { StatusBadge, HealthBadge } from "@/components/ui/Badge";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { getHealthBand, getRiskLabel } from "@/lib/account";
import { formatCurrency, getInitials } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

const usageSpark = [
  { week: "W1", usage: 74 },
  { week: "W2", usage: 77 },
  { week: "W3", usage: 70 },
  { week: "W4", usage: 68 },
  { week: "W5", usage: 66 },
  { week: "W6", usage: 64 },
  { week: "W7", usage: 67 },
  { week: "W8", usage: 66 }
];

export function AccountDrawer({
  account,
  open,
  onClose
}: {
  account: Account | null;
  open: boolean;
  onClose: () => void;
}) {
  const { notify } = useToast();

  if (!open || !account) return null;

  const health = getHealthBand(account.healthScore);

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-slate-950/30" aria-label="Close account details" onClick={onClose} />
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col overflow-hidden bg-white shadow-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`${account.name} account details`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-app-separator px-5 py-5">
          <div className="flex min-w-0 gap-3">
            <div className="grid h-11 w-11 flex-none place-items-center rounded-lg bg-app-blueSoft text-sm font-semibold text-app-primary">
              {getInitials(account.name)}
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-lg font-semibold text-app-text">{account.name}</h2>
                <StatusBadge status={account.status} />
              </div>
              <p className="mt-1 text-sm text-app-secondary">{account.domain}</p>
            </div>
          </div>
          <button type="button" className="rounded-lg p-2 text-app-muted hover:bg-app-subtle hover:text-app-text" onClick={onClose} aria-label="Close drawer">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-app-separator px-5 py-3">
          <Button size="sm" variant="secondary" onClick={() => notify(`Opened ${account.name}`, "info")}>
            <ExternalLink className="h-4 w-4" aria-hidden />
            Open account
          </Button>
          <button
            type="button"
            className="rounded-lg p-2 text-app-muted hover:bg-app-subtle hover:text-app-text"
            aria-label="More account actions"
            onClick={() => notify(`More actions for ${account.name}`, "info")}
          >
            <MoreHorizontal className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="thin-scrollbar flex-1 overflow-y-auto px-5 py-5">
          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-app-text">Account health</h3>
              <HealthBadge health={health} />
            </div>
            <div className="mt-4 rounded-xl border border-app-border p-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-app-secondary">Health score</p>
                  <p className="tabular mt-1 text-3xl font-bold tracking-[-0.02em] text-app-text">{account.healthScore} / 100</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-app-secondary">Risk</p>
                  <p className="mt-1 text-sm font-semibold text-app-text">{getRiskLabel(account)}</p>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-app-primary" style={{ width: `${account.healthScore}%` }} />
              </div>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-[15px] font-semibold text-app-text">Key metrics</h3>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["MRR", formatCurrency(account.mrr)],
                ["Users", account.users.toString()],
                ["Weekly active", account.weeklyActive.toString()],
                ["Plan", account.plan],
                ["Renewal", account.renewalDate]
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-app-border bg-app-subtle px-3 py-3">
                  <dt className="text-xs text-app-secondary">{label}</dt>
                  <dd className="tabular mt-1 text-sm font-semibold text-app-text">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-6">
            <h3 className="text-[15px] font-semibold text-app-text">Usage</h3>
            <div className="mt-3 h-[140px] rounded-xl border border-app-border p-3">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageSpark} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip content={<ChartTooltip valueType="number" />} />
                  <Area type="monotone" dataKey="usage" name="Usage" stroke="#2563EB" strokeWidth={2} fill="url(#usageFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-[15px] font-semibold text-app-text">Recent activity</h3>
            <div className="mt-3 space-y-3">
              {account.recentActivity.map((item) => (
                <div key={item} className="rounded-lg border border-app-border px-3 py-3 text-sm text-app-text">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="text-[15px] font-semibold text-app-text">Risk signals</h3>
            <ul className="mt-3 space-y-2">
              {account.riskSignals.map((signal) => (
                <li key={signal} className="flex gap-2 text-sm text-app-secondary">
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-app-warning" />
                  <span>{signal}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-6 rounded-xl border border-app-border bg-app-subtle p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-app-muted">Recommended action</p>
            <h3 className="mt-2 text-[15px] font-semibold text-app-text">Schedule account review</h3>
            <p className="mt-1 text-sm text-app-secondary">Review usage trends, confirm renewal owner and agree on next adoption milestone.</p>
            <Button className="mt-4 w-full" variant="primary" onClick={() => notify("Task created")}>
              Create task
            </Button>
          </section>
        </div>
      </aside>
    </div>
  );
}
