/**
 * Retirement corpus and the monthly SIP needed to build it.
 * Expenses grow with inflation until retirement; the corpus must fund inflation-adjusted
 * yearly withdrawals until `lifeExpectancy` while earning `postReturn` (annuity-due, yearly).
 * The SIP is paid at the start of each month at a nominal monthly rate of preReturn / 12.
 */
export function calculateRetirement({ age, retireAge, lifeExpectancy, monthlyExpense, inflation, preReturn, postReturn, savings }) {
  const yearsToRetire = retireAge - age;
  const yearsInRetirement = lifeExpectancy - retireAge;
  const expenseAtRetirement = monthlyExpense * (1 + inflation / 100) ** yearsToRetire;
  const annual = expenseAtRetirement * 12;
  const g = inflation / 100;
  const r = postReturn / 100;
  const q = (1 + g) / (1 + r);
  const corpus = Math.abs(q - 1) < 1e-12 ? annual * yearsInRetirement : (annual * (1 - q ** yearsInRetirement)) / (1 - q);
  const futureSavings = savings * (1 + preReturn / 100) ** yearsToRetire;
  const gap = Math.max(corpus - futureSavings, 0);
  const i = preReturn / 100 / 12;
  const n = yearsToRetire * 12;
  const factor = i === 0 ? n : (((1 + i) ** n - 1) / i) * (1 + i);
  return { yearsToRetire, yearsInRetirement, expenseAtRetirement, corpus, futureSavings, gap, monthlySip: gap / factor };
}
