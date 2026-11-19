import { formatNumber } from "@/lib/formatters";
import { calculateDateDifference } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Date difference calculator",
  fields: [
    { id: "start", label: "Start date", type: "date", default: "2026-01-01" },
    { id: "end", label: "End date", type: "date", default: "2026-12-31" },
    {
      id: "include",
      label: "Count the end date too?",
      type: "select",
      default: "no",
      options: [
        { value: "no", label: "No (difference between the dates)" },
        { value: "yes", label: "Yes (include both first and last day)" },
      ],
    },
  ],
  run({ start, end, include }) {
    const r = calculateDateDifference({ start, end, includeEnd: include === "yes" });
    return {
      rows: [
        { label: "Difference", value: `${r.years} years, ${r.months} months, ${r.days} days`, emphasis: true },
        { label: "Total days", value: formatNumber(r.totalDays) },
        { label: "In weeks", value: `${formatNumber(r.weeks)} weeks and ${r.extraDays} days` },
        { label: "Weekdays (Mon–Fri, both dates counted)", value: formatNumber(r.weekdays) },
        { label: "Weekend days (Sat–Sun)", value: formatNumber(r.weekendDays) },
      ],
      notes: r.reversed ? ["The end date is before the start date, so the dates were swapped to show a positive difference."] : ["Weekday counts do not exclude public holidays."],
    };
  },
};
