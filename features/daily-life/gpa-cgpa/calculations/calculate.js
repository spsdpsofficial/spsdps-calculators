export const DEFAULT_FACTOR = 9.5; // CBSE and many Indian universities: Percentage = CGPA × 9.5

export const cgpaToPercent = (cgpa, factor = DEFAULT_FACTOR) => cgpa * factor;
export const percentToCgpa = (percent, factor = DEFAULT_FACTOR) => percent / factor;

/** Parses "8.2, 7.9 8.5" into numbers. Returns { values } or { error }. */
export function parseGrades(text, max = 10) {
  const parts = text.split(/[\s,;]+/).filter(Boolean);
  if (parts.length === 0) return { error: "Enter at least one grade point." };
  const values = parts.map(Number);
  const bad = parts.find((p, i) => !Number.isFinite(values[i]) || values[i] < 0 || values[i] > max);
  if (bad !== undefined) return { error: `"${bad}" is not a valid grade point between 0 and ${max}.` };
  return { values };
}

/** Average of semester grade points, assuming equal credits per semester. */
export function averageGrades(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}
