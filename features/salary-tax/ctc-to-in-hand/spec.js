import { formatCompactINR, formatINR } from "@/lib/formatters";
import { TAX_RATES } from "@/lib/tax/rates";
import { calculateCtcBreakup } from "./calculations/calculate";

export const spec = {
  ariaLabel: "CTC to in-hand salary calculator",
  fields: [
    {
      id: "ctc",
      label: "Annual CTC",
      prefix: "₹",
      min: 100_000,
      max: 1_000_000_000,
      default: "1500000",
      slider: { min: 300_000, max: 10_000_000, step: 50_000 },
      hint: (raw) => formatCompactINR(Number(raw.ctc)),
    },
    { id: "basic", label: "Basic salary as % of CTC", suffix: "%", min: 10, max: 80, default: "40" },
    { id: "hra", label: "HRA as % of basic", suffix: "%", min: 0, max: 60, default: "50" },
    {
      id: "pfBase",
      label: "PF calculated on",
      type: "select",
      default: "actual",
      options: [
        { value: "actual", label: "Full basic salary" },
        { value: "ceiling", label: "Wage ceiling of ₹15,000" },
      ],
    },
    {
      id: "gratuity",
      label: "Is gratuity part of your CTC?",
      type: "select",
      default: "yes",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    { id: "pt", label: "Professional tax per month", prefix: "₹", min: 0, max: 1000, optional: true, default: "200" },
  ],
  run({ ctc, basic, hra, pfBase, gratuity, pt }) {
    const r = calculateCtcBreakup({
      ctc,
      basicPercent: basic,
      hraPercentOfBasic: hra,
      pfOnCeiling: pfBase === "ceiling",
      includeGratuity: gratuity === "yes",
      professionalTaxYearly: pt * 12,
    });
    if (r.error) return { error: r.error };
    const m = (value) => formatINR(value / 12);
    return {
      rows: [
        { label: "Monthly in-hand salary (estimate)", value: formatINR(r.inHandMonthly), emphasis: true },
        { label: "Monthly basic", value: m(r.basic) },
        { label: "Monthly HRA", value: m(r.hra) },
        { label: "Monthly special allowance", value: m(r.special) },
        { label: "Monthly gross salary", value: m(r.gross) },
        { label: "Employee PF (monthly)", value: `− ${m(r.employeePf)}` },
        { label: "Income tax (monthly estimate)", value: `− ${m(r.tax)}` },
        { label: "Employer PF in CTC (yearly)", value: formatINR(r.employerPf) },
        { label: "Gratuity in CTC (yearly)", value: formatINR(r.gratuity) },
      ],
      notes: [`Income tax is estimated under the new regime for FY ${TAX_RATES.financialYear}. Variable pay, insurance and other benefits in your CTC are not separated here.`],
    };
  },
};
