"use client";

import { useId, useMemo, useState } from "react";
import { TextArea, secondaryButton } from "@/components/tools/ui";
import { formatNumber } from "@/lib/formatters";
import { countText, formatMinutes, topWords } from "../calculations/calculate";

/** Live word, character, sentence and paragraph counter. Text never leaves the browser. */
export default function WordCounterTool() {
  const id = useId();
  const [text, setText] = useState("");
  const stats = useMemo(() => countText(text), [text]);
  const frequent = useMemo(() => topWords(text), [text]);

  const rows = [
    ["Words", formatNumber(stats.words)],
    ["Characters", formatNumber(stats.characters)],
    ["Characters (no spaces)", formatNumber(stats.charactersNoSpaces)],
    ["Sentences", formatNumber(stats.sentences)],
    ["Paragraphs", formatNumber(stats.paragraphs)],
    ["Lines", formatNumber(stats.lines)],
    ["Reading time (200 wpm)", formatMinutes(stats.readingMinutes)],
    ["Speaking time (130 wpm)", formatMinutes(stats.speakingMinutes)],
  ];

  return (
    <div className="space-y-4" role="group" aria-label="Word counter">
      <TextArea id={`${id}-text`} label="Type or paste your text" value={text} onChange={setText} rows={10} placeholder="Start typing or paste text here…" />
      <div className="flex flex-wrap gap-2">
        <button type="button" className={secondaryButton} onClick={() => setText("")} disabled={!text}>Clear</button>
      </div>
      <div aria-live="polite">
        <dl className="grid gap-px overflow-hidden rounded-xl border bg-line sm:grid-cols-2">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-baseline justify-between gap-3 bg-card px-4 py-3">
              <dt className="text-sm text-muted">{label}</dt>
              <dd className="text-lg font-semibold text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        {frequent.length > 0 && (
          <p className="mt-3 text-sm text-muted">
            Most used words: {frequent.map(([word, n]) => `${word} (${n})`).join(", ")}
          </p>
        )}
      </div>
    </div>
  );
}
