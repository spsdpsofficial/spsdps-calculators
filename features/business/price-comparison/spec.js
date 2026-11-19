import { formatINR, formatNumber, formatPercent } from "@/lib/formatters";
import { comparePrices } from "./calculations/calculate";

const product = (letter, price, qty, optional = false) => [
  { id: `price${letter}`, label: `Product ${letter}: price${optional ? " (optional)" : ""}`, prefix: "₹", min: 0, max: 1e9, default: price, step: "any", ...(optional && { optional: true, emptyValue: 0 }) },
  { id: `qty${letter}`, label: `Product ${letter}: quantity${optional ? " (optional)" : ""}`, min: 0, max: 1e9, default: qty, step: "any", ...(optional && { optional: true, emptyValue: 0 }) },
];

export const spec = {
  ariaLabel: "Price comparison calculator",
  fields: [
    ...product("A", 250, 500),
    ...product("B", 460, 1000),
    ...product("C", "", "", true),
  ],
  run(v) {
    const options = ["A", "B", "C"].map((l) => ({ name: `Product ${l}`, price: v[`price${l}`], quantity: v[`qty${l}`] }));
    const r = comparePrices(options);
    if (r.error) return { error: r.error };
    const rows = r.ranked.map((o, i) => ({
      label: `${o.name}${i === 0 && !r.tie ? " (best value)" : ""}`,
      value: `${formatINR(o.unitPrice, { decimals: 4 })} per unit${i > 0 ? ` (${formatPercent(o.extraPercent, { maxDecimals: 1 })} more)` : ""}`,
      emphasis: i === 0 && !r.tie,
    }));
    rows.push({ label: "Per 100 units, cheapest", value: formatINR(r.best.unitPrice * 100, { decimals: 2 }) });
    if (!r.tie) rows.push({ label: "Saving versus the dearest", value: formatPercent(r.savingPercent, { maxDecimals: 1 }) });
    return {
      rows,
      notes: [`Use the same unit for every product (for example grams or pieces). ${r.tie ? "All products cost the same per unit." : `${r.best.name} costs ${formatNumber(r.best.unitPrice, { maxDecimals: 4 })} rupees per unit.`}`],
    };
  },
};
