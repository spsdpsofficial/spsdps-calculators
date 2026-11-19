import { formatINR, formatPercent } from "@/lib/formatters";
import { rdMaturity } from "./calculations/calculate";

export const spec = {
  ariaLabel: "RD calculator",
  fields: [
    { id: "monthly", label: "Monthly deposit", prefix: "₹", min: 100, max: 10_000_000, default: "5000", slider: { min: 500, max: 100_000, step: 500 } },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0.1, max: 15, default: "6.5", slider: { min: 3, max: 10, step: 0.05 } },
    { id: "months", label: "Tenure", suffix: "Mo", min: 6, max: 120, integer: true, default: "60", slider: { min: 6, max: 120, step: 6 }, hint: "Most banks offer 6 months to 10 years." },
  ],
  run({ monthly, rate, months }) {
    const r = rdMaturity({ monthly, annualRatePercent: rate, months });
    return {
      chart: {
        ariaLabel: `Maturity ${formatINR(r.maturity)}: ${formatINR(r.deposited)} deposited and ${formatINR(r.interest)} interest.`,
        segments: [
          { label: "Deposits", value: r.deposited, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.interest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Interest share",
        centerBottom: formatPercent((r.interest / r.maturity) * 100, { maxDecimals: 1 }),
      },
      rows: [
        { label: "Maturity amount", value: formatINR(r.maturity), emphasis: true },
        { label: "Total deposited", value: formatINR(r.deposited), swatchClass: "bg-chart-a" },
        { label: "Interest earned", value: formatINR(r.interest), swatchClass: "bg-chart-b" },
      ],
      notes: ["Assumes quarterly compounding and no missed instalments. Tax on interest is not deducted."],
    };
  },
};
