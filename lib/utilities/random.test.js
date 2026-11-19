import { describe, expect, it } from "vitest";
import { randomBelow, randomInt, shuffle } from "./random";

/** Deterministic stand-in for crypto.getRandomValues. */
const sequence = (values) => {
  let i = 0;
  return (array) => {
    array[0] = values[i++ % values.length];
    return array;
  };
};

describe("random helpers", () => {
  it("maps values into range", () => {
    expect(randomBelow(10, sequence([25]))).toBe(5);
    expect(randomInt(5, 7, sequence([4]))).toBe(6);
  });
  it("rejects values that would cause modulo bias", () => {
    // For max = 3, 2^32 % 3 = 1 so the value 4294967295 must be rejected and the next one used.
    expect(randomBelow(3, sequence([4294967295, 7]))).toBe(1);
  });
  it("validates its argument", () => {
    expect(() => randomBelow(0)).toThrow(RangeError);
    expect(() => randomBelow(1.5)).toThrow(RangeError);
  });
  it("is roughly uniform with the real generator", () => {
    const counts = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 60000; i++) counts[randomBelow(6)]++;
    for (const c of counts) expect(Math.abs(c - 10000)).toBeLessThan(600);
  });
  it("shuffle keeps the same items", () => {
    expect(shuffle([1, 2, 3, 4, 5]).sort()).toEqual([1, 2, 3, 4, 5]);
  });
});
