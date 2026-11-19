import { describe, expect, it } from "vitest";
import { content } from "../content";
import { MODES, convertUrl } from "../calculations/calculate";

describe("convertUrl", () => {
  it("encodes a query value", () => {
    expect(convertUrl("encode-component", "a b&c=d/é").output).toBe("a%20b%26c%3Dd%2F%C3%A9");
  });
  it("encodes a whole URL but keeps its structure", () => {
    expect(convertUrl("encode-url", "https://x.in/a b?q=1&r=नमस्ते").output).toBe("https://x.in/a%20b?q=1&r=%E0%A4%A8%E0%A4%AE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%87");
  });
  it("decodes both ways", () => {
    expect(convertUrl("decode-component", "a%20b%26c").output).toBe("a b&c");
    expect(convertUrl("decode-url", "https://x.in/a%20b%2Fc").output).toBe("https://x.in/a b%2Fc");
  });
  it("round-trips unicode", () => {
    const text = "₹1,00,000 & नमस्ते 😀";
    expect(convertUrl("decode-component", convertUrl("encode-component", text).output).output).toBe(text);
  });
  it("reports malformed input instead of throwing", () => {
    expect(convertUrl("decode-component", "%E0%A4%A").error).toBeTruthy();
    expect(convertUrl("encode-component", "\uD800").error).toBeTruthy();
    expect(convertUrl("nope", "x").error).toBeTruthy();
  });
  it("every mode has a hint", () => {
    for (const m of MODES) expect(m.hint.length).toBeGreaterThan(5);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(convertUrl(e.mode, e.input).output).toBe(e.output);
  });
});
