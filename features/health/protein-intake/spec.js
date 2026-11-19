import { formatNumber } from "@/lib/formatters";
import { GOALS, calculateProtein } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Daily protein intake calculator",
  fields: [
    { id: "weight", label: "Body weight", suffix: "kg", min: 20, max: 300, default: 70, step: "any" },
    { id: "goal", label: "Activity or goal", type: "select", default: "active", options: GOALS.map((g) => ({ value: g.id, label: g.label })) },
    { id: "meals", label: "Meals or snacks to spread it over", min: 1, max: 8, integer: true, default: 4 },
  ],
  run({ weight, goal, meals }) {
    const r = calculateProtein({ weightKg: weight, goalId: goal, meals });
    const g = (n) => `${formatNumber(n, { maxDecimals: 0 })} g`;
    return {
      rows: [
        { label: "Daily protein", value: `${g(r.low)} to ${g(r.high)}`, emphasis: true },
        { label: "Rate used", value: `${r.goal.low} to ${r.goal.high} g per kg` },
        { label: `Per meal (${meals} meals)`, value: `${g(r.perMealLow)} to ${g(r.perMealHigh)}` },
      ],
      notes: ["General guidance for healthy adults, not medical advice. People with kidney disease, pregnancy or other conditions should follow their doctor's or dietitian's advice."],
    };
  },
};
