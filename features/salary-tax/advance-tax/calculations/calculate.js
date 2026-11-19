export const ADVANCE_TAX_THRESHOLD = 10000;

// Cumulative share of the year's tax due by each date (month is 1-based; `yearOffset` 1 = the following calendar year).
export const INSTALMENTS = [
  { month: 6, day: 15, yearOffset: 0, cumulativePercent: 15 },
  { month: 9, day: 15, yearOffset: 0, cumulativePercent: 45 },
  { month: 12, day: 15, yearOffset: 0, cumulativePercent: 75 },
  { month: 3, day: 15, yearOffset: 1, cumulativePercent: 100 },
];

const iso = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/**
 * Advance tax schedule for a financial year starting 1 April of `fyStartYear`.
 * `kind`: "regular", "presumptive" (sections 44AD/44ADA: whole amount by 15 March) or "senior" (age 60+ with no business income: exempt).
 */
export function calculateAdvanceTax({ fyStartYear, taxLiability, tdsTcs = 0, kind = "regular" }) {
  const netTax = Math.max(taxLiability - tdsTcs, 0);
  if (kind === "senior") return { netTax, required: false, reason: "senior", schedule: [] };
  if (netTax < ADVANCE_TAX_THRESHOLD) return { netTax, required: false, reason: "below-threshold", schedule: [] };

  const steps = kind === "presumptive" ? [INSTALMENTS[3]] : INSTALMENTS;
  let paidSoFar = 0;
  const schedule = steps.map((s) => {
    const cumulative = (netTax * s.cumulativePercent) / 100;
    const instalment = cumulative - paidSoFar;
    paidSoFar = cumulative;
    return { dueDate: iso(fyStartYear + s.yearOffset, s.month, s.day), cumulativePercent: s.cumulativePercent, instalment, cumulative };
  });
  return { netTax, required: true, reason: null, schedule };
}
