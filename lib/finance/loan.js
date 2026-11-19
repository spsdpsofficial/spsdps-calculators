// Shared loan maths (EMI, schedule). Used by EMI, loan prepayment and business loan tools.
// Pure EMI maths: numbers in, numbers out. No DOM, no React, no formatting, no rounding.
// Rounding happens only when values are displayed, so no precision is lost along the way.

export const MONTHS_PER_YEAR = 12;

/**
 * Equated Monthly Instalment on a reducing balance, paid at the end of each month:
 *   EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
 * where r = annual rate / 12 / 100 and n = number of monthly instalments.
 *
 * Inputs must already be validated (see validation/validate.js).
 */
export function calculateEmi({ principal, annualRatePercent, tenureMonths }) {
  const monthlyRate = annualRatePercent / MONTHS_PER_YEAR / 100;

  let emi;
  if (monthlyRate === 0) {
    emi = principal / tenureMonths; // interest-free loan
  } else {
    // expm1/log1p keep precision for very small rates, where (1 + r)^n - 1 would cancel out.
    const growthMinusOne = Math.expm1(tenureMonths * Math.log1p(monthlyRate));
    emi = (principal * monthlyRate * (growthMinusOne + 1)) / growthMinusOne;
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalPayment,
    totalInterest,
    principal,
    tenureMonths,
    interestShare: totalPayment > 0 ? totalInterest / totalPayment : 0,
  };
}

/** Month-by-month amortisation. Returns [{ month, interest, principalPaid, balance }]. */
export function buildSchedule({ principal, annualRatePercent, tenureMonths }) {
  const { emi } = calculateEmi({ principal, annualRatePercent, tenureMonths });
  const monthlyRate = annualRatePercent / MONTHS_PER_YEAR / 100;

  const rows = [];
  let balance = principal;
  for (let month = 1; month <= tenureMonths; month += 1) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    // Clamp the last balance to exactly 0 (floating-point residue can leave ~1e-9).
    balance = month === tenureMonths ? 0 : balance - principalPaid;
    rows.push({ month, interest, principalPaid, balance });
  }
  return rows;
}

/** Group the monthly schedule by loan year: [{ year, principalPaid, interestPaid, balance }]. */
export function summariseByYear(rows) {
  const years = [];
  for (const row of rows) {
    const yearIndex = Math.ceil(row.month / MONTHS_PER_YEAR);
    let entry = years[yearIndex - 1];
    if (!entry) {
      entry = { year: yearIndex, principalPaid: 0, interestPaid: 0, balance: 0 };
      years[yearIndex - 1] = entry;
    }
    entry.principalPaid += row.principalPaid;
    entry.interestPaid += row.interest;
    entry.balance = row.balance;
  }
  return years;
}
