import { formatCompactINR, formatINR, formatPercent } from "@/lib/formatters";
import { TAX_RATES } from "@/lib/tax/rates";
import { compareRegimes } from "./calculations/calculate";

const regimeRows = (label, r, gross) => [
  { label: `${label}: taxable income`, value: formatINR(r.taxableIncome) },
  { label: `${label}: income tax (with cess)`, value: formatINR(r.total), emphasis: true },
  { label: `${label}: effective rate`, value: formatPercent(gross > 0 ? (r.total / gross) * 100 : 0) },
];

export const spec = {
  ariaLabel: "Income tax calculator",
  fields: [
    {
      id: "income",
      label: "Gross annual income",
      prefix: "₹",
      min: 0,
      max: 10_000_000_000,
      default: "1500000",
      slider: { min: 300_000, max: 10_000_000, step: 50_000 },
      hint: (raw) => formatCompactINR(Number(raw.income)),
    },
    {
      id: "salaried",
      label: "Income type",
      type: "select",
      default: "yes",
      options: [
        { value: "yes", label: "Salaried (standard deduction applies)" },
        { value: "no", label: "Not salaried" },
      ],
    },
    {
      id: "age",
      label: "Age (affects the old regime only)",
      type: "select",
      default: "below60",
      options: [
        { value: "below60", label: "Below 60 years" },
        { value: "senior", label: "60 to 79 years" },
        { value: "superSenior", label: "80 years or more" },
      ],
    },
    {
      id: "deductions",
      label: "Old-regime deductions",
      prefix: "₹",
      min: 0,
      max: 10_000_000_000,
      optional: true,
      default: "200000",
      hint: "Total of 80C, 80D, NPS, home-loan interest, HRA exemption etc. Not allowed in the new regime.",
    },
  ],
  run({ income, salaried, age, deductions }) {
    const r = compareRegimes({ grossIncome: income, salaried: salaried === "yes", oldRegimeDeductions: deductions, ageBand: age });
    const better = r.betterRegime === "new" ? "New regime" : "Old regime";
    return {
      rows: [
        { label: "Cheaper for you", value: r.saving < 1 ? "Same tax in both" : `${better}, saving ${formatINR(r.saving)}`, emphasis: true },
        ...regimeRows("New regime", r.newRegime, income),
        ...regimeRows("Old regime", r.oldRegime, income),
        { label: "Monthly tax in the cheaper regime", value: formatINR(Math.min(r.newRegime.total, r.oldRegime.total) / 12) },
      ],
      notes: [
        `Tax rules for FY ${TAX_RATES.financialYear}. Resident individual, normal-rate income. Capital gains and special-rate income are not included.`,
      ],
    };
  },
};
