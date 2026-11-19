/**
 * Rule-of-thumb daily fluid estimate: 35 ml per kg body weight, plus 350 ml per 30 minutes of exercise,
 * plus 500 ml in hot or humid weather. These are common guideline figures, not clinical prescriptions.
 */
export const ML_PER_KG = 35;
export const ML_PER_30_MIN_EXERCISE = 350;
export const HOT_WEATHER_ML = 500;
export const GLASS_ML = 250;

export function calculateWaterIntake({ weightKg, exerciseMinutes, hot }) {
  const base = weightKg * ML_PER_KG;
  const exercise = (exerciseMinutes / 30) * ML_PER_30_MIN_EXERCISE;
  const climate = hot ? HOT_WEATHER_ML : 0;
  const totalMl = base + exercise + climate;
  return { base, exercise, climate, totalMl, litres: totalMl / 1000, glasses: Math.ceil(totalMl / GLASS_ML) };
}
