import { describe, expect, it } from "vitest";
import { content } from "../content";
import { CASES, convertCase } from "../calculations/calculate";

const sample = "the quick Brown fox";

describe("convertCase", () => {
  it("basic cases", () => {
    expect(convertCase("upper", sample)).toBe("THE QUICK BROWN FOX");
    expect(convertCase("lower", "HeLLo")).toBe("hello");
    expect(convertCase("title", sample)).toBe("The Quick Brown Fox");
  });
  it("sentence case capitalises after . ! ? and new lines", () => {
    expect(convertCase("sentence", "HELLO there. how ARE you? fine!\nnew line")).toBe("Hello there. How are you? Fine!\nNew line");
  });
  it("code cases", () => {
    expect(convertCase("camel", sample)).toBe("theQuickBrownFox");
    expect(convertCase("pascal", sample)).toBe("TheQuickBrownFox");
    expect(convertCase("snake", sample)).toBe("the_quick_brown_fox");
    expect(convertCase("kebab", sample)).toBe("the-quick-brown-fox");
    expect(convertCase("constant", sample)).toBe("THE_QUICK_BROWN_FOX");
  });
  it("splits camelCase, snake_case and acronyms", () => {
    expect(convertCase("snake", "myVariableName")).toBe("my_variable_name");
    expect(convertCase("kebab", "some_snake_case")).toBe("some-snake-case");
    expect(convertCase("snake", "parseHTMLString")).toBe("parse_html_string");
  });
  it("keeps apostrophes inside title-cased words", () => {
    expect(convertCase("title", "don't stop")).toBe("Don't Stop");
  });
  it("handles empty and unknown input", () => {
    for (const c of CASES) expect(convertCase(c.id, "")).toBe("");
    expect(convertCase("nope", "abc")).toBe("abc");
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(convertCase(e.id, e.input)).toBe(e.output);
  });
});
