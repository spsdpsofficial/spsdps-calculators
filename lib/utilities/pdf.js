// Shared PDF helpers for the PDF merger and compressor.
// pdf-lib is loaded on demand (dynamic import) so it only downloads when someone uses a PDF tool.

export const MAX_PDF_FILE_BYTES = 50 * 1024 * 1024;

let loader;
export function loadPdfLib() {
  loader ??= import("pdf-lib");
  return loader;
}

/** Check a chosen file looks like a PDF (by name/type) and is not too big. Returns an error string or null. */
export function validatePdfFile(file) {
  if (!file) return "Choose a PDF first.";
  const looksLikePdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
  if (!looksLikePdf) return `"${file.name}" is not a PDF file.`;
  if (file.size === 0) return `"${file.name}" is empty.`;
  if (file.size > MAX_PDF_FILE_BYTES) return `"${file.name}" is larger than 50 MB.`;
  return null;
}

/** Open a PDF, turning library errors into messages a person can act on. */
export async function openPdf(buffer, name) {
  const { PDFDocument } = await loadPdfLib();
  try {
    return await PDFDocument.load(buffer);
  } catch (e) {
    if (e?.constructor?.name === "EncryptedPDFError" || /encrypted/i.test(e?.message ?? "")) {
      throw new PdfError(`"${name}" is password-protected. Remove the password first, then try again.`);
    }
    throw new PdfError(`"${name}" could not be read. It may be damaged or not a real PDF.`);
  }
}

export class PdfError extends Error {}
