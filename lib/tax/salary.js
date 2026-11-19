import { TAX_RATES } from "./rates";
import { computeIncomeTax, standardDeductionFor } from "./incomeTax";

/** Wage used for PF: the actual basic, or capped at the ₹15,000 statutory wage ceiling. */
export const pfWage = (monthlyBasic, onCeiling) =>
  onCeiling ? Math.min(monthlyBasic, TAX_RATES.epf.wageCeiling) : monthlyBasic;

/** Annual income tax (new regime, salaried, resident) on a gross annual salary. Used for TDS estimates. */
export function annualTaxNewRegime(grossAnnual) {
  const taxableIncome = Math.max(0, grossAnnual - standardDeductionFor("new"));
  return computeIncomeTax({ taxableIncome, regime: "new" }).total;
}
