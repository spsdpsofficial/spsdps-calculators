/**
 * Systematic withdrawal plan: a fixed amount is withdrawn at the start of each month and the remaining
 * balance grows at annualRate/12 per month. Simulates up to `months`, stopping if the corpus runs out.
 */
export function simulateSwp({ corpus, monthlyWithdrawal, annualRatePercent, months }) {
  const i = annualRatePercent / 1200;
  let balance = corpus;
  let withdrawn = 0;
  let lastedMonths = 0;
  const yearly = [];
  for (let m = 1; m <= months; m++) {
    const take = Math.min(monthlyWithdrawal, balance);
    balance = (balance - take) * (1 + i);
    withdrawn += take;
    if (take > 0) lastedMonths = m;
    if (balance <= 0.005) {
      balance = 0;
    }
    if (m % 12 === 0 || m === months) yearly.push({ year: Math.ceil(m / 12), withdrawn, balance });
    if (balance === 0) break;
  }
  const depleted = balance === 0;
  return {
    endingBalance: balance,
    totalWithdrawn: withdrawn,
    depleted,
    lastedMonths,
    totalGrowth: balance + withdrawn - corpus,
    yearly,
  };
}
