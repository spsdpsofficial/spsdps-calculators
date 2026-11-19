import { daysInMonth, parseIso, weekdayName } from "@/lib/helpers/dates";

export const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

/** ISO 8601 week number and week-year (weeks start on Monday; week 1 contains the first Thursday). */
export function isoWeek(iso) {
  const date = parseIso(iso);
  const dayNumber = (date.getUTCDay() + 6) % 7; // Monday = 0
  date.setUTCDate(date.getUTCDate() - dayNumber + 3); // Thursday of this week
  const weekYear = date.getUTCFullYear();
  const firstThursday = new Date(Date.UTC(weekYear, 0, 4));
  const week = 1 + Math.round(((date - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7);
  return { week, weekYear };
}

export function dayOfYear(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  let total = d;
  for (let i = 0; i < m - 1; i++) total += daysInMonth(y, i);
  return total;
}

export function describeDate(iso) {
  const year = Number(iso.slice(0, 4));
  const leap = isLeapYear(year);
  const { week, weekYear } = isoWeek(iso);
  return {
    weekday: weekdayName(iso),
    dayOfYear: dayOfYear(iso),
    daysInYear: leap ? 366 : 365,
    isoWeek: week,
    isoWeekYear: weekYear,
    quarter: Math.floor((Number(iso.slice(5, 7)) - 1) / 3) + 1,
    leap,
  };
}
