import { formatINR, formatPercent } from "@/lib/formatters";
import { calculateInflation } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Inflation calculator",
  fields: [
    { id: "amount", label: "Amount today", prefix: "₹", min: 1, max: 1e12, default: 100000 },
    { id: "rate", label: "Expected inflation (per year)", suffix: "%", min: 0, max: 50, default: 6, step: "any", slider: { min: 1, max: 15, step: 0.1 } },
    { id: "years", label: "Number of years", suffix: "Yr", min: 1, max: 60, integer: true, default: 10, slider: { min: 1, max: 40, step: 1 } },
  ],
  run({ amount, rate, years }) {
    const r = calculateInflation({ amount, inflationPercent: rate, years });
    return {
      rows: [
        { label: `What costs ${formatINR(amount)} today will cost`, value: formatINR(r.futureCost), emphasis: true },
        { label: "Increase in cost", value: formatINR(r.increase) },
        { label: `${formatINR(amount)} will buy only what this buys today`, value: formatINR(r.purchasingPower) },
        { label: "Loss of purchasing power", value: `${formatINR(r.powerLost)} (${formatPercent((r.powerLost / amount) * 100, { maxDecimals: 1 })})` },
      ],
      notes: ["Inflation is not the same every year or for every item. Education and healthcare costs often rise faster than the general rate."],
    };
  },
};
