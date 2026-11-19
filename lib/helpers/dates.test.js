import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { addMonths, countWeekdays, daysBetween, diffYmd, nextBirthday, todayIso, weekdayName } from "./dates";

// fixtures/date-cases.json was generated with Python dateutil.relativedelta (an independent implementation).
describe("diffYmd / daysBetween / countWeekdays vs Python dateutil", () => {
  const cases = JSON.parse(fs.readFileSync(path.join(import.meta.dirname, "fixtures", "date-cases.json"), "utf8"));
  it(`agrees on all ${cases.length} reference date pairs`, () => {
    for (const [start, end, years, months, days, total, weekdays] of cases) {
      expect(diffYmd(start, end), `${start} -> ${end}`).toMatchObject({ years, months, days });
      expect(daysBetween(start, end), `${start} -> ${end}`).toBe(total);
      expect(countWeekdays(start, end), `${start} -> ${end}`).toBe(weekdays);
    }
  });
});

describe("date helpers", () => {
  it("clamps month-end additions", () => {
    expect(addMonths("2024-01-31", 1)).toBe("2024-02-29");
    expect(addMonths("2023-01-31", 1)).toBe("2023-02-28");
    expect(addMonths("2023-11-30", 3)).toBe("2024-02-29");
    expect(addMonths("2023-03-15", -4)).toBe("2022-11-15");
  });
  it("handles same-day and leap-year spans", () => {
    expect(diffYmd("2026-11-11", "2026-11-11")).toMatchObject({ years: 0, months: 0, days: 0 });
    expect(daysBetween("2024-01-01", "2025-01-01")).toBe(366);
    expect(daysBetween("2025-01-01", "2024-01-01")).toBe(-366);
  });
  it("names weekdays without timezone drift", () => {
    expect(weekdayName("2026-11-11")).toBe("Wednesday");
    expect(weekdayName("2000-01-01")).toBe("Saturday");
  });
  it("finds the next birthday, including 29 February", () => {
    expect(nextBirthday("1995-06-15", "2026-11-11")).toEqual({ date: "2027-06-15", daysUntil: 216, turningAge: 32 });
    expect(nextBirthday("1995-11-11", "2026-11-11").daysUntil).toBe(0);
    expect(nextBirthday("2000-02-29", "2026-03-01").date).toBe("2027-02-28");
    expect(nextBirthday("2000-02-29", "2027-03-01").date).toBe("2028-02-29");
  });
  it("todayIso returns a valid ISO date", () => {
    expect(todayIso()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
