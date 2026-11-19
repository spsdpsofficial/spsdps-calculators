import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import { content } from "../content";
import { MAX_FILES, mergePdfs, moveItem, validateSelection } from "../calculations/calculate";
import { PdfError, validatePdfFile } from "@/lib/utilities/pdf";

async function makePdf(pages, label) {
  const doc = await PDFDocument.create();
  for (let i = 1; i <= pages; i++) doc.addPage([300, 200]).drawText(`${label} page ${i}`);
  return (await doc.save()).buffer;
}

describe("mergePdfs", () => {
  it("merges in order and keeps every page", async () => {
    const a = await makePdf(2, "A");
    const b = await makePdf(3, "B");
    const { bytes, pageCount } = await mergePdfs([{ name: "a.pdf", buffer: a }, { name: "b.pdf", buffer: b }]);
    expect(pageCount).toBe(5);
    const reopened = await PDFDocument.load(bytes);
    expect(reopened.getPageCount()).toBe(5);
    expect(reopened.getPage(0).getSize()).toEqual({ width: 300, height: 200 });
  });
  it("rejects files that are not PDFs with the file name in the message", async () => {
    const good = await makePdf(1, "A");
    await expect(mergePdfs([{ name: "good.pdf", buffer: good }, { name: "fake.pdf", buffer: new TextEncoder().encode("hello").buffer }])).rejects.toThrow(/"fake.pdf" could not be read/);
    await expect(mergePdfs([{ name: "x.pdf", buffer: new ArrayBuffer(0) }])).rejects.toBeInstanceOf(PdfError);
  });
  it("page example matches", async () => {
    const e = content.example.expected;
    const parts = await Promise.all(e.pages.map(async (n, i) => ({ name: `f${i}.pdf`, buffer: await makePdf(n, `F${i}`) })));
    expect((await mergePdfs(parts)).pageCount).toBe(e.total);
  });
});

describe("selection helpers", () => {
  it("moves items and ignores moves past the ends", () => {
    expect(moveItem([1, 2, 3], 1, -1)).toEqual([2, 1, 3]);
    expect(moveItem([1, 2, 3], 1, 1)).toEqual([1, 3, 2]);
    expect(moveItem([1, 2, 3], 0, -1)).toEqual([1, 2, 3]);
    expect(moveItem([1, 2, 3], 2, 1)).toEqual([1, 2, 3]);
  });
  it("validates the selection", () => {
    expect(validateSelection([{ size: 1 }])).toMatch(/at least two/);
    expect(validateSelection(Array(MAX_FILES + 1).fill({ size: 1 }))).toMatch(/up to/);
    expect(validateSelection([{ size: 60 * 1024 * 1024 }, { size: 60 * 1024 * 1024 }])).toMatch(/100 MB/);
    expect(validateSelection([{ size: 1 }, { size: 1 }])).toBeNull();
  });
  it("validates single PDF files", () => {
    expect(validatePdfFile({ name: "a.pdf", type: "application/pdf", size: 10 })).toBeNull();
    expect(validatePdfFile({ name: "A.PDF", type: "", size: 10 })).toBeNull();
    expect(validatePdfFile({ name: "a.png", type: "image/png", size: 10 })).toMatch(/not a PDF/);
    expect(validatePdfFile({ name: "a.pdf", type: "application/pdf", size: 0 })).toMatch(/empty/);
    expect(validatePdfFile({ name: "a.pdf", type: "application/pdf", size: 51 * 1024 * 1024 })).toMatch(/50 MB/);
    expect(validatePdfFile(null)).toBeTruthy();
  });
});
