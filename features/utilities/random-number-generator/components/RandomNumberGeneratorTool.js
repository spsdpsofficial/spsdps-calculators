"use client";

import { useId, useState } from "react";
import { CopyButton, ErrorText, controlClass, primaryButton } from "@/components/tools/ui";
import { MAX_COUNT, generateNumbers } from "../calculations/calculate";
import { parseNumber } from "@/lib/helpers/numbers";

/** Secure random integers. Results are generated only when you press the button. */
export default function RandomNumberGeneratorTool() {
  const id = useId();
  const [form, setForm] = useState({ min: "1", max: "100", count: "1", unique: false, sorted: false });
  const [result, setResult] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  function generate() {
    setResult(generateNumbers({ min: parseNumber(form.min), max: parseNumber(form.max), count: parseNumber(form.count), unique: form.unique, sorted: form.sorted }));
  }

  const text = result?.numbers?.join(", ") ?? "";
  const field = (key, label) => (
    <div>
      <label htmlFor={`${id}-${key}`} className="mb-1 block text-sm font-medium text-ink">{label}</label>
      <input id={`${id}-${key}`} inputMode="numeric" value={form[key]} onChange={set(key)} className={controlClass} />
    </div>
  );

  return (
    <div className="space-y-4" role="group" aria-label="Random number generator">
      <div className="grid gap-4 sm:grid-cols-3">
        {field("min", "Minimum")}
        {field("max", "Maximum")}
        {field("count", `How many (1–${MAX_COUNT})`)}
      </div>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={form.unique} onChange={set("unique")} className="size-4 accent-[var(--accent)]" /> No repeats
        </label>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={form.sorted} onChange={set("sorted")} className="size-4 accent-[var(--accent)]" /> Sort results
        </label>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={primaryButton} onClick={generate}>Generate</button>
        <CopyButton text={text} label="Copy numbers" />
      </div>
      <div aria-live="polite">
        <ErrorText>{result?.error}</ErrorText>
        {text && (
          <div className="rounded-xl border bg-card-alt p-4">
            <p className="mb-1 text-sm text-muted">{result.numbers.length === 1 ? "Your number" : `Your ${result.numbers.length} numbers`}</p>
            <p className={`break-words font-semibold text-ink ${result.numbers.length === 1 ? "text-4xl" : "text-lg"}`} data-testid="numbers">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
