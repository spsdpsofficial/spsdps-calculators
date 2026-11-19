import { daysBetween, diffYmd, nextBirthday, weekdayName } from "@/lib/helpers/dates";

/** Exact age on `asOf` (ISO dates). Returns an error object if the birth date is after `asOf`. */
export function calculateAge({ dob, asOf }) {
  if (dob > asOf) return { error: "The date of birth must be on or before the 'age on' date." };
  const { years, months, days, totalMonths } = diffYmd(dob, asOf);
  const totalDays = daysBetween(dob, asOf);
  return {
    years,
    months,
    days,
    totalMonths,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    bornOn: weekdayName(dob),
    next: nextBirthday(dob, asOf),
    nextWeekday: weekdayName(nextBirthday(dob, asOf).date),
  };
}
