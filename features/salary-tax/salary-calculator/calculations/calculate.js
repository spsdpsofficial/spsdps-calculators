import { TAX_RATES } from "@/lib/tax/rates";
import { annualTaxNewRegime, pfWage } from "@/lib/tax/salary";

/**
 * Monthly take-home estimate from salary components (all monthly, in ₹).
 * Employee PF = 12% of the PF wage. TDS = new-regime tax on the annual gross ÷ 12 (an estimate).
 */
export function calculateSalary({ basic, hra, other, pfOnCeiling, professionalTax, estimateTds }) {
  const gross = basic + hra + other;
  const pf = TAX_RATES.epf.employeeRate * pfWage(basic, pfOnCeiling);
  const tds = estimateTds ? annualTaxNewRegime(gross * 12) / 12 : 0;
  const deductions = pf + professionalTax + tds;
  return { gross, pf, professionalTax, tds, deductions, inHand: gross - deductions, annualInHand: (gross - deductions) * 12 };
}
