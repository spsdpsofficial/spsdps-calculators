import { ZONES, convertTime } from "./calculations/calculate";

const zoneOptions = ZONES.map((z) => ({ value: z.id, label: z.label }));
const labelOf = (id) => ZONES.find((z) => z.id === id)?.label ?? id;

export const spec = {
  ariaLabel: "Time zone converter",
  fields: [
    { id: "date", label: "Date", type: "date", default: "2026-11-13" },
    { id: "time", label: "Time", type: "time", default: "10:00" },
    { id: "from", label: "From", type: "select", default: "Asia/Kolkata", options: zoneOptions },
    { id: "to", label: "To", type: "select", default: "America/New_York", options: zoneOptions },
  ],
  run({ date, time, from, to }) {
    const r = convertTime({ date, time, from, to });
    return {
      rows: [
        { label: `Time in ${labelOf(to)}`, value: `${r.target.timeText}, ${r.target.dateText}`, emphasis: true },
        { label: "Offset there", value: r.target.offset },
        { label: `Your time in ${labelOf(from)}`, value: `${r.source.timeText}, ${r.source.dateText}` },
        { label: "Offset here", value: r.source.offset },
      ],
      notes: ["Daylight saving time is applied automatically for the date you choose. Some places change their rules, so confirm important meeting times."],
    };
  },
};
