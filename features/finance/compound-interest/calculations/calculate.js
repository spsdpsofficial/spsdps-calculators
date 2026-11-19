/** A = P × (1 + r / n)^(n × t). `timesPerYear` = n. */
export function compoundGrowth({ principal, annualRatePercent, years, timesPerYear }) {
  const periodRate = annualRatePercent / 100 / timesPerYear;
  const amount = principal * Math.exp(timesPerYear * years * Math.log1p(periodRate));
  return { amount, interest: amount - principal };
}

/** Year-end balances: [{ year, balance, interest }]. Fractional last year is included. */
export function compoundByYear({ principal, annualRatePercent, years, timesPerYear }) {
  const rows = [];
  const wholeYears = Math.ceil(years);
  for (let year = 1; year <= wholeYears; year += 1) {
    const t = Math.min(year, years);
    const { amount, interest } = compoundGrowth({ principal, annualRatePercent, years: t, timesPerYear });
    rows.push({ year, balance: amount, interest });
  }
  return rows;
}
