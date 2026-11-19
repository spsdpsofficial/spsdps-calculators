import { countWeekdays, daysBetween, diffYmd } from "@/lib/helpers/dates";

/** Difference between two ISO dates in any order. `includeEnd` counts both the first and last day. */
export function calculateDateDifference({ start, end, includeEnd }) {
  const reversed = end < start;
  const [from, to] = reversed ? [end, start] : [start, end];
  const ymd = diffYmd(from, to);
  const baseDays = daysBetween(from, to);
  const totalDays = baseDays + (includeEnd ? 1 : 0);
  return {
    reversed,
    ...ymd,
    totalDays,
    weeks: Math.floor(totalDays / 7),
    extraDays: totalDays % 7,
    weekdays: countWeekdays(from, to),
    weekendDays: baseDays + 1 - countWeekdays(from, to),
  };
}
