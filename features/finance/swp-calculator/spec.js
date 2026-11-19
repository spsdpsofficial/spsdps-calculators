import { formatINR } from "@/lib/formatters";
import { simulateSwp } from "./calculations/calculate";

export const spec = {
  ariaLabel: "SWP calculator",
  fields: [
    { id: "corpus", label: "Total investment", prefix: "₹", min: 10000, max: 1e11, default: 5000000, slider: { min: 100000, max: 100000000, step: 100000 } },
    { id: "withdrawal", label: "Monthly withdrawal", prefix: "₹", min: 100, max: 1e9, default: 40000, slider: { min: 1000, max: 500000, step: 1000 } },
    { id: "rate", label: "Expected return (per year)", suffix: "%", min: 0, max: 30, default: 8, step: "any", slider: { min: 1, max: 20, step: 0.5 } },
    { id: "years", label: "Time period", suffix: "Yr", min: 1, max: 50, integer: true, default: 20, slider: { min: 1, max: 40, step: 1 } },
  ],
  run({ corpus, withdrawal, rate, years }) {
    const r = simulateSwp({ corpus, monthlyWithdrawal: withdrawal, annualRatePercent: rate, months: years * 12 });
    const rows = [
      { label: r.depleted ? "Investment lasts for" : "Final value", value: r.depleted ? `${Math.floor(r.lastedMonths / 12)} years ${r.lastedMonths % 12} months` : formatINR(r.endingBalance), emphasis: true },
      { label: "Total withdrawn", value: formatINR(r.totalWithdrawn), swatchClass: "bg-chart-a" },
      { label: "Total investment", value: formatINR(corpus) },
      { label: "Growth earned", value: formatINR(r.totalGrowth), swatchClass: "bg-chart-b" },
    ];
    return {
      rows,
      notes: [
        r.depleted
          ? "At this withdrawal and return, the money runs out before the chosen period ends. Reduce the withdrawal or choose a shorter period."
          : "Returns are assumed and not guaranteed. A falling market early in the plan can exhaust the money sooner. Withdrawals may attract capital gains tax.",
      ],
      table: {
        title: "Year-wise summary",
        caption: "Cumulative withdrawals and balance at the end of each year",
        columns: ["Year", "Total withdrawn", "Balance"],
        rows: r.yearly.map((y) => [y.year, formatINR(y.withdrawn), formatINR(y.balance)]),
      },
    };
  },
};
