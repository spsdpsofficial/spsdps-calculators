/**
 * Parse text typed by a person into a finite number, or NaN.
 * Accepts rupee symbol, spaces and Indian/Western comma grouping: "₹ 10,00,000" -> 1000000.
 * Rejects empty text, exponents ("1e5"), signs and anything non-numeric.
 */
export function parseNumber(text) {
  if (typeof text === "number") return Number.isFinite(text) ? text : Number.NaN;
  if (typeof text !== "string") return Number.NaN;
  const cleaned = text.replace(/[₹,\s]/g, "");
  if (!/^\d*\.?\d+$|^\d+\.$/.test(cleaned)) return Number.NaN;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : Number.NaN;
}

/** Keep only digits and a single decimal point while the person is typing. */
export function sanitizeNumericInput(text) {
  const stripped = String(text).replace(/[^\d.]/g, "");
  const firstDot = stripped.indexOf(".");
  if (firstDot === -1) return stripped;
  return stripped.slice(0, firstDot + 1) + stripped.slice(firstDot + 1).replace(/\./g, "");
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Round to a fixed number of decimals without string round-trips (for display-only use). */
export function roundTo(value, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
