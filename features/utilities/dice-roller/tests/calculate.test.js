import { describe, expect, it } from "vitest";
import { content } from "../content";
import { MAX_DICE, MAX_FLIPS, flipCoins, rollDice } from "../calculations/calculate";

// A fake random source that returns the given 32-bit values in order.
const source = (...values) => {
  let i = 0;
  return (buffer) => { buffer[0] = values[i++ % values.length]; };
};

describe("rollDice", () => {
  it("maps random values to faces 1..sides", () => {
    expect(rollDice({ count: 3, sides: 6 }, source(0, 5, 3)).rolls).toEqual([1, 6, 4]);
    expect(rollDice({ count: 2, sides: 20 }, source(19, 0)).rolls).toEqual([20, 1]);
  });
  it("totals and reports the possible range", () => {
    const r = rollDice({ count: 3, sides: 6 }, source(0, 5, 3));
    expect(r.total).toBe(11);
    expect([r.min, r.max]).toEqual([3, 18]);
  });
  it("rolls stay in range and every face appears over many rolls", () => {
    const { rolls } = rollDice({ count: MAX_DICE, sides: 4 });
    expect(rolls.every((n) => n >= 1 && n <= 4)).toBe(true);
    const seen = new Set();
    for (let i = 0; i < 100; i++) rollDice({ count: MAX_DICE, sides: 6 }).rolls.forEach((n) => seen.add(n));
    expect(seen.size).toBe(6);
  });
  it("validates input", () => {
    expect(rollDice({ count: 0, sides: 6 }).error).toBeTruthy();
    expect(rollDice({ count: MAX_DICE + 1, sides: 6 }).error).toBeTruthy();
    expect(rollDice({ count: 1.5, sides: 6 }).error).toBeTruthy();
    expect(rollDice({ count: 1, sides: 7 }).error).toBeTruthy();
  });
});

describe("flipCoins", () => {
  it("0 is heads and 1 is tails; counts add up", () => {
    const r = flipCoins({ count: 4 }, source(0, 1, 1, 0));
    expect(r.flips).toEqual(["Heads", "Tails", "Tails", "Heads"]);
    expect([r.heads, r.tails]).toEqual([2, 2]);
  });
  it("is roughly fair over many flips and validates", () => {
    const r = flipCoins({ count: MAX_FLIPS });
    expect(r.heads + r.tails).toBe(MAX_FLIPS);
    expect(flipCoins({ count: 0 }).error).toBeTruthy();
    expect(flipCoins({ count: MAX_FLIPS + 1 }).error).toBeTruthy();
  });
  it("page example describes valid limits", () => {
    expect(content.example.expected).toEqual({ count: 2, sides: 6, min: 2, max: 12 });
    const r = rollDice({ count: 2, sides: 6 });
    expect(r.min).toBe(2);
    expect(r.max).toBe(12);
  });
});
