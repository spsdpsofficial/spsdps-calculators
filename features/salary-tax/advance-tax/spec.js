import { formatDateLong, formatINR } from "@/lib/formatters";
import { calculateAdvanceTax } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Advance tax calculator",
  fields: [
    { id: "tax", label: "Estimated total tax for the year", prefix: "₹", min: 0, max: 1e11, default: 250000, hint: "Include cess and surcharge. Use our income tax calculator to estimate it." },
    { id: "tds", label: "TDS and TCS expected (optional)", prefix: "₹", min: 0, max: 1e11, default: 50000, optional: true, emptyValue: 0 },
    { id: "fy", label: "Financial year starting 1 April", type: "select", default: "2026", options: [2025, 2026, 2027, 2028].map((y) => ({ value: String(y), label: `${y}-${String((y + 1) % 100).padStart(2, "0")}` })) },
    {
      id: "kind",
      label: "Taxpayer type",
      type: "select",
      default: "regular",
      options: [
        { value: "regular", label: "Salaried, professional or business (regular)" },
        { value: "presumptive", label: "Presumptive taxation (44AD / 44ADA)" },
        { value: "senior", label: "Senior citizen (60+) with no business income" },
      ],
    },
  ],
  run({ tax, tds, fy, kind }) {
    const r = calculateAdvanceTax({ fyStartYear: Number(fy), taxLiability: tax, tdsTcs: tds, kind });
    if (!r.required) {
      return {
        rows: [{ label: "Net tax after TDS", value: formatINR(r.netTax), emphasis: true }, { label: "Advance tax required?", value: "No" }],
        notes: [r.reason === "senior" ? "Senior citizens with no income from business or profession are not required to pay advance tax." : "Advance tax applies when the tax payable after TDS is ₹10,000 or more. Pay any balance as self-assessment tax before filing your return."],
      };
    }
    return {
      rows: [{ label: "Net tax to pay as advance tax", value: formatINR(r.netTax), emphasis: true }, { label: "Advance tax required?", value: "Yes" }],
      table: {
        title: "Instalment schedule",
        caption: "Amount to pay by each due date",
        columns: ["Due date", "Cumulative share", "Pay now", "Paid so far"],
        rows: r.schedule.map((s) => [formatDateLong(s.dueDate), `${s.cumulativePercent}%`, formatINR(s.instalment), formatINR(s.cumulative)]),
      },
      notes: ["Late or short payment attracts interest under sections 234B and 234C, which is not calculated here. Payments made by 31 March count for the year."],
    };
  },
};
