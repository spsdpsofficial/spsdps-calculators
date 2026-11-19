import { describe, expect, it } from "vitest";
import { content } from "../content";
import { spec } from "../spec";
import { calculatePace, formatDuration, formatPace } from "../calculations/calculate";
import { isRejected, runSpec } from "@/lib/forms/specTestUtils";

describe("calculatePace", () => {
  it("10 km in 55:00 → 5:30/km, 10.91 km/h, 8:51/mile (Python reference)", () => {
    const r = calculatePace({ distanceKm: 10, totalSeconds: 3300 });
    expect(r.secondsPerKm).toBe(330);
    expect(r.speedKmh).toBeCloseTo(10.909, 3);
    expect(formatPace(r.secondsPerMile)).toBe("8:51");
    expect(formatDuration(r.predictions[0].seconds)).toBe("0:27:30");
    expect(formatDuration(r.predictions[2].seconds)).toBe("1:56:02");
    expect(formatDuration(r.predictions[3].seconds)).toBe("3:52:04");
  });
  it("formats pace and duration", () => {
    expect(formatPace(300)).toBe("5:00");
    expect(formatPace(359.6)).toBe("6:00");
    expect(formatDuration(3661)).toBe("1:01:01");
  });
});

describe("Pace spec", () => {
  it("runs with defaults, validates, and rejects zero time", () => {
    const { out } = runSpec(spec);
    expect(out.rows[0].value).toBe("5:30 min/km");
    expect(out.table.rows).toHaveLength(4);
    expect(runSpec(spec, { m: "0" }).out.error).toBeTruthy();
    expect(isRejected(spec, { m: "75" })).toBe(true);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(formatPace(calculatePace(e.input).secondsPerKm)).toBe(e.pace);
  });
});
