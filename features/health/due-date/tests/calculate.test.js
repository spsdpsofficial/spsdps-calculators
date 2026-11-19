import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculateDueDate } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculateDueDate", () => {
  it("LMP 10 Jan 2026, 28-day cycle → due 17 Oct 2026 (Python reference)", () => {
    const r = calculateDueDate({ lmp: "2026-01-10", cycleLength: 28, asOf: "2026-04-18" });
    expect(r.dueDate).toBe("2026-10-17");
    expect(r).toMatchObject({ status: "pregnant", weeks: 14, days: 0, trimester: 2, daysRemaining: 182 });
    expect(r.conception).toBe("2026-01-24");
  });
  it("a 32-day cycle shifts the due date by 4 days", () => {
    expect(calculateDueDate({ lmp: "2026-01-10", cycleLength: 32, asOf: "2026-02-01" }).dueDate).toBe("2026-10-21");
  });
  it("trimester boundaries", () => {
    const t = (asOf) => calculateDueDate({ lmp: "2026-01-10", asOf }).trimester;
    expect(t("2026-04-10")).toBe(1); // day 90 = 12w6d
    expect(t("2026-04-11")).toBe(2); // day 91 = 13w0d
    expect(t("2026-07-18")).toBe(3); // day 189 = 27w0d
  });
  it("reports dates before the LMP or long after", () => {
    expect(calculateDueDate({ lmp: "2026-01-10", asOf: "2026-01-01" }).status).toBe("future");
    expect(calculateDueDate({ lmp: "2026-01-10", asOf: "2027-06-01" }).status).toBe("over");
  });
});

describe("Due date spec", () => {
  it("runs with an explicit date and validates", () => {
    const raw = { asOf: "2026-04-18" };
    expect(runSpec(spec, raw).out.rows[0].value).toBe("17 October 2026 (Saturday)");
    expect(isRejected(spec, { cycle: "10" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(calculateDueDate(e.input).dueDate).toBe(e.dueDate);
  });
});
