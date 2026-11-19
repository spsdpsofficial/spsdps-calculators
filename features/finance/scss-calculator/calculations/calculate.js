export const SCSS_MAX_DEPOSIT = 3000000;
export const SCSS_TERM_YEARS = 5;

/** SCSS pays simple interest every quarter on the deposit; the principal is returned at maturity. */
export function calculateScss({ deposit, annualRatePercent, years = SCSS_TERM_YEARS }) {
  // Banks pay whole paise, so round to 2 decimals (also removes floating-point noise).
  const quarterly = Math.round((deposit * annualRatePercent * 100) / 400) / 100;
  const quarters = years * 4;
  const totalInterest = quarterly * quarters;
  return { quarterly, monthlyEquivalent: quarterly / 3, yearly: quarterly * 4, quarters, totalInterest, total: deposit + totalInterest };
}
