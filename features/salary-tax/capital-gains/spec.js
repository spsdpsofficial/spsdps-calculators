import { formatINR, formatPercent } from "@/lib/formatters";
import { ASSET_TYPES, calculateCapitalGains } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Capital gains tax calculator",
  fields: [
    { id: "asset", label: "Type of asset", type: "select", default: "equity", options: ASSET_TYPES },
    { id: "buy", label: "Purchase price", prefix: "₹", min: 0, max: 1e12, default: 500000 },
    { id: "sell", label: "Sale price", prefix: "₹", min: 0, max: 1e12, default: 800000 },
    { id: "expenses", label: "Transfer expenses (optional)", prefix: "₹", min: 0, max: 1e10, default: "", optional: true, emptyValue: 0, hint: "Brokerage or other costs of selling." },
    { id: "months", label: "Holding period", suffix: "Mo", min: 0, max: 1200, integer: true, default: 18 },
    { id: "slab", label: "Your income tax slab rate", suffix: "%", min: 0, max: 40, default: 30, step: "any", showIf: (v) => v.asset !== "equity" && Number(v.months) <= 24, hint: "Used for short-term gains on assets other than listed equity." },
  ],
  run({ asset, buy, sell, expenses, months, slab }) {
    const r = calculateCapitalGains({ assetType: asset, buyPrice: buy, sellPrice: sell, expenses, holdingMonths: months, slabRatePercent: slab ?? 0 });
    if (r.gain <= 0) return { rows: [{ label: "Capital loss", value: formatINR(-r.gain), emphasis: true }, { label: "Tax payable", value: formatINR(0) }], notes: ["A capital loss can generally be set off against capital gains, subject to the rules for short-term and long-term losses."] };
    return {
      rows: [
        { label: "Total capital gains tax", value: formatINR(r.totalTax), emphasis: true },
        { label: "Type of gain", value: r.longTerm ? "Long-term" : "Short-term" },
        { label: "Capital gain", value: formatINR(r.gain) },
        { label: "Exemption used", value: formatINR(r.exemptionUsed) },
        { label: "Taxable gain", value: formatINR(r.taxableGain) },
        { label: "Tax rate", value: formatPercent(r.ratePercent, { maxDecimals: 2 }) },
        { label: "Tax before cess", value: formatINR(r.tax) },
        { label: "Health and education cess (4%)", value: formatINR(r.cess) },
        { label: "Amount left after tax", value: formatINR(r.netProceeds) },
      ],
      notes: ["Applies to transfers on or after 23 July 2024. Surcharge, indexation for older property purchases, rollover exemptions (such as sections 54 and 54F), set-off of losses and special cases like debt mutual funds are not included. Verify the current rules on incometax.gov.in."],
    };
  },
};
