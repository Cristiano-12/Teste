export type Plan = "Starter" | "Growth" | "Business" | "Enterprise";
export type AccountStatus = "Active" | "Trial" | "At risk" | "Past due" | "Churned";
export type HealthBand = "Healthy" | "Needs attention" | "At risk" | "Critical";
export type UsageTrend = "up" | "flat" | "down";

export type Account = {
  id: string;
  name: string;
  domain: string;
  owner: string;
  plan: Plan;
  mrr: number;
  users: number;
  productUsage: number;
  healthScore: number;
  status: AccountStatus;
  lastActivity: string;
  lastActivityDate: string;
  usageTrend: UsageTrend;
  usageChange: number;
  weeklyActive: number;
  renewalDate: string;
  riskSignals: string[];
  recentActivity: string[];
};
