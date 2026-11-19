import { formatNumber } from "@/lib/formatters";
import { addOrSubtractPercent, percentChange, percentOf, whatPercent } from "./calculations/calculate";

const MODES = [
  { value: "of", label: "What is X% of Y?" },
  { value: "what", label: "X is what % of Y?" },
  { value: "change", label: "% change from X to Y" },
  { value: "adjust", label: "Add or subtract X% from Y" },
];

export const spec = {
  ariaLabel: "Percentage calculator",
  fields: [
    { id: "mode", label: "What do you want to find?", type: "select", default: "of", options: MODES },
    { id: "a", label: "X (first number)", default: 15, min: -1e12, max: 1e12, step: "any", showIf: (v) => v.mode !== "adjust" },
    { id: "b", label: "Y (second number)", default: 2400, min: -1e12, max: 1e12, step: "any", showIf: (v) => v.mode !== "adjust" },
    { id: "base", label: "Amount (Y)", default: 2400, min: -1e12, max: 1e12, step: "any", showIf: (v) => v.mode === "adjust" },
    { id: "pct", label: "Percentage (X%)", default: 15, min: -1e6, max: 1e6, step: "any", showIf: (v) => v.mode === "adjust" },
    {
      id: "direction",
      label: "Operation",
      type: "select",
      default: "add",
      options: [
        { value: "add", label: "Add the percentage" },
        { value: "subtract", label: "Subtract the percentage" },
      ],
      showIf: (v) => v.mode === "adjust",
    },
  ],
  run({ mode, a, b, base, pct, direction }) {
    const n = (x) => formatNumber(x, { maxDecimals: 4 });
    if (mode === "of") {
      const r = percentOf(a, b);
      return { rows: [{ label: `${n(a)}% of ${n(b)}`, value: n(r.value), emphasis: true }] };
    }
    if (mode === "what") {
      const r = whatPercent(a, b);
      if (r.error) return { error: r.error };
      return { rows: [{ label: `${n(a)} as a percentage of ${n(b)}`, value: `${n(r.value)}%`, emphasis: true }] };
    }
    if (mode === "change") {
      const r = percentChange(a, b);
      if (r.error) return { error: r.error };
      return {
        rows: [
          { label: r.change >= 0 ? "Percentage increase" : "Percentage decrease", value: `${n(Math.abs(r.value))}%`, emphasis: true },
          { label: "Absolute change", value: n(r.change) },
        ],
      };
    }
    const r = addOrSubtractPercent(base, pct, direction);
    return {
      rows: [
        { label: direction === "add" ? "Amount after adding" : "Amount after subtracting", value: n(r.value), emphasis: true },
        { label: `${n(pct)}% of ${n(base)}`, value: n(r.amount) },
      ],
    };
  },
};
