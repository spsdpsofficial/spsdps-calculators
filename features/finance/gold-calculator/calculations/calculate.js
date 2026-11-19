export const PURITY_OPTIONS = [
  { value: "0.999", label: "24K (99.9%)" },
  { value: "0.916", label: "22K (91.6%)" },
  { value: "0.75", label: "18K (75%)" },
  { value: "0.585", label: "14K (58.5%)" },
];

/** Jewellery price: metal value + making charges (as % of metal value) + GST on the sum. */
export function calculateGold({ weightGrams, ratePerGram, purity, makingPercent, gstPercent }) {
  const metal = weightGrams * ratePerGram * purity;
  const making = (metal * makingPercent) / 100;
  const subtotal = metal + making;
  const gst = (subtotal * gstPercent) / 100;
  return { metal, making, subtotal, gst, total: subtotal + gst };
}
