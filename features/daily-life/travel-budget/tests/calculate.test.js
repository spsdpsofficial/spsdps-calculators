import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateTravelBudget } from "../calculations/calculate";
import { initialValues, validateFields } from "@/lib/forms/validateFields";

const base = { people: 2, nights: 3, transportPerPerson: 6000, stayPerRoomNight: 3500, rooms: 1, foodPerPersonDay: 1200, localPerDay: 1500, activities: 3000, bufferPercent: 10 };

describe("calculateTravelBudget", () => {
  it("default trip: subtotal ₹41,100, buffer ₹4,110, total ₹45,210", () => {
    const r = calculateTravelBudget(base);
    expect(r.days).toBe(4);
    expect(r.lines.map((l) => l.amount)).toEqual([12000, 10500, 9600, 6000, 3000]);
    expect(r.subtotal).toBe(41100);
    expect(r.total).toBeCloseTo(45210, 2);
    expect(r.perPerson).toBeCloseTo(22605, 2);
    expect(r.perDay).toBeCloseTo(11302.5, 2);
  });
  it("zero buffer leaves the subtotal", () => {
    expect(calculateTravelBudget({ ...base, bufferPercent: 0 }).total).toBe(41100);
  });
});

describe("Travel spec", () => {
  it("rejects fractional travellers and zero rooms", () => {
    const raw = initialValues(spec.fields);
    expect(validateFields(spec.fields, raw).valid).toBe(true);
    expect(validateFields(spec.fields, { ...raw, people: "1.5" }).valid).toBe(false);
    expect(validateFields(spec.fields, { ...raw, rooms: "0" }).valid).toBe(false);
  });
  it("page example matches", () => {
    expect(calculateTravelBudget(content.example.expected.input).total).toBeCloseTo(content.example.expected.total, 2);
  });
});
