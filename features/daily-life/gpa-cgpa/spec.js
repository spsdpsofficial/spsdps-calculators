import { formatNumber } from "@/lib/formatters";
import { averageGrades, cgpaToPercent, parseGrades, percentToCgpa } from "./calculations/calculate";

export const spec = {
  ariaLabel: "CGPA and percentage calculator",
  fields: [
    {
      id: "mode",
      label: "What do you want to find?",
      type: "select",
      default: "toPercent",
      options: [
        { value: "toPercent", label: "Percentage from CGPA" },
        { value: "toCgpa", label: "CGPA from percentage" },
        { value: "average", label: "CGPA from semester SGPAs" },
      ],
    },
    { id: "cgpa", label: "CGPA (out of 10)", min: 0, max: 10, default: 8.4, step: "any", showIf: (v) => v.mode === "toPercent" },
    { id: "percent", label: "Percentage", suffix: "%", min: 0, max: 100, default: 79.8, step: "any", showIf: (v) => v.mode === "toCgpa" },
    { id: "sgpas", label: "SGPA of each semester", type: "text", default: "8.2, 7.9, 8.5", hint: "Separate with commas or spaces. All semesters are treated as equal credits.", showIf: (v) => v.mode === "average" },
    { id: "factor", label: "Conversion factor", min: 5, max: 12, default: 9.5, step: "any", hint: "9.5 is the CBSE and common university factor. Use your university's own factor if it differs.", showIf: (v) => v.mode !== "average" },
  ],
  run({ mode, cgpa, percent, sgpas, factor }) {
    if (mode === "toPercent") {
      return { rows: [{ label: "Equivalent percentage", value: `${formatNumber(cgpaToPercent(cgpa, factor), { maxDecimals: 2 })}%`, emphasis: true }, { label: "Formula used", value: `${formatNumber(cgpa)} × ${formatNumber(factor)}` }], notes: ["Your university or the employer may use a different conversion. Use their official rule where it matters."] };
    }
    if (mode === "toCgpa") {
      return { rows: [{ label: "Equivalent CGPA", value: formatNumber(percentToCgpa(percent, factor), { maxDecimals: 2 }), emphasis: true }, { label: "Formula used", value: `${formatNumber(percent)} ÷ ${formatNumber(factor)}` }] };
    }
    const parsed = parseGrades(sgpas);
    if (parsed.error) return { error: parsed.error };
    const avg = averageGrades(parsed.values);
    return {
      rows: [
        { label: "CGPA (average of SGPAs)", value: formatNumber(avg, { maxDecimals: 2 }), emphasis: true },
        { label: "Semesters counted", value: String(parsed.values.length) },
        { label: "Equivalent percentage at 9.5", value: `${formatNumber(cgpaToPercent(avg), { maxDecimals: 2 })}%` },
      ],
      notes: ["If your semesters carry different credits, your university's CGPA will be a credit-weighted average and may differ."],
    };
  },
};
