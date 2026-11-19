import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateTimeDuration, formatDuration, toMinutes } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateTimeDuration", () => {
  it("09:30 → 18:15 minus 45 min is 8h 0m", () => {
    const r = calculateTimeDuration({ start: "09:30", end: "18:15", breakMinutes: 45 });
    expect(r).toMatchObject({ grossMinutes: 525, netMinutes: 480, netHours: 8, overnight: false });
    expect(formatDuration(r.netMinutes)).toBe("8h 0m");
  });
  it("handles overnight spans", () => {
    const r = calculateTimeDuration({ start: "22:00", end: "06:30" });
    expect(r).toMatchObject({ overnight: true, netMinutes: 510 });
  });
  it("same time is zero", () => {
    expect(calculateTimeDuration({ start: "10:00", end: "10:00" }).netMinutes).toBe(0);
  });
  it("rejects a break longer than the span", () => {
    expect(calculateTimeDuration({ start: "10:00", end: "11:00", breakMinutes: 90 }).error).toBeTruthy();
  });
  it("toMinutes", () => expect(toMinutes("00:00")).toBe(0));
});

describe("Time spec", () => {
  it("runs with defaults, empty break means zero, bad time rejected", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[0].value).toBe("8h 0m");
    expect(validateFields(spec.fields, { ...raw, breakMinutes: "" }).values.breakMinutes).toBe(0);
    expect(validateFields(spec.fields, { ...raw, start: "25:00" }).valid).toBe(false);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateTimeDuration(e.input).netMinutes).toBe(e.netMinutes);
  });
});
