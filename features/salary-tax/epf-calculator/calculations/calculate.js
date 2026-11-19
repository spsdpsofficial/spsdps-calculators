import { TAX_RATES } from "@/lib/tax/rates";

/**
 * EPF corpus projection.
 *  Each month: employee 12% of wage + employer (12% of wage − EPS share). EPS share = 8.33% of wage, capped at the
 *  ₹15,000 wage ceiling (₹1,250). Contributions are added at month end.
 *  Interest accrues monthly on the running balance (rate ÷ 12) and is credited at year end, as EPFO does.
 *  Wages rise by `raisePercent` at the start of each year after the first.
 */
export function simulateEpf({ monthlyWage, age, retirementAge, openingBalance, raisePercent, interestPercent, epsApplies }) {
  const { employeeRate, employerRate, epsRate, wageCeiling } = TAX_RATES.epf;
  const years = retirementAge - age;
  let balance = openingBalance;
  let wage = monthlyWage;
  let employeeTotal = 0;
  let employerTotal = 0;
  let interestTotal = 0;
  const rows = [];

  for (let year = 1; year <= years; year += 1) {
    let accrued = 0;
    for (let month = 0; month < 12; month += 1) {
      const eps = epsApplies ? Math.min(wage, wageCeiling) * epsRate : 0;
      const employee = wage * employeeRate;
      const employer = wage * employerRate - eps;
      employeeTotal += employee;
      employerTotal += employer;
      balance += employee + employer;
      accrued += (balance * interestPercent) / 1200;
    }
    balance += accrued;
    interestTotal += accrued;
    rows.push({ year, age: age + year, balance });
    wage *= 1 + raisePercent / 100;
  }

  return { balance, employeeTotal, employerTotal, interestTotal, openingBalance, rows };
}
