import { describe, expect, it } from "vitest";
import { content } from "../content";
import { LEVELS, MAX_VERSION, byteCapacity, encodeQr, qrPath, qrSvg, reedSolomon } from "../calculations/calculate";

describe("Reed–Solomon", () => {
  it("matches the published HELLO WORLD v1-M example", () => {
    const data = [32, 91, 11, 120, 209, 114, 220, 77, 67, 64, 236, 17, 236, 17, 236, 17];
    expect(reedSolomon(data, 10)).toEqual([196, 35, 39, 119, 235, 215, 231, 226, 93, 23]);
  });
});

describe("capacity table", () => {
  it("matches the standard byte-mode capacities", () => {
    const known = { L: [17, 32, 53, 78, 106, 134, 154, 192, 230, 271], M: [14, 26, 42, 62, 84, 106, 122, 152, 180, 213], Q: [11, 20, 32, 46, 60, 74, 86, 108, 130, 151], H: [7, 14, 24, 34, 44, 58, 64, 84, 98, 119] };
    for (const [level, caps] of Object.entries(known)) caps.forEach((cap, i) => expect(byteCapacity(i + 1, level)).toBe(cap));
  });
});

describe("encodeQr", () => {
  it("picks the smallest version and the right size", () => {
    expect(encodeQr("HELLO", "M")).toMatchObject({ version: 1, size: 21 });
    expect(encodeQr("x".repeat(15), "M").version).toBe(2);
    expect(encodeQr("x".repeat(213), "M")).toMatchObject({ version: 10, size: 57 });
  });
  it("draws finder patterns and timing patterns", () => {
    const { modules, size } = encodeQr("https://example.com");
    for (const [ox, oy] of [[0, 0], [size - 7, 0], [0, size - 7]]) {
      for (let i = 0; i < 7; i++) {
        expect(modules[oy][ox + i]).toBe(true); // top edge of the finder
        expect(modules[oy + 6][ox + i]).toBe(true);
      }
      expect(modules[oy + 3][ox + 3]).toBe(true); // centre
      expect(modules[oy + 1][ox + 1]).toBe(false); // light ring
    }
    for (let i = 8; i < size - 8; i++) expect(modules[6][i]).toBe(i % 2 === 0);
    expect(modules[size - 8][8]).toBe(true); // dark module
  });
  it("is deterministic and accepts Unicode (₹, Hindi, emoji)", () => {
    expect(encodeQr("₹500 नमस्ते 😀")).toEqual(encodeQr("₹500 नमस्ते 😀"));
    expect(encodeQr("₹500 नमस्ते 😀").error).toBeUndefined();
  });
  it("reports empty, too long and unknown levels", () => {
    expect(encodeQr("").error).toBeTruthy();
    expect(encodeQr("x".repeat(300), "L").error).toMatch(/too long/);
    expect(encodeQr("x".repeat(214), "M").error).toMatch(/213/);
    expect(encodeQr("a", "Z").error).toBeTruthy();
  });
  it("encodes every level at every version without error", () => {
    for (const { id } of LEVELS) for (let v = 1; v <= MAX_VERSION; v++) {
      const r = encodeQr("a".repeat(byteCapacity(v, id)), id);
      expect(r.version).toBe(v);
    }
  });
});

describe("rendering", () => {
  it("produces a numeric-only SVG", () => {
    const { modules } = encodeQr("hi");
    const svg = qrSvg(modules);
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toMatch(/viewBox="0 0 29 29"/);
    expect(qrPath(modules)).toMatch(/^M\d+,\d+h\d+v1h-\d+z/);
    expect(svg).not.toMatch(/<script|on\w+=/i);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(encodeQr(e.text, e.level)).toMatchObject({ version: e.version, size: e.size });
  });
});
