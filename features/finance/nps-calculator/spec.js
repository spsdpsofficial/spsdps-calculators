import { formatINR } from "@/lib/formatters";
import { calculateNps } from "./calculations/calculate";

export const spec = {
  ariaLabel: "NPS calculator",
  fields: [
    { id: "monthly", label: "Monthly contribution", prefix: "₹", min: 500, max: 1e7, default: 10000, slider: { min: 500, max: 200000, step: 500 } },
    { id: "age", label: "Your current age", suffix: "Yr", min: 18, max: 69, integer: true, default: 30 },
    { id: "retire", label: "Retirement age", suffix: "Yr", min: 40, max: 75, integer: true, default: 60, hint: "The scheme allows exit at 60 or later; early exit rules differ." },
    { id: "rate", label: "Expected return (per year)", suffix: "%", min: 0, max: 20, default: 10, step: "any", slider: { min: 4, max: 15, step: 0.5 } },
    { id: "annuity", label: "Share of corpus used for annuity", suffix: "%", min: 40, max: 100, default: 40, step: "any", hint: "At least 40% must buy an annuity under the current rules. Check the latest PFRDA rules." },
    { id: "annuityRate", label: "Expected annuity rate (per year)", suffix: "%", min: 0, max: 15, default: 6, step: "any" },
  ],
  run({ monthly, age, retire, rate, annuity, annuityRate }) {
    if (retire <= age) return { error: "Retirement age must be higher than your current age." };
    const r = calculateNps({ monthlyContribution: monthly, currentAge: age, retirementAge: retire, annualReturnPercent: rate, annuityPercent: annuity, annuityRatePercent: annuityRate });
    return {
      chart: {
        ariaLabel: `Of an estimated corpus of ${formatINR(r.corpus)}, ${formatINR(r.invested)} is invested and ${formatINR(r.returns)} is estimated returns.`,
        segments: [
          { label: "Invested", value: r.invested, colorClass: "stroke-chart-a" },
          { label: "Returns", value: r.returns, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Years to go",
        centerBottom: String(r.years),
      },
      rows: [
        { label: "Estimated corpus at retirement", value: formatINR(r.corpus), emphasis: true },
        { label: "Total invested", value: formatINR(r.invested), swatchClass: "bg-chart-a" },
        { label: "Estimated returns", value: formatINR(r.returns), swatchClass: "bg-chart-b" },
        { label: "Corpus used for annuity", value: formatINR(r.annuityCorpus) },
        { label: "Lump sum you can withdraw", value: formatINR(r.lumpSum) },
        { label: "Estimated monthly pension", value: formatINR(r.monthlyPension) },
      ],
      notes: ["NPS returns are market-linked and not guaranteed. Withdrawal and annuity rules are set by PFRDA and can change. Verify the latest rules before planning."],
    };
  },
};
