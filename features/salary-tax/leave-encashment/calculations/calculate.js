export const LEAVE_EXEMPTION_LIMIT = 2500000; // ₹25 lakh, for leave encashed on retirement or resignation
export const DAYS_PER_MONTH = 30;

/**
 * Leave encashment and its tax exemption.
 * - During service: fully taxable.
 * - Central/state government employees on retirement: fully exempt.
 * - Others on retirement or leaving: exempt up to the least of (a) amount received, (b) 10 × average monthly
 *   salary, (c) ₹25 lakh, (d) cash value of the leave entitlement (30 days per year of service, less leave taken).
 */
export function calculateLeaveEncashment({ avgMonthlySalary, daysEncashed, yearsOfService, leaveTaken, timing, employer }) {
  const perDay = avgMonthlySalary / DAYS_PER_MONTH;
  const received = perDay * daysEncashed;
  if (timing === "during") return { perDay, received, exempt: 0, taxable: received, limits: null };
  if (employer === "government") return { perDay, received, exempt: received, taxable: 0, limits: null };

  const entitlementDays = Math.max(DAYS_PER_MONTH * yearsOfService - leaveTaken, 0);
  const limits = {
    received,
    tenMonthsSalary: 10 * avgMonthlySalary,
    statutory: LEAVE_EXEMPTION_LIMIT,
    entitlement: perDay * Math.min(daysEncashed, entitlementDays),
  };
  const exempt = Math.min(...Object.values(limits));
  return { perDay, received, exempt, taxable: received - exempt, limits };
}
