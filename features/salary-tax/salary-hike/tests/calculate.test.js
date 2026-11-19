import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateHike } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

describe("calculateHike", () => {
  it("10% on ₹6,00,000 = ₹6,60,000", () => {
    const r = calculateHike({ current: 600000, mode: "percent", hikePercent: 10 });
    expect(r.revised).toBeCloseTo(660000, 6);
    expect(r.increase).toBeCloseTo(60000, 6);
  });
  it("reverse: ₹6,00,000 to ₹7,20,000 is a 20% hike", () => {
    expect(calculateHike({ current: 600000, mode: "amount", newSalary: 720000 }).hikePercent).toBeCloseTo(20, 8);
  });
  it("a lower new salary gives a negative hike", () => {
    expect(calculateHike({ current: 100, mode: "amount", newSalary: 90 }).hikePercent).toBeCloseTo(-10, 8);
  });
  it("0% hike changes nothing", () => {
    expect(calculateHike({ current: 500, mode: "percent", hikePercent: 0 }).increase).toBe(0);
  });
});

describe("Salary hike spec", () => {
  it("runs both modes, handles monthly input and hides the inactive field", () => {
    const raw = initialValues(spec.fields);
    const { valid, values } = validateFields(spec.fields, raw);
    expect(valid).toBe(true);
    expect(spec.run(values, raw).rows[1].value).toContain("6,60,000");
    const monthly = spec.run({ ...values, current: 50000, period: "month" }, raw);
    expect(monthly.rows[1].value).toContain("6,60,000");
    const reverse = { ...raw, mode: "amount" };
    const parsed = validateFields(spec.fields, reverse);
    expect("hike" in parsed.values).toBe(false);
    expect(spec.run(parsed.values, reverse).rows[0].value).toBe("20%");
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateHike(e.input).revised).toBeCloseTo(e.revised, 6);
  });
});
