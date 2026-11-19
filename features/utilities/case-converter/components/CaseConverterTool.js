"use client";

import { useId, useState } from "react";
import { CopyButton, TextArea, secondaryButton } from "@/components/tools/ui";
import { CASES, convertCase } from "../calculations/calculate";

/** Convert text between upper, lower, title, sentence and developer cases. */
export default function CaseConverterTool() {
  const id = useId();
  const [text, setText] = useState("");

  return (
    <div className="space-y-4" role="group" aria-label="Case converter">
      <TextArea id={`${id}-text`} label="Your text" value={text} onChange={setText} rows={8} placeholder="Type or paste text, then choose a case…" />
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose a case">
        {CASES.map((c) => (
          <button key={c.id} type="button" className={secondaryButton} onClick={() => setText(convertCase(c.id, text))} disabled={!text}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <CopyButton text={text} label="Copy text" />
        <button type="button" className={secondaryButton} onClick={() => setText("")} disabled={!text}>Clear</button>
      </div>
    </div>
  );
}
