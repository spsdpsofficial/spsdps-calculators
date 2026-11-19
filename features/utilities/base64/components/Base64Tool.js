"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton, ErrorText, TextArea, controlClass, secondaryButton } from "@/components/tools/ui";
import { MODES, convertBase64 } from "../calculations/calculate";

/** Encode or decode Base64 text. Converts live as you type, in your browser only. */
export default function Base64Tool() {
  const id = useId();
  const [mode, setMode] = useState("encode");
  const [urlSafe, setUrlSafe] = useState(false);
  const [input, setInput] = useState("");
  const result = useMemo(() => (input ? convertBase64(mode, input, { urlSafe }) : { output: "" }), [mode, input, urlSafe]);

  return (
    <div className="space-y-4" role="group" aria-label="Base64 encoder and decoder">
      <div>
        <label htmlFor={`${id}-mode`} className="mb-1 block text-sm font-medium text-ink">Conversion</label>
        <select id={`${id}-mode`} value={mode} onChange={(e) => setMode(e.target.value)} className={controlClass}>
          {MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
      </div>
      {mode === "encode" && (
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={urlSafe} onChange={(e) => setUrlSafe(e.target.checked)} className="size-4 accent-[var(--accent)]" /> URL-safe output (uses - and _, no padding)
        </label>
      )}
      <TextArea id={`${id}-in`} label="Input" value={input} onChange={setInput} rows={5} mono placeholder={mode === "encode" ? "Type or paste text…" : "Paste Base64…"} />
      <ErrorText>{result.error}</ErrorText>
      <TextArea id={`${id}-out`} label="Result" value={result.output ?? ""} rows={5} mono readOnly />
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton text={result.output ?? ""} label="Copy result" />
        <button type="button" className={secondaryButton} onClick={() => setInput("")} disabled={!input}>Clear</button>
      </div>
    </div>
  );
}
