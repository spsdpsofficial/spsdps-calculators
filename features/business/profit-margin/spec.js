import { formatINR, formatPercent } from "@/lib/formatters";
import { pricingRows } from "@/lib/business/pricing";
import { calculateProfitMargin } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Profit margin calculator",
  fields: [
    {
      id: "mode",
      label: "What do you want to find?",
      type: "select",
      default: "margin",
      options: [
        { value: "margin", label: "Margin, from cost and selling price" },
        { value: "price", label: "Selling price, from cost and target margin" },
        { value: "cost", label: "Cost, from selling price and target margin" },
      ],
    },
    { id: "cost", label: "Cost price", prefix: "₹", min: 0, max: 1e12, default: 800, step: "any", showIf: (v) => v.mode !== "cost" },
    { id: "price", label: "Selling price", prefix: "₹", min: 0, max: 1e12, default: 1000, step: "any", showIf: (v) => v.mode !== "price" },
    { id: "margin", label: "Target profit margin", suffix: "%", min: 0, max: 99.99, default: 20, step: "any", showIf: (v) => v.mode !== "margin" },
  ],
  run({ mode, cost, price, margin }) {
    const r = calculateProfitMargin({ mode, cost, price, targetMargin: margin });
    if (r.error) return { error: r.error };
    const money = (x) => formatINR(x, { decimals: 2 });
    const rows = pricingRows(r, money, (x) => formatPercent(x));
    // Lead with the margin when that is what the user asked for.
    const lead = mode === "margin" ? 3 : mode === "price" ? 0 : 1;
    rows.forEach((row, i) => { row.emphasis = i === lead; });
    return {
      rows,
      notes: [
        r.profit < 0 ? "This is a loss: the selling price is below cost." : "Margin is profit as a share of the selling price. Markup is profit as a share of cost, so it is always the larger figure.",
        "Taxes, discounts and overheads are not deducted. Enter prices after any such adjustments.",
      ],
    };
  },
};
