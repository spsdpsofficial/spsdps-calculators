import { formatCompactINR, formatINR, formatPercent } from "@/lib/formatters";
import { fdMaturity } from "./calculations/calculate";

export const spec = {
  ariaLabel: "FD calculator",
  fields: [
    {
      id: "principal",
      label: "Deposit amount",
      prefix: "₹",
      min: 1000,
      max: 1_000_000_000,
      default: "500000",
      slider: { min: 10000, max: 10_000_000, step: 10000 },
      hint: (raw) => formatCompactINR(Number(raw.principal)),
    },
    { id: "rate", label: "Interest rate (per year)", suffix: "%", min: 0.1, max: 15, default: "7.1", slider: { min: 3, max: 10, step: 0.05 } },
    { id: "years", label: "Tenure", suffix: "Yr", min: 0.25, max: 20, default: "5", slider: { min: 1, max: 10, step: 0.25 }, hint: "You can enter parts of a year, for example 1.5." },
    {
      id: "frequency",
      label: "Interest compounded",
      type: "select",
      default: "4",
      options: [
        { value: "12", label: "Monthly" },
        { value: "4", label: "Quarterly" },
        { value: "2", label: "Half-yearly" },
        { value: "1", label: "Yearly" },
      ],
    },
  ],
  run({ principal, rate, years, frequency }) {
    const r = fdMaturity({ principal, annualRatePercent: rate, years, timesPerYear: Number(frequency) });
    const effective = (r.maturity / principal) ** (1 / years) - 1;
    return {
      chart: {
        ariaLabel: `Maturity ${formatINR(r.maturity)}: ${formatINR(principal)} deposited and ${formatINR(r.interest)} interest.`,
        segments: [
          { label: "Deposit", value: principal, colorClass: "stroke-chart-a" },
          { label: "Interest", value: r.interest, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Effective yield",
        centerBottom: formatPercent(effective * 100),
      },
      rows: [
        { label: "Maturity amount", value: formatINR(r.maturity), emphasis: true },
        { label: "Amount deposited", value: formatINR(principal), swatchClass: "bg-chart-a" },
        { label: "Interest earned", value: formatINR(r.interest), swatchClass: "bg-chart-b" },
      ],
      notes: ["Interest is taxable and banks may deduct TDS. Neither is subtracted here."],
    };
  },
};
