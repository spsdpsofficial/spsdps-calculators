import { formatDateLong } from "@/lib/formatters";
import { describeDate } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Day of the week calculator",
  fields: [{ id: "date", label: "Date", type: "date", default: "1947-08-15" }],
  run({ date }) {
    const r = describeDate(date);
    return {
      rows: [
        { label: formatDateLong(date), value: r.weekday, emphasis: true },
        { label: "Day of the year", value: `${r.dayOfYear} of ${r.daysInYear}` },
        { label: "ISO week number", value: `Week ${r.isoWeek} of ${r.isoWeekYear}` },
        { label: "Quarter", value: `Q${r.quarter}` },
        { label: "Leap year?", value: r.leap ? "Yes" : "No" },
      ],
      notes: ["Uses the Gregorian calendar for every date, including dates before it was adopted in different places."],
    };
  },
};
