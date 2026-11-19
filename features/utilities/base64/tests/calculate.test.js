import { describe, expect, it } from "vitest";
import { content } from "../content";
import { convertBase64, decodeBase64, encodeBase64 } from "../calculations/calculate";

describe("Base64", () => {
  it("encodes known values (Python reference)", () => {
    expect(encodeBase64("Hello, World!")).toBe("SGVsbG8sIFdvcmxkIQ==");
    expect(encodeBase64("नमस्ते")).toBe("4KSo4KSu4KS44KWN4KSk4KWH");
    expect(encodeBase64("₹100")).toBe("4oK5MTAw");
    expect(encodeBase64("")).toBe("");
  });
  it("URL-safe output swaps characters and drops padding", () => {
    expect(encodeBase64("???>>>")).toBe("Pz8/Pj4+");
    expect(encodeBase64("???>>>", { urlSafe: true })).toBe("Pz8_Pj4-");
    expect(encodeBase64("a", { urlSafe: true })).toBe("YQ");
  });
  it("decodes standard, URL-safe, unpadded and whitespace-separated input", () => {
    expect(decodeBase64("SGVsbG8sIFdvcmxkIQ==").output).toBe("Hello, World!");
    expect(decodeBase64("SGVsbG8s\nIFdvcmxkIQ").output).toBe("Hello, World!");
    expect(decodeBase64("Pz8_Pj4-").output).toBe("???>>>");
    expect(decodeBase64("4KSo4KSu4KS44KWN4KSk4KWH").output).toBe("नमस्ते");
  });
  it("round-trips emoji and long text", () => {
    const text = "Mixed 😀 text ₹ — ".repeat(5000);
    expect(decodeBase64(encodeBase64(text)).output).toBe(text);
  });
  it("reports invalid input clearly", () => {
    expect(decodeBase64("Hello!").error).toMatch(/not valid Base64/);
    expect(decodeBase64("A").error).toMatch(/length/);
    expect(decodeBase64("/w==").error).toMatch(/UTF-8/);
  });
  it("convertBase64 routes by mode; page example matches", () => {
    expect(convertBase64("decode", "SGk=").output).toBe("Hi");
    expect(encodeBase64(content.example.expected.text)).toBe(content.example.expected.base64);
  });
});
