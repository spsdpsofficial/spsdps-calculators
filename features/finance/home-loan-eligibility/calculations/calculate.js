/** Loan that a given EMI can service: the inverse of the EMI formula. */
export function principalForEmi({ emi, annualRatePercent, tenureMonths }) {
  if (emi <= 0) return 0;
  const i = annualRatePercent / 1200;
  if (i === 0) return emi * tenureMonths;
  return (emi * (Math.pow(1 + i, tenureMonths) - 1)) / (i * Math.pow(1 + i, tenureMonths));
}

/**
 * Estimate of the loan a bank may sanction. FOIR (fixed obligations to income ratio) is the share of
 * monthly income that can go to EMIs; existing EMIs are subtracted first.
 */
export function calculateEligibility({ monthlyIncome, existingEmi, foirPercent, annualRatePercent, tenureMonths }) {
  const totalAllowed = (monthlyIncome * foirPercent) / 100;
  const maxEmi = Math.max(totalAllowed - existingEmi, 0);
  const loan = principalForEmi({ emi: maxEmi, annualRatePercent, tenureMonths });
  return { totalAllowed, maxEmi, loan, eligible: maxEmi > 0 };
}
