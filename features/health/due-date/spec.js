import { formatDateLong } from "@/lib/formatters";
import { todayIso, weekdayName } from "@/lib/helpers/dates";
import { calculateDueDate } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Pregnancy due date calculator",
  usesToday: true,
  fields: [
    { id: "lmp", label: "First day of your last period", type: "date", default: "2026-01-10" },
    { id: "cycle", label: "Average cycle length", suffix: "Days", min: 21, max: 45, integer: true, default: 28 },
    { id: "asOf", label: "Show progress on this date", type: "date", optional: true, default: "", hint: "Leave empty to use today's date." },
  ],
  run({ lmp, cycle, asOf }) {
    const date = asOf || todayIso();
    const r = calculateDueDate({ lmp, cycleLength: cycle, asOf: date });
    const rows = [
      { label: "Estimated due date", value: `${formatDateLong(r.dueDate)} (${weekdayName(r.dueDate)})`, emphasis: true },
      { label: "Estimated conception around", value: formatDateLong(r.conception) },
    ];
    if (r.status === "pregnant") {
      rows.push(
        { label: `Pregnancy on ${formatDateLong(date)}`, value: `${r.weeks} weeks ${r.days} days (trimester ${r.trimester})` },
        { label: "Days to go", value: String(r.daysRemaining) },
        ...r.milestones.map((m) => ({ label: m.label, value: formatDateLong(m.date) })),
      );
    } else if (r.status === "future") rows.push({ label: "Progress", value: "The chosen date is before your last period." });
    else rows.push({ label: "Progress", value: "The chosen date is more than 43 weeks after your last period." });
    return { rows, notes: ["Only about 4–5 in 100 babies arrive on the estimated due date. Most are born within two weeks either side. This is an estimate, not medical advice. Your doctor will confirm dates with an ultrasound."] };
  },
};
