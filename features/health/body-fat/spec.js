import { formatNumber } from "@/lib/formatters";
import { calculateBodyFat } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Body fat calculator",
  fields: [
    { id: "sex", label: "Sex", type: "select", default: "male", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] },
    { id: "weight", label: "Weight", default: 70, min: 25, max: 300, suffix: "kg", step: "any" },
    { id: "height", label: "Height", default: 170, min: 100, max: 250, suffix: "cm", step: "any" },
    { id: "neck", label: "Neck circumference", default: 38, min: 20, max: 80, suffix: "cm", step: "any", hint: "Just below the larynx." },
    { id: "waist", label: "Waist circumference", default: 85, min: 40, max: 200, suffix: "cm", step: "any", hint: "Men: at the navel. Women: at the narrowest point." },
    { id: "hip", label: "Hip circumference", default: 95, min: 50, max: 200, suffix: "cm", step: "any", showIf: (v) => v.sex === "female", hint: "At the widest point." },
  ],
  run({ sex, weight, height, neck, waist, hip }) {
    const r = calculateBodyFat({ sex, weightKg: weight, heightCm: height, neckCm: neck, waistCm: waist, hipCm: hip });
    if (r.error) return { error: r.error };
    const kg = (x) => `${formatNumber(x, { maxDecimals: 1 })} kg`;
    return {
      rows: [
        { label: "Estimated body fat", value: `${formatNumber(r.percent, { maxDecimals: 1 })}%`, emphasis: true },
        { label: "Category (ACE)", value: r.category },
        { label: "Fat mass", value: kg(r.fatMass) },
        { label: "Lean mass", value: kg(r.leanMass) },
      ],
      notes: ["A tape-measure estimate, usually within a few percentage points of lab methods. It is not a medical measurement."],
    };
  },
};
