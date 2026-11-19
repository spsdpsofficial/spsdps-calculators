"use client";

import { useId, useMemo, useState } from "react";
import { ErrorText, TextArea, controlClass, downloadBlob, primaryButton, secondaryButton } from "@/components/tools/ui";
import { LEVELS, encodeQr, qrPath, qrSvg } from "../calculations/calculate";

const BORDER = 4; // quiet zone, in modules
const PNG_SIZES = [256, 512, 1024];

/** Draw the code on a canvas and hand back a PNG blob. */
function toPngBlob(modules, pixels) {
  const total = modules.length + BORDER * 2;
  const scale = Math.max(1, Math.floor(pixels / total));
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = total * scale;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  modules.forEach((row, y) => row.forEach((dark, x) => dark && ctx.fillRect((x + BORDER) * scale, (y + BORDER) * scale, scale, scale)));
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("PNG export failed"))), "image/png"));
}

/** Text → QR code preview with PNG and SVG download. Generated entirely in the browser. */
export default function QrCodeGeneratorTool() {
  const id = useId();
  const [text, setText] = useState("");
  const [level, setLevel] = useState("M");
  const [pixels, setPixels] = useState(512);
  const [downloadError, setDownloadError] = useState("");

  const qr = useMemo(() => (text ? encodeQr(text, level) : null), [text, level]);
  const ready = qr && !qr.error;
  const total = ready ? qr.size + BORDER * 2 : 0;

  async function downloadPng() {
    try {
      setDownloadError("");
      downloadBlob(await toPngBlob(qr.modules, pixels), "qr-code.png");
    } catch {
      setDownloadError("Could not create the PNG in this browser. Try the SVG download instead.");
    }
  }

  return (
    <div className="space-y-4" role="group" aria-label="QR code generator">
      <TextArea id={`${id}-text`} label="Text or link" value={text} onChange={setText} rows={4} placeholder="https://www.example.com" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-level`} className="mb-1 block text-sm font-medium text-ink">Error correction</label>
          <select id={`${id}-level`} value={level} onChange={(e) => setLevel(e.target.value)} className={controlClass}>
            {LEVELS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor={`${id}-size`} className="mb-1 block text-sm font-medium text-ink">PNG size</label>
          <select id={`${id}-size`} value={pixels} onChange={(e) => setPixels(Number(e.target.value))} className={controlClass}>
            {PNG_SIZES.map((s) => <option key={s} value={s}>{s} × {s} px</option>)}
          </select>
        </div>
      </div>

      <div aria-live="polite">
        <ErrorText>{qr?.error || downloadError}</ErrorText>
        {ready && (
          <div className="flex flex-col items-center gap-3 rounded-xl border bg-card-alt p-4">
            {/* Always dark-on-white, even in the dark theme, so phone cameras can read it. */}
            <svg viewBox={`0 0 ${total} ${total}`} role="img" aria-label={`QR code for: ${text.slice(0, 80)}`} className="w-full max-w-72 rounded-lg bg-white" shapeRendering="crispEdges">
              <rect width={total} height={total} fill="#fff" />
              <path d={qrPath(qr.modules, BORDER)} fill="#000" />
            </svg>
            <p className="text-sm text-muted">Version {qr.version} · {qr.size} × {qr.size} modules</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={primaryButton} disabled={!ready} onClick={downloadPng}>Download PNG</button>
        <button type="button" className={secondaryButton} disabled={!ready} onClick={() => downloadBlob(new Blob([qrSvg(qr.modules, BORDER)], { type: "image/svg+xml" }), "qr-code.svg")}>Download SVG</button>
        <button type="button" className={secondaryButton} disabled={!text} onClick={() => setText("")}>Clear</button>
      </div>
    </div>
  );
}
