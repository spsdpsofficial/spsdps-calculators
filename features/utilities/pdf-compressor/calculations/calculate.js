import { loadPdfLib, openPdf } from "@/lib/utilities/pdf";

/** Percentage saved, never negative. */
export function savedPercent(before, after) {
  return before === 0 ? 0 : Math.max(0, ((before - after) / before) * 100);
}

/**
 * Re-save a PDF with a tighter structure (object streams, optional removal of document info fields).
 * This does NOT recompress images, so scanned or photo-heavy PDFs may barely shrink.
 * If the result would be larger, the original bytes are returned and `smaller` is false.
 */
export async function optimizePdf(buffer, name, { stripMetadata = true } = {}) {
  await loadPdfLib();
  const doc = await openPdf(buffer, name);
  if (stripMetadata) {
    doc.setTitle("");
    doc.setAuthor("");
    doc.setSubject("");
    doc.setKeywords([]);
    doc.setProducer("");
    doc.setCreator("");
  }
  const bytes = await doc.save({ useObjectStreams: true });
  const before = buffer.byteLength;
  const smaller = bytes.byteLength < before;
  return {
    bytes: smaller ? bytes : new Uint8Array(buffer),
    smaller,
    before,
    after: smaller ? bytes.byteLength : before,
    savedPercent: smaller ? savedPercent(before, bytes.byteLength) : 0,
    pageCount: doc.getPageCount(),
  };
}
