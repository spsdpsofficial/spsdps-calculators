import { PdfError, loadPdfLib, openPdf } from "@/lib/utilities/pdf";

export const MAX_FILES = 20;
export const MAX_TOTAL_BYTES = 100 * 1024 * 1024;

/** Move an item one place up (-1) or down (+1). Returns a new array. */
export function moveItem(list, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= list.length) return list;
  const next = [...list];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** Check the selection before merging. Returns an error string or null. */
export function validateSelection(files) {
  if (files.length < 2) return "Add at least two PDF files to merge.";
  if (files.length > MAX_FILES) return `You can merge up to ${MAX_FILES} files at a time.`;
  if (files.reduce((sum, f) => sum + f.size, 0) > MAX_TOTAL_BYTES) return "The files add up to more than 100 MB, which is too much for a browser. Merge fewer files.";
  return null;
}

/**
 * Merge PDFs in the order given. `inputs` = [{ name, buffer }]. Returns { bytes, pageCount }.
 * Throws PdfError with a readable message when a file cannot be used.
 */
export async function mergePdfs(inputs) {
  const { PDFDocument } = await loadPdfLib();
  const merged = await PDFDocument.create();
  for (const { name, buffer } of inputs) {
    const source = await openPdf(buffer, name);
    const pages = await merged.copyPages(source, source.getPageIndices());
    pages.forEach((page) => merged.addPage(page));
  }
  if (merged.getPageCount() === 0) throw new PdfError("The selected PDFs have no pages.");
  return { bytes: await merged.save(), pageCount: merged.getPageCount() };
}
