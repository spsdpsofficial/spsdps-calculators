"use client";

import { useId, useState } from "react";
import { ErrorText, controlClass, downloadBlob, formatBytes, primaryButton } from "@/components/tools/ui";
import { PdfError, validatePdfFile } from "@/lib/utilities/pdf";
import { optimizePdf } from "../calculations/calculate";

/** Re-saves a PDF with a leaner structure. Honest about what it cannot do: it does not recompress images. */
export default function PdfCompressorTool() {
  const id = useId();
  const [file, setFile] = useState(null);
  const [strip, setStrip] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  function choose(e) {
    const picked = e.target.files?.[0] ?? null;
    setResult(null);
    const problem = picked ? validatePdfFile(picked) : null;
    setError(problem ?? "");
    setFile(problem ? null : picked);
  }

  async function run() {
    setBusy(true);
    setError("");
    setResult(null);
    try {
      const r = await optimizePdf(await file.arrayBuffer(), file.name, { stripMetadata: strip });
      setResult({ ...r, blob: new Blob([r.bytes], { type: "application/pdf" }) });
    } catch (e) {
      setError(e instanceof PdfError ? e.message : "Something went wrong while optimising this PDF. Please try another file.");
    } finally {
      setBusy(false);
    }
  }

  const outputName = file ? file.name.replace(/\.pdf$/i, "") + "-optimized.pdf" : "";

  return (
    <div className="space-y-4" role="group" aria-label="PDF compressor">
      <div>
        <label htmlFor={`${id}-file`} className="mb-1 block text-sm font-medium text-ink">Choose a PDF (up to 50 MB)</label>
        <input id={`${id}-file`} type="file" accept="application/pdf,.pdf" onChange={choose} className={controlClass} />
      </div>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" checked={strip} onChange={(e) => setStrip(e.target.checked)} className="size-4 accent-[var(--accent)]" />
        Remove title, author and other document details
      </label>
      <ErrorText>{error}</ErrorText>
      <button type="button" className={primaryButton} onClick={run} disabled={!file || busy}>{busy ? "Working…" : "Optimise PDF"}</button>

      <div aria-live="polite">
        {result && (
          <div className="space-y-2 rounded-xl border bg-card-alt p-4">
            <p className="text-ink">
              {formatBytes(result.before)} → <strong>{formatBytes(result.after)}</strong>
              {result.smaller ? ` (${result.savedPercent.toFixed(1)}% smaller, ${result.pageCount} pages)` : ""}
            </p>
            {!result.smaller && (
              <p className="text-sm text-muted">
                This PDF could not be made smaller. Its size comes mostly from images, which this tool does not recompress. The original file is kept as it is.
              </p>
            )}
            <button type="button" className={primaryButton} onClick={() => downloadBlob(result.blob, outputName)}>Download {outputName}</button>
          </div>
        )}
      </div>
    </div>
  );
}
