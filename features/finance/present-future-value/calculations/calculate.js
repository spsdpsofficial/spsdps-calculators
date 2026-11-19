const periodsPerYear = { annual: 1, semiannual: 2, quarterly: 4, monthly: 12 };
export const COMPOUNDING_OPTIONS = Object.keys(periodsPerYear);

function growthFactor({ annualRatePercent, years, compounding }) {
  const m = periodsPerYear[compounding];
  return (1 + annualRatePercent / 100 / m) ** (m * years);
}

/** Future value of an amount today. */
export function futureValue({ presentValue, annualRatePercent, years, compounding }) {
  return presentValue * growthFactor({ annualRatePercent, years, compounding });
}

/** Today's value of an amount received in the future. */
export function presentValue({ futureValue: fv, annualRatePercent, years, compounding }) {
  return fv / growthFactor({ annualRatePercent, years, compounding });
}
