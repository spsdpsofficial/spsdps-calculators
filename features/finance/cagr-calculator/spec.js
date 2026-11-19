import { formatINR, formatNumber, formatPercent } from "@/lib/formatters";
import { calculateCagr } from "./calculations/calculate";

export const spec = {
  ariaLabel: "CAGR calculator",
  fields: [
    { id: "start", label: "Initial value", prefix: "₹", min: 1, max: 1e12, default: 100000 },
    { id: "end", label: "Final value", prefix: "₹", min: 1, max: 1e13, default: 250000 },
    { id: "years", label: "Number of years", suffix: "Yr", min: 0.1, max: 100, default: 5, step: "any", hint: "Decimals are allowed, for example 2.5 years." },
  ],
  run({ start, end, years }) {
    const r = calculateCagr({ startValue: start, endValue: end, years });
    const rows = [
      { label: "CAGR (per year)", value: formatPercent(r.cagrPercent, { maxDecimals: 2 }), emphasis: true },
      { label: "Absolute gain", value: formatINR(r.absoluteGain) },
      { label: "Total return", value: formatPercent(r.totalReturnPercent, { maxDecimals: 2 }) },
    ];
    if (r.doublingYears !== null) rows.push({ label: "Time to double at this rate", value: `${formatNumber(r.doublingYears, { maxDecimals: 2 })} years` });
    return { rows, notes: ["CAGR smooths growth into one yearly figure. Real returns move up and down from year to year."] };
  },
};
