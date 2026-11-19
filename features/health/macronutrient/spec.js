import { formatNumber } from "@/lib/formatters";
import { PRESETS, calculateMacros } from "./calculations/calculate";

const LABELS = { carbs: "Carbohydrates", protein: "Protein", fat: "Fat" };
const SEGMENT_COLOURS = {
  carbs: { stroke: "stroke-chart-a", swatch: "bg-chart-a" },
  protein: { stroke: "stroke-chart-b", swatch: "bg-chart-b" },
  fat: { stroke: "stroke-chart-c", swatch: "bg-chart-c" },
};
const isCustom = (v) => v.preset === "custom";

export const spec = {
  ariaLabel: "Macronutrient calculator",
  fields: [
    { id: "calories", label: "Daily calories", default: 2000, min: 800, max: 10000, suffix: "kcal" },
    { id: "preset", label: "Split (carbs / protein / fat)", type: "select", default: "balanced", options: PRESETS.map(({ value, label }) => ({ value, label })) },
    { id: "carbs", label: "Carbohydrates", default: 50, min: 0, max: 100, suffix: "%", step: "any", showIf: isCustom },
    { id: "protein", label: "Protein", default: 20, min: 0, max: 100, suffix: "%", step: "any", showIf: isCustom },
    { id: "fat", label: "Fat", default: 30, min: 0, max: 100, suffix: "%", step: "any", showIf: isCustom },
  ],
  run({ calories, preset, carbs, protein, fat }) {
    const p = PRESETS.find((x) => x.value === preset);
    const split = preset === "custom" ? { carbs, protein, fat } : p;
    const r = calculateMacros({ calories, carbsPercent: split.carbs, proteinPercent: split.protein, fatPercent: split.fat });
    if (r.error) return { error: r.error };
    const outside = r.rows.filter((row) => row.outsideRange).map((row) => LABELS[row.key].toLowerCase());
    return {
      rows: r.rows.map((row) => ({
        label: `${LABELS[row.key]} (${formatNumber(row.percent)}%)`,
        value: `${formatNumber(row.grams, { maxDecimals: 0 })} g`,
        swatchClass: SEGMENT_COLOURS[row.key].swatch,
      })),
      chart: {
        segments: r.rows.map((row) => ({ label: LABELS[row.key], value: row.kcal, colorClass: SEGMENT_COLOURS[row.key].stroke })),
        centerTop: formatNumber(calories),
        centerBottom: "kcal / day",
        ariaLabel: "Share of daily calories from carbohydrates, protein and fat",
      },
      notes: [
        ...(outside.length ? [`Your ${outside.join(" and ")} share is outside the commonly recommended range for adults (carbs 45–65%, protein 10–35%, fat 20–35%).`] : []),
        "Grams use 4 kcal per gram for carbohydrates and protein and 9 kcal per gram for fat. This is general information, not medical advice.",
      ],
    };
  },
};
