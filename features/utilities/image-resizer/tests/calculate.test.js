import { describe, expect, it } from "vitest";
import { content } from "../content";
import { MAX_FILE_BYTES, MAX_SIDE, linkedDimensions, outputFileName, scaledDimensions, validateDimensions, validateFile } from "../calculations/calculate";

describe("dimensions", () => {
  it("keeps the aspect ratio when width or height changes", () => {
    const o = { originalWidth: 4000, originalHeight: 3000 };
    expect(linkedDimensions({ ...o, value: 1000, changed: "width" })).toEqual({ width: 1000, height: 750 });
    expect(linkedDimensions({ ...o, value: 600, changed: "height" })).toEqual({ width: 800, height: 600 });
  });
  it("never returns a side below 1 pixel", () => {
    expect(linkedDimensions({ originalWidth: 5000, originalHeight: 10, value: 10, changed: "width" }).height).toBe(1);
  });
  it("scales by percentage", () => {
    expect(scaledDimensions({ originalWidth: 4000, originalHeight: 3000, percent: 25 })).toEqual({ width: 1000, height: 750 });
    expect(scaledDimensions({ originalWidth: 3, originalHeight: 3, percent: 1 })).toEqual({ width: 1, height: 1 });
  });
  it("validates output size", () => {
    expect(validateDimensions(800, 600)).toBeNull();
    expect(validateDimensions(0, 600)).toBeTruthy();
    expect(validateDimensions(10.5, 600)).toBeTruthy();
    expect(validateDimensions(MAX_SIDE + 1, 10)).toMatch(/at most/);
    expect(validateDimensions(10000, 6000)).toMatch(/too large/);
  });
});

describe("files", () => {
  it("names the output file safely", () => {
    expect(outputFileName("My Photo (1).PNG", "webp")).toBe("My-Photo-1-resized.webp");
    expect(outputFileName("a.b.c.jpeg", "png")).toBe("a.b.c-resized.png");
    expect(outputFileName("???", "jpeg")).toBe("image-resized.jpg");
  });
  it("validates the chosen file", () => {
    expect(validateFile(null)).toBeTruthy();
    expect(validateFile({ type: "application/pdf", size: 10 })).toMatch(/not an image/);
    expect(validateFile({ type: "image/png", size: MAX_FILE_BYTES + 1 })).toMatch(/25 MB/);
    expect(validateFile({ type: "image/png", size: 1000 })).toBeNull();
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(linkedDimensions({ ...e.original, value: e.width, changed: "width" }).height).toBe(e.height);
  });
});
