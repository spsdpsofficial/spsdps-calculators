/** Daily calories using the Mifflin–St Jeor equation and standard activity multipliers. */
export const ACTIVITY_LEVELS = [
  { value: "1.2", label: "Sedentary (little or no exercise)" },
  { value: "1.375", label: "Lightly active (1–3 days a week)" },
  { value: "1.55", label: "Moderately active (3–5 days a week)" },
  { value: "1.725", label: "Very active (6–7 days a week)" },
  { value: "1.9", label: "Extra active (hard training or physical job)" },
];

/** Calories per day relative to maintenance, for a weekly change of 0.25 or 0.5 kg (7,700 kcal ≈ 1 kg). */
export const GOALS = [
  { value: "0", label: "Maintain weight" },
  { value: "-550", label: "Lose about 0.5 kg a week" },
  { value: "-275", label: "Lose about 0.25 kg a week" },
  { value: "275", label: "Gain about 0.25 kg a week" },
  { value: "550", label: "Gain about 0.5 kg a week" },
];

export function bmr({ sex, weightKg, heightCm, age }) {
  return 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161);
}

export function calculateCalories({ sex, weightKg, heightCm, age, activity, adjustment }) {
  const basal = bmr({ sex, weightKg, heightCm, age });
  const maintenance = basal * activity;
  const target = maintenance + adjustment;
  return { bmr: basal, maintenance, target, belowBmr: target < basal, belowFloor: target < 1200 };
}
