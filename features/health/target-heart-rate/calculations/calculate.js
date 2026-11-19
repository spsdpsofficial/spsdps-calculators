export const FORMULAS = [
  { id: "tanaka", label: "Tanaka: 208 − 0.7 × age", max: (age) => 208 - 0.7 * age },
  { id: "classic", label: "Classic: 220 − age", max: (age) => 220 - age },
];

export const ZONES = [
  { name: "Very light (warm-up)", low: 50, high: 60 },
  { name: "Light (fat burn)", low: 60, high: 70 },
  { name: "Moderate (aerobic)", low: 70, high: 80 },
  { name: "Hard (threshold)", low: 80, high: 90 },
  { name: "Maximum effort", low: 90, high: 100 },
];

/** Heart-rate zones. With a resting heart rate, uses the Karvonen method (heart-rate reserve). */
export function calculateHeartRateZones({ age, formulaId, restingHr = 0 }) {
  const formula = FORMULAS.find((f) => f.id === formulaId);
  if (!formula) throw new Error(`Unknown formula: ${formulaId}`);
  const max = formula.max(age);
  const useReserve = restingHr > 0;
  if (useReserve && restingHr >= max) return { max, error: "Resting heart rate must be lower than the maximum heart rate." };
  const at = (percent) => (useReserve ? restingHr + (percent / 100) * (max - restingHr) : (percent / 100) * max);
  return { max, method: useReserve ? "karvonen" : "percent-of-max", zones: ZONES.map((z) => ({ name: z.name, percentLow: z.low, percentHigh: z.high, low: at(z.low), high: at(z.high) })) };
}
