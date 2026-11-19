import { formatINR } from "@/lib/formatters";
import { TAX_RATES } from "@/lib/tax/rates";
import { calculateSalary } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Salary calculator",
  fields: [
    { id: "basic", label: "Monthly basic salary", prefix: "₹", min: 1, max: 100_000_000, default: "60000" },
    { id: "hra", label: "Monthly HRA", prefix: "₹", min: 0, max: 100_000_000, optional: true, default: "30000" },
    { id: "other", label: "Other monthly allowances", prefix: "₹", min: 0, max: 100_000_000, optional: true, default: "40000", hint: "Special allowance, conveyance, bonus paid monthly, etc." },
    {
      id: "pfBase",
      label: "Provident fund (PF) calculated on",
      type: "select",
      default: "actual",
      options: [
        { value: "actual", label: "Full basic salary" },
        { value: "ceiling", label: "Wage ceiling of ₹15,000" },
        { value: "none", label: "No PF deduction" },
      ],
    },
    { id: "pt", label: "Professional tax per month", prefix: "₹", min: 0, max: 1000, optional: true, default: "200", hint: "Depends on your state. Use the Professional Tax Calculator." },
    {
      id: "tds",
      label: "Estimate income tax (TDS)?",
      type: "select",
      default: "yes",
      options: [
        { value: "yes", label: "Yes, new tax regime" },
        { value: "no", label: "No, ignore income tax" },
      ],
    },
  ],
  run({ basic, hra, other, pfBase, pt, tds }) {
    const r = calculateSalary({
      basic,
      hra,
      other,
      pfOnCeiling: pfBase === "ceiling",
      professionalTax: pt,
      estimateTds: tds === "yes",
    });
    const pf = pfBase === "none" ? 0 : r.pf;
    const inHand = r.gross - pf - r.professionalTax - r.tds;
    return {
      rows: [
        { label: "Monthly in-hand salary", value: formatINR(inHand), emphasis: true },
        { label: "Gross monthly salary", value: formatINR(r.gross) },
        { label: "Employee PF (12%)", value: `− ${formatINR(pf)}` },
        { label: "Professional tax", value: `− ${formatINR(r.professionalTax)}` },
        { label: "Income tax (TDS estimate)", value: `− ${formatINR(r.tds)}` },
        { label: "Annual in-hand salary", value: formatINR(inHand * 12) },
      ],
      notes: [`TDS is estimated under the new regime for FY ${TAX_RATES.financialYear} (standard deduction ₹75,000). Your employer's figure depends on your declarations.`],
    };
  },
};
