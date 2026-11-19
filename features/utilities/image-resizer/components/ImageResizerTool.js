"use client";

import { useId, useRef, useState } from "react";
import { ErrorText, controlClass, downloadBlob, formatBytes, primaryButton, secondaryButton } from "@/components/tools/ui";
import { parseNumber } from "@/lib/helpers/numbers";
import { FORMATS, linkedDimensions, outputFileName, scaledDimensions, validateDimensions, validateFile } from "../calculations/calculate";

/** Resize and convert an image in the browser using a canvas. The picture is never uploaded. */
export default function ImageResizerTool() {
  const id = useId();
  const canvasRef = useRef(null);
  const [file, setFile] = useState(null);
  const [bitmap, setBitmap] = useState(null);
  const [size, setSize] = useState({ width: "", height: "" });
  const [keepAspect, setKeepAspect] = useState(true);
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(85);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const selected = FORMATS.find((f) => f.id === format);

  async function choose(e) {
    const picked = e.target.files?.[0];
    setResult(null);
    const problem = validateFile(picked);
    if (problem) { setError(picked ? problem : ""); return; }
    try {
      bitmap?.close?.();
      const decoded = await createImageBitmap(picked); // honours EXIF rotation
      setFile(picked);
      setBitmap(decoded);
      setSize({ width: String(decoded.width), height: String(decoded.height) });
      setError("");
    } catch {
      setError("This image could not be read. It may be damaged or in a format your browser cannot open.");
    }
  }

  function changeSide(side, text) {
    const value = parseNumber(text);
    if (!keepAspect || !bitmap || !Number.isInteger(value) || value < 1) return setSize({ ...size, [side]: text });
    const linked = linkedDimensions({ originalWidth: bitmap.width, originalHeight: bitmap.height, value, changed: side });
    setSize({ width: String(linked.width), height: String(linked.height) });
  }

  function applyPercent(percent) {
    if (!bitmap) return;
    const s = scaledDimensions({ originalWidth: bitmap.width, originalHeight: bitmap.height, percent });
    setSize({ width: String(s.width), height: String(s.height) });
  }

  async function resize() {
    const width = parseNumber(size.width);
    const height = parseNumber(size.height);
    const problem = validateDimensions(width, height);
    if (problem) return setError(problem);
    setError("");
    setBusy(true);
    try {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (selected.id === "jpeg") {
        // JPEG has no transparency, so paint white first.
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);
      }
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, 0, 0, width, height);
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, selected.mime, selected.lossy ? quality / 100 : undefined));
      if (!blob || blob.type !== selected.mime) throw new Error("unsupported");
      setResult({ blob, width, height, name: outputFileName(file.name, format) });
    } catch {
      setError(`Your browser could not create a ${selected.id.toUpperCase()} file. Try another format.`);
      setResult(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4" role="group" aria-label="Image resizer">
      <div>
        <label htmlFor={`${id}-file`} className="mb-1 block text-sm font-medium text-ink">Choose an image (up to 25 MB)</label>
        <input id={`${id}-file`} type="file" accept="image/*" onChange={choose} className={controlClass} />
      </div>
      <ErrorText>{error}</ErrorText>

      {bitmap && (
        <>
          <p className="text-sm text-muted">Original: {bitmap.width} × {bitmap.height} px, {formatBytes(file.size)}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {["width", "height"].map((side) => (
              <div key={side}>
                <label htmlFor={`${id}-${side}`} className="mb-1 block text-sm font-medium capitalize text-ink">{side} (px)</label>
                <input id={`${id}-${side}`} inputMode="numeric" value={size[side]} onChange={(e) => changeSide(side, e.target.value)} className={controlClass} />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-ink">
              <input type="checkbox" checked={keepAspect} onChange={(e) => setKeepAspect(e.target.checked)} className="size-4 accent-[var(--accent)]" /> Keep aspect ratio
            </label>
            <span className="text-sm text-muted">Quick scale:</span>
            {[25, 50, 75].map((p) => <button key={p} type="button" className={secondaryButton} onClick={() => applyPercent(p)}>{p}%</button>)}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-format`} className="mb-1 block text-sm font-medium text-ink">Save as</label>
              <select id={`${id}-format`} value={format} onChange={(e) => setFormat(e.target.value)} className={controlClass}>
                {FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
              </select>
            </div>
            {selected.lossy && (
              <div>
                <label htmlFor={`${id}-quality`} className="mb-1 block text-sm font-medium text-ink">Quality: {quality}%</label>
                <input id={`${id}-quality`} type="range" min={30} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-[var(--accent)]" />
              </div>
            )}
          </div>
          <button type="button" className={primaryButton} onClick={resize} disabled={busy}>{busy ? "Working…" : "Resize image"}</button>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
      <div aria-live="polite">
        {result && (
          <div className="space-y-2 rounded-xl border bg-card-alt p-4">
            <p className="text-ink">Done: <strong>{result.width} × {result.height} px</strong>, {formatBytes(result.blob.size)}{file && ` (was ${formatBytes(file.size)})`}</p>
            <button type="button" className={primaryButton} onClick={() => downloadBlob(result.blob, result.name)}>Download {result.name}</button>
          </div>
        )}
      </div>
    </div>
  );
}
