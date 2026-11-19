/** U.S. Navy circumference method (Hodgdon & Beckett), metric form. Returns { error } on impossible measurements. */
const log = Math.log10;

export function navyBodyFat({ sex, heightCm, neckCm, waistCm, hipCm = 0 }) {
  let density;
  if (sex === "male") {
    if (waistCm <= neckCm) return { error: "Waist must be larger than neck for this method." };
    density = 1.0324 - 0.19077 * log(waistCm - neckCm) + 0.15456 * log(heightCm);
  } else {
    if (waistCm + hipCm <= neckCm) return { error: "Waist plus hip must be larger than neck for this method." };
    density = 1.29579 - 0.35004 * log(waistCm + hipCm - neckCm) + 0.221 * log(heightCm);
  }
  const percent = 495 / density - 450;
  if (!Number.isFinite(percent) || percent < 2 || percent > 70) return { error: "These measurements give an unrealistic result. Please re-measure." };
  return { percent };
}

/** American Council on Exercise categories. */
export function bodyFatCategory(sex, percent) {
  const bands = sex === "male"
    ? [[6, "Essential fat"], [14, "Athletes"], [18, "Fitness"], [25, "Average"]]
    : [[14, "Essential fat"], [21, "Athletes"], [25, "Fitness"], [32, "Average"]];
  const hit = bands.find(([limit]) => percent < limit);
  return hit ? hit[1] : "Obese range";
}

export function calculateBodyFat({ sex, weightKg, ...measurements }) {
  const r = navyBodyFat({ sex, ...measurements });
  if (r.error) return r;
  const fatMass = (weightKg * r.percent) / 100;
  return { percent: r.percent, category: bodyFatCategory(sex, r.percent), fatMass, leanMass: weightKg - fatMass };
}
