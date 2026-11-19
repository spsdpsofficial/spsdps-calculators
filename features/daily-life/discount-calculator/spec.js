import { formatINR, formatPercent } from "@/lib/formatters";
import { calculateDiscount, originalFromDiscounted } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Discount calculator",
  fields: [
    {
      id: "mode",
      label: "What do you know?",
      type: "select",
      default: "price",
      options: [
        { value: "price", label: "Original price and discount" },
        { value: "reverse", label: "Final price and discount (find original)" },
      ],
    },
    { id: "price", label: "Original price", default: 2999, min: 0, max: 1e9, prefix: "₹", showIf: (v) => v.mode === "price" },
    { id: "final", label: "Price you pay", default: 1620, min: 0, max: 1e9, prefix: "₹", showIf: (v) => v.mode === "reverse" },
    { id: "pct", label: "Discount", default: 40, min: 0, max: 100, suffix: "%" },
    { id: "extra", label: "Extra discount (optional)", default: 10, min: 0, max: 100, suffix: "%", optional: true, emptyValue: 0, showIf: (v) => v.mode === "price", hint: "Applied on the already reduced price, such as a coupon or bank offer." },
  ],
  run({ mode, price, final, pct, extra }) {
    if (mode === "reverse") {
      const r = originalFromDiscounted({ finalPrice: final, discountPercent: pct });
      if (r.error) return { error: r.error };
      return {
        rows: [
          { label: "Original price", value: formatINR(r.originalPrice, { decimals: 2 }), emphasis: true },
          { label: "You save", value: formatINR(r.originalPrice - final, { decimals: 2 }) },
        ],
      };
    }
    const r = calculateDiscount({ price, discountPercent: pct, extraPercent: extra });
    return {
      rows: [
        { label: "Final price", value: formatINR(r.finalPrice, { decimals: 2 }), emphasis: true },
        { label: "You save", value: formatINR(r.saved, { decimals: 2 }) },
        { label: "Price after first discount", value: formatINR(r.afterFirst, { decimals: 2 }) },
        { label: "Effective total discount", value: formatPercent(r.effectivePercent) },
      ],
      notes: ["GST or delivery charges are not included. Add them separately if they apply."],
    };
  },
};
