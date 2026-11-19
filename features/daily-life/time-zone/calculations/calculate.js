export const ZONES = [
  { id: "Asia/Kolkata", label: "India (IST)" },
  { id: "UTC", label: "UTC" },
  { id: "Europe/London", label: "London (UK)" },
  { id: "Europe/Paris", label: "Paris, Berlin (Central Europe)" },
  { id: "Europe/Moscow", label: "Moscow" },
  { id: "Asia/Dubai", label: "Dubai (UAE)" },
  { id: "Asia/Karachi", label: "Karachi (Pakistan)" },
  { id: "Asia/Kathmandu", label: "Kathmandu (Nepal)" },
  { id: "Asia/Dhaka", label: "Dhaka (Bangladesh)" },
  { id: "Asia/Bangkok", label: "Bangkok" },
  { id: "Asia/Singapore", label: "Singapore" },
  { id: "Asia/Hong_Kong", label: "Hong Kong" },
  { id: "Asia/Tokyo", label: "Tokyo (Japan)" },
  { id: "Australia/Sydney", label: "Sydney (Australia)" },
  { id: "Pacific/Auckland", label: "Auckland (New Zealand)" },
  { id: "Africa/Johannesburg", label: "Johannesburg (South Africa)" },
  { id: "America/New_York", label: "New York (US Eastern)" },
  { id: "America/Chicago", label: "Chicago (US Central)" },
  { id: "America/Denver", label: "Denver (US Mountain)" },
  { id: "America/Los_Angeles", label: "Los Angeles (US Pacific)" },
  { id: "America/Toronto", label: "Toronto (Canada)" },
];

/** Offset in minutes of `timeZone` from UTC at the instant `utcMs` (positive = ahead of UTC). */
export function zoneOffsetMinutes(utcMs, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" }).formatToParts(new Date(utcMs));
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
}

/** The UTC instant (ms) at which the wall-clock time `date` + `time` occurs in `timeZone`. */
export function wallTimeToUtc(date, time, timeZone) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const naive = Date.UTC(y, m - 1, d, hh, mm);
  let utc = naive - zoneOffsetMinutes(naive, timeZone) * 60000;
  // A second pass settles the answer when the first guess lands on the other side of a DST change.
  utc = naive - zoneOffsetMinutes(utc, timeZone) * 60000;
  return utc;
}

export function formatOffset(minutes) {
  const sign = minutes < 0 ? "−" : "+";
  const abs = Math.abs(minutes);
  return `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
}

/** Date, time and UTC offset in `timeZone` at the instant `utcMs`. */
export function describeInZone(utcMs, timeZone) {
  const date = new Date(utcMs);
  const dateText = new Intl.DateTimeFormat("en-IN", { timeZone, weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(date);
  const timeText = new Intl.DateTimeFormat("en-IN", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date);
  return { dateText, timeText, offset: formatOffset(zoneOffsetMinutes(utcMs, timeZone)) };
}

export function convertTime({ date, time, from, to }) {
  const utcMs = wallTimeToUtc(date, time, from);
  return { utcMs, source: describeInZone(utcMs, from), target: describeInZone(utcMs, to) };
}
