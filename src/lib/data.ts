import type { Account } from "@/types";

export const accounts: Account[] = [
  {
    id: "acc_001",
    name: "Lumina Labs",
    domain: "luminalabs.io",
    owner: "Maya Chen",
    plan: "Enterprise",
    mrr: 12840,
    users: 184,
    productUsage: 91,
    healthScore: 92,
    status: "Active",
    lastActivity: "12 min ago",
    lastActivityDate: "2026-10-13",
    usageTrend: "up",
    usageChange: 9.4,
    weeklyActive: 153,
    renewalDate: "Feb 12, 2027",
    riskSignals: ["No open risk signals", "Renewal champion active", "API usage up 11%"],
    recentActivity: ["Expanded Enterprise seats by 26", "Created two new reporting workspaces", "Completed quarterly business review"]
  },
  {
    id: "acc_002",
    name: "Northstar Health",
    domain: "northstarhealth.com",
    owner: "Elliot Hayes",
    plan: "Business",
    mrr: 4850,
    users: 42,
    productUsage: 66,
    healthScore: 78,
    status: "Active",
    lastActivity: "38 min ago",
    lastActivityDate: "2026-10-13",
    usageTrend: "down",
    usageChange: -14.2,
    weeklyActive: 31,
    renewalDate: "Dec 18, 2026",
    riskSignals: ["Usage decreased 14%", "Two inactive admins", "Renewal in 62 days"],
    recentActivity: ["Usage dropped in automation workflows", "Support ticket escalated to product operations", "Admin invited three finance users"]
  },
  {
    id: "acc_003",
    name: "Parallel Commerce",
    domain: "parallelcommerce.co",
    owner: "Rina Patel",
    plan: "Growth",
    mrr: 3120,
    users: 37,
    productUsage: 73,
    healthScore: 84,
    status: "Active",
    lastActivity: "2h ago",
    lastActivityDate: "2026-10-13",
    usageTrend: "up",
    usageChange: 6.1,
    weeklyActive: 29,
    renewalDate: "Jan 28, 2027",
    riskSignals: ["No executive sponsor identified", "Expansion workspace created", "Reports usage up 8%"],
    recentActivity: ["New workspace created for wholesale division", "Connected Salesforce integration", "Viewed expansion pricing page"]
  },
  {
    id: "acc_004",
    name: "VantaCore",
    domain: "vantacore.ai",
    owner: "Jon Bell",
    plan: "Enterprise",
    mrr: 16200,
    users: 221,
    productUsage: 58,
    healthScore: 63,
    status: "At risk",
    lastActivity: "4h ago",
    lastActivityDate: "2026-10-12",
    usageTrend: "down",
    usageChange: -18.0,
    weeklyActive: 118,
    renewalDate: "Nov 24, 2026",
    riskSignals: ["Usage dropped 18%", "Champion changed roles", "Renewal in 42 days"],
    recentActivity: ["Health score changed from 71 to 63", "Contract owner opened billing page", "Customer success note added"]
  },
  {
    id: "acc_005",
    name: "BrightLayer",
    domain: "brightlayer.dev",
    owner: "Maya Chen",
    plan: "Business",
    mrr: 5920,
    users: 68,
    productUsage: 49,
    healthScore: 48,
    status: "Past due",
    lastActivity: "6h ago",
    lastActivityDate: "2026-10-12",
    usageTrend: "down",
    usageChange: -22.6,
    weeklyActive: 26,
    renewalDate: "Oct 30, 2026",
    riskSignals: ["Payment failed twice", "Usage decreased 23%", "No admin activity in 9 days"],
    recentActivity: ["Payment recovery email sent", "Invoice retry scheduled", "Health score moved to critical"]
  },
  {
    id: "acc_006",
    name: "AtlasDesk",
    domain: "atlasdesk.com",
    owner: "Camila Rocha",
    plan: "Starter",
    mrr: 890,
    users: 12,
    productUsage: 61,
    healthScore: 71,
    status: "Trial",
    lastActivity: "8h ago",
    lastActivityDate: "2026-10-12",
    usageTrend: "flat",
    usageChange: 0.8,
    weeklyActive: 8,
    renewalDate: "Oct 27, 2026",
    riskSignals: ["Trial ends in 14 days", "Only one integration connected", "Buying committee unknown"],
    recentActivity: ["Invited sales operations manager", "Viewed onboarding checklist", "Created first account segment"]
  },
  {
    id: "acc_007",
    name: "Clearbit Works",
    domain: "clearbitworks.com",
    owner: "Elliot Hayes",
    plan: "Enterprise",
    mrr: 21900,
    users: 286,
    productUsage: 87,
    healthScore: 89,
    status: "Active",
    lastActivity: "10h ago",
    lastActivityDate: "2026-10-12",
    usageTrend: "up",
    usageChange: 12.7,
    weeklyActive: 241,
    renewalDate: "May 03, 2027",
    riskSignals: ["Expansion opportunity open", "API calls up 17%", "Executive sponsor active"],
    recentActivity: ["Plan upgraded to Enterprise", "New API key created", "Product adoption report exported"]
  },
  {
    id: "acc_008",
    name: "Everstead Finance",
    domain: "everstead.finance",
    owner: "Jon Bell",
    plan: "Business",
    mrr: 4380,
    users: 51,
    productUsage: 76,
    healthScore: 82,
    status: "Active",
    lastActivity: "Yesterday",
    lastActivityDate: "2026-10-12",
    usageTrend: "up",
    usageChange: 4.9,
    weeklyActive: 39,
    renewalDate: "Mar 15, 2027",
    riskSignals: ["Reporting usage stable", "CSAT improved", "No overdue invoices"],
    recentActivity: ["Payment recovered", "Board metrics report scheduled", "Admin completed security review"]
  },
  {
    id: "acc_009",
    name: "Redwood Systems",
    domain: "redwoodsystems.io",
    owner: "Rina Patel",
    plan: "Growth",
    mrr: 2740,
    users: 29,
    productUsage: 44,
    healthScore: 55,
    status: "At risk",
    lastActivity: "Yesterday",
    lastActivityDate: "2026-10-12",
    usageTrend: "down",
    usageChange: -11.5,
    weeklyActive: 14,
    renewalDate: "Dec 04, 2026",
    riskSignals: ["Usage below onboarding target", "No weekly admin login", "Support sentiment negative"],
    recentActivity: ["Usage dropped in dashboards", "Support ticket reopened", "Owner assigned renewal playbook"]
  },
  {
    id: "acc_010",
    name: "Nimbus Grid",
    domain: "nimbusgrid.com",
    owner: "Camila Rocha",
    plan: "Enterprise",
    mrr: 14750,
    users: 197,
    productUsage: 81,
    healthScore: 86,
    status: "Active",
    lastActivity: "2 days ago",
    lastActivityDate: "2026-10-11",
    usageTrend: "up",
    usageChange: 7.6,
    weeklyActive: 161,
    renewalDate: "Apr 19, 2027",
    riskSignals: ["Expansion pipeline active", "Integration adoption high", "Renewal owner confirmed"],
    recentActivity: ["Created revenue operations dashboard", "Exported 74 account records", "Added integration admin"]
  },
  {
    id: "acc_011",
    name: "BeaconSoft",
    domain: "beaconsoft.co",
    owner: "Maya Chen",
    plan: "Growth",
    mrr: 2280,
    users: 24,
    productUsage: 68,
    healthScore: 75,
    status: "Active",
    lastActivity: "2 days ago",
    lastActivityDate: "2026-10-11",
    usageTrend: "flat",
    usageChange: 1.2,
    weeklyActive: 18,
    renewalDate: "Feb 01, 2027",
    riskSignals: ["Needs second admin", "Automation usage flat", "Stable payment history"],
    recentActivity: ["Created customer health segment", "Viewed integration docs", "Added four saved filters"]
  },
  {
    id: "acc_012",
    name: "HarborOps",
    domain: "harborops.net",
    owner: "Elliot Hayes",
    plan: "Business",
    mrr: 6720,
    users: 73,
    productUsage: 93,
    healthScore: 94,
    status: "Active",
    lastActivity: "3 days ago",
    lastActivityDate: "2026-10-10",
    usageTrend: "up",
    usageChange: 15.2,
    weeklyActive: 67,
    renewalDate: "Jun 22, 2027",
    riskSignals: ["Strong adoption", "QBR completed", "Expansion seats requested"],
    recentActivity: ["Exported executive report", "Added 19 users", "Viewed enterprise plan comparison"]
  },
  {
    id: "acc_013",
    name: "MetricForge",
    domain: "metricforge.io",
    owner: "Jon Bell",
    plan: "Starter",
    mrr: 640,
    users: 7,
    productUsage: 29,
    healthScore: 39,
    status: "Churned",
    lastActivity: "Sep 28, 2026",
    lastActivityDate: "2026-09-28",
    usageTrend: "down",
    usageChange: -31.4,
    weeklyActive: 0,
    renewalDate: "Sep 30, 2026",
    riskSignals: ["Subscription canceled", "No active users", "Data export completed"],
    recentActivity: ["Account canceled by admin", "Data export delivered", "Win-back task scheduled"]
  },
  {
    id: "acc_014",
    name: "Sierra Robotics",
    domain: "sierrarobotics.com",
    owner: "Rina Patel",
    plan: "Enterprise",
    mrr: 18760,
    users: 244,
    productUsage: 79,
    healthScore: 80,
    status: "Active",
    lastActivity: "4 days ago",
    lastActivityDate: "2026-10-09",
    usageTrend: "flat",
    usageChange: 2.2,
    weeklyActive: 199,
    renewalDate: "Jul 11, 2027",
    riskSignals: ["Procurement review pending", "Feature request open", "Adoption above target"],
    recentActivity: ["Security questionnaire updated", "Admin changed billing contact", "Product feedback submitted"]
  },
  {
    id: "acc_015",
    name: "Keystone Legal",
    domain: "keystonelegal.com",
    owner: "Camila Rocha",
    plan: "Growth",
    mrr: 1960,
    users: 21,
    productUsage: 36,
    healthScore: 46,
    status: "Past due",
    lastActivity: "5 days ago",
    lastActivityDate: "2026-10-08",
    usageTrend: "down",
    usageChange: -16.8,
    weeklyActive: 9,
    renewalDate: "Nov 09, 2026",
    riskSignals: ["Payment overdue", "Usage under 40%", "Admin inactive for 12 days"],
    recentActivity: ["Invoice marked past due", "Customer success email sent", "Renewal risk added"]
  }
];

export const revenueOverview = [
  { month: "Nov", mrr: 342400, previous: 318900, arr: 4108800, expansion: 28600 },
  { month: "Dec", mrr: 351800, previous: 326700, arr: 4221600, expansion: 30400 },
  { month: "Jan", mrr: 363200, previous: 334500, arr: 4358400, expansion: 33500 },
  { month: "Feb", mrr: 371900, previous: 344700, arr: 4462800, expansion: 34800 },
  { month: "Mar", mrr: 381600, previous: 352100, arr: 4579200, expansion: 36100 },
  { month: "Apr", mrr: 390200, previous: 360800, arr: 4682400, expansion: 37700 },
  { month: "May", mrr: 398900, previous: 369500, arr: 4786800, expansion: 38900 },
  { month: "Jun", mrr: 407300, previous: 376200, arr: 4887600, expansion: 41400 },
  { month: "Jul", mrr: 414600, previous: 384900, arr: 4975200, expansion: 42600 },
  { month: "Aug", mrr: 419800, previous: 392400, arr: 5037600, expansion: 44100 },
  { month: "Sep", mrr: 423500, previous: 399700, arr: 5082000, expansion: 45600 },
  { month: "Oct", mrr: 428620, previous: 405300, arr: 5143440, expansion: 48200 }
];

export const healthDistribution = [
  { label: "Healthy", value: 68, color: "#16A34A" },
  { label: "Needs attention", value: 19, color: "#D97706" },
  { label: "At risk", value: 9, color: "#F59E0B" },
  { label: "Critical", value: 4, color: "#DC2626" }
];

export const recentActivity = [
  { type: "Plan upgraded", account: "Clearbit Works", detail: "Moved from Business to Enterprise", time: "12 min ago" },
  { type: "Usage dropped 18%", account: "VantaCore", detail: "Automation runs declined for the second week", time: "38 min ago" },
  { type: "New workspace created", account: "Parallel Commerce", detail: "Wholesale division added a reporting workspace", time: "2h ago" },
  { type: "Payment recovered", account: "Everstead Finance", detail: "Failed invoice was paid after retry", time: "4h ago" },
  { type: "Health score changed", account: "BrightLayer", detail: "Moved from 56 to 48 after admin inactivity", time: "6h ago" }
];

export const analyticsRevenue = [
  { month: "Nov", revenue: 4.11, previous: 3.83, expansion: 0.34, contraction: 0.12 },
  { month: "Dec", revenue: 4.22, previous: 3.92, expansion: 0.36, contraction: 0.11 },
  { month: "Jan", revenue: 4.36, previous: 4.01, expansion: 0.38, contraction: 0.13 },
  { month: "Feb", revenue: 4.46, previous: 4.14, expansion: 0.40, contraction: 0.12 },
  { month: "Mar", revenue: 4.58, previous: 4.23, expansion: 0.42, contraction: 0.14 },
  { month: "Apr", revenue: 4.68, previous: 4.33, expansion: 0.43, contraction: 0.13 },
  { month: "May", revenue: 4.79, previous: 4.43, expansion: 0.45, contraction: 0.12 },
  { month: "Jun", revenue: 4.89, previous: 4.51, expansion: 0.46, contraction: 0.11 },
  { month: "Jul", revenue: 4.98, previous: 4.62, expansion: 0.47, contraction: 0.12 },
  { month: "Aug", revenue: 5.04, previous: 4.71, expansion: 0.47, contraction: 0.13 },
  { month: "Sep", revenue: 5.08, previous: 4.80, expansion: 0.48, contraction: 0.14 },
  { month: "Oct", revenue: 5.14, previous: 4.86, expansion: 0.48, contraction: 0.12 }
];

export const revenueByPlan = [
  { plan: "Enterprise", revenue: 2480000, accounts: 146 },
  { plan: "Business", revenue: 1490000, accounts: 382 },
  { plan: "Growth", revenue: 842000, accounts: 486 },
  { plan: "Starter", revenue: 331000, accounts: 234 }
];

export const retentionCohorts = [
  { cohort: "Jan 2026", values: [100, 98, 96, 95, 94, 93, 92] },
  { cohort: "Feb 2026", values: [100, 97, 96, 94, 93, 92, null] },
  { cohort: "Mar 2026", values: [100, 98, 97, 95, 94, null, null] },
  { cohort: "Apr 2026", values: [100, 96, 95, 93, null, null, null] },
  { cohort: "May 2026", values: [100, 98, 96, null, null, null, null] },
  { cohort: "Jun 2026", values: [100, 97, null, null, null, null, null] },
  { cohort: "Jul 2026", values: [100, null, null, null, null, null, null] },
  { cohort: "Aug 2026", values: [100, null, null, null, null, null, null] }
];

export const productAdoption = [
  { feature: "Analytics", adoption: 86, activeAccounts: 1073, trend: 7.4 },
  { feature: "Automations", adoption: 62, activeAccounts: 774, trend: 4.9 },
  { feature: "API", adoption: 48, activeAccounts: 599, trend: 3.2 },
  { feature: "Reports", adoption: 71, activeAccounts: 886, trend: 6.1 },
  { feature: "Integrations", adoption: 57, activeAccounts: 711, trend: 2.8 }
];

const companyPrefixes = [
  "Apex", "Bluefin", "Copper", "Delta", "Ember", "Foundry", "Granite", "Helio", "Ironwood", "Juniper", "Kinetic", "Ledger",
  "Meridian", "Nova", "Onyx", "Pioneer", "Quartz", "River", "Summit", "Terra", "Union", "Vector", "Waypoint", "Zephyr"
];

const companySuffixes = [
  "Analytics", "Cloud", "Systems", "Works", "Health", "Commerce", "Finance", "Robotics", "Legal", "Grid", "Ops", "Labs"
];

const owners = ["Maya Chen", "Elliot Hayes", "Rina Patel", "Jon Bell", "Camila Rocha"];

export function getAccountDataset(total = 1248): Account[] {
  if (total <= accounts.length) return accounts.slice(0, total);

  const generated: Account[] = [];
  const extraNeeded = total - accounts.length;

  for (let index = 0; index < extraNeeded; index += 1) {
    const plan = index % 9 === 0 ? "Enterprise" : index % 4 === 0 ? "Business" : index % 3 === 0 ? "Growth" : "Starter";
    const baseMrr = plan === "Enterprise" ? 9800 : plan === "Business" ? 4200 : plan === "Growth" ? 1850 : 620;
    const healthScore = Math.max(28, Math.min(96, 68 + ((index * 7) % 29) - (index % 11 === 0 ? 34 : 0)));
    const status: Account["status"] = index % 53 === 0 ? "Churned" : index % 37 === 0 ? "Past due" : index % 31 === 0 ? "Trial" : healthScore < 50 ? "At risk" : "Active";
    const usageTrend = healthScore < 55 ? "down" : index % 5 === 0 ? "flat" : "up";
    const usageChange = usageTrend === "down" ? -1 * (8 + (index % 18)) : usageTrend === "flat" ? 0.5 + (index % 4) / 10 : 2.1 + (index % 11);
    const prefix = companyPrefixes[index % companyPrefixes.length];
    const suffix = companySuffixes[Math.floor(index / companyPrefixes.length) % companySuffixes.length];
    const name = `${prefix} ${suffix}`;
    const users = plan === "Enterprise" ? 120 + (index % 180) : plan === "Business" ? 36 + (index % 74) : plan === "Growth" ? 14 + (index % 36) : 4 + (index % 16);
    const activeUsers = status === "Churned" ? 0 : Math.round(users * (healthScore / 105));

    generated.push({
      id: `acc_generated_${index + 1}`,
      name,
      domain: `${prefix.toLowerCase()}${suffix.toLowerCase()}.com`,
      owner: owners[index % owners.length],
      plan,
      mrr: baseMrr + (index % 13) * (plan === "Enterprise" ? 480 : plan === "Business" ? 210 : plan === "Growth" ? 95 : 24),
      users,
      productUsage: Math.max(18, Math.min(96, healthScore - 4 + (index % 13))),
      healthScore,
      status,
      lastActivity: index % 2 === 0 ? "2 days ago" : index % 3 === 0 ? "5 days ago" : "Yesterday",
      lastActivityDate: `2026-10-${String(Math.max(1, 12 - (index % 11))).padStart(2, "0")}`,
      usageTrend,
      usageChange,
      weeklyActive: activeUsers,
      renewalDate: ["Nov 18, 2026", "Dec 12, 2026", "Jan 22, 2027", "Mar 04, 2027"][index % 4],
      riskSignals:
        healthScore < 55
          ? ["Usage below expected baseline", "Renewal owner not confirmed", "Admin activity declining"]
          : ["Adoption within expected range", "Payment history clear", "Owner engagement stable"],
      recentActivity:
        healthScore < 55
          ? ["Risk playbook assigned", "Customer success note added", "Usage alert reviewed"]
          : ["Monthly report exported", "New segment created", "Integration sync completed"]
    });
  }

  return [...accounts, ...generated];
}
