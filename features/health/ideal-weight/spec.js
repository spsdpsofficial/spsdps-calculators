import { formatNumber } from "@/lib/formatters";
import { calculateIdealWeight } from "./calculations/calculate";

const kg = (x) => `${formatNumber(x, { maxDecimals: 1 })} kg`;

export const spec = {
  ariaLabel: "Ideal weight calculator",
  fields: [
    { id: "sex", label: "Sex", type: "select", default: "male", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }] },
    { id: "height", label: "Height", default: 170, min: 140, max: 230, suffix: "cm", step: "any" },
  ],
  run({ sex, height }) {
    const r = calculateIdealWeight({ sex, heightCm: height });
    return {
      rows: [
        { label: "Average of the four formulas", value: kg(r.average), emphasis: true },
        ...r.formulas.map((f) => ({ label: `${f.name} formula`, value: kg(f.kg) })),
        { label: "Healthy BMI range (18.5–24.9)", value: `${formatNumber(r.bmiRange.min, { maxDecimals: 1 })} – ${kg(r.bmiRange.max)}` },
      ],
      notes: [
        ...(r.shortHeight ? ["These formulas were designed for people over 5 ft (152 cm), so results below that height are less reliable."] : []),
        "There is no single ideal weight. Use these figures as a rough guide, not a target.",
      ],
    };
  },
};
