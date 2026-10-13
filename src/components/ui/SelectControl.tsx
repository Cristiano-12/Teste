"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SelectControl({
  label,
  value,
  onChange,
  options,
  className
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <label className={cn("relative inline-flex w-full sm:w-auto", className)}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-app-border bg-white pl-3 pr-8 text-sm font-medium text-app-text shadow-soft transition-colors hover:bg-app-subtle focus:border-app-primary sm:w-auto"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-app-muted" aria-hidden />
    </label>
  );
}
