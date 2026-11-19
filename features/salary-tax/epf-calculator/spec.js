import { formatCompactINR, formatINR, formatPercent } from "@/lib/formatters";
import { TAX_RATES } from "@/lib/tax/rates";
import { simulateEpf } from "./calculations/calculate";

export const spec = {
  ariaLabel: "EPF calculator",
  fields: [
    { id: "wage", label: "Monthly basic salary + DA", prefix: "₹", min: 1000, max: 100_000_000, default: "30000" },
    { id: "age", label: "Your current age", suffix: "yrs", min: 18, max: 69, integer: true, default: "30" },
    { id: "retire", label: "Retirement age", suffix: "yrs", min: 19, max: 70, integer: true, default: "58", hint: "EPF can be fully withdrawn on retirement at 58 or later." },
    { id: "balance", label: "Current EPF balance", prefix: "₹", min: 0, max: 10_000_000_000, optional: true, default: "0" },
    { id: "raise", label: "Expected yearly salary increase", suffix: "%", min: 0, max: 30, default: "5", slider: { min: 0, max: 20, step: 0.5 } },
    {
      id: "rate",
      label: "EPF interest rate (per year)",
      suffix: "%",
      min: 0,
      max: 15,
      default: String(TAX_RATES.epf.interestRate),
      hint: `${TAX_RATES.epf.interestRate}% was reported for FY ${TAX_RATES.epf.interestRateFinancialYear}. The rate is declared every year.`,
    },
    {
      id: "eps",
      label: "Is part of the employer share going to EPS (pension)?",
      type: "select",
      default: "yes",
      options: [
        { value: "yes", label: "Yes (EPS 8.33% on wages up to ₹15,000)" },
        { value: "no", label: "No (full 12% employer share goes to EPF)" },
      ],
    },
  ],
  run({ wage, age, retire, balance, raise, rate, eps }) {
    if (retire <= age) return { error: "Retirement age must be higher than your current age." };
    const r = simulateEpf({
      monthlyWage: wage,
      age,
      retirementAge: retire,
      openingBalance: balance,
      raisePercent: raise,
      interestPercent: rate,
      epsApplies: eps === "yes",
    });
    return {
      chart: {
        ariaLabel: `Corpus ${formatINR(r.balance)}: employee ${formatINR(r.employeeTotal)}, employer ${formatINR(r.employerTotal)}, interest ${formatINR(r.interestTotal)}, opening balance ${formatINR(r.openingBalance)}.`,
        segments: [
          { label: "Your contribution", value: r.employeeTotal + r.openingBalance, colorClass: "stroke-chart-a" },
          { label: "Employer", value: r.employerTotal, colorClass: "stroke-line" },
          { label: "Interest", value: r.interestTotal, colorClass: "stroke-chart-b" },
        ],
        centerTop: "Interest share",
        centerBottom: formatPercent((r.interestTotal / r.balance) * 100, { maxDecimals: 1 }),
      },
      rows: [
        { label: "EPF corpus at retirement", value: formatINR(r.balance), emphasis: true },
        { label: "In words", value: formatCompactINR(r.balance) },
        { label: "Your contributions (plus opening balance)", value: formatINR(r.employeeTotal + r.openingBalance), swatchClass: "bg-chart-a" },
        { label: "Employer contributions to EPF", value: formatINR(r.employerTotal), swatchClass: "bg-line" },
        { label: "Interest earned", value: formatINR(r.interestTotal), swatchClass: "bg-chart-b" },
      ],
      table: {
        title: "Year-wise balance",
        caption: "EPF balance at the end of each year",
        columns: ["Year", "Age", "Balance"],
        rows: r.rows.map((row) => [row.year, row.age, formatINR(row.balance)]),
      },
      notes: ["Assumes a constant interest rate. The real rate is declared yearly. Interest above the tax-free contribution limit may be taxable."],
    };
  },
};
