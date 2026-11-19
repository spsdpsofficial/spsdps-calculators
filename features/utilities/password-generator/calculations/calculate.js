import { randomBelow, shuffle } from "@/lib/utilities/random";

export const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};
const AMBIGUOUS = /[Il1O0o]/g;

export const MIN_LENGTH = 4;
export const MAX_LENGTH = 128;

/** Character sets chosen by the options, with look-alike characters optionally removed. */
export function buildSets({ lower, upper, digits, symbols, avoidAmbiguous }) {
  const chosen = { lower, upper, digits, symbols };
  return Object.entries(chosen)
    .filter(([, on]) => on)
    .map(([key]) => (avoidAmbiguous ? SETS[key].replace(AMBIGUOUS, "") : SETS[key]));
}

/**
 * Generate a password with the browser's cryptographic random generator.
 * At least one character from every chosen set is guaranteed; the rest come from the whole pool, then all are shuffled.
 */
export function generatePassword(options, getValues) {
  const { length } = options;
  if (!Number.isInteger(length) || length < MIN_LENGTH || length > MAX_LENGTH) return { error: `Length must be a whole number from ${MIN_LENGTH} to ${MAX_LENGTH}.` };
  const sets = buildSets(options);
  if (sets.length === 0) return { error: "Choose at least one type of character." };
  if (length < sets.length) return { error: "The length is too short for the character types chosen." };
  const pool = sets.join("");
  const pick = (chars) => chars[randomBelow(chars.length, getValues)];
  const chars = sets.map(pick);
  while (chars.length < length) chars.push(pick(pool));
  shuffle(chars, getValues);
  return { password: chars.join(""), poolSize: pool.length, entropyBits: length * Math.log2(pool.length) };
}

/** Plain-language strength from entropy in bits. */
export function strengthLabel(bits) {
  if (bits < 40) return "Weak";
  if (bits < 60) return "Fair";
  if (bits < 80) return "Strong";
  return "Very strong";
}
