"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton, ErrorText, TextArea, controlClass, secondaryButton } from "@/components/tools/ui";
import { MODES, convertUrl } from "../calculations/calculate";

/** Percent-encode or decode text. Converts live as you type. */
export default function UrlEncoderDecoderTool() {
  const id = useId();
  const [mode, setMode] = useState("encode-component");
  const [input, setInput] = useState("");
  const result = useMemo(() => (input ? convertUrl(mode, input) : { output: "" }), [mode, input]);
  const hint = MODES.find((m) => m.id === mode)?.hint;

  return (
    <div className="space-y-4" role="group" aria-label="URL encoder and decoder">
      <div>
        <label htmlFor={`${id}-mode`} className="mb-1 block text-sm font-medium text-ink">Conversion</label>
        <select id={`${id}-mode`} value={mode} onChange={(e) => setMode(e.target.value)} aria-describedby={`${id}-hint`} className={controlClass}>
          {MODES.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">{hint}</p>
      </div>
      <TextArea id={`${id}-in`} label="Input" value={input} onChange={setInput} rows={5} mono placeholder="Paste text or a URL…" />
      <ErrorText>{result.error}</ErrorText>
      <TextArea id={`${id}-out`} label="Result" value={result.output ?? ""} rows={5} mono readOnly />
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton text={result.output ?? ""} label="Copy result" />
        <button type="button" className={secondaryButton} onClick={() => setInput("")} disabled={!input}>Clear</button>
      </div>
    </div>
  );
}
