import { calculateHeartRateZones, FORMULAS } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Target heart rate calculator",
  fields: [
    { id: "age", label: "Age", suffix: "Yr", min: 10, max: 100, integer: true, default: 30 },
    { id: "resting", label: "Resting heart rate (optional)", suffix: "bpm", min: 30, max: 120, integer: true, default: "", optional: true, emptyValue: 0, hint: "Measure it after waking, before getting out of bed. Adding it uses the Karvonen method." },
    { id: "formula", label: "Maximum heart rate formula", type: "select", default: "tanaka", options: FORMULAS.map((f) => ({ value: f.id, label: f.label })) },
  ],
  run({ age, resting, formula }) {
    const r = calculateHeartRateZones({ age, formulaId: formula, restingHr: resting });
    if (r.error) return { error: r.error };
    return {
      rows: [{ label: "Estimated maximum heart rate", value: `${Math.round(r.max)} bpm`, emphasis: true }, { label: "Method", value: r.method === "karvonen" ? "Karvonen (uses your resting heart rate)" : "Percentage of maximum" }],
      table: { title: "Heart-rate zones", caption: "Beats per minute for each exercise intensity", columns: ["Zone", "Intensity", "Heart rate (bpm)"], rows: r.zones.map((z) => [z.name, `${z.percentLow}–${z.percentHigh}%`, `${Math.round(z.low)}–${Math.round(z.high)}`]) },
      notes: ["Formulas estimate the average person, and your true maximum can differ by 10 bpm or more. Some medicines and conditions change heart rate. Check with your doctor before starting intense exercise."],
    };
  },
};
