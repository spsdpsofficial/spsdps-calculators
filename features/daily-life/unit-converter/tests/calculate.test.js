import { describe, expect, it } from "vitest";
import { content } from "../content";
import { CATEGORIES, convert, convertAll, unitOptions } from "../calculations/calculate";

describe("convert", () => {
  it("length", () => {
    expect(convert("length", "km", "m", 5).value).toBe(5000);
    expect(convert("length", "ft", "in", 1).value).toBeCloseTo(12, 10);
    expect(convert("length", "mi", "km", 1).value).toBeCloseTo(1.609344, 9);
  });
  it("weight", () => {
    expect(convert("weight", "kg", "lb", 1).value).toBeCloseTo(2.2046226, 6);
    expect(convert("weight", "tola", "g", 1).value).toBeCloseTo(11.6638038, 7);
    expect(convert("weight", "quintal", "kg", 2).value).toBe(200);
  });
  it("area, volume, speed, data", () => {
    expect(convert("area", "acre", "sqft", 1).value).toBeCloseTo(43560, 4);
    expect(convert("area", "hectare", "acre", 1).value).toBeCloseTo(2.4710538, 6);
    expect(convert("volume", "usgal", "l", 1).value).toBeCloseTo(3.785411784, 9);
    expect(convert("speed", "kmh", "ms", 36).value).toBeCloseTo(10, 10);
    expect(convert("speed", "mph", "kmh", 60).value).toBeCloseTo(96.56064, 5);
    expect(convert("data", "gb", "mb", 1).value).toBe(1024);
  });
  it("temperature", () => {
    expect(convert("temperature", "c", "f", 100).value).toBeCloseTo(212, 10);
    expect(convert("temperature", "f", "c", -40).value).toBeCloseTo(-40, 10);
    expect(convert("temperature", "k", "c", -1).error).toBeTruthy();
    expect(convert("temperature", "c", "k", 0).value).toBeCloseTo(273.15, 10);
  });
  it("same unit is identity and unknown units error", () => {
    expect(convert("length", "m", "m", 7.5).value).toBe(7.5);
    expect(convert("length", "m", "zz", 1).error).toBeTruthy();
    expect(convert("nope", "m", "m", 1).error).toBeTruthy();
  });
  it("convertAll lists every unit; options match", () => {
    for (const key of Object.keys(CATEGORIES)) {
      expect(convertAll(key, unitOptions(key)[0].value, 1)).toHaveLength(unitOptions(key).length);
    }
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(convert(e.category, e.from, e.to, e.value).value).toBeCloseTo(e.answer, 4);
  });
});
