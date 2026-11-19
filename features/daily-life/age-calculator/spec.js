import { formatDateLong, formatNumber } from "@/lib/formatters";
import { todayIso } from "@/lib/helpers/dates";
import { calculateAge } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Age calculator",
  usesToday: true,
  fields: [
    { id: "dob", label: "Date of birth", type: "date", default: "1995-06-15" },
    { id: "asOf", label: "Age on this date", type: "date", optional: true, default: "", hint: "Leave empty to use today's date." },
  ],
  run({ dob, asOf }) {
    const date = asOf || todayIso();
    const r = calculateAge({ dob, asOf: date });
    if (r.error) return { error: r.error };
    return {
      rows: [
        { label: "Your age", value: `${r.years} years, ${r.months} months, ${r.days} days`, emphasis: true },
        { label: "Age calculated on", value: formatDateLong(date) },
        { label: "Total months", value: formatNumber(r.totalMonths) },
        { label: "Total weeks", value: formatNumber(r.totalWeeks) },
        { label: "Total days", value: formatNumber(r.totalDays) },
        { label: "Born on a", value: r.bornOn },
        { label: "Next birthday", value: `${formatDateLong(r.next.date)} (${r.nextWeekday})` },
        { label: "Days until next birthday", value: r.next.daysUntil === 0 ? "Today!" : formatNumber(r.next.daysUntil) },
        { label: "Turning", value: String(r.next.turningAge) },
      ],
      notes: ["A 29 February birthday is counted on 28 February in non-leap years."],
    };
  },
};
