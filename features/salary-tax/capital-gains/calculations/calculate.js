// Capital gains tax rules for transfers on or after 23 July 2024 (Finance Act 2024 as in force at the
// review date). Verify on incometax.gov.in before relying on the result.
export const CGT_RULES = {
  cessPercent: 4,
  equityShortTermPercent: 20,
  longTermPercent: 12.5,
  equityLongTermExemption: 125000,
  // Holding period (months) beyond which a gain is long-term.
  longTermMonths: { equity: 12, property: 24, other: 24 },
};

export const ASSET_TYPES = [
  { value: "equity", label: "Listed shares or equity mutual fund (STT paid)" },
  { value: "property", label: "Land, building or house property" },
  { value: "other", label: "Other asset (unlisted shares, gold, etc.)" },
];

/**
 * Tax on a capital gain. Short-term gains on assets other than listed equity are taxed at the person's
 * slab rate, which the caller supplies (`slabRatePercent`).
 */
export function calculateCapitalGains({ assetType, buyPrice, sellPrice, expenses = 0, holdingMonths, slabRatePercent = 0 }) {
  const gain = sellPrice - buyPrice - expenses;
  const longTerm = holdingMonths > CGT_RULES.longTermMonths[assetType];
  if (gain <= 0) return { gain, longTerm, taxableGain: 0, exemptionUsed: 0, ratePercent: 0, tax: 0, cess: 0, totalTax: 0, netProceeds: sellPrice - expenses };

  let ratePercent;
  let exemptionUsed = 0;
  let taxableGain = gain;
  if (assetType === "equity" && !longTerm) ratePercent = CGT_RULES.equityShortTermPercent;
  else if (longTerm) {
    ratePercent = CGT_RULES.longTermPercent;
    if (assetType === "equity") {
      exemptionUsed = Math.min(gain, CGT_RULES.equityLongTermExemption);
      taxableGain = gain - exemptionUsed;
    }
  } else ratePercent = slabRatePercent;

  const tax = (taxableGain * ratePercent) / 100;
  const cess = (tax * CGT_RULES.cessPercent) / 100;
  return { gain, longTerm, taxableGain, exemptionUsed, ratePercent, tax, cess, totalTax: tax + cess, netProceeds: sellPrice - expenses - tax - cess };
}
