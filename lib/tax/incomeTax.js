import { TAX_RATES } from "./rates";

// Resident individual, income from salary / other normal-rate income. Capital gains and other
// special-rate income are NOT handled. All amounts are annual, in rupees, and unrounded.

function slabTax(taxable, slabs) {
  let previousLimit = 0;
  let tax = 0;
  for (const { upTo, rate } of slabs) {
    if (taxable > previousLimit) tax += (Math.min(taxable, upTo) - previousLimit) * rate;
    if (taxable <= upTo) break;
    previousLimit = upTo;
  }
  return tax;
}

function regimeConfig(regime, ageBand) {
  if (regime === "new") {
    const { slabs, rebate, standardDeduction, topSurchargeRate } = TAX_RATES.newRegime;
    return { slabs, rebate, standardDeduction, topSurchargeRate, regime };
  }
  const { slabsByAge, rebate, standardDeduction, topSurchargeRate } = TAX_RATES.oldRegime;
  return { slabs: slabsByAge[ageBand] ?? slabsByAge.below60, rebate, standardDeduction, topSurchargeRate, regime };
}

/** Slab tax after the section 87A rebate (including marginal relief for the new regime). */
function taxAfterRebate(taxable, config) {
  let tax = slabTax(taxable, config.slabs);
  const { incomeLimit, maxRebate } = config.rebate;
  if (taxable <= incomeLimit) return Math.max(0, tax - maxRebate);
  // Marginal relief: just above the limit, tax cannot exceed the income above the limit (new regime only;
  // the old-regime rebate has no marginal relief).
  if (config.regime === "new") tax = Math.min(tax, taxable - incomeLimit);
  return tax;
}

function surchargeRateAt(income, config) {
  let rate = 0;
  for (const tier of TAX_RATES.surchargeTiers) {
    if (income > tier.above) rate = tier.rate ?? config.topSurchargeRate;
  }
  return rate;
}

/**
 * Income tax on `taxableIncome` (income after all deductions).
 * Returns { slabTax, surcharge, cess, total }. Surcharge marginal relief is applied so that crossing a
 * surcharge threshold never increases tax by more than the extra income.
 */
export function computeIncomeTax({ taxableIncome, regime, ageBand = "below60" }) {
  const taxable = Math.max(0, taxableIncome);
  const config = regimeConfig(regime, ageBand);
  const base = taxAfterRebate(taxable, config);

  const rate = surchargeRateAt(taxable, config);
  let withSurcharge = base * (1 + rate);

  if (rate > 0) {
    const thresholds = TAX_RATES.surchargeTiers.map((tier) => tier.above).filter((above) => taxable > above);
    const threshold = thresholds[thresholds.length - 1];
    const rateAtThreshold = surchargeRateAt(threshold, config);
    const limit = taxAfterRebate(threshold, config) * (1 + rateAtThreshold) + (taxable - threshold);
    withSurcharge = Math.min(withSurcharge, limit);
  }

  const surcharge = withSurcharge - base;
  const cess = withSurcharge * TAX_RATES.cessRate;
  return { slabTax: base, surcharge, cess, total: withSurcharge + cess };
}

/** Standard deduction available to a salaried person under a regime. */
export const standardDeductionFor = (regime) =>
  regime === "new" ? TAX_RATES.newRegime.standardDeduction : TAX_RATES.oldRegime.standardDeduction;

/**
 * Compare both regimes for a salary.
 * `oldRegimeDeductions` = everything claimable only in the old regime (80C, 80D, HRA exemption, home-loan interest...).
 */
export function compareRegimes({ grossIncome, salaried = true, oldRegimeDeductions = 0, ageBand = "below60" }) {
  const newTaxable = Math.max(0, grossIncome - (salaried ? standardDeductionFor("new") : 0));
  const oldTaxable = Math.max(0, grossIncome - (salaried ? standardDeductionFor("old") : 0) - oldRegimeDeductions);
  const newTax = computeIncomeTax({ taxableIncome: newTaxable, regime: "new" });
  const oldTax = computeIncomeTax({ taxableIncome: oldTaxable, regime: "old", ageBand });
  return {
    newRegime: { taxableIncome: newTaxable, ...newTax },
    oldRegime: { taxableIncome: oldTaxable, ...oldTax },
    betterRegime: newTax.total <= oldTax.total ? "new" : "old",
    saving: Math.abs(newTax.total - oldTax.total),
  };
}
