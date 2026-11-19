import { TAX_RATES } from "@/lib/tax/rates";

/**
 * Gratuity.
 *  Covered by the Payment of Gratuity Act: wage × 15 ÷ 26 × years, where a part year of MORE than
 *  6 months counts as a full year.
 *  Not covered: wage × 15 ÷ 30 × completed years (wage = average of the last 10 months).
 * `wage` = last drawn monthly basic + DA.
 */
export function calculateGratuity({ wage, years, months, covered }) {
  const { daysPerYearCovered, divisorCovered, divisorNotCovered, taxFreeLimit } = TAX_RATES.gratuity;
  const countedYears = covered ? years + (months > 6 ? 1 : 0) : years;
  const divisor = covered ? divisorCovered : divisorNotCovered;
  const gratuity = (wage * daysPerYearCovered * countedYears) / divisor;
  const taxFree = Math.min(gratuity, taxFreeLimit);
  return { countedYears, gratuity, taxFree, taxable: gratuity - taxFree };
}
