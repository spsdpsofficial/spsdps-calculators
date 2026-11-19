import { formatINR } from "@/lib/formatters";
import { PURITY_OPTIONS, calculateGold } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Gold and silver price calculator",
  fields: [
    { id: "weight", label: "Weight", suffix: "g", min: 0.01, max: 100000, default: 10, step: "any" },
    { id: "rate", label: "Rate per gram (pure metal)", prefix: "₹", min: 1, max: 1e7, default: 10000, step: "any", hint: "Enter today's rate from a jeweller or an official source. This tool does not fetch live prices. Use the rate of 24K gold, or pure silver, per gram." },
    { id: "purity", label: "Purity", type: "select", default: "0.916", options: PURITY_OPTIONS },
    { id: "making", label: "Making charges", suffix: "%", min: 0, max: 50, default: 10, step: "any", hint: "Charged by the jeweller, as a percentage of the metal value." },
    { id: "gst", label: "GST", suffix: "%", min: 0, max: 30, default: 3, step: "any", hint: "GST on gold jewellery is currently 3%. Making charges are charged GST at a different rate in some invoices, so check your bill." },
  ],
  run({ weight, rate, purity, making, gst }) {
    const r = calculateGold({ weightGrams: weight, ratePerGram: rate, purity: Number(purity), makingPercent: making, gstPercent: gst });
    return {
      rows: [
        { label: "Total price", value: formatINR(r.total, { decimals: 2 }), emphasis: true },
        { label: "Metal value", value: formatINR(r.metal, { decimals: 2 }) },
        { label: "Making charges", value: formatINR(r.making, { decimals: 2 }) },
        { label: "Price before GST", value: formatINR(r.subtotal, { decimals: 2 }) },
        { label: "GST", value: formatINR(r.gst, { decimals: 2 }) },
      ],
      notes: ["The metal rate is entered by you, so the result is only as accurate as that rate. Stone or hallmarking charges are not included, and the jeweller's final bill governs."],
    };
  },
};
