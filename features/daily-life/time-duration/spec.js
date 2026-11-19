import { formatNumber } from "@/lib/formatters";
import { calculateTimeDuration, formatDuration } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Time duration calculator",
  fields: [
    { id: "start", label: "Start time", type: "time", default: "09:30" },
    { id: "end", label: "End time", type: "time", default: "18:15" },
    { id: "breakMinutes", label: "Break to subtract", default: 45, min: 0, max: 1440, integer: true, suffix: "min", optional: true, emptyValue: 0 },
  ],
  run({ start, end, breakMinutes }) {
    const r = calculateTimeDuration({ start, end, breakMinutes });
    if (r.error) return { error: r.error };
    return {
      rows: [
        { label: "Time worked", value: formatDuration(r.netMinutes), emphasis: true },
        { label: "In decimal hours", value: `${formatNumber(r.netHours)} hours` },
        { label: "In minutes", value: formatNumber(r.netMinutes) },
        { label: "Before break", value: formatDuration(r.grossMinutes) },
      ],
      notes: r.overnight ? ["The end time is earlier than the start time, so the span crosses midnight."] : [],
    };
  },
};
