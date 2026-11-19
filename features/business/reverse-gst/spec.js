import { formatINR, formatPercent } from "@/lib/formatters";
import { gstRateField, resolveGstRate } from "@/lib/finance/gst";
import { calculateReverseGst } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Reverse GST calculator",
  fields: [
    { id: "amount", label: "Price including GST (MRP or invoice total)", prefix: "₹", min: 0.01, max: 1e11, default: 11800, step: "any" },
    ...gstRateField("18"),
  ],
  run(values) {
    const rate = resolveGstRate(values);
    const r = calculateReverseGst({ inclusiveAmount: values.amount, ratePercent: rate });
    const money = (x) => formatINR(x, { decimals: 2 });
    return {
      rows: [
        { label: "Price before GST", value: money(r.net), emphasis: true },
        { label: `GST included (${rate}%)`, value: money(r.gst) },
        { label: "GST as a share of the price you pay", value: formatPercent(r.gstShareOfPrice) },
        { label: "CGST (within a state)", value: money(r.cgst) },
        { label: "SGST / UTGST (within a state)", value: money(r.sgst) },
        { label: "IGST (between states)", value: money(r.gst) },
      ],
      notes: ["GST is not simply the rate taken off the total. Divide by (1 + rate) to remove it, which is why 18% GST is only about 15.25% of a GST-inclusive price."],
    };
  },
};
