import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { content } from "../content";
import { optimizePdf, savedPercent } from "../calculations/calculate";
import { PdfError } from "@/lib/utilities/pdf";

/** A PDF saved the wasteful way (no object streams) with many small objects and metadata. */
async function bulkyPdf(pages = 40) {
  const doc = await PDFDocument.create();
  doc.setTitle("Quarterly report");
  doc.setAuthor("Someone");
  for (let i = 0; i < pages; i++) doc.addPage([300, 200]).drawText(`Page ${i}`);
  return (await doc.save({ useObjectStreams: false })).buffer;
}

describe("savedPercent", () => {
  it("computes the saving and never goes negative", () => {
    expect(savedPercent(1000, 750)).toBe(25);
    expect(savedPercent(1000, 1200)).toBe(0);
    expect(savedPercent(0, 0)).toBe(0);
  });
});

describe("optimizePdf", () => {
  it("shrinks a structurally wasteful PDF and keeps every page", async () => {
    const input = await bulkyPdf();
    const r = await optimizePdf(input, "report.pdf");
    expect(r.smaller).toBe(true);
    expect(r.after).toBeLessThan(r.before);
    expect(r.savedPercent).toBeGreaterThan(0);
    const reopened = await PDFDocument.load(r.bytes);
    expect(reopened.getPageCount()).toBe(40);
    expect(reopened.getTitle() ?? "").toBe("");
  });
  it("returns the original when the result would not be smaller", async () => {
    const once = await optimizePdf(await bulkyPdf(), "a.pdf");
    const twice = await optimizePdf(once.bytes.buffer.slice(once.bytes.byteOffset, once.bytes.byteOffset + once.bytes.byteLength), "a.pdf");
    expect(twice.after).toBeLessThanOrEqual(twice.before);
    if (!twice.smaller) expect(twice.savedPercent).toBe(0);
  });
  it("can keep metadata", async () => {
    const r = await optimizePdf(await bulkyPdf(), "a.pdf", { stripMetadata: false });
    expect((await PDFDocument.load(r.bytes)).getTitle()).toBe("Quarterly report");
  });
  it("rejects files that are not PDFs", async () => {
    await expect(optimizePdf(new TextEncoder().encode("nope").buffer, "x.pdf")).rejects.toBeInstanceOf(PdfError);
  });
  it("page example matches", () => {
    const e = content.example.expected;
    expect(Math.round(savedPercent(e.before, e.after))).toBe(e.percent);
  });
});
