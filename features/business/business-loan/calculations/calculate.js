import { calculateEmi } from "@/lib/finance/loan";

/**
 * Business loan cost. The EMI maths is shared with the EMI calculator.
 * The processing fee (plus GST on it) is assumed to be deducted from the amount you receive.
 */
export function calculateBusinessLoan({ principal, annualRatePercent, tenureMonths, feePercent, feeGstPercent, monthlyIncome = 0 }) {
  const emi = calculateEmi({ principal, annualRatePercent, tenureMonths });
  const fee = (principal * feePercent) / 100;
  const feeGst = (fee * feeGstPercent) / 100;
  const totalFees = fee + feeGst;
  return {
    emi: emi.emi,
    totalInterest: emi.totalInterest,
    totalPayment: emi.totalPayment,
    totalFees,
    feeGst,
    amountReceived: principal - totalFees,
    totalCost: emi.totalInterest + totalFees,
    incomeShare: monthlyIncome > 0 ? (emi.emi / monthlyIncome) * 100 : null,
  };
}
