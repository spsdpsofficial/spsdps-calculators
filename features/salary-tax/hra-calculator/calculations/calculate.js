import { TAX_RATES } from "@/lib/tax/rates";

/**
 * HRA exemption (old regime only) = the LEAST of:
 *   1. HRA actually received
 *   2. Rent paid − 10% of basic salary (+ DA)
 *   3. 50% (metro) or 40% (non-metro) of basic salary (+ DA)
 * All values per month; multiply by 12 for the year.
 */
export function calculateHra({ basicDa, hraReceived, rentPaid, metro }) {
  const { metroPercent, nonMetroPercent, rentExcessPercent } = TAX_RATES.hra;
  const limits = {
    received: hraReceived,
    rentMinusTenPercent: Math.max(0, rentPaid - rentExcessPercent * basicDa),
    percentOfSalary: basicDa * (metro ? metroPercent : nonMetroPercent),
  };
  const exempt = Math.min(limits.received, limits.rentMinusTenPercent, limits.percentOfSalary);
  return { limits, exempt, taxable: hraReceived - exempt };
}
