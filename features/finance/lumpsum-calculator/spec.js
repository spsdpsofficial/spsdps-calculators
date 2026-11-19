import { formatINR, formatPercent } from "@/lib/formatters";
import { lumpsumValue, lumpsumYearly } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Lumpsum calculator",
  fields: [
    { id: "amount", label: "Investment amount", prefix: "₹", min: 500, max: 1e10, default: 100000, slider: { min: 5000, max: 10000000, step: 5000 } },
    { id: "rate", label: "Expected return (per year)", suffix: "%", min: 0, max: 50, default: 12, step: "any", slider: { min: 1, max: 30, step: 0.5 } },
    { id: "years", label: "Time period", suffix: "Yr", min: 1, max: 50, integer: true, default: 10, slider: { min: 1, max: 40, step: 1 } },
  ],
  run({ amount, rate, years }) {
    const r = lumpsumValue({ amount, annualRatePercent: rate, years });
    const rows = lumpsumYearly({ amount, annualRatePercent: rate, years });
    return {
      chart: {
        ariaLabel: `Of an estimated ${formatINR(r.futureValue)}, ${formatINR(r.invested)} is invested and ${formatINR(r.returns)} is estimated returns.`,
        segments: [
          { label: "Invested", value: r.invested, colorClass: "stroke-chart-a" },
          { label: "Returns", value: r.returns, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Returns share",
        centerBottom: formatPercent((r.returns / r.futureValue) * 100, { maxDecimals: 1 }),
      },
      rows: [
        { label: "Estimated future value", value: formatINR(r.futureValue), emphasis: true },
        { label: "Amount invested", value: formatINR(r.invested), swatchClass: "bg-chart-a" },
        { label: "Estimated returns", value: formatINR(r.returns), swatchClass: "bg-chart-b" },
      ],
      notes: ["Returns are assumed, not guaranteed. Market-linked returns vary and can be negative. Taxes and expense ratios are not deducted."],
      table: {
        title: "Year-wise growth",
        caption: "Estimated value at the end of each year",
        columns: ["Year", "Estimated value"],
        rows: rows.map((row) => [row.year, formatINR(row.value)]),
      },
    };
  },
};
