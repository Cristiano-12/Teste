"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Building2, CircleHelp, FileText, Home, Menu, PlugZap, Search, Settings, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "Overview", href: "/overview", icon: Home },
  { label: "Accounts", href: "/accounts", icon: Building2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 }
];

const secondaryNav = [
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "Integrations", href: "/integrations", icon: PlugZap }
];

const bottomNav = [
  { label: "Help", href: "/help", icon: CircleHelp },
  { label: "Settings", href: "/settings", icon: Settings }
];

function Logo() {
  return (
    <div className="flex min-w-0 items-center gap-3 px-3">
      <div className="grid h-8 w-8 flex-none place-items-center rounded-lg border border-white/10 bg-white/10">
        <div className="h-3.5 w-3.5 rotate-45 rounded-[3px] border border-white/80" />
      </div>
      <span className="truncate text-sm font-semibold tracking-[0.18em] text-white">NORTHFRAME</span>
    </div>
  );
}

function NavLink({
  item,
  active,
  onClick
}: {
  item: { label: string; href: string; icon: React.ElementType };
  active: boolean;
  onClick?: () => void;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex h-9 items-center gap-3 rounded-lg px-3 text-[13px] font-medium transition-colors duration-150",
        active ? "bg-app-sidebarSelected text-white" : "text-slate-300 hover:bg-app-sidebarHover hover:text-white"
      )}
    >
      <Icon className="h-4 w-4" aria-hidden />
      <span>{item.label}</span>
    </Link>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-app-sidebar px-3 py-4">
      <Logo />
      <div className="thin-scrollbar mt-8 min-h-0 flex-1 overflow-y-auto">
        <nav className="space-y-1" aria-label="Primary navigation">
          {primaryNav.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href || (pathname === "/" && item.href === "/overview")} onClick={onNavigate} />
          ))}
        </nav>
        <div className="my-5 h-px bg-white/10" />
        <nav className="space-y-1" aria-label="Secondary navigation">
          {secondaryNav.map((item) => (
            <NavLink key={item.href} item={item} active={pathname === item.href} onClick={onNavigate} />
          ))}
        </nav>
      </div>
      <div className="mt-auto space-y-1">
        {bottomNav.map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} onClick={onNavigate} />
        ))}
        <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">
              <ShieldCheck className="h-4 w-4" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">Workspace</p>
              <p className="truncate text-xs text-slate-400">Operations team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlobalTopbar({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-app-border bg-white/95 px-3 backdrop-blur sm:px-6 lg:px-8">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-app-border bg-white text-app-secondary lg:hidden"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>
      <label className="relative w-full min-w-0 max-w-md">
        <span className="sr-only">Search accounts and reports</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" aria-hidden />
        <input
          className="h-9 w-full rounded-lg border border-app-border bg-app-subtle pl-9 pr-12 text-[13px] text-app-text placeholder:text-app-muted transition-colors focus:border-app-primary focus:bg-white sm:pr-16 sm:text-sm"
          placeholder="Search accounts, reports..."
          type="search"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-app-border bg-white px-1.5 py-0.5 text-[11px] font-medium text-app-muted">
          ⌘ K
        </span>
      </label>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-app-bg">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] lg:block">
        <SidebarContent />
      </aside>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <button className="absolute inset-0 bg-slate-950/40" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-[272px] max-w-[84vw]">
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
            <button
              type="button"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}
      <div className="min-w-0 lg:pl-[240px]">
        <GlobalTopbar onMenu={() => setMobileOpen(true)} />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
