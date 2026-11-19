// Cryptographically secure random helpers shared by the password and random-number tools.
// Uses crypto.getRandomValues with rejection sampling, so results have no modulo bias.

/** Uniform integer in [0, max) for 1 <= max <= 2^32. `getValues` is injectable for tests. */
export function randomBelow(max, getValues = (a) => crypto.getRandomValues(a)) {
  if (!Number.isInteger(max) || max < 1 || max > 2 ** 32) throw new RangeError("max must be an integer between 1 and 2^32");
  const limit = 2 ** 32 - (2 ** 32 % max); // reject values that would skew the distribution
  const buffer = new Uint32Array(1);
  for (;;) {
    getValues(buffer);
    if (buffer[0] < limit) return buffer[0] % max;
  }
}

/** Uniform integer in [min, max] (inclusive). The range may be up to 2^32 values wide. */
export function randomInt(min, max, getValues) {
  return min + randomBelow(max - min + 1, getValues);
}

/** In-place Fisher–Yates shuffle. */
export function shuffle(items, getValues) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = randomBelow(i + 1, getValues);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
