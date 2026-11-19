"use client";

import { useEffect, useRef, useState } from "react";

/** Shared look for the browser-utility tools (kept in one place so every tool matches). */
export const buttonClass =
  "inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50";
export const primaryButton = `${buttonClass} border-accent bg-accent text-accent-ink hover:opacity-90`;
export const secondaryButton = `${buttonClass} bg-card text-ink hover:bg-card-alt`;
export const controlClass = "w-full rounded-lg border bg-card px-3 py-2 text-base text-ink";

/** Labelled multi-line text box. */
export function TextArea({ id, label, value, onChange, rows = 8, placeholder, readOnly = false, mono = false, describedBy }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-ink">{label}</label>
      <textarea
        id={id}
        value={value}
        rows={rows}
        readOnly={readOnly}
        placeholder={placeholder}
        aria-describedby={describedBy}
        spellCheck={false}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`${controlClass} ${mono ? "font-mono text-sm" : ""}`}
      />
    </div>
  );
}

/** Copies `text` to the clipboard and confirms politely for screen readers and sighted users. */
export function CopyButton({ text, label = "Copy", disabled = false }) {
  const [state, setState] = useState("idle"); // idle | copied | failed
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      <button type="button" onClick={copy} disabled={disabled || !text} className={secondaryButton}>
        {state === "copied" ? "Copied" : label}
      </button>
      <span className="sr-only" aria-live="polite">{state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copy failed" : ""}</span>
      {state === "failed" && <span className="text-sm text-danger">Copy failed. Select the text and copy it manually.</span>}
    </>
  );
}

/** Error text announced to assistive technology. */
export function ErrorText({ children }) {
  if (!children) return null;
  return <p role="alert" className="text-sm text-danger">{children}</p>;
}

/** Saves a Blob as a file using a temporary link (works without any network request). */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
