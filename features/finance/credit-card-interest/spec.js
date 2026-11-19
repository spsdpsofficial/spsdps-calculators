import { formatINR, formatPercent } from "@/lib/formatters";
import { cardInterest } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Credit card interest calculator",
  fields: [
    { id: "balance", label: "Unpaid balance", prefix: "₹", min: 1, max: 100_000_000, default: "50000", slider: { min: 1000, max: 1_000_000, step: 1000 } },
    { id: "rate", label: "Interest rate (per month)", suffix: "%", min: 0.1, max: 10, default: "3.5", slider: { min: 1, max: 5, step: 0.05 }, hint: "Check your card statement for your monthly finance charge." },
    { id: "days", label: "Days the balance is unpaid", suffix: "days", min: 1, max: 3650, integer: true, default: "30" },
    {
      id: "gst",
      label: "Add GST on the interest?",
      type: "select",
      default: "18",
      options: [
        { value: "18", label: "Yes, 18% GST" },
        { value: "0", label: "No" },
      ],
    },
  ],
  run({ balance, rate, days, gst }) {
    const r = cardInterest({ balance, monthlyRatePercent: rate, days, gstPercent: Number(gst) });
    return {
      rows: [
        { label: "Interest charged", value: formatINR(r.interest, { decimals: 2 }), emphasis: true },
        ...(Number(gst) > 0 ? [{ label: `GST at ${gst}%`, value: formatINR(r.gst, { decimals: 2 }) }] : []),
        { label: "Total cost of carrying the balance", value: formatINR(r.total, { decimals: 2 }) },
        { label: "Equivalent yearly rate", value: formatPercent(r.annualRatePercent) },
        { label: "Interest per day", value: formatINR(r.perDay, { decimals: 2 }) },
      ],
      notes: ["Late fees, cash-advance fees and other charges are not included. Your statement is the final figure."],
    };
  },
};
