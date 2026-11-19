// Typical daily protein ranges in grams per kg of body weight. General guidance, not a prescription.
export const GOALS = [
  { id: "sedentary", label: "Sedentary adult", low: 0.8, high: 1.0 },
  { id: "older", label: "Adult over 60", low: 1.0, high: 1.2 },
  { id: "active", label: "Regular exercise or sport", low: 1.2, high: 1.6 },
  { id: "strength", label: "Strength training or muscle gain", low: 1.6, high: 2.2 },
];

export function calculateProtein({ weightKg, goalId, meals }) {
  const goal = GOALS.find((g) => g.id === goalId);
  if (!goal) throw new Error(`Unknown goal: ${goalId}`);
  const low = weightKg * goal.low;
  const high = weightKg * goal.high;
  return { goal, low, high, perMealLow: low / meals, perMealHigh: high / meals };
}
