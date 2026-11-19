import { formatNumber } from "@/lib/formatters";
import { calculateBmi } from "./calculations/calculate";

export const spec = {
  ariaLabel: "BMI calculator",
  fields: [
    { id: "weight", label: "Weight", default: 70, min: 10, max: 500, suffix: "kg", step: "any" },
    { id: "height", label: "Height", default: 170, min: 50, max: 260, suffix: "cm", step: "any" },
  ],
  run({ weight, height }) {
    const r = calculateBmi({ weightKg: weight, heightCm: height });
    const kg = (x) => formatNumber(x, { maxDecimals: 1 });
    return {
      rows: [
        { label: "Your BMI", value: formatNumber(r.bmi, { maxDecimals: 1 }), emphasis: true },
        { label: "WHO category", value: r.who },
        { label: "Asian-Indian category", value: r.asian },
        { label: "Healthy weight for your height (WHO, BMI 18.5–24.9)", value: `${kg(r.whoRange.min)} – ${kg(r.whoRange.max)} kg` },
        { label: "Healthy weight for your height (Asian-Indian, BMI 18.5–22.9)", value: `${kg(r.asianRange.min)} – ${kg(r.asianRange.max)} kg` },
      ],
      notes: ["BMI is a screening number, not a diagnosis. It does not separate muscle from fat. Speak to a doctor about your health."],
    };
  },
};
