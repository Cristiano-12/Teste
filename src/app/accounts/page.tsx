"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  ChevronLeft,
  ChevronRight,
  Columns3,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  TrendingDown,
  TrendingUp,
  X
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AccountDrawer } from "@/components/account/AccountDrawer";
import { Badge, HealthBadge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SelectControl } from "@/components/ui/SelectControl";
import { TableSkeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/components/ui/Toast";
import { getAccountDataset } from "@/lib/data";
import { getHealthBand, getRiskLabel, getUsageLabel } from "@/lib/account";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import type { Account } from "@/types";

type SortKey = "name" | "mrr" | "healthScore" | "lastActivityDate";
type SortDirection = "asc" | "desc";

type AppliedFilters = {
  segment: string;
  health: string;
  plan: string;
  date: string;
  status: string;
  minMrr: string;
  maxMrr: string;
};

const defaultFilters: AppliedFilters = {
  segment: "All segments",
  health: "All health",
  plan: "All plans",
  date: "Last 30 days",
  status: "All statuses",
  minMrr: "",
  maxMrr: ""
};

const rowsPerPage = 15;

function SortButton({
  label,
  sortKey,
  activeSort,
  direction,
  onSort
}: {
  label: string;
  sortKey: SortKey;
  activeSort: SortKey;
  direction: SortDirection;
  onSort: (key: SortKey) => void;
}) {
  const active = activeSort === sortKey;
  return (
    <button type="button" className="inline-flex items-center gap-1 font-semibold hover:text-app-text" onClick={() => onSort(sortKey)}>
      {label}
      {active ? direction === "asc" ? <ArrowUp className="h-3 w-3" aria-hidden /> : <ArrowDown className="h-3 w-3" aria-hidden /> : null}
    </button>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex h-8 items-center gap-1 rounded-lg border border-app-border bg-white pl-2.5 pr-1 text-[13px] font-medium text-app-text">
      {label}
      <button type="button" className="rounded-md p-1 text-app-muted hover:bg-app-subtle hover:text-app-text" onClick={onRemove} aria-label={`Remove ${label} filter`}>
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </span>
  );
}

function accountMatchesSegment(account: Account, segment: string) {
  if (segment === "All segments") return true;
  if (segment === "Strategic") return account.mrr >= 10000;
  if (segment === "Commercial") return account.mrr >= 3000 && account.mrr < 10000;
  if (segment === "Emerging") return account.mrr < 3000;
  return true;
}

function accountMatchesDate(account: Account, date: string) {
  if (date === "Last 30 days") return true;
  if (date === "Last 7 days") return new Date(account.lastActivityDate) >= new Date("2026-10-06");
  if (date === "This month") return account.lastActivityDate.startsWith("2026-10");
  return true;
}

export default function AccountsPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<AppliedFilters>(defaultFilters);
  const [draftFilters, setDraftFilters] = useState<AppliedFilters>(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("mrr");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const { notify } = useToast();

  const accountDataset = useMemo(() => getAccountDataset(1248), []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setPage(1);
    setSelectedRows(new Set());
  }, [filters, search]);

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const minMrr = filters.minMrr ? Number(filters.minMrr) : null;
    const maxMrr = filters.maxMrr ? Number(filters.maxMrr) : null;

    return accountDataset
      .filter((account) => {
        const matchesSearch =
          !query ||
          account.name.toLowerCase().includes(query) ||
          account.domain.toLowerCase().includes(query) ||
          account.owner.toLowerCase().includes(query);
        const health = getHealthBand(account.healthScore);
        return (
          matchesSearch &&
          accountMatchesSegment(account, filters.segment) &&
          accountMatchesDate(account, filters.date) &&
          (filters.health === "All health" || health === filters.health) &&
          (filters.plan === "All plans" || account.plan === filters.plan) &&
          (filters.status === "All statuses" || account.status === filters.status) &&
          (minMrr === null || account.mrr >= minMrr) &&
          (maxMrr === null || account.mrr <= maxMrr)
        );
      })
      .sort((a, b) => {
        const multiplier = sortDirection === "asc" ? 1 : -1;
        if (sortKey === "name") return a.name.localeCompare(b.name) * multiplier;
        if (sortKey === "lastActivityDate") return a.lastActivityDate.localeCompare(b.lastActivityDate) * multiplier;
        return (a[sortKey] - b[sortKey]) * multiplier;
      });
  }, [accountDataset, filters, search, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredAccounts.length / rowsPerPage));
  const startIndex = (page - 1) * rowsPerPage;
  const visibleAccounts = filteredAccounts.slice(startIndex, startIndex + rowsPerPage);
  const allVisibleSelected = visibleAccounts.length > 0 && visibleAccounts.every((account) => selectedRows.has(account.id));
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection(key === "name" ? "asc" : "desc");
  };

  const toggleRow = (id: string) => {
    setSelectedRows((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleVisibleRows = () => {
    setSelectedRows((current) => {
      const next = new Set(current);
      if (allVisibleSelected) {
        visibleAccounts.forEach((account) => next.delete(account.id));
      } else {
        visibleAccounts.forEach((account) => next.add(account.id));
      }
      return next;
    });
  };

  const clearAllFilters = () => {
    setFilters(defaultFilters);
    setDraftFilters(defaultFilters);
    setSearch("");
  };

  const activeChips = [
    filters.segment !== defaultFilters.segment ? { label: `Segment: ${filters.segment}`, key: "segment" } : null,
    filters.health !== defaultFilters.health ? { label: `Health: ${filters.health}`, key: "health" } : null,
    filters.plan !== defaultFilters.plan ? { label: `Plan: ${filters.plan}`, key: "plan" } : null,
    filters.date !== defaultFilters.date ? { label: `Activity: ${filters.date}`, key: "date" } : null,
    filters.status !== defaultFilters.status ? { label: `Status: ${filters.status}`, key: "status" } : null,
    filters.minMrr ? { label: `MRR from ${formatCurrency(Number(filters.minMrr))}`, key: "minMrr" } : null,
    filters.maxMrr ? { label: `MRR to ${formatCurrency(Number(filters.maxMrr))}`, key: "maxMrr" } : null
  ].filter(Boolean) as { label: string; key: keyof AppliedFilters }[];

  return (
    <>
      <PageHeader
        title="Accounts"
        description="Track customer health, revenue and engagement across all active accounts."
        controls={
          <>
            <Button variant="secondary" onClick={() => setFiltersOpen((current) => !current)}>
              <Filter className="h-4 w-4" aria-hidden />
              Filters
              {activeChips.length ? <span className="rounded bg-app-blueSoft px-1.5 py-0.5 text-xs text-app-primary">{activeChips.length}</span> : null}
            </Button>
            <Button variant="secondary" onClick={() => notify("Column preferences opened")}>
              <Columns3 className="h-4 w-4" aria-hidden />
              Columns
            </Button>
            <Button variant="secondary" onClick={() => notify("Account export started")}>
              <Download className="h-4 w-4" aria-hidden />
              Export
            </Button>
          </>
        }
        primaryAction={{
          label: "Add account",
          icon: <Plus className="h-4 w-4" aria-hidden />,
          onClick: () => notify("Account creation form opened", "info")
        }}
      />

      <div className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="min-w-0 rounded-xl border border-app-border bg-white shadow-soft">
            <div className="border-b border-app-separator p-4">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <label className="relative w-full xl:max-w-sm">
                  <span className="sr-only">Search accounts</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" aria-hidden />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search accounts..."
                    className="h-10 w-full rounded-lg border border-app-border bg-white pl-9 pr-3 text-sm text-app-text placeholder:text-app-muted transition-colors focus:border-app-primary"
                  />
                </label>
                <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 xl:flex xl:w-auto xl:flex-wrap xl:items-center">
                  <SelectControl label="Segment" value={filters.segment} onChange={(value) => setFilters((current) => ({ ...current, segment: value }))} options={["All segments", "Strategic", "Commercial", "Emerging"]} />
                  <SelectControl label="Health" value={filters.health} onChange={(value) => setFilters((current) => ({ ...current, health: value }))} options={["All health", "Healthy", "Needs attention", "At risk", "Critical"]} />
                  <SelectControl label="Plan" value={filters.plan} onChange={(value) => setFilters((current) => ({ ...current, plan: value }))} options={["All plans", "Starter", "Growth", "Business", "Enterprise"]} />
                  <SelectControl label="Date filter" value={filters.date} onChange={(value) => setFilters((current) => ({ ...current, date: value }))} options={["Last 30 days", "Last 7 days", "This month"]} />
                </div>
              </div>

              {filtersOpen ? (
                <div className="mt-4 rounded-xl border border-app-border bg-app-subtle p-4">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <SelectControl
                      label="Status"
                      value={draftFilters.status}
                      onChange={(value) => setDraftFilters((current) => ({ ...current, status: value }))}
                      options={["All statuses", "Active", "Trial", "At risk", "Past due", "Churned"]}
                    />
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-app-secondary">Minimum MRR</span>
                      <input
                        value={draftFilters.minMrr}
                        onChange={(event) => setDraftFilters((current) => ({ ...current, minMrr: event.target.value }))}
                        type="number"
                        min="0"
                        placeholder="0"
                        className="h-10 w-full rounded-lg border border-app-border bg-white px-3 text-sm text-app-text focus:border-app-primary"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs font-medium text-app-secondary">Maximum MRR</span>
                      <input
                        value={draftFilters.maxMrr}
                        onChange={(event) => setDraftFilters((current) => ({ ...current, maxMrr: event.target.value }))}
                        type="number"
                        min="0"
                        placeholder="25000"
                        className="h-10 w-full rounded-lg border border-app-border bg-white px-3 text-sm text-app-text focus:border-app-primary"
                      />
                    </label>
                    <div className="grid gap-2 sm:flex sm:items-end">
                      <Button
                        className="w-full sm:w-auto"
                        variant="primary"
                        onClick={() => {
                          setFilters((current) => ({ ...current, status: draftFilters.status, minMrr: draftFilters.minMrr, maxMrr: draftFilters.maxMrr }));
                          setFiltersOpen(false);
                        }}
                      >
                        Apply filters
                      </Button>
                      <Button
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setDraftFilters(defaultFilters);
                          setFilters(defaultFilters);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeChips.length || search ? (
                <div className="mt-4 flex max-w-full flex-wrap items-center gap-2">
                  {search ? <FilterChip label={`Search: ${search}`} onRemove={() => setSearch("")} /> : null}
                  {activeChips.map((chip) => (
                    <FilterChip
                      key={chip.key}
                      label={chip.label}
                      onRemove={() => {
                        setFilters((current) => ({ ...current, [chip.key]: defaultFilters[chip.key] }));
                        setDraftFilters((current) => ({ ...current, [chip.key]: defaultFilters[chip.key] }));
                      }}
                    />
                  ))}
                  <button type="button" className="ml-1 text-[13px] font-semibold text-app-primary hover:text-app-primaryHover" onClick={clearAllFilters}>
                    Clear all
                  </button>
                </div>
              ) : null}
            </div>

            {selectedRows.size > 0 ? (
              <div className="flex flex-col gap-3 border-b border-blue-100 bg-app-blueSoft px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-app-text">
                  <Check className="h-4 w-4 text-app-primary" aria-hidden />
                  {selectedRows.size} accounts selected
                </div>
                <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
                  <Button size="sm" onClick={() => notify("Assign owner workflow opened", "info")}>
                    Assign owner
                  </Button>
                  <Button size="sm" onClick={() => notify("Status change queued", "info")}>
                    Change status
                  </Button>
                  <Button size="sm" onClick={() => notify(`${selectedRows.size} selected accounts exported`)}>
                    Export
                  </Button>
                </div>
              </div>
            ) : null}

            {visibleAccounts.length === 0 ? (
              <EmptyState title="No accounts match these filters" description="Try adjusting or clearing one or more filters." actionLabel="Clear filters" onAction={clearAllFilters} />
            ) : (
              <>
                <div className="grid gap-3 border-b border-app-separator px-4 py-3 md:hidden">
                  <div className="grid grid-cols-2 gap-2">
                    <label>
                      <span className="mb-1 block text-xs font-medium text-app-secondary">Sort by</span>
                      <select
                        value={sortKey}
                        onChange={(event) => {
                          const nextKey = event.target.value as SortKey;
                          setSortKey(nextKey);
                          setSortDirection(nextKey === "name" ? "asc" : "desc");
                        }}
                        className="h-10 w-full rounded-lg border border-app-border bg-white px-3 text-sm font-medium text-app-text focus:border-app-primary"
                      >
                        <option value="name">Account</option>
                        <option value="mrr">MRR</option>
                        <option value="healthScore">Health score</option>
                        <option value="lastActivityDate">Last activity</option>
                      </select>
                    </label>
                    <label>
                      <span className="mb-1 block text-xs font-medium text-app-secondary">Direction</span>
                      <button
                        type="button"
                        className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-app-border bg-white px-3 text-sm font-semibold text-app-text hover:bg-app-subtle"
                        onClick={() => setSortDirection((current) => (current === "asc" ? "desc" : "asc"))}
                      >
                        {sortDirection === "asc" ? <ArrowUp className="h-4 w-4" aria-hidden /> : <ArrowDown className="h-4 w-4" aria-hidden />}
                        {sortDirection === "asc" ? "Ascending" : "Descending"}
                      </button>
                    </label>
                  </div>
                </div>
                <div className="hidden overflow-x-auto thin-scrollbar md:block">
                  <table className="w-full min-w-[1120px] text-left">
                    <thead className="sticky top-0 z-10 bg-app-subtle text-[11px] uppercase tracking-[0.04em] text-app-muted">
                      <tr>
                        <th className="w-10 px-4 py-3">
                          <input
                            type="checkbox"
                            aria-label="Select visible accounts"
                            checked={allVisibleSelected}
                            onChange={toggleVisibleRows}
                            className="h-4 w-4 rounded border-app-border text-app-primary focus:ring-app-primary"
                          />
                        </th>
                        <th className="min-w-[230px] px-3 py-3">
                          <SortButton label="Account" sortKey="name" activeSort={sortKey} direction={sortDirection} onSort={handleSort} />
                        </th>
                        <th className="px-3 py-3 font-semibold">Owner</th>
                        <th className="px-3 py-3 font-semibold">Plan</th>
                        <th className="px-3 py-3 text-right">
                          <SortButton label="MRR" sortKey="mrr" activeSort={sortKey} direction={sortDirection} onSort={handleSort} />
                        </th>
                        <th className="px-3 py-3 text-right font-semibold">Users</th>
                        <th className="min-w-[150px] px-3 py-3 font-semibold">Product usage</th>
                        <th className="min-w-[150px] px-3 py-3">
                          <SortButton label="Health score" sortKey="healthScore" activeSort={sortKey} direction={sortDirection} onSort={handleSort} />
                        </th>
                        <th className="px-3 py-3 font-semibold">Status</th>
                        <th className="px-3 py-3">
                          <SortButton label="Last activity" sortKey="lastActivityDate" activeSort={sortKey} direction={sortDirection} onSort={handleSort} />
                        </th>
                        <th className="w-12 px-3 py-3" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-app-separator">
                      {visibleAccounts.map((account) => {
                        const selected = selectedRows.has(account.id);
                        return (
                          <tr
                            key={account.id}
                            className={cn("group h-[52px] cursor-pointer transition-colors hover:bg-app-subtle", selected && "bg-app-blueSoft/70")}
                            onClick={() => setSelectedAccount(account)}
                            tabIndex={0}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") setSelectedAccount(account);
                            }}
                          >
                            <td className="px-4 py-3" onClick={(event) => event.stopPropagation()}>
                              <input
                                type="checkbox"
                                aria-label={`Select ${account.name}`}
                                checked={selected}
                                onChange={() => toggleRow(account.id)}
                                className="h-4 w-4 rounded border-app-border text-app-primary focus:ring-app-primary"
                              />
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-3">
                                <div className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-app-blueSoft text-[11px] font-semibold text-app-primary">
                                  {getInitials(account.name)}
                                </div>
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-semibold text-app-text">{account.name}</p>
                                  <p className="truncate text-xs text-app-secondary">{account.domain}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-sm text-app-secondary">{account.owner}</td>
                            <td className="px-3 py-3">
                              <Badge tone={account.plan === "Enterprise" ? "blue" : "neutral"}>{account.plan}</Badge>
                            </td>
                            <td className="tabular px-3 py-3 text-right text-sm font-semibold text-app-text">{formatCurrency(account.mrr)}</td>
                            <td className="tabular px-3 py-3 text-right text-sm text-app-secondary">{account.users}</td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-3">
                                <div className="h-1.5 w-20 rounded-full bg-slate-100">
                                  <div className="h-1.5 rounded-full bg-app-primary" style={{ width: `${account.productUsage}%` }} />
                                </div>
                                <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", account.usageTrend === "down" ? "text-app-critical" : "text-app-positive")}>
                                  {account.usageTrend === "down" ? <TrendingDown className="h-3.5 w-3.5" aria-hidden /> : <TrendingUp className="h-3.5 w-3.5" aria-hidden />}
                                  {getUsageLabel(account)}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <div className="flex items-center gap-2">
                                <span className="tabular w-8 text-sm font-semibold text-app-text">{account.healthScore}</span>
                                <HealthBadge health={getHealthBand(account.healthScore)} />
                              </div>
                            </td>
                            <td className="px-3 py-3">
                              <StatusBadge status={account.status} />
                            </td>
                            <td className="tabular px-3 py-3 text-sm text-app-secondary">{account.lastActivity}</td>
                            <td className="px-3 py-3" onClick={(event) => event.stopPropagation()}>
                              <button
                                type="button"
                                className="rounded-lg p-2 text-app-muted opacity-80 hover:bg-white hover:text-app-text group-hover:opacity-100"
                                aria-label={`More actions for ${account.name}`}
                                onClick={() => notify(`Actions opened for ${account.name}`, "info")}
                              >
                                <MoreHorizontal className="h-4 w-4" aria-hidden />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="divide-y divide-app-separator md:hidden">
                  {visibleAccounts.map((account) => (
                    <article key={account.id} className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <button type="button" className="flex min-w-0 flex-1 items-start gap-3 text-left" onClick={() => setSelectedAccount(account)}>
                          <div className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-app-blueSoft text-xs font-semibold text-app-primary">
                            {getInitials(account.name)}
                          </div>
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-app-text">{account.name}</span>
                            <span className="mt-1 block truncate text-xs text-app-secondary">{account.domain}</span>
                          </span>
                        </button>
                        <input
                          type="checkbox"
                          aria-label={`Select ${account.name}`}
                          checked={selectedRows.has(account.id)}
                          onChange={() => toggleRow(account.id)}
                          className="mt-1 h-4 w-4 rounded border-app-border text-app-primary focus:ring-app-primary"
                        />
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-app-muted">MRR</p>
                          <p className="tabular mt-1 font-semibold text-app-text">{formatCurrency(account.mrr)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-app-muted">Plan</p>
                          <div className="mt-1">
                            <Badge tone={account.plan === "Enterprise" ? "blue" : "neutral"}>{account.plan}</Badge>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-app-muted">Users</p>
                          <p className="tabular mt-1 font-medium text-app-text">{account.users}</p>
                        </div>
                        <div>
                          <p className="text-xs text-app-muted">Owner</p>
                          <p className="mt-1 font-medium text-app-text">{account.owner}</p>
                        </div>
                        <div>
                          <p className="text-xs text-app-muted">Health</p>
                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="tabular font-semibold text-app-text">{account.healthScore}</span>
                            <HealthBadge health={getHealthBand(account.healthScore)} />
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-app-muted">Risk</p>
                          <p className="mt-1 font-medium text-app-text">{getRiskLabel(account)}</p>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-xs text-app-muted">Product usage</p>
                            <span className={cn("inline-flex items-center gap-1 text-xs font-semibold", account.usageTrend === "down" ? "text-app-critical" : "text-app-positive")}>
                              {account.usageTrend === "down" ? <TrendingDown className="h-3.5 w-3.5" aria-hidden /> : <TrendingUp className="h-3.5 w-3.5" aria-hidden />}
                              {getUsageLabel(account)}
                            </span>
                          </div>
                          <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                            <div className="h-1.5 rounded-full bg-app-primary" style={{ width: `${account.productUsage}%` }} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-app-muted">Status</p>
                          <div className="mt-1">
                            <StatusBadge status={account.status} />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-app-muted">Last activity</p>
                          <span className="tabular mt-1 block text-xs font-medium text-app-text">{account.lastActivity}</span>
                        </div>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-app-muted hover:bg-app-subtle hover:text-app-text"
                          aria-label={`More actions for ${account.name}`}
                          onClick={() => notify(`Actions opened for ${account.name}`, "info")}
                        >
                          <MoreHorizontal className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="flex flex-col gap-4 border-t border-app-separator px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
                  <p className="text-sm text-app-secondary">
                    Showing <span className="tabular font-medium text-app-text">{filteredAccounts.length ? startIndex + 1 : 0}</span>-
                    <span className="tabular font-medium text-app-text">{Math.min(startIndex + rowsPerPage, filteredAccounts.length)}</span> of{" "}
                    <span className="tabular font-medium text-app-text">{filteredAccounts.length}</span> accounts
                  </p>
                  <div className="grid grid-cols-2 items-center gap-2 sm:flex sm:flex-wrap">
                    <Button size="sm" disabled={page === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                      Previous
                    </Button>
                    <span className="col-span-2 text-center text-sm font-semibold text-app-secondary sm:hidden">
                      Page <span className="tabular text-app-text">{page}</span> of <span className="tabular text-app-text">{totalPages}</span>
                    </span>
                    {[1, 2, 3].map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        className={cn(
                          "hidden sm:inline-flex sm:items-center sm:justify-center",
                          "h-8 min-w-8 rounded-lg border px-2 text-sm font-semibold transition-colors",
                          page === pageNumber ? "border-app-primary bg-app-primary text-white" : "border-app-border bg-white text-app-secondary hover:bg-app-subtle hover:text-app-text"
                        )}
                        onClick={() => setPage(Math.min(pageNumber, totalPages))}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <span className="hidden px-1 text-app-muted sm:inline">...</span>
                    <button
                      type="button"
                      className="hidden h-8 min-w-8 rounded-lg border border-app-border bg-white px-2 text-sm font-semibold text-app-secondary hover:bg-app-subtle hover:text-app-text sm:inline-flex sm:items-center sm:justify-center"
                      onClick={() => setPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                    <Button size="sm" disabled={page === totalPages} onClick={() => setPage((current) => Math.min(totalPages, current + 1))}>
                      Next
                      <ChevronRight className="h-4 w-4" aria-hidden />
                    </Button>
                    <div className="col-span-2 ml-0 flex items-center justify-center gap-2 sm:justify-start lg:ml-3">
                      <span className="text-sm text-app-secondary">Rows per page:</span>
                      <span className="tabular rounded-lg border border-app-border bg-app-subtle px-2 py-1 text-sm font-semibold text-app-text">{rowsPerPage}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <AccountDrawer account={selectedAccount} open={Boolean(selectedAccount)} onClose={() => setSelectedAccount(null)} />
    </>
  );
}
