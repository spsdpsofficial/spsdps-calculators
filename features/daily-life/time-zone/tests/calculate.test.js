import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { convertTime, formatOffset, wallTimeToUtc, zoneOffsetMinutes } from "../calculations/calculate";
import { runSpec } from "@/lib/forms/specTestUtils";

const at = (date, time, from, to) => convertTime({ date, time, from, to }).target;

describe("convertTime", () => {
  it("10:00 IST on 13 Nov 2026 is 04:30 UTC (IST is UTC+5:30)", () => {
    expect(at("2026-11-13", "10:00", "Asia/Kolkata", "UTC").timeText).toBe("04:30");
    expect(wallTimeToUtc("2026-11-13", "10:00", "Asia/Kolkata")).toBe(Date.UTC(2026, 10, 13, 4, 30));
  });
  it("winter: New York is UTC−5 (after US DST ends on 1 Nov 2026)", () => {
    const t = at("2026-11-13", "10:00", "Asia/Kolkata", "America/New_York");
    expect(t.timeText).toBe("23:30");
    expect(t.dateText).toContain("12");
    expect(t.offset).toBe("UTC−05:00");
  });
  it("summer: New York is UTC−4 and London is UTC+1", () => {
    expect(at("2026-07-01", "10:00", "Asia/Kolkata", "America/New_York").timeText).toBe("00:30");
    expect(at("2026-07-01", "10:00", "Asia/Kolkata", "Europe/London").timeText).toBe("05:30");
  });
  it("other fixed offsets", () => {
    expect(at("2026-11-13", "10:00", "Asia/Kolkata", "Asia/Dubai").timeText).toBe("08:30");
    expect(at("2026-11-13", "10:00", "Asia/Kolkata", "Asia/Tokyo").timeText).toBe("13:30");
    expect(at("2026-11-13", "10:00", "Asia/Kolkata", "Asia/Kathmandu").timeText).toBe("10:15");
    expect(at("2026-11-13", "10:00", "Asia/Kolkata", "Australia/Sydney").timeText).toBe("15:30");
  });
  it("round trips and formats offsets", () => {
    const there = wallTimeToUtc("2026-03-10", "08:15", "America/Los_Angeles");
    expect(zoneOffsetMinutes(there, "America/Los_Angeles")).toBe(-420);
    expect(formatOffset(330)).toBe("UTC+05:30");
    expect(formatOffset(-300)).toBe("UTC−05:00");
  });
});

describe("Time zone spec", () => {
  it("runs with defaults", () => {
    const { out } = runSpec(spec);
    expect(out.rows[0].value).toContain("23:30");
    expect(out.rows[2].value).toContain("10:00");
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(at(e.input.date, e.input.time, e.input.from, e.input.to).timeText).toBe(e.time);
  });
});
