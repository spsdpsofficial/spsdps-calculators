import { TAX_RATES } from "@/lib/tax/rates";
import { annualTaxNewRegime, pfWage } from "@/lib/tax/salary";

/**
 * Split an annual CTC into components and estimate take-home pay (new regime).
 *   Employer PF and (optionally) gratuity are part of CTC but not paid monthly.
 *   Gross salary = CTC − employer PF − gratuity.   Special allowance = whatever is left after basic and HRA.
 */
export function calculateCtcBreakup({ ctc, basicPercent, hraPercentOfBasic, pfOnCeiling, includeGratuity, professionalTaxYearly }) {
  const basic = (ctc * basicPercent) / 100;
  const hra = (basic * hraPercentOfBasic) / 100;
  const monthlyPfWage = pfWage(basic / 12, pfOnCeiling);
  const employerPf = monthlyPfWage * 12 * TAX_RATES.epf.employerRate;
  const employeePf = monthlyPfWage * 12 * TAX_RATES.epf.employeeRate;
  const gratuity = includeGratuity ? (basic * TAX_RATES.gratuity.daysPerYearCovered) / TAX_RATES.gratuity.divisorCovered / 12 : 0;

  const gross = ctc - employerPf - gratuity;
  const special = gross - basic - hra;
  if (special < 0) return { error: "Basic and HRA are higher than the CTC allows. Reduce the basic % or HRA %." };

  const tax = annualTaxNewRegime(gross);
  const inHandYearly = gross - employeePf - professionalTaxYearly - tax;
  return { basic, hra, special, employerPf, employeePf, gratuity, gross, tax, professionalTaxYearly, inHandYearly, inHandMonthly: inHandYearly / 12 };
}
