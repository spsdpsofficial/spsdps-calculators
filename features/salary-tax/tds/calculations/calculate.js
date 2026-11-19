import { NO_PAN_MIN_PERCENT, TDS_NATURES } from "@/lib/tax/tdsRates";

export function findNature(id) {
  return TDS_NATURES.find((n) => n.id === id);
}

/** TDS on a payment. Below the nature's threshold nothing is deducted. */
export function calculateTds({ natureId, amount, hasPan }) {
  const nature = findNature(natureId);
  if (!nature) throw new Error(`Unknown payment type: ${natureId}`);
  const ratePercent = hasPan ? nature.ratePercent : Math.max(nature.ratePercent * 2, NO_PAN_MIN_PERCENT);
  const belowThreshold = amount <= nature.threshold;
  const tds = belowThreshold ? 0 : (amount * ratePercent) / 100;
  return { nature, ratePercent, belowThreshold, tds, netPayable: amount - tds };
}
