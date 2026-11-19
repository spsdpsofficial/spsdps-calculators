"use client";

import { useId, useState } from "react";
import { CopyButton, ErrorText, TextArea, controlClass, primaryButton, secondaryButton } from "@/components/tools/ui";
import { processJson } from "../calculations/calculate";

const INDENTS = [
  { value: "2", label: "2 spaces" },
  { value: "4", label: "4 spaces" },
  { value: "tab", label: "Tab" },
];

/** Format, minify and validate JSON in the browser. */
export default function JsonFormatterTool() {
  const id = useId();
  const [source, setSource] = useState("");
  const [indent, setIndent] = useState("2");
  const [sort, setSort] = useState(false);
  const [result, setResult] = useState({ output: "" });
  const [status, setStatus] = useState("");

  function run(action) {
    const r = processJson({ source, action, indent: indent === "tab" ? "\t" : Number(indent), sort });
    setResult(r);
    if (r.error) return setStatus("");
    if (action === "validate") setStatus("Valid JSON.");
    else {
      setStatus(action === "minify" ? "Minified." : "Formatted.");
      setSource(r.output); // replace the box so the next action works on the result
    }
  }

  return (
    <div className="space-y-4" role="group" aria-label="JSON formatter">
      <TextArea id={`${id}-in`} label="JSON" value={source} onChange={(v) => { setSource(v); setStatus(""); }} rows={14} mono placeholder='{"name": "Asha", "city": "Pune"}' />
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor={`${id}-indent`} className="mb-1 block text-sm font-medium text-ink">Indent</label>
          <select id={`${id}-indent`} value={indent} onChange={(e) => setIndent(e.target.value)} className={`${controlClass} w-auto`}>
            {INDENTS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <label className="flex items-center gap-2 pb-2 text-sm text-ink">
          <input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} className="size-4 accent-[var(--accent)]" />
          Sort keys A–Z
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={primaryButton} onClick={() => run("format")}>Format</button>
        <button type="button" className={secondaryButton} onClick={() => run("minify")}>Minify</button>
        <button type="button" className={secondaryButton} onClick={() => run("validate")}>Validate</button>
        <CopyButton text={source} label="Copy" />
        <button type="button" className={secondaryButton} onClick={() => { setSource(""); setResult({ output: "" }); setStatus(""); }} disabled={!source}>Clear</button>
      </div>
      <div aria-live="polite">
        <ErrorText>{result.error}</ErrorText>
        {status && !result.error && <p className="text-sm font-medium text-accent">{status}</p>}
      </div>
    </div>
  );
}
