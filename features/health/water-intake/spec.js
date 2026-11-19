import { formatNumber } from "@/lib/formatters";
import { calculateWaterIntake } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Water intake calculator",
  fields: [
    { id: "weight", label: "Weight", default: 70, min: 20, max: 300, suffix: "kg", step: "any" },
    { id: "exercise", label: "Exercise per day", default: 30, min: 0, max: 600, integer: true, suffix: "min", optional: true, emptyValue: 0 },
    { id: "climate", label: "Weather", type: "select", default: "mild", options: [{ value: "mild", label: "Mild or air-conditioned" }, { value: "hot", label: "Hot or humid" }] },
  ],
  run({ weight, exercise, climate }) {
    const r = calculateWaterIntake({ weightKg: weight, exerciseMinutes: exercise, hot: climate === "hot" });
    const l = (ml) => `${formatNumber(ml / 1000, { maxDecimals: 2 })} L`;
    return {
      rows: [
        { label: "Suggested daily water", value: l(r.totalMl), emphasis: true },
        { label: "In glasses of 250 ml", value: `about ${r.glasses} glasses` },
        { label: "Base need (35 ml per kg)", value: l(r.base) },
        { label: "Extra for exercise", value: l(r.exercise) },
        { label: "Extra for hot weather", value: l(r.climate) },
      ],
      notes: ["A general guideline. Food, tea and other drinks also contribute. Needs differ with health, pregnancy and medicines, so follow your doctor's advice."],
    };
  },
};
