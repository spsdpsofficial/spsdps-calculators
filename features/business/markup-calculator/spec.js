import { formatINR, formatPercent } from "@/lib/formatters";
import { pricingRows } from "@/lib/business/pricing";
import { calculateMarkup } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Markup calculator",
  fields: [
    {
      id: "mode",
      label: "What do you want to find?",
      type: "select",
      default: "price",
      options: [
        { value: "price", label: "Selling price, from cost and markup" },
        { value: "markup", label: "Markup, from cost and selling price" },
        { value: "cost", label: "Cost, from selling price and markup" },
      ],
    },
    { id: "cost", label: "Cost price", prefix: "₹", min: 0, max: 1e12, default: 800, step: "any", showIf: (v) => v.mode !== "cost" },
    { id: "price", label: "Selling price", prefix: "₹", min: 0, max: 1e12, default: 1000, step: "any", showIf: (v) => v.mode !== "price" },
    { id: "markup", label: "Markup on cost", suffix: "%", min: 0, max: 10000, default: 25, step: "any", showIf: (v) => v.mode !== "markup" },
  ],
  run({ mode, cost, price, markup }) {
    const r = calculateMarkup({ mode, cost, price, markup });
    const money = (x) => formatINR(x, { decimals: 2 });
    const rows = pricingRows(r, money, (x) => formatPercent(x));
    const lead = mode === "price" ? 0 : mode === "markup" ? 4 : 1;
    rows.forEach((row, i) => { row.emphasis = i === lead; });
    return { rows, notes: ["Markup is added on top of cost. The same price expressed as a margin is always a smaller percentage."] };
  },
};
