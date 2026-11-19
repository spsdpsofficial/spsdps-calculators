import { formatINR } from "@/lib/formatters";
import { gstRateField, resolveGstRate } from "@/lib/finance/gst";
import { calculateGst } from "./calculations/calculate";

export const spec = {
  ariaLabel: "GST calculator",
  fields: [
    {
      id: "mode",
      label: "What is the amount?",
      type: "select",
      default: "add",
      options: [
        { value: "add", label: "Price excluding GST (add GST)" },
        { value: "remove", label: "Price including GST (remove GST)" },
      ],
    },
    { id: "amount", label: "Amount", prefix: "₹", min: 0.01, max: 100_000_000_000, default: "10000" },
    ...gstRateField("18"),
  ],
  run(values) {
    const rate = resolveGstRate(values);
    const r = calculateGst({ amount: values.amount, ratePercent: rate, mode: values.mode });
    return {
      rows: [
        { label: "Price before GST", value: formatINR(r.net, { decimals: 2 }) },
        { label: `GST at ${rate}%`, value: formatINR(r.gst, { decimals: 2 }), emphasis: true },
        { label: "Price including GST", value: formatINR(r.total, { decimals: 2 }) },
        { label: "CGST (within a state)", value: formatINR(r.cgst, { decimals: 2 }) },
        { label: "SGST / UTGST (within a state)", value: formatINR(r.sgst, { decimals: 2 }) },
        { label: "IGST (between states)", value: formatINR(r.gst, { decimals: 2 }) },
      ],
      notes: ["For a sale within one state GST is split equally into CGST and SGST. For a sale between states the full GST is charged as IGST."],
    };
  },
};
