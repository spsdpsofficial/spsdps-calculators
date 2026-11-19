/** Value of a one-time investment compounded once a year: A = P × (1 + r)^t. `years` may be fractional. */
export function lumpsumValue({ amount, annualRatePercent, years }) {
  const futureValue = amount * (1 + annualRatePercent / 100) ** years;
  return { invested: amount, futureValue, returns: futureValue - amount };
}

export function lumpsumYearly({ amount, annualRatePercent, years }) {
  return Array.from({ length: years }, (_, i) => ({ year: i + 1, value: lumpsumValue({ amount, annualRatePercent, years: i + 1 }).futureValue }));
}
