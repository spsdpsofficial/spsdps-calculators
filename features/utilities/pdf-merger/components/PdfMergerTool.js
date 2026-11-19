"use client";

import { useId, useState } from "react";
import { ErrorText, controlClass, downloadBlob, formatBytes, primaryButton, secondaryButton } from "@/components/tools/ui";
import { PdfError, validatePdfFile } from "@/lib/utilities/pdf";
import { mergePdfs, moveItem, validateSelection } from "../calculations/calculate";

/** Combine several PDFs into one, in the order shown. Files stay on the device. */
export default function PdfMergerTool() {
  const id = useId();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(null);

  function addFiles(e) {
    const picked = Array.from(e.target.files ?? []);
    e.target.value = ""; // allow picking the same file again later
    const problem = picked.map((f) => validatePdfFile(f)).find(Boolean);
    if (problem) return setError(problem);
    setError("");
    setDone(null);
    setFiles((current) => [...current, ...picked]);
  }

  async function merge() {
    const problem = validateSelection(files);
    if (problem) return setError(problem);
    setError("");
    setBusy(true);
    setDone(null);
    try {
      const inputs = await Promise.all(files.map(async (f) => ({ name: f.name, buffer: await f.arrayBuffer() })));
      const { bytes, pageCount } = await mergePdfs(inputs);
      const blob = new Blob([bytes], { type: "application/pdf" });
      setDone({ blob, pageCount });
      downloadBlob(blob, "merged.pdf");
    } catch (e) {
      setError(e instanceof PdfError ? e.message : "Something went wrong while merging. Please try again with different files.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4" role="group" aria-label="PDF merger">
      <div>
        <label htmlFor={`${id}-files`} className="mb-1 block text-sm font-medium text-ink">Add PDF files</label>
        <input id={`${id}-files`} type="file" accept="application/pdf,.pdf" multiple onChange={addFiles} className={controlClass} />
      </div>
      <ErrorText>{error}</ErrorText>

      {files.length > 0 && (
        <ol className="divide-y rounded-xl border bg-card" aria-label="Files to merge, in order">
          {files.map((file, i) => (
            <li key={`${file.name}-${file.size}-${i}`} className="flex flex-wrap items-center gap-2 px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-sm text-ink">{i + 1}. {file.name} <span className="text-muted">({formatBytes(file.size)})</span></span>
              <button type="button" className={secondaryButton} aria-label={`Move ${file.name} up`} disabled={i === 0} onClick={() => setFiles(moveItem(files, i, -1))}>Up</button>
              <button type="button" className={secondaryButton} aria-label={`Move ${file.name} down`} disabled={i === files.length - 1} onClick={() => setFiles(moveItem(files, i, 1))}>Down</button>
              <button type="button" className={secondaryButton} aria-label={`Remove ${file.name}`} onClick={() => setFiles(files.filter((_, k) => k !== i))}>Remove</button>
            </li>
          ))}
        </ol>
      )}

      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryButton} onClick={merge} disabled={busy || files.length < 2}>{busy ? "Merging…" : "Merge and download"}</button>
        <button type="button" className={secondaryButton} onClick={() => { setFiles([]); setDone(null); setError(""); }} disabled={!files.length}>Clear all</button>
      </div>
      <div aria-live="polite">
        {done && (
          <p className="text-sm text-ink">
            Merged {done.pageCount} pages ({formatBytes(done.blob.size)}). Your download should start automatically.{" "}
            <button type="button" className="underline" onClick={() => downloadBlob(done.blob, "merged.pdf")}>Download again</button>
          </p>
        )}
      </div>
    </div>
  );
}
