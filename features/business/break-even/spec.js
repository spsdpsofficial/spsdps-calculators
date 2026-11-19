import { formatINR, formatNumber, formatPercent } from "@/lib/formatters";
import { calculateBreakEven } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Break-even calculator",
  fields: [
    { id: "fixed", label: "Fixed costs (per month or period)", prefix: "₹", min: 0, max: 1e12, default: 100000, hint: "Rent, salaries, loan EMIs and other costs that do not change with sales." },
    { id: "price", label: "Selling price per unit", prefix: "₹", min: 0.01, max: 1e9, default: 250, step: "any" },
    { id: "variable", label: "Variable cost per unit", prefix: "₹", min: 0, max: 1e9, default: 150, step: "any", hint: "Materials, packaging, commission and other costs for each unit sold." },
    { id: "target", label: "Target profit (optional)", prefix: "₹", min: 0, max: 1e12, default: 50000, optional: true, emptyValue: 0 },
  ],
  run({ fixed, price, variable, target }) {
    const r = calculateBreakEven({ fixedCosts: fixed, price, variableCost: variable, targetProfit: target });
    if (r.error) return { error: r.error };
    const rows = [
      { label: "Break-even units", value: formatNumber(r.breakEvenUnits), emphasis: true },
      { label: "Break-even sales", value: formatINR(r.breakEvenRevenue) },
      { label: "Contribution per unit", value: formatINR(r.contribution, { decimals: 2 }) },
      { label: "Contribution margin ratio", value: formatPercent(r.contributionRatio) },
    ];
    if (target > 0) {
      rows.push({ label: `Units needed for ${formatINR(target)} profit`, value: formatNumber(r.targetUnits) });
      rows.push({ label: "Sales needed for that profit", value: formatINR(r.targetRevenue) });
    }
    return { rows, notes: ["Assumes a constant selling price and variable cost per unit. Units are rounded up to whole units."] };
  },
};
