/**
 * Sukanya Samriddhi Yojana projection. Deposits are made for `depositYears` (at the start of each year)
 * and the account matures after `maturityYears`. Interest is compounded annually in this estimate; the
 * real scheme calculates it monthly on the lowest balance between the 5th and month-end.
 */
export function calculateSsy({ yearlyDeposit, annualRatePercent, depositYears = 15, maturityYears = 21 }) {
  let balance = 0;
  const yearly = [];
  for (let year = 1; year <= maturityYears; year++) {
    if (year <= depositYears) balance += yearlyDeposit;
    balance *= 1 + annualRatePercent / 100;
    yearly.push({ year, balance });
  }
  const invested = yearlyDeposit * depositYears;
  return { invested, maturity: balance, interest: balance - invested, yearly };
}
