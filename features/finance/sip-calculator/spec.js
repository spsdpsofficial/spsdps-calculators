import { formatCompactINR, formatINR, formatPercent } from "@/lib/formatters";
import { sipValueAfter, sipYearly } from "./calculations/calculate";

export const spec = {
  ariaLabel: "SIP calculator",
  fields: [
    {
      id: "monthly",
      label: "Monthly investment",
      prefix: "₹",
      min: 100,
      max: 10_000_000,
      default: "10000",
      slider: { min: 500, max: 200_000, step: 500 },
      hint: (raw) => formatCompactINR(Number(raw.monthly)),
    },
    { id: "rate", label: "Expected return (per year)", suffix: "%", min: 0, max: 40, default: "12", slider: { min: 1, max: 30, step: 0.5 } },
    { id: "years", label: "Time period", suffix: "Yr", min: 1, max: 50, integer: true, default: "10", slider: { min: 1, max: 40, step: 1 } },
  ],
  run({ monthly, rate, years }) {
    const result = sipValueAfter({ monthly, annualRatePercent: rate, months: years * 12 });
    const rows = sipYearly({ monthly, annualRatePercent: rate, years });
    return {
      chart: {
        ariaLabel: `Of an estimated ${formatINR(result.futureValue)}, ${formatINR(result.invested)} is invested and ${formatINR(result.returns)} is estimated returns.`,
        segments: [
          { label: "Invested", value: result.invested, colorClass: "stroke-chart-a" },
          { label: "Returns", value: result.returns, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Returns share",
        centerBottom: formatPercent((result.returns / result.futureValue) * 100, { maxDecimals: 1 }),
      },
      rows: [
        { label: "Estimated future value", value: formatINR(result.futureValue), emphasis: true },
        { label: "Amount invested", value: formatINR(result.invested), swatchClass: "bg-chart-a" },
        { label: "Estimated returns", value: formatINR(result.returns), swatchClass: "bg-chart-b" },
      ],
      notes: ["Returns are assumed, not guaranteed. Actual market-linked returns vary and can be negative."],
      table: {
        title: "Year-wise growth",
        caption: "Amount invested and estimated value at the end of each year",
        columns: ["Year", "Invested", "Estimated value"],
        rows: rows.map((row) => [row.year, formatINR(row.invested), formatINR(row.value)]),
      },
    };
  },
};
