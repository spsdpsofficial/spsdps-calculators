import { calculateEmi } from "@/lib/finance/loan";

/**
 * One-time part-prepayment on a reducing-balance loan, made right after `afterMonth` EMIs.
 *  mode "tenure": keep the EMI, the loan ends sooner.
 *  mode "emi":    keep the original end date, the EMI falls.
 * Returns the new tenure/EMI and the interest saved compared with no prepayment.
 */
export function simulatePrepayment({ principal, annualRatePercent, tenureMonths, prepayment, afterMonth, mode }) {
  const monthlyRate = annualRatePercent / 1200;
  const base = calculateEmi({ principal, annualRatePercent, tenureMonths });

  let balance = principal;
  let interestPaid = 0;
  for (let month = 1; month <= afterMonth; month += 1) {
    const interest = balance * monthlyRate;
    interestPaid += interest;
    balance -= base.emi - interest;
  }

  if (prepayment >= balance) {
    return { error: "The prepayment must be less than the loan balance at that point." };
  }

  const balanceBefore = balance;
  balance -= prepayment;

  let newEmi = base.emi;
  let newTenureMonths;

  if (mode === "emi") {
    const remaining = tenureMonths - afterMonth;
    newEmi = calculateEmi({ principal: balance, annualRatePercent, tenureMonths: remaining }).emi;
    interestPaid += newEmi * remaining - balance;
    newTenureMonths = tenureMonths;
  } else {
    let month = afterMonth;
    while (balance > 0.005) {
      month += 1;
      const interest = balance * monthlyRate;
      const payment = Math.min(base.emi, balance + interest);
      interestPaid += interest;
      balance -= payment - interest;
    }
    newTenureMonths = month;
  }

  return {
    emi: base.emi,
    newEmi,
    originalInterest: base.totalInterest,
    newInterest: interestPaid,
    interestSaved: base.totalInterest - interestPaid,
    tenureMonths,
    newTenureMonths,
    monthsSaved: tenureMonths - newTenureMonths,
    balanceBefore,
  };
}
