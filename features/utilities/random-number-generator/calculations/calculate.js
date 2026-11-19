import { randomBelow } from "@/lib/utilities/random";

export const MAX_COUNT = 1000;
export const MAX_RANGE = 2 ** 32;

/**
 * Random integers in [min, max]. With `unique`, no value repeats (sparse Fisher–Yates, so wide ranges are cheap).
 * `getValues` is injectable for tests.
 */
export function generateNumbers({ min, max, count, unique = false, sorted = false }, getValues) {
  if (![min, max, count].every(Number.isInteger)) return { error: "Minimum, maximum and count must be whole numbers." };
  if (min > max) return { error: "The minimum cannot be greater than the maximum." };
  const range = max - min + 1;
  if (range > MAX_RANGE) return { error: "The range is too wide. Keep the difference between minimum and maximum below about 4.29 billion." };
  if (count < 1 || count > MAX_COUNT) return { error: `Count must be between 1 and ${MAX_COUNT}.` };
  if (unique && count > range) return { error: `You asked for ${count} unique numbers but the range only has ${range}.` };

  let numbers;
  if (unique) {
    const swapped = new Map();
    numbers = [];
    for (let i = 0; i < count; i++) {
      const j = i + randomBelow(range - i, getValues);
      numbers.push(min + (swapped.get(j) ?? j));
      swapped.set(j, swapped.get(i) ?? i);
    }
  } else {
    numbers = Array.from({ length: count }, () => min + randomBelow(range, getValues));
  }
  if (sorted) numbers.sort((a, b) => a - b);
  return { numbers };
}
