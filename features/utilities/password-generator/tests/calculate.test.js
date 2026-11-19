import { describe, expect, it } from "vitest";
import { content } from "../content";
import { SETS, buildSets, generatePassword, strengthLabel } from "../calculations/calculate";

const all = { length: 16, lower: true, upper: true, digits: true, symbols: true, avoidAmbiguous: false };

describe("generatePassword", () => {
  it("returns the requested length and always includes each chosen type", () => {
    for (let i = 0; i < 200; i++) {
      const { password } = generatePassword({ ...all, length: 8 });
      expect(password).toHaveLength(8);
      for (const set of Object.values(SETS)) expect([...password].some((c) => set.includes(c))).toBe(true);
    }
  });
  it("uses only chosen sets", () => {
    const { password } = generatePassword({ ...all, upper: false, symbols: false, length: 64 });
    expect(password).toMatch(/^[a-z0-9]+$/);
  });
  it("can avoid look-alike characters", () => {
    for (const set of buildSets({ ...all, avoidAmbiguous: true })) expect(set).not.toMatch(/[Il1O0o]/);
    for (let i = 0; i < 50; i++) expect(generatePassword({ ...all, avoidAmbiguous: true, length: 40 }).password).not.toMatch(/[Il1O0o]/);
  });
  it("computes entropy from the pool", () => {
    const r = generatePassword({ ...all, symbols: false, length: 12 });
    expect(r.poolSize).toBe(62);
    expect(r.entropyBits).toBeCloseTo(12 * Math.log2(62), 10);
  });
  it("validates options", () => {
    expect(generatePassword({ ...all, length: 3 }).error).toBeTruthy();
    expect(generatePassword({ ...all, length: 129 }).error).toBeTruthy();
    expect(generatePassword({ ...all, length: 10.5 }).error).toBeTruthy();
    expect(generatePassword({ length: 12, lower: false, upper: false, digits: false, symbols: false }).error).toBeTruthy();
  });
  it("two passwords differ", () => {
    expect(generatePassword(all).password).not.toBe(generatePassword(all).password);
  });
  it("strength labels", () => {
    expect([30, 45, 70, 100].map(strengthLabel)).toEqual(["Weak", "Fair", "Strong", "Very strong"]);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(generatePassword({ ...all, length: e.length, symbols: false }).entropyBits)).toBe(e.bits);
  });
});
