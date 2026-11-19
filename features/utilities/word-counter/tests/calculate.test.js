import { describe, expect, it } from "vitest";
import { content } from "../content";
import { countText, formatMinutes, topWords } from "../calculations/calculate";

describe("countText", () => {
  it("counts an empty string as zero everywhere", () => {
    expect(countText("")).toMatchObject({ words: 0, characters: 0, sentences: 0, paragraphs: 0, lines: 0 });
  });
  it("counts the sample sentence", () => {
    const r = countText("Hello world. This is a test!");
    expect(r).toMatchObject({ words: 6, characters: 28, charactersNoSpaces: 23, sentences: 2, paragraphs: 1, lines: 1 });
  });
  it("ignores punctuation-only tokens and extra whitespace", () => {
    expect(countText("  one   two  -  three  ").words).toBe(3);
  });
  it("counts paragraphs and lines", () => {
    const r = countText("First para.\nStill first.\n\nSecond para.");
    expect(r.paragraphs).toBe(2);
    expect(r.lines).toBe(4);
  });
  it("counts emoji and Devanagari by code point / word", () => {
    expect(countText("😀😀").characters).toBe(2);
    expect(countText("नमस्ते दुनिया।").words).toBe(2);
    expect(countText("नमस्ते दुनिया।").sentences).toBe(1);
  });
  it("estimates reading time at 200 wpm", () => {
    expect(countText(Array(400).fill("word").join(" ")).readingMinutes).toBe(2);
  });
});

describe("formatMinutes and topWords", () => {
  it("formats durations", () => {
    expect(formatMinutes(0.4)).toBe("24 sec");
    expect(formatMinutes(2)).toBe("2 min");
    expect(formatMinutes(3.2)).toBe("3 min 12 sec");
  });
  it("ranks words case-insensitively", () => {
    expect(topWords("The cat, the dog. THE end a", 2)).toEqual([["the", 3], ["cat", 1]]);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(countText(e.text)).toMatchObject(e.counts);
  });
});
