import { formatINR, formatNumber } from "@/lib/formatters";
import { simpleInterest } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Simple interest calculator",
  fields: [
    { id: "principal", label: "Principal amount", prefix: "₹", min: 1, max: 10_000_000_000, default: "200000", slider: { min: 10000, max: 10_000_000, step: 10000 } },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0, max: 100, default: "9", slider: { min: 1, max: 30, step: 0.1 } },
    { id: "time", label: "Time", min: 0.01, max: 1200, default: "3" },
    {
      id: "unit",
      label: "Time unit",
      type: "select",
      default: "years",
      options: [
        { value: "years", label: "Years" },
        { value: "months", label: "Months" },
        { value: "days", label: "Days" },
      ],
    },
  ],
  run({ principal, rate, time, unit }) {
    const r = simpleInterest({ principal, annualRatePercent: rate, time, unit });
    return {
      rows: [
        { label: "Simple interest", value: formatINR(r.interest, { decimals: 2 }), emphasis: true },
        { label: "Principal", value: formatINR(principal) },
        { label: "Total amount", value: formatINR(r.total, { decimals: 2 }) },
        { label: "Time in years", value: formatNumber(r.years, { maxDecimals: 4 }) },
      ],
    };
  },
};
