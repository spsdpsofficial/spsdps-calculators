import { randomBelow } from "@/lib/utilities/random";

export const SIDES = [4, 6, 8, 10, 12, 20, 100];
export const MAX_DICE = 20;
export const MAX_FLIPS = 100;

/** Roll `count` dice with `sides` faces. `getValues` is injectable for tests. */
export function rollDice({ count, sides }, getValues) {
  if (!Number.isInteger(count) || count < 1 || count > MAX_DICE) return { error: `Roll between 1 and ${MAX_DICE} dice.` };
  if (!SIDES.includes(sides)) return { error: "Choose a die with 4, 6, 8, 10, 12, 20 or 100 sides." };
  const rolls = Array.from({ length: count }, () => 1 + randomBelow(sides, getValues));
  return { rolls, total: rolls.reduce((a, b) => a + b, 0), min: count, max: count * sides };
}

/** Flip a coin `count` times. */
export function flipCoins({ count }, getValues) {
  if (!Number.isInteger(count) || count < 1 || count > MAX_FLIPS) return { error: `Flip between 1 and ${MAX_FLIPS} coins.` };
  const flips = Array.from({ length: count }, () => (randomBelow(2, getValues) === 0 ? "Heads" : "Tails"));
  const heads = flips.filter((f) => f === "Heads").length;
  return { flips, heads, tails: count - heads };
}
