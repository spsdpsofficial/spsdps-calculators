import { parseNumber } from "@/lib/helpers/numbers";
import { formatINR } from "@/lib/formatters";

export const LIMITS = {
  principal: { min: 1_000, max: 10_000_000_000 }, // ₹1,000 to ₹1,000 crore
  rate: { min: 0, max: 50 }, // % per annum
  tenureMonths: { min: 1, max: 480 }, // 1 month to 40 years
};

/**
 * Validate the raw text from the form.
 * Returns { valid, errors, values } where errors is keyed by field and values holds the
 * parsed numbers (only meaningful when valid is true).
 */
export function validateEmiInput({ principal, rate, tenure, tenureUnit }) {
  const errors = {};

  const principalValue = parseNumber(principal);
  if (Number.isNaN(principalValue)) {
    errors.principal = "Enter the loan amount in rupees.";
  } else if (principalValue < LIMITS.principal.min || principalValue > LIMITS.principal.max) {
    errors.principal = `Loan amount must be between ${formatINR(LIMITS.principal.min)} and ${formatINR(LIMITS.principal.max)}.`;
  }

  const rateValue = parseNumber(rate);
  if (Number.isNaN(rateValue)) {
    errors.rate = "Enter the annual interest rate, for example 8.5.";
  } else if (rateValue < LIMITS.rate.min || rateValue > LIMITS.rate.max) {
    errors.rate = `Interest rate must be between ${LIMITS.rate.min}% and ${LIMITS.rate.max}% per year.`;
  }

  const tenureValue = parseNumber(tenure);
  let tenureMonths = Number.NaN;
  if (Number.isNaN(tenureValue)) {
    errors.tenure = "Enter the loan tenure.";
  } else {
    tenureMonths = Math.round(tenureUnit === "months" ? tenureValue : tenureValue * 12);
    if (tenureMonths < LIMITS.tenureMonths.min || tenureMonths > LIMITS.tenureMonths.max) {
      errors.tenure = "Tenure must be between 1 month and 40 years (480 months).";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    values: { principal: principalValue, annualRatePercent: rateValue, tenureMonths },
  };
}
