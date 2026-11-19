import { addDays, daysBetween } from "@/lib/helpers/dates";

/**
 * Estimated due date by Naegele's rule: first day of last period + 280 days (40 weeks), adjusted by the
 * difference between your cycle length and the standard 28 days.
 */
export function calculateDueDate({ lmp, cycleLength = 28, asOf }) {
  const adjustment = cycleLength - 28;
  const dueDate = addDays(lmp, 280 + adjustment);
  const conception = addDays(lmp, 14 + adjustment);
  const elapsed = daysBetween(lmp, asOf);
  const result = { dueDate, conception, weekday: null, elapsedDays: elapsed, daysRemaining: daysBetween(asOf, dueDate) };
  if (elapsed < 0) return { ...result, status: "future" };
  if (elapsed > 300) return { ...result, status: "over" };
  const weeks = Math.floor(elapsed / 7);
  return {
    ...result,
    status: "pregnant",
    weeks,
    days: elapsed % 7,
    trimester: weeks < 13 ? 1 : weeks < 27 ? 2 : 3,
    milestones: [
      { label: "End of first trimester (13 weeks)", date: addDays(lmp, 91 + adjustment) },
      { label: "End of second trimester (27 weeks)", date: addDays(lmp, 189 + adjustment) },
    ],
  };
}

