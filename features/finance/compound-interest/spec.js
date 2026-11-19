import { formatINR, formatPercent } from "@/lib/formatters";
import { compoundByYear, compoundGrowth } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Compound interest calculator",
  fields: [
    { id: "principal", label: "Principal amount", prefix: "₹", min: 1, max: 10_000_000_000, default: "100000", slider: { min: 10000, max: 10_000_000, step: 10000 } },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0, max: 50, default: "8", slider: { min: 1, max: 20, step: 0.1 } },
    { id: "years", label: "Time period", suffix: "Yr", min: 0.1, max: 100, default: "10", slider: { min: 1, max: 40, step: 1 } },
    {
      id: "frequency",
      label: "Compounding frequency",
      type: "select",
      default: "12",
      options: [
        { value: "365", label: "Daily" },
        { value: "12", label: "Monthly" },
        { value: "4", label: "Quarterly" },
        { value: "2", label: "Half-yearly" },
        { value: "1", label: "Yearly" },
      ],
    },
  ],
  run({ principal, rate, years, frequency }) {
    const input = { principal, annualRatePercent: rate, years, timesPerYear: Number(frequency) };
    const r = compoundGrowth(input);
    return {
      chart: {
        ariaLabel: `Final amount ${formatINR(r.amount)}: ${formatINR(principal)} principal and ${formatINR(r.interest)} interest.`,
        segments: [
          { label: "Principal", value: principal, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.interest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Interest share",
        centerBottom: formatPercent((r.interest / r.amount) * 100, { maxDecimals: 1 }),
      },
      rows: [
        { label: "Final amount", value: formatINR(r.amount), emphasis: true },
        { label: "Principal", value: formatINR(principal), swatchClass: "bg-chart-a" },
        { label: "Compound interest", value: formatINR(r.interest), swatchClass: "bg-chart-b" },
      ],
      table: {
        title: "Year-wise growth",
        caption: "Balance and total interest at the end of each year",
        columns: ["Year", "Balance", "Interest so far"],
        rows: compoundByYear(input).map((row) => [row.year, formatINR(row.balance), formatINR(row.interest)]),
      },
    };
  },
};
