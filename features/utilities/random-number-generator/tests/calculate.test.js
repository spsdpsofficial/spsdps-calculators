import { describe, expect, it } from "vitest";
import { content } from "../content";
import { MAX_COUNT, generateNumbers } from "../calculations/calculate";

describe("generateNumbers", () => {
  it("returns the requested count within range", () => {
    const { numbers } = generateNumbers({ min: 5, max: 9, count: 500 });
    expect(numbers).toHaveLength(500);
    expect(numbers.every((n) => n >= 5 && n <= 9)).toBe(true);
    expect(new Set(numbers).size).toBe(5);
  });
  it("supports negative ranges and a single-value range", () => {
    expect(generateNumbers({ min: -3, max: -3, count: 3 }).numbers).toEqual([-3, -3, -3]);
    expect(generateNumbers({ min: -10, max: -5, count: 50 }).numbers.every((n) => n >= -10 && n <= -5)).toBe(true);
  });
  it("unique numbers never repeat and can use the whole range", () => {
    const { numbers } = generateNumbers({ min: 1, max: 10, count: 10, unique: true, sorted: true });
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const wide = generateNumbers({ min: 0, max: 4_000_000_000, count: 1000, unique: true }).numbers;
    expect(new Set(wide).size).toBe(1000);
  });
  it("sorts when asked", () => {
    const { numbers } = generateNumbers({ min: 1, max: 100, count: 50, sorted: true });
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
  });
  it("validates input", () => {
    expect(generateNumbers({ min: 1.5, max: 5, count: 1 }).error).toBeTruthy();
    expect(generateNumbers({ min: 9, max: 1, count: 1 }).error).toMatch(/minimum/);
    expect(generateNumbers({ min: 1, max: 5, count: 6, unique: true }).error).toMatch(/unique/);
    expect(generateNumbers({ min: 1, max: 5, count: 0 }).error).toBeTruthy();
    expect(generateNumbers({ min: 1, max: 5, count: MAX_COUNT + 1 }).error).toBeTruthy();
    expect(generateNumbers({ min: 0, max: 2 ** 33, count: 1 }).error).toMatch(/too wide/);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    const { numbers } = generateNumbers(e.input);
    expect(numbers).toHaveLength(e.count);
    expect(new Set(numbers).size).toBe(e.count);
  });
});
