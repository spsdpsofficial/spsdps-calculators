/**
 * Recurring-deposit maturity. Indian banks compound RD interest quarterly, so a deposit made at the
 * start of month k (of N) grows for (N - k + 1) months at the quarterly rate:
 *   M = Σ R × (1 + q) ^ ((N - k + 1) / 3),   q = annual rate / 4 / 100
 */
export function rdMaturity({ monthly, annualRatePercent, months }) {
  const quarterlyRate = annualRatePercent / 400;
  let maturity = 0;
  for (let k = 1; k <= months; k += 1) {
    maturity += monthly * (1 + quarterlyRate) ** ((months - k + 1) / 3);
  }
  const deposited = monthly * months;
  return { maturity, deposited, interest: maturity - deposited };
}
