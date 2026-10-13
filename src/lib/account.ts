import type { Account, HealthBand } from "@/types";

export function getHealthBand(score: number): HealthBand {
  if (score >= 80) return "Healthy";
  if (score >= 65) return "Needs attention";
  if (score >= 45) return "At risk";
  return "Critical";
}

export function getUsageLabel(account: Account) {
  if (account.usageTrend === "up") return `+${account.usageChange.toFixed(1)}%`;
  if (account.usageTrend === "down") return `${account.usageChange.toFixed(1)}%`;
  return `${account.usageChange.toFixed(1)}%`;
}

export function getRiskLabel(account: Account) {
  const band = getHealthBand(account.healthScore);
  if (account.status === "Past due") return "Payment risk";
  if (account.status === "Churned") return "Churned";
  if (band === "Critical") return "Critical";
  if (band === "At risk") return "At risk";
  if (band === "Needs attention") return "Needs attention";
  return "Low";
}
