/** Return on investment, optionally annualised over `years` (compound basis). */
export function calculateRoi({ invested, finalValue, years = 0 }) {
  const gain = finalValue - invested;
  const roiPercent = (gain / invested) * 100;
  const annualisedPercent = years > 0 ? ((finalValue / invested) ** (1 / years) - 1) * 100 : null;
  return { gain, roiPercent, annualisedPercent };
}
