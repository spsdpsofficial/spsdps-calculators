import { formatINR } from "@/lib/formatters";
import { splitBill } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Tip and bill split calculator",
  fields: [
    { id: "bill", label: "Bill amount", prefix: "₹", min: 1, max: 1e8, default: 2450, step: "any" },
    { id: "tip", label: "Tip", suffix: "%", min: 0, max: 100, default: 10, step: "any", slider: { min: 0, max: 30, step: 1 } },
    { id: "people", label: "Number of people", min: 1, max: 100, integer: true, default: 3 },
    { id: "round", label: "Round each share up to a whole rupee?", type: "select", default: "no", options: [{ value: "no", label: "No, exact share" }, { value: "yes", label: "Yes, round up" }] },
  ],
  run({ bill, tip, people, round }) {
    const r = splitBill({ bill, tipPercent: tip, people, roundUp: round === "yes" });
    const rows = [
      { label: "Each person pays", value: formatINR(r.share, { decimals: 2 }), emphasis: true },
      { label: "Tip", value: formatINR(r.tip, { decimals: 2 }) },
      { label: "Total with tip", value: formatINR(r.total, { decimals: 2 }) },
    ];
    if (round === "yes") rows.push({ label: "Extra from rounding up", value: formatINR(r.extra, { decimals: 2 }) });
    return { rows, notes: ["Check whether a service charge is already on the bill before adding a tip. A service charge is not the same as a tip."] };
  },
};
