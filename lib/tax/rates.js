// SINGLE SOURCE for tax / statutory rates used by the Salary & Tax calculators.
// When a rule changes: update the value here, update `verifiedOn`, re-run the tests and update the
// affected pages' `lastReviewed` in lib/tools/catalogue.js. Never hard-code these numbers elsewhere.
//
// Sources were read on `verifiedOn` (secondary tax-information sites and news reports, cross-checked
// against each other). They MUST be confirmed against the official source before relying on them for a
// launch: incometax.gov.in (tax slabs), epfindia.gov.in (EPF), Ministry of Finance / India Post (small savings),
// and each state's commercial-tax / labour department (professional tax).

export const TAX_RATES = {
  financialYear: "2026-27",
  verifiedOn: "2026-11-11",

  // New tax regime (default regime). Upper limit of each band and the rate for that band.
  newRegime: {
    slabs: [
      { upTo: 400_000, rate: 0 },
      { upTo: 800_000, rate: 0.05 },
      { upTo: 1_200_000, rate: 0.1 },
      { upTo: 1_600_000, rate: 0.15 },
      { upTo: 2_000_000, rate: 0.2 },
      { upTo: 2_400_000, rate: 0.25 },
      { upTo: Infinity, rate: 0.3 },
    ],
    standardDeduction: 75_000,
    rebate: { incomeLimit: 1_200_000, maxRebate: 60_000 }, // section 87A, resident individuals
    topSurchargeRate: 0.25, // above ₹5 crore
  },

  // Old tax regime, by age band.
  oldRegime: {
    slabsByAge: {
      below60: [
        { upTo: 250_000, rate: 0 },
        { upTo: 500_000, rate: 0.05 },
        { upTo: 1_000_000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      senior: [
        { upTo: 300_000, rate: 0 },
        { upTo: 500_000, rate: 0.05 },
        { upTo: 1_000_000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
      superSenior: [
        { upTo: 500_000, rate: 0 },
        { upTo: 1_000_000, rate: 0.2 },
        { upTo: Infinity, rate: 0.3 },
      ],
    },
    standardDeduction: 50_000,
    rebate: { incomeLimit: 500_000, maxRebate: 12_500 },
    topSurchargeRate: 0.37,
  },

  // Surcharge on tax, by total income (the top rate differs by regime, see above).
  surchargeTiers: [
    { above: 5_000_000, rate: 0.1 },
    { above: 10_000_000, rate: 0.15 },
    { above: 20_000_000, rate: 0.25 },
    { above: 50_000_000, rate: null }, // regime-specific top rate
  ],
  cessRate: 0.04, // health and education cess

  // Gratuity (Payment of Gratuity Act / Code on Social Security, 2020).
  gratuity: { taxFreeLimit: 2_000_000, daysPerYearCovered: 15, divisorCovered: 26, divisorNotCovered: 30 },

  // EPF
  epf: {
    interestRate: 8.25, // % for FY 2025-26, as reported after EPFO / government approval
    interestRateFinancialYear: "2025-26",
    employeeRate: 0.12,
    employerRate: 0.12,
    epsRate: 0.0833,
    wageCeiling: 15_000,
  },

  // HRA (old regime only). 8 metro cities get 50% of salary from FY 2026-27; others 40%.
  hra: {
    metroPercent: 0.5,
    nonMetroPercent: 0.4,
    rentExcessPercent: 0.1,
    metroCities: ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru", "Hyderabad", "Pune", "Ahmedabad"],
  },
};
