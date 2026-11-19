/**
 * PPF projection with an annual deposit made at the start of each financial year (before the 5th of April),
 * and interest compounded once a year:
 *   FV = D × [ ((1 + r)^n - 1) / r ] × (1 + r)
 * This is the best case: depositing later in the year earns less interest in the first year.
 */
export function ppfProjection({ yearlyDeposit, annualRatePercent, years }) {
  const r = annualRatePercent / 100;
  const invested = yearlyDeposit * years;
  const maturity = r === 0 ? invested : yearlyDeposit * (Math.expm1(years * Math.log1p(r)) / r) * (1 + r);
  return { maturity, invested, interest: maturity - invested };
}
