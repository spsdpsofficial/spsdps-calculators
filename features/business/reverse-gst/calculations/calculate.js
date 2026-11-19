import { calculateGst } from "@/lib/finance/gst";

/** Split a GST-inclusive amount into the base price and GST. GST share of the price = rate ÷ (100 + rate). */
export function calculateReverseGst({ inclusiveAmount, ratePercent }) {
  const r = calculateGst({ amount: inclusiveAmount, ratePercent, mode: "remove" });
  return { ...r, gstShareOfPrice: (ratePercent / (100 + ratePercent)) * 100 };
}
