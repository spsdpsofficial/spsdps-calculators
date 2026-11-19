/** Body mass index and category under WHO and Asian-Indian (consensus 2009) cut-offs. */
export function bmiValue(weightKg, heightCm) {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function whoCategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function asianCategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 23) return "Normal weight";
  if (bmi < 25) return "Overweight (at risk)";
  return "Obese";
}

/** Weight range (kg) for a height between two BMI values. */
export function weightRange(heightCm, minBmi, maxBmi) {
  const m = heightCm / 100;
  return { min: minBmi * m * m, max: maxBmi * m * m };
}

export function calculateBmi({ weightKg, heightCm }) {
  const bmi = bmiValue(weightKg, heightCm);
  return {
    bmi,
    who: whoCategory(bmi),
    asian: asianCategory(bmi),
    whoRange: weightRange(heightCm, 18.5, 24.9),
    asianRange: weightRange(heightCm, 18.5, 22.9),
  };
}
