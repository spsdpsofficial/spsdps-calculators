// Calendar maths on ISO date strings ("YYYY-MM-DD"). Everything is computed in UTC so the result
// never shifts with the visitor's timezone or daylight-saving changes.

const DAY_MS = 86_400_000;

export const parseIso = (iso) => new Date(`${iso}T00:00:00Z`);
export const toIso = (date) => date.toISOString().slice(0, 10);

/** Today in the visitor's local calendar, as an ISO string. Call only on the client. */
export function todayIso() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export const daysInMonth = (year, monthIndex) => new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

/** Whole days from `a` to `b` (negative if b is earlier). */
export const daysBetween = (a, b) => Math.round((parseIso(b).getTime() - parseIso(a).getTime()) / DAY_MS);

/** Add months, clamping to the end of a shorter month (31 Jan + 1 month = 28/29 Feb). */
export function addMonths(iso, months) {
  const date = parseIso(iso);
  const total = date.getUTCFullYear() * 12 + date.getUTCMonth() + months;
  const year = Math.floor(total / 12);
  const monthIndex = total - year * 12;
  const day = Math.min(date.getUTCDate(), daysInMonth(year, monthIndex));
  return toIso(new Date(Date.UTC(year, monthIndex, day)));
}

/** Years, months and days from `start` to `end` (start <= end), counting whole months first. */
export function diffYmd(start, end) {
  const s = parseIso(start);
  const e = parseIso(end);
  let months = (e.getUTCFullYear() - s.getUTCFullYear()) * 12 + (e.getUTCMonth() - s.getUTCMonth());
  if (addMonths(start, months) > end) months -= 1;
  const days = daysBetween(addMonths(start, months), end);
  return { years: Math.floor(months / 12), months: months % 12, days, totalMonths: months };
}

/** Monday-to-Friday days from start to end, both inclusive. */
export function countWeekdays(start, end) {
  const totalDays = daysBetween(start, end) + 1;
  const startDay = parseIso(start).getUTCDay(); // 0 = Sunday
  let count = 0;
  for (let offset = 0; offset < totalDays; offset += 1) {
    const day = (startDay + offset) % 7;
    if (day !== 0 && day !== 6) count += 1;
  }
  return count;
}

export const weekdayName = (iso) =>
  new Intl.DateTimeFormat("en-IN", { weekday: "long", timeZone: "UTC" }).format(parseIso(iso));

/** Next birthday on or after `asOf`. A 29 February birthday falls on 28 February in non-leap years. */
export function nextBirthday(dob, asOf) {
  const birth = parseIso(dob);
  const month = birth.getUTCMonth();
  const day = birth.getUTCDate();
  const build = (year) => toIso(new Date(Date.UTC(year, month, Math.min(day, daysInMonth(year, month)))));
  const year = parseIso(asOf).getUTCFullYear();
  let candidate = build(year);
  if (candidate < asOf) candidate = build(year + 1);
  return { date: candidate, daysUntil: daysBetween(asOf, candidate), turningAge: parseIso(candidate).getUTCFullYear() - birth.getUTCFullYear() };
}

/** ISO date `days` after (or before, if negative) the given ISO date. */
export const addDays = (iso, days) => toIso(new Date(parseIso(iso).getTime() + days * DAY_MS));
