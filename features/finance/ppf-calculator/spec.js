import { formatINR, formatPercent } from "@/lib/formatters";
import { ppfProjection } from "./calculations/calculate";

export const spec = {
  ariaLabel: "PPF calculator",
  fields: [
    { id: "deposit", label: "Yearly deposit", prefix: "₹", min: 500, max: 150000, default: "150000", slider: { min: 500, max: 150000, step: 500 }, hint: "The yearly limit is ₹1,50,000." },
    {
      id: "rate",
      label: "Interest rate (per year)",
      suffix: "%",
      min: 0,
      max: 15,
      default: "7.1",
      hint: "7.1% was the rate for Oct–Dec 2026 as reported after the 30 Sep 2026 review. The rate is reset every quarter.",
    },
    { id: "years", label: "Duration", suffix: "Yr", min: 15, max: 50, integer: true, default: "15", slider: { min: 15, max: 50, step: 5 }, hint: "15 years, then extendable in blocks of 5 years." },
  ],
  run({ deposit, rate, years }) {
    const r = ppfProjection({ yearlyDeposit: deposit, annualRatePercent: rate, years });
    return {
      chart: {
        ariaLabel: `Maturity ${formatINR(r.maturity)}: ${formatINR(r.invested)} invested and ${formatINR(r.interest)} interest.`,
        segments: [
          { label: "Invested", value: r.invested, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.interest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Interest share",
        centerBottom: formatPercent((r.interest / r.maturity) * 100, { maxDecimals: 1 }),
      },
      rows: [
        { label: "Maturity value", value: formatINR(r.maturity), emphasis: true },
        { label: "Total invested", value: formatINR(r.invested), swatchClass: "bg-chart-a" },
        { label: "Total interest", value: formatINR(r.interest), swatchClass: "bg-chart-b" },
      ],
      notes: ["Assumes the full deposit is made before 5 April each year and the rate never changes. The real rate is revised every quarter."],
    };
  },
};
