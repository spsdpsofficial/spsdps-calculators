import { formatCompactINR, formatINR } from "@/lib/formatters";
import { calculateRetirement } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Retirement calculator",
  fields: [
    { id: "age", label: "Current age", default: 30, min: 18, max: 80, integer: true, suffix: "years" },
    { id: "retireAge", label: "Retirement age", default: 60, min: 19, max: 90, integer: true, suffix: "years" },
    { id: "life", label: "Plan until age", default: 85, min: 20, max: 110, integer: true, suffix: "years" },
    { id: "expense", label: "Current monthly expenses", default: 50000, min: 1, max: 1e8, prefix: "₹" },
    { id: "inflation", label: "Expected inflation", default: 6, min: 0, max: 20, suffix: "%", step: "any" },
    { id: "preReturn", label: "Return before retirement", default: 10, min: 0, max: 30, suffix: "%", step: "any" },
    { id: "postReturn", label: "Return after retirement", default: 7, min: 0, max: 30, suffix: "%", step: "any" },
    { id: "savings", label: "Current retirement savings", default: 500000, min: 0, max: 1e10, prefix: "₹", optional: true, emptyValue: 0 },
  ],
  run(v) {
    if (v.retireAge <= v.age) return { error: "Retirement age must be greater than your current age." };
    if (v.life <= v.retireAge) return { error: "'Plan until age' must be greater than the retirement age." };
    const r = calculateRetirement({
      age: v.age, retireAge: v.retireAge, lifeExpectancy: v.life, monthlyExpense: v.expense, inflation: v.inflation,
      preReturn: v.preReturn, postReturn: v.postReturn, savings: v.savings,
    });
    return {
      rows: [
        { label: "Retirement corpus needed", value: `${formatINR(r.corpus)} (${formatCompactINR(r.corpus)})`, emphasis: true },
        { label: "Monthly investment needed", value: formatINR(r.monthlySip) },
        { label: "Monthly expense at retirement", value: formatINR(r.expenseAtRetirement) },
        { label: "Current savings grown to retirement", value: formatINR(r.futureSavings) },
        { label: "Shortfall to be built", value: formatINR(r.gap) },
        { label: "Years to retirement / in retirement", value: `${r.yearsToRetire} / ${r.yearsInRetirement}` },
      ],
      notes: ["This is a planning estimate using constant assumed returns and inflation. Actual returns vary. It is not investment advice."],
    };
  },
};
