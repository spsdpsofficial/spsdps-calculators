import { formatINR, formatPercent } from "@/lib/formatters";
import { calculateRoi } from "./calculations/calculate";

export const spec = {
  ariaLabel: "ROI calculator",
  fields: [
    { id: "invested", label: "Amount invested (cost)", prefix: "₹", min: 1, max: 1e12, default: 100000 },
    { id: "final", label: "Final value (returns)", prefix: "₹", min: 0, max: 1e13, default: 150000, hint: "Include any income received, such as dividends or rent." },
    { id: "years", label: "Time held (optional)", suffix: "Yr", min: 0.1, max: 100, default: 3, step: "any", optional: true, emptyValue: 0, hint: "Fill this to see the yearly (annualised) return." },
  ],
  run({ invested, final, years }) {
    const r = calculateRoi({ invested, finalValue: final, years });
    const rows = [
      { label: "ROI", value: formatPercent(r.roiPercent, { maxDecimals: 2 }), emphasis: true },
      { label: r.gain >= 0 ? "Net profit" : "Net loss", value: formatINR(Math.abs(r.gain)) },
    ];
    if (r.annualisedPercent !== null) rows.push({ label: "Annualised ROI", value: formatPercent(r.annualisedPercent, { maxDecimals: 2 }) });
    return { rows, notes: ["ROI ignores risk, taxes and the cost of your time. Compare it with alternatives over the same period."] };
  },
};
