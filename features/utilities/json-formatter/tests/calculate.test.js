import { describe, expect, it } from "vitest";
import { content } from "../content";
import { describeJsonError, findJsonErrorPosition, processJson, sortKeys } from "../calculations/calculate";

describe("processJson", () => {
  const source = '{"b":1,"a":{"d":[3,2],"c":null}}';
  it("formats with 2 spaces, 4 spaces or tabs", () => {
    expect(processJson({ source, action: "format" }).output).toBe('{\n  "b": 1,\n  "a": {\n    "d": [\n      3,\n      2\n    ],\n    "c": null\n  }\n}');
    expect(processJson({ source: "[1]", action: "format", indent: 4 }).output).toBe("[\n    1\n]");
    expect(processJson({ source: "[1]", action: "format", indent: "\t" }).output).toBe("[\n\t1\n]");
  });
  it("minifies", () => {
    expect(processJson({ source: '{ "a" : [ 1 , 2 ] }', action: "minify" }).output).toBe('{"a":[1,2]}');
  });
  it("sorts keys recursively but keeps array order", () => {
    expect(processJson({ source, action: "minify", sort: true }).output).toBe('{"a":{"c":null,"d":[3,2]},"b":1}');
    expect(sortKeys([{ b: 1, a: 2 }])).toEqual([{ a: 2, b: 1 }]);
  });
  it("validates good JSON without output", () => {
    expect(processJson({ source: "{}", action: "validate" })).toEqual({ output: "", valid: true });
  });
  it("reports errors with a line and column", () => {
    const r = processJson({ source: '{\n  "a": 1,\n  "b": }', action: "format" });
    expect(r.error).toMatch(/Invalid JSON at line \d+, column \d+/);
  });
  it("asks for input when empty", () => {
    expect(processJson({ source: "   ", action: "format" }).error).toMatch(/Paste/);
  });
  it("describeJsonError understands both message styles", () => {
    expect(describeJsonError("Unexpected token } in JSON at position 4", "ab\ncd}")).toContain("line 2, column 2");
    expect(describeJsonError("JSON.parse: bad at line 3 column 9 of the JSON data", "")).toContain("line 3, column 9");
    expect(describeJsonError("weird", "{}")).toBe("Invalid JSON. weird");
  });
  it("findJsonErrorPosition agrees with JSON.parse on valid and invalid text", () => {
    const valid = ['{}', '[]', '{"a":[1,2.5e-3,-0,true,false,null,"x\\n\\u00e9"]}', ' "s" ', "0", "-1.5E+10"];
    const invalid = ['{"a":}', '{"a":1,}', "[1,]", "{'a':1}", '{"a" 1}', "01", "1.", '"unterminated', '"bad\\q"', '"tab\tinside"', "{} x", "", "nul", '{"a":1 "b":2}', '"\\u12G4"'];
    for (const text of valid) { expect(() => JSON.parse(text)).not.toThrow(); expect(findJsonErrorPosition(text)).toBeNull(); }
    for (const text of invalid) { expect(() => JSON.parse(text)).toThrow(); expect(findJsonErrorPosition(text)).not.toBeNull(); }
  });
  it("points at the offending character", () => {
    expect(findJsonErrorPosition('{"a":}')).toBe(5);
    expect(findJsonErrorPosition("[1,]")).toBe(3);
    expect(findJsonErrorPosition("{} x")).toBe(3);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(processJson(e.input).output).toBe(e.output);
  });
});
