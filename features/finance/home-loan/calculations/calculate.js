import { calculateEmi } from "@/lib/finance/loan";

/** Home loan from property price and down payment. The processing fee is a percentage of the loan. */
export function calculateHomeLoan({ propertyValue, downPaymentPercent, annualRatePercent, tenureMonths, feePercent = 0 }) {
  const downPayment = (propertyValue * downPaymentPercent) / 100;
  const loanAmount = propertyValue - downPayment;
  const emi = calculateEmi({ principal: loanAmount, annualRatePercent, tenureMonths });
  const fee = (loanAmount * feePercent) / 100;
  return {
    downPayment,
    loanAmount,
    emi: emi.emi,
    totalInterest: emi.totalInterest,
    totalRepayment: emi.totalPayment,
    fee,
    // Everything you pay out of pocket over the life of the loan, including the down payment.
    totalCost: downPayment + emi.totalPayment + fee,
  };
}
