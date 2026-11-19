import { formatNumber } from "@/lib/formatters";
import { ACTIVITY_LEVELS, GOALS, calculateCalories } from "./calculations/calculate";

const kcal = (x) => `${formatNumber(Math.round(x))} kcal`;

export const spec = {
  ariaLabel: "Calorie calculator",
  fields: [
    { id: "sex", label: "Sex", type: "select", default: "male", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] },
    { id: "age", label: "Age", default: 30, min: 15, max: 100, integer: true, suffix: "years" },
    { id: "weight", label: "Weight", default: 70, min: 25, max: 300, suffix: "kg", step: "any" },
    { id: "height", label: "Height", default: 170, min: 100, max: 250, suffix: "cm", step: "any" },
    { id: "activity", label: "Activity level", type: "select", default: "1.55", options: ACTIVITY_LEVELS },
    { id: "goal", label: "Goal", type: "select", default: "0", options: GOALS },
  ],
  run({ sex, age, weight, height, activity, goal }) {
    const r = calculateCalories({ sex, weightKg: weight, heightCm: height, age, activity: Number(activity), adjustment: Number(goal) });
    const notes = ["An estimate only. Individual needs vary. Consult a doctor or dietitian before a big change in diet."];
    if (r.belowFloor) notes.unshift("This target is under 1,200 kcal a day, which is generally too low without medical supervision.");
    else if (r.belowBmr) notes.unshift("This target is below your basal metabolic rate. Aim for a gentler weekly change.");
    return {
      rows: [
        { label: "Daily calories for your goal", value: kcal(r.target), emphasis: true },
        { label: "Maintenance calories (TDEE)", value: kcal(r.maintenance) },
        { label: "Basal metabolic rate (BMR)", value: kcal(r.bmr) },
      ],
      notes,
    };
  },
};
