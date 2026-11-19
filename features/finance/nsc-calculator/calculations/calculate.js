/** NSC pays no interim interest; it compounds annually and is paid at the end of the term. */
export function calculateNsc({ amount, annualRatePercent, years = 5 }) {
  const maturity = amount * (1 + annualRatePercent / 100) ** years;
  const yearly = Array.from({ length: years }, (_, i) => ({ year: i + 1, balance: amount * (1 + annualRatePercent / 100) ** (i + 1) }));
  return { invested: amount, maturity, interest: maturity - amount, yearly };
}
