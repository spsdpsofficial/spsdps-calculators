/** Macro split from a calorie target. Energy: carbohydrate and protein 4 kcal/g, fat 9 kcal/g. */
export const KCAL_PER_GRAM = { carbs: 4, protein: 4, fat: 9 };
/** Acceptable macronutrient distribution ranges for adults (percent of calories). */
export const AMDR = { carbs: [45, 65], protein: [10, 35], fat: [20, 35] };

export function calculateMacros({ calories, carbsPercent, proteinPercent, fatPercent }) {
  const total = carbsPercent + proteinPercent + fatPercent;
  if (Math.abs(total - 100) > 0.01) return { error: `The percentages must add up to 100. They currently add up to ${Math.round(total * 100) / 100}.` };
  const split = { carbs: carbsPercent, protein: proteinPercent, fat: fatPercent };
  const rows = Object.entries(split).map(([key, percent]) => {
    const kcal = (calories * percent) / 100;
    return { key, percent, kcal, grams: kcal / KCAL_PER_GRAM[key], outsideRange: percent < AMDR[key][0] || percent > AMDR[key][1] };
  });
  return { rows };
}

export const PRESETS = [
  { value: "balanced", label: "Balanced (50 / 20 / 30)", carbs: 50, protein: 20, fat: 30 },
  { value: "highProtein", label: "High protein (40 / 30 / 30)", carbs: 40, protein: 30, fat: 30 },
  { value: "lowCarb", label: "Lower carb (30 / 35 / 35)", carbs: 30, protein: 35, fat: 35 },
  { value: "custom", label: "Custom" },
];
