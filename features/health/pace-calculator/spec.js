import { formatNumber } from "@/lib/formatters";
import { calculatePace, formatDuration, formatPace } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Running pace calculator",
  fields: [
    { id: "distance", label: "Distance", suffix: "km", min: 0.1, max: 1000, default: 10, step: "any" },
    { id: "h", label: "Hours", suffix: "h", min: 0, max: 99, integer: true, default: 0, optional: true, emptyValue: 0 },
    { id: "m", label: "Minutes", suffix: "min", min: 0, max: 59, integer: true, default: 55, optional: true, emptyValue: 0 },
    { id: "s", label: "Seconds", suffix: "s", min: 0, max: 59, integer: true, default: 0, optional: true, emptyValue: 0 },
  ],
  run({ distance, h, m, s }) {
    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0) return { error: "Enter a time greater than zero." };
    const r = calculatePace({ distanceKm: distance, totalSeconds });
    return {
      rows: [
        { label: "Pace per kilometre", value: `${formatPace(r.secondsPerKm)} min/km`, emphasis: true },
        { label: "Pace per mile", value: `${formatPace(r.secondsPerMile)} min/mile` },
        { label: "Speed", value: `${formatNumber(r.speedKmh, { maxDecimals: 2 })} km/h` },
      ],
      table: { title: "Projected times at this pace", caption: "Assumes you hold the same pace for the whole distance", columns: ["Distance", "Time"], rows: r.predictions.map((p) => [p.label, formatDuration(p.seconds)]) },
      notes: ["Projections assume an even pace. Longer races are usually slower than a short-race pace suggests."],
    };
  },
};
