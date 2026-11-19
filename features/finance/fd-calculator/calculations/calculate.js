/**
 * Fixed-deposit maturity with compounding `timesPerYear` times a year:
 *   A = P × (1 + r / n)^(n × t)      r = annual rate as a fraction, t = years
 */
export function fdMaturity({ principal, annualRatePercent, years, timesPerYear }) {
  const periodRate = annualRatePercent / 100 / timesPerYear;
  const maturity = principal * Math.exp(timesPerYear * years * Math.log1p(periodRate));
  return { maturity, interest: maturity - principal, principal };
}
