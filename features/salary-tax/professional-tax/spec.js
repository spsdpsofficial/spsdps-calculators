import { formatINR } from "@/lib/formatters";
import { PT_STATE_OPTIONS, PT_VERIFIED_ON } from "@/lib/tax/professionalTax";
import { calculateProfessionalTax } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Professional tax calculator",
  fields: [
    { id: "state", label: "State", type: "select", default: "maharashtra", options: PT_STATE_OPTIONS },
    { id: "gross", label: "Monthly gross salary", prefix: "₹", min: 0, max: 100_000_000, default: "50000", hint: "Salary before deductions, as used for professional tax." },
  ],
  run({ state, gross }) {
    const r = calculateProfessionalTax({ stateId: state, monthlyGross: gross });
    if (r.error) return { error: r.error };
    const rows = [
      { label: `Professional tax per ${r.periodLabel}`, value: formatINR(r.perPeriod), emphasis: true },
      { label: "Average per month", value: formatINR(r.monthly, { decimals: 2 }) },
      { label: "Total for the year", value: formatINR(r.yearly) },
    ];
    if (r.februaryAmount) rows.splice(1, 0, { label: "Amount deducted in February", value: formatINR(r.februaryAmount) });
    return {
      rows,
      notes: [
        r.state.note,
        `Slabs reflect the state rules as checked on ${PT_VERIFIED_ON}. Confirm with your state's official notification or your employer. Not every state levies professional tax.`,
      ].filter(Boolean),
    };
  },
};
