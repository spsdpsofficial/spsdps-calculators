import { calculateEmi } from "@/lib/finance/loan";

/**
 * Effective annual rate (IRR × 12) when fees are deducted upfront: the monthly rate at which the EMIs
 * repay only the amount you actually receive. Solved by bisection.
 */
export function effectiveRate({ emi, tenureMonths, netReceived }) {
  if (netReceived >= emi * tenureMonths) return 0;
  let low = 0;
  let high = 1;
  for (let i = 0; i < 200; i++) {
    const mid = (low + high) / 2;
    const presentValue = (emi * (1 - (1 + mid) ** -tenureMonths)) / mid;
    if (presentValue > netReceived) low = mid;
    else high = mid;
  }
  return ((low + high) / 2) * 12 * 100;
}

export function calculatePersonalLoan({ principal, annualRatePercent, tenureMonths, feePercent, feeGstPercent, monthlyIncome = 0 }) {
  const { emi, totalInterest, totalPayment } = calculateEmi({ principal, annualRatePercent, tenureMonths });
  const fee = (principal * feePercent) / 100;
  const feeGst = (fee * feeGstPercent) / 100;
  const totalFees = fee + feeGst;
  const netReceived = principal - totalFees;
  return {
    emi,
    totalInterest,
    totalPayment,
    totalFees,
    netReceived,
    totalCost: totalInterest + totalFees,
    effectiveRatePercent: effectiveRate({ emi, tenureMonths, netReceived }),
    incomeShare: monthlyIncome > 0 ? (emi / monthlyIncome) * 100 : null,
  };
}
